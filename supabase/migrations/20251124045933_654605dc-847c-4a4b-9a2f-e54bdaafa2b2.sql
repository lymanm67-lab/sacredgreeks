-- Add RLS policies for admin management of devotionals
CREATE POLICY "Admins can insert devotionals"
ON public.daily_devotionals
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update devotionals"
ON public.daily_devotionals
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete devotionals"
ON public.daily_devotionals
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));