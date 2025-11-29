import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { checkRateLimit, getClientIdentifier, rateLimitResponse } from "../_shared/rate-limiter.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// SECURITY: Input validation limits
const MAX_RESOURCES = 100;
const MAX_TITLE_LENGTH = 500;
const MAX_DESCRIPTION_LENGTH = 2000;

interface Resource {
  title: string;
  description?: string;
  category?: string;
  tags?: string[];
  url?: string;
}

function validateResource(resource: unknown, fieldName: string): { valid: boolean; error?: string; resource?: Resource } {
  if (!resource || typeof resource !== "object") {
    return { valid: false, error: `${fieldName} must be an object` };
  }

  const r = resource as Record<string, unknown>;

  if (!r.title || typeof r.title !== "string") {
    return { valid: false, error: `${fieldName}.title is required and must be a string` };
  }

  if (r.title.length > MAX_TITLE_LENGTH) {
    return { valid: false, error: `${fieldName}.title exceeds ${MAX_TITLE_LENGTH} characters` };
  }

  const validated: Resource = {
    title: r.title.substring(0, MAX_TITLE_LENGTH),
  };

  if (r.description && typeof r.description === "string") {
    validated.description = r.description.substring(0, MAX_DESCRIPTION_LENGTH);
  }

  if (r.category && typeof r.category === "string") {
    validated.category = r.category.substring(0, 100);
  }

  if (r.url && typeof r.url === "string") {
    validated.url = r.url.substring(0, 500);
  }

  if (Array.isArray(r.tags)) {
    validated.tags = r.tags
      .filter((t): t is string => typeof t === "string")
      .slice(0, 20)
      .map(t => t.substring(0, 50));
  }

  return { valid: true, resource: validated };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // SECURITY: Rate limiting
    const clientId = getClientIdentifier(req);
    const rateLimitResult = checkRateLimit(clientId, 'ai_recommendations');
    
    if (!rateLimitResult.allowed) {
      console.log(`Rate limit exceeded for resource recommendations: ${clientId}`);
      return rateLimitResponse(corsHeaders, rateLimitResult.resetIn,
        'Too many recommendation requests. Please wait a moment before trying again.');
    }

    const body = await req.json();
    const { currentResource, allResources } = body;

    // SECURITY: Validate currentResource
    if (!currentResource) {
      return new Response(
        JSON.stringify({ error: "currentResource is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const currentValidation = validateResource(currentResource, "currentResource");
    if (!currentValidation.valid) {
      return new Response(
        JSON.stringify({ error: currentValidation.error }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // SECURITY: Validate allResources
    if (!Array.isArray(allResources)) {
      return new Response(
        JSON.stringify({ error: "allResources must be an array" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (allResources.length > MAX_RESOURCES) {
      return new Response(
        JSON.stringify({ error: `Maximum ${MAX_RESOURCES} resources allowed` }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const validatedResources: Resource[] = [];
    for (let i = 0; i < allResources.length; i++) {
      const validation = validateResource(allResources[i], `allResources[${i}]`);
      if (!validation.valid) {
        return new Response(
          JSON.stringify({ error: validation.error }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      validatedResources.push(validation.resource!);
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Generating recommendations for:", currentValidation.resource!.title);

    // Create a simplified list of resources for the AI
    const resourceList = validatedResources.map((r) => ({
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
Title: ${currentValidation.resource!.title}
Description: ${currentValidation.resource!.description || 'None'}
Category: ${currentValidation.resource!.category || 'None'}
Tags: ${currentValidation.resource!.tags?.join(', ') || 'None'}

Available Resources:
${resourceList.map((r, i) => 
  `${i + 1}. "${r.title}" - ${r.description || 'No description'} [${r.category || 'uncategorized'}] [${r.tags?.join(', ') || 'no tags'}]`
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
      // Return empty recommendations instead of failing
      return new Response(
        JSON.stringify({ recommendations: [] }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    console.log("AI Response received");

    // Extract tool call results
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) {
      console.error("No tool call in response");
      return new Response(
        JSON.stringify({ recommendations: [] }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    let recommendations;
    try {
      recommendations = JSON.parse(toolCall.function.arguments).recommendations;
    } catch (parseError) {
      console.error("Failed to parse recommendations:", parseError);
      return new Response(
        JSON.stringify({ recommendations: [] }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Match recommended titles to actual resources
    const matchedRecommendations = recommendations
      .map((rec: any) => {
        const match = validatedResources.find((r) => 
          r.title.toLowerCase() === rec.title.toLowerCase()
        );
        return match ? { ...match, reason: rec.reason } : null;
      })
      .filter((r: any) => r !== null && r.url !== currentValidation.resource!.url);

    console.log("Matched recommendations:", matchedRecommendations.length);

    return new Response(
      JSON.stringify({ recommendations: matchedRecommendations }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in recommend-resources function:", error);
    return new Response(
      JSON.stringify({ recommendations: [] }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
