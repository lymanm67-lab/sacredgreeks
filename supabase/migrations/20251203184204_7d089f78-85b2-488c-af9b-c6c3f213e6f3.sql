-- Create gifted_subscriptions table for admin-granted subscriptions
CREATE TABLE public.gifted_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  tier text NOT NULL CHECK (tier IN ('pro', 'ministry')),
  gifted_by uuid NOT NULL,
  reason text,
  starts_at timestamp with time zone NOT NULL DEFAULT now(),
  expires_at timestamp with time zone,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.gifted_subscriptions ENABLE ROW LEVEL SECURITY;

-- Only admins can manage gifted subscriptions
CREATE POLICY "Admins can manage gifted subscriptions"
ON public.gifted_subscriptions
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Users can view their own gifted subscriptions
CREATE POLICY "Users can view their own gifted subscriptions"
ON public.gifted_subscriptions
FOR SELECT
USING (auth.uid() = user_id);

-- Create index for faster lookups
CREATE INDEX idx_gifted_subscriptions_user_id ON public.gifted_subscriptions(user_id);
CREATE INDEX idx_gifted_subscriptions_active ON public.gifted_subscriptions(user_id, is_active) WHERE is_active = true;