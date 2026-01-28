-- Add achievement for Stay or Leave course completion
INSERT INTO public.achievements (
  achievement_key,
  title,
  description,
  icon,
  points_required,
  achievement_type,
  greek_council
) VALUES (
  'stay_or_leave_complete',
  'Discernment Graduate',
  'Completed the Should You Stay or Leave? course',
  'Scale',
  60,
  'training',
  NULL
);