import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

interface VideoStudioRequest {
  action: 'generate_script' | 'submit_video' | 'check_status';
  templateType?: 'objection_short' | 'mini_teaching' | 'conversation_prep' | 'weekly_devotional';
  contentIds?: string[];
  videoRequestId?: string;
  jobId?: string;
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
  }
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  try {
    const { action, templateType, contentIds, videoRequestId, jobId } = await req.json() as VideoStudioRequest;

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
      if (!templateType || !contentIds?.length) {
        return new Response(JSON.stringify({ error: 'templateType and contentIds are required' }), {
          status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      const config = TEMPLATE_CONFIGS[templateType];
      if (!config) {
        return new Response(JSON.stringify({ error: 'Invalid template type' }), {
          status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // Retrieve approved content
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

      const allContent = [...(sources || []), ...(cards || [])];

      if (allContent.length === 0) {
        return new Response(JSON.stringify({
          error: 'No approved content found for the selected IDs. Video generation blocked.',
          blocked: true
        }), {
          status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // Build context for script generation
      let contentContext = '';
      (sources || []).forEach((s, i) => {
        contentContext += `\n[Source ${i + 1}] "${s.title}" (Tier ${s.tier})\n${s.summary || s.content.slice(0, 600)}\nCitation: ${s.citation_ref || 'N/A'}\n`;
      });
      (cards || []).forEach((c, i) => {
        contentContext += `\n[Objection Card ${i + 1}] Category: ${c.claim_category}\nClaim: ${c.claim_text}\n60s Response: ${c.sixty_second_response}\n5min Response: ${c.five_minute_response}\nScripture: ${JSON.stringify(c.scripture_refs)}\n`;
      });

      const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
      if (!LOVABLE_API_KEY) {
        return new Response(JSON.stringify({ error: 'AI service not configured' }), {
          status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      const systemPrompt = `You are a Sacred Greeks Video Script Writer. You create scripts for PROOF framework videos.

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

      const userPrompt = `Create a ${config.description} video script.
Duration: ${config.durationRange}
Format: ${config.format}

APPROVED CONTENT TO USE:
${contentContext}

Generate the complete script with scene plan, captions, and metadata.`;

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

      // Check for missing citations — block if any
      const hasMissing = (scriptData.missingCitations || []).length > 0;
      const status = hasMissing ? 'blocked' : 'draft';

      // Save video request
      const { data: videoReq, error: insertError } = await supabase
        .from('video_requests')
        .insert({
          user_id: userId,
          template_type: templateType,
          title: scriptData.title || 'Untitled Video',
          description: scriptData.description || '',
          input_content_ids: contentIds,
          script_json: scriptData,
          scene_plan_json: scriptData.scenePlan || [],
          captions_text: scriptData.captions || '',
          transcript_text: scriptData.transcript || '',
          tags: scriptData.tags || [],
          thumbnail_prompt: scriptData.thumbnailPrompt || '',
          status,
          blocked_reason: hasMissing ? `Missing citations: ${(scriptData.missingCitations || []).join(', ')}` : null,
        })
        .select()
        .single();

      if (insertError) {
        console.error('Insert error:', insertError);
        return new Response(JSON.stringify({ error: 'Failed to save video request' }), {
          status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // Save video citations
      const citationInserts: any[] = [];
      (sources || []).forEach(s => {
        citationInserts.push({
          video_request_id: videoReq.id,
          source_id: s.id,
          segment_label: s.title,
        });
      });
      (cards || []).forEach(c => {
        citationInserts.push({
          video_request_id: videoReq.id,
          objection_card_id: c.id,
          segment_label: `Objection Card: ${c.claim_category}`,
        });
      });
      if (citationInserts.length > 0) {
        await supabase.from('video_citations').insert(citationInserts);
      }

      return new Response(JSON.stringify({
        videoRequest: videoReq,
        scriptData,
        blocked: hasMissing,
        blockedReason: hasMissing ? scriptData.missingCitations : null,
      }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    // ========== ACTION: SUBMIT VIDEO (Runway) ==========
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

      const RUNWAY_API_KEY = Deno.env.get('RUNWAY_API_KEY');
      if (!RUNWAY_API_KEY) {
        return new Response(JSON.stringify({ error: 'Runway API not configured' }), {
          status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // Submit to Runway Gen-4 API
      const script = vr.script_json as any;
      const textPrompt = (script?.script || [])
        .map((s: any) => `${s.visual || ''} ${s.narration || ''}`)
        .join('. ')
        .slice(0, 500);

      const runwayResponse = await fetch('https://api.dev.runwayml.com/v1/image_to_video', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RUNWAY_API_KEY}`,
          'Content-Type': 'application/json',
          'X-Runway-Version': '2024-11-06',
        },
        body: JSON.stringify({
          model: 'gen4_turbo',
          ratio: '720:1280',
          duration: 10,
          text_prompt: textPrompt,
        }),
      });

      if (!runwayResponse.ok) {
        const errText = await runwayResponse.text();
        console.error('Runway error:', runwayResponse.status, errText);

        // Create failed job record
        await supabase.from('video_jobs').insert({
          video_request_id: videoRequestId,
          provider: 'runway',
          status: 'failed',
          error_message: `Runway API error: ${runwayResponse.status}`,
        });

        await supabase.from('video_requests').update({ status: 'failed' }).eq('id', videoRequestId);

        return new Response(JSON.stringify({ error: 'Video generation failed', details: errText }), {
          status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      const runwayData = await runwayResponse.json();

      // Create job record
      const { data: job } = await supabase.from('video_jobs').insert({
        video_request_id: videoRequestId,
        provider: 'runway',
        provider_job_id: runwayData.id,
        status: 'submitted',
        metadata_json: runwayData,
      }).select().single();

      // Update request status
      await supabase.from('video_requests').update({ status: 'generating' }).eq('id', videoRequestId);

      return new Response(JSON.stringify({
        jobId: job?.id,
        providerJobId: runwayData.id,
        status: 'submitted',
      }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
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

      // Poll Runway for status
      const RUNWAY_API_KEY = Deno.env.get('RUNWAY_API_KEY');
      if (!RUNWAY_API_KEY) {
        return new Response(JSON.stringify({ error: 'Runway not configured' }), {
          status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      const statusResponse = await fetch(`https://api.dev.runwayml.com/v1/tasks/${job.provider_job_id}`, {
        headers: {
          'Authorization': `Bearer ${RUNWAY_API_KEY}`,
          'X-Runway-Version': '2024-11-06',
        },
      });

      if (!statusResponse.ok) {
        return new Response(JSON.stringify({ status: job.status, pollError: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      const statusData = await statusResponse.json();

      if (statusData.status === 'SUCCEEDED' && statusData.output?.length > 0) {
        const videoUrl = statusData.output[0];

        // Update job
        await supabase.from('video_jobs').update({
          status: 'completed',
          metadata_json: statusData,
        }).eq('id', job.id);

        // Create video asset
        await supabase.from('video_assets').insert({
          video_request_id: job.video_request_id,
          video_url: videoUrl,
          metadata_json: statusData,
        });

        // Update request
        await supabase.from('video_requests').update({ status: 'completed' }).eq('id', job.video_request_id);

        return new Response(JSON.stringify({
          status: 'completed',
          videoUrl,
        }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }

      if (statusData.status === 'FAILED') {
        await supabase.from('video_jobs').update({
          status: 'failed',
          error_message: statusData.failure || 'Unknown error',
          metadata_json: statusData,
        }).eq('id', job.id);

        await supabase.from('video_requests').update({ status: 'failed' }).eq('id', job.video_request_id);

        return new Response(JSON.stringify({
          status: 'failed',
          error: statusData.failure,
        }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }

      // Still processing
      const progress = statusData.progress || 0;
      await supabase.from('video_jobs').update({
        status: 'processing',
        metadata_json: statusData,
      }).eq('id', job.id);

      return new Response(JSON.stringify({
        status: 'processing',
        progress,
      }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify({ error: 'Invalid action' }), {
      status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Video Studio error:', error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
