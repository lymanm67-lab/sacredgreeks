-- Create table to store podcast listening progress
CREATE TABLE public.podcast_listening_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  episode_title TEXT NOT NULL,
  episode_url TEXT NOT NULL,
  episode_pub_date TEXT,
  playback_position NUMERIC NOT NULL DEFAULT 0,
  duration NUMERIC,
  last_played_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, episode_url)
);

-- Enable RLS
ALTER TABLE public.podcast_listening_progress ENABLE ROW LEVEL SECURITY;

-- Users can only access their own listening progress
CREATE POLICY "Users can view their own listening progress"
ON public.podcast_listening_progress
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own listening progress"
ON public.podcast_listening_progress
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own listening progress"
ON public.podcast_listening_progress
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own listening progress"
ON public.podcast_listening_progress
FOR DELETE
USING (auth.uid() = user_id);

-- Create trigger for updated_at
CREATE TRIGGER update_podcast_listening_progress_updated_at
BEFORE UPDATE ON public.podcast_listening_progress
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();