-- Update constraint to include all assessment track types
ALTER TABLE public.assessment_submissions 
DROP CONSTRAINT assessment_submissions_track_check;

ALTER TABLE public.assessment_submissions 
ADD CONSTRAINT assessment_submissions_track_check 
CHECK (track = ANY (ARRAY['compliance'::text, 'sacred_greeks'::text, 'faith-snapshot'::text, 'proof'::text, 'proof-quiz'::text]));