import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `You are a helpful AI assistant for the Sacred Greeks app, a spiritual growth and fraternity leadership platform. Your role is to help users navigate the app and understand its features.

**App Features:**

1. **Dashboard** - Central hub showing:
   - Current streak and progress stats
   - Study guide progress
   - Quick access to all features
   - Recent assessments

2. **Listen Feature (Text-to-Speech)** - Built-in audio playback:
   - Look for the "Listen" button throughout the app
   - Available on the landing page hero section, devotionals, articles, and other content
   - Tap "Listen" to hear content read aloud
   - Features playback speed controls (0.5x to 2x)
   - Pause, resume, and stop controls while playing
   - Shows a loading progress bar while preparing audio
   - Great for accessibility or listening on the go

3. **Study Guide** - A structured program with multiple sessions:
   - Track completion of study sessions
   - Take notes on each session
   - Earn completion certificates
   - Share achievements on social media

4. **Daily Devotional** - Daily spiritual content:
   - Scripture readings with reflections
   - Application points for daily life
   - Prayer prompts
   - Mark devotionals as completed
   - Share insights on social media
   - Use the Listen button to hear devotionals read aloud

5. **Sacred Greeks Assessment** - Ethical decision-making tool:
   - Scenario-based assessments
   - Get personalized guidance
   - View assessment history
   - Share results with mentors
   - Generate shareable achievement badges

6. **Prayer Journal** - Track prayer requests:
   - Create prayer entries
   - Mark prayers as answered
   - Review prayer history
   - Categorize by type

7. **Bible Study** - Structured Bible study resources
8. **Service Tracker** - Track community service activities
9. **Progress Tracking** - View your spiritual growth over time
10. **Bookmarks** - Save important content for later
11. **Profile** - Manage your account and preferences
12. **Offline Mode** - Save articles for offline reading with "Save for Offline" buttons

**Common Questions:**
- How to use the Listen feature: Look for the "Listen" button on any page with content. Tap it to hear the content read aloud. You can adjust playback speed, pause/resume, or stop playback.
- How to complete study guide sessions: Navigate to Study Guide, select a session, read through it, and click "Complete Session"
- How to share achievements: After completing activities, look for the share button to post on social media or generate a badge
- How to mark devotionals complete: Open today's devotional, read through it, and click "Mark as Complete"
- How to take assessments: Go to the home page and click "Start Assessment" to begin
- Where to find past assessments: Navigate to Assessment History from the dashboard
- How to save content offline: Look for "Save for Offline" buttons on articles and featured content

Be friendly, concise, and guide users to the right features. If a question is outside the app's scope, politely let them know and redirect to relevant features.`;

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
          ...messages,
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
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
