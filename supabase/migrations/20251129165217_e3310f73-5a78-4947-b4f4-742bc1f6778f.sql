-- Additional security hardening for tables with email addresses

-- 1. For assessment_submissions: Ensure anonymous submissions (user_id IS NULL) 
-- can only be viewed by admins, not by other authenticated users
DROP POLICY IF EXISTS "Only admins can view anonymous submissions" ON public.assessment_submissions;

-- Add policy to prevent authenticated users from viewing anonymous submissions
CREATE POLICY "Only admins can view anonymous submissions" 
ON public.assessment_submissions 
FOR SELECT 
USING (
  -- Either user owns the submission
  (user_id IS NOT NULL AND auth.uid() = user_id)
  OR
  -- Or user is admin (can see all)
  has_role(auth.uid(), 'admin')
);

-- 2. Drop the overlapping policy
DROP POLICY IF EXISTS "Authenticated users can view own submissions" ON public.assessment_submissions;

-- 3. Restrict security_scan_results insertion to prevent data pollution
DROP POLICY IF EXISTS "System can insert scan results" ON public.security_scan_results;

-- Only allow insertion when auth.uid() is null (service role key / edge functions)
CREATE POLICY "Only service role can insert scan results" 
ON public.security_scan_results 
FOR INSERT 
WITH CHECK (auth.uid() IS NULL);

-- 4. Fix referrals - simpler approach: only referrers can update
DROP POLICY IF EXISTS "Users can update their own referrals safely" ON public.referrals;

CREATE POLICY "Only referrers can update their referrals" 
ON public.referrals 
FOR UPDATE 
USING (auth.uid() = referrer_id)
WITH CHECK (auth.uid() = referrer_id);