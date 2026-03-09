import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-cron-secret',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Auth: accept cron secret, service role, or anon key
    const cronSecret = Deno.env.get('CRON_SECRET');
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY');
    const providedSecret = req.headers.get('x-cron-secret');
    const authHeader = req.headers.get('authorization');
    
    const isValid = 
      (providedSecret && providedSecret === cronSecret) ||
      (authHeader && authHeader === `Bearer ${serviceRoleKey}`) ||
      (authHeader && authHeader === `Bearer ${anonKey}`);
    
    if (!isValid) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabase = createClient(supabaseUrl, serviceRoleKey!);
    const resendApiKey = Deno.env.get('RESEND_API_KEY');

    if (!resendApiKey) {
      throw new Error('RESEND_API_KEY not configured');
    }

    // Get users with digest enabled
    const { data: digestPrefs, error: prefsError } = await supabase
      .from('email_digest_preferences')
      .select('user_id')
      .eq('digest_enabled', true)
      .eq('frequency', 'weekly');

    if (prefsError) throw prefsError;
    if (!digestPrefs?.length) {
      return new Response(JSON.stringify({ message: 'No digest subscribers' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const userIds = digestPrefs.map(p => p.user_id);

    // Get profiles for these users
    const { data: profiles } = await supabase
      .from('profiles')
      .select('id, email, full_name')
      .in('id', userIds);

    if (!profiles?.length) {
      return new Response(JSON.stringify({ message: 'No profiles found' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Get this week's stats
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekAgoStr = weekAgo.toISOString();

    // Get recent devotionals
    const { data: recentDevotionals } = await supabase
      .from('daily_devotionals')
      .select('title, date, proof_focus')
      .gte('date', weekAgoStr.split('T')[0])
      .order('date', { ascending: false })
      .limit(3);

    // Get recent verse
    const { data: recentVerse } = await supabase
      .from('daily_verses')
      .select('verse_ref, verse_text, theme')
      .order('date', { ascending: false })
      .limit(1)
      .maybeSingle();

    let sentCount = 0;
    let failCount = 0;

    for (const profile of profiles) {
      if (!profile.email) continue;

      // Get user-specific stats
      const { data: progressData } = await supabase
        .from('user_progress')
        .select('devotional_completed')
        .eq('user_id', profile.id)
        .gte('date', weekAgoStr.split('T')[0]);

      const devotionalsThisWeek = progressData?.filter(p => p.devotional_completed).length || 0;

      const { data: gamData } = await supabase
        .from('user_gamification')
        .select('current_streak, total_points, current_level')
        .eq('user_id', profile.id)
        .maybeSingle();

      const streak = gamData?.current_streak || 0;
      const totalPoints = gamData?.total_points || 0;
      const level = gamData?.current_level || 1;

      const devotionalsList = recentDevotionals?.map(d => 
        `<li style="margin-bottom:8px;"><strong>${d.title}</strong> — ${d.proof_focus}</li>`
      ).join('') || '<li>Check back for new devotionals!</li>';

      const verseSection = recentVerse 
        ? `<blockquote style="border-left:3px solid #3B66D9;padding-left:12px;margin:16px 0;color:#555;font-style:italic;">"${recentVerse.verse_text}" — ${recentVerse.verse_ref}</blockquote>`
        : '';

      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"></head>
        <body style="font-family:system-ui,-apple-system,sans-serif;max-width:600px;margin:0 auto;padding:20px;background:#f8f9fa;">
          <div style="background:#ffffff;border-radius:12px;padding:32px;border:1px solid #e2e8f0;">
            <div style="text-align:center;margin-bottom:24px;">
              <h1 style="color:#1a2a5e;margin:0 0 4px;">📖 Your Weekly Digest</h1>
              <p style="color:#64748b;margin:0;">Sacred Greeks · Week in Review</p>
            </div>
            
            <p style="color:#334155;">Hey ${profile.full_name || 'there'},</p>
            <p style="color:#334155;">Here's what's been happening in your spiritual journey this week:</p>
            
            <div style="background:#f1f5f9;border-radius:8px;padding:16px;margin:16px 0;">
              <div style="display:flex;gap:16px;text-align:center;">
                <div style="flex:1;">
                  <p style="font-size:24px;font-weight:bold;color:#3B66D9;margin:0;">${devotionalsThisWeek}</p>
                  <p style="color:#64748b;font-size:12px;margin:0;">Devotionals</p>
                </div>
                <div style="flex:1;">
                  <p style="font-size:24px;font-weight:bold;color:#f59e0b;margin:0;">🔥 ${streak}</p>
                  <p style="color:#64748b;font-size:12px;margin:0;">Day Streak</p>
                </div>
                <div style="flex:1;">
                  <p style="font-size:24px;font-weight:bold;color:#10b981;margin:0;">⭐ Lv.${level}</p>
                  <p style="color:#64748b;font-size:12px;margin:0;">${totalPoints.toLocaleString()} pts</p>
                </div>
              </div>
            </div>

            ${verseSection}

            <h3 style="color:#1a2a5e;">📚 Recent Devotionals</h3>
            <ul style="color:#334155;padding-left:20px;">${devotionalsList}</ul>

            <div style="text-align:center;margin-top:24px;">
              <a href="https://sacredgreeks.lovable.app/dashboard" style="display:inline-block;background:#3B66D9;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;">Continue Your Journey →</a>
            </div>

            <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;">
            <p style="color:#94a3b8;font-size:12px;text-align:center;">
              You're receiving this because you opted into weekly digests.<br>
              <a href="https://sacredgreeks.lovable.app/notifications" style="color:#3B66D9;">Manage preferences</a>
            </p>
          </div>
        </body>
        </html>
      `;

      try {
        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: 'Sacred Greeks <noreply@sacredgreekslife.com>',
            to: profile.email,
            subject: `📖 Your Sacred Greeks Weekly Digest — ${streak > 0 ? `🔥 ${streak}-Day Streak!` : 'Keep Growing!'}`,
            html: htmlContent,
          }),
        });

        if (res.ok) {
          sentCount++;
          // Update last_sent_at
          await supabase
            .from('email_digest_preferences')
            .update({ last_sent_at: new Date().toISOString() })
            .eq('user_id', profile.id);
        } else {
          failCount++;
          console.error(`Failed to send to ${profile.id}:`, await res.text());
        }
      } catch (err) {
        failCount++;
        console.error(`Error sending to ${profile.id}:`, err);
      }
    }

    return new Response(JSON.stringify({
      message: 'Weekly digest sent',
      sent: sentCount,
      failed: failCount,
      total: profiles.length,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    console.error('Weekly digest error:', error);
    return new Response(JSON.stringify({ error: 'Failed to send digest' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
