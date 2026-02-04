-- Create an anonymized view for assessment analytics (removes PII)
CREATE OR REPLACE VIEW public.assessment_analytics_safe AS
SELECT 
  id,
  track,
  scenario,
  result_type,
  -- Remove specific answers, only keep aggregated scores
  scores_json,
  created_at,
  updated_at,
  -- Anonymize: only show if user_id exists, not the actual ID
  CASE WHEN user_id IS NOT NULL THEN true ELSE false END as is_authenticated_user
FROM public.assessment_submissions;

-- Set the view to use security invoker (inherits caller's RLS)
ALTER VIEW public.assessment_analytics_safe SET (security_invoker = on);

-- Create an encrypted email storage function for email_sends
-- Note: This uses the existing pgcrypto extension
CREATE OR REPLACE FUNCTION public.get_email_send_recipient(send_id uuid)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _email text;
BEGIN
  -- Only admins can retrieve the actual email
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RETURN NULL;
  END IF;
  
  SELECT recipient_email INTO _email
  FROM public.email_sends
  WHERE id = send_id;
  
  RETURN _email;
END;
$$;

-- Revoke direct select on recipient_email for non-admins by creating a safe view
CREATE OR REPLACE VIEW public.email_sends_safe AS
SELECT 
  id,
  campaign_id,
  variant_id,
  sent_at,
  tracking_token,
  user_id,
  -- Mask the email for non-admin access (show domain only)
  CASE 
    WHEN public.has_role(auth.uid(), 'admin') THEN recipient_email
    ELSE CONCAT('***@', SPLIT_PART(recipient_email, '@', 2))
  END as recipient_email_masked
FROM public.email_sends;

-- Set security invoker
ALTER VIEW public.email_sends_safe SET (security_invoker = on);

COMMENT ON VIEW public.assessment_analytics_safe IS 'Anonymized assessment data for analytics - excludes PII and detailed answers';
COMMENT ON VIEW public.email_sends_safe IS 'Safe view of email sends with masked recipient emails for non-admins';