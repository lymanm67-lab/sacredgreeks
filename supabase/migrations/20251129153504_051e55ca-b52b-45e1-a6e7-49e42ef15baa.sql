-- Create table to store security scan results
CREATE TABLE public.security_scan_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  scan_type TEXT NOT NULL DEFAULT 'weekly',
  status TEXT NOT NULL DEFAULT 'completed',
  findings_json JSONB NOT NULL DEFAULT '[]'::jsonb,
  critical_count INTEGER NOT NULL DEFAULT 0,
  warning_count INTEGER NOT NULL DEFAULT 0,
  info_count INTEGER NOT NULL DEFAULT 0,
  scanned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.security_scan_results ENABLE ROW LEVEL SECURITY;

-- Only admins can view scan results
CREATE POLICY "Admins can view security scan results"
ON public.security_scan_results
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Only system can insert (via service role)
CREATE POLICY "System can insert scan results"
ON public.security_scan_results
FOR INSERT
WITH CHECK (true);

-- Create index for faster queries
CREATE INDEX idx_security_scan_results_scanned_at ON public.security_scan_results(scanned_at DESC);