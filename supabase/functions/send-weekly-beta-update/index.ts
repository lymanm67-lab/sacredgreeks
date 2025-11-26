import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log("Fetching active beta testers...");

    // Get all active beta testers
    const { data: betaTesters, error: betaError } = await supabase
      .from("beta_testers")
      .select(`
        user_id,
        feedback_count,
        onboarding_completed_at,
        profiles:user_id (
          email,
          full_name
        )
      `)
      .eq("status", "active");

    if (betaError) {
      throw new Error(`Failed to fetch beta testers: ${betaError.message}`);
    }

    console.log(`Found ${betaTesters?.length || 0} active beta testers`);

    // Get this week's stats
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const { count: newFeedbackCount } = await supabase
      .from("beta_feedback")
      .select("*", { count: "exact", head: true })
      .gte("created_at", oneWeekAgo.toISOString());

    const { count: newUsersCount } = await supabase
      .from("beta_testers")
      .select("*", { count: "exact", head: true })
      .gte("created_at", oneWeekAgo.toISOString());

    // Send emails to all active beta testers
    const emailPromises = betaTesters?.map(async (tester: any) => {
      const email = tester.profiles?.email;
      const name = tester.profiles?.full_name || "Beta Tester";

      if (!email) {
        console.log(`Skipping tester with no email: ${tester.user_id}`);
        return null;
      }

      console.log(`Sending weekly update to: ${email}`);

      return resend.emails.send({
        from: "Sacred Greeks Life <onboarding@resend.dev>",
        to: [email],
        subject: "📊 Your Weekly Sacred Greeks Life Update",
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
                .stat-box { background: white; padding: 20px; margin: 15px 0; border-radius: 8px; border-left: 4px solid #667eea; }
                .stat-number { font-size: 32px; font-weight: bold; color: #667eea; margin: 0; }
                .highlight { background: #fff; padding: 20px; border-radius: 8px; margin: 20px 0; border: 2px solid #667eea; }
                .cta { background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; margin-top: 20px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>📊 Weekly Update</h1>
                  <p style="margin: 0; font-size: 18px;">Your Sacred Greeks Life Progress</p>
                </div>
                <div class="content">
                  <p>Hi ${name},</p>
                  
                  <p>Here's what happened this week in our beta community:</p>
                  
                  <div class="stat-box">
                    <p class="stat-number">${newUsersCount || 0}</p>
                    <p style="margin: 5px 0 0 0; color: #666;">New Beta Testers Joined</p>
                  </div>
                  
                  <div class="stat-box">
                    <p class="stat-number">${newFeedbackCount || 0}</p>
                    <p style="margin: 5px 0 0 0; color: #666;">Feedback Submissions</p>
                  </div>
                  
                  <div class="stat-box">
                    <p class="stat-number">${tester.feedback_count}</p>
                    <p style="margin: 5px 0 0 0; color: #666;">Your Total Contributions</p>
                  </div>
                  
                  <div class="highlight">
                    <h3 style="margin-top: 0; color: #667eea;">🚀 New This Week</h3>
                    <ul style="color: #666;">
                      <li>Enhanced analytics dashboard with visual charts</li>
                      <li>Improved referral tracking system</li>
                      <li>New achievement badges for engagement</li>
                    </ul>
                  </div>
                  
                  <div class="highlight">
                    <h3 style="margin-top: 0; color: #667eea;">💡 Your Impact Matters</h3>
                    <p>Your feedback is shaping the future of Sacred Greeks Life. Every suggestion, bug report, and feature request helps us build a better platform for faith-driven fraternity members.</p>
                  </div>
                  
                  <p><strong>Keep the momentum going:</strong></p>
                  <ul style="color: #666;">
                    <li>📝 Share your thoughts using the feedback widget</li>
                    <li>🤝 Invite your fraternity brothers with your referral code</li>
                    <li>🏆 Complete daily challenges to earn rewards</li>
                  </ul>
                  
                  <div style="text-align: center;">
                    <a href="${Deno.env.get("VITE_SUPABASE_URL")}/dashboard" class="cta">Visit Dashboard</a>
                  </div>
                  
                  <p style="margin-top: 30px; color: #666; font-size: 14px;">
                    <em>In faith and brotherhood,<br>The Sacred Greeks Life Team</em>
                  </p>
                  
                  <p style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; color: #999; font-size: 12px;">
                    You're receiving this email as an active beta tester. To manage your preferences, visit your profile settings.
                  </p>
                </div>
              </div>
            </body>
          </html>
        `,
      });
    }) || [];

    const results = await Promise.allSettled(emailPromises);
    const successCount = results.filter(r => r.status === "fulfilled").length;
    const failCount = results.filter(r => r.status === "rejected").length;

    console.log(`Email batch complete: ${successCount} sent, ${failCount} failed`);

    return new Response(
      JSON.stringify({
        success: true,
        sent: successCount,
        failed: failCount,
        total: betaTesters?.length || 0,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error sending weekly beta updates:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
