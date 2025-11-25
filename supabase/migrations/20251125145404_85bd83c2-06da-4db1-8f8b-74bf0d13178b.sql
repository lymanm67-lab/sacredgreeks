-- Prayer Requests Wall (Social/Community Feature)
CREATE TABLE public.prayer_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  request_type TEXT NOT NULL DEFAULT 'general', -- 'general', 'healing', 'guidance', 'thanksgiving', 'urgent'
  privacy_level TEXT NOT NULL DEFAULT 'chapter', -- 'public', 'chapter', 'private'
  answered BOOLEAN DEFAULT false,
  answered_at TIMESTAMP WITH TIME ZONE,
  answered_testimony TEXT,
  prayer_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Track who prayed for which requests
CREATE TABLE public.prayer_support (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  prayer_request_id UUID NOT NULL REFERENCES public.prayer_requests(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  prayed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  encouragement_note TEXT,
  UNIQUE(prayer_request_id, user_id)
);

-- Comments/Updates on prayer requests
CREATE TABLE public.prayer_request_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  prayer_request_id UUID NOT NULL REFERENCES public.prayer_requests(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  comment TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Indexes for performance
CREATE INDEX idx_prayer_requests_user_id ON public.prayer_requests(user_id);
CREATE INDEX idx_prayer_requests_created_at ON public.prayer_requests(created_at DESC);
CREATE INDEX idx_prayer_requests_privacy ON public.prayer_requests(privacy_level);
CREATE INDEX idx_prayer_support_request ON public.prayer_support(prayer_request_id);
CREATE INDEX idx_prayer_support_user ON public.prayer_support(user_id);
CREATE INDEX idx_prayer_comments_request ON public.prayer_request_comments(prayer_request_id);

-- Enable RLS
ALTER TABLE public.prayer_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prayer_support ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prayer_request_comments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for prayer_requests
CREATE POLICY "Users can create prayer requests"
ON public.prayer_requests
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own requests"
ON public.prayer_requests
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can view chapter requests"
ON public.prayer_requests
FOR SELECT
USING (privacy_level = 'chapter' AND auth.uid() IS NOT NULL);

CREATE POLICY "Anyone can view public requests"
ON public.prayer_requests
FOR SELECT
USING (privacy_level = 'public');

CREATE POLICY "Users can update their own requests"
ON public.prayer_requests
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own requests"
ON public.prayer_requests
FOR DELETE
USING (auth.uid() = user_id);

-- RLS Policies for prayer_support
CREATE POLICY "Users can add prayer support"
ON public.prayer_support
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view prayer support"
ON public.prayer_support
FOR SELECT
USING (
  auth.uid() = user_id OR 
  EXISTS (
    SELECT 1 FROM public.prayer_requests pr 
    WHERE pr.id = prayer_request_id 
    AND (pr.user_id = auth.uid() OR pr.privacy_level IN ('chapter', 'public'))
  )
);

CREATE POLICY "Users can update their own support"
ON public.prayer_support
FOR UPDATE
USING (auth.uid() = user_id);

-- RLS Policies for prayer_request_comments
CREATE POLICY "Users can add comments"
ON public.prayer_request_comments
FOR INSERT
WITH CHECK (
  auth.uid() = user_id AND
  EXISTS (
    SELECT 1 FROM public.prayer_requests pr 
    WHERE pr.id = prayer_request_id 
    AND (pr.user_id = auth.uid() OR pr.privacy_level IN ('chapter', 'public'))
  )
);

CREATE POLICY "Users can view comments"
ON public.prayer_request_comments
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.prayer_requests pr 
    WHERE pr.id = prayer_request_id 
    AND (pr.user_id = auth.uid() OR pr.privacy_level IN ('chapter', 'public'))
  )
);

CREATE POLICY "Users can update their own comments"
ON public.prayer_request_comments
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own comments"
ON public.prayer_request_comments
FOR DELETE
USING (auth.uid() = user_id);

-- Triggers for updated_at
CREATE TRIGGER update_prayer_requests_updated_at
BEFORE UPDATE ON public.prayer_requests
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Function to update prayer count
CREATE OR REPLACE FUNCTION update_prayer_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.prayer_requests
  SET prayer_count = (
    SELECT COUNT(*) FROM public.prayer_support
    WHERE prayer_request_id = NEW.prayer_request_id
  )
  WHERE id = NEW.prayer_request_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER update_prayer_count_trigger
AFTER INSERT ON public.prayer_support
FOR EACH ROW
EXECUTE FUNCTION update_prayer_count();

-- Insert sample prayer requests for demonstration
INSERT INTO public.prayer_requests (user_id, title, description, request_type, privacy_level) 
SELECT 
  id,
  'Guidance in Leadership',
  'Seeking wisdom as I take on new leadership responsibilities in our chapter. Pray for discernment and strength.',
  'guidance',
  'chapter'
FROM auth.users
LIMIT 1;

INSERT INTO public.prayer_requests (user_id, title, description, request_type, privacy_level) 
SELECT 
  id,
  'Family Health',
  'My mother is undergoing surgery next week. Praying for successful procedure and quick recovery.',
  'healing',
  'chapter'
FROM auth.users
LIMIT 1;