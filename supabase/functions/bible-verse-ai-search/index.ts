import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// SECURITY: Input validation
const MAX_QUERY_LENGTH = 1000;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { query } = body;
    
    // SECURITY: Validate input
    if (!query || typeof query !== "string") {
      return new Response(
        JSON.stringify({ error: 'Query is required and must be a string' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const trimmedQuery = query.trim();

    if (trimmedQuery.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Query cannot be empty' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (trimmedQuery.length > MAX_QUERY_LENGTH) {
      return new Response(
        JSON.stringify({ error: `Query must be ${MAX_QUERY_LENGTH} characters or less` }),
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

    console.log('Processing Bible verse search query');

    // Call Lovable AI to help find relevant Bible verses
    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: `You are a Bible verse search assistant. When users describe a Bible verse or concept (even imperfectly), help them find the exact reference. 

Return your response as a JSON array with 1-3 most relevant verses in this exact format:
[
  {
    "reference": "Book Chapter:Verse",
    "text": "The actual KJV verse text",
    "keywords": ["relevant", "search", "terms"]
  }
]

Be precise with references (e.g., "James 2:10" not just "James 2"). Include the full verse text from KJV. Only return the JSON array, nothing else.`
          },
          {
            role: 'user',
            content: trimmedQuery
          }
        ],
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI API error:', aiResponse.status, errorText);
      
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: 'AI search rate limit exceeded. Please try again in a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI search credits exhausted. Please contact support.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ error: 'Failed to process AI search' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const aiData = await aiResponse.json();
    const aiText = aiData.choices?.[0]?.message?.content || '[]';
    
    console.log('AI response received');

    // Parse the AI response
    let verses;
    try {
      // Extract JSON from the response (in case there's extra text)
      const jsonMatch = aiText.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        verses = JSON.parse(jsonMatch[0]);
      } else {
        verses = JSON.parse(aiText);
      }

      // Validate and sanitize parsed verses
      if (!Array.isArray(verses)) {
        verses = [];
      }

      verses = verses
        .filter((v: unknown) => v && typeof v === "object")
        .slice(0, 10)
        .map((v: any) => ({
          reference: String(v.reference || "").substring(0, 100),
          text: String(v.text || "").substring(0, 2000),
          keywords: Array.isArray(v.keywords) 
            ? v.keywords.filter((k: unknown) => typeof k === "string").slice(0, 10).map((k: string) => k.substring(0, 50))
            : []
        }));

    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      return new Response(
        JSON.stringify({ error: 'Failed to parse AI response' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ verses }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in bible-verse-ai-search:', error);
    return new Response(
      JSON.stringify({ error: 'An error occurred while searching for verses' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
