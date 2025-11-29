import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";
import { checkRateLimit, getClientIdentifier, rateLimitResponse } from "../_shared/rate-limiter.ts";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

// HTML escape function to prevent XSS
const escapeHtml = (text: string): string => {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ApprovalNotificationRequest {
  storyTitle: string;
  authorName?: string;
  authorEmail: string;
  isFeatured?: boolean;
}

// Input validation
interface ValidationError {
  field: string;
  message: string;
}

const validateInput = (data: ApprovalNotificationRequest): ValidationError[] => {
  const errors: ValidationError[] = [];
  
  // storyTitle: required, max 200 chars
  if (!data.storyTitle || typeof data.storyTitle !== 'string') {
    errors.push({ field: 'storyTitle', message: 'Story title is required' });
  } else if (data.storyTitle.length > 200) {
    errors.push({ field: 'storyTitle', message: 'Story title must be 200 characters or less' });
  }
  
  // authorEmail: required, valid email format, max 255 chars
  if (!data.authorEmail || typeof data.authorEmail !== 'string') {
    errors.push({ field: 'authorEmail', message: 'Author email is required' });
  } else if (data.authorEmail.length > 255) {
    errors.push({ field: 'authorEmail', message: 'Email must be 255 characters or less' });
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.authorEmail)) {
    errors.push({ field: 'authorEmail', message: 'Invalid email format' });
  }
  
  // authorName: optional, max 100 chars
  if (data.authorName && typeof data.authorName === 'string' && data.authorName.length > 100) {
    errors.push({ field: 'authorName', message: 'Author name must be 100 characters or less' });
  }
  
  // isFeatured: optional, must be boolean if provided
  if (data.isFeatured !== undefined && typeof data.isFeatured !== 'boolean') {
    errors.push({ field: 'isFeatured', message: 'isFeatured must be a boolean' });
  }
  
  return errors;
};

const handler = async (req: Request): Promise<Response> => {
  console.log("notify-story-approved function called");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Rate limiting for approval notifications
  const clientId = getClientIdentifier(req);
  const rateLimit = checkRateLimit(clientId, 'email_notification');
  if (!rateLimit.allowed) {
    console.warn(`Rate limit exceeded for story approval from: ${clientId}`);
    return rateLimitResponse(corsHeaders, rateLimit.resetIn, 'Too many requests. Please try again later.');
  }

  try {
    const data: ApprovalNotificationRequest = await req.json();
    
    // Validate input
    const validationErrors = validateInput(data);
    if (validationErrors.length > 0) {
      console.error("Validation failed:", validationErrors);
      return new Response(
        JSON.stringify({ error: "Validation failed", details: validationErrors }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    
    const { storyTitle, authorName, authorEmail, isFeatured } = data;

    if (!authorEmail) {
      console.log("No author email provided, skipping notification");
      return new Response(JSON.stringify({ success: true, skipped: true }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    console.log(`Sending approval notification to: ${authorEmail}`);

    const emailResponse = await resend.emails.send({
      from: "Sacred Greeks <onboarding@resend.dev>",
      to: [authorEmail],
      subject: isFeatured 
        ? "Your Healing Story is Now Featured!" 
        : "Your Healing Story Has Been Approved!",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: #d4af37; margin: 0; font-size: 24px;">
              ${isFeatured ? "🌟 Your Story is Featured!" : "✨ Your Story is Live!"}
            </h1>
            <p style="color: #ffffff; margin: 10px 0 0 0; opacity: 0.9;">
              Thank you for sharing your healing journey
            </p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 12px 12px;">
            <p style="color: #333; margin-bottom: 20px;">
              Dear ${escapeHtml(authorName || "Friend")},
            </p>
            
            <p style="color: #555; margin-bottom: 20px;">
              ${isFeatured 
                ? "Great news! Your healing story has been approved AND featured on Sacred Greeks. Your testimony is now prominently displayed to inspire and encourage others in our community."
                : "Great news! Your healing story has been reviewed and approved. It is now live on Sacred Greeks where it can inspire and encourage others on their healing journey."
              }
            </p>
            
            <div style="background: #ffffff; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid ${isFeatured ? '#f59e0b' : '#d4af37'};">
              <p style="margin: 0 0 8px 0; font-weight: 600; color: #1e3a5f;">Your Story:</p>
              <p style="margin: 0; color: #333; font-size: 18px;">"${escapeHtml(storyTitle)}"</p>
              ${isFeatured ? '<span style="display: inline-block; margin-top: 10px; background: #fef3c7; color: #92400e; padding: 4px 12px; border-radius: 20px; font-size: 12px;">⭐ Featured Story</span>' : ''}
            </div>
            
            <p style="color: #555; margin-bottom: 20px;">
              Your courage to share your experience is making a difference. Stories like yours remind others that they are not alone and that healing is possible.
            </p>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="https://sacredgreeks.com/family-ministry-fallout" style="display: inline-block; background: linear-gradient(135deg, #d4af37 0%, #c9a227 100%); color: #1e3a5f; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600;">View Your Story</a>
            </div>
            
            <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; color: #6c757d; font-size: 14px; text-align: center;">
              "He heals the brokenhearted and binds up their wounds." - Psalm 147:3
            </p>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Approval notification sent:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in notify-story-approved function:", error);
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
