import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const adminEmail = Deno.env.get("ADMIN_EMAIL");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface SpeakingRequest {
  organizerName: string;
  organizerEmail: string;
  organizerPhone: string;
  organizationName: string;
  eventName: string;
  eventType: string;
  eventDate: string;
  eventLocation: string;
  expectedAttendees: string;
  budgetRange: string;
  topicRequested: string;
  additionalDetails?: string;
}

const formatBudgetRange = (range: string): string => {
  const budgetMap: Record<string, string> = {
    "under-2500": "Under $2,500",
    "2500-5000": "$2,500 - $5,000",
    "5000-7500": "$5,000 - $7,500",
    "7500-10000": "$7,500 - $10,000",
    "10000-plus": "$10,000+",
    "negotiable": "Negotiable / TBD",
  };
  return budgetMap[range] || range;
};

const formatEventType = (type: string): string => {
  const typeMap: Record<string, string> = {
    conference: "Conference / Convention",
    church: "Church Service / Revival",
    chapter: "Chapter Meeting / Event",
    workshop: "Workshop / Training",
    seminar: "Seminar / Lecture",
    retreat: "Retreat",
    virtual: "Virtual Event / Webinar",
    other: "Other",
  };
  return typeMap[type] || type;
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!adminEmail) {
      throw new Error("ADMIN_EMAIL not configured");
    }

    const data: SpeakingRequest = await req.json();

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #1e3a5f 0%, #2d1b4e 100%); padding: 30px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px;">🎤 New Speaking Request</h1>
        </div>
        
        <div style="padding: 30px; background: #f8f9fa;">
          <h2 style="color: #1e3a5f; border-bottom: 2px solid #e9ecef; padding-bottom: 10px;">Contact Information</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #666; width: 140px;"><strong>Name:</strong></td>
              <td style="padding: 8px 0; color: #333;">${data.organizerName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;"><strong>Email:</strong></td>
              <td style="padding: 8px 0; color: #333;"><a href="mailto:${data.organizerEmail}" style="color: #1e3a5f;">${data.organizerEmail}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;"><strong>Phone:</strong></td>
              <td style="padding: 8px 0; color: #333;"><a href="tel:${data.organizerPhone}" style="color: #1e3a5f;">${data.organizerPhone}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;"><strong>Organization:</strong></td>
              <td style="padding: 8px 0; color: #333;">${data.organizationName}</td>
            </tr>
          </table>
          
          <h2 style="color: #1e3a5f; border-bottom: 2px solid #e9ecef; padding-bottom: 10px; margin-top: 30px;">Event Details</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #666; width: 140px;"><strong>Event Name:</strong></td>
              <td style="padding: 8px 0; color: #333;">${data.eventName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;"><strong>Event Type:</strong></td>
              <td style="padding: 8px 0; color: #333;">${formatEventType(data.eventType)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;"><strong>Event Date:</strong></td>
              <td style="padding: 8px 0; color: #333;">${new Date(data.eventDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;"><strong>Location:</strong></td>
              <td style="padding: 8px 0; color: #333;">${data.eventLocation}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;"><strong>Attendance:</strong></td>
              <td style="padding: 8px 0; color: #333;">${data.expectedAttendees} attendees</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;"><strong>Budget Range:</strong></td>
              <td style="padding: 8px 0; color: #333; font-weight: bold;">${formatBudgetRange(data.budgetRange)}</td>
            </tr>
          </table>
          
          <h2 style="color: #1e3a5f; border-bottom: 2px solid #e9ecef; padding-bottom: 10px; margin-top: 30px;">Topic Requested</h2>
          <div style="background: #ffffff; padding: 15px; border-radius: 8px; border: 1px solid #e9ecef;">
            <p style="margin: 0; color: #333; line-height: 1.6;">${data.topicRequested}</p>
          </div>
          
          ${data.additionalDetails ? `
          <h2 style="color: #1e3a5f; border-bottom: 2px solid #e9ecef; padding-bottom: 10px; margin-top: 30px;">Additional Details</h2>
          <div style="background: #ffffff; padding: 15px; border-radius: 8px; border: 1px solid #e9ecef;">
            <p style="margin: 0; color: #333; line-height: 1.6;">${data.additionalDetails}</p>
          </div>
          ` : ''}
        </div>
        
        <div style="background: #1e3a5f; padding: 20px; text-align: center;">
          <p style="color: #ffffff; margin: 0; font-size: 14px;">Sacred Greeks | Speaking Engagement Request</p>
        </div>
      </div>
    `;

    const emailResponse = await resend.emails.send({
      from: "Sacred Greeks <notifications@sacredgreeks.com>",
      to: [adminEmail],
      subject: `🎤 New Speaking Request: ${data.eventName} - ${data.organizationName}`,
      html: emailHtml,
    });

    console.log("Speaking request notification sent:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending speaking request notification:", error);
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
