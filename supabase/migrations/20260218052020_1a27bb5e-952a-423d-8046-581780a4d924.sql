-- Add columns for Replicate video generation tracking
ALTER TABLE public.video_requests ADD COLUMN IF NOT EXISTS video_url TEXT;
ALTER TABLE public.video_requests ADD COLUMN IF NOT EXISTS provider_job_id TEXT;

-- Index for webhook lookups by prediction ID
CREATE INDEX IF NOT EXISTS idx_video_requests_provider_job_id ON public.video_requests(provider_job_id) WHERE provider_job_id IS NOT NULL;