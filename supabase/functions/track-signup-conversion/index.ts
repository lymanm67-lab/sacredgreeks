import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ConversionRequest {
  email: string;
  userId?: string;
  sessionId?: string;
  source?: string;
}

serve(async (req: Request): Promise<Response> => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { email, userId, sessionId, source }: ConversionRequest = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Tracking signup conversion for: ${email}`);

    // Check if this email exists in lead_segments
    const { data: existingLead } = await supabase
      .from("lead_segments")
      .select("id, segment_type")
      .eq("email", email)
      .single();

    if (existingLead) {
      // Update existing lead to converted
      const { error: updateError } = await supabase
        .from("lead_segments")
        .update({
          segment_type: "converted",
          user_id: userId,
          last_activity_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", existingLead.id);

      if (updateError) {
        console.error("Error updating lead segment:", updateError);
      } else {
        console.log(`Updated lead ${email} from ${existingLead.segment_type} to converted`);
      }
    } else {
      // Create new converted lead segment
      const { error: insertError } = await supabase
        .from("lead_segments")
        .insert({
          email,
          user_id: userId,
          segment_type: "converted",
          last_activity_at: new Date().toISOString(),
        });

      if (insertError) {
        console.error("Error inserting lead segment:", insertError);
      } else {
        console.log(`Created new converted lead for ${email}`);
      }
    }

    // Track conversion in landing_page_conversions if we have a session
    if (sessionId) {
      // Find the visit for this session
      const { data: visit } = await supabase
        .from("landing_page_visits")
        .select("id, variant_id")
        .eq("session_id", sessionId)
        .order("visited_at", { ascending: false })
        .limit(1)
        .single();

      if (visit) {
        // Record conversion
        const { error: conversionError } = await supabase
          .from("landing_page_conversions")
          .insert({
            visit_id: visit.id,
            variant_id: visit.variant_id,
            user_id: userId,
            conversion_type: "signup_completed",
          });

        if (conversionError) {
          console.error("Error recording conversion:", conversionError);
        } else {
          console.log(`Recorded conversion for session ${sessionId}`);
        }
      }
    }

    return new Response(
      JSON.stringify({ success: true, message: "Conversion tracked" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error tracking conversion:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
