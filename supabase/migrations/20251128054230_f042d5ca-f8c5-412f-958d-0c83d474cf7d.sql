-- Drop the overly permissive public SELECT policy
DROP POLICY IF EXISTS "Shared certificates are viewable by anyone" ON public.shared_certificates;

-- Create a security definer function to check share_token
CREATE OR REPLACE FUNCTION public.can_view_shared_certificate(_share_token text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.shared_certificates
    WHERE share_token = _share_token
      AND (expires_at IS NULL OR expires_at > NOW())
  )
$$;

-- Create new policy that requires share_token validation
CREATE POLICY "Certificates viewable by owner or valid share token"
ON public.shared_certificates
FOR SELECT
USING (
  auth.uid() = user_id 
  OR can_view_shared_certificate(share_token)
);

-- Enable pg_cron and pg_net extensions for scheduled jobs
CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA pg_catalog;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;