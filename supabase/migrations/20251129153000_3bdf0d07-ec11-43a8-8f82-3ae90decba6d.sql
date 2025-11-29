-- =====================================================
-- FIX: Grant public access to secure views
-- =====================================================

-- These views already exclude email addresses and only show approved content
-- They are designed to be publicly accessible

-- 1. Grant SELECT on healing_stories_public view to all roles
GRANT SELECT ON public.healing_stories_public TO anon, authenticated;

-- 2. Grant SELECT on qa_public_answers view to all roles  
GRANT SELECT ON public.qa_public_answers TO anon, authenticated;