import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Video, 
  ExternalLink,
  Search,
  Filter,
  Heart,
  Plus,
  ChevronRight
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { format, isPast, isToday, isFuture, parseISO } from "date-fns";
import { toast } from "sonner";

const eventTypes = [
  { value: "all", label: "All Events" },
  { value: "conference", label: "Conferences" },
  { value: "retreat", label: "Retreats" },
  { value: "workshop", label: "Workshops" },
  { value: "service", label: "Service Projects" },
  { value: "prayer", label: "Prayer Events" },
  { value: "social", label: "Social Gatherings" },
];

const typeColors: Record<string, string> = {
  conference: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  retreat: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  workshop: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  service: "bg-green-500/20 text-green-400 border-green-500/30",
  prayer: "bg-sacred/20 text-sacred border-sacred/30",
  social: "bg-pink-500/20 text-pink-400 border-pink-500/30",
  other: "bg-muted text-muted-foreground border-border",
};

interface Event {
  id: string;
  title: string;
  description: string | null;
  event_type: string;
  organization: string | null;
  location_name: string | null;
  city: string | null;
  state: string | null;
  is_virtual: boolean;
  virtual_link: string | null;
  start_date: string;
  end_date: string | null;
  registration_url: string | null;
  is_free: boolean;
  cost_details: string | null;
  image_url: string | null;
}

// Sample events for display
const sampleEvents: Event[] = [
  {
    id: "1",
    title: "Sacred Greeks Annual Faith Conference",
    description: "A weekend of worship, teaching, and fellowship for Greek-affiliated believers. Featuring Dr. Lyman Montgomery and guest speakers.",
    event_type: "conference",
    organization: null,
    location_name: "Grace Community Church",
    city: "Atlanta",
    state: "GA",
    is_virtual: false,
    virtual_link: null,
    start_date: "2026-03-15T09:00:00Z",
    end_date: "2026-03-17T17:00:00Z",
    registration_url: "https://example.com",
    is_free: false,
    cost_details: "$149 early bird / $199 regular",
    image_url: null
  },
  {
    id: "2",
    title: "BGLO Prayer Breakfast",
    description: "Monthly virtual prayer gathering for Divine Nine members. All councils welcome.",
    event_type: "prayer",
    organization: null,
    location_name: null,
    city: null,
    state: null,
    is_virtual: true,
    virtual_link: "https://zoom.us",
    start_date: "2026-02-08T08:00:00Z",
    end_date: "2026-02-08T09:00:00Z",
    registration_url: null,
    is_free: true,
    cost_details: null,
    image_url: null
  },
  {
    id: "3",
    title: "Chapter Chaplain Training Workshop",
    description: "Equipping chapter chaplains with tools for spiritual leadership, conflict resolution, and creating faith-affirming environments.",
    event_type: "workshop",
    organization: null,
    location_name: null,
    city: null,
    state: null,
    is_virtual: true,
    virtual_link: null,
    start_date: "2026-02-22T14:00:00Z",
    end_date: "2026-02-22T17:00:00Z",
    registration_url: "https://example.com",
    is_free: false,
    cost_details: "$49",
    image_url: null
  },
  {
    id: "4",
    title: "D9 Community Service Day",
    description: "Citywide service project partnering with local churches and shelters. Open to all Greek organizations.",
    event_type: "service",
    organization: null,
    location_name: "Multiple Locations",
    city: "Houston",
    state: "TX",
    is_virtual: false,
    virtual_link: null,
    start_date: "2026-04-05T09:00:00Z",
    end_date: "2026-04-05T15:00:00Z",
    registration_url: "https://example.com",
    is_free: true,
    cost_details: null,
    image_url: null
  },
];

