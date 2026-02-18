import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

interface VideoStudioRequest {
  action: 'generate_script' | 'submit_video' | 'check_status' | 'upload_video' | 'generate_image';
  templateType?: string;
  contentIds?: string[];
  videoRequestId?: string;
  jobId?: string;
  provider?: 'invideo';
  customPrompt?: string;
  isCustomContent?: boolean;
  parentRequestId?: string;
  generationMode?: 'text_to_video' | 'image_to_video' | 'video_upload';
  inputImageUrl?: string;
  videoUrl?: string;
  title?: string;
  description?: string;
  outputDimensions?: string;
  imagePrompt?: string;
  imageModel?: 'fast' | 'quality';
  imageEditSource?: string;
}

const TEMPLATE_CONFIGS: Record<string, { durationRange: string; format: string; description: string }> = {
  objection_short: {
    durationRange: '30-60 seconds',
    format: '9:16 vertical short',
    description: 'PROOF Objection Short — a quick, punchy response to a common claim'
  },
  mini_teaching: {
    durationRange: '2-3 minutes',
    format: '9:16 vertical or 16:9 horizontal',
    description: 'PROOF Mini Teaching — a deeper exploration of a PROOF topic'
  },
  conversation_prep: {
    durationRange: '45-75 seconds',
    format: '9:16 vertical short',
    description: 'Conversation Prep Script — rehearsal-ready script for a real conversation'
  },
  weekly_devotional: {
    durationRange: '60 seconds',
    format: '9:16 vertical short',
    description: 'Weekly Devotional Video — scripture-grounded encouragement'
  },
  custom: {
    durationRange: '30-180 seconds',
    format: '9:16 vertical or 16:9 horizontal',
    description: 'Custom Video — create any content video from your own prompt'
  },
};

