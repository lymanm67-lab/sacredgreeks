import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface OnboardingCompleteRequest {
  userEmail: string;
  userName: string;
  referralCode: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userEmail, userName, referralCode }: OnboardingCompleteRequest = await req.json();

    console.log("Sending onboarding completion email to:", userEmail);

    const emailResponse = await resend.emails.send({
      from: "Sacred Greeks Life <onboarding@resend.dev>",
      to: [userEmail],
      subject: "🎓 Welcome to Sacred Greeks Life Beta!",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
              .feature-box { background: white; border-left: 4px solid #667eea; padding: 15px; margin: 15px 0; border-radius: 4px; }
              .referral-code { background: #667eea; color: white; padding: 15px; text-align: center; border-radius: 8px; font-size: 24px; font-weight: bold; letter-spacing: 2px; margin: 20px 0; }
              .cta { background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; margin-top: 20px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🎓 Welcome, ${userName}!</h1>
                <p style="margin: 0; font-size: 18px;">Your Journey Begins Now</p>
              </div>
              <div class="content">
                <p>Congratulations on completing your onboarding! You're now part of an exclusive community of faith-driven fraternity members.</p>
                
                <h2 style="color: #667eea;">🚀 What's Next?</h2>
                
                <div class="feature-box">
                  <strong>📖 Daily Devotionals</strong>
                  <p style="margin: 5px 0 0 0; color: #666;">Start your day with faith-based reflections and biblical wisdom.</p>
                </div>
                
                <div class="feature-box">
                  <strong>🙏 Prayer Wall</strong>
                  <p style="margin: 5px 0 0 0; color: #666;">Share prayer requests and support your brothers in faith.</p>
                </div>
                
                <div class="feature-box">
                  <strong>📚 Study Guides</strong>
                  <p style="margin: 5px 0 0 0; color: #666;">Deepen your understanding with structured biblical studies.</p>
                </div>
                
                <div class="feature-box">
                  <strong>🏆 Achievements</strong>
                  <p style="margin: 5px 0 0 0; color: #666;">Track your spiritual growth and earn rewards for engagement.</p>
                </div>
                
                <h2 style="color: #667eea;">🎁 Your Unique Referral Code</h2>
                <p>Invite your fraternity brothers and earn rewards for each person who joins:</p>
                
                <div class="referral-code">${referralCode}</div>
                
                <p style="text-align: center; color: #666;">Share this code with friends to earn bonus points!</p>
                
                <div style="text-align: center;">
                  <a href="${Deno.env.get("VITE_SUPABASE_URL")}/dashboard" class="cta">Go to Dashboard</a>
                </div>
                
                <p style="margin-top: 30px; padding: 20px; background: #fff; border-radius: 8px;">
                  <strong>💡 Beta Tester Tip:</strong> Your feedback shapes our platform! Use the feedback widget in the app to share suggestions, report bugs, or praise features you love.
                </p>
                
                <p style="margin-top: 30px; color: #666; font-size: 14px;">
                  <em>In faith and brotherhood,<br>The Sacred Greeks Life Team</em>
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending onboarding completion email:", error);
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
