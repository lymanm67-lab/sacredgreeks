import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { checkRateLimit, getClientIdentifier, rateLimitResponse } from "../_shared/rate-limiter.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Valid prayer categories
const VALID_CATEGORIES = [
  'thanksgiving', 'protection', 'healing', 'fear', 
  'strength', 'wisdom', 'forgiveness', 'relationships'
] as const;

type PrayerCategory = typeof VALID_CATEGORIES[number];

// Input validation
interface PrayerInput {
  category: PrayerCategory;
  situation?: string;
  userName?: string;
}

function validatePrayerInput(data: unknown): { valid: true; data: PrayerInput } | { valid: false; error: string } {
  if (!data || typeof data !== 'object') {
    return { valid: false, error: 'Invalid request body' };
  }

  const { category, situation, userName } = data as Record<string, unknown>;

  // Validate category
  if (!category || typeof category !== 'string' || !VALID_CATEGORIES.includes(category as PrayerCategory)) {
    return { valid: false, error: `Invalid category. Must be one of: ${VALID_CATEGORIES.join(', ')}` };
  }

  // Validate situation (optional, max 1000 chars)
  if (situation !== undefined) {
    if (typeof situation !== 'string') {
      return { valid: false, error: 'Situation must be a string' };
    }
    if (situation.length > 1000) {
      return { valid: false, error: 'Situation must be 1000 characters or less' };
    }
  }

  // Validate userName (optional, max 100 chars)
  if (userName !== undefined) {
    if (typeof userName !== 'string') {
      return { valid: false, error: 'User name must be a string' };
    }
    if (userName.length > 100) {
      return { valid: false, error: 'User name must be 100 characters or less' };
    }
  }

  return {
    valid: true,
    data: {
      category: category as PrayerCategory,
      situation: situation as string | undefined,
      userName: userName as string | undefined,
    }
  };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // SECURITY: Rate limiting
    const clientId = getClientIdentifier(req);
    const rateLimitResult = checkRateLimit(clientId, 'ai_prayer');
    
    if (!rateLimitResult.allowed) {
      console.log(`Rate limit exceeded for prayer generation: ${clientId}`);
      return rateLimitResponse(corsHeaders, rateLimitResult.resetIn,
        'Too many prayer generation requests. Please wait a moment before trying again.');
    }

    // SECURITY: Input validation
    const requestBody = await req.json();
    const validation = validatePrayerInput(requestBody);
    
    if (!validation.valid) {
      return new Response(
        JSON.stringify({ error: validation.error }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { category, situation, userName } = validation.data;
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    // Construct system prompt based on prayer category
    const categoryGuidance: Record<string, string> = {
      thanksgiving: "Focus on gratitude, praise, and recognizing God's blessings. Include specific things to thank God for.",
      protection: "Ask for God's protection, safety, and guidance. Include themes of divine covering and trust in God's care.",
      healing: "Pray for physical, emotional, and spiritual healing. Include comfort, restoration, and faith in God's healing power.",
      fear: "Address fears and anxieties with God's peace and strength. Include scriptures about courage and trusting God.",
      strength: "Request strength, endurance, and perseverance. Include reliance on God's power in weakness.",
      wisdom: "Ask for discernment, clarity, and divine guidance in decision-making.",
      forgiveness: "Focus on seeking forgiveness and extending forgiveness to others. Include themes of grace and reconciliation.",
      relationships: "Pray for healthy relationships, unity, and love within community and family."
    };

    const guidance = categoryGuidance[category] || "Provide heartfelt prayer guidance";
    const namePrefix = userName ? `${userName}'s` : "A";

    const systemPrompt = `You are a compassionate Christian prayer guide. Generate a heartfelt, biblically-grounded prayer.

Guidelines:
- ${guidance}
- Use "we" and "our" (inclusive) rather than "I" and "my"
- Keep it 3-4 paragraphs
- Include 1-2 relevant scripture references naturally woven in
- Be specific to the situation provided
- End with "In Jesus' name, Amen"
- Make it personal, warm, and authentic
- Use contemporary Christian language (not archaic "thee/thou")`;

    const userPrompt = situation 
      ? `Generate a prayer for ${namePrefix} prayer about: ${situation}` 
      : `Generate a general ${category} prayer`;

    console.log('Generating prayer with Lovable AI...');

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
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI service requires additional credits. Please contact support.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      const errorText = await response.text();
      console.error('AI API error:', response.status, errorText);
      throw new Error('AI service error');
    }

    const data = await response.json();
    const prayer = data.choices?.[0]?.message?.content;

    if (!prayer) {
      throw new Error('No prayer generated');
    }

    console.log('Prayer generated successfully');

    return new Response(
      JSON.stringify({ prayer }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in generate-prayer function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to generate prayer';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
