import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.84.0";
import { checkRateLimit, getClientIdentifier, rateLimitResponse } from "../_shared/rate-limiter.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    // SECURITY: Rate limiting
    const clientId = getClientIdentifier(req);
    const rateLimitResult = checkRateLimit(clientId, 'ai_recommendations');
    
    if (!rateLimitResult.allowed) {
      console.log(`Rate limit exceeded for study recommendations: ${clientId}`);
      return rateLimitResponse(corsHeaders, rateLimitResult.resetIn,
        'Too many recommendation requests. Please wait a moment before trying again.');
    }
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      }
    );

    // Get the authenticated user
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser();

    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Fetch user progress data
    const [progressData, studyProgressData, assessmentData, prayerData] = await Promise.all([
      supabaseClient
        .from("user_progress")
        .select("*")
        .eq("user_id", user.id)
        .order("date", { ascending: false })
        .limit(30),
      supabaseClient
        .from("study_session_progress")
        .select("*")
        .eq("user_id", user.id)
        .order("completed_at", { ascending: false }),
      supabaseClient
        .from("assessment_submissions")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(10),
      supabaseClient
        .from("prayer_journal")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(20),
    ]);

    // Calculate activity stats
    const recentDays = progressData.data?.length || 0;
    const devotionalsCompleted = progressData.data?.filter(p => p.devotional_completed).length || 0;
    const studySessionsCompleted = studyProgressData.data?.length || 0;
    const assessmentsTaken = assessmentData.data?.length || 0;
    const prayerEntries = prayerData.data?.length || 0;
    const answeredPrayers = prayerData.data?.filter(p => p.answered).length || 0;

    // Get recent assessment results
    const recentAssessmentResults = assessmentData.data?.slice(0, 3).map(a => a.result_type) || [];

    // Build context for AI
    const userContext = `
User Progress Summary:
- Active for ${recentDays} of the last 30 days
- Completed ${devotionalsCompleted} devotionals
- Completed ${studySessionsCompleted} study guide sessions
- Taken ${assessmentsTaken} assessments (recent results: ${recentAssessmentResults.join(", ") || "none"})
- ${prayerEntries} prayer journal entries (${answeredPrayers} answered)

Study Guide Sessions (1-12 available):
1. Introduction to Sacred Greeks
2. Biblical Leadership Principles
3. Brotherhood and Unity
4. Ethical Decision Making
5. Service and Stewardship
6. Personal Integrity
7. Community Impact
8. Spiritual Disciplines
9. Mentorship and Growth
10. Conflict Resolution
11. Vision and Purpose
12. Living Your Values

Completed sessions: ${studyProgressData.data?.map(s => s.session_id).join(", ") || "none"}
`;

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `You are a spiritual growth advisor for the Sacred Greeks app. Based on the user's progress, suggest 3-4 specific, actionable recommendations that will help them grow spiritually.

Focus on:
1. Next logical study guide session based on what they've completed
2. Specific devotional themes that align with their journey
3. Assessment areas they should explore
4. Prayer focus areas based on their entries

Return recommendations as a JSON array with this structure:
[
  {
    "type": "study_session" | "devotional" | "assessment" | "prayer",
    "title": "Recommendation title",
    "description": "Why this is recommended for them (2-3 sentences)",
    "priority": "high" | "medium" | "low"
  }
]

Be encouraging, specific, and personal. Reference their actual progress.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userContext },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded" }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required" }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error("AI gateway error");
    }

    const aiData = await response.json();
    const content = aiData.choices[0].message.content;
    
    let recommendations;
    try {
      const parsed = JSON.parse(content);
      recommendations = parsed.recommendations || parsed;
    } catch {
      recommendations = [];
    }

    return new Response(JSON.stringify({ recommendations }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Recommendations error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
