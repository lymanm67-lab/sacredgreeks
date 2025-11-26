import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts';

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// SECURITY FIX #3: Input validation schema
const emailRequestSchema = z.object({
  email: z.string().email().max(255),
  resultType: z.string().min(1).max(100),
  scenario: z.string().min(1).max(200),
  content: z.object({
    headline: z.string().max(500),
    intro: z.string().max(2000),
    scriptureToolkit: z.array(z.object({
      ref: z.string().max(100),
      summary: z.string().max(1000),
      whenToUse: z.string().max(500)
    })).max(20),
    sampleResponses: z.array(z.object({
      label: z.string().max(200),
      objection: z.string().max(500),
      youCanSay: z.string().max(1000)
    })).max(20),
    proofPoints: z.array(z.object({
      label: z.string().max(200),
      text: z.string().max(2000)
    })).max(20),
    prayer: z.string().max(2000)
  })
});

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify JWT token is present (verify_jwt=true handles validation)
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Authorization required' }),
        { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const requestBody = await req.json();
    
    // SECURITY FIX #3: Server-side validation
    const validation = emailRequestSchema.safeParse(requestBody);
    if (!validation.success) {
      console.error('Validation error:', validation.error.errors);
      return new Response(
        JSON.stringify({ error: 'Invalid request data' }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const { email, resultType, scenario, content } = validation.data;

    // Sanitize HTML content to prevent XSS
    const escapeHtml = (unsafe: string) => unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

    // Build the email HTML with sanitized content
    const scriptureToolkitHtml = content.scriptureToolkit
      .map(
        (scripture) => `
        <div style="border-left: 4px solid #8B5CF6; padding-left: 16px; margin-bottom: 16px;">
          <p style="font-weight: 600; margin-bottom: 4px;">${escapeHtml(scripture.ref)}</p>
          <p style="font-size: 14px; color: #666; margin-bottom: 4px;">${escapeHtml(scripture.summary)}</p>
          <p style="font-size: 14px; color: #666; font-style: italic;">When to use: ${escapeHtml(scripture.whenToUse)}</p>
        </div>
      `
      )
      .join("");

    const sampleResponsesHtml = content.sampleResponses
      .map(
        (response) => `
        <div style="background-color: #f5f5f5; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
          <p style="font-weight: 600; color: #8B5CF6; margin-bottom: 8px;">${escapeHtml(response.label)}</p>
          <p style="font-size: 14px; margin-bottom: 8px;">
            <span style="font-weight: 500;">Objection:</span> "${escapeHtml(response.objection)}"
          </p>
          <p style="font-size: 14px;">
            <span style="font-weight: 500;">You can say:</span> "${escapeHtml(response.youCanSay)}"
          </p>
        </div>
      `
      )
      .join("");

    const proofPointsHtml = content.proofPoints
      .map(
        (point) => `
        <div style="margin-bottom: 16px;">
          <h4 style="font-weight: 600; margin-bottom: 8px;">${escapeHtml(point.label)}</h4>
          <p style="font-size: 14px; color: #666; line-height: 1.6;">${escapeHtml(point.text)}</p>
        </div>
      `
      )
      .join("");

    // Generate completion certificate
    const certificateHtml = `
      <div style="background: linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%); border-radius: 16px; padding: 48px 32px; text-align: center; margin-bottom: 32px; box-shadow: 0 10px 30px rgba(139, 92, 246, 0.3);">
        <div style="background: white; border-radius: 12px; padding: 40px 32px;">
          <h2 style="color: #8B5CF6; font-size: 32px; margin: 0 0 16px 0; font-weight: 700;">Certificate of Completion</h2>
          <div style="height: 2px; width: 80px; background: #8B5CF6; margin: 0 auto 24px auto;"></div>
          <p style="font-size: 18px; color: #333; margin-bottom: 8px;">This certifies that you have completed the</p>
          <h3 style="color: #6366F1; font-size: 24px; margin: 8px 0; font-weight: 600;">Sacred Greeks Decision Guide</h3>
          <p style="font-size: 16px; color: #666; margin: 24px 0 8px 0;">Assessment Type:</p>
          <p style="font-size: 18px; color: #333; font-weight: 600; margin: 0 0 24px 0;">${escapeHtml(resultType)} - ${escapeHtml(scenario)}</p>
          <p style="font-size: 14px; color: #999; margin-top: 32px;">Completed on ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </div>
    `;

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
          
          <div style="text-align: center; margin-bottom: 32px;">
            <h1 style="color: #8B5CF6; margin-bottom: 8px;">Sacred Greeks Decision Guide</h1>
            <p style="color: #666;">Your Assessment Results & Certificate</p>
          </div>

          ${certificateHtml}

          <div style="background: linear-gradient(to bottom right, rgba(139, 92, 246, 0.05), transparent); border: 2px solid rgba(139, 92, 246, 0.2); border-radius: 12px; padding: 24px; margin-bottom: 32px;">
            <h2 style="font-size: 24px; margin-bottom: 16px; color: #333;">${content.headline}</h2>
            <p style="color: #666; line-height: 1.6;">${content.intro}</p>
          </div>

          ${
            content.scriptureToolkit.length > 0
              ? `
          <div style="margin-bottom: 32px;">
            <h3 style="font-size: 20px; margin-bottom: 16px; color: #8B5CF6;">📖 Scripture Toolkit</h3>
            <p style="color: #666; margin-bottom: 16px;">Use these passages to ground your thinking and conversations in God's Word.</p>
            ${scriptureToolkitHtml}
          </div>
          `
              : ""
          }

          ${
            content.sampleResponses.length > 0
              ? `
          <div style="margin-bottom: 32px;">
            <h3 style="font-size: 20px; margin-bottom: 16px; color: #8B5CF6;">💬 Sample Responses</h3>
            <p style="color: #666; margin-bottom: 16px;">Use these examples to help you respond with clarity, grace, and conviction.</p>
            ${sampleResponsesHtml}
          </div>
          `
              : ""
          }

          <div style="margin-bottom: 32px; border: 2px solid rgba(139, 92, 246, 0.2); border-radius: 12px; padding: 24px;">
            <h3 style="font-size: 20px; margin-bottom: 16px; color: #8B5CF6;">P.R.O.O.F. Framework</h3>
            <p style="color: #666; margin-bottom: 16px;">Five lenses to help you examine your situation biblically and wisely.</p>
            ${proofPointsHtml}
          </div>

          <div style="background-color: rgba(139, 92, 246, 0.05); border: 1px solid rgba(139, 92, 246, 0.2); border-radius: 12px; padding: 24px; margin-bottom: 32px;">
            <h3 style="font-size: 18px; margin-bottom: 16px; color: #333;">A Prayer for You</h3>
            <p style="color: #666; line-height: 1.6; font-style: italic;">${content.prayer}</p>
          </div>

          <div style="text-align: center; padding: 24px; border-top: 1px solid #eee;">
            <h3 style="margin-bottom: 16px;">Continue Your Journey</h3>
            <p style="color: #666; margin-bottom: 16px;">
              <a href="https://sacredgreeks.com/" style="color: #8B5CF6; text-decoration: none;">Visit Sacred Greeks</a>
            </p>
            <p style="color: #666; margin-bottom: 16px;">
              <a href="https://a.co/d/5a6Yt9t" style="color: #8B5CF6; text-decoration: none;">Read "Sacred, Not Sinful"</a>
            </p>
            <p style="color: #666;">
              <a href="https://gamma.app/docs/Christian-Greek-Life-Study-Guide-ihr8fq0g089n32t" style="color: #8B5CF6; text-decoration: none;">Use the Study Guide</a>
            </p>
          </div>

          <div style="text-align: center; padding: 16px; color: #999; font-size: 12px;">
            <p>This email was sent because you requested your Sacred Greeks assessment results.</p>
            <p style="margin-top: 8px;">© ${new Date().getFullYear()} Sacred Greeks. All rights reserved.</p>
          </div>

        </body>
      </html>
    `;

    const emailResponse = await resend.emails.send({
      from: "Sacred Greeks <onboarding@resend.dev>",
      to: [email],
      subject: "Your Sacred Greeks Certificate & Assessment Results",
      html: emailHtml,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    // SECURITY FIX #4: Log detailed errors server-side, return generic message to client
    console.error("Error in send-results-email function:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send email. Please try again." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
