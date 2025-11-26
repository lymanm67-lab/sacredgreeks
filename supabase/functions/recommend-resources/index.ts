import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { currentResource, allResources } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Generating recommendations for:", currentResource.title);

    // Create a simplified list of resources for the AI
    const resourceList = allResources.map((r: any) => ({
      title: r.title,
      description: r.description,
      category: r.category,
      tags: r.tags || [],
      url: r.url
    }));

    const systemPrompt = `You are a resource recommendation expert for Sacred Greeks, a Christian organization focused on faith and Greek life integration. 
Your goal is to recommend 3-4 highly relevant resources based on semantic similarity, topic relevance, and user journey.

Consider:
- Content themes and topics
- User learning progression (basics → advanced)
- Complementary topics that enhance understanding
- Practical application after theory
- Similar frameworks or approaches`;

    const userPrompt = `Current Resource:
Title: ${currentResource.title}
Description: ${currentResource.description}
Category: ${currentResource.category}
Tags: ${currentResource.tags?.join(', ') || 'None'}

Available Resources:
${resourceList.map((r: any, i: number) => 
  `${i + 1}. "${r.title}" - ${r.description} [${r.category}] [${r.tags?.join(', ')}]`
).join('\n')}

Recommend 3-4 resources that would be most valuable to someone who just viewed the current resource. Focus on complementary learning, natural progression, and related topics. Do NOT recommend the current resource.`;

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
          { role: "user", content: userPrompt }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "recommend_resources",
              description: "Return 3-4 recommended resource titles that are most relevant to the current resource",
              parameters: {
                type: "object",
                properties: {
                  recommendations: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        title: { 
                          type: "string",
                          description: "The exact title of the recommended resource"
                        },
                        reason: { 
                          type: "string",
                          description: "Brief reason why this resource is recommended (1 sentence)"
                        }
                      },
                      required: ["title", "reason"],
                      additionalProperties: false
                    },
                    minItems: 3,
                    maxItems: 4
                  }
                },
                required: ["recommendations"],
                additionalProperties: false
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "recommend_resources" } }
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required. Please add credits to your workspace." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    console.log("AI Response:", JSON.stringify(data, null, 2));

    // Extract tool call results
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) {
      throw new Error("No tool call in response");
    }

    const recommendations = JSON.parse(toolCall.function.arguments).recommendations;
    console.log("Parsed recommendations:", recommendations);

    // Match recommended titles to actual resources
    const matchedRecommendations = recommendations
      .map((rec: any) => {
        const match = allResources.find((r: any) => 
          r.title.toLowerCase() === rec.title.toLowerCase()
        );
        return match ? { ...match, reason: rec.reason } : null;
      })
      .filter((r: any) => r !== null && r.url !== currentResource.url);

    console.log("Matched recommendations:", matchedRecommendations.length);

    return new Response(
      JSON.stringify({ recommendations: matchedRecommendations }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in recommend-resources function:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to generate recommendations";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
