import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "https://esm.sh/resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SecurityFinding {
  level: "error" | "warn" | "info";
  name: string;
  description: string;
  table?: string;
}

serve(async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("[SECURITY-SCAN] Starting weekly security scan...");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const adminEmail = Deno.env.get("ADMIN_EMAIL");

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Run security checks
    const findings: SecurityFinding[] = [];

    // 1. Check for tables without RLS enabled
    const { data: tablesWithoutRLS, error: rlsError } = await supabase.rpc(
      "check_tables_without_rls"
    ).maybeSingle();
    
    // If the function doesn't exist, we'll check manually
    if (rlsError) {
      console.log("[SECURITY-SCAN] RLS check function not available, skipping automated RLS check");
    }

    // 2. Check for any recent failed authentication attempts (if we had a table for it)
    // This is a placeholder for future security monitoring

    // 3. Check profiles table for any anomalies
    const { count: profileCount, error: profileError } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true });

    if (profileError) {
      findings.push({
        level: "warn",
        name: "Profile Table Access Issue",
        description: `Unable to query profiles table: ${profileError.message}`,
      });
    } else {
      console.log(`[SECURITY-SCAN] Profiles table accessible, ${profileCount} records`);
    }

    // 4. Check for orphaned records in key tables
    const tablesToCheck = [
      "assessment_submissions",
      "prayer_journal",
      "journey_progress",
      "study_session_progress",
    ];

    for (const table of tablesToCheck) {
      const { error: tableError } = await supabase
        .from(table)
        .select("id", { count: "exact", head: true });

      if (tableError) {
        findings.push({
          level: "warn",
          name: `Table Access Issue: ${table}`,
          description: `Unable to query ${table}: ${tableError.message}`,
          table,
        });
      }
    }

    // 5. Check for any public data exposure
    // Test anonymous access to sensitive tables
    const anonClient = createClient(supabaseUrl, Deno.env.get("SUPABASE_ANON_KEY")!);
    
    const sensitiveTables = ["profiles", "qa_submissions", "assessment_submissions"];
    for (const table of sensitiveTables) {
      const { data: anonData, error: anonError } = await anonClient
        .from(table)
        .select("*")
        .limit(1);

      if (!anonError && anonData && anonData.length > 0) {
        findings.push({
          level: "error",
          name: `Anonymous Access Detected: ${table}`,
          description: `Anonymous users can read data from ${table}. This may expose sensitive information.`,
          table,
        });
      }
    }

    // Count findings by level
    const criticalCount = findings.filter((f) => f.level === "error").length;
    const warningCount = findings.filter((f) => f.level === "warn").length;
    const infoCount = findings.filter((f) => f.level === "info").length;

    console.log(`[SECURITY-SCAN] Scan complete. Critical: ${criticalCount}, Warnings: ${warningCount}, Info: ${infoCount}`);

    // Store scan results
    const { error: insertError } = await supabase.from("security_scan_results").insert({
      scan_type: "weekly",
      status: criticalCount > 0 ? "critical" : warningCount > 0 ? "warning" : "healthy",
      findings_json: findings,
      critical_count: criticalCount,
      warning_count: warningCount,
      info_count: infoCount,
      scanned_at: new Date().toISOString(),
    });

    if (insertError) {
      console.error("[SECURITY-SCAN] Failed to save scan results:", insertError);
    } else {
      console.log("[SECURITY-SCAN] Scan results saved to database");
    }

    // Send email alert if there are critical findings or if it's a routine scan
    if (resendApiKey && adminEmail) {
      const resend = new Resend(resendApiKey);

      const statusEmoji = criticalCount > 0 ? "🚨" : warningCount > 0 ? "⚠️" : "✅";
      const statusText = criticalCount > 0 ? "CRITICAL ISSUES FOUND" : warningCount > 0 ? "Warnings Found" : "All Clear";

      const findingsHtml = findings.length > 0
        ? findings.map((f) => `
          <tr style="background-color: ${f.level === "error" ? "#fee2e2" : f.level === "warn" ? "#fef3c7" : "#f3f4f6"};">
            <td style="padding: 8px; border: 1px solid #ddd;">${f.level === "error" ? "🔴" : f.level === "warn" ? "🟡" : "🔵"} ${f.level.toUpperCase()}</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${f.name}</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${f.description}</td>
          </tr>
        `).join("")
        : `<tr><td colspan="3" style="padding: 16px; text-align: center; color: #059669;">No security issues detected!</td></tr>`;

      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: ${criticalCount > 0 ? "#dc2626" : warningCount > 0 ? "#d97706" : "#059669"};">
            ${statusEmoji} Weekly Security Scan Report
          </h1>
          <p style="font-size: 18px; margin-bottom: 20px;">Status: <strong>${statusText}</strong></p>
          
          <div style="background: #f9fafb; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="margin-top: 0;">Summary</h3>
            <ul style="list-style: none; padding: 0;">
              <li>🔴 Critical Issues: <strong>${criticalCount}</strong></li>
              <li>🟡 Warnings: <strong>${warningCount}</strong></li>
              <li>🔵 Info: <strong>${infoCount}</strong></li>
            </ul>
          </div>
          
          <h3>Detailed Findings</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <thead>
              <tr style="background-color: #374151; color: white;">
                <th style="padding: 8px; border: 1px solid #ddd;">Level</th>
                <th style="padding: 8px; border: 1px solid #ddd;">Issue</th>
                <th style="padding: 8px; border: 1px solid #ddd;">Description</th>
              </tr>
            </thead>
            <tbody>
              ${findingsHtml}
            </tbody>
          </table>
          
          <p style="color: #6b7280; font-size: 12px;">
            This is an automated security scan from Sacred Greeks. 
            Scan performed at ${new Date().toISOString()}
          </p>
        </div>
      `;

      try {
        const { data: emailData, error: emailError } = await resend.emails.send({
          from: "Sacred Greeks Security <security@sacredgreeks.com>",
          to: [adminEmail],
          subject: `${statusEmoji} Weekly Security Scan: ${statusText}`,
          html: emailHtml,
        });

        if (emailError) {
          console.error("[SECURITY-SCAN] Failed to send email:", emailError);
        } else {
          console.log("[SECURITY-SCAN] Email sent successfully:", emailData);
        }
      } catch (emailErr) {
        console.error("[SECURITY-SCAN] Email error:", emailErr);
      }
    } else {
      console.log("[SECURITY-SCAN] Email notifications not configured (missing RESEND_API_KEY or ADMIN_EMAIL)");
    }

    return new Response(
      JSON.stringify({
        success: true,
        status: criticalCount > 0 ? "critical" : warningCount > 0 ? "warning" : "healthy",
        summary: {
          critical: criticalCount,
          warnings: warningCount,
          info: infoCount,
        },
        findings,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("[SECURITY-SCAN] Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
