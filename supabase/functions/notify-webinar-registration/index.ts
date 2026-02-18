import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface RegistrationData {
  webinarTitle: string;
  fullName: string;
  email: string;
  phone?: string;
  greekOrganization?: string;
  howHeard?: string;
}

serve(async (req: Request): Promise<Response> => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const adminEmail = Deno.env.get("ADMIN_EMAIL");

    if (!resendApiKey) {
      throw new Error("RESEND_API_KEY not configured");
    }

    if (!adminEmail) {
      throw new Error("ADMIN_EMAIL not configured");
    }

    const resend = new Resend(resendApiKey);
    const data: RegistrationData = await req.json();

    const { webinarTitle, fullName, email, phone, greekOrganization, howHeard } = data;

    // Send notification email to admin
    const emailResponse = await resend.emails.send({
      from: "Sacred Greeks <noreply@sacredgreekslife.com>",
      to: [adminEmail],
      subject: `🎉 New Webinar Registration: ${webinarTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #1e3a5f; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
            New Webinar Registration!
          </h1>
          
          <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #0369a1; margin-top: 0;">Webinar Details</h2>
            <p style="margin: 5px 0;"><strong>Title:</strong> ${webinarTitle}</p>
          </div>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #334155; margin-top: 0;">Registrant Information</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><strong>Name:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">${fullName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><strong>Email:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
                  <a href="mailto:${email}" style="color: #3b82f6;">${email}</a>
                </td>
              </tr>
              ${phone ? `
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><strong>Phone:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">${phone}</td>
              </tr>
              ` : ''}
              ${greekOrganization ? `
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><strong>Organization:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">${greekOrganization}</td>
              </tr>
              ` : ''}
              ${howHeard ? `
              <tr>
                <td style="padding: 8px 0;"><strong>How They Heard:</strong></td>
                <td style="padding: 8px 0;">${howHeard}</td>
              </tr>
              ` : ''}
            </table>
          </div>
          
          <p style="color: #64748b; font-size: 12px; margin-top: 30px; text-align: center;">
            This is an automated notification from Sacred Greeks.
          </p>
        </div>
      `,
    });

    console.log("Admin notification email sent:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending notification:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
