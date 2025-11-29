-- ===========================================
-- 1. TIGHTEN PROFILES TABLE RLS
-- ===========================================
-- Profiles are already well protected, but let's ensure consistency

-- ===========================================
-- 2. TIGHTEN ASSESSMENT_SUBMISSIONS EMAIL ACCESS
-- ===========================================
-- Email column should only be readable by owner or admin
-- The get_assessment_email_secure function already handles this
-- But let's add a view for safer access

-- Create a secure view that hides email from non-owners
CREATE OR REPLACE VIEW public.assessment_submissions_safe AS
SELECT 
  id,
  scenario,
  track,
  user_id,
  result_type,
  answers_json,
  scores_json,
  consent_to_contact,
  created_at,
  updated_at,
  CASE 
    WHEN user_id = auth.uid() OR has_role(auth.uid(), 'admin') THEN email
    ELSE NULL
  END as email
FROM public.assessment_submissions;

-- ===========================================
-- 3. TIGHTEN HEALING_STORIES - PROTECT SUBMITTER EMAIL
-- ===========================================
-- Email should only be visible to admins
-- The healing_stories_public view already exists and excludes email

-- ===========================================
-- 4. TIGHTEN QA_SUBMISSIONS - PROTECT EMAIL
-- ===========================================
-- Create a secure view for qa_submissions
CREATE OR REPLACE VIEW public.qa_submissions_safe AS
SELECT 
  id,
  question,
  answer,
  category,
  status,
  is_public,
  is_featured,
  user_id,
  answered_at,
  answered_by,
  created_at,
  updated_at,
  CASE 
    WHEN user_id = auth.uid() OR has_role(auth.uid(), 'admin') THEN email
    ELSE NULL
  END as email
FROM public.qa_submissions;

-- ===========================================
-- 5. FIX ANALYTICS_EVENTS - REMOVE UNSAFE ANONYMOUS INSERT
-- ===========================================
-- Drop the overly permissive anonymous insert policy
DROP POLICY IF EXISTS "Anonymous users can insert analytics events" ON public.analytics_events;

-- Create a more restrictive policy - require session_id for anonymous tracking
CREATE POLICY "Anonymous users can insert analytics with session"
ON public.analytics_events
FOR INSERT
TO anon
WITH CHECK (
  user_id IS NULL 
  AND session_id IS NOT NULL 
  AND length(session_id) >= 10
  AND event_category IN ('pageview', 'navigation', 'interaction')
);

-- ===========================================
-- 6. FIX PRAYER_REQUESTS CHAPTER VISIBILITY
-- ===========================================
-- Drop the overly permissive chapter visibility policy
DROP POLICY IF EXISTS "Users can view chapter requests" ON public.prayer_requests;

-- Create organization-aware chapter visibility
-- Users can only see chapter requests from their own organization
CREATE POLICY "Users can view chapter requests from same org"
ON public.prayer_requests
FOR SELECT
TO authenticated
USING (
  privacy_level = 'chapter' 
  AND EXISTS (
    SELECT 1 FROM public.profiles viewer
    JOIN public.profiles requester ON requester.id = prayer_requests.user_id
    WHERE viewer.id = auth.uid()
    AND (
      -- Same Greek organization
      (viewer.greek_organization IS NOT NULL AND viewer.greek_organization = requester.greek_organization)
      -- OR same Greek council (fallback for broader community)
      OR (viewer.greek_council IS NOT NULL AND viewer.greek_council = requester.greek_council AND viewer.greek_organization IS NULL)
    )
  )
);

-- ===========================================
-- 7. ADD SIMILAR PROTECTION TO PRAYER_REQUEST_COMMENTS
-- ===========================================
-- Update the comments visibility policy
DROP POLICY IF EXISTS "Users can view comments" ON public.prayer_request_comments;

CREATE POLICY "Users can view comments on accessible requests"
ON public.prayer_request_comments
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.prayer_requests pr
    WHERE pr.id = prayer_request_comments.prayer_request_id
    AND (
      -- Own request
      pr.user_id = auth.uid()
      -- Public request
      OR pr.privacy_level = 'public'
      -- Chapter request from same org
      OR (
        pr.privacy_level = 'chapter'
        AND EXISTS (
          SELECT 1 FROM public.profiles viewer
          JOIN public.profiles requester ON requester.id = pr.user_id
          WHERE viewer.id = auth.uid()
          AND (
            (viewer.greek_organization IS NOT NULL AND viewer.greek_organization = requester.greek_organization)
            OR (viewer.greek_council IS NOT NULL AND viewer.greek_council = requester.greek_council AND viewer.greek_organization IS NULL)
          )
        )
      )
    )
  )
);

-- ===========================================
-- 8. UPDATE PRAYER_SUPPORT VISIBILITY
-- ===========================================
DROP POLICY IF EXISTS "Users can view prayer support" ON public.prayer_support;

CREATE POLICY "Users can view prayer support on accessible requests"
ON public.prayer_support
FOR SELECT
TO authenticated
USING (
  auth.uid() = user_id
  OR EXISTS (
    SELECT 1 FROM public.prayer_requests pr
    WHERE pr.id = prayer_support.prayer_request_id
    AND (
      pr.user_id = auth.uid()
      OR pr.privacy_level = 'public'
      OR (
        pr.privacy_level = 'chapter'
        AND EXISTS (
          SELECT 1 FROM public.profiles viewer
          JOIN public.profiles requester ON requester.id = pr.user_id
          WHERE viewer.id = auth.uid()
          AND (
            (viewer.greek_organization IS NOT NULL AND viewer.greek_organization = requester.greek_organization)
            OR (viewer.greek_council IS NOT NULL AND viewer.greek_council = requester.greek_council AND viewer.greek_organization IS NULL)
          )
        )
      )
    )
  )
);

-- ===========================================
-- 9. UPDATE PRAYER_REQUEST_COMMENTS INSERT POLICY
-- ===========================================
DROP POLICY IF EXISTS "Users can add comments" ON public.prayer_request_comments;

CREATE POLICY "Users can add comments on accessible requests"
ON public.prayer_request_comments
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = user_id
  AND EXISTS (
    SELECT 1 FROM public.prayer_requests pr
    WHERE pr.id = prayer_request_comments.prayer_request_id
    AND (
      pr.user_id = auth.uid()
      OR pr.privacy_level = 'public'
      OR (
        pr.privacy_level = 'chapter'
        AND EXISTS (
          SELECT 1 FROM public.profiles viewer
          JOIN public.profiles requester ON requester.id = pr.user_id
          WHERE viewer.id = auth.uid()
          AND (
            (viewer.greek_organization IS NOT NULL AND viewer.greek_organization = requester.greek_organization)
            OR (viewer.greek_council IS NOT NULL AND viewer.greek_council = requester.greek_council AND viewer.greek_organization IS NULL)
          )
        )
      )
    )
  )
);