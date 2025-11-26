-- Create storage bucket for certificate OG images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'certificate-og-images',
  'certificate-og-images',
  true,
  5242880, -- 5MB limit
  ARRAY['image/png', 'image/jpeg']
)
ON CONFLICT (id) DO NOTHING;

-- Allow public access to view OG images
CREATE POLICY "Public can view certificate OG images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'certificate-og-images');

-- Allow authenticated users to upload OG images
CREATE POLICY "Authenticated users can upload certificate OG images"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'certificate-og-images' AND auth.uid() IS NOT NULL);

-- Allow users to update their own OG images
CREATE POLICY "Users can update their own certificate OG images"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'certificate-og-images' AND auth.uid() IS NOT NULL);