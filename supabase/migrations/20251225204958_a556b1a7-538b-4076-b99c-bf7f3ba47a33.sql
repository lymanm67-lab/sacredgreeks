-- Create myth_buster_downloads table to track download counts
CREATE TABLE public.myth_buster_downloads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  resource_id TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  download_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.myth_buster_downloads ENABLE ROW LEVEL SECURITY;

-- Everyone can view download counts (public data)
CREATE POLICY "Anyone can view download counts" 
ON public.myth_buster_downloads 
FOR SELECT 
USING (true);

-- Anyone can increment download count via function
CREATE OR REPLACE FUNCTION public.increment_download_count(resource_id_param TEXT)
RETURNS INTEGER AS $$
DECLARE
  new_count INTEGER;
BEGIN
  UPDATE public.myth_buster_downloads 
  SET download_count = download_count + 1, updated_at = now()
  WHERE resource_id = resource_id_param
  RETURNING download_count INTO new_count;
  
  RETURN COALESCE(new_count, 0);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Insert initial download records for each myth buster resource
INSERT INTO public.myth_buster_downloads (resource_id, title) VALUES
  ('greek-life-idolatry', 'Myth Busters: Greek Life is Idolatry'),
  ('secret-rituals', 'Myth Busters: Secret Rituals Explained'),
  ('bglo-origins', 'Myth Busters: BGLO Origins & Christianity'),
  ('serving-two-masters', 'Myth Busters: Serving Two Masters?'),
  ('party-culture', 'Myth Busters: Party Culture Truth')
ON CONFLICT (resource_id) DO NOTHING;

-- Create trigger for updated_at
CREATE TRIGGER update_myth_buster_downloads_updated_at
BEFORE UPDATE ON public.myth_buster_downloads
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();