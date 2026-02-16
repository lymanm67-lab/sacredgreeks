import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Curated niche topics for Sacred Greeks Life content rotation
const TOPIC_POOL = [
  { topic: "How the P.R.O.O.F. Framework Helps Christians Evaluate Greek Membership", keywords: ["PROOF framework", "Christian Greek life", "biblical discernment", "fraternity faith"] },
  { topic: "Biblical Foundations of Brotherhood: What Scripture Says About Fraternal Bonds", keywords: ["Christian brotherhood", "fraternity Bible", "Greek life faith", "sacred bonds"] },
  { topic: "Navigating Hazing as a Christian: Setting Boundaries in Greek Organizations", keywords: ["anti-hazing Christian", "Greek life boundaries", "faith fraternity", "BGLO hazing"] },
  { topic: "The History of Faith in Divine Nine Organizations", keywords: ["Divine Nine faith", "D9 Christian history", "NPHC spirituality", "Black Greek church"] },
  { topic: "How to Start a Prayer Group in Your Greek Chapter", keywords: ["Greek chapter prayer", "fraternity prayer group", "sorority faith", "campus ministry Greek"] },
  { topic: "Understanding Oaths and Pledges: A Biblical Perspective for Greek Members", keywords: ["Greek oaths Bible", "fraternity pledges Christian", "biblical oaths", "sorority vows faith"] },
  { topic: "5 Ways to Be a Spiritual Leader in Your Fraternity or Sorority", keywords: ["Greek spiritual leadership", "fraternity faith leader", "sorority Christian role model"] },
  { topic: "Faith Over Rituals: When Greek Traditions Conflict with Your Beliefs", keywords: ["Greek rituals faith", "Christian fraternity conflict", "sorority traditions Bible"] },
  { topic: "Why Every Greek Chapter Needs a Chaplain", keywords: ["chapter chaplain", "Greek organization chaplain", "fraternity spiritual advisor"] },
  { topic: "Community Service as Worship: Aligning Greek Philanthropy with Biblical Calling", keywords: ["Greek philanthropy faith", "community service Bible", "fraternity giving Christian"] },
  { topic: "The Tekton Guild Connection: Ancient Trade Associations and Modern Greek Life", keywords: ["Tekton guild", "ancient guilds Greek life", "biblical trade associations"] },
  { topic: "Ichthys and Identity: Secret Christian Symbols in Greek Tradition", keywords: ["Ichthys symbol", "Christian symbols Greek", "early church recognition"] },
  { topic: "Financial Stewardship in Greek Life: Biblical Principles for Dues and Budgets", keywords: ["Greek life finances", "fraternity stewardship", "Christian money management Greek"] },
  { topic: "How FocusOS Helps Christian Greeks Stay Spiritually Grounded", keywords: ["FocusOS app", "Sacred Greeks Life", "Christian Greek app", "faith app fraternity"] },
  { topic: "Mentoring the Next Line: Discipleship Principles for Greek Big Brothers and Sisters", keywords: ["Greek mentoring", "fraternity discipleship", "sorority big sister faith"] },
  { topic: "What Does the Bible Say About Secret Societies and Greek Organizations?", keywords: ["Bible secret societies", "Greek organizations biblical", "fraternity secrecy Christian"] },
  { topic: "Building a Christ-Centered Greek Experience on Campus", keywords: ["Christ-centered Greek life", "campus fraternity faith", "Christian sorority experience"] },
  { topic: "From Pledge to Purpose: Finding God's Plan Through Greek Membership", keywords: ["Greek membership purpose", "God's plan fraternity", "faith journey sorority"] },
  { topic: "The Right Hand of Fellowship: Galatians 2:9 and Greek Brotherhood", keywords: ["right hand fellowship", "Galatians Greek life", "Christian brotherhood scripture"] },
  { topic: "Healing Stories: How Faith Transformed My Greek Life Experience", keywords: ["faith testimony Greek", "healing Greek life", "Christian fraternity story"] },
  { topic: "Greek Leadership Summit Prep: Faith-Based Frameworks for Chapter Officers", keywords: ["Greek leadership faith", "chapter officer Christian", "fraternity leadership Bible"] },
  { topic: "Why Christian Greeks Are the Future of the Divine Nine", keywords: ["Christian Divine Nine", "future D9 faith", "NPHC Christian movement"] },
  { topic: "Balancing Academics, Faith, and Greek Life: A Practical Guide", keywords: ["balance Greek life faith", "academics fraternity Christian", "time management sorority"] },
  { topic: "Sacred Networking: Building Professional Relationships with Eternal Perspective", keywords: ["sacred networking", "Christian professional Greek", "fraternity networking faith"] },
];

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY not configured");
      return new Response(JSON.stringify({ error: "AI service not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Pick a random topic that hasn't been used recently
    const { data: recentDrafts } = await supabase
      .from("content_drafts")
      .select("title")
      .order("created_at", { ascending: false })
      .limit(10);

    const recentTitles = new Set((recentDrafts || []).map((d) => d.title.toLowerCase()));
    const availableTopics = TOPIC_POOL.filter(
      (t) => !recentTitles.has(t.topic.toLowerCase())
    );
    const pool = availableTopics.length > 0 ? availableTopics : TOPIC_POOL;
    const selected = pool[Math.floor(Math.random() * pool.length)];

    console.log(`Generating content for: ${selected.topic}`);

    const systemPrompt = `You are an expert SEO content writer for Sacred Greeks Life (FocusOS), the #1 faith-based app for Christians in Greek life (fraternities & sororities). Write a comprehensive, SEO-optimized blog post.

Requirements:
- Title should be under 60 characters and include the primary keyword
- Include a compelling meta description under 160 chars
- Write 800-1200 words of high-quality, engaging content
- Use H2 and H3 subheadings for structure
- Include a brief excerpt (1-2 sentences)
- Naturally incorporate keywords throughout
- End with a call-to-action about Sacred Greeks Life app
- Tone: authoritative yet approachable, faith-centered
- Reference Dr. Lyman Montgomery's book "Sacred, Not Sinful" where appropriate

Return your response using the generate_content tool.`;

    const userPrompt = `Topic: ${selected.topic}\nTarget keywords: ${selected.keywords.join(", ")}`;

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
      const errText = await aiResponse.text();
      console.error("AI error:", aiResponse.status, errText);
      return new Response(JSON.stringify({ error: "AI generation failed", status: aiResponse.status }), {
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
      const rawContent = aiData.choices?.[0]?.message?.content || "";
      generated = {
        title: selected.topic,
        content: rawContent,
        excerpt: rawContent.substring(0, 150),
        meta_description: rawContent.substring(0, 155),
        seo_title: selected.topic.substring(0, 59),
        suggested_keywords: selected.keywords,
      };
    }

    const slug = generated.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .substring(0, 80);

    // Get the content author — use existing content creator or first profile
    const { data: existingAuthor } = await supabase
      .from("content_drafts")
      .select("user_id")
      .limit(1)
      .single();

    const userId = existingAuthor?.user_id || "019de242-b917-42dc-8eb1-91bead20b758";
    if (!userId) {
      console.error("No user found to attribute content");
      return new Response(JSON.stringify({ error: "No admin user found" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: draft, error: insertError } = await supabase
      .from("content_drafts")
      .insert({
        user_id: userId,
        content_type: "blog_post",
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

    console.log(`Content draft created: ${draft.id} — "${generated.title}"`);

    return new Response(JSON.stringify({ success: true, draft }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("scheduled-content error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
