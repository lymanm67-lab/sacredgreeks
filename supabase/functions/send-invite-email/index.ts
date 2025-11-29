import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface InviteEmailRequest {
  inviterName: string;
  inviterEmail: string;
  recipientEmail: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Authentication check
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { global: { headers: { Authorization: req.headers.get("Authorization")! } } }
    );

    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
    if (authError || !user) {
      console.error("Authentication failed:", authError?.message);
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const { inviterName, inviterEmail, recipientEmail }: InviteEmailRequest = await req.json();

    // Validate that the inviter email matches the authenticated user
    if (user.email !== inviterEmail) {
      console.error("Email mismatch: authenticated user email doesn't match inviter email");
      return new Response(
        JSON.stringify({ error: "Forbidden: You can only send invites from your own email" }),
        { status: 403, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Input validation
    if (!recipientEmail || typeof recipientEmail !== "string" || !recipientEmail.includes("@")) {
      return new Response(
        JSON.stringify({ error: "Invalid recipient email" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log(`Authenticated user ${user.email} sending invite to ${recipientEmail}`);

    const signupUrl = `${req.headers.get("origin") || "https://sacred-greeks.com"}/auth`;

    const emailResponse = await resend.emails.send({
      from: "Sacred Greeks <onboarding@resend.dev>",
      to: [recipientEmail],
      subject: `${inviterName} invited you to join Sacred Greeks`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%); color: white; padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background: #f9fafb; padding: 40px 20px; }
              .button { display: inline-block; background: #7c3aed; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
              .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0; font-size: 28px;">Sacred Greeks</h1>
                <p style="margin: 10px 0 0; opacity: 0.9;">You've been invited!</p>
              </div>
              <div class="content">
                <h2 style="color: #111827; margin-top: 0;">Hi there!</h2>
                <p><strong>${inviterName}</strong> (${inviterEmail}) has invited you to join Sacred Greeks - a comprehensive platform for Greek life leadership development and spiritual growth.</p>
                
                <p><strong>What you'll get access to:</strong></p>
                <ul style="line-height: 2;">
                  <li>📚 Interactive study guides and assessments</li>
                  <li>🎙️ Podcast episodes and devotionals</li>
                  <li>📖 Prayer journal and community service tracker</li>
                  <li>📊 Progress tracking and certificates</li>
                  <li>🤝 Chapter meeting notes and resources</li>
                </ul>

                <div style="text-align: center;">
                  <a href="${signupUrl}" class="button">Join Sacred Greeks</a>
                </div>

                <p style="margin-top: 30px; font-size: 14px; color: #6b7280;">
                  Or copy and paste this link into your browser:<br/>
                  <a href="${signupUrl}" style="color: #7c3aed;">${signupUrl}</a>
                </p>
              </div>
              <div class="footer">
                <p>This invitation was sent by ${inviterName}. If you didn't expect this email, you can safely ignore it.</p>
                <p>&copy; ${new Date().getFullYear()} Sacred Greeks. All rights reserved.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    console.log("Invite email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ success: true, data: emailResponse }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error sending invite email:", error);
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
