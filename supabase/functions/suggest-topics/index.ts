import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "AI service not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { content_type } = await req.json();

    const systemPrompt = `You are an SEO strategist and trend analyst for Sacred Greeks Life (FocusOS), the #1 faith-based app for Christians in Greek life (fraternities & sororities, with a focus on BGLO/Divine Nine/NPHC organizations).

Generate 5 highly-targeted content topic suggestions. For each topic, provide:
- A compelling title optimized for search
- 4-6 SEO keywords that the target audience actually searches for
- An "audience_reach_score" from 1-100 estimating how likely this topic is to reach and engage the target audience (consider search volume, relevance, competition, and shareability)
- A "virality_score" from 1-100 estimating how likely the content is to go viral or be widely shared (consider emotional resonance, cultural timeliness, debate potential, shareability on social media, and whether it taps into a current trend or cultural moment)
- A "trend_category" label: one of "rising_trend", "peak_trend", "evergreen", or "seasonal"
- A brief rationale explaining why this topic would perform well, including what specific trend or cultural moment it capitalizes on

Evaluate current and emerging trends across: faith & spirituality movements, BGLO/D9 culture and events (e.g. step shows, homecomings, founder's days, conventions), campus ministry, social justice, mental health, Gen-Z faith culture, viral social media topics in the Black Greek community, and seasonal moments (back to school, graduation, MLK Day, etc.). Prioritize topics that sit at the intersection of a current trend AND the Sacred Greeks niche for maximum virality.

Content type requested: ${content_type || "blog_post"}

Return your response using the suggest_topics tool.`;

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Suggest 5 ${content_type || "blog_post"} topics for Sacred Greeks Life that will maximize organic reach, engagement, and viral sharing potential. Analyze current trends in BGLO culture, faith movements, campus life, and social media to find topics that are timely, searchable, and uniquely relevant to Christians in Greek organizations.` },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "suggest_topics",
              description: "Return topic suggestions with SEO analysis",
              parameters: {
                type: "object",
                properties: {
                  suggestions: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        title: { type: "string", description: "SEO-optimized article title" },
                        keywords: {
                          type: "array",
                          items: { type: "string" },
                          description: "4-6 target SEO keywords",
                        },
                        audience_reach_score: {
                          type: "number",
                          description: "Score 1-100 estimating audience reach potential",
                        },
                        virality_score: {
                          type: "number",
                          description: "Score 1-100 estimating viral/share potential based on trend alignment, emotional resonance, and cultural timeliness",
                        },
                        trend_category: {
                          type: "string",
                          enum: ["rising_trend", "peak_trend", "evergreen", "seasonal"],
                          description: "Category of the trend this topic capitalizes on",
                        },
                        rationale: {
                          type: "string",
                          description: "Explanation of why this topic would perform well, including the specific trend or cultural moment it capitalizes on",
                        },
                      },
                      required: ["title", "keywords", "audience_reach_score", "virality_score", "trend_category", "rationale"],
                      additionalProperties: false,
                    },
                  },
                },
                required: ["suggestions"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "suggest_topics" } },
      }),
    });

    if (!aiResponse.ok) {
      const status = aiResponse.status;
      if (status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errText = await aiResponse.text();
      console.error("AI error:", status, errText);
      return new Response(JSON.stringify({ error: "AI suggestion failed" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const aiData = await aiResponse.json();
    const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];

    let suggestions = [];
    if (toolCall?.function?.arguments) {
      const parsed = JSON.parse(toolCall.function.arguments);
      suggestions = parsed.suggestions || [];
    }

    // Sort by combined score (virality weighted higher)
    suggestions.sort((a: any, b: any) => {
      const scoreA = (a.virality_score || 0) * 0.6 + (a.audience_reach_score || 0) * 0.4;
      const scoreB = (b.virality_score || 0) * 0.6 + (b.audience_reach_score || 0) * 0.4;
      return scoreB - scoreA;
    });

    return new Response(JSON.stringify({ suggestions }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("suggest-topics error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
