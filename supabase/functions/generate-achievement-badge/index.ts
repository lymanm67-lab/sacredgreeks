import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { checkRateLimit, getClientIdentifier, rateLimitResponse } from "../_shared/rate-limiter.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const VALID_BADGE_TYPES = ["study_guide", "devotional", "assessment"] as const;
type BadgeType = typeof VALID_BADGE_TYPES[number];

interface BadgeRequest {
  type: BadgeType;
  title: string;
  subtitle?: string;
  completionDate?: string;
  userName?: string;
}

function validateBadgeRequest(data: unknown): { valid: true; data: BadgeRequest } | { valid: false; error: string } {
  if (!data || typeof data !== 'object') {
    return { valid: false, error: 'Invalid request body' };
  }

  const { type, title, subtitle, completionDate, userName } = data as Record<string, unknown>;

  if (!type || typeof type !== 'string' || !VALID_BADGE_TYPES.includes(type as BadgeType)) {
    return { valid: false, error: `Invalid type. Must be one of: ${VALID_BADGE_TYPES.join(', ')}` };
  }

  if (!title || typeof title !== 'string' || title.length === 0 || title.length > 200) {
    return { valid: false, error: 'Title is required and must be 1-200 characters' };
  }

  if (subtitle !== undefined && (typeof subtitle !== 'string' || subtitle.length > 200)) {
    return { valid: false, error: 'Subtitle must be a string under 200 characters' };
  }

  if (completionDate !== undefined && (typeof completionDate !== 'string' || completionDate.length > 50)) {
    return { valid: false, error: 'Completion date must be a string under 50 characters' };
  }

  if (userName !== undefined && (typeof userName !== 'string' || userName.length > 100)) {
    return { valid: false, error: 'User name must be a string under 100 characters' };
  }

  return {
    valid: true,
    data: {
      type: type as BadgeType,
      title: title as string,
      subtitle: subtitle as string | undefined,
      completionDate: completionDate as string | undefined,
      userName: userName as string | undefined,
    }
  };
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // SECURITY: Authentication check
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Authorization required' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } }
    });

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid or expired token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // SECURITY: Rate limiting (5 badge generations per minute per user)
    const clientId = getClientIdentifier(req, user.id);
    const rateLimitResult = checkRateLimit(clientId, 'ai_coach'); // Using ai_coach limit (5/min)
    
    if (!rateLimitResult.allowed) {
      console.log(`Rate limit exceeded for badge generation: ${user.id}`);
      return rateLimitResponse(corsHeaders, rateLimitResult.resetIn,
        'Too many badge generation requests. Please wait a moment before trying again.');
    }

    // SECURITY: Input validation
    const requestBody = await req.json();
    const validation = validateBadgeRequest(requestBody);
    
    if (!validation.valid) {
      return new Response(
        JSON.stringify({ error: validation.error }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { type, title, subtitle, completionDate, userName } = validation.data;

    console.log("Generating badge for user:", user.id, { type, title });

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY not configured");
    }

    // Create detailed prompt based on achievement type
    let prompt = "";
    const safeTitle = title.substring(0, 100);
    const safeSubtitle = subtitle?.substring(0, 100) || '';
    const safeUserName = userName?.substring(0, 50) || 'Sacred Greeks Member';
    const safeDate = completionDate?.substring(0, 30) || new Date().toLocaleDateString();
    
    switch (type) {
      case "study_guide":
        prompt = `Create a beautiful, professional achievement badge certificate with a modern design. The design should have:
- A gradient background from deep purple (#7c3aed) to lighter purple (#a855f7)
- Sacred geometry or elegant ornamental borders in gold/white
- Large bold text saying "${safeTitle}"
- Subtitle: "${safeSubtitle || 'Study Guide Completed'}"
- User name: "${safeUserName}"
- Date completed: "${safeDate}"
- A ribbon or medal icon at the top
- Elegant, celebratory design suitable for Instagram sharing (1080x1080px square format)
- Professional typography with clear hierarchy
- Inspirational elements like stars, laurels, or divine light rays
Make it feel special and worthy of sharing on social media.`;
        break;
        
      case "devotional":
        prompt = `Create a serene, spiritual achievement badge with:
- A peaceful gradient background from soft blue to warm cream
- Gentle light rays or sunrise imagery
- Large text: "${safeTitle}"
- Subtitle: "Daily Devotional Completed"
- User name: "${safeUserName}"
- An open book or praying hands icon
- Date: "${safeDate}"
- Calming, meditative design (1080x1080px square)
- Scripture-inspired decorative elements
- Soft, warm color palette
Perfect for sharing spiritual growth milestones.`;
        break;
        
      case "assessment":
        prompt = `Create an impressive achievement certificate badge with:
- A bold gradient background from purple to gold
- Professional academic or achievement-style design
- Large prominent text: "${safeTitle}"
- Subtitle: "${safeSubtitle || 'Assessment Completed'}"
- User name: "${safeUserName}"
- A shield, star, or trophy icon
- Date: "${safeDate}"
- Sharp, modern design (1080x1080px square)
- Celebratory elements like confetti or stars
- Professional color scheme
Designed to celebrate personal growth and achievement.`;
        break;
    }

    // Call Lovable AI Gateway for image generation
    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image-preview",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        modalities: ["image", "text"]
      })
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error("AI Gateway error:", errorText);
      throw new Error(`AI Gateway failed: ${aiResponse.status} - ${errorText}`);
    }

    const aiData = await aiResponse.json();
    console.log("AI response received for user:", user.id);

    // Extract the generated image
    const imageUrl = aiData.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    
    if (!imageUrl) {
      throw new Error("No image generated by AI");
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        imageUrl,
        message: "Badge generated successfully"
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error generating badge:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message || "Failed to generate badge",
        success: false
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
