import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const CONTENT_PROMPTS: Record<string, string> = {
  blog_post: `You are an expert SEO content writer for Sacred Greeks Life (FocusOS), the #1 faith-based app for Christians in Greek life (fraternities & sororities). Write a comprehensive, SEO-optimized blog post.

Requirements:
- Title should be under 60 characters and include the primary keyword
- Include a compelling meta description under 160 chars
- Write 800-1200 words of high-quality, engaging content
- Use H2 and H3 subheadings for structure
- Include a brief excerpt (1-2 sentences)
- Naturally incorporate keywords throughout
- End with a call-to-action about Sacred Greeks Life app
- Tone: authoritative yet approachable, faith-centered

Return your response using the generate_content tool.`,

  pr_release: `You are a PR specialist for Sacred Greeks Life (FocusOS), the leading faith-based app for Christians in Greek organizations. Write a professional press release.

Requirements:
- Standard press release format with dateline
- Compelling headline under 80 characters
- Strong opening paragraph answering who/what/when/where/why
- 400-600 words total
- Include quotes from "Dr. Lyman Montgomery, Founder of Sacred Greeks Life"
- Include boilerplate about Sacred Greeks Life at the end
- Professional, newsworthy tone

Return your response using the generate_content tool.`,

  social_media: `You are a social media strategist for Sacred Greeks Life (FocusOS), a faith-based app for Christians in Greek life. Create a set of social media posts.

Requirements:
- Create 5 posts: 2 for Instagram, 2 for Twitter/X, 1 for LinkedIn
- Each post should have appropriate hashtags
- Include emoji where appropriate
- Maintain brand voice: faith-centered, empowering, community-focused
- Reference FocusOS/Sacred Greeks Life naturally
- Include calls to action

Return your response using the generate_content tool.`,
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "No authorization header" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { content_type, topic, keywords } = await req.json();

    if (!content_type || !topic) {
      return new Response(JSON.stringify({ error: "content_type and topic are required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const systemPrompt = CONTENT_PROMPTS[content_type];
    if (!systemPrompt) {
      return new Response(JSON.stringify({ error: "Invalid content_type" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userPrompt = `Topic: ${topic}${keywords?.length ? `\nTarget keywords: ${keywords.join(", ")}` : ""}`;

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "AI service not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

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
          { role: "user", content: userPrompt },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "generate_content",
              description: "Return the generated content with metadata",
              parameters: {
                type: "object",
                properties: {
                  title: { type: "string", description: "The content title" },
                  content: { type: "string", description: "The full content body in markdown" },
                  excerpt: { type: "string", description: "A 1-2 sentence excerpt/summary" },
                  meta_description: { type: "string", description: "SEO meta description under 160 chars" },
                  seo_title: { type: "string", description: "SEO-optimized title under 60 chars" },
                  suggested_keywords: {
                    type: "array",
                    items: { type: "string" },
                    description: "Suggested SEO keywords",
                  },
                },
                required: ["title", "content", "excerpt", "meta_description", "seo_title", "suggested_keywords"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "generate_content" } },
      }),
    });

    if (!aiResponse.ok) {
      const status = aiResponse.status;
      if (status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errText = await aiResponse.text();
      console.error("AI error:", status, errText);
      return new Response(JSON.stringify({ error: "AI generation failed" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const aiData = await aiResponse.json();
    const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
    
    let generated;
    if (toolCall?.function?.arguments) {
      generated = JSON.parse(toolCall.function.arguments);
    } else {
      // Fallback: use the message content directly
      const rawContent = aiData.choices?.[0]?.message?.content || "";
      generated = {
        title: topic,
        content: rawContent,
        excerpt: rawContent.substring(0, 150),
        meta_description: rawContent.substring(0, 155),
        seo_title: topic.substring(0, 59),
        suggested_keywords: keywords || [],
      };
    }

    // Generate slug from title
    const slug = generated.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .substring(0, 80);

    // Save to database
    const { data: draft, error: insertError } = await supabase
      .from("content_drafts")
      .insert({
        user_id: user.id,
        content_type,
        title: generated.title,
        slug,
        content: generated.content,
        excerpt: generated.excerpt,
        meta_description: generated.meta_description,
        seo_title: generated.seo_title,
        keywords: generated.suggested_keywords,
        ai_model: "google/gemini-3-flash-preview",
        generation_prompt: userPrompt,
        status: "draft",
      })
      .select()
      .single();

    if (insertError) {
      console.error("Insert error:", insertError);
      return new Response(JSON.stringify({ error: "Failed to save draft", details: insertError.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, draft }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-content error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
