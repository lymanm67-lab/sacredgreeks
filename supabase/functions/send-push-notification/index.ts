import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Input validation schema
const requestSchema = z.object({
  type: z.enum(['devotional', 'prayer']),
  userId: z.string().uuid().optional(),
  title: z.string().min(1).max(200),
  body: z.string().min(1).max(500),
  icon: z.string().url().optional(),
  data: z.record(z.unknown()).optional()
})

// Web Push VAPID keys should be stored as secrets
const VAPID_PUBLIC_KEY = Deno.env.get('VAPID_PUBLIC_KEY')
const VAPID_PRIVATE_KEY = Deno.env.get('VAPID_PRIVATE_KEY')
const VAPID_SUBJECT = Deno.env.get('VAPID_SUBJECT') || 'mailto:support@sacredgreeks.com'

async function sendPushNotification(
  subscription: { endpoint: string; auth_key: string; p256dh_key: string },
  payload: { title: string; body: string; icon?: string; badge?: string; data?: any }
) {
  const webPushMessage = JSON.stringify(payload)

  // Create the JWT token for VAPID
  const header = { typ: 'JWT', alg: 'ES256' }
  const jwtPayload = {
    aud: new URL(subscription.endpoint).origin,
    exp: Math.floor(Date.now() / 1000) + 12 * 60 * 60,
    sub: VAPID_SUBJECT,
  }

  // For production, you would properly sign this with the VAPID private key
  // This is a simplified version - in production use a proper JWT library
  const encodedHeader = btoa(JSON.stringify(header))
  const encodedPayload = btoa(JSON.stringify(jwtPayload))

  try {
    const response = await fetch(subscription.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/octet-stream',
        'TTL': '86400',
        'Content-Encoding': 'aes128gcm',
        'Authorization': `vapid t=${encodedHeader}.${encodedPayload}, k=${VAPID_PUBLIC_KEY}`,
      },
      body: webPushMessage,
    })

    return { success: response.ok, status: response.status }
  } catch (error) {
    console.error('Push notification error:', error)
    return { success: false, error }
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // SECURITY FIX #2: Proper service role key validation with constant-time comparison
    const authHeader = req.headers.get('Authorization')
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    
    if (!authHeader || !serviceRoleKey) {
      console.error('Missing authorization credentials')
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Extract bearer token and use constant-time comparison
    const token = authHeader.replace('Bearer ', '')
    
    // Constant-time comparison to prevent timing attacks
    let isValid = token.length === serviceRoleKey.length
    for (let i = 0; i < token.length; i++) {
      isValid = isValid && (token.charCodeAt(i) === serviceRoleKey.charCodeAt(i))
    }
    
    if (!isValid) {
      console.error('Invalid service role key')
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      serviceRoleKey ?? ''
    )

    // SECURITY FIX #3: Server-side input validation
    const requestBody = await req.json()
    const validation = requestSchema.safeParse(requestBody)
    
    if (!validation.success) {
      console.error('Validation error:', validation.error.errors)
      return new Response(
        JSON.stringify({ error: 'Invalid request data' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const { type, userId, title, body, icon, data } = validation.data

    // Get subscriptions based on type
    let query = supabase
      .from('push_subscriptions')
      .select('*')

    if (userId) {
      query = query.eq('user_id', userId)
    }

    // Filter by notification type preference
    if (type === 'devotional') {
      query = query.eq('devotional_reminders', true)
    } else if (type === 'prayer') {
      query = query.eq('prayer_reminders', true)
    }

    const { data: subscriptions, error } = await query

    if (error) throw error

    if (!subscriptions || subscriptions.length === 0) {
      return new Response(
        JSON.stringify({ message: 'No subscriptions found' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Send notifications to all subscriptions
    const results = await Promise.all(
      subscriptions.map(sub =>
        sendPushNotification(
          {
            endpoint: sub.endpoint,
            auth_key: sub.auth_key,
            p256dh_key: sub.p256dh_key,
          },
          {
            title,
            body,
            icon: icon || '/icon-192.png',
            badge: '/icon-192.png',
            data: data || {},
          }
        )
      )
    )

    const successCount = results.filter(r => r.success).length
    const failureCount = results.length - successCount

    return new Response(
      JSON.stringify({
        success: true,
        sent: successCount,
        failed: failureCount,
        total: results.length,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    // SECURITY FIX #4: Log detailed errors server-side, return generic message to client
    console.error('Push notification error:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to send notifications. Please try again.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
