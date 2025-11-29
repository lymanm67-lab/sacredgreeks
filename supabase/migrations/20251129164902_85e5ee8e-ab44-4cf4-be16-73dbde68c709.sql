-- Fix critical security issues: protect email addresses and sensitive data

-- 1. Drop and recreate healing_stories_public view to ensure email is NEVER exposed
DROP VIEW IF EXISTS public.healing_stories_public;

CREATE VIEW public.healing_stories_public AS
SELECT 
  id,
  story_title,
  story_content,
  healing_type,
  name, -- Only show name if they consented to publish
  organization,
  featured,
  created_at,
  updated_at
FROM public.healing_stories
WHERE approved = true 
  AND consent_to_publish = true;

-- Add comment for documentation
COMMENT ON VIEW public.healing_stories_public IS 'Public view of approved healing stories - email intentionally excluded for privacy';

-- 2. Drop and recreate qa_public_answers view to ensure email is NEVER exposed
DROP VIEW IF EXISTS public.qa_public_answers;

CREATE VIEW public.qa_public_answers AS
SELECT 
  id,
  question,
  answer,
  category,
  is_featured,
  answered_at,
  created_at
FROM public.qa_submissions
WHERE status = 'answered' 
  AND is_public = true;

-- Add comment for documentation
COMMENT ON VIEW public.qa_public_answers IS 'Public view of answered Q&A - email and user_id intentionally excluded for privacy';

-- 3. Create a secure function to check email access for assessment submissions
-- This ensures emails are only returned when the user has proper access
CREATE OR REPLACE FUNCTION public.get_assessment_email_secure(submission_id uuid)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _email text;
  _user_id uuid;
  _consent boolean;
BEGIN
  SELECT email, user_id, consent_to_contact 
  INTO _email, _user_id, _consent
  FROM public.assessment_submissions
  WHERE id = submission_id;
  
  -- Only return email if:
  -- 1. User owns the submission, OR
  -- 2. User is an admin, OR
  -- 3. Consent was given to contact
  IF _user_id = auth.uid() OR has_role(auth.uid(), 'admin') OR _consent = true THEN
    RETURN _email;
  ELSE
    RETURN NULL;
  END IF;
END;
$$;

-- 4. Add policy to prevent anonymous SELECT on assessment_submissions
-- The existing policies look correct, but let's add an explicit deny for unauthenticated
-- Actually, RLS already blocks unauthenticated access by default when enabled

-- 5. Ensure push_subscriptions auth_key and p256dh_key are never exposed in API responses
-- The RLS is correct (users can only see their own), but add a comment
COMMENT ON COLUMN public.push_subscriptions.auth_key IS 'Sensitive: Push notification auth key - only accessible by owner';
COMMENT ON COLUMN public.push_subscriptions.p256dh_key IS 'Sensitive: Push notification encryption key - only accessible by owner';

-- 6. Grant proper permissions on the views
GRANT SELECT ON public.healing_stories_public TO anon, authenticated;
GRANT SELECT ON public.qa_public_answers TO anon, authenticated;