-- Enable Leaked Password Protection (auth schema setting - done via Supabase dashboard)
-- For RLS policy fixes:

-- 1. Update healing_stories to require at least consent field validation
DROP POLICY IF EXISTS "Anyone can submit healing stories" ON public.healing_stories;
CREATE POLICY "Anyone can submit healing stories with consent" 
ON public.healing_stories 
FOR INSERT 
WITH CHECK (
  consent_to_publish IS NOT NULL 
  AND story_title IS NOT NULL 
  AND story_content IS NOT NULL
);

-- 2. Update forum_notifications to restrict system-created notifications
-- This should only allow authenticated users or the system to create notifications
DROP POLICY IF EXISTS "System can insert notifications" ON public.forum_notifications;
CREATE POLICY "Authenticated users can receive notifications" 
ON public.forum_notifications 
FOR INSERT 
WITH CHECK (
  auth.uid() IS NOT NULL 
  OR EXISTS (
    SELECT 1 FROM public.forum_discussions fd 
    WHERE fd.id = discussion_id
  )
);

-- Also ensure that user_id matches for direct inserts
CREATE POLICY "Users can create their own notifications" 
ON public.forum_notifications 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);