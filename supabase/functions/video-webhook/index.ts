import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  try {
    const body = await req.json();
    console.log('Webhook received:', JSON.stringify({ id: body.id, status: body.status }));

    const predictionId = body.id;
    const status = body.status; // "succeeded", "failed", "canceled"
    const output = body.output; // URL to the generated video
    const error = body.error;

    if (!predictionId) {
      return new Response(JSON.stringify({ error: 'Missing prediction ID' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Find the video request by prediction_id
    const { data: videoReq, error: findError } = await supabase
      .from('video_requests')
      .select('id')
      .eq('provider_job_id', predictionId)
      .single();

    if (findError || !videoReq) {
      console.error('Video request not found for prediction:', predictionId, findError);
      return new Response(JSON.stringify({ error: 'Video request not found' }), {
        status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    if (status === 'succeeded' && output) {
      // output is a URL to the generated video
      const videoUrl = typeof output === 'string' ? output : output;

      // Update the video request
      await supabase
        .from('video_requests')
        .update({
          status: 'completed',
          video_url: videoUrl,
        })
        .eq('id', videoReq.id);

      // Also create a video_assets record
      await supabase.from('video_assets').insert({
        video_request_id: videoReq.id,
        video_url: videoUrl,
        metadata_json: { source: 'replicate', model: 'wan-2.1', prediction_id: predictionId },
      });

      console.log('Video completed:', videoReq.id, videoUrl);
    } else if (status === 'failed' || status === 'canceled') {
      await supabase
        .from('video_requests')
        .update({
          status: 'failed',
          blocked_reason: error || `Video generation ${status}`,
        })
        .eq('id', videoReq.id);

      console.error('Video generation failed:', videoReq.id, error);
    } else {
      // Processing status update
      await supabase
        .from('video_requests')
        .update({ status: 'processing' })
        .eq('id', videoReq.id);
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Webhook error:', error);
    return new Response(JSON.stringify({ error: 'Webhook processing failed' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
