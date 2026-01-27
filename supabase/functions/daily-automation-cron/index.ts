import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AutomationWorkflow {
  id: string;
  name: string;
  trigger_segment: string;
  delay_hours: number;
  email_template_key: string;
  subject_variant_type: string;
  is_active: boolean;
}

interface LeadSegment {
  id: string;
  email: string;
  segment_type: string;
  last_activity_at: string;
  created_at: string;
}

// Email templates for follow-ups
const followUpTemplates: Record<string, { subject: string; html: string }> = {
  opened_no_click: {
    subject: "Did you get a chance to check this out? 👀",
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #1a1a1a;">We noticed you opened our email...</h2>
        <p style="color: #4a4a4a; line-height: 1.6;">
          But didn't get a chance to click through. No worries — life gets busy!
        </p>
        <p style="color: #4a4a4a; line-height: 1.6;">
          Here's a quick reminder: The Faith Snapshot takes just 3 minutes and gives you a personalized view of where you stand spiritually as a Greek.
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://sacredgreeks.lovable.app/snapshot" 
             style="background: linear-gradient(135deg, #f59e0b, #ec4899); color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600;">
            Take the Faith Snapshot
          </a>
        </div>
        <p style="color: #6b7280; font-size: 14px;">
          — The Sacred Greeks Team
        </p>
      </div>
    `,
  },
  clicked_no_convert: {
    subject: "You're almost there! 🙏",
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #1a1a1a;">You clicked — we're excited!</h2>
        <p style="color: #4a4a4a; line-height: 1.6;">
          We noticed you checked out Sacred Greeks but didn't finish signing up. Was something unclear? Did life get in the way?
        </p>
        <p style="color: #4a4a4a; line-height: 1.6;">
          <strong>Here's what you're missing:</strong>
        </p>
        <ul style="color: #4a4a4a; line-height: 1.8;">
          <li>Biblical responses to criticisms of Greek life</li>
          <li>The PROOF Framework to confidently defend your faith</li>
          <li>A community of 1,000+ Greeks who get it</li>
        </ul>
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://sacredgreeks.lovable.app/auth?mode=signup" 
             style="background: linear-gradient(135deg, #f59e0b, #ec4899); color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600;">
            Complete Your Signup
          </a>
        </div>
        <p style="color: #6b7280; font-size: 14px;">
          Questions? Just reply to this email.
        </p>
      </div>
    `,
  },
  inactive: {
    subject: "We miss you at Sacred Greeks 💙",
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #1a1a1a;">It's been a while...</h2>
        <p style="color: #4a4a4a; line-height: 1.6;">
          We noticed you haven't been back to Sacred Greeks recently. Life as a Greek is busy — we totally get it.
        </p>
        <p style="color: #4a4a4a; line-height: 1.6;">
          But your spiritual growth matters, and we're here whenever you're ready.
        </p>
        <div style="background: #fef3c7; border-radius: 8px; padding: 20px; margin: 20px 0;">
          <p style="margin: 0; color: #1a1a1a; font-weight: 500;">
            ✨ New since you've been gone:
          </p>
          <ul style="color: #4a4a4a; margin: 10px 0;">
            <li>Fresh daily devotionals</li>
            <li>New prayer requests from your community</li>
            <li>Updated PROOF course content</li>
          </ul>
        </div>
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://sacredgreeks.lovable.app/dashboard" 
             style="background: linear-gradient(135deg, #f59e0b, #ec4899); color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600;">
            Come Back & Catch Up
          </a>
        </div>
      </div>
    `,
  },
  snapshot_started_not_completed: {
    subject: "You started something important... 🌟",
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #1a1a1a;">Your Faith Snapshot is waiting</h2>
        <p style="color: #4a4a4a; line-height: 1.6;">
          You started the Faith Snapshot assessment but didn't finish. We get it — sometimes life interrupts.
        </p>
        <p style="color: #4a4a4a; line-height: 1.6;">
          But here's the thing: those 3 minutes could change how you see your faith in Greek life.
        </p>
        <div style="background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%); border-radius: 12px; padding: 25px; margin: 20px 0; text-align: center;">
          <p style="color: white; font-size: 18px; margin: 0 0 10px 0; font-weight: 600;">
            Ready to pick up where you left off?
          </p>
          <p style="color: rgba(255,255,255,0.9); margin: 0; font-size: 14px;">
            It only takes 3 minutes to complete.
          </p>
        </div>
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://sacredgreeks.lovable.app/snapshot" 
             style="background: linear-gradient(135deg, #f59e0b, #ec4899); color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600;">
            Finish Your Snapshot
          </a>
        </div>
      </div>
    `,
  },
};

