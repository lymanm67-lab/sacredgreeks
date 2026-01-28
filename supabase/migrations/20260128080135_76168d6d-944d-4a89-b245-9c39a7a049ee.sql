-- Add achievement for Saints or Sellouts course completion
INSERT INTO public.achievements (
  achievement_key,
  title,
  description,
  icon,
  points_required,
  achievement_type,
  greek_council
) VALUES (
  'saints_sellouts_complete',
  'Cultural Navigator',
  'Completed the Saints or Sellouts? course',
  'Crown',
  60,
  'training',
  NULL
);