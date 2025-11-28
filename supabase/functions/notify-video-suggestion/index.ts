import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NotificationRequest {
  suggestionId: string;
  status: "approved" | "rejected";
  adminNotes?: string;
}

serve(async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { suggestionId, status, adminNotes }: NotificationRequest = await req.json();

    console.log(`Processing notification for suggestion ${suggestionId}, status: ${status}`);

    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get the suggestion details
    const { data: suggestion, error: suggestionError } = await supabase
      .from("video_suggestions")
      .select("*")
      .eq("id", suggestionId)
      .single();

    if (suggestionError || !suggestion) {
      console.error("Suggestion not found:", suggestionError);
      return new Response(
        JSON.stringify({ error: "Suggestion not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get the user's email from profiles
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("email, full_name")
      .eq("id", suggestion.user_id)
      .single();

    if (profileError || !profile?.email) {
      console.log("No email found for user, skipping notification");
      return new Response(
        JSON.stringify({ success: true, message: "No email found, notification skipped" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const userName = profile.full_name || "there";
    const isApproved = status === "approved";

    const subject = isApproved
      ? "🎉 Your video suggestion was approved!"
      : "Update on your video suggestion";

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f4;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 40px 20px;">
          <tr>
            <td align="center">
              <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #4A2C6D 0%, #6B4D8A 100%); padding: 30px 40px; text-align: center;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600;">
                      Sacred Greeks
                    </h1>
                  </td>
                </tr>
                
                <!-- Content -->
                <tr>
                  <td style="padding: 40px;">
                    <h2 style="color: #333333; margin: 0 0 20px 0; font-size: 22px;">
                      ${isApproved ? "Great news, " + userName + "!" : "Hi " + userName + ","}
                    </h2>
                    
                    <p style="color: #555555; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                      ${isApproved 
                        ? "Your video suggestion has been reviewed and approved by our team! We appreciate your contribution to the Sacred Greeks community."
                        : "Thank you for your video suggestion. After careful review, we've decided not to add this video to our library at this time."
                      }
                    </p>
                    
                    <!-- Video Details -->
                    <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0;">
                      <p style="color: #333333; font-weight: 600; margin: 0 0 10px 0;">
                        Video: ${suggestion.title}
                      </p>
                      <p style="color: #666666; font-size: 14px; margin: 0;">
                        Category: ${suggestion.category}
                      </p>
                    </div>
                    
                    ${adminNotes ? `
                    <div style="border-left: 4px solid ${isApproved ? '#22c55e' : '#f59e0b'}; padding-left: 16px; margin: 20px 0;">
                      <p style="color: #555555; font-size: 14px; margin: 0;">
                        <strong>Note from our team:</strong><br>
                        ${adminNotes}
                      </p>
                    </div>
                    ` : ''}
                    
                    <p style="color: #555555; font-size: 16px; line-height: 1.6; margin: 20px 0 0 0;">
                      ${isApproved 
                        ? "The video will be added to our Video Library soon. Keep sharing great content!"
                        : "We encourage you to continue suggesting videos that align with our mission to support Christians navigating Greek life."
                      }
                    </p>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="background-color: #f8f9fa; padding: 20px 40px; text-align: center;">
                    <p style="color: #888888; font-size: 12px; margin: 0;">
                      Sacred Greeks - Faith & Greek Life Resources
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    console.log(`Sending notification email to ${profile.email}`);

    const emailResponse = await resend.emails.send({
      from: "Sacred Greeks <onboarding@resend.dev>",
      to: [profile.email],
      subject: subject,
      html: html,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ success: true, emailId: emailResponse.data?.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error sending notification:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
