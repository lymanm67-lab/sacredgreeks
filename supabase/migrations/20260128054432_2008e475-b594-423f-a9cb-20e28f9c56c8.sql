-- Update training achievement descriptions to use "Completed" instead of "Complete"
UPDATE public.achievements 
SET description = 'Completed all Greek Life & Guild Training'
WHERE achievement_key = 'greek_life_training_complete';

UPDATE public.achievements 
SET description = 'Completed all P.R.O.O.F. Course modules'
WHERE achievement_key = 'proof_course_complete';

UPDATE public.achievements 
SET description = 'Completed all Faith & Authority modules'
WHERE achievement_key = 'faith_authority_complete';

UPDATE public.achievements 
SET description = 'Completed the 30-Day Spiritual Journey'
WHERE achievement_key = 'journey_complete';