function EventCard({ event, onRsvp, userRsvp }: { event: Event; onRsvp: (eventId: string, status: string) => void; userRsvp?: string }) {
  const startDate = parseISO(event.start_date);
  const isPastEvent = isPast(startDate) && !isToday(startDate);
  
  return (
    <Card className={`border-border/50 hover:border-sacred/50 transition-all ${isPastEvent ? 'opacity-60' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge variant="outline" className={typeColors[event.event_type] || typeColors.other}>
                {event.event_type.charAt(0).toUpperCase() + event.event_type.slice(1)}
              </Badge>
              {event.is_virtual && (
                <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/30">
                  <Video className="w-3 h-3 mr-1" />
                  Virtual
                </Badge>
              )}
              {event.is_free && (
                <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30">
                  Free
                </Badge>
              )}
            </div>
            <CardTitle className="text-lg">{event.title}</CardTitle>
          </div>
          <div className="w-14 h-14 rounded-lg bg-sacred/10 flex flex-col items-center justify-center flex-shrink-0">
            <span className="text-xs text-muted-foreground">{format(startDate, 'MMM')}</span>
            <span className="text-xl font-bold text-sacred">{format(startDate, 'd')}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {event.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
        )}
        
        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {format(startDate, 'h:mm a')}
          </span>
          {event.city && event.state && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {event.city}, {event.state}
            </span>
          )}
          {event.cost_details && (
            <span className="text-amber-400">{event.cost_details}</span>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2 pt-2">
          {event.registration_url && (
            <Button size="sm" className="bg-sacred hover:bg-sacred/90" asChild>
              <a href={event.registration_url} target="_blank" rel="noopener noreferrer">
                Register
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </Button>
          )}
          {event.is_virtual && event.virtual_link && (
            <Button variant="outline" size="sm" asChild>
              <a href={event.virtual_link} target="_blank" rel="noopener noreferrer">
                <Video className="w-3 h-3 mr-1" />
                Join Virtual
              </a>
            </Button>
          )}
          {!isPastEvent && (
            <Button 
              variant={userRsvp === 'going' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => onRsvp(event.id, userRsvp === 'going' ? 'not_going' : 'going')}
              className={userRsvp === 'going' ? 'bg-green-600 hover:bg-green-700' : ''}
            >
              <Heart className={`w-3 h-3 mr-1 ${userRsvp === 'going' ? 'fill-current' : ''}`} />
              {userRsvp === 'going' ? "Going" : "Interested"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function EventsCalendar() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [viewMode, setViewMode] = useState<"upcoming" | "past">("upcoming");

  // Fetch events from database
  const { data: dbEvents } = useQuery({
    queryKey: ['greek-events'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('greek_events')
        .select('*')
        .eq('is_approved', true)
        .order('start_date', { ascending: true });
      
      if (error) throw error;
      return data as Event[];
    }
  });

  // Fetch user's RSVPs
  const { data: userRsvps } = useQuery({
    queryKey: ['user-rsvps', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('event_rsvps')
        .select('event_id, status')
        .eq('user_id', user.id);
      
      if (error) throw error;
      return data;
    },
    enabled: !!user
  });

  // RSVP mutation
  const rsvpMutation = useMutation({
    mutationFn: async ({ eventId, status }: { eventId: string; status: string }) => {
      if (!user) throw new Error("Must be logged in");
      
      if (status === 'not_going') {
        await supabase
          .from('event_rsvps')
          .delete()
          .eq('event_id', eventId)
          .eq('user_id', user.id);
      } else {
        await supabase
          .from('event_rsvps')
          .upsert({ event_id: eventId, user_id: user.id, status });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-rsvps'] });
      toast.success("RSVP updated!");
    }
  });

  const handleRsvp = (eventId: string, status: string) => {
    if (!user) {
      toast.error("Please sign in to RSVP");
      return;
    }
    rsvpMutation.mutate({ eventId, status });
  };

  const getRsvpStatus = (eventId: string) => {
    return userRsvps?.find(r => r.event_id === eventId)?.status;
  };

  // Use DB data if available, otherwise use sample data
  const events = dbEvents && dbEvents.length > 0 ? dbEvents : sampleEvents;

  // Filter events
  const filteredEvents = events.filter(event => {
    const matchesSearch = 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (event.description?.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesType = selectedType === "all" || event.event_type === selectedType;
    
    const startDate = parseISO(event.start_date);
    const matchesTiming = viewMode === "upcoming" 
      ? isFuture(startDate) || isToday(startDate)
      : isPast(startDate) && !isToday(startDate);
    
    return matchesSearch && matchesType && matchesTiming;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <PageHeader
          title="Faith & Greek Events"
          description="Conferences, retreats, workshops, and gatherings where faith and Greek life intersect. Connect with like-minded Greeks."
          badge={{ text: "Community", variant: "default" }}
        />

        {/* Value Prop */}
        <Card className="mb-8 bg-gradient-to-r from-sacred/10 to-purple-500/10 border-sacred/30">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-sacred/20 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-sacred" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">Faith-Centered Events</h3>
                <p className="text-sm text-muted-foreground">
                  Events curated for Greek-affiliated believers—conferences, prayer gatherings, and service opportunities.
                </p>
              </div>
              <Button variant="outline" size="sm" className="hidden sm:flex">
                <Plus className="w-4 h-4 mr-1" />
                Submit Event
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Event Type" />
                </SelectTrigger>
                <SelectContent>
                  {eventTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "upcoming" | "past")} className="mb-6">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredEvents.map(event => (
            <EventCard 
              key={event.id} 
              event={event} 
              onRsvp={handleRsvp}
              userRsvp={getRsvpStatus(event.id)}
            />
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No events found</h3>
              <p className="text-sm text-muted-foreground">
                {viewMode === "upcoming" 
                  ? "Check back soon for upcoming faith & Greek events"
                  : "No past events match your filters"}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
