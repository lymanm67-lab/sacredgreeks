import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { encode as base64Encode } from "https://deno.land/std@0.168.0/encoding/base64.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const MAX_CHUNK_LENGTH = 4500; // Leave room for safety margin
const MAX_TOTAL_LENGTH = 50000; // Maximum total text length

// ElevenLabs voice IDs - using diverse voices for dynamic narration
const ELEVENLABS_VOICES: Record<string, string> = {
  // Standard voices
  alloy: "iP95p4xoKVk53GoZ742B", // Chris - clear American male
  echo: "TX3LPaxmHKxFdv7VOQHJ", // Liam - confident American male
  fable: "nPczCjzI2devNBz1zQrb", // Brian - deep American male
  nova: "cjVigY5qzO86Huf0OWal", // Eric - friendly American male
  onyx: "iP95p4xoKVk53GoZ742B", // Chris - clear American male (default)
  shimmer: "onwK4e9ZLuTAKqWW03F9", // Daniel - authoritative American male
  // Dramatic voices for special content
  dramatic: "JBFqnCBsd6RMkjVDRZzb", // George - deep, dramatic narration
  storyteller: "SAz9YHcvj6GT2YYXdXww", // River - engaging storyteller
  ancient: "N2lVS1w4EtoT3dr4eOWO", // Callum - authoritative ancient history
  // African-American inspired voices for audiobook chapters
  narrator1: "cjVigY5qzO86Huf0OWal", // Eric - warm, engaging male narrator
  narrator2: "JBFqnCBsd6RMkjVDRZzb", // George - deep, authoritative narrator
  narrator3: "bIHbv24MWmeRgasZH58o", // Will - friendly, conversational
  narrator4: "nPczCjzI2devNBz1zQrb", // Brian - deep, resonant
  narrator5: "onwK4e9ZLuTAKqWW03F9", // Daniel - powerful, commanding
  // Female voices
  jessica: "cgSgspJ2msm6clMCkdW9", // Jessica - warm, expressive female
  sarah: "EXAVITQu4vr4xnSDxMaL", // Sarah - clear, professional female
  laura: "FGY2WhTYpPnrIDTdsKH5", // Laura - confident, articulate female
  alice: "Xb7hH8MSUJpSbSDYk0k2", // Alice - friendly female
  matilda: "XrExE9yKIg1WjnnlVkGX", // Matilda - warm, nurturing female
  lily: "pFZP5JQG7iQjIQuC4Bku", // Lily - youthful, energetic female
  // African-American female voices
  nicole: "piTKgcLEGmPE4e6mEKli", // Nicole - warm, rich African-American female
  aria: "9BWtsMINqrJLrRacOk9x", // Aria - confident, engaging African-American female
  // African-American male voices
  marcus: "bIHbv24MWmeRgasZH58o", // Will - warm, engaging African-American male
  darnell: "nPczCjzI2devNBz1zQrb", // Brian - deep, resonant African-American male
};

// Split text into chunks at natural boundaries (sentences/paragraphs)
function splitTextIntoChunks(text: string, maxLength: number): string[] {
  const chunks: string[] = [];
  let remaining = text.trim();

  while (remaining.length > 0) {
    if (remaining.length <= maxLength) {
      chunks.push(remaining);
      break;
    }

    // Find a good break point (paragraph, sentence, or word boundary)
    let breakPoint = -1;

    // Try paragraph break first
    const paragraphBreak = remaining.lastIndexOf("\n\n", maxLength);
    if (paragraphBreak > maxLength * 0.5) {
      breakPoint = paragraphBreak + 2;
    }

    // Try sentence break if no paragraph break found
    if (breakPoint === -1) {
      const sentenceEndings = [". ", "! ", "? ", ".\n", "!\n", "?\n"];
      for (const ending of sentenceEndings) {
        const idx = remaining.lastIndexOf(ending, maxLength);
        if (idx > maxLength * 0.5 && idx > breakPoint) {
          breakPoint = idx + ending.length;
        }
      }
    }

    // Fall back to word boundary
    if (breakPoint === -1) {
      const spaceBreak = remaining.lastIndexOf(" ", maxLength);
      if (spaceBreak > maxLength * 0.5) {
        breakPoint = spaceBreak + 1;
      } else {
        // Last resort: hard break at maxLength
        breakPoint = maxLength;
      }
    }

    chunks.push(remaining.substring(0, breakPoint).trim());
    remaining = remaining.substring(breakPoint).trim();
  }

  return chunks;
}

