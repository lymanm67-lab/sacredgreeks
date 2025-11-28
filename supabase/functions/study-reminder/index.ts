import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Resend } from "https://esm.sh/resend@4.0.0";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-cron-secret",
};

interface UserProgress {
  user_id: string;
  email: string;
  full_name: string | null;
  completed_sessions: number;
  total_sessions: number;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // SECURITY: Validate cron secret
    const cronSecret = Deno.env.get("CRON_SECRET");
    const providedSecret = req.headers.get("x-cron-secret");
    
    if (!providedSecret || providedSecret !== cronSecret) {
      console.error("Unauthorized: Invalid cron secret");
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const resend = new Resend(resendApiKey);

    console.log("Starting study reminder process...");

    // Create Supabase client with service role key to bypass RLS
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get all users with their progress
    const { data: profiles, error: profilesError } = await supabase
      .from("profiles")
      .select("id, email, full_name");

    if (profilesError) {
      console.error("Error fetching profiles:", profilesError);
      throw profilesError;
    }

    console.log(`Found ${profiles?.length || 0} users`);

    // Get study progress for all users
    const { data: progressData, error: progressError } = await supabase
      .from("study_session_progress")
      .select("user_id, session_id, completed");

    if (progressError) {
      console.error("Error fetching progress:", progressError);
      throw progressError;
    }

    // Calculate progress for each user
    const usersToNotify: UserProgress[] = [];
    const totalSessions = 5;

    for (const profile of profiles || []) {
      if (!profile.email) continue;

      const userProgress = progressData?.filter(
        (p) => p.user_id === profile.id && p.completed
      ) || [];

      const completedSessions = userProgress.length;

      // Only notify users who have incomplete sessions
      if (completedSessions < totalSessions) {
        usersToNotify.push({
          user_id: profile.id,
          email: profile.email,
          full_name: profile.full_name,
          completed_sessions: completedSessions,
          total_sessions: totalSessions,
        });
      }
    }

    console.log(`Sending reminders to ${usersToNotify.length} users...`);

    // Send emails to all users with incomplete sessions
    const emailPromises = usersToNotify.map(async (user) => {
      const greeting = user.full_name ? `Hi ${user.full_name}` : "Hi there";
      const nextSession = user.completed_sessions + 1;
      const studyGuideUrl = "https://sacredgreekslife.com/study";

      try {
        const emailResponse = await resend.emails.send({
          from: "Sacred Greeks <onboarding@resend.dev>",
          to: [user.email],
          subject: "Continue Your Sacred, Not Sinful Study Journey ✨",
          html: `
            <!DOCTYPE html>
            <html>
              <head>
                <style>
                  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
                  .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                  .header { background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; }
                  .content { background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none; }
                  .progress-bar { background: #e5e7eb; height: 8px; border-radius: 4px; margin: 20px 0; overflow: hidden; }
                  .progress-fill { background: linear-gradient(90deg, #8B5CF6 0%, #7C3AED 100%); height: 100%; transition: width 0.3s; }
                  .button { display: inline-block; background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%); color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 20px 0; }
                  .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
                  .stats { background: #f9fafb; padding: 20px; border-radius: 6px; margin: 20px 0; }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h1 style="margin: 0; font-size: 28px;">📖 Study Reminder</h1>
                  </div>
                  <div class="content">
                    <p style="font-size: 16px;"><strong>${greeting}!</strong></p>
                    
                    <p>We hope your journey through the Sacred, Not Sinful study guide has been meaningful so far. This is your weekly reminder to continue growing in faith and understanding.</p>
                    
                    <div class="stats">
                      <h3 style="margin-top: 0; color: #8B5CF6;">Your Progress</h3>
                      <p style="margin: 10px 0;"><strong>${user.completed_sessions} of ${user.total_sessions} sessions completed</strong></p>
                      <div class="progress-bar">
                        <div class="progress-fill" style="width: ${(user.completed_sessions / user.total_sessions) * 100}%;"></div>
                      </div>
                      <p style="color: #6b7280; font-size: 14px; margin-bottom: 0;">
                        ${user.completed_sessions === 0 
                          ? "Ready to start your journey? Session 1 awaits!" 
                          : `Next up: Session ${nextSession}`
                        }
                      </p>
                    </div>

                    <p>Each session includes:</p>
                    <ul style="color: #4b5563;">
                      <li>Scripture-based teaching</li>
                      <li>Thought-provoking discussion questions</li>
                      <li>Practical action steps</li>
                      <li>Space for your personal notes and reflections</li>
                    </ul>

                    <div style="text-align: center;">
                      <a href="${studyGuideUrl}" class="button">Continue Your Study →</a>
                    </div>

                    <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
                      <em>"Continue to work out your salvation with fear and trembling, for it is God who works in you to will and to act in order to fulfill his good purpose." - Philippians 2:12-13</em>
                    </p>
                  </div>
                  <div class="footer">
                    <p>Based on "Sacred, Not Sinful" by Dr. Lyman</p>
                    <p style="font-size: 12px; color: #9ca3af;">
                      You're receiving this email because you started the Sacred, Not Sinful study guide.
                    </p>
                  </div>
                </div>
              </body>
            </html>
          `,
        });

        console.log(`Email sent to user ${user.user_id}`);
        return { success: true, email: user.email };
      } catch (error) {
        console.error(`Failed to send email to user ${user.user_id}:`, error);
        return { success: false, email: user.email, error: error instanceof Error ? error.message : String(error) };
      }
    });

    const results = await Promise.all(emailPromises);
    const successCount = results.filter((r) => r.success).length;
    const failCount = results.filter((r) => !r.success).length;

    console.log(`Study reminders sent: ${successCount} successful, ${failCount} failed`);

    return new Response(
      JSON.stringify({
        message: "Study reminders processed",
        total_users: usersToNotify.length,
        successful: successCount,
        failed: failCount,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in study-reminder function:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send study reminders" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
