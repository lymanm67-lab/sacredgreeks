-- Update the Hidden in Plain Sight achievement from 100 to 120 points
UPDATE public.achievements 
SET points_required = 120
WHERE achievement_key = 'hidden_plain_sight_complete';