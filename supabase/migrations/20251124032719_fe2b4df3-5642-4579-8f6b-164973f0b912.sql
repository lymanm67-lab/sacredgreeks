-- Create rate_limits table for API rate limiting
CREATE TABLE IF NOT EXISTS public.rate_limits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  endpoint TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for efficient rate limit queries
CREATE INDEX idx_rate_limits_user_endpoint ON public.rate_limits(user_id, endpoint, created_at);

-- Enable RLS
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

-- Users can only view their own rate limit records
CREATE POLICY "Users can view their own rate limits"
ON public.rate_limits
FOR SELECT
USING (auth.uid() = user_id);

-- Automatic cleanup of old rate limit records (older than 1 hour)
CREATE OR REPLACE FUNCTION public.cleanup_old_rate_limits()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.rate_limits
  WHERE created_at < NOW() - INTERVAL '1 hour';
END;
$$;