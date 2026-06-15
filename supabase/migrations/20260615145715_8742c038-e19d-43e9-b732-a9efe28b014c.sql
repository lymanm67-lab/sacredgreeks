
-- 1. certificate-og-images: enforce ownership on UPDATE (and add DELETE ownership too)
DROP POLICY IF EXISTS "Users can update their own certificate OG images" ON storage.objects;
CREATE POLICY "Users can update their own certificate OG images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'certificate-og-images'
    AND (storage.foldername(name))[1] = auth.uid()::text
  )
  WITH CHECK (
    bucket_id = 'certificate-og-images'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- Also tighten INSERT to require ownership by folder path
DROP POLICY IF EXISTS "Authenticated users can upload certificate OG images" ON storage.objects;
CREATE POLICY "Authenticated users can upload certificate OG images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'certificate-og-images'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- Add owner-scoped DELETE
CREATE POLICY "Users can delete their own certificate OG images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'certificate-og-images'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- 2. email_sends: drop duplicate admin SELECT policy on {public}
DROP POLICY IF EXISTS "Admins can view email sends" ON public.email_sends;

-- 3. youtube_connections: add explicit owner-only SELECT policy
CREATE POLICY "Users can view their own YouTube connection"
  ON public.youtube_connections FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);
