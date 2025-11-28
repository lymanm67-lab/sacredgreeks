import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-cron-secret',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // SECURITY: Validate cron secret
    const cronSecret = Deno.env.get('CRON_SECRET');
    const providedSecret = req.headers.get('x-cron-secret');
    
    if (!providedSecret || providedSecret !== cronSecret) {
      console.error('Unauthorized: Invalid cron secret');
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Check if there's a devotional for today
    const today = new Date().toISOString().split('T')[0]
    const { data: devotional, error: devotionalError } = await supabase
      .from('daily_devotionals')
      .select('title, proof_focus')
      .eq('date', today)
      .maybeSingle()

    if (devotionalError) throw devotionalError

    if (!devotional) {
      console.log('No devotional for today')
      return new Response(
        JSON.stringify({ message: 'No devotional for today' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Call the send-push-notification function
    const notificationPayload = {
      type: 'devotional',
      title: 'Daily Devotional Ready!',
      body: `Today's focus: ${devotional.proof_focus}. ${devotional.title}`,
      icon: '/icon-192.png',
      data: {
        url: '/devotional',
        type: 'devotional',
      },
    }

    const notificationResponse = await fetch(
      `${Deno.env.get('SUPABASE_URL')}/functions/v1/send-push-notification`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
        },
        body: JSON.stringify(notificationPayload),
      }
    )

    const result = await notificationResponse.json()

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Daily devotional reminders sent',
        ...result,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error sending daily devotional reminder:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to send reminders. Please try again.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
