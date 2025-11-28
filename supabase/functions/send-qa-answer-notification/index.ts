import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface QAAnswerNotificationRequest {
  email: string;
  question: string;
  answer: string;
  category: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("send-qa-answer-notification function called");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, question, answer, category }: QAAnswerNotificationRequest = await req.json();

    console.log(`Sending Q&A answer notification to: ${email}`);

    if (!email) {
      console.log("No email provided, skipping notification");
      return new Response(
        JSON.stringify({ message: "No email provided, notification skipped" }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const emailResponse = await resend.emails.send({
      from: "Sacred Greeks <onboarding@resend.dev>",
      to: [email],
      subject: "Your Question Has Been Answered! - Ask Dr. Lyman",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: #d4af37; margin: 0; font-size: 24px;">Your Question Has Been Answered!</h1>
            <p style="color: #ffffff; margin: 10px 0 0 0; opacity: 0.9;">Ask Dr. Lyman - Sacred Greeks</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 12px 12px;">
            <div style="background: #ffffff; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #d4af37;">
              <p style="margin: 0 0 8px 0; font-weight: 600; color: #1e3a5f;">Your Question:</p>
              <p style="margin: 0; color: #555; font-style: italic;">"${question}"</p>
              <span style="display: inline-block; margin-top: 10px; background: #e8f4f8; color: #1e3a5f; padding: 4px 12px; border-radius: 20px; font-size: 12px;">${category}</span>
            </div>
            
            <div style="background: #ffffff; padding: 20px; border-radius: 8px; border-left: 4px solid #2d5a87;">
              <p style="margin: 0 0 8px 0; font-weight: 600; color: #1e3a5f;">Dr. Lyman's Answer:</p>
              <p style="margin: 0; color: #333; white-space: pre-wrap;">${answer}</p>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="https://sacredgreeks.com/ask-dr-lyman" style="display: inline-block; background: linear-gradient(135deg, #d4af37 0%, #c9a227 100%); color: #1e3a5f; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600;">View Full Answer</a>
            </div>
            
            <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; color: #6c757d; font-size: 14px; text-align: center;">
              Thank you for engaging with Sacred Greeks. Your questions help us all grow in faith together.
            </p>
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
    console.error("Error in send-qa-answer-notification function:", error);
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
