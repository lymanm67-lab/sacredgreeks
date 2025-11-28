import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface HealingStoryNotificationRequest {
  storyTitle: string;
  healingType: string;
  authorName?: string;
  authorEmail?: string;
}

const ADMIN_EMAIL = "admin@sacredgreeks.com"; // Update this to actual admin email

const getHealingTypeLabel = (type: string): string => {
  const types: Record<string, string> = {
    church_hurt: "Church Hurt",
    ministry_fallout: "Ministry Fallout",
    spiritual_trauma: "Spiritual Trauma",
    faith_reconciliation: "Faith Reconciliation",
    identity_journey: "Identity Journey",
    community_healing: "Community Healing",
    other: "Other"
  };
  return types[type] || type;
};

const handler = async (req: Request): Promise<Response> => {
  console.log("notify-healing-story function called");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { storyTitle, healingType, authorName, authorEmail }: HealingStoryNotificationRequest = await req.json();

    console.log(`New healing story submitted: ${storyTitle}`);

    // Send notification to admin
    const adminEmailResponse = await resend.emails.send({
      from: "Sacred Greeks <onboarding@resend.dev>",
      to: [ADMIN_EMAIL],
      subject: "New Healing Story Submitted for Review",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #f59e0b 0%, #f43f5e 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px;">New Healing Story Submitted</h1>
            <p style="color: #ffffff; margin: 10px 0 0 0; opacity: 0.9;">Awaiting your review</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 12px 12px;">
            <div style="background: #ffffff; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #f59e0b;">
              <p style="margin: 0 0 8px 0; font-weight: 600; color: #1e3a5f;">Story Title:</p>
              <p style="margin: 0; color: #333; font-size: 18px;">${storyTitle}</p>
            </div>
            
            <div style="background: #ffffff; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <p style="margin: 0 0 8px 0; font-weight: 600; color: #1e3a5f;">Details:</p>
              <ul style="margin: 0; padding-left: 20px; color: #555;">
                <li><strong>Healing Type:</strong> ${getHealingTypeLabel(healingType)}</li>
                <li><strong>Author:</strong> ${authorName || "Anonymous"}</li>
                ${authorEmail ? `<li><strong>Email:</strong> ${authorEmail}</li>` : ""}
              </ul>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="https://sacredgreeks.com/admin" style="display: inline-block; background: linear-gradient(135deg, #f59e0b 0%, #f43f5e 100%); color: #ffffff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600;">Review in Admin Panel</a>
            </div>
            
            <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; color: #6c757d; font-size: 14px; text-align: center;">
              Please review and approve or reject this story in the admin panel.
            </p>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Admin notification sent:", adminEmailResponse);

    // Send confirmation to the author if they provided an email
    if (authorEmail) {
      const authorEmailResponse = await resend.emails.send({
        from: "Sacred Greeks <onboarding@resend.dev>",
        to: [authorEmail],
        subject: "Thank You for Sharing Your Healing Story",
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
              <h1 style="color: #d4af37; margin: 0; font-size: 24px;">Thank You for Sharing</h1>
              <p style="color: #ffffff; margin: 10px 0 0 0; opacity: 0.9;">Your healing story has been received</p>
            </div>
            
            <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 12px 12px;">
              <p style="color: #333; margin-bottom: 20px;">
                Dear ${authorName || "Friend"},
              </p>
              
              <p style="color: #555; margin-bottom: 20px;">
                Thank you for sharing your healing story with the Sacred Greeks community. Your courage to share your journey can be a powerful source of encouragement for others going through similar experiences.
              </p>
              
              <div style="background: #ffffff; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #d4af37;">
                <p style="margin: 0 0 8px 0; font-weight: 600; color: #1e3a5f;">Your Story:</p>
                <p style="margin: 0; color: #333;">"${storyTitle}"</p>
                <span style="display: inline-block; margin-top: 10px; background: #fef3c7; color: #92400e; padding: 4px 12px; border-radius: 20px; font-size: 12px;">${getHealingTypeLabel(healingType)}</span>
              </div>
              
              <p style="color: #555; margin-bottom: 20px;">
                Our team will review your submission and, if approved, it will be shared on our site to inspire others in their healing journey. We'll notify you once it's been reviewed.
              </p>
              
              <div style="text-align: center; margin-top: 30px;">
                <a href="https://sacredgreeks.com/family-ministry-fallout" style="display: inline-block; background: linear-gradient(135deg, #d4af37 0%, #c9a227 100%); color: #1e3a5f; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600;">Explore More Healing Resources</a>
              </div>
              
              <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; color: #6c757d; font-size: 14px; text-align: center;">
                "He heals the brokenhearted and binds up their wounds." - Psalm 147:3
              </p>
            </div>
          </body>
          </html>
        `,
      });

      console.log("Author confirmation sent:", authorEmailResponse);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in notify-healing-story function:", error);
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
