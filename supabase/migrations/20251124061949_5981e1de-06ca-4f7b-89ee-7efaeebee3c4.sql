-- Fix #1: Update RLS policies for assessment_submissions to properly handle anonymous submissions

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Users can insert their own submissions" ON public.assessment_submissions;
DROP POLICY IF EXISTS "Users can update their own submissions" ON public.assessment_submissions;
DROP POLICY IF EXISTS "Users can view their own submissions or admins can view all" ON public.assessment_submissions;

-- Create new policies that properly handle anonymous (NULL user_id) submissions

-- Allow anyone (authenticated or anonymous) to insert submissions
CREATE POLICY "Anyone can submit assessments"
ON public.assessment_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (
  -- Either authenticated user submitting their own, or anonymous submission
  (auth.uid() = user_id) OR (user_id IS NULL)
);

-- Allow users to view their own submissions, anonymous users cannot view any, admins can view all
CREATE POLICY "Users can view own submissions, admins view all"
ON public.assessment_submissions
FOR SELECT
TO authenticated
USING (
  (auth.uid() = user_id) OR 
  has_role(auth.uid(), 'admin'::app_role)
);

-- Only authenticated users can update their own submissions (not anonymous)
CREATE POLICY "Authenticated users can update own submissions"
ON public.assessment_submissions
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id AND user_id IS NOT NULL)
WITH CHECK (auth.uid() = user_id AND user_id IS NOT NULL);