import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  email: string;
  resultType: string;
  scenario: string;
  content: {
    headline: string;
    intro: string;
    scriptureToolkit: Array<{
      ref: string;
      summary: string;
      whenToUse: string;
    }>;
    sampleResponses: Array<{
      label: string;
      objection: string;
      youCanSay: string;
    }>;
    proofPoints: Array<{
      label: string;
      text: string;
    }>;
    prayer: string;
  };
}

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

    const { email, resultType, scenario, content }: EmailRequest = await req.json();
    
    // Validate required fields
    if (!email || !resultType || !scenario || !content) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Build the email HTML
    const scriptureToolkitHtml = content.scriptureToolkit
      .map(
        (scripture) => `
        <div style="border-left: 4px solid #8B5CF6; padding-left: 16px; margin-bottom: 16px;">
          <p style="font-weight: 600; margin-bottom: 4px;">${scripture.ref}</p>
          <p style="font-size: 14px; color: #666; margin-bottom: 4px;">${scripture.summary}</p>
          <p style="font-size: 14px; color: #666; font-style: italic;">When to use: ${scripture.whenToUse}</p>
        </div>
      `
      )
      .join("");

    const sampleResponsesHtml = content.sampleResponses
      .map(
        (response) => `
        <div style="background-color: #f5f5f5; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
          <p style="font-weight: 600; color: #8B5CF6; margin-bottom: 8px;">${response.label}</p>
          <p style="font-size: 14px; margin-bottom: 8px;">
            <span style="font-weight: 500;">Objection:</span> "${response.objection}"
          </p>
          <p style="font-size: 14px;">
            <span style="font-weight: 500;">You can say:</span> "${response.youCanSay}"
          </p>
        </div>
      `
      )
      .join("");

    const proofPointsHtml = content.proofPoints
      .map(
        (point) => `
        <div style="margin-bottom: 16px;">
          <h4 style="font-weight: 600; margin-bottom: 8px;">${point.label}</h4>
          <p style="font-size: 14px; color: #666; line-height: 1.6;">${point.text}</p>
        </div>
      `
      )
      .join("");

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
            <p style="color: #666;">Your Assessment Results</p>
          </div>

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
      subject: "Your Sacred Greeks Assessment Results",
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
    console.error("Error in send-results-email function:", error);
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
