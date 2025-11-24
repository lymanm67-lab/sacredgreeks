import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PushSubscription {
  id: string;
  user_id: string;
  endpoint: string;
  p256dh_key: string;
  auth_key: string;
  prayer_reminder_schedule: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting prayer journal reminder job...');
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const vapidPublicKey = Deno.env.get('VAPID_PUBLIC_KEY')!;
    const vapidPrivateKey = Deno.env.get('VAPID_PRIVATE_KEY')!;
    const vapidSubject = Deno.env.get('VAPID_SUBJECT')!;

    if (!vapidPublicKey || !vapidPrivateKey || !vapidSubject) {
      throw new Error('VAPID keys not configured');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get the schedule type from request body (daily or weekly)
    const { schedule } = await req.json();
    
    if (!schedule || !['daily', 'weekly'].includes(schedule)) {
      throw new Error('Invalid schedule type. Must be "daily" or "weekly"');
    }

    console.log(`Fetching ${schedule} prayer reminder subscriptions...`);

    // Get all subscriptions with the specified schedule
    const { data: subscriptions, error: subsError } = await supabase
      .from('push_subscriptions')
      .select('*')
      .eq('prayer_reminder_schedule', schedule);

    if (subsError) {
      console.error('Error fetching subscriptions:', subsError);
      throw subsError;
    }

    console.log(`Found ${subscriptions?.length || 0} subscriptions with ${schedule} schedule`);

    if (!subscriptions || subscriptions.length === 0) {
      return new Response(
        JSON.stringify({ message: `No ${schedule} subscriptions found` }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      );
    }

    // Prepare notification payload
    const notificationTitle = schedule === 'daily' 
      ? '📿 Daily Prayer Journal Reminder'
      : '📿 Weekly Prayer Journal Reflection';
    
    const notificationBody = schedule === 'daily'
      ? 'Take a moment to write down your prayers and reflections today.'
      : 'Time for your weekly prayer reflection. Review your prayers and see how God has been working.';

    const notification = {
      title: notificationTitle,
      body: notificationBody,
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      data: {
        url: '/prayer-journal',
        timestamp: new Date().toISOString(),
      },
    };

    let successCount = 0;
    let failureCount = 0;

    // Send notifications to all subscribed users
    for (const subscription of subscriptions as PushSubscription[]) {
      try {
        console.log(`Sending notification to user ${subscription.user_id}...`);

        // Use web-push library via esm.sh
        const webpush = await import('https://esm.sh/web-push@3.6.6');
        
        webpush.setVapidDetails(
          vapidSubject,
          vapidPublicKey,
          vapidPrivateKey
        );

        const pushSubscription = {
          endpoint: subscription.endpoint,
          keys: {
            p256dh: subscription.p256dh_key,
            auth: subscription.auth_key,
          },
        };

        await webpush.sendNotification(
          pushSubscription,
          JSON.stringify(notification)
        );

        successCount++;
        console.log(`Successfully sent notification to user ${subscription.user_id}`);
      } catch (error: any) {
        failureCount++;
        console.error(`Failed to send notification to user ${subscription.user_id}:`, error);
        
        // If subscription is invalid (410 Gone), remove it from database
        if (error?.statusCode === 410) {
          console.log(`Removing invalid subscription for user ${subscription.user_id}`);
          await supabase
            .from('push_subscriptions')
            .delete()
            .eq('id', subscription.id);
        }
      }
    }

    console.log(`Prayer reminder job completed. Success: ${successCount}, Failed: ${failureCount}`);

    return new Response(
      JSON.stringify({
        message: `${schedule} prayer journal reminders sent`,
        success: successCount,
        failed: failureCount,
        total: subscriptions.length,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (error: any) {
    console.error('Error in prayer-journal-reminder function:', error);
    return new Response(
      JSON.stringify({ error: error?.message || 'Unknown error' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});