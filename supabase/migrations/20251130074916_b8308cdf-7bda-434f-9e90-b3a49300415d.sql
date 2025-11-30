-- Fix 1: Add explicit RLS policies to prevent public access to sensitive tables
-- These policies ensure only authenticated users can access their own data

-- Ensure profiles table has explicit deny for unauthenticated
DROP POLICY IF EXISTS "Block public access to profiles" ON public.profiles;
CREATE POLICY "Block public access to profiles"
ON public.profiles
FOR SELECT
TO anon
USING (false);

-- Ensure assessment_submissions email is protected
DROP POLICY IF EXISTS "Block public read of assessments" ON public.assessment_submissions;
CREATE POLICY "Block public read of assessments"
ON public.assessment_submissions
FOR SELECT
TO anon
USING (false);

-- Protect healing_stories from public read (only approved via view)
DROP POLICY IF EXISTS "Block direct public read of healing stories" ON public.healing_stories;
CREATE POLICY "Block direct public read of healing stories"
ON public.healing_stories
FOR SELECT
TO anon
USING (false);

-- Protect qa_submissions from public read
DROP POLICY IF EXISTS "Block public read of qa submissions" ON public.qa_submissions;
CREATE POLICY "Block public read of qa submissions"
ON public.qa_submissions
FOR SELECT
TO anon
USING (false);

-- Protect push_subscriptions (already has user-only policies but add explicit deny)
DROP POLICY IF EXISTS "Block public access to push subscriptions" ON public.push_subscriptions;
CREATE POLICY "Block public access to push subscriptions"
ON public.push_subscriptions
FOR ALL
TO anon
USING (false);

-- Protect prayer_journal from any public access
DROP POLICY IF EXISTS "Block public access to prayer journal" ON public.prayer_journal;
CREATE POLICY "Block public access to prayer journal"
ON public.prayer_journal
FOR ALL
TO anon
USING (false);

-- Protect user_progress from public access
DROP POLICY IF EXISTS "Block public access to user progress" ON public.user_progress;
CREATE POLICY "Block public access to user progress"
ON public.user_progress
FOR ALL
TO anon
USING (false);

-- Protect forum_notifications from public access
DROP POLICY IF EXISTS "Block public access to forum notifications" ON public.forum_notifications;
CREATE POLICY "Block public access to forum notifications"
ON public.forum_notifications
FOR ALL
TO anon
USING (false);

-- Protect bookmarks from public access  
DROP POLICY IF EXISTS "Block public access to bookmarks" ON public.bookmarks;
CREATE POLICY "Block public access to bookmarks"
ON public.bookmarks
FOR ALL
TO anon
USING (false);

-- Protect user_gamification from public access
DROP POLICY IF EXISTS "Block public access to gamification" ON public.user_gamification;
CREATE POLICY "Block public access to gamification"
ON public.user_gamification
FOR ALL
TO anon
USING (false);

-- Protect user_achievements from public access
DROP POLICY IF EXISTS "Block public access to user achievements" ON public.user_achievements;
CREATE POLICY "Block public access to user achievements"
ON public.user_achievements
FOR ALL
TO anon
USING (false);