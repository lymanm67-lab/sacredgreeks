import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

interface VideoStudioRequest {
  action: 'generate_script' | 'submit_video' | 'check_status' | 'upload_video';
  templateType?: string;
  contentIds?: string[];
  videoRequestId?: string;
  jobId?: string;
  provider?: 'runway' | 'replicate';
  providerModel?: string;
  customPrompt?: string;
  isCustomContent?: boolean;
  parentRequestId?: string;
  generationMode?: 'text_to_video' | 'image_to_video' | 'video_upload';
  inputImageUrl?: string;
  videoUrl?: string;
  title?: string;
  description?: string;
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

const REPLICATE_MODELS: Record<string, { version: string; label: string }> = {
  'minimax/video-01-live': {
    version: 'minimax/video-01-live',
    label: 'MiniMax Video-01-Live',
  },
  'luma/ray': {
    version: 'luma/ray',
    label: 'Luma Ray',
  },
};

// ===== PROVIDER ADAPTER INTERFACE =====
interface VideoProvider {
  submitJob(prompt: string, options: Record<string, any>): Promise<{ jobId: string; rawResponse: any }>;
  checkStatus(jobId: string): Promise<{ status: 'processing' | 'completed' | 'failed'; progress?: number; videoUrl?: string; error?: string; rawResponse?: any }>;
}

// Runway supports image_to_video natively
class RunwayProvider implements VideoProvider {
  private apiKey: string;
  constructor(apiKey: string) { this.apiKey = apiKey; }

  async submitJob(prompt: string, options: Record<string, any>) {
    const body: Record<string, any> = {
      model: 'gen4_turbo',
      ratio: options.ratio || '720:1280',
      duration: options.duration || 10,
      text_prompt: prompt.slice(0, 500),
    };

    // If image URL is provided, use image_to_video
    if (options.imageUrl) {
      body.image = options.imageUrl;
    }

    const res = await fetch('https://api.dev.runwayml.com/v1/image_to_video', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        'X-Runway-Version': '2024-11-06',
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Runway API error [${res.status}]: ${errText}`);
    }
    const data = await res.json();
    return { jobId: data.id, rawResponse: data };
  }

  async checkStatus(jobId: string) {
    const res = await fetch(`https://api.dev.runwayml.com/v1/tasks/${jobId}`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'X-Runway-Version': '2024-11-06',
      },
    });
    if (!res.ok) throw new Error(`Runway status check failed [${res.status}]`);
    const data = await res.json();

    if (data.status === 'SUCCEEDED' && data.output?.length > 0) {
      return { status: 'completed' as const, videoUrl: data.output[0], rawResponse: data };
    }
    if (data.status === 'FAILED') {
      return { status: 'failed' as const, error: data.failure || 'Unknown error', rawResponse: data };
    }
    return { status: 'processing' as const, progress: data.progress || 0, rawResponse: data };
  }
}

class ReplicateProvider implements VideoProvider {
  private apiKey: string;
  private model: string;
  constructor(apiKey: string, model: string) {
    this.apiKey = apiKey;
    this.model = model;
  }

  async submitJob(prompt: string, options: Record<string, any>) {
    const input: Record<string, any> = {
      prompt: prompt.slice(0, 1000),
      ...(options.replicateInput || {}),
    };

    // If image URL is provided, pass as image input
    if (options.imageUrl) {
      input.image = options.imageUrl;
      input.image_url = options.imageUrl; // some models use image_url
    }

    const res = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: this.model,
        input,
      }),
    });
    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Replicate API error [${res.status}]: ${errText}`);
    }
    const data = await res.json();
    return { jobId: data.id, rawResponse: data };
  }

  async checkStatus(jobId: string) {
    const res = await fetch(`https://api.replicate.com/v1/predictions/${jobId}`, {
      headers: { 'Authorization': `Bearer ${this.apiKey}` },
    });
    if (!res.ok) throw new Error(`Replicate status check failed [${res.status}]`);
    const data = await res.json();

    if (data.status === 'succeeded') {
      // Replicate output is model-dependent; typically an array or string URL
      const videoUrl = Array.isArray(data.output) ? data.output[0] : data.output;
      return { status: 'completed' as const, videoUrl, rawResponse: data };
    }
    if (data.status === 'failed' || data.status === 'canceled') {
      return { status: 'failed' as const, error: data.error || 'Generation failed', rawResponse: data };
    }
    // starting / processing
    const logs = data.logs || '';
    const progressMatch = logs.match(/(\d+)%/);
    const progress = progressMatch ? parseInt(progressMatch[1]) / 100 : 0;
    return { status: 'processing' as const, progress, rawResponse: data };
  }
}

