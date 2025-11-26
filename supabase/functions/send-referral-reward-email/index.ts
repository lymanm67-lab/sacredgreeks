import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ReferralRewardRequest {
  referrerEmail: string;
  referrerName: string;
  referredName: string;
  rewardPoints: number;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { referrerEmail, referrerName, referredName, rewardPoints }: ReferralRewardRequest = await req.json();

    console.log("Sending referral reward email to:", referrerEmail);

    const emailResponse = await resend.emails.send({
      from: "Sacred Greeks Life <onboarding@resend.dev>",
      to: [referrerEmail],
      subject: "🎉 You Earned Referral Rewards!",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
              .reward-box { background: white; border: 2px solid #667eea; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center; }
              .points { font-size: 48px; font-weight: bold; color: #667eea; }
              .cta { background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; margin-top: 20px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🎉 Congratulations, ${referrerName}!</h1>
              </div>
              <div class="content">
                <p>Great news! <strong>${referredName}</strong> just joined Sacred Greeks Life using your referral code.</p>
                
                <div class="reward-box">
                  <div class="points">${rewardPoints}</div>
                  <p style="margin: 0; font-size: 18px; color: #666;">Reward Points Earned</p>
                </div>
                
                <p>Thank you for spreading the word about Sacred Greeks Life! Your referral helps build a stronger community of faith-driven fraternity members.</p>
                
                <p><strong>Keep sharing:</strong> The more friends you invite, the more rewards you'll earn. Each successful referral brings you closer to exclusive perks and recognition!</p>
                
                <div style="text-align: center;">
                  <a href="${Deno.env.get("VITE_SUPABASE_URL")}/referrals" class="cta">View Your Referrals</a>
                </div>
                
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
    console.error("Error sending referral reward email:", error);
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
