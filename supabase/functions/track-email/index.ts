import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// 1x1 transparent GIF pixel
const TRACKING_PIXEL = new Uint8Array([
  0x47, 0x49, 0x46, 0x38, 0x39, 0x61, 0x01, 0x00,
  0x01, 0x00, 0x80, 0x00, 0x00, 0xff, 0xff, 0xff,
  0x00, 0x00, 0x00, 0x21, 0xf9, 0x04, 0x01, 0x00,
  0x00, 0x00, 0x00, 0x2c, 0x00, 0x00, 0x00, 0x00,
  0x01, 0x00, 0x01, 0x00, 0x00, 0x02, 0x02, 0x44,
  0x01, 0x00, 0x3b
]);

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const token = url.searchParams.get("t");
    const action = url.searchParams.get("a") || "open"; // 'open' or 'click'
    const linkUrl = url.searchParams.get("url");
    const linkLabel = url.searchParams.get("label");

    if (!token) {
      // Return pixel anyway to not break email rendering
      return new Response(TRACKING_PIXEL, {
        headers: {
          "Content-Type": "image/gif",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          ...corsHeaders,
        },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get the send record by tracking token
    const { data: sendRecord, error: sendError } = await supabase
      .from("email_sends")
      .select("id")
      .eq("tracking_token", token)
      .single();

    if (sendError || !sendRecord) {
      console.error("Send record not found:", sendError);
      return new Response(TRACKING_PIXEL, {
        headers: {
          "Content-Type": "image/gif",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          ...corsHeaders,
        },
      });
    }

    const userAgent = req.headers.get("user-agent") || null;
    const ipAddress = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                      req.headers.get("x-real-ip") || null;

    if (action === "click" && linkUrl) {
      // Track click
      await supabase.from("email_clicks").insert({
        send_id: sendRecord.id,
        link_url: decodeURIComponent(linkUrl),
        link_label: linkLabel ? decodeURIComponent(linkLabel) : null,
        user_agent: userAgent,
        ip_address: ipAddress,
      });

      // Redirect to the actual link
      return new Response(null, {
        status: 302,
        headers: {
          Location: decodeURIComponent(linkUrl),
          ...corsHeaders,
        },
      });
    } else {
      // Track open
      await supabase.from("email_opens").insert({
        send_id: sendRecord.id,
        user_agent: userAgent,
        ip_address: ipAddress,
      });

      // Return tracking pixel
      return new Response(TRACKING_PIXEL, {
        headers: {
          "Content-Type": "image/gif",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          ...corsHeaders,
        },
      });
    }
  } catch (error) {
    console.error("Tracking error:", error);
    return new Response(TRACKING_PIXEL, {
      headers: {
        "Content-Type": "image/gif",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        ...corsHeaders,
      },
    });
  }
});
