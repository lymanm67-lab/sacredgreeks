-- Add achievement for Hidden in Plain Sight course completion
INSERT INTO achievements (
  achievement_key,
  achievement_type,
  title,
  description,
  icon,
  points_required
) VALUES (
  'hidden_plain_sight_complete',
  'training',
  'Hidden in Plain Sight Master',
  'Completed the Hidden in Plain Sight course exploring pagan roots in modern customs',
  'Eye',
  100
) ON CONFLICT (achievement_key) DO NOTHING;