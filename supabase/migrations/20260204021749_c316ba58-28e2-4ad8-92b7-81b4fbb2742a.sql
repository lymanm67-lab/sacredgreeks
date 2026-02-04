-- Enable RLS on email_sends table if not already enabled
ALTER TABLE public.email_sends ENABLE ROW LEVEL SECURITY;

-- Drop any existing permissive policies
DROP POLICY IF EXISTS "Anyone can read email_sends" ON public.email_sends;
DROP POLICY IF EXISTS "Public can read email_sends" ON public.email_sends;

-- Create restrictive policy: Only admins can read email_sends
CREATE POLICY "Only admins can read email_sends"
ON public.email_sends
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create policy for admins to insert
CREATE POLICY "Only admins can insert email_sends"
ON public.email_sends
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create policy for admins to update
CREATE POLICY "Only admins can update email_sends"
ON public.email_sends
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create policy for admins to delete
CREATE POLICY "Only admins can delete email_sends"
ON public.email_sends
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));