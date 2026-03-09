import { serve } from "https://deno.land/std@0.208.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { errors } = await req.json();

    if (!Array.isArray(errors) || errors.length === 0) {
      return new Response(JSON.stringify({ ok: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceKey);

    // Store errors in analytics_events table (already exists)
    const rows = errors.slice(0, 20).map((err: Record<string, unknown>) => ({
      event_type: "client_error",
      event_category: "error",
      page_path: typeof err.url === "string" ? new URL(err.url).pathname : null,
      session_id: (err.sessionId as string) || null,
      event_data: {
        message: err.message,
        stack: err.stack,
        componentStack: err.componentStack,
        userAgent: err.userAgent,
        timestamp: err.timestamp,
      },
    }));

    await supabase.from("analytics_events").insert(rows);

    return new Response(JSON.stringify({ ok: true, count: rows.length }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error logging client errors:", error);
    return new Response(JSON.stringify({ ok: false }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
