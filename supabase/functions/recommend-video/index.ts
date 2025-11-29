import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { checkRateLimit, getClientIdentifier, rateLimitResponse } from "../_shared/rate-limiter.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // SECURITY: Rate limiting
    const clientId = getClientIdentifier(req);
    const rateLimitResult = checkRateLimit(clientId, 'ai_recommendations');
    
    if (!rateLimitResult.allowed) {
      console.log(`Rate limit exceeded for video recommendations: ${clientId}`);
      return rateLimitResponse(corsHeaders, rateLimitResult.resetIn,
        'Too many recommendation requests. Please wait a moment before trying again.');
    }

    const { issue, videos } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are a helpful assistant for Sacred Greeks, a platform helping Christians navigate Greek life (fraternities and sororities). 
Based on the user's issue or question, recommend the most relevant videos from the provided library.

Guidelines:
- Recommend 1-3 most relevant videos
- Explain briefly why each video is relevant to their issue
- Be encouraging and supportive
- If no videos match well, suggest the most generally helpful ones

Return your response as JSON with this structure:
{
  "recommendations": [
    {
      "videoId": "string",
      "reason": "string explaining why this video is helpful"
    }
  ],
  "encouragement": "A brief encouraging message for the user"
}`;

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
          { 
            role: "user", 
            content: `My issue: ${issue}\n\nAvailable videos:\n${JSON.stringify(videos, null, 2)}`
          },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "recommend_videos",
              description: "Return video recommendations based on user issue",
              parameters: {
                type: "object",
                properties: {
                  recommendations: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        videoId: { type: "string" },
                        reason: { type: "string" }
                      },
                      required: ["videoId", "reason"]
                    }
                  },
                  encouragement: { type: "string" }
                },
                required: ["recommendations", "encouragement"]
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "recommend_videos" } }
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits depleted. Please try again later." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    
    if (toolCall && toolCall.function?.arguments) {
      const result = JSON.parse(toolCall.function.arguments);
      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Fallback if tool call didn't work
    return new Response(JSON.stringify({
      recommendations: [],
      encouragement: "We couldn't find specific recommendations, but all our videos offer valuable guidance for your faith journey."
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error: unknown) {
    console.error("Error in recommend-video:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});