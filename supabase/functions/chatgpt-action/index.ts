import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Centralized app knowledge - keep in sync with src/data/appKnowledge.ts
const APP_INFO = {
  name: "Sacred Greeks Life",
  tagline: "Your daily companion for navigating faith and Greek life",
  description: "A faith-based app designed to help Christians in Greek life navigate the tension between their faith and fraternity or sorority membership using the P.R.O.O.F. framework.",
  author: "Dr. Lyman Montgomery",
  book: "Sacred, Not Sinful: A Christian's Guide to Navigating Greek Life",
  website: "https://sacredgreekslife.com",
  documentary: "Unmasking Hope",
};

const PROOF_FRAMEWORK = {
  name: "P.R.O.O.F. Framework",
  description: "A biblical approach to evaluating Greek life membership while maintaining Christian faith.",
  components: [
    { letter: "P", name: "Purpose", description: "What is the organization's purpose?" },
    { letter: "R", name: "Rituals", description: "What rituals are involved?" },
    { letter: "O", name: "Obligations", description: "What commitments are required?" },
    { letter: "O", name: "Outcomes", description: "What are the spiritual outcomes?" },
    { letter: "F", name: "Fellowship", description: "How does it affect Christian fellowship?" },
  ],
};

const FEATURES = [
  { name: "Daily Devotional", path: "/devotional", description: "Scripture readings with P.R.O.O.F. framework reflections" },
  { name: "Study Guide", path: "/study", description: "5-session structured program with certificates" },
  { name: "5 Persona Assessment", path: "/", description: "Ethical decision-making tool with personalized guidance" },
  { name: "Prayer Journal", path: "/prayer-journal", description: "Personal prayer tracking with voice input" },
  { name: "Prayer Wall", path: "/prayer-wall", description: "Community prayer requests and support" },
  { name: "Bible Study", path: "/bible-study", description: "AI-powered verse search and study tools" },
  { name: "BGLO Objection Guide", path: "/guide", description: "Biblical responses to common objections" },
  { name: "Resources Hub", path: "/resources", description: "Articles, documentary, and PDF downloads" },
];

const FAQ = [
  { q: "What is Sacred Greeks Life?", a: "A free faith-based app helping Christians navigate Greek life using the P.R.O.O.F. framework, created by Dr. Lyman Montgomery." },
  { q: "Is it free?", a: "Yes, completely free with no credit card required." },
  { q: "What is P.R.O.O.F.?", a: "Purpose, Rituals, Obligations, Outcomes, Fellowship - a biblical framework for evaluating Greek life membership." },
  { q: "Can I use it offline?", a: "Yes, it's a PWA that works offline and can be installed on your phone." },
  { q: "Who is it for?", a: "Christians in fraternities/sororities, Divine Nine members, alumni, students considering Greek life, and campus ministers." },
];

serve(async (req) => {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const path = url.pathname.split("/").pop();

    // Endpoint: Get app info
    if (path === "info" || req.method === "GET") {
      return new Response(
        JSON.stringify({
          app: APP_INFO,
          proof_framework: PROOF_FRAMEWORK,
          features: FEATURES.map((f) => ({
            name: f.name,
            url: `${APP_INFO.website}${f.path}`,
            description: f.description,
          })),
          faq: FAQ,
          target_audience: [
            "Christians in fraternities and sororities",
            "Divine Nine (BGLO) organization members",
            "Greek life alumni",
            "Students considering Greek life",
            "Campus ministers and faith leaders",
          ],
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Endpoint: Ask a question
    if (path === "ask" && req.method === "POST") {
      const { question } = await req.json();

      if (!question) {
        return new Response(
          JSON.stringify({ error: "Question is required" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
      if (!LOVABLE_API_KEY) {
        throw new Error("LOVABLE_API_KEY not configured");
      }

      const systemPrompt = `You are an expert on Sacred Greeks Life, a faith-based app by Dr. Lyman Montgomery. Answer questions concisely and helpfully.

APP INFO:
- ${APP_INFO.name}: ${APP_INFO.description}
- Website: ${APP_INFO.website}
- Author: ${APP_INFO.author}, "${APP_INFO.book}"
- Documentary: ${APP_INFO.documentary}
- Free to use, works offline as PWA

P.R.O.O.F. FRAMEWORK:
${PROOF_FRAMEWORK.components.map((c) => `${c.letter} = ${c.name}: ${c.description}`).join("\n")}

KEY FEATURES:
${FEATURES.map((f) => `- ${f.name} (${APP_INFO.website}${f.path}): ${f.description}`).join("\n")}

Always include relevant links to ${APP_INFO.website} when appropriate. Be helpful and direct users to specific features.`;

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
            { role: "user", content: question },
          ],
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("AI error:", response.status, errorText);
        return new Response(
          JSON.stringify({ error: "Failed to process question" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const data = await response.json();
      const answer = data.choices?.[0]?.message?.content || "Unable to generate response";

      return new Response(
        JSON.stringify({
          question,
          answer,
          app_website: APP_INFO.website,
          related_features: FEATURES.slice(0, 3).map((f) => ({
            name: f.name,
            url: `${APP_INFO.website}${f.path}`,
          })),
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Default: return API docs
    return new Response(
      JSON.stringify({
        name: "Sacred Greeks Life API",
        description: "ChatGPT GPT Action API for Sacred Greeks Life app",
        endpoints: [
          {
            path: "/chatgpt-action/info",
            method: "GET",
            description: "Get complete app information, features, and FAQ",
          },
          {
            path: "/chatgpt-action/ask",
            method: "POST",
            description: "Ask a question about Sacred Greeks Life",
            body: { question: "string (required)" },
          },
        ],
        website: APP_INFO.website,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
