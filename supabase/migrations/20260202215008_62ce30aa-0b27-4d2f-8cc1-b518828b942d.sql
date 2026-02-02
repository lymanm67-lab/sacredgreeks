-- Fix webinar_registrations RLS to protect guest registrations
-- Issue: Policy allows viewing registrations where user_id IS NULL, exposing PII

-- Drop the problematic policy
DROP POLICY IF EXISTS "Users can view their own registrations" ON public.webinar_registrations;

-- Create proper policy - users can ONLY see their own registrations (not guest/anonymous ones)
CREATE POLICY "Users can view their own registrations"
ON public.webinar_registrations
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Block anonymous users from reading any registrations
DROP POLICY IF EXISTS "Block anonymous read" ON public.webinar_registrations;
CREATE POLICY "Block anonymous read"
ON public.webinar_registrations
FOR SELECT
TO anon
USING (false);

-- Add comment for documentation
COMMENT ON TABLE public.webinar_registrations IS 'Webinar registrations with PII. Only admins can view all registrations, authenticated users can only see their own.';