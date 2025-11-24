import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
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
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    console.error('Error sending daily devotional reminder:', errorMessage)
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
