-- Add provider selection and custom prompt support to video_requests
ALTER TABLE public.video_requests 
  ADD COLUMN IF NOT EXISTS provider text NOT NULL DEFAULT 'runway',
  ADD COLUMN IF NOT EXISTS provider_model text,
  ADD COLUMN IF NOT EXISTS custom_prompt text,
  ADD COLUMN IF NOT EXISTS is_custom_content boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS version_number integer NOT NULL DEFAULT 1,
  ADD COLUMN IF NOT EXISTS parent_request_id uuid REFERENCES public.video_requests(id);

-- Add version tracking index
CREATE INDEX IF NOT EXISTS idx_video_requests_parent ON public.video_requests(parent_request_id);
CREATE INDEX IF NOT EXISTS idx_video_requests_provider ON public.video_requests(provider);
