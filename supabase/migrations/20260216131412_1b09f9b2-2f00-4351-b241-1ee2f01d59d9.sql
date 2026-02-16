
-- ============================================
-- Video Studio & Citation Tracking Schema
-- ============================================

-- Output citations: tracks which content items were cited in each worker output field
CREATE TABLE public.output_citations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  worker_run_id UUID REFERENCES public.worker_runs(id) ON DELETE CASCADE,
  source_id UUID REFERENCES public.golden_library_sources(id) ON DELETE SET NULL,
  objection_card_id UUID REFERENCES public.objection_cards(id) ON DELETE SET NULL,
  field_name TEXT NOT NULL, -- e.g. 'sixtySecondResponse', 'proofBreakdown.R'
  excerpt TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.output_citations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view output citations"
  ON public.output_citations FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Service role can insert output citations"
  ON public.output_citations FOR INSERT
  WITH CHECK (true);

-- Video requests: user-initiated video generation requests
CREATE TABLE public.video_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  template_type TEXT NOT NULL CHECK (template_type IN ('objection_short', 'mini_teaching', 'conversation_prep', 'weekly_devotional')),
  title TEXT NOT NULL,
  description TEXT,
  input_content_ids UUID[] DEFAULT '{}',
  script_json JSONB DEFAULT '{}',
  scene_plan_json JSONB DEFAULT '{}',
  captions_text TEXT,
  transcript_text TEXT,
  tags TEXT[] DEFAULT '{}',
  thumbnail_prompt TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'pending_review', 'approved', 'generating', 'completed', 'failed', 'blocked')),
  blocked_reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.video_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own video requests"
  ON public.video_requests FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own video requests"
  ON public.video_requests FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own video requests"
  ON public.video_requests FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all video requests"
  ON public.video_requests FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- Video jobs: tracks provider job execution
CREATE TABLE public.video_jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  video_request_id UUID NOT NULL REFERENCES public.video_requests(id) ON DELETE CASCADE,
  provider TEXT NOT NULL DEFAULT 'runway' CHECK (provider IN ('runway', 'replicate')),
  provider_job_id TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'submitted', 'processing', 'completed', 'failed')),
  error_message TEXT,
  metadata_json JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.video_jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own video jobs"
  ON public.video_jobs FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.video_requests vr
    WHERE vr.id = video_jobs.video_request_id AND vr.user_id = auth.uid()
  ));

CREATE POLICY "Service can manage video jobs"
  ON public.video_jobs FOR ALL
  USING (true);

-- Video assets: completed video files
CREATE TABLE public.video_assets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  video_request_id UUID NOT NULL REFERENCES public.video_requests(id) ON DELETE CASCADE,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  captions_url TEXT,
  transcript_text TEXT,
  duration_seconds INTEGER,
  resolution TEXT,
  file_size_bytes BIGINT,
  metadata_json JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.video_assets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own video assets"
  ON public.video_assets FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.video_requests vr
    WHERE vr.id = video_assets.video_request_id AND vr.user_id = auth.uid()
  ));

CREATE POLICY "Service can manage video assets"
  ON public.video_assets FOR ALL
  USING (true);

-- Video citations: tracks which content was used for each video
CREATE TABLE public.video_citations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  video_request_id UUID NOT NULL REFERENCES public.video_requests(id) ON DELETE CASCADE,
  source_id UUID REFERENCES public.golden_library_sources(id) ON DELETE SET NULL,
  objection_card_id UUID REFERENCES public.objection_cards(id) ON DELETE SET NULL,
  segment_label TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.video_citations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own video citations"
  ON public.video_citations FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.video_requests vr
    WHERE vr.id = video_citations.video_request_id AND vr.user_id = auth.uid()
  ));

CREATE POLICY "Service can manage video citations"
  ON public.video_citations FOR ALL
  USING (true);

-- Triggers for updated_at
CREATE TRIGGER update_video_requests_updated_at
  BEFORE UPDATE ON public.video_requests
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_video_jobs_updated_at
  BEFORE UPDATE ON public.video_jobs
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Storage bucket for generated videos
INSERT INTO storage.buckets (id, name, public) VALUES ('proof-videos', 'proof-videos', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Anyone can view proof videos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'proof-videos');

CREATE POLICY "Auth users can upload proof videos"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'proof-videos' AND auth.uid() IS NOT NULL);
