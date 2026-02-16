-- Create storage bucket for video studio uploads (images and videos)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'video-studio-uploads',
  'video-studio-uploads',
  true,
  104857600, -- 100MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/webm', 'video/quicktime']
);

-- Allow authenticated users to upload their own files
CREATE POLICY "Users can upload video studio files"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'video-studio-uploads'
  AND auth.uid() IS NOT NULL
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow authenticated users to view their own files
CREATE POLICY "Users can view own video studio files"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'video-studio-uploads'
  AND auth.uid() IS NOT NULL
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow public read for completed videos (bucket is public)
CREATE POLICY "Public can view video studio files"
ON storage.objects FOR SELECT
USING (bucket_id = 'video-studio-uploads');

-- Allow users to delete their own files
CREATE POLICY "Users can delete own video studio files"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'video-studio-uploads'
  AND auth.uid() IS NOT NULL
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Add image_url and input_video_url columns to video_requests
ALTER TABLE public.video_requests
ADD COLUMN IF NOT EXISTS input_image_url TEXT,
ADD COLUMN IF NOT EXISTS input_video_url TEXT,
ADD COLUMN IF NOT EXISTS generation_mode TEXT DEFAULT 'text_to_video';