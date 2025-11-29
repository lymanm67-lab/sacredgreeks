import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface LaunchReadyRequest {
  completedBy?: string;
  completedAt: string;
  totalItems: number;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Launch ready notification function called");

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { completedBy, completedAt, totalItems }: LaunchReadyRequest = await req.json();
    
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    const adminEmail = Deno.env.get("ADMIN_EMAIL");
    
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY not configured");
      return new Response(
        JSON.stringify({ error: "Resend API key not configured" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    
    if (!adminEmail) {
      console.error("ADMIN_EMAIL not configured");
      return new Response(
        JSON.stringify({ error: "Admin email not configured" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log(`Sending launch ready notification to ${adminEmail}`);

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 12px 12px; }
          .badge { display: inline-block; background: #10b981; color: white; padding: 8px 16px; border-radius: 20px; font-weight: bold; }
          .stats { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .stat-item { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
          .stat-item:last-child { border-bottom: none; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 28px;">🎉 Launch Ready!</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">All checklist items have been completed</p>
          </div>
          <div class="content">
            <p>Great news! The beta launch checklist for <strong>Sacred Greeks</strong> has been fully completed.</p>
            
            <div class="stats">
              <div class="stat-item">
                <span>Total Items Completed</span>
                <span class="badge">${totalItems}/${totalItems}</span>
              </div>
              <div class="stat-item">
                <span>Completed At</span>
                <span>${new Date(completedAt).toLocaleString()}</span>
              </div>
              ${completedBy ? `
              <div class="stat-item">
                <span>Completed By</span>
                <span>${completedBy}</span>
              </div>
              ` : ''}
            </div>
            
            <h3>✅ All Critical Security Items Verified</h3>
            <ul>
              <li>Row Level Security enabled</li>
              <li>User data protection in place</li>
              <li>Privacy policies reviewed</li>
              <li>Terms of service confirmed</li>
            </ul>
            
            <p style="color: #6b7280; text-align: center; margin-top: 30px;">The application is ready for beta launch!</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Sacred Greeks <onboarding@resend.dev>",
        to: [adminEmail],
        subject: "🚀 Beta Launch Checklist Complete - Ready to Go Live!",
        html: emailHtml,
      }),
    });

    const emailResult = await emailResponse.json();
    console.log("Email response:", emailResult);

    if (!emailResponse.ok) {
      throw new Error(emailResult.message || "Failed to send email");
    }

    return new Response(JSON.stringify({ success: true, emailResult }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending launch ready notification:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
