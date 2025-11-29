import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface BetaSignupNotification {
  testerName: string;
  testerEmail: string;
  organization?: string;
  referredBy?: string;
}

async function sendEmail(to: string[], subject: string, html: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "Sacred Greeks <onboarding@resend.dev>",
      to,
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Failed to send email: ${error}`);
  }

  return res.json();
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

    const { testerName, testerEmail, organization, referredBy }: BetaSignupNotification = await req.json();

    // Validate that the tester email matches the authenticated user
    if (user.email !== testerEmail) {
      console.error("Email mismatch: authenticated user email doesn't match tester email");
      return new Response(
        JSON.stringify({ error: "Forbidden: You can only sign up with your own email" }),
        { status: 403, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Input validation
    if (!testerName || typeof testerName !== "string" || testerName.length > 100) {
      return new Response(
        JSON.stringify({ error: "Invalid tester name" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (!testerEmail || typeof testerEmail !== "string" || !testerEmail.includes("@")) {
      return new Response(
        JSON.stringify({ error: "Invalid tester email" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (organization && (typeof organization !== "string" || organization.length > 200)) {
      return new Response(
        JSON.stringify({ error: "Invalid organization" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const adminEmail = Deno.env.get("ADMIN_EMAIL");

    if (!adminEmail) {
      console.error("ADMIN_EMAIL not configured");
      return new Response(
        JSON.stringify({ error: "Admin email not configured" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log(`Authenticated user ${user.email} - sending beta signup notification`);

    // Sanitize inputs for HTML
    const safeTesterName = testerName.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const safeOrganization = organization?.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const safeReferredBy = referredBy?.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    // Send notification to admin
    const adminNotification = await sendEmail(
      [adminEmail],
      "🎉 New Beta Tester Signup!",
      `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #6366f1;">New Beta Tester Registration</h1>
          <p>A new user has signed up for the Sacred Greeks beta program!</p>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #334155;">Tester Details</h3>
            <p><strong>Name:</strong> ${safeTesterName}</p>
            <p><strong>Email:</strong> ${testerEmail}</p>
            ${safeOrganization ? `<p><strong>Organization:</strong> ${safeOrganization}</p>` : ''}
            ${safeReferredBy ? `<p><strong>Referred By:</strong> ${safeReferredBy}</p>` : ''}
          </div>
          
          <p style="color: #64748b; font-size: 14px;">
            You can manage beta testers in the admin panel.
          </p>
        </div>
      `
    );

    console.log("Admin notification sent:", adminNotification);

    // Send welcome email to the new beta tester
    const welcomeEmail = await sendEmail(
      [testerEmail],
      "Welcome to the Sacred Greeks Beta! 🙏",
      `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #6366f1;">Welcome to Sacred Greeks, ${safeTesterName}!</h1>
          
          <p>Thank you for joining our beta program! We're excited to have you as one of our early testers.</p>
          
          <div style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 20px; border-radius: 8px; margin: 20px 0; color: white;">
            <h3 style="margin-top: 0;">What's Next?</h3>
            <ul style="padding-left: 20px;">
              <li>Complete your onboarding to get started</li>
              <li>Explore our spiritual tools and resources</li>
              <li>Share your feedback to help us improve</li>
            </ul>
          </div>
          
          <p>As a beta tester, your feedback is invaluable. We'd love to hear about:</p>
          <ul>
            <li>Features you find helpful</li>
            <li>Areas that could be improved</li>
            <li>Any bugs or issues you encounter</li>
          </ul>
          
          <p style="margin-top: 30px;">
            <a href="https://sacredgreeks.org/dashboard" style="background: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Start Your Journey
            </a>
          </p>
          
          <p style="color: #64748b; font-size: 14px; margin-top: 30px;">
            Blessings,<br>
            The Sacred Greeks Team
          </p>
        </div>
      `
    );

    console.log("Welcome email sent:", welcomeEmail);

    return new Response(
      JSON.stringify({ success: true, adminNotification, welcomeEmail }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error sending beta signup notification:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
