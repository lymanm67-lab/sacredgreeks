-- Daily Challenges System
CREATE TABLE public.daily_challenges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  challenge_type TEXT NOT NULL, -- 'devotional', 'prayer', 'reflection', 'study', 'service'
  points_reward INTEGER NOT NULL DEFAULT 10,
  icon TEXT NOT NULL DEFAULT 'target',
  requirements_json JSONB NOT NULL DEFAULT '[]'::jsonb, -- Array of requirements like [{type: 'complete_devotional', count: 1}]
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX idx_daily_challenges_date ON public.daily_challenges(date);

-- Daily Verse of the Day
CREATE TABLE public.daily_verses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL UNIQUE,
  verse_ref TEXT NOT NULL,
  verse_text TEXT NOT NULL,
  theme TEXT NOT NULL,
  reflection TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX idx_daily_verses_date ON public.daily_verses(date);

-- User Daily Progress (enhanced with quick check-ins)
CREATE TABLE public.user_daily_check_ins (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  date DATE NOT NULL,
  prayed_today BOOLEAN DEFAULT false,
  read_bible BOOLEAN DEFAULT false,
  served_others BOOLEAN DEFAULT false,
  grateful_for TEXT,
  quick_reflection TEXT,
  challenges_completed JSONB DEFAULT '[]'::jsonb, -- Array of completed challenge IDs
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, date)
);

CREATE INDEX idx_user_daily_check_ins_user_date ON public.user_daily_check_ins(user_id, date);

-- Enable RLS
ALTER TABLE public.daily_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_verses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_daily_check_ins ENABLE ROW LEVEL SECURITY;

-- RLS Policies for daily_challenges (public read)
CREATE POLICY "Anyone can view daily challenges"
ON public.daily_challenges
FOR SELECT
USING (true);

-- RLS Policies for daily_verses (public read)
CREATE POLICY "Anyone can view daily verses"
ON public.daily_verses
FOR SELECT
USING (true);

-- RLS Policies for user_daily_check_ins
CREATE POLICY "Users can view their own check-ins"
ON public.user_daily_check_ins
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own check-ins"
ON public.user_daily_check_ins
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own check-ins"
ON public.user_daily_check_ins
FOR UPDATE
USING (auth.uid() = user_id);

-- Trigger for updated_at
CREATE TRIGGER update_user_daily_check_ins_updated_at
BEFORE UPDATE ON public.user_daily_check_ins
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Insert sample daily challenges for the next 7 days
INSERT INTO public.daily_challenges (date, title, description, challenge_type, points_reward, icon, requirements_json) VALUES
  (CURRENT_DATE, 'Complete the Trifecta', 'Complete today''s devotional, add a prayer journal entry, and reflect on one thing you''re grateful for', 'combo', 30, 'trophy', '[{"type": "devotional", "count": 1}, {"type": "prayer", "count": 1}, {"type": "gratitude", "count": 1}]'),
  (CURRENT_DATE, 'Scripture Deep Dive', 'Read today''s devotional and write a personal reflection', 'devotional', 15, 'book-open', '[{"type": "devotional", "count": 1}, {"type": "reflection", "count": 1}]'),
  (CURRENT_DATE, 'Prayer Warrior', 'Add 2 new prayer requests to your journal', 'prayer', 10, 'heart', '[{"type": "prayer", "count": 2}]'),
  (CURRENT_DATE + INTERVAL '1 day', 'Consistency Champion', 'Log in and check in for 2 days in a row', 'streak', 20, 'flame', '[{"type": "daily_check_in", "count": 1}]'),
  (CURRENT_DATE + INTERVAL '2 day', 'Study Guide Explorer', 'Complete one study guide session', 'study', 25, 'graduation-cap', '[{"type": "study_session", "count": 1}]'),
  (CURRENT_DATE + INTERVAL '3 day', 'Servant Leader', 'Log a community service activity', 'service', 20, 'users', '[{"type": "service", "count": 1}]'),
  (CURRENT_DATE + INTERVAL '4 day', 'Weekend Warrior', 'Complete devotional + prayer + gratitude on the weekend', 'combo', 30, 'star', '[{"type": "devotional", "count": 1}, {"type": "prayer", "count": 1}, {"type": "gratitude", "count": 1}]');

-- Insert sample verses for the next 7 days
INSERT INTO public.daily_verses (date, verse_ref, verse_text, theme, reflection) VALUES
  (CURRENT_DATE, 'Philippians 4:13', 'I can do all things through Christ who strengthens me.', 'Strength', 'When challenges seem overwhelming, remember that your strength doesn''t come from yourself alone. Christ empowers you to overcome every obstacle.'),
  (CURRENT_DATE + INTERVAL '1 day', 'Proverbs 3:5-6', 'Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.', 'Trust', 'Surrendering control and trusting God''s guidance brings clarity and peace to life''s journey.'),
  (CURRENT_DATE + INTERVAL '2 day', 'Matthew 5:16', 'Let your light shine before others, that they may see your good deeds and glorify your Father in heaven.', 'Witness', 'Your actions speak louder than words. Live in a way that draws others to Christ.'),
  (CURRENT_DATE + INTERVAL '3 day', 'Romans 12:12', 'Be joyful in hope, patient in affliction, faithful in prayer.', 'Perseverance', 'The three pillars of Christian endurance: hope that brings joy, patience in trials, and consistent prayer.'),
  (CURRENT_DATE + INTERVAL '4 day', 'Galatians 6:9', 'Let us not become weary in doing good, for at the proper time we will reap a harvest if we do not give up.', 'Perseverance', 'Your faithful service and good works are never in vain. Keep pressing forward.'),
  (CURRENT_DATE + INTERVAL '5 day', '1 Corinthians 13:13', 'And now these three remain: faith, hope and love. But the greatest of these is love.', 'Love', 'Among all virtues, love stands supreme. It''s the foundation of our faith and the mark of true discipleship.'),
  (CURRENT_DATE + INTERVAL '6 day', 'Joshua 1:9', 'Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.', 'Courage', 'God''s presence eliminates fear. He goes before you and stands with you in every situation.');