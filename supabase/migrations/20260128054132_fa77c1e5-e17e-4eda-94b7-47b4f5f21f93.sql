-- Insert training completion achievements
INSERT INTO public.achievements (achievement_key, achievement_type, title, description, icon, points_required)
VALUES 
  ('greek_life_training_complete', 'training', 'Guild Master', 'Complete all Greek Life & Guild Training modules', 'Landmark', 50),
  ('proof_course_complete', 'training', 'P.R.O.O.F. Graduate', 'Complete all P.R.O.O.F. Course modules', 'Target', 50),
  ('faith_authority_complete', 'training', 'Authority Scholar', 'Complete all Faith & Authority modules', 'Shield', 50),
  ('journey_complete', 'training', '30-Day Champion', 'Complete the 30-Day Spiritual Journey', 'Calendar', 30)
ON CONFLICT (achievement_key) DO NOTHING;