// Generate speech for a single chunk with optional context for stitching
async function generateChunkAudio(
  text: string,
  voiceId: string,
  voice: string,
  apiKey: string,
  previousText?: string,
  nextText?: string
): Promise<ArrayBuffer> {
  const body: Record<string, unknown> = {
    text,
    model_id: "eleven_turbo_v2_5", // Use turbo for faster multi-chunk processing
    voice_settings: {
      stability: voice === "dramatic" || voice === "ancient" ? 0.4 : 0.5,
      similarity_boost: 0.75,
      style: voice === "dramatic" || voice === "ancient" ? 0.7 : 0.5,
      use_speaker_boost: true,
      speed: voice === "dramatic" || voice === "ancient" ? 0.9 : 1.0,
    },
  };

  // Add stitching context if provided (last ~2-3 sentences)
  if (previousText) {
    const sentences = previousText.split(/[.!?]+/).filter(s => s.trim());
    body.previous_text = sentences.slice(-3).join(". ").trim();
  }
  if (nextText) {
    const sentences = nextText.split(/[.!?]+/).filter(s => s.trim());
    body.next_text = sentences.slice(0, 3).join(". ").trim();
  }

  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`,
    {
      method: "POST",
      headers: {
        "xi-api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`ElevenLabs API error: ${response.status} - ${errorText}`);
  }

  return response.arrayBuffer();
}

// Concatenate MP3 audio buffers into a single ArrayBuffer
function concatenateAudioBuffers(buffers: ArrayBuffer[]): ArrayBuffer {
  const totalLength = buffers.reduce((sum, buf) => sum + buf.byteLength, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;

  for (const buffer of buffers) {
    result.set(new Uint8Array(buffer), offset);
    offset += buffer.byteLength;
  }

  return result.buffer as ArrayBuffer;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Authentication check
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { global: { headers: { Authorization: req.headers.get("Authorization")! } } }
    );

    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
    if (authError || !user) {
      console.error("Authentication failed:", authError?.message);
      return new Response(
        JSON.stringify({ error: "Unauthorized - please log in to use text-to-speech" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { text, voice = "onyx" } = await req.json();

    // Input validation
    if (!text || typeof text !== "string") {
      return new Response(
        JSON.stringify({ error: "Text is required and must be a string" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (text.length > MAX_TOTAL_LENGTH) {
      return new Response(
        JSON.stringify({ error: `Text must be ${MAX_TOTAL_LENGTH} characters or less. Current length: ${text.length}` }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const ELEVENLABS_API_KEY = Deno.env.get("ELEVENLABS_API_KEY");
    if (!ELEVENLABS_API_KEY) {
      throw new Error("ElevenLabs API key not configured");
    }

    // Get the ElevenLabs voice ID (use mapping or default to onyx)
    const voiceId = ELEVENLABS_VOICES[voice] || ELEVENLABS_VOICES.onyx;

    console.log(`User ${user.email} generating speech for text length: ${text.length}, voice: ${voice}`);

    // Split text into chunks if needed
    const chunks = splitTextIntoChunks(text, MAX_CHUNK_LENGTH);
    console.log(`Split into ${chunks.length} chunk(s)`);

    let finalAudioBuffer: ArrayBuffer;

    if (chunks.length === 1) {
      // Single chunk - simple request
      finalAudioBuffer = await generateChunkAudio(chunks[0], voiceId, voice, ELEVENLABS_API_KEY);
    } else {
      // Multiple chunks - use request stitching for natural flow
      const audioBuffers: ArrayBuffer[] = [];

      for (let i = 0; i < chunks.length; i++) {
        const previousText = i > 0 ? chunks[i - 1] : undefined;
        const nextText = i < chunks.length - 1 ? chunks[i + 1] : undefined;

        console.log(`Processing chunk ${i + 1}/${chunks.length} (${chunks[i].length} chars)`);

        const buffer = await generateChunkAudio(
          chunks[i],
          voiceId,
          voice,
          ELEVENLABS_API_KEY,
          previousText,
          nextText
        );

        audioBuffers.push(buffer);
      }

      // Concatenate all audio buffers
      finalAudioBuffer = concatenateAudioBuffers(audioBuffers);
    }

    const base64Audio = base64Encode(finalAudioBuffer);

    console.log(`Successfully generated ${Math.round(finalAudioBuffer.byteLength / 1024)}KB audio from ${chunks.length} chunk(s)`);

    return new Response(JSON.stringify({ audioContent: base64Audio }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Text-to-speech error:", error);

    const message = error instanceof Error ? error.message : "Unknown error";

    // Avoid returning 500 for expected upstream conditions (prevents app-level crash overlays).
    // ElevenLabs quota errors sometimes come back as 401 with a payload containing status=quota_exceeded.
    if (message.includes("quota_exceeded")) {
      return new Response(
        JSON.stringify({
          error: message,
          code: "quota_exceeded",
        }),
        { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    if (message.includes("429")) {
      return new Response(
        JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    return new Response(
      JSON.stringify({
        error: message,
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
