-- Create table for shared symbol guide bookmarks
CREATE TABLE public.shared_symbol_bookmarks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  share_token TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL DEFAULT 'My Symbol Guide Collection',
  description TEXT,
  bookmark_ids UUID[] NOT NULL DEFAULT '{}',
  view_count INTEGER DEFAULT 0,
  is_public BOOLEAN NOT NULL DEFAULT true,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.shared_symbol_bookmarks ENABLE ROW LEVEL SECURITY;

-- Users can manage their own shared collections
CREATE POLICY "Users can manage their own shared collections"
ON public.shared_symbol_bookmarks
FOR ALL
USING (auth.uid() = user_id);

-- Anyone can view public shared collections by token
CREATE POLICY "Anyone can view public shared collections"
ON public.shared_symbol_bookmarks
FOR SELECT
USING (is_public = true AND (expires_at IS NULL OR expires_at > NOW()));

-- Create function to generate share token
CREATE OR REPLACE FUNCTION public.generate_symbol_share_token()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  token TEXT;
  exists BOOLEAN;
BEGIN
  LOOP
    token := encode(gen_random_bytes(12), 'base64');
    token := replace(replace(replace(token, '/', '_'), '+', '-'), '=', '');
    SELECT EXISTS(SELECT 1 FROM shared_symbol_bookmarks WHERE share_token = token) INTO exists;
    EXIT WHEN NOT exists;
  END LOOP;
  RETURN token;
END;
$$;

-- Updated_at trigger
CREATE TRIGGER update_shared_symbol_bookmarks_updated_at
  BEFORE UPDATE ON public.shared_symbol_bookmarks
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();