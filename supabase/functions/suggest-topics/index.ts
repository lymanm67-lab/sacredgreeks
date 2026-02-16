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

    const systemPrompt = `You are an SEO strategist for Sacred Greeks Life (FocusOS), the #1 faith-based app for Christians in Greek life (fraternities & sororities, with a focus on BGLO/Divine Nine/NPHC organizations).

Generate 5 highly-targeted content topic suggestions. For each topic, provide:
- A compelling title optimized for search
- 4-6 SEO keywords that the target audience actually searches for
- An "audience_reach_score" from 1-100 estimating how likely this topic is to reach and engage the target audience (consider search volume, relevance, competition, and shareability)
- A brief rationale explaining why this topic would perform well

Consider trending conversations in faith, Greek life, campus ministry, BGLO culture, and spiritual growth. Prioritize topics at the unique intersection that Sacred Greeks Life owns.

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
          { role: "user", content: `Suggest 5 ${content_type || "blog_post"} topics for Sacred Greeks Life that will maximize organic reach and engagement. Focus on topics that are timely, searchable, and uniquely relevant to Christians in Greek organizations.` },
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
                        rationale: {
                          type: "string",
                          description: "Brief explanation of why this topic would perform well",
                        },
                      },
                      required: ["title", "keywords", "audience_reach_score", "rationale"],
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

    // Sort by audience reach score descending
    suggestions.sort((a: any, b: any) => b.audience_reach_score - a.audience_reach_score);

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
