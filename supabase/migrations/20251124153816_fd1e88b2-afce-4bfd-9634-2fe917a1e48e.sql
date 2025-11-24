-- Create gamification tables
CREATE TABLE public.user_gamification (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  total_points INTEGER NOT NULL DEFAULT 0,
  current_level INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.achievements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  achievement_key TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  points_required INTEGER NOT NULL,
  achievement_type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.user_achievements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  achievement_id UUID NOT NULL REFERENCES public.achievements(id),
  earned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, achievement_id)
);

-- Enable RLS
ALTER TABLE public.user_gamification ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_gamification
CREATE POLICY "Users can view their own gamification stats"
  ON public.user_gamification FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own gamification stats"
  ON public.user_gamification FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own gamification stats"
  ON public.user_gamification FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for achievements
CREATE POLICY "Anyone can view achievements"
  ON public.achievements FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage achievements"
  ON public.achievements FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for user_achievements
CREATE POLICY "Users can view their own achievements"
  ON public.user_achievements FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own achievements"
  ON public.user_achievements FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Triggers for updated_at
CREATE TRIGGER update_user_gamification_updated_at
  BEFORE UPDATE ON public.user_gamification
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default achievements
INSERT INTO public.achievements (achievement_key, title, description, icon, points_required, achievement_type) VALUES
  ('first_devotional', 'First Steps', 'Complete your first daily devotional', 'BookOpen', 10, 'devotional'),
  ('devotional_streak_7', 'Week Warrior', 'Complete devotionals for 7 days in a row', 'Flame', 50, 'devotional'),
  ('devotional_streak_30', 'Monthly Devotion', 'Complete devotionals for 30 days in a row', 'Award', 200, 'devotional'),
  ('first_study', 'Study Beginner', 'Complete your first study session', 'GraduationCap', 15, 'study'),
  ('all_studies', 'Study Master', 'Complete all 5 study sessions', 'Trophy', 100, 'study'),
  ('first_assessment', 'Self Reflection', 'Complete your first Sacred Greeks assessment', 'Target', 20, 'assessment'),
  ('assessment_streak_3', 'Deep Thinker', 'Complete 3 assessments', 'Brain', 75, 'assessment'),
  ('first_prayer', 'Prayer Starter', 'Add your first prayer to the journal', 'Heart', 10, 'prayer'),
  ('prayer_warrior', 'Prayer Warrior', 'Add 20 prayers to your journal', 'Shield', 150, 'prayer'),
  ('level_5', 'Rising Star', 'Reach level 5', 'Star', 0, 'level'),
  ('level_10', 'Spiritual Leader', 'Reach level 10', 'Crown', 0, 'level');

-- Function to calculate level from points
CREATE OR REPLACE FUNCTION public.calculate_level(points INTEGER)
RETURNS INTEGER
LANGUAGE plpgsql
AS $$
BEGIN
  -- Level = floor(points / 100) + 1, capped at 50
  RETURN LEAST(FLOOR(points / 100.0) + 1, 50);
END;
$$;

-- Function to award points and check for achievements
CREATE OR REPLACE FUNCTION public.award_points(
  _user_id UUID,
  _points INTEGER,
  _action_type TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _current_points INTEGER;
  _new_points INTEGER;
  _old_level INTEGER;
  _new_level INTEGER;
  _new_achievements JSONB := '[]'::JSONB;
  _achievement RECORD;
BEGIN
  -- Get or create gamification record
  INSERT INTO public.user_gamification (user_id, total_points, current_level)
  VALUES (_user_id, 0, 1)
  ON CONFLICT (user_id) DO NOTHING;

  -- Get current stats
  SELECT total_points, current_level INTO _current_points, _old_level
  FROM public.user_gamification
  WHERE user_id = _user_id;

  -- Calculate new points and level
  _new_points := _current_points + _points;
  _new_level := calculate_level(_new_points);

  -- Update gamification record
  UPDATE public.user_gamification
  SET total_points = _new_points,
      current_level = _new_level,
      updated_at = now()
  WHERE user_id = _user_id;

  -- Check for new achievements based on action type
  FOR _achievement IN
    SELECT a.* FROM public.achievements a
    WHERE NOT EXISTS (
      SELECT 1 FROM public.user_achievements ua
      WHERE ua.user_id = _user_id AND ua.achievement_id = a.id
    )
  LOOP
    -- Check if achievement criteria met (simplified logic here)
    IF _achievement.achievement_key = 'level_5' AND _new_level >= 5 AND _old_level < 5 THEN
      INSERT INTO public.user_achievements (user_id, achievement_id)
      VALUES (_user_id, _achievement.id);
      _new_achievements := _new_achievements || jsonb_build_object(
        'title', _achievement.title,
        'description', _achievement.description,
        'icon', _achievement.icon
      );
    ELSIF _achievement.achievement_key = 'level_10' AND _new_level >= 10 AND _old_level < 10 THEN
      INSERT INTO public.user_achievements (user_id, achievement_id)
      VALUES (_user_id, _achievement.id);
      _new_achievements := _new_achievements || jsonb_build_object(
        'title', _achievement.title,
        'description', _achievement.description,
        'icon', _achievement.icon
      );
    END IF;
  END LOOP;

  RETURN jsonb_build_object(
    'points_awarded', _points,
    'total_points', _new_points,
    'old_level', _old_level,
    'new_level', _new_level,
    'level_up', _new_level > _old_level,
    'new_achievements', _new_achievements
  );
END;
$$;