function getProvider(providerName: string, model?: string): VideoProvider {
  if (providerName === 'replicate') {
    const apiKey = Deno.env.get('REPLICATE_API_KEY');
    if (!apiKey) throw new Error('Replicate API key not configured');
    const modelId = model || 'minimax/video-01-live';
    return new ReplicateProvider(apiKey, modelId);
  }
  // Default: runway
  const apiKey = Deno.env.get('RUNWAY_API_KEY');
  if (!apiKey) throw new Error('Runway API key not configured');
  return new RunwayProvider(apiKey);
}

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
    const { action, templateType, contentIds, videoRequestId, jobId, provider: reqProvider, providerModel, customPrompt, isCustomContent, parentRequestId, generationMode, inputImageUrl, videoUrl: uploadVideoUrl, title: uploadTitle, description: uploadDescription } = body;

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

      // Custom content requires admin
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

      // If using PROOF content, retrieve from library
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

      // Build prompt based on mode
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

      // Check for missing citations (only for PROOF content)
      const hasMissing = !useCustom && (scriptData.missingCitations || []).length > 0;
      const status = hasMissing ? 'blocked' : 'draft';

      // Determine version number
      let versionNumber = 1;
      if (parentRequestId) {
        const { data: parentReq } = await supabase
          .from('video_requests')
          .select('version_number')
          .eq('id', parentRequestId)
          .single();
        versionNumber = (parentReq?.version_number || 0) + 1;
      }

      const selectedProvider = reqProvider || 'runway';

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
          provider: selectedProvider,
          provider_model: providerModel || null,
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

    // ========== ACTION: SUBMIT VIDEO ==========
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

      const providerName = reqProvider || vr.provider || 'runway';
      const model = providerModel || vr.provider_model || undefined;

      // Build text prompt from script
      const script = vr.script_json as any;
      const textPrompt = (script?.script || [])
        .map((s: any) => `${s.visual || ''} ${s.narration || ''}`)
        .join('. ')
        .slice(0, 1000);

      try {
        const provider = getProvider(providerName, model);
        const { jobId: providerJobId, rawResponse } = await provider.submitJob(textPrompt, {
          ratio: '720:1280',
          duration: 10,
          imageUrl: vr.input_image_url || undefined,
        });

        const { data: job } = await supabase.from('video_jobs').insert({
          video_request_id: videoRequestId,
          provider: providerName,
          provider_job_id: providerJobId,
          status: 'submitted',
          metadata_json: rawResponse,
        }).select().single();

        await supabase.from('video_requests').update({ status: 'generating' }).eq('id', videoRequestId);

        return new Response(JSON.stringify({
          jobId: job?.id,
          providerJobId,
          provider: providerName,
          status: 'submitted',
        }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      } catch (error) {
        console.error('Provider submit error:', error);
        await supabase.from('video_jobs').insert({
          video_request_id: videoRequestId,
          provider: providerName,
          status: 'failed',
          error_message: error instanceof Error ? error.message : 'Unknown error',
        });
        await supabase.from('video_requests').update({ status: 'failed' }).eq('id', videoRequestId);
        return new Response(JSON.stringify({ error: 'Video generation failed', details: error instanceof Error ? error.message : 'Unknown' }), {
          status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    // ========== ACTION: CHECK STATUS ==========
    if (action === 'check_status') {
      if (!jobId && !videoRequestId) {
        return new Response(JSON.stringify({ error: 'jobId or videoRequestId required' }), {
          status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      let job: any;
      if (jobId) {
        const { data } = await supabase.from('video_jobs').select('*').eq('id', jobId).single();
        job = data;
      } else {
        const { data } = await supabase.from('video_jobs')
          .select('*')
          .eq('video_request_id', videoRequestId)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();
        job = data;
      }

      if (!job || !job.provider_job_id) {
        return new Response(JSON.stringify({ status: job?.status || 'unknown' }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      try {
        const provider = getProvider(job.provider || 'runway');
        const result = await provider.checkStatus(job.provider_job_id);

        if (result.status === 'completed' && result.videoUrl) {
          await supabase.from('video_jobs').update({
            status: 'completed',
            metadata_json: result.rawResponse,
          }).eq('id', job.id);

          await supabase.from('video_assets').insert({
            video_request_id: job.video_request_id,
            video_url: result.videoUrl,
            metadata_json: result.rawResponse,
          });

          await supabase.from('video_requests').update({ status: 'completed' }).eq('id', job.video_request_id);

          return new Response(JSON.stringify({ status: 'completed', videoUrl: result.videoUrl }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        if (result.status === 'failed') {
          await supabase.from('video_jobs').update({
            status: 'failed',
            error_message: result.error || 'Unknown error',
            metadata_json: result.rawResponse,
          }).eq('id', job.id);

          await supabase.from('video_requests').update({ status: 'failed' }).eq('id', job.video_request_id);

          return new Response(JSON.stringify({ status: 'failed', error: result.error }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        // Still processing
        await supabase.from('video_jobs').update({
          status: 'processing',
          metadata_json: result.rawResponse,
        }).eq('id', job.id);

        return new Response(JSON.stringify({ status: 'processing', progress: result.progress || 0 }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      } catch (error) {
        console.error('Status check error:', error);
        return new Response(JSON.stringify({ status: job.status, pollError: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
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

      // Also create a video_assets entry
      await supabase.from('video_assets').insert({
        video_request_id: videoReq.id,
        video_url: uploadVideoUrl,
        metadata_json: { source: 'user_upload' },
      });

      return new Response(JSON.stringify({ videoRequest: videoReq, status: 'completed' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
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
