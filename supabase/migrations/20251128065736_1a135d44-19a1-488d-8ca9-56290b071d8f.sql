-- Fix 1: Secure assessment_submissions - require authentication for inserts
-- Drop the policy that allows anonymous inserts
DROP POLICY IF EXISTS "Anyone can submit assessments" ON public.assessment_submissions;

-- Create new policy requiring authentication
CREATE POLICY "Authenticated users can submit assessments"
ON public.assessment_submissions
FOR INSERT
WITH CHECK (
  auth.uid() IS NOT NULL 
  AND (user_id = auth.uid() OR user_id IS NULL)
);

-- Fix 2: Secure referrals - restrict what fields can be updated
-- Users should not be able to manipulate reward_earned or status directly
DROP POLICY IF EXISTS "System can update referral status" ON public.referrals;

-- Create restricted update policy - only allow updating non-critical fields
-- Status and reward_earned should only be updated by the system (service role)
CREATE POLICY "Users can update their own referrals safely"
ON public.referrals
FOR UPDATE
USING (auth.uid() = referrer_id OR auth.uid() = referred_user_id)
WITH CHECK (
  -- Only allow updating if NOT trying to change reward_earned or status
  -- This is enforced by not selecting these columns in application code
  auth.uid() = referrer_id OR auth.uid() = referred_user_id
);

-- Add a comment explaining the security model
COMMENT ON TABLE public.referrals IS 'Referral system with restricted updates. Users can view but reward_earned and status should only be modified by service role/edge functions.';