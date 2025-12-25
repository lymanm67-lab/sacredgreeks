import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface WaitlistNotificationRequest {
  fullName: string;
  email: string;
  organization?: string;
  goals?: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("notify-coaching-waitlist function called");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { fullName, email, organization, goals }: WaitlistNotificationRequest = await req.json();

    console.log(`Processing waitlist notification for: ${email}`);

    if (!fullName || !email) {
      console.error("Missing required fields");
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Send confirmation email to the user
    const userEmailResponse = await resend.emails.send({
      from: "Sacred Greeks <onboarding@resend.dev>",
      to: [email],
      subject: "Welcome to the Sacred Not Sinful Group Coaching Waitlist!",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .highlight { background: #ede9fe; padding: 15px; border-radius: 8px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px; }
            h1 { margin: 0; font-size: 24px; }
            .btn { display: inline-block; background: #7c3aed; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 15px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎓 You're on the Waitlist!</h1>
            </div>
            <div class="content">
              <p>Dear ${fullName},</p>
              <p>Thank you for your interest in the <strong>Sacred Not Sinful Group Coaching Experience</strong>!</p>
              
              <div class="highlight">
                <p><strong>What's Next?</strong></p>
                <ul>
                  <li>You'll be notified when the next cohort opens</li>
                  <li>Limited to 20 spots per session</li>
                  <li>8 weeks of guided learning with Dr. Lyman Montgomery</li>
                </ul>
              </div>

              ${organization ? `<p><strong>Your Organization:</strong> ${organization}</p>` : ''}
              ${goals ? `<p><strong>Your Goals:</strong> ${goals}</p>` : ''}
              
              <p>We're excited to journey with you through faith and Greek life!</p>
              
              <p>Blessings,<br><strong>Dr. Lyman A. Montgomery, III</strong><br>Sacred Greeks</p>
            </div>
            <div class="footer">
              <p>Sacred Greeks | Navigate Faith & Greek Life</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("User confirmation email sent:", userEmailResponse);

    // Send notification to admin
    const adminEmail = Deno.env.get("ADMIN_EMAIL");
    if (adminEmail) {
      const adminEmailResponse = await resend.emails.send({
        from: "Sacred Greeks <onboarding@resend.dev>",
        to: [adminEmail],
        subject: `New Coaching Waitlist Signup: ${fullName}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #1f2937; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
              .field { margin-bottom: 15px; padding: 10px; background: white; border-radius: 6px; }
              .label { font-weight: bold; color: #6b7280; font-size: 12px; text-transform: uppercase; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>📋 New Waitlist Signup</h2>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">Name</div>
                  <div>${fullName}</div>
                </div>
                <div class="field">
                  <div class="label">Email</div>
                  <div><a href="mailto:${email}">${email}</a></div>
                </div>
                ${organization ? `
                <div class="field">
                  <div class="label">Organization</div>
                  <div>${organization}</div>
                </div>` : ''}
                ${goals ? `
                <div class="field">
                  <div class="label">Goals</div>
                  <div>${goals}</div>
                </div>` : ''}
                <p style="margin-top: 20px;">
                  <a href="https://sacred-greeks.lovable.app/admin" style="color: #7c3aed;">View in Admin Dashboard →</a>
                </p>
              </div>
            </div>
          </body>
          </html>
        `,
      });

      console.log("Admin notification email sent:", adminEmailResponse);
    }

    return new Response(
      JSON.stringify({ success: true, message: "Notifications sent successfully" }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in notify-coaching-waitlist function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
