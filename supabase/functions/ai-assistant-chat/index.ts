import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { checkRateLimit, getClientIdentifier, rateLimitResponse } from "../_shared/rate-limiter.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// SECURITY: Input validation limits
const MAX_MESSAGES = 50;
const MAX_MESSAGE_LENGTH = 10000;
const MAX_TOTAL_LENGTH = 100000;
const VALID_ROLES = ["user", "assistant", "system"] as const;

interface ChatMessage {
  role: typeof VALID_ROLES[number];
  content: string;
}

function validateMessages(messages: unknown): { valid: boolean; error?: string; messages?: ChatMessage[] } {
  if (!Array.isArray(messages)) {
    return { valid: false, error: "Messages must be an array" };
  }

  if (messages.length === 0) {
    return { valid: false, error: "Messages array cannot be empty" };
  }

  if (messages.length > MAX_MESSAGES) {
    return { valid: false, error: `Maximum ${MAX_MESSAGES} messages allowed` };
  }

  let totalLength = 0;
  const validatedMessages: ChatMessage[] = [];

  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i];
    
    if (!msg || typeof msg !== "object") {
      return { valid: false, error: `Invalid message at index ${i}` };
    }

    if (!msg.role || typeof msg.role !== "string") {
      return { valid: false, error: `Invalid role at index ${i}` };
    }

    if (!VALID_ROLES.includes(msg.role as typeof VALID_ROLES[number])) {
      return { valid: false, error: `Invalid role "${msg.role}" at index ${i}` };
    }

    if (!msg.content || typeof msg.content !== "string") {
      return { valid: false, error: `Invalid content at index ${i}` };
    }

    if (msg.content.length > MAX_MESSAGE_LENGTH) {
      return { valid: false, error: `Message at index ${i} exceeds ${MAX_MESSAGE_LENGTH} character limit` };
    }

    totalLength += msg.content.length;
    
    validatedMessages.push({
      role: msg.role as typeof VALID_ROLES[number],
      content: msg.content,
    });
  }

  if (totalLength > MAX_TOTAL_LENGTH) {
    return { valid: false, error: `Total message length exceeds ${MAX_TOTAL_LENGTH} characters` };
  }

  return { valid: true, messages: validatedMessages };
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    // SECURITY: Rate limiting
    const clientId = getClientIdentifier(req);
    const rateLimitResult = checkRateLimit(clientId, 'ai_chat');
    
    if (!rateLimitResult.allowed) {
      console.log(`Rate limit exceeded for client: ${clientId}`);
      return rateLimitResponse(corsHeaders, rateLimitResult.resetIn, 
        'Too many AI chat requests. Please wait a moment before trying again.');
    }

    const body = await req.json();
    const { messages } = body;

    // SECURITY: Validate input
    const validation = validateMessages(messages);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({ error: validation.error }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `You are a helpful AI assistant for Sacred Greeks Life, a faith-based app helping Christians navigate Greek life. Created by Dr. Lyman Montgomery, author of "Sacred, Not Sinful: A Christian's Guide to Navigating Greek Life".

**ABOUT THE APP:**
Sacred Greeks Life helps Christians in Greek life (fraternities/sororities) navigate the tension between faith and membership using the P.R.O.O.F. framework. Free to use, works offline as a PWA.

**P.R.O.O.F. FRAMEWORK:**
A biblical approach to evaluating Greek life membership:
- P: Purpose - What is the organization's purpose?
- R: Rituals - What rituals are involved?
- O: Obligations - What commitments are required?
- O: Outcomes - What are the spiritual outcomes?
- F: Fellowship - How does it affect Christian fellowship?

**APP FEATURES:**
- **Dashboard** (/dashboard): Central hub with streak stats, verse of the day, study progress, quick check-in
- **Daily Devotional** (/devotional): Scripture readings with P.R.O.O.F. reflections, text-to-speech
- **Study Guide** (/study): 5-session structured program with certificates and social sharing
- **5 Persona Assessment** (home page): Ethical decision-making tool with personalized guidance
- **Prayer Journal** (/prayer-journal): Personal prayer tracking with voice input
- **Prayer Wall** (/prayer-wall): Community prayer requests with privacy controls
- **Prayer Guide** (/prayer-guide): Guided prayer with templates, ambient sounds, pray-along
- **Bible Study** (/bible-study): AI-powered verse search, saved searches, bookmarks
- **Service Tracker** (/service-tracker): Community service logging with hours tracking
- **Progress** (/progress): Devotional stats, journal entries, streaks, milestones
- **Achievements** (/achievements): Badges, leveling up, social sharing
- **Bookmarks** (/bookmarks): Save articles, verses, resources with notes
- **Resources Hub** (/resources): Articles, documentary "Unmasking Hope", PDFs
- **Article Library** (/articles): Featured articles with text-to-speech, offline reading
- **Podcast** (/podcast): Sacred Greeks podcast episodes
- **BGLO Objection Guide** (/guide): Biblical responses to common objections
- **Offline Mode** (/offline-settings): Save content for offline, manage storage
- **Listen Feature**: Text-to-speech throughout app with speed controls (0.5x-2x)
- **AI Assistant** (this chat): Help on every page via chat icon

**COMMON QUESTIONS:**
- "How do I listen to content?" → Look for Listen button on any page with text content
- "How to complete study sessions?" → Go to Study Guide, select session, read it, click "Complete Session"
- "How to mark devotionals complete?" → Open today's devotional, read through, click "Mark as Complete"
- "How to take assessments?" → On home page, click the "5 Persona Assessment" card
- "Where are past assessments?" → Navigate to Assessment History from dashboard
- "How to save content offline?" → Look for "Save for Offline" buttons on articles
- "How to use prayer guide?" → Go to Prayer Guide for templates and ambient sounds
- "What is P.R.O.O.F.?" → Purpose, Rituals, Obligations, Outcomes, Fellowship - core framework from Sacred, Not Sinful
- "How to install on phone?" → Use "Add to Home Screen" in browser, works like native app
- "Is it for Divine Nine?" → Yes! Designed for BGLO members with specific Objection Guide

**TARGET AUDIENCE:**
- Christians in fraternities/sororities
- Divine Nine (BGLO) members
- Greek life alumni
- Students considering Greek life
- Campus ministers and faith leaders

Be friendly, helpful, and guide users to the right features. Always mention the P.R.O.O.F. framework when discussing faith and Greek life decisions. If asked about something outside the app, politely redirect to relevant features.`;

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
          ...(validation.messages || []),
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required, please add funds to your workspace." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(JSON.stringify({ error: "An error occurred while processing your request" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