// ===== CHECK ADMIN ROLE =====
async function isAdmin(supabase: any, userId: string): Promise<boolean> {
  const { data } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', userId)
    .eq('role', 'admin')
    .maybeSingle();
  return !!data;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  try {
    const body = await req.json() as VideoStudioRequest;
    const { action, templateType, contentIds, videoRequestId, customPrompt, isCustomContent, parentRequestId, generationMode, inputImageUrl, videoUrl: uploadVideoUrl, title: uploadTitle, description: uploadDescription, imagePrompt, imageModel, imageEditSource } = body;

    // Get user
    const authHeader = req.headers.get('Authorization');
    let userId: string | null = null;
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      const anonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
      const userClient = createClient(supabaseUrl, anonKey);
      const { data: { user } } = await userClient.auth.getUser(token);
      userId = user?.id || null;
    }

    if (!userId) {
      return new Response(JSON.stringify({ error: 'Authentication required' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // ========== ACTION: GENERATE SCRIPT ==========
    if (action === 'generate_script') {
      const useCustom = isCustomContent === true;

      if (useCustom) {
        const admin = await isAdmin(supabase, userId);
        if (!admin) {
          return new Response(JSON.stringify({ error: 'Admin access required for custom content' }), {
            status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }
      }

      const tplType = templateType || 'custom';
      const config = TEMPLATE_CONFIGS[tplType] || TEMPLATE_CONFIGS['custom'];

      let contentContext = '';
      let allContent: any[] = [];

      if (!useCustom && contentIds?.length) {
        const { data: sources } = await supabase
          .from('golden_library_sources')
          .select('*')
          .in('id', contentIds)
          .eq('is_active', true);

        const { data: cards } = await supabase
          .from('objection_cards')
          .select('*')
          .in('id', contentIds)
          .eq('is_active', true);

        allContent = [...(sources || []), ...(cards || [])];

        if (allContent.length === 0) {
          return new Response(JSON.stringify({
            error: 'No approved content found for the selected IDs. Video generation blocked.',
            blocked: true
          }), {
            status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        (sources || []).forEach((s: any, i: number) => {
          contentContext += `\n[Source ${i + 1}] "${s.title}" (Tier ${s.tier})\n${s.summary || s.content.slice(0, 600)}\nCitation: ${s.citation_ref || 'N/A'}\n`;
        });
        (cards || []).forEach((c: any, i: number) => {
          contentContext += `\n[Objection Card ${i + 1}] Category: ${c.claim_category}\nClaim: ${c.claim_text}\n60s Response: ${c.sixty_second_response}\n5min Response: ${c.five_minute_response}\nScripture: ${JSON.stringify(c.scripture_refs)}\n`;
        });
      }

      const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
      if (!LOVABLE_API_KEY) {
        return new Response(JSON.stringify({ error: 'AI service not configured' }), {
          status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      let systemPrompt: string;
      let userPrompt: string;

      if (useCustom && customPrompt) {
        systemPrompt = `You are a Sacred Greeks Video Script Writer. You create professional video scripts.

OUTPUT FORMAT: Respond in valid JSON:
{
  "title": "Video title",
  "description": "Short description for video listing",
  "script": [
    { "timestamp": "0:00-0:05", "narration": "Text to speak", "visual": "Visual description", "sourceRef": null }
  ],
  "scenePlan": [
    { "sceneNumber": 1, "duration": "5s", "visual": "Description", "textOverlay": "Optional text" }
  ],
  "captions": "Full SRT-format captions text",
  "transcript": "Full plain text transcript",
  "tags": ["tag1", "tag2"],
  "thumbnailPrompt": "A prompt for generating the thumbnail image",
  "citationsUsed": [],
  "missingCitations": []
}`;
        userPrompt = `Create a ${config.description} video script.
Duration: ${config.durationRange}
Format: ${config.format}

USER PROMPT:
${customPrompt}

Generate the complete script with scene plan, captions, and metadata.`;
      } else {
        systemPrompt = `You are a Sacred Greeks Video Script Writer. You create scripts for PROOF framework videos.

RULES:
1. ONLY use content from the provided approved sources. Do not invent scripture, history, or theology.
2. Every claim must be traceable to a provided source.
3. Maintain a respectful, encouraging tone. No mocking or sensationalism.
4. Include natural pause markers [PAUSE] for scene transitions.
5. Include visual direction notes in [VISUAL: description] tags.
6. If you cannot support a claim from the provided sources, mark it as [NEEDS_SOURCE: claim] and it will be blocked.

OUTPUT FORMAT: Respond in valid JSON:
{
  "title": "Video title",
  "description": "Short description for video listing",
  "script": [
    { "timestamp": "0:00-0:05", "narration": "Text to speak", "visual": "Visual description", "sourceRef": "Source title or null" }
  ],
  "scenePlan": [
    { "sceneNumber": 1, "duration": "5s", "visual": "Description", "textOverlay": "Optional text" }
  ],
  "captions": "Full SRT-format captions text",
  "transcript": "Full plain text transcript",
  "tags": ["tag1", "tag2"],
  "thumbnailPrompt": "A prompt for generating the thumbnail image",
  "citationsUsed": ["Source title 1", "Source title 2"],
  "missingCitations": ["Any claims that could not be sourced"]
}`;
        userPrompt = `Create a ${config.description} video script.
Duration: ${config.durationRange}
Format: ${config.format}

APPROVED CONTENT TO USE:
${contentContext}

Generate the complete script with scene plan, captions, and metadata.`;
      }

      const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
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
          temperature: 0.3,
          max_tokens: 6000,
        }),
      });

      if (!aiResponse.ok) {
        const errText = await aiResponse.text();
        console.error('AI gateway error:', aiResponse.status, errText);
        if (aiResponse.status === 429) {
          return new Response(JSON.stringify({ error: 'Rate limit exceeded. Please try again shortly.' }), {
            status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }
        if (aiResponse.status === 402) {
          return new Response(JSON.stringify({ error: 'Payment required. Please add funds.' }), {
            status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }
        return new Response(JSON.stringify({ error: 'AI service error' }), {
          status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      const aiData = await aiResponse.json();
      const rawContent = aiData.choices?.[0]?.message?.content || '';

      let scriptData: any;
      try {
        let jsonContent = rawContent;
        if (rawContent.includes('```json')) {
          jsonContent = rawContent.replace(/```json\n?/g, '').replace(/```\n?/g, '');
        } else if (rawContent.includes('```')) {
          jsonContent = rawContent.replace(/```\n?/g, '');
        }
        scriptData = JSON.parse(jsonContent.trim());
      } catch {
        scriptData = { title: 'Generated Script', script: [], parseError: true, rawContent };
      }

      const hasMissing = !useCustom && (scriptData.missingCitations || []).length > 0;
      const status = hasMissing ? 'blocked' : 'draft';

      let versionNumber = 1;
      if (parentRequestId) {
        const { data: parentReq } = await supabase
          .from('video_requests')
          .select('version_number')
          .eq('id', parentRequestId)
          .single();
        versionNumber = (parentReq?.version_number || 0) + 1;
      }

      const { data: videoReq, error: insertError } = await supabase
        .from('video_requests')
        .insert({
          user_id: userId,
          template_type: tplType,
          title: scriptData.title || 'Untitled Video',
          description: scriptData.description || '',
          input_content_ids: contentIds || [],
          script_json: scriptData,
          scene_plan_json: scriptData.scenePlan || [],
          captions_text: scriptData.captions || '',
          transcript_text: scriptData.transcript || '',
          tags: scriptData.tags || [],
          thumbnail_prompt: scriptData.thumbnailPrompt || '',
          status,
          blocked_reason: hasMissing ? `Missing citations: ${(scriptData.missingCitations || []).join(', ')}` : null,
          provider: 'invideo',
          provider_model: null,
          custom_prompt: useCustom ? customPrompt : null,
          is_custom_content: useCustom,
          version_number: versionNumber,
          parent_request_id: parentRequestId || null,
          generation_mode: generationMode || 'text_to_video',
          input_image_url: inputImageUrl || null,
        })
        .select()
        .single();

      if (insertError) {
        console.error('Insert error:', insertError);
        return new Response(JSON.stringify({ error: 'Failed to save video request' }), {
          status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // Save video citations (only for PROOF content)
      if (!useCustom) {
        const citationInserts: any[] = [];
        const sources = allContent.filter((c: any) => c.source_type);
        const cards = allContent.filter((c: any) => c.claim_category);
        sources.forEach((s: any) => {
          citationInserts.push({
            video_request_id: videoReq.id,
            source_id: s.id,
            segment_label: s.title,
          });
        });
        cards.forEach((c: any) => {
          citationInserts.push({
            video_request_id: videoReq.id,
            objection_card_id: c.id,
            segment_label: `Objection Card: ${c.claim_category}`,
          });
        });
        if (citationInserts.length > 0) {
          await supabase.from('video_citations').insert(citationInserts);
        }
      }

      return new Response(JSON.stringify({
        videoRequest: videoReq,
        scriptData,
        blocked: hasMissing,
        blockedReason: hasMissing ? scriptData.missingCitations : null,
      }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    // ========== ACTION: SUBMIT VIDEO (InVideo — clipboard-based) ==========
    if (action === 'submit_video') {
      if (!videoRequestId) {
        return new Response(JSON.stringify({ error: 'videoRequestId required' }), {
          status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      const { data: vr } = await supabase
        .from('video_requests')
        .select('*')
        .eq('id', videoRequestId)
        .eq('user_id', userId)
        .single();

      if (!vr) {
        return new Response(JSON.stringify({ error: 'Video request not found' }), {
          status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      if (vr.status === 'blocked') {
        return new Response(JSON.stringify({ error: 'Video is blocked due to missing citations', blocked: true }), {
          status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // InVideo is clipboard-based — we just mark the request as exported
      await supabase.from('video_requests').update({ status: 'exported' }).eq('id', videoRequestId);

      return new Response(JSON.stringify({
        provider: 'invideo',
        status: 'exported',
        message: 'Script ready for InVideo.ai. Copy the script and paste it at ai.invideo.io to create your video.',
      }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    // ========== ACTION: CHECK STATUS ==========
    if (action === 'check_status') {
      if (!videoRequestId) {
        return new Response(JSON.stringify({ error: 'videoRequestId required' }), {
          status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      const { data: vr } = await supabase
        .from('video_requests')
        .select('status')
        .eq('id', videoRequestId)
        .single();

      return new Response(JSON.stringify({ status: vr?.status || 'unknown' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // ========== ACTION: UPLOAD VIDEO ==========
    if (action === 'upload_video') {
      if (!uploadVideoUrl) {
        return new Response(JSON.stringify({ error: 'videoUrl required' }), {
          status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      const { data: videoReq, error: insertError } = await supabase
        .from('video_requests')
        .insert({
          user_id: userId,
          template_type: 'custom',
          title: uploadTitle || 'Uploaded Video',
          description: uploadDescription || '',
          input_content_ids: [],
          script_json: {},
          scene_plan_json: [],
          status: 'completed',
          provider: 'upload',
          generation_mode: 'video_upload',
          input_video_url: uploadVideoUrl,
          is_custom_content: true,
        })
        .select()
        .single();

      if (insertError) {
        console.error('Upload insert error:', insertError);
        return new Response(JSON.stringify({ error: 'Failed to save uploaded video' }), {
          status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      await supabase.from('video_assets').insert({
        video_request_id: videoReq.id,
        video_url: uploadVideoUrl,
        metadata_json: { source: 'user_upload' },
      });

      return new Response(JSON.stringify({ videoRequest: videoReq, status: 'completed' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // ========== ACTION: GENERATE IMAGE ==========
    if (action === 'generate_image') {
      if (!imagePrompt) {
        return new Response(JSON.stringify({ error: 'imagePrompt required' }), {
          status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
      if (!LOVABLE_API_KEY) {
        return new Response(JSON.stringify({ error: 'AI service not configured' }), {
          status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      const model = imageModel === 'quality' ? 'google/gemini-3-pro-image-preview' : 'google/gemini-2.5-flash-image';

      const messages: any[] = [];
      if (imageEditSource) {
        messages.push({
          role: 'user',
          content: [
            { type: 'text', text: imagePrompt },
            { type: 'image_url', image_url: { url: imageEditSource } },
          ],
        });
      } else {
        messages.push({ role: 'user', content: imagePrompt });
      }

      const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${LOVABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          messages,
          modalities: ['image', 'text'],
        }),
      });

      if (!aiResponse.ok) {
        const errText = await aiResponse.text();
        console.error('Image AI error:', aiResponse.status, errText);
        if (aiResponse.status === 429) {
          return new Response(JSON.stringify({ error: 'Rate limit exceeded. Please try again shortly.' }), {
            status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }
        if (aiResponse.status === 402) {
          return new Response(JSON.stringify({ error: 'Payment required. Please add funds.' }), {
            status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }
        return new Response(JSON.stringify({ error: 'Image generation failed' }), {
          status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      const aiData = await aiResponse.json();
      const textContent = aiData.choices?.[0]?.message?.content || '';
      const images = aiData.choices?.[0]?.message?.images || [];

      if (images.length === 0) {
        return new Response(JSON.stringify({ error: 'No image was generated. Try a different prompt.' }), {
          status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      const imageDataUrl = images[0]?.image_url?.url || '';

      let storedUrl = imageDataUrl;
      try {
        const base64Match = imageDataUrl.match(/^data:image\/(png|jpeg|jpg|webp);base64,(.+)$/);
        if (base64Match) {
          const ext = base64Match[1] === 'jpeg' ? 'jpg' : base64Match[1];
          const raw = base64Match[2];
          const bytes = Uint8Array.from(atob(raw), c => c.charCodeAt(0));
          const filePath = `${userId}/generated_${Date.now()}.${ext}`;

          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('video-studio-uploads')
            .upload(filePath, bytes, { contentType: `image/${base64Match[1]}`, upsert: false });

          if (!uploadError && uploadData) {
            const { data: urlData } = supabase.storage.from('video-studio-uploads').getPublicUrl(uploadData.path);
            storedUrl = urlData.publicUrl;
          }
        }
      } catch (e) {
        console.error('Image upload to storage failed, returning base64:', e);
      }

      return new Response(JSON.stringify({
        imageUrl: storedUrl,
        textContent,
        model,
      }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify({ error: 'Invalid action' }), {
      status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Video Studio error:', error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Internal server error' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