serve(async (req: Request): Promise<Response> => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const resend = resendApiKey ? new Resend(resendApiKey) : null;

    console.log("Starting daily automation cron job...");

    // Get active automation workflows
    const { data: workflows, error: workflowError } = await supabase
      .from("email_automation_workflows")
      .select("*")
      .eq("is_active", true);

    if (workflowError) {
      throw new Error(`Error fetching workflows: ${workflowError.message}`);
    }

    console.log(`Found ${workflows?.length || 0} active workflows`);

    let emailsSent = 0;
    let leadsSegmented = 0;
    const errors: string[] = [];

    // Process each workflow
    for (const workflow of (workflows || []) as AutomationWorkflow[]) {
      console.log(`Processing workflow: ${workflow.name}`);

      // Calculate the cutoff time based on delay_hours
      const cutoffDate = new Date();
      cutoffDate.setHours(cutoffDate.getHours() - workflow.delay_hours);

      // Get leads matching this workflow's trigger segment
      const { data: leads, error: leadError } = await supabase
        .from("lead_segments")
        .select("*")
        .eq("segment_type", workflow.trigger_segment)
        .lt("last_activity_at", cutoffDate.toISOString())
        .limit(50); // Process in batches

      if (leadError) {
        errors.push(`Error fetching leads for ${workflow.name}: ${leadError.message}`);
        continue;
      }

      console.log(`Found ${leads?.length || 0} leads for workflow ${workflow.name}`);

      // Send emails to each lead
      for (const lead of (leads || []) as LeadSegment[]) {
        if (!resend) {
          console.log(`Would send email to ${lead.email} (Resend not configured)`);
          continue;
        }

        const template = followUpTemplates[workflow.trigger_segment];
        if (!template) {
          console.log(`No template found for segment: ${workflow.trigger_segment}`);
          continue;
        }

        try {
          await resend.emails.send({
            from: "Sacred Greeks <onboarding@resend.dev>",
            to: [lead.email],
            subject: template.subject,
            html: template.html,
          });

          emailsSent++;
          console.log(`Sent email to ${lead.email}`);

          // Update last activity to prevent duplicate sends
          await supabase
            .from("lead_segments")
            .update({ last_activity_at: new Date().toISOString() })
            .eq("id", lead.id);

        } catch (sendError: any) {
          errors.push(`Failed to send to ${lead.email}: ${sendError.message}`);
        }
      }
    }

    // Run behavioral segmentation
    console.log("Running behavioral segmentation...");

    // 1. Segment: Opened but didn't click
    const { data: openedNoClick } = await supabase
      .from("email_opens")
      .select(`
        send_id,
        email_sends!inner (
          recipient_email
        )
      `)
      .order("opened_at", { ascending: false })
      .limit(100);

    const { data: clicks } = await supabase
      .from("email_clicks")
      .select("send_id");

    const clickedSendIds = new Set(clicks?.map(c => c.send_id) || []);
    const openedNotClicked = (openedNoClick || []).filter(o => !clickedSendIds.has(o.send_id));

    for (const record of openedNotClicked) {
      const email = (record.email_sends as any)?.recipient_email;
      if (email) {
        const { data: existing } = await supabase
          .from("lead_segments")
          .select("segment_type")
          .eq("email", email)
          .single();

        if (!existing || existing.segment_type === 'inactive') {
          await supabase
            .from("lead_segments")
            .upsert({
              email,
              segment_type: "opened_no_click",
              last_activity_at: new Date().toISOString(),
            }, { onConflict: "email" });
          leadsSegmented++;
        }
      }
    }

    // 2. Segment: Clicked but didn't convert (snapshot_started but no signup)
    const { data: landingVisits } = await supabase
      .from("landing_page_conversions")
      .select("*")
      .eq("conversion_type", "snapshot_started")
      .order("converted_at", { ascending: false })
      .limit(100);

    const { data: signups } = await supabase
      .from("landing_page_conversions")
      .select("visit_id")
      .eq("conversion_type", "signup_started");

    const signupVisitIds = new Set(signups?.map(s => s.visit_id) || []);
    
    for (const visit of (landingVisits || [])) {
      if (!signupVisitIds.has(visit.visit_id)) {
        // This visitor started snapshot but didn't sign up
        // We'd need email from session, for now log it
        console.log(`Visitor ${visit.visit_id} started snapshot but didn't sign up`);
      }
    }

    // 3. Segment: Inactive users (no activity in 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const { data: inactiveProfiles } = await supabase
      .from("profiles")
      .select("email, updated_at")
      .lt("updated_at", sevenDaysAgo.toISOString())
      .limit(50);

    for (const profile of (inactiveProfiles || [])) {
      if (profile.email) {
        const { data: existing } = await supabase
          .from("lead_segments")
          .select("segment_type")
          .eq("email", profile.email)
          .single();

        // Only mark as inactive if not in a more specific segment
        if (!existing) {
          await supabase
            .from("lead_segments")
            .upsert({
              email: profile.email,
              segment_type: "inactive",
              last_activity_at: profile.updated_at,
            }, { onConflict: "email" });
          leadsSegmented++;
        }
      }
    }

    console.log(`Daily automation complete. Emails sent: ${emailsSent}, Leads segmented: ${leadsSegmented}`);

    return new Response(
      JSON.stringify({
        success: true,
        emailsSent,
        leadsSegmented,
        workflowsProcessed: workflows?.length || 0,
        errors: errors.length > 0 ? errors : undefined,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error: any) {
    console.error("Error in daily automation:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
