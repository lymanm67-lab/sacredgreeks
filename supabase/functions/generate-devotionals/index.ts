import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const PROOF_FOCUSES = [
  "Pressure",
  "Relationships", 
  "Obscurity",
  "Opportunity",
  "Freedom",
  "Integrity",
  "Purity",
  "Community",
  "Surrender",
  "Perseverance",
  "Courage",
  "Stewardship",
  "Identity",
  "Purpose",
  "Grace"
];

const THEMES = [
  "Standing firm under peer pressure",
  "Building authentic brotherhood/sisterhood",
  "Being salt and light in Greek life",
  "Using your influence for God's kingdom",
  "Finding freedom from conformity",
  "Living with integrity when no one watches",
  "Guarding your heart and mind",
  "Iron sharpening iron in community",
  "Surrendering ambitions to God",
  "Running the race with endurance",
  "Speaking truth in love",
  "Stewarding time and resources",
  "Finding identity in Christ not letters",
  "Discovering God's purpose for your chapter",
  "Extending grace to struggling brothers/sisters"
];

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { startDate, daysToGenerate = 30 } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const start = startDate ? new Date(startDate) : new Date();
    const generatedDevotionals: string[] = [];
    const errors: { date: string; error: string }[] = [];

    // Generate devotionals in batches to avoid rate limits
    const batchSize = 5;
    const totalBatches = Math.ceil(daysToGenerate / batchSize);

    for (let batch = 0; batch < totalBatches; batch++) {
      const batchPromises = [];
      
      for (let i = 0; i < batchSize && (batch * batchSize + i) < daysToGenerate; i++) {
        const dayOffset = batch * batchSize + i;
        const targetDate = new Date(start);
        targetDate.setDate(targetDate.getDate() + dayOffset);
        const dateStr = targetDate.toISOString().split("T")[0];
        
        // Check if devotional already exists for this date
        const { data: existing } = await supabase
          .from("daily_devotionals")
          .select("id")
          .eq("date", dateStr)
          .maybeSingle();

        if (existing) {
          console.log(`Devotional already exists for ${dateStr}, skipping`);
          continue;
        }

        const proofFocus = PROOF_FOCUSES[dayOffset % PROOF_FOCUSES.length];
        const theme = THEMES[dayOffset % THEMES.length];

        batchPromises.push(
          generateSingleDevotional(LOVABLE_API_KEY, dateStr, proofFocus, theme)
            .then(async (devotional) => {
              if (devotional) {
                const { error } = await supabase
                  .from("daily_devotionals")
                  .insert(devotional);
                
                if (error) {
                  console.error(`Failed to insert devotional for ${dateStr}:`, error);
                  errors.push({ date: dateStr, error: error.message });
                } else {
                  generatedDevotionals.push(dateStr);
                }
              }
            })
            .catch((err) => {
              console.error(`Error generating devotional for ${dateStr}:`, err);
              errors.push({ date: dateStr, error: err.message });
            })
        );
      }

      await Promise.all(batchPromises);
      
      // Small delay between batches to avoid rate limits
      if (batch < totalBatches - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        generated: generatedDevotionals.length,
        dates: generatedDevotionals,
        errors: errors.length > 0 ? errors : undefined
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error: unknown) {
    console.error("Error generating devotionals:", error);
    
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    
    if (errorMessage.includes("429") || errorMessage.includes("rate limit")) {
      return new Response(
        JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    if (errorMessage.includes("402")) {
      return new Response(
        JSON.stringify({ error: "Payment required. Please add credits to your workspace." }),
        { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ error: errorMessage || "Failed to generate devotionals" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

async function generateSingleDevotional(
  apiKey: string,
  date: string,
  proofFocus: string,
  theme: string
) {
  const prompt = `Generate a daily devotional for Christian college students in Greek life (fraternities/sororities). 

Date: ${date}
P.R.O.O.F. Focus: ${proofFocus}
Theme: ${theme}

Create a devotional with these exact fields (respond in JSON format):
{
  "title": "A compelling title (3-6 words)",
  "scripture_ref": "Bible verse reference (e.g., Romans 12:2)",
  "scripture_text": "The full scripture text",
  "reflection": "A 3-4 sentence reflection connecting the scripture to Greek life experiences. Be specific about fraternity/sorority scenarios.",
  "proof_focus": "${proofFocus}",
  "application": "A practical 2-3 sentence challenge for the reader to apply today in their Greek life context.",
  "prayer": "A 2-3 sentence prayer related to the theme. Start with addressing God and end with Amen."
}

Make it relevant to college students navigating faith in Greek organizations. Be authentic, not preachy. Use modern language.`;

  const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      messages: [
        {
          role: "system",
          content: "You are a Christian devotional writer who creates content for college students in Greek life. You understand fraternity and sorority culture and help students integrate their faith authentically. Always respond with valid JSON only, no markdown."
        },
        { role: "user", content: prompt }
      ],
      temperature: 0.8,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("AI API error:", response.status, errorText);
    throw new Error(`AI API error: ${response.status}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("No content in AI response");
  }

  // Parse the JSON response
  try {
    // Remove potential markdown code blocks
    const cleanContent = content
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();
    
    const devotional = JSON.parse(cleanContent);
    
    return {
      date,
      title: devotional.title,
      scripture_ref: devotional.scripture_ref,
      scripture_text: devotional.scripture_text,
      reflection: devotional.reflection,
      proof_focus: devotional.proof_focus || proofFocus,
      application: devotional.application,
      prayer: devotional.prayer,
    };
  } catch (parseError) {
    console.error("Failed to parse AI response:", content);
    throw new Error("Failed to parse devotional content");
  }
}
