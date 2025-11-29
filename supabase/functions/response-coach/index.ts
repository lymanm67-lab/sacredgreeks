import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { checkRateLimit, getClientIdentifier, rateLimitResponse } from "../_shared/rate-limiter.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // SECURITY: Rate limiting (stricter for response coach due to longer responses)
    const clientId = getClientIdentifier(req);
    const rateLimitResult = checkRateLimit(clientId, 'ai_coach');
    
    if (!rateLimitResult.allowed) {
      console.log(`Rate limit exceeded for response coach: ${clientId}`);
      return rateLimitResponse(corsHeaders, rateLimitResult.resetIn,
        'Too many coaching requests. Please wait a moment before trying again.');
    }

    const { userResponse, context, scenario } = await req.json();
    
    if (!userResponse || !context || !scenario) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: userResponse, context, scenario' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY is not configured');
      return new Response(
        JSON.stringify({ error: 'AI service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const systemPrompt = `You are a compassionate communication coach specializing in helping Christian Greeks navigate difficult conversations about their BGLO (Black Greek Letter Organization) membership with family members, pastors, and on social media.

Your role is to provide constructive feedback on their planned responses while:
1. Preserving relationships as the highest priority
2. Maintaining Christian character and witness
3. Being truthful without being defensive
4. Honoring others even when disagreeing

When evaluating a response, analyze:
- TONE: Is it defensive, aggressive, dismissive, or gracious?
- APPROACH: Does it invite dialogue or shut it down?
- RELATIONSHIP: Does it honor the relationship or damage it?
- WITNESS: Does it reflect Christ-like character?
- EFFECTIVENESS: Will it achieve the desired outcome?

Provide your feedback in this exact JSON format:
{
  "overallRating": "excellent" | "good" | "needs-work" | "concerning",
  "toneAnalysis": {
    "score": 1-10,
    "description": "Brief description of the tone",
    "concerns": ["List any tone concerns"]
  },
  "approachAnalysis": {
    "score": 1-10,
    "description": "Brief description of the approach",
    "strengths": ["List strengths"],
    "weaknesses": ["List weaknesses"]
  },
  "relationshipImpact": {
    "score": 1-10,
    "description": "How this response might affect the relationship"
  },
  "suggestions": [
    {
      "issue": "What to improve",
      "suggestion": "How to improve it",
      "example": "Example of better phrasing"
    }
  ],
  "improvedResponse": "A rewritten version of their response that incorporates your feedback while maintaining their voice and intent",
  "keyTakeaway": "One sentence summary of the most important thing to remember"
}

Be encouraging but honest. The goal is to help them communicate effectively while preserving relationships and their Christian witness.`;

    const userPrompt = `SCENARIO: ${scenario}

CONTEXT: ${context}

USER'S PLANNED RESPONSE:
"${userResponse}"

Please analyze this response and provide detailed feedback to help them communicate more effectively while preserving the relationship and their Christian witness.`;

    console.log('Calling Lovable AI for response coaching...');
    
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Lovable AI error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI credits exhausted. Please try again later.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: 'Failed to get AI feedback' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    if (!content) {
      console.error('No content in AI response');
      return new Response(
        JSON.stringify({ error: 'No feedback generated' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Try to parse as JSON, handling potential markdown code blocks
    let feedback;
    try {
      // Remove markdown code blocks if present
      let jsonContent = content;
      if (content.includes('```json')) {
        jsonContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '');
      } else if (content.includes('```')) {
        jsonContent = content.replace(/```\n?/g, '');
      }
      feedback = JSON.parse(jsonContent.trim());
    } catch (parseError) {
      console.error('Failed to parse AI response as JSON:', parseError);
      console.log('Raw content:', content);
      // Return the raw content as a fallback
      feedback = {
        overallRating: 'good',
        toneAnalysis: { score: 7, description: 'Analysis available', concerns: [] },
        approachAnalysis: { score: 7, description: content, strengths: [], weaknesses: [] },
        relationshipImpact: { score: 7, description: 'See detailed feedback' },
        suggestions: [],
        improvedResponse: '',
        keyTakeaway: 'Please review the detailed feedback above.'
      };
    }

    console.log('Response coach feedback generated successfully');
    
    return new Response(
      JSON.stringify({ feedback }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('Error in response-coach function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});