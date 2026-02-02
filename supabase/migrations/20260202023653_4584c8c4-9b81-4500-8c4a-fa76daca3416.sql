-- Create D9 Business Directory table (curated/admin-managed)
CREATE TABLE public.d9_business_directory (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  business_name TEXT NOT NULL,
  owner_name TEXT NOT NULL,
  greek_organization TEXT NOT NULL,
  business_category TEXT NOT NULL,
  description TEXT NOT NULL,
  website_url TEXT,
  phone TEXT,
  email TEXT,
  location_city TEXT,
  location_state TEXT,
  faith_statement TEXT,
  logo_url TEXT,
  featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.d9_business_directory ENABLE ROW LEVEL SECURITY;

-- Public read access for active listings
CREATE POLICY "Anyone can view active business listings"
ON public.d9_business_directory
FOR SELECT
USING (is_active = true);

-- Only admins can manage listings
CREATE POLICY "Admins can manage business listings"
ON public.d9_business_directory
FOR ALL
USING (has_role(auth.uid(), 'admin'));

-- Add updated_at trigger
CREATE TRIGGER update_d9_business_directory_updated_at
BEFORE UPDATE ON public.d9_business_directory
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();