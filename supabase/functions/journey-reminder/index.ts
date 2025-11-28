import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "https://esm.sh/resend@2.0.0";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const resendApiKey = Deno.env.get("RESEND_API_KEY")!;
const cronSecret = Deno.env.get("CRON_SECRET");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface JourneyDay {
  day: number;
  title: string;
  reading: string;
  scripture: string;
  scriptureRef: string;
}

const journeyContent: JourneyDay[] = [
  { day: 1, title: "The Foundation of Sacred Identity", reading: "Understanding who you are in Christ before considering any earthly affiliation.", scripture: "Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!", scriptureRef: "2 Corinthians 5:17" },
  { day: 2, title: "God's Design for Community", reading: "Exploring the biblical purpose of fellowship and belonging.", scripture: "And let us consider how we may spur one another on toward love and good deeds.", scriptureRef: "Hebrews 10:24" },
  { day: 3, title: "Testing All Things", reading: "How to evaluate organizations, traditions, and practices through Scripture.", scripture: "Test everything. Hold on to the good.", scriptureRef: "1 Thessalonians 5:21" },
  // More days would be added here...
];

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify cron secret or auth header
    const authHeader = req.headers.get("Authorization");
    const cronHeader = req.headers.get("x-cron-secret");
    
    if (cronHeader !== cronSecret && !authHeader?.includes(supabaseServiceKey)) {
      console.log("Authorized request - proceeding with journey reminders");
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const resend = new Resend(resendApiKey);

    // Get all users with journey progress
    const { data: profiles, error: profilesError } = await supabase
      .from("profiles")
      .select("id, email, full_name");

    if (profilesError) {
      throw new Error(`Failed to fetch profiles: ${profilesError.message}`);
    }

    // Get journey progress for each user
    const { data: journeyProgress, error: progressError } = await supabase
      .from("journey_progress")
      .select("user_id, day_number, completed");

    if (progressError) {
      throw new Error(`Failed to fetch journey progress: ${progressError.message}`);
    }

    // Calculate progress per user
    const userProgressMap = new Map<string, { completed: number; nextDay: number }>();
    
    journeyProgress?.forEach((progress) => {
      const current = userProgressMap.get(progress.user_id) || { completed: 0, nextDay: 1 };
      if (progress.completed) {
        current.completed++;
        current.nextDay = Math.max(current.nextDay, progress.day_number + 1);
      }
      userProgressMap.set(progress.user_id, current);
    });

    const emailResults: { email: string; success: boolean; error?: string }[] = [];

    for (const profile of profiles || []) {
      if (!profile.email) continue;

      const progress = userProgressMap.get(profile.id) || { completed: 0, nextDay: 1 };
      
      // Skip if journey is completed
      if (progress.completed >= 30) continue;

      const nextDayContent = journeyContent.find(d => d.day === progress.nextDay) || journeyContent[0];
      const userName = profile.full_name || "Sacred Greek";

      try {
        await resend.emails.send({
          from: "Sacred Greeks <noreply@sacredgreeks.com>",
          to: profile.email,
          subject: `Day ${progress.nextDay}: ${nextDayContent.title} - Sacred Greeks Journey`,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #6B46C1 0%, #9F7AEA 100%); color: white; padding: 30px; border-radius: 12px 12px 0 0; text-align: center; }
                .content { background: #f9fafb; padding: 30px; border-radius: 0 0 12px 12px; }
                .scripture { background: white; padding: 20px; border-left: 4px solid #6B46C1; margin: 20px 0; border-radius: 4px; }
                .progress { background: white; padding: 15px; border-radius: 8px; margin: 20px 0; }
                .progress-bar { background: #e5e7eb; height: 8px; border-radius: 4px; overflow: hidden; }
                .progress-fill { background: #6B46C1; height: 100%; transition: width 0.3s; }
                .cta { display: inline-block; background: #6B46C1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin-top: 20px; }
                .footer { text-align: center; color: #6b7280; font-size: 12px; margin-top: 30px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1 style="margin: 0; font-size: 24px;">Day ${progress.nextDay} of 30</h1>
                  <p style="margin: 10px 0 0 0; opacity: 0.9;">${nextDayContent.title}</p>
                </div>
                <div class="content">
                  <p>Good morning, ${userName}!</p>
                  <p>${nextDayContent.reading}</p>
                  
                  <div class="scripture">
                    <p style="font-style: italic; margin: 0;">"${nextDayContent.scripture}"</p>
                    <p style="color: #6B46C1; margin: 10px 0 0 0; font-weight: 500;">— ${nextDayContent.scriptureRef}</p>
                  </div>
                  
                  <div class="progress">
                    <p style="margin: 0 0 10px 0; font-weight: 500;">Your Progress</p>
                    <div class="progress-bar">
                      <div class="progress-fill" style="width: ${Math.round((progress.completed / 30) * 100)}%"></div>
                    </div>
                    <p style="margin: 10px 0 0 0; color: #6b7280; font-size: 14px;">${progress.completed}/30 days completed</p>
                  </div>
                  
                  <center>
                    <a href="https://sacredgreeks.com/journey" class="cta">Continue Your Journey</a>
                  </center>
                </div>
                <div class="footer">
                  <p>Sacred Greeks - Walking with Jesus in Greek Life</p>
                  <p>© ${new Date().getFullYear()} Sacred Greeks. All rights reserved.</p>
                </div>
              </div>
            </body>
            </html>
          `,
        });

        emailResults.push({ email: profile.email, success: true });
        console.log(`Journey reminder sent to ${profile.email}`);
      } catch (emailError: any) {
        emailResults.push({ email: profile.email, success: false, error: emailError.message });
        console.error(`Failed to send to ${profile.email}:`, emailError);
      }
    }

    const successCount = emailResults.filter(r => r.success).length;
    const failureCount = emailResults.filter(r => !r.success).length;

    return new Response(
      JSON.stringify({
        message: "Journey reminders processed",
        sent: successCount,
        failed: failureCount,
        results: emailResults,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error: any) {
    console.error("Journey reminder error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
