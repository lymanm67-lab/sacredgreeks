-- =====================================================
-- CRITICAL SECURITY FIXES - Tighten RLS policies
-- =====================================================

-- 1. FIX: assessment_submissions - Ensure anonymous cannot SELECT
-- Current policies should prevent this, but let's verify by dropping and recreating
-- the user SELECT policy to be more explicit

-- First, let's ensure the policies are correct
-- Anonymous users should ONLY be able to INSERT, never SELECT

-- Drop potentially problematic policies
DROP POLICY IF EXISTS "Users can view own or admins can view all submissions" ON public.assessment_submissions;

-- Recreate with explicit auth check - ONLY authenticated users can view their own
CREATE POLICY "Authenticated users can view own submissions"
ON public.assessment_submissions
FOR SELECT
USING (
  auth.uid() IS NOT NULL 
  AND auth.uid() = user_id
);

-- Admin policy already exists, but let's ensure it's correct
DROP POLICY IF EXISTS "Admins can view all submissions" ON public.assessment_submissions;
CREATE POLICY "Admins can view all submissions"
ON public.assessment_submissions
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- 2. FIX: healing_stories - No public SELECT on base table
-- Public should ONLY access via the healing_stories_public view
-- Base table should be admin-only for SELECT

-- The "Admins can manage all healing stories" ALL policy handles admin access
-- No other SELECT policy should exist for the base table
-- This is already correct - admins only via ALL policy

-- 3. FIX: qa_submissions - Tighten SELECT policies  
-- Remove the duplicate policy if it exists
DROP POLICY IF EXISTS "Users view own questions or public answers without email" ON public.qa_submissions;
DROP POLICY IF EXISTS "Users view own or admins view all" ON public.qa_submissions;
DROP POLICY IF EXISTS "Users can view their own questions" ON public.qa_submissions;

-- Recreate clean policies
CREATE POLICY "Users can view their own questions"
ON public.qa_submissions
FOR SELECT
USING (auth.uid() IS NOT NULL AND auth.uid() = user_id);

-- Admin access (if not covered by ALL)
CREATE POLICY "Admins can view all qa submissions"
ON public.qa_submissions
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));