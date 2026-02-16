
-- Store per-user YouTube OAuth tokens
CREATE TABLE public.youtube_connections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  channel_id TEXT,
  channel_title TEXT,
  access_token TEXT NOT NULL,
  refresh_token TEXT NOT NULL,
  token_expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT youtube_connections_user_unique UNIQUE (user_id)
);

ALTER TABLE public.youtube_connections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own YouTube connection"
ON public.youtube_connections FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own YouTube connection"
ON public.youtube_connections FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own YouTube connection"
ON public.youtube_connections FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own YouTube connection"
ON public.youtube_connections FOR DELETE
USING (auth.uid() = user_id);

CREATE TRIGGER update_youtube_connections_updated_at
BEFORE UPDATE ON public.youtube_connections
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Track YouTube upload history
CREATE TABLE public.youtube_uploads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  video_request_id UUID,
  youtube_video_id TEXT,
  title TEXT NOT NULL,
  description TEXT,
  tags TEXT[],
  category_id TEXT DEFAULT '22',
  privacy_status TEXT NOT NULL DEFAULT 'private',
  publish_at TIMESTAMP WITH TIME ZONE,
  thumbnail_url TEXT,
  playlist_id TEXT,
  upload_status TEXT NOT NULL DEFAULT 'pending',
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.youtube_uploads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own YouTube uploads"
ON public.youtube_uploads FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own YouTube uploads"
ON public.youtube_uploads FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own YouTube uploads"
ON public.youtube_uploads FOR UPDATE
USING (auth.uid() = user_id);

CREATE TRIGGER update_youtube_uploads_updated_at
BEFORE UPDATE ON public.youtube_uploads
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
