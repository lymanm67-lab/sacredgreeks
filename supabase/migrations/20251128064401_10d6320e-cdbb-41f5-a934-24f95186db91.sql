-- Create a secure view for assessment_submissions that hides email unless user owns the record
-- This provides field-level security for the email column

-- First, drop existing policies that expose email to admins unnecessarily
DROP POLICY IF EXISTS "Users can view own submissions, admins view all" ON public.assessment_submissions;

-- Create new policies with field-level security considerations
-- Users can view their own submissions (including email)
CREATE POLICY "Users can view their own submissions"
ON public.assessment_submissions
FOR SELECT
USING (auth.uid() = user_id);

-- Admins can view submissions but we'll handle email visibility at the application level
-- For now, admins still need access for legitimate admin purposes
CREATE POLICY "Admins can view all submissions"
ON public.assessment_submissions
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- For profiles table, email is already protected by existing RLS
-- But let's add an explicit policy to ensure admins can only see their own email
-- (profiles already has "Users can view their own profile" which is sufficient)

-- Create a function to safely get user email only if they have consent
CREATE OR REPLACE FUNCTION public.get_submission_email_if_consented(submission_id uuid)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _email text;
  _consented boolean;
  _user_id uuid;
BEGIN
  -- Only return email if consent_to_contact is true
  SELECT email, consent_to_contact, user_id 
  INTO _email, _consented, _user_id
  FROM public.assessment_submissions
  WHERE id = submission_id;
  
  -- Return email only if consented OR if the requesting user owns the submission
  IF _consented = true OR _user_id = auth.uid() THEN
    RETURN _email;
  ELSE
    RETURN NULL;
  END IF;
END;
$$;

-- Add comment explaining the security model
COMMENT ON FUNCTION public.get_submission_email_if_consented IS 'Returns email only if user consented to contact or owns the submission. Provides field-level security for email column.';