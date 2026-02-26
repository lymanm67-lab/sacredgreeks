import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// 24 curated niche topics for Sacred Greeks Life rotation
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

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
  const ADMIN_EMAIL = Deno.env.get("ADMIN_EMAIL");
  const siteUrl = "https://sacredgreeks.lovable.app";

  // Create a run record
  const { data: run, error: runErr } = await supabase
    .from("marketing_runs")
    .insert({ status: "running", started_at: new Date().toISOString() })
    .select()
    .single();

  if (runErr || !run) {
    console.error("Failed to create run record:", runErr);
    return new Response(JSON.stringify({ error: "Failed to create run" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const runId = run.id;

  const updateRun = async (updates: Record<string, unknown>) => {
    await supabase.from("marketing_runs").update(updates).eq("id", runId);
  };

  try {
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    // ═══════════════════════════════════════════════════
    // STEP 1: Pick a trending topic
    // ═══════════════════════════════════════════════════
    const { data: recentDrafts } = await supabase
      .from("content_drafts")
      .select("title")
      .order("created_at", { ascending: false })
      .limit(10);

    const recentTitles = new Set((recentDrafts || []).map((d: any) => d.title.toLowerCase()));
    const availableTopics = TOPIC_POOL.filter((t) => !recentTitles.has(t.topic.toLowerCase()));
    const pool = availableTopics.length > 0 ? availableTopics : TOPIC_POOL;
    const selected = pool[Math.floor(Math.random() * pool.length)];

    await updateRun({ topic: selected.topic });
    console.log(`[Marketing Agent] Topic: ${selected.topic}`);

    // ═══════════════════════════════════════════════════
    // STEP 2: Generate blog post + social media in one AI call
    // ═══════════════════════════════════════════════════
    const systemPrompt = `You are the Weekly Marketing Agent for Sacred Greeks Life (FocusOS), the #1 faith-based app for Christians in Greek life. You produce a complete marketing package in a single pass.

Requirements for the BLOG POST:
- Title under 60 characters with primary keyword
- Meta description under 160 chars
- 800-1200 words of SEO-optimized, engaging content
- Use H2/H3 subheadings for structure
- Brief excerpt (1-2 sentences)
- Reference Dr. Lyman Montgomery's book "Sacred, Not Sinful" where appropriate
- Internal links to: /proof-framework, /snapshot, /should-i-leave-my-fraternity, /is-greek-life-a-sin, /christian-fraternity-guide, /divine-nine-spiritual-concerns
- End with CTA about Sacred Greeks Life app

Requirements for EMAIL CAMPAIGN:
- Compelling email subject line (under 50 chars, curiosity-driven)
- Email preview text (under 90 chars)
- Email body in HTML (branded, mobile-friendly, with CTA button linking to the blog post)
- Tone: warm, faith-centered, informative

Requirements for SOCIAL MEDIA:
- LinkedIn post: professional, 150-300 words, with hashtags
- Twitter/X post: under 280 chars, engaging hook, with hashtags
- Facebook post: conversational, 100-200 words, with emojis and hashtags

Return your response using the weekly_marketing_package tool.`;

    const userPrompt = `Topic: ${selected.topic}\nTarget keywords: ${selected.keywords.join(", ")}\nBlog URL will be: ${siteUrl}/blog/{slug}`;

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
              name: "weekly_marketing_package",
              description: "Return the complete weekly marketing package",
              parameters: {
                type: "object",
                properties: {
                  // Blog
                  blog_title: { type: "string", description: "Blog post title under 60 chars" },
                  blog_content: { type: "string", description: "Full blog content in markdown (800-1200 words)" },
                  blog_excerpt: { type: "string", description: "1-2 sentence excerpt" },
                  blog_meta_description: { type: "string", description: "SEO meta description under 160 chars" },
                  blog_seo_title: { type: "string", description: "SEO title under 60 chars" },
                  blog_keywords: { type: "array", items: { type: "string" }, description: "SEO keywords" },
                  blog_internal_links: { type: "array", items: { type: "string" }, description: "Internal link paths used" },
                  // Email
                  email_subject: { type: "string", description: "Email subject line under 50 chars" },
                  email_preview: { type: "string", description: "Email preview text under 90 chars" },
                  email_body_html: { type: "string", description: "Complete branded email HTML body with CTA button" },
                  // Social
                  social_linkedin: { type: "string", description: "LinkedIn post (150-300 words with hashtags)" },
                  social_twitter: { type: "string", description: "Twitter/X post under 280 chars with hashtags" },
                  social_facebook: { type: "string", description: "Facebook post (100-200 words with emojis)" },
                  // Hashtags
                  hashtags: { type: "array", items: { type: "string" }, description: "8-12 hashtags without # prefix" },
                },
                required: [
                  "blog_title", "blog_content", "blog_excerpt", "blog_meta_description",
                  "blog_seo_title", "blog_keywords", "email_subject", "email_preview",
                  "email_body_html", "social_linkedin", "social_twitter", "social_facebook", "hashtags"
                ],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "weekly_marketing_package" } },
      }),
    });

    if (!aiResponse.ok) {
      const status = aiResponse.status;
      const errText = await aiResponse.text();
      console.error("AI error:", status, errText);
      if (status === 429) throw new Error("Rate limit exceeded. Try again later.");
      if (status === 402) throw new Error("AI credits exhausted. Please add funds.");
      throw new Error(`AI generation failed (${status})`);
    }

    const aiData = await aiResponse.json();
    const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];

    if (!toolCall?.function?.arguments) {
      throw new Error("AI did not return structured output");
    }

    const pkg = JSON.parse(toolCall.function.arguments);
    console.log("[Marketing Agent] AI package generated successfully");

    // ═══════════════════════════════════════════════════
    // STEP 3: Publish blog post
    // ═══════════════════════════════════════════════════
    const slug = pkg.blog_title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .substring(0, 80);

    const { data: existingAuthor } = await supabase
      .from("content_drafts")
      .select("user_id")
      .limit(1)
      .single();

    const userId = existingAuthor?.user_id || "019de242-b917-42dc-8eb1-91bead20b758";

    const { data: draft, error: insertError } = await supabase
      .from("content_drafts")
      .insert({
        user_id: userId,
        content_type: "blog_post",
        title: pkg.blog_title,
        slug,
        content: pkg.blog_content,
        excerpt: pkg.blog_excerpt,
        meta_description: pkg.blog_meta_description,
        seo_title: pkg.blog_seo_title,
        keywords: pkg.blog_keywords,
        twitter_caption: pkg.social_twitter,
        instagram_caption: pkg.social_linkedin, // repurpose field for LinkedIn
        hashtags: pkg.hashtags || [],
        internal_links: pkg.blog_internal_links || [],
        ai_model: "google/gemini-3-flash-preview",
        generation_prompt: `Weekly Marketing Agent: ${selected.topic}`,
        status: "published",
        published_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (insertError) throw new Error(`Blog insert failed: ${insertError.message}`);

    const blogUrl = `${siteUrl}/blog/${slug}`;
    console.log(`[Marketing Agent] Blog published: ${blogUrl}`);

    // ═══════════════════════════════════════════════════
    // STEP 4: Send email campaign to all contacts
    // ═══════════════════════════════════════════════════
    let emailSentCount = 0;

    if (RESEND_API_KEY) {
      // Gather all email addresses (deduplicated)
      const emailSet = new Set<string>();

      // From profiles
      const { data: profiles } = await supabase
        .from("profiles")
        .select("email")
        .not("email", "is", null);
      (profiles || []).forEach((p: any) => { if (p.email) emailSet.add(p.email.toLowerCase()); });

      // From lead segments
      const { data: leads } = await supabase
        .from("lead_segments")
        .select("email");
      (leads || []).forEach((l: any) => { if (l.email) emailSet.add(l.email.toLowerCase()); });

      // From coaching waitlist
      const { data: waitlist } = await supabase
        .from("coaching_waitlist")
        .select("email");
      (waitlist || []).forEach((w: any) => { if (w.email) emailSet.add(w.email.toLowerCase()); });

      // From founding members
      const { data: founders } = await supabase
        .from("founding_members")
        .select("email");
      (founders || []).forEach((f: any) => { if (f.email) emailSet.add(f.email.toLowerCase()); });

      const allEmails = Array.from(emailSet);
      console.log(`[Marketing Agent] Sending email to ${allEmails.length} contacts`);

      // Wrap AI-generated email body in branded template
      const fullEmailHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:24px;">
    <div style="background:linear-gradient(135deg,#1a1a2e,#16213e);padding:24px 28px;border-radius:12px 12px 0 0;text-align:center;">
      <h1 style="color:#ffffff;margin:0;font-size:22px;">Sacred Greeks Life</h1>
      <p style="color:#a5b4fc;margin:4px 0 0;font-size:13px;">Weekly Faith & Greek Life Insights</p>
    </div>
    <div style="background:#ffffff;padding:28px;border-radius:0 0 12px 12px;">
      ${pkg.email_body_html}
      <div style="text-align:center;margin:24px 0;">
        <a href="${blogUrl}" style="display:inline-block;background:#7c3aed;color:#ffffff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px;">
          Read the Full Article →
        </a>
      </div>
    </div>
    <div style="text-align:center;padding:16px;color:#999;font-size:11px;">
      <p>Sacred Greeks Life™ · Weekly Insights · <a href="${siteUrl}" style="color:#7c3aed;">sacredgreekslife.com</a></p>
      <p style="margin-top:4px;">You're receiving this because you're part of our community.</p>
    </div>
  </div>
</body>
</html>`;

      // Send in batches of 50 (Resend limit)
      const batchSize = 50;
      for (let i = 0; i < allEmails.length; i += batchSize) {
        const batch = allEmails.slice(i, i + batchSize);
        try {
          const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${RESEND_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: "Sacred Greeks <noreply@sacredgreekslife.com>",
              bcc: batch,
              subject: pkg.email_subject,
              html: fullEmailHtml,
              headers: {
                "X-Entity-Ref-ID": `marketing-${runId}`,
                "List-Unsubscribe": `<${siteUrl}/notification-preferences>`,
              },
            }),
          });
          const data = await res.json();
          if (res.ok) {
            emailSentCount += batch.length;
            console.log(`[Marketing Agent] Email batch sent: ${batch.length} recipients`);
          } else {
            console.error(`[Marketing Agent] Email batch error:`, data);
          }
        } catch (emailErr) {
          console.error(`[Marketing Agent] Email batch failed:`, emailErr);
        }
      }
    } else {
      console.warn("[Marketing Agent] RESEND_API_KEY not configured, skipping email");
    }

    // ═══════════════════════════════════════════════════
    // STEP 5: Update run record
    // ═══════════════════════════════════════════════════
    await updateRun({
      status: "completed",
      blog_draft_id: draft?.id,
      email_sent_count: emailSentCount,
      email_campaign_subject: pkg.email_subject,
      social_linkedin: pkg.social_linkedin,
      social_twitter: pkg.social_twitter,
      social_facebook: pkg.social_facebook,
      completed_at: new Date().toISOString(),
      run_metadata: {
        blog_url: blogUrl,
        slug,
        hashtags: pkg.hashtags,
        email_preview: pkg.email_preview,
        total_contacts: emailSentCount,
      },
    });

    // ═══════════════════════════════════════════════════
    // STEP 6: Notify admin
    // ═══════════════════════════════════════════════════
    if (RESEND_API_KEY && ADMIN_EMAIL) {
      const tweetText = encodeURIComponent(pkg.social_twitter);
      const linkedinText = encodeURIComponent(pkg.social_linkedin.substring(0, 200));
      const fbText = encodeURIComponent(pkg.social_facebook.substring(0, 200));

      const adminHtml = `
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;padding:24px;">
  <div style="background:linear-gradient(135deg,#059669,#10b981);padding:24px;border-radius:12px;color:white;margin-bottom:24px;">
    <h1 style="margin:0 0 8px;font-size:20px;">🤖 Weekly Marketing Agent — Complete</h1>
    <p style="margin:0;opacity:0.9;font-size:14px;">${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
  </div>

  <div style="background:#f0fdf4;padding:16px;border-radius:8px;border-left:4px solid #10b981;margin-bottom:20px;">
    <h3 style="margin:0 0 4px;font-size:15px;">📝 Blog Published</h3>
    <p style="margin:0;font-size:14px;font-weight:600;">${pkg.blog_title}</p>
    <p style="margin:4px 0 0;font-size:12px;color:#666;">${pkg.blog_excerpt}</p>
    <a href="${blogUrl}" style="display:inline-block;margin-top:8px;color:#059669;font-size:13px;">View article →</a>
  </div>

  <div style="background:#eff6ff;padding:16px;border-radius:8px;border-left:4px solid #3b82f6;margin-bottom:20px;">
    <h3 style="margin:0 0 4px;font-size:15px;">📧 Email Campaign Sent</h3>
    <p style="margin:0;font-size:13px;">Subject: <strong>${pkg.email_subject}</strong></p>
    <p style="margin:4px 0 0;font-size:13px;">Sent to <strong>${emailSentCount}</strong> contacts</p>
  </div>

  <div style="margin-bottom:20px;">
    <h3 style="font-size:15px;margin-bottom:12px;">🚀 Share Social Posts</h3>
    <table cellpadding="0" cellspacing="6" style="width:100%;"><tr>
      <td><a href="https://x.com/intent/tweet?text=${tweetText}" target="_blank" style="display:inline-block;background:#000;color:white;padding:10px 20px;border-radius:8px;text-decoration:none;font-weight:600;font-size:13px;">𝕏 Post to X</a></td>
      <td><a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(blogUrl)}" target="_blank" style="display:inline-block;background:#0a66c2;color:white;padding:10px 20px;border-radius:8px;text-decoration:none;font-weight:600;font-size:13px;">💼 LinkedIn</a></td>
      <td><a href="https://www.facebook.com/sharer/sharer.php?quote=${fbText}" target="_blank" style="display:inline-block;background:#1877F2;color:white;padding:10px 20px;border-radius:8px;text-decoration:none;font-weight:600;font-size:13px;">📘 Facebook</a></td>
    </tr></table>
  </div>

  <div style="background:#fefce8;padding:14px;border-radius:8px;border-left:4px solid #eab308;margin-bottom:20px;">
    <h4 style="margin:0 0 6px;font-size:13px;">💼 LinkedIn Post (copy & paste)</h4>
    <p style="margin:0;font-size:12px;color:#333;white-space:pre-wrap;">${pkg.social_linkedin}</p>
  </div>

  <div style="background:#fff7ed;padding:14px;border-radius:8px;border-left:4px solid #f97316;margin-bottom:20px;">
    <h4 style="margin:0 0 6px;font-size:13px;">📘 Facebook Post (copy & paste)</h4>
    <p style="margin:0;font-size:12px;color:#333;white-space:pre-wrap;">${pkg.social_facebook}</p>
  </div>

  <div style="text-align:center;margin-top:16px;">
    <a href="${siteUrl}/content-agent" style="display:inline-block;background:#7c3aed;color:white;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">✏️ View in Growth Agent Dashboard</a>
  </div>

  <p style="color:#999;font-size:11px;text-align:center;margin-top:16px;">Sacred Greeks Life™ · Weekly Marketing Agent</p>
</div>`;

      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Sacred Greeks Growth Agent <noreply@sacredgreekslife.com>",
            to: [ADMIN_EMAIL],
            subject: `🤖 Weekly Marketing Complete: ${pkg.blog_title}`,
            html: adminHtml,
          }),
        });
        console.log("[Marketing Agent] Admin notification sent");
      } catch (e) {
        console.error("[Marketing Agent] Admin notification failed:", e);
      }
    }

    return new Response(JSON.stringify({
      success: true,
      run_id: runId,
      blog_url: blogUrl,
      email_sent: emailSentCount,
      topic: selected.topic,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (e) {
    const errorMsg = e instanceof Error ? e.message : "Unknown error";
    console.error("[Marketing Agent] Error:", errorMsg);
    await updateRun({
      status: "failed",
      error_message: errorMsg,
      completed_at: new Date().toISOString(),
    });
    return new Response(JSON.stringify({ error: errorMsg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
