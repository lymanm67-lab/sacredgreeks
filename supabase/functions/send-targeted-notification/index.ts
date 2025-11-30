import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Input validation schema
const requestSchema = z.object({
  campaignId: z.string().uuid().optional(),
  targetSegments: z.array(z.enum(['champion', 'active', 'engaged', 'casual', 'at-risk', 'inactive'])),
  title: z.string().min(1).max(200),
  body: z.string().min(1).max(500),
  daysInactive: z.number().min(1).max(365).optional(),
  scheduleAt: z.string().datetime().optional(),
})

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Verify user is admin
    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Check admin role
    const { data: roleData } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .single()

    if (!roleData) {
      return new Response(
        JSON.stringify({ error: 'Admin access required' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const requestBody = await req.json()
    const validation = requestSchema.safeParse(requestBody)
    
    if (!validation.success) {
      console.error('Validation error:', validation.error.errors)
      return new Response(
        JSON.stringify({ error: 'Invalid request data' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const { campaignId, targetSegments, title, body, daysInactive } = validation.data

    // Get all profiles with analytics data to calculate engagement
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const { data: profiles } = await supabase
      .from('profiles')
      .select('id, email')

    if (!profiles || profiles.length === 0) {
      return new Response(
        JSON.stringify({ message: 'No users found', sent: 0 }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Get analytics for engagement calculation
    const { data: allAnalytics } = await supabase
      .from('analytics_events')
      .select('user_id, created_at, event_type')
      .gte('created_at', thirtyDaysAgo.toISOString())

    // Calculate engagement levels for each user
    const userEngagementMap = new Map<string, { level: string; daysSinceActive: number }>()
    
    for (const profile of profiles) {
      const userEvents = (allAnalytics || []).filter(e => e.user_id === profile.id)
      const pageViews = userEvents.filter(e => e.event_type === 'page_view').length
      const uniqueDays = new Set(userEvents.map(e => new Date(e.created_at!).toDateString())).size
      
      const allDates = userEvents.map(e => new Date(e.created_at!))
      const lastActive = allDates.length > 0 ? new Date(Math.max(...allDates.map(d => d.getTime()))) : null
      const daysSinceActive = lastActive 
        ? Math.floor((Date.now() - lastActive.getTime()) / (1000 * 60 * 60 * 24))
        : 999

      // Calculate score
      const score = Math.min(100, Math.round((pageViews / 50 + uniqueDays / 15) * 50))

      // Determine level
      let level: string
      if (daysSinceActive > 14) level = 'inactive'
      else if (daysSinceActive > 7) level = 'at-risk'
      else if (score >= 80) level = 'champion'
      else if (score >= 60) level = 'active'
      else if (score >= 40) level = 'engaged'
      else level = 'casual'

      userEngagementMap.set(profile.id, { level, daysSinceActive: daysSinceActive })
    }

    // Filter users by target segments
    let targetUsers = profiles.filter(profile => {
      const engagement = userEngagementMap.get(profile.id)
      if (!engagement) return false
      
      const matchesSegment = targetSegments.includes(engagement.level as any)
      const matchesDaysInactive = daysInactive 
        ? engagement.daysSinceActive >= daysInactive 
        : true
      
      return matchesSegment && matchesDaysInactive
    })

    console.log(`Found ${targetUsers.length} users matching segments: ${targetSegments.join(', ')}`)

    // Get push subscriptions for target users
    const targetUserIds = targetUsers.map(u => u.id)
    const { data: subscriptions } = await supabase
      .from('push_subscriptions')
      .select('*')
      .in('user_id', targetUserIds)

    if (!subscriptions || subscriptions.length === 0) {
      // Update campaign if provided
      if (campaignId) {
        await supabase
          .from('notification_campaigns')
          .update({
            status: 'sent',
            sent_at: new Date().toISOString(),
            recipients_count: targetUsers.length,
            sent_count: 0,
          })
          .eq('id', campaignId)
      }

      return new Response(
        JSON.stringify({ 
          message: 'No push subscriptions found for target users',
          targetUsers: targetUsers.length,
          sent: 0 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Send notifications
    const VAPID_PUBLIC_KEY = Deno.env.get('VAPID_PUBLIC_KEY')
    const VAPID_SUBJECT = Deno.env.get('VAPID_SUBJECT') || 'mailto:support@sacredgreeks.com'

    let sentCount = 0
    const results = []

    for (const sub of subscriptions) {
      try {
        const payload = JSON.stringify({
          title,
          body,
          icon: '/icon-192.png',
          badge: '/icon-192.png',
          data: { campaignId },
        })

        const header = { typ: 'JWT', alg: 'ES256' }
        const jwtPayload = {
          aud: new URL(sub.endpoint).origin,
          exp: Math.floor(Date.now() / 1000) + 12 * 60 * 60,
          sub: VAPID_SUBJECT,
        }

        const encodedHeader = btoa(JSON.stringify(header))
        const encodedPayload = btoa(JSON.stringify(jwtPayload))

        const response = await fetch(sub.endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/octet-stream',
            'TTL': '86400',
            'Content-Encoding': 'aes128gcm',
            'Authorization': `vapid t=${encodedHeader}.${encodedPayload}, k=${VAPID_PUBLIC_KEY}`,
          },
          body: payload,
        })

        if (response.ok) {
          sentCount++
          results.push({ userId: sub.user_id, success: true })
        } else {
          results.push({ userId: sub.user_id, success: false, status: response.status })
        }
      } catch (error) {
        console.error('Error sending to subscription:', error)
        results.push({ userId: sub.user_id, success: false, error: String(error) })
      }
    }

    // Update campaign status
    if (campaignId) {
      await supabase
        .from('notification_campaigns')
        .update({
          status: 'sent',
          sent_at: new Date().toISOString(),
          recipients_count: targetUsers.length,
          sent_count: sentCount,
        })
        .eq('id', campaignId)
    }

    console.log(`Sent ${sentCount}/${subscriptions.length} notifications`)

    return new Response(
      JSON.stringify({
        success: true,
        targetUsers: targetUsers.length,
        subscriptions: subscriptions.length,
        sent: sentCount,
        failed: subscriptions.length - sentCount,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Targeted notification error:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to send notifications' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
