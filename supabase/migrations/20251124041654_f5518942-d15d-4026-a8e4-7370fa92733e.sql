-- Fix shared_results RLS policy to validate tokens server-side

-- Create function to validate share token
CREATE OR REPLACE FUNCTION public.can_view_shared_result(_share_token text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.shared_results
    WHERE share_token = _share_token
      AND (expires_at IS NULL OR expires_at > NOW())
  )
$$;

-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Anyone can view shared results with valid token" ON public.shared_results;

-- Create new policy that validates the token server-side
CREATE POLICY "Validate token before viewing shared results"
  ON public.shared_results
  FOR SELECT
  USING (
    auth.uid() = shared_by 
    OR public.can_view_shared_result(share_token)
  );

-- Add comment for documentation
COMMENT ON FUNCTION public.can_view_shared_result IS 'Validates if a share token is valid and not expired. Used by RLS policy to secure shared results access.';