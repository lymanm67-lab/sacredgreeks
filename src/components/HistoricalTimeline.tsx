import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Building2, Church, Users, GraduationCap, Crown, BookOpen, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  category: "ancient" | "guild" | "church" | "masonic" | "greek";
  icon: React.ElementType;
}

const timelineEvents: TimelineEvent[] = [
  {
    year: "2000 BC",
    title: "Ancient Craft Guilds",
    description: "Egyptian and Mesopotamian craftsmen form guilds with secret techniques, initiations, and trade secrets passed from master to apprentice.",
    category: "ancient",
    icon: Building2
  },
  {
    year: "1000 BC",
    title: "Temple Builders (Solomon's Temple)",
    description: "Stonemasons and carpenters organize with guild marks, secret techniques, and fraternal structures for Temple construction (1 Kings 5-6).",
    category: "guild",
    icon: Building2
  },
  {
    year: "200 BC",
    title: "Roman Collegia",
    description: "Professional associations with patron deities, initiation rituals, common meals, burial funds, and mutual aid flourish across the Roman Empire.",
    category: "ancient",
    icon: Crown
  },
  {
    year: "30 AD",
    title: "Jesus the Tekton",
    description: "Jesus works as a master craftsman (tekton) in the carpenter's guild for ~18 years, learning guild secrets, techniques, and fraternal bonds.",
    category: "guild",
    icon: Building2
  },
  {
    year: "50-100 AD",
    title: "Early Church Secret Practices",
    description: "Christians use secret symbols (Ichthys), passwords (Maranatha), handshakes, and 1-3 year initiation processes during persecution.",
    category: "church",
    icon: Church
  },
  {
    year: "215 AD",
    title: "Catechumenate Formalized",
    description: "Hippolytus documents the formal Christian initiation process including sponsors, instruction, exorcisms, disrobing, baptism, and new robes.",
    category: "church",
    icon: Church
  },
  {
    year: "500-1500 AD",
    title: "Medieval Craft Guilds",
    description: "Stonemasons, carpenters, glassmakers, and other craftsmen form powerful guilds with apprenticeships, secret marks, and fraternal structures.",
    category: "guild",
    icon: Building2
  },
  {
    year: "1717",
    title: "Freemasonry Organized",
    description: "Modern Freemasonry established in London, preserving ancient guild traditions with degrees, initiations, and fraternal bonds.",
    category: "masonic",
    icon: Crown
  },
  {
    year: "1775",
    title: "Prince Hall Freemasonry",
    description: "Prince Hall establishes the first Black fraternal organization in America, creating a foundation for future African American fraternal traditions.",
    category: "masonic",
    icon: Crown
  },
  {
    year: "1776",
    title: "Phi Beta Kappa Founded",
    description: "First Greek-letter society established at William & Mary, combining academic excellence with secret fraternal traditions.",
    category: "greek",
    icon: GraduationCap
  },
  {
    year: "1825-1850",
    title: "College Fraternities Emerge",
    description: "Social fraternities spread across American colleges with Greek letters, secret rituals, and brotherhood bonds.",
    category: "greek",
    icon: GraduationCap
  },
  {
    year: "1906",
    title: "Alpha Phi Alpha Founded",
    description: "First Black collegiate Greek-letter fraternity established at Cornell University, beginning the Divine Nine tradition.",
    category: "greek",
    icon: Users
  },
  {
    year: "1908",
    title: "Alpha Kappa Alpha Founded",
    description: "First Black collegiate Greek-letter sorority established at Howard University.",
    category: "greek",
    icon: Users
  },
  {
    year: "1911-1920",
    title: "Divine Nine Expansion",
    description: "Remaining NPHC organizations founded: Kappa Alpha Psi, Omega Psi Phi, Delta Sigma Theta, Phi Beta Sigma, Zeta Phi Beta.",
    category: "greek",
    icon: Users
  },
  {
    year: "1922",
    title: "Sigma Gamma Rho Founded",
    description: "Sigma Gamma Rho Sorority founded at Butler University, completing the core Divine Nine organizations.",
    category: "greek",
    icon: Users
  },
  {
    year: "1930",
    title: "NPHC Established",
    description: "National Pan-Hellenic Council formed to coordinate the nine historically Black Greek organizations.",
    category: "greek",
    icon: Users
  },
  {
    year: "1963",
    title: "Iota Phi Theta Founded",
    description: "Final Divine Nine organization established at Morgan State University.",
    category: "greek",
    icon: Users
  },
  {
    year: "Present",
    title: "Continuing Legacy",
    description: "Divine Nine organizations continue traditions of scholarship, service, and brotherhood/sisterhood rooted in ancient fraternal practices.",
    category: "greek",
    icon: Users
  }
];

const categoryColors = {
  ancient: "from-amber-500/20 to-amber-600/20 border-amber-500/30",
  guild: "from-blue-500/20 to-blue-600/20 border-blue-500/30",
  church: "from-purple-500/20 to-purple-600/20 border-purple-500/30",
  masonic: "from-gray-500/20 to-gray-600/20 border-gray-500/30",
  greek: "from-sacred/20 to-sacred/30 border-sacred/30"
};

const categoryLabels = {
  ancient: "Ancient World",
  guild: "Craft Guilds",
  church: "Early Church",
  masonic: "Masonic Orders",
  greek: "Greek Organizations"
};

export const HistoricalTimeline = () => {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);

  return (
    <>
      <Card className="border-sacred/30 bg-gradient-to-br from-muted/30 to-background">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-sacred/10">
              <BookOpen className="w-6 h-6 text-sacred" />
            </div>
            <div>
              <CardTitle className="text-base sm:text-lg">Historical Timeline: From Ancient Guilds to Modern Greeks</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Tracing the fraternal tradition through 4,000 years of history
              </CardDescription>
            </div>
          </div>
          
          {/* Legend - Scrollable on mobile */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-4">
            {Object.entries(categoryLabels).map(([key, label]) => (
              <Badge
                key={key}
                variant="outline"
                className={`bg-gradient-to-r ${categoryColors[key as keyof typeof categoryColors]} text-xs`}
              >
                {label}
              </Badge>
            ))}
          </div>
        </CardHeader>
        
        <CardContent className="px-2 sm:px-6">
          <ScrollArea className="w-full">
            <div className="relative pb-4">
              {/* Timeline Events */}
              <div className="flex gap-2 sm:gap-4 pb-2" style={{ minWidth: `${timelineEvents.length * 140}px` }}>
                {timelineEvents.map((event, index) => {
                  const Icon = event.icon;
                  return (
                    <div
                      key={index}
                      className="flex flex-col items-center cursor-pointer group"
                      style={{ width: "120px" }}
                      onClick={() => setSelectedEvent(event)}
                    >
                      {/* Year Badge - Above the line */}
                      <Badge variant="outline" className="mb-1.5 text-[10px] sm:text-xs font-bold z-10 bg-background group-hover:bg-sacred/10 transition-colors">
                        {event.year}
                      </Badge>
                      
                      {/* Connector Dot - On the line */}
                      <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gradient-to-r ${categoryColors[event.category]} border-2 z-10 relative group-hover:scale-125 transition-transform`}>
                        {/* Timeline Line Segment */}
                        {index < timelineEvents.length - 1 && (
                          <div className="absolute top-1/2 left-full w-[108px] sm:w-[104px] h-0.5 sm:h-1 -translate-y-1/2 bg-gradient-to-r from-amber-500 via-purple-500 to-sacred opacity-30" />
                        )}
                      </div>
                      
                      {/* Event Card - Below the line */}
                      <div className={`p-2 sm:p-3 rounded-lg bg-gradient-to-br ${categoryColors[event.category]} border h-full mt-1.5 sm:mt-2 group-hover:shadow-lg group-hover:scale-[1.02] transition-all`}>
                        <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
                          <Icon className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
                          <h4 className="text-[10px] sm:text-xs font-bold line-clamp-2">{event.title}</h4>
                        </div>
                        <p className="text-[9px] sm:text-xs text-muted-foreground line-clamp-3 sm:line-clamp-4">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          
          {/* Tap hint for mobile */}
          <p className="text-[10px] text-muted-foreground text-center mt-2 sm:hidden">
            Tap any event for details
          </p>
          
          {/* Summary */}
          <div className="mt-3 sm:mt-4 p-3 sm:p-4 rounded-lg bg-sacred/5 border border-sacred/20">
            <p className="text-xs sm:text-sm text-muted-foreground">
              <strong className="text-foreground">Key Insight:</strong> The fraternal tradition flows unbroken from ancient craft guilds through early church practices to modern Greek organizations. Secret initiations, membership bonds, service, and mutual aid are not inventions of Greek life—they are continuations of practices with deep historical and biblical roots.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Event Detail Dialog */}
      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-2">
              {selectedEvent && <selectedEvent.icon className="w-5 h-5 text-sacred" />}
              <DialogTitle className="text-lg">{selectedEvent?.title}</DialogTitle>
            </div>
            <Badge variant="outline" className="w-fit mt-1">
              {selectedEvent?.year}
            </Badge>
          </DialogHeader>
          <DialogDescription className="text-sm text-foreground">
            {selectedEvent?.description}
          </DialogDescription>
          <div className="mt-2">
            <Badge className={`bg-gradient-to-r ${selectedEvent ? categoryColors[selectedEvent.category] : ''}`}>
              {selectedEvent ? categoryLabels[selectedEvent.category] : ''}
            </Badge>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
