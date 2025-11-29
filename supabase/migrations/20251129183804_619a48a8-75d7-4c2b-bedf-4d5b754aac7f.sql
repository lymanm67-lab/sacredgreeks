-- Add council field to achievements table for org-specific achievements
ALTER TABLE public.achievements ADD COLUMN IF NOT EXISTS greek_council text DEFAULT NULL;

-- Insert org-specific achievements
INSERT INTO public.achievements (achievement_key, title, description, icon, points_required, achievement_type, greek_council) VALUES
-- NPHC Achievements
('nphc_community_champion', 'Community Champion', 'Complete 5 community service activities representing Divine Nine values', 'Heart', 50, 'service', 'nphc'),
('nphc_prayer_warrior', 'Prayer Warrior', 'Lead 10 prayers for your chapter brothers or sisters', 'Shield', 75, 'prayer', 'nphc'),
('nphc_study_scholar', 'Study Scholar', 'Complete all 5 study guide sessions with org-specific content', 'GraduationCap', 100, 'study', 'nphc'),
('nphc_devotional_disciple', 'Devotional Disciple', 'Complete 30 daily devotionals', 'BookOpen', 150, 'devotional', 'nphc'),

-- NPC Achievements
('npc_sisterhood_keeper', 'Sisterhood Keeper', 'Support 10 sisters through prayer requests', 'Heart', 50, 'community', 'npc'),
('npc_faith_leader', 'Faith Leader', 'Complete the 5-session study guide with sorority applications', 'Crown', 100, 'study', 'npc'),
('npc_panhellenic_prayer', 'Panhellenic Prayer Champion', 'Participate in 15 community prayers', 'Shield', 75, 'prayer', 'npc'),

-- NIC Achievements
('nic_brotherhood_bond', 'Brotherhood Bond', 'Support 10 brothers through prayer requests', 'Heart', 50, 'community', 'nic'),
('nic_servant_leader', 'Servant Leader', 'Complete 5 service activities as a fraternity man', 'Trophy', 75, 'service', 'nic'),
('nic_faith_foundation', 'Faith Foundation', 'Complete all study sessions with fraternity applications', 'GraduationCap', 100, 'study', 'nic'),

-- NALFO Achievements
('nalfo_cultural_faith', 'Cultural Faith Ambassador', 'Complete devotionals exploring faith and Latino/a heritage', 'Star', 75, 'devotional', 'nalfo'),
('nalfo_hermandad', 'Hermandad Spirit', 'Support 10 hermanos/hermanas through prayer', 'Heart', 50, 'community', 'nalfo'),

-- NAPA Achievements
('napa_heritage_keeper', 'Heritage Keeper', 'Complete study sessions connecting faith with Asian heritage', 'Star', 75, 'study', 'napa'),
('napa_community_builder', 'Community Builder', 'Participate in 10 community discussions', 'Heart', 50, 'community', 'napa'),

-- NMGC Achievements
('nmgc_multicultural_light', 'Multicultural Light', 'Share faith journey in multicultural context', 'Star', 75, 'devotional', 'nmgc'),
('nmgc_bridge_builder', 'Bridge Builder', 'Connect with 10 members across organizations', 'Heart', 50, 'community', 'nmgc'),

-- Professional Achievements
('professional_workplace_witness', 'Workplace Witness', 'Apply faith principles in professional settings (5 reflections)', 'Target', 75, 'reflection', 'professional'),
('professional_mentor', 'Faith Mentor', 'Support 5 members through career prayer requests', 'Crown', 50, 'community', 'professional'),

-- Honor Society Achievements
('honor_academic_faith', 'Academic Faith', 'Complete study sessions on faith and scholarship', 'GraduationCap', 100, 'study', 'honor'),
('honor_integrity_keeper', 'Integrity Keeper', 'Complete integrity-focused devotionals for 21 days', 'Shield', 75, 'devotional', 'honor'),

-- Universal Org Achievements
('first_org_prayer', 'First Chapter Prayer', 'Write your first prayer for your organization', 'Flame', 10, 'milestone', NULL),
('org_study_starter', 'Org Study Starter', 'Complete your first org-specific study session', 'BookOpen', 15, 'milestone', NULL),
('forum_contributor', 'Forum Contributor', 'Post your first discussion in the community forum', 'Brain', 10, 'community', NULL),
('discussion_leader', 'Discussion Leader', 'Start 5 forum discussions', 'Crown', 50, 'community', NULL),
('helpful_responder', 'Helpful Responder', 'Reply to 10 forum discussions', 'Heart', 40, 'community', NULL)
ON CONFLICT (achievement_key) DO NOTHING;

-- Create forum discussions table
CREATE TABLE IF NOT EXISTS public.forum_discussions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  content text NOT NULL,
  category text NOT NULL DEFAULT 'general',
  greek_council text,
  greek_organization text,
  is_pinned boolean DEFAULT false,
  view_count integer DEFAULT 0,
  reply_count integer DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create forum replies table
CREATE TABLE IF NOT EXISTS public.forum_replies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  discussion_id uuid NOT NULL REFERENCES public.forum_discussions(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content text NOT NULL,
  is_best_answer boolean DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.forum_discussions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_replies ENABLE ROW LEVEL SECURITY;

-- RLS policies for forum_discussions
CREATE POLICY "Anyone can view forum discussions" ON public.forum_discussions
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create discussions" ON public.forum_discussions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own discussions" ON public.forum_discussions
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own discussions" ON public.forum_discussions
  FOR DELETE USING (auth.uid() = user_id);

-- RLS policies for forum_replies
CREATE POLICY "Anyone can view forum replies" ON public.forum_replies
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create replies" ON public.forum_replies
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own replies" ON public.forum_replies
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own replies" ON public.forum_replies
  FOR DELETE USING (auth.uid() = user_id);

-- Create function to update reply count
CREATE OR REPLACE FUNCTION public.update_discussion_reply_count()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.forum_discussions
    SET reply_count = reply_count + 1
    WHERE id = NEW.discussion_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.forum_discussions
    SET reply_count = reply_count - 1
    WHERE id = OLD.discussion_id;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$;

-- Create trigger for reply count
DROP TRIGGER IF EXISTS update_reply_count_trigger ON public.forum_replies;
CREATE TRIGGER update_reply_count_trigger
  AFTER INSERT OR DELETE ON public.forum_replies
  FOR EACH ROW
  EXECUTE FUNCTION public.update_discussion_reply_count();

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_forum_discussions_council ON public.forum_discussions(greek_council);
CREATE INDEX IF NOT EXISTS idx_forum_discussions_category ON public.forum_discussions(category);
CREATE INDEX IF NOT EXISTS idx_forum_replies_discussion ON public.forum_replies(discussion_id);
CREATE INDEX IF NOT EXISTS idx_achievements_council ON public.achievements(greek_council);