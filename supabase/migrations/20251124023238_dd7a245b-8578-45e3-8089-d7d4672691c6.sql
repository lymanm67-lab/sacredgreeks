-- Create community service checklist table
CREATE TABLE public.community_service_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  hours DECIMAL(5,2),
  completed BOOLEAN NOT NULL DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  event_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create chapter meeting notes table
CREATE TABLE public.chapter_meeting_notes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  meeting_date DATE NOT NULL,
  notes TEXT,
  attendees TEXT,
  action_items TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.community_service_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chapter_meeting_notes ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for community service
CREATE POLICY "Users can manage their own community service items"
ON public.community_service_items
FOR ALL
USING (auth.uid() = user_id);

-- Create RLS policies for chapter meeting notes
CREATE POLICY "Users can manage their own chapter meeting notes"
ON public.chapter_meeting_notes
FOR ALL
USING (auth.uid() = user_id);

-- Create triggers for updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_community_service_items_updated_at
BEFORE UPDATE ON public.community_service_items
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_chapter_meeting_notes_updated_at
BEFORE UPDATE ON public.chapter_meeting_notes
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();