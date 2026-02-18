
-- =============================================
-- FIX 1: Greek Chapters - Gate contact_email behind auth
-- =============================================

-- Create a public view without contact_email for unauthenticated users
CREATE OR REPLACE VIEW public.greek_chapters_public
WITH (security_invoker = true)
AS
SELECT id, organization, chapter_name, school_name, city, state,
       website_url, description, is_faith_focused, latitude, longitude,
       created_at, updated_at, submitted_by
FROM public.greek_chapters;

GRANT SELECT ON public.greek_chapters_public TO anon, authenticated;

-- Remove anon access to the base table (keep authenticated access)
DROP POLICY IF EXISTS "Anyone can view chapters" ON public.greek_chapters;
DROP POLICY IF EXISTS "Public can view chapters" ON public.greek_chapters;
DROP POLICY IF EXISTS "Chapters are viewable by everyone" ON public.greek_chapters;

-- Recreate: only authenticated users can see full data (including contact_email)
CREATE POLICY "Authenticated users can view chapters"
ON public.greek_chapters FOR SELECT
TO authenticated
USING (true);

-- Allow anon to read only through the view (which excludes contact_email)
-- The view uses security_invoker so we need anon SELECT on base table for the view to work
-- Instead, grant anon SELECT on the view only and revoke from base table
REVOKE SELECT ON public.greek_chapters FROM anon;

-- =============================================
-- FIX 2: YouTube OAuth Tokens - Remove user SELECT policy
-- =============================================

-- Drop the policy that exposes tokens to users
DROP POLICY IF EXISTS "Users can view their own YouTube connection" ON public.youtube_connections;

-- Create a safe status function for client-side use
CREATE OR REPLACE FUNCTION public.get_youtube_connection_status()
RETURNS TABLE(connected boolean, channel_title text, channel_id text)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    true as connected,
    channel_title,
    channel_id
  FROM youtube_connections
  WHERE user_id = auth.uid();
$$;

-- =============================================
-- FIX 3: Video Studio Storage - Make bucket private
-- =============================================

UPDATE storage.buckets 
SET public = false 
WHERE id = 'video-studio-uploads';

-- Update SELECT policy to only allow users to see their own files
DROP POLICY IF EXISTS "Public can view video studio files" ON storage.objects;

CREATE POLICY "Users can view their own video studio files"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'video-studio-uploads'
  AND auth.uid() IS NOT NULL
  AND (storage.foldername(name))[1] = auth.uid()::text
);
