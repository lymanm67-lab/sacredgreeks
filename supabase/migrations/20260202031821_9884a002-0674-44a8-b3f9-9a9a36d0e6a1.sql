-- D9 Business Directory already exists, enhance it
-- Add member_networking table for faith-focused connections
CREATE TABLE IF NOT EXISTS public.member_connections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    requester_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    recipient_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined')),
    message TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(requester_id, recipient_id)
);

-- Chapter/Group finder
CREATE TABLE IF NOT EXISTS public.greek_chapters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization TEXT NOT NULL,
    chapter_name TEXT NOT NULL,
    school_name TEXT,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    is_faith_focused BOOLEAN DEFAULT false,
    website_url TEXT,
    contact_email TEXT,
    description TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    submitted_by UUID REFERENCES auth.users(id)
);

-- Events Calendar
CREATE TABLE IF NOT EXISTS public.greek_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    event_type TEXT NOT NULL CHECK (event_type IN ('conference', 'retreat', 'workshop', 'service', 'social', 'prayer', 'other')),
    organization TEXT,
    location_name TEXT,
    city TEXT,
    state TEXT,
    is_virtual BOOLEAN DEFAULT false,
    virtual_link TEXT,
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ,
    registration_url TEXT,
    is_free BOOLEAN DEFAULT true,
    cost_details TEXT,
    image_url TEXT,
    is_approved BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    submitted_by UUID REFERENCES auth.users(id)
);

-- Event RSVPs
CREATE TABLE IF NOT EXISTS public.event_rsvps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID NOT NULL REFERENCES public.greek_events(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'going' CHECK (status IN ('going', 'interested', 'not_going')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(event_id, user_id)
);

-- Enable RLS
ALTER TABLE public.member_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.greek_chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.greek_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_rsvps ENABLE ROW LEVEL SECURITY;

-- RLS Policies for member_connections
CREATE POLICY "Users can view their own connections"
ON public.member_connections FOR SELECT
USING (auth.uid() = requester_id OR auth.uid() = recipient_id);

CREATE POLICY "Users can create connection requests"
ON public.member_connections FOR INSERT
WITH CHECK (auth.uid() = requester_id);

CREATE POLICY "Users can update connections they're part of"
ON public.member_connections FOR UPDATE
USING (auth.uid() = requester_id OR auth.uid() = recipient_id);

CREATE POLICY "Users can delete their own requests"
ON public.member_connections FOR DELETE
USING (auth.uid() = requester_id);

-- RLS Policies for greek_chapters (public read, auth write)
CREATE POLICY "Anyone can view chapters"
ON public.greek_chapters FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can submit chapters"
ON public.greek_chapters FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

-- RLS Policies for greek_events (public read approved, auth write)
CREATE POLICY "Anyone can view approved events"
ON public.greek_events FOR SELECT
USING (is_approved = true OR submitted_by = auth.uid());

CREATE POLICY "Authenticated users can submit events"
ON public.greek_events FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update their own events"
ON public.greek_events FOR UPDATE
USING (submitted_by = auth.uid());

-- RLS Policies for event_rsvps
CREATE POLICY "Users can view RSVPs for events"
ON public.event_rsvps FOR SELECT
USING (true);

CREATE POLICY "Users can RSVP to events"
ON public.event_rsvps FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their RSVP"
ON public.event_rsvps FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can remove their RSVP"
ON public.event_rsvps FOR DELETE
USING (auth.uid() = user_id);

-- Enable realtime for events
ALTER PUBLICATION supabase_realtime ADD TABLE public.greek_events;
ALTER PUBLICATION supabase_realtime ADD TABLE public.event_rsvps;