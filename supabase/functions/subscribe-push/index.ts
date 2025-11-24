import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// SECURITY FIX #3: Input validation schema
const subscriptionSchema = z.object({
  subscription: z.object({
    endpoint: z.string().url().max(2000),
    keys: z.object({
      auth: z.string().min(1).max(500),
      p256dh: z.string().min(1).max(500)
    })
  }),
  preferences: z.object({
    devotionalReminders: z.boolean().optional(),
    prayerReminderSchedule: z.string().max(50).optional()
  }).optional()
})

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    const { data: { user } } = await supabaseClient.auth.getUser()
    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const requestBody = await req.json()
    
    // SECURITY FIX #3: Server-side validation
    const validation = subscriptionSchema.safeParse(requestBody)
    if (!validation.success) {
      console.error('Validation error:', validation.error.errors)
      return new Response(
        JSON.stringify({ error: 'Invalid subscription data' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const { subscription, preferences } = validation.data

    // Upsert subscription
    const { error } = await supabaseClient
      .from('push_subscriptions')
      .upsert({
        user_id: user.id,
        endpoint: subscription.endpoint,
        auth_key: subscription.keys.auth,
        p256dh_key: subscription.keys.p256dh,
        devotional_reminders: preferences?.devotionalReminders ?? true,
        prayer_reminder_schedule: preferences?.prayerReminderSchedule ?? 'none',
      }, {
        onConflict: 'endpoint'
      })

    if (error) throw error

    return new Response(
      JSON.stringify({ success: true, message: 'Subscription saved' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    // SECURITY FIX #4: Log detailed errors server-side, return generic message to client
    console.error('Subscribe push error:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to save subscription. Please try again.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
