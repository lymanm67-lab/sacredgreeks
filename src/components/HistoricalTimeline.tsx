import { useState, useRef, forwardRef, useImperativeHandle } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Building2, Church, Users, GraduationCap, Crown, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  category: "ancient" | "guild" | "church" | "masonic" | "greek" | "org";
  icon: React.ElementType;
  colors?: string;
  orgColors?: string;
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
    title: "Phi Beta Kappa (ΦΒΚ)",
    description: "First Greek-letter society established at William & Mary, combining academic excellence with secret fraternal traditions.",
    category: "org",
    icon: GraduationCap,
    colors: "from-pink-400/30 to-sky-400/30 border-pink-400/40",
    orgColors: "Pink and Blue"
  },
  {
    year: "1825",
    title: "Kappa Alpha Society",
    description: "One of the earliest social fraternities, founded at Union College as part of the 'Union Triad.'",
    category: "greek",
    icon: GraduationCap
  },
  // Divine Nine - Individual Organizations
  {
    year: "1906",
    title: "Alpha Phi Alpha (ΑΦΑ)",
    description: "First Black collegiate Greek-letter fraternity, founded at Cornell University. 'First of All, Servants of All, We Shall Transcend All.'",
    category: "org",
    icon: Users,
    colors: "from-yellow-500/40 to-black/30 border-yellow-500/50",
    orgColors: "Black and Old Gold"
  },
  {
    year: "1908",
    title: "Alpha Kappa Alpha (ΑΚΑ)",
    description: "First Black collegiate Greek-letter sorority, founded at Howard University. 'By Culture and By Merit.'",
    category: "org",
    icon: Users,
    colors: "from-pink-400/40 to-green-500/30 border-pink-400/50",
    orgColors: "Salmon Pink and Apple Green"
  },
  {
    year: "1911",
    title: "Kappa Alpha Psi (ΚΑΨ)",
    description: "Founded at Indiana University Bloomington. 'Achievement in Every Field of Human Endeavor.'",
    category: "org",
    icon: Users,
    colors: "from-red-600/40 to-red-200/30 border-red-600/50",
    orgColors: "Crimson and Cream"
  },
  {
    year: "1911",
    title: "Omega Psi Phi (ΩΨΦ)",
    description: "Founded at Howard University. First fraternity founded at an HBCU. 'Friendship is Essential to the Soul.'",
    category: "org",
    icon: Users,
    colors: "from-purple-600/40 to-yellow-500/30 border-purple-600/50",
    orgColors: "Royal Purple and Old Gold"
  },
  {
    year: "1913",
    title: "Delta Sigma Theta (ΔΣΘ)",
    description: "Founded at Howard University. Known for political activism and public service. 'Intelligence is the Torch of Wisdom.'",
    category: "org",
    icon: Users,
    colors: "from-red-600/40 to-white/20 border-red-600/50",
    orgColors: "Crimson and Cream"
  },
  {
    year: "1914",
    title: "Phi Beta Sigma (ΦΒΣ)",
    description: "Founded at Howard University. 'Culture for Service and Service for Humanity.' Constitutional bond with Zeta Phi Beta.",
    category: "org",
    icon: Users,
    colors: "from-blue-600/40 to-white/20 border-blue-600/50",
    orgColors: "Royal Blue and Pure White"
  },
  {
    year: "1920",
    title: "Zeta Phi Beta (ΖΦΒ)",
    description: "Founded at Howard University. First sorority constitutionally bound to a fraternity (Phi Beta Sigma).",
    category: "org",
    icon: Users,
    colors: "from-blue-500/40 to-white/20 border-blue-500/50",
    orgColors: "Royal Blue and Pure White"
  },
  {
    year: "1922",
    title: "Sigma Gamma Rho (ΣΓΡ)",
    description: "Founded at Butler University in Indianapolis. Only Divine Nine sorority founded at a predominantly white institution.",
    category: "org",
    icon: Users,
    colors: "from-blue-400/40 to-yellow-400/30 border-blue-400/50",
    orgColors: "Royal Blue and Gold"
  },
  {
    year: "1963",
    title: "Iota Phi Theta (ΙΦΘ)",
    description: "Founded at Morgan State University. Youngest member of the Divine Nine. 'Building a Tradition, Not Resting Upon One.'",
    category: "org",
    icon: Users,
    colors: "from-amber-700/40 to-yellow-500/30 border-amber-700/50",
    orgColors: "Charcoal Brown and Gilded Gold"
  },
  {
    year: "Present",
    title: "Continuing Legacy",
    description: "Greek organizations continue traditions of scholarship, service, and brotherhood/sisterhood rooted in ancient fraternal practices.",
    category: "greek",
    icon: Users
  }
];

const categoryColors = {
  ancient: "from-amber-500/20 to-amber-600/20 border-amber-500/30",
  guild: "from-blue-500/20 to-blue-600/20 border-blue-500/30",
  church: "from-purple-500/20 to-purple-600/20 border-purple-500/30",
  masonic: "from-slate-500/20 to-slate-600/20 border-slate-500/30",
  greek: "from-sacred/20 to-sacred/30 border-sacred/30",
  org: "from-sacred/20 to-sacred/30 border-sacred/30"
};

const getEventColor = (event: TimelineEvent) => {
  if (event.colors) {
    return event.colors;
  }
  return categoryColors[event.category];
};

const categoryLabels = {
  ancient: "Ancient World",
  guild: "Craft Guilds",
  church: "Early Church",
  masonic: "Masonic Orders",
  greek: "Greek Organizations",
  org: "Fraternities & Sororities"
};

export interface HistoricalTimelineRef {
  scrollIntoView: () => void;
}

export const HistoricalTimeline = forwardRef<HistoricalTimelineRef>((_, ref) => {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    scrollIntoView: () => {
      timelineRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }));

  const scrollTimeline = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const newScrollLeft = direction === "left" 
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      <Card 
        ref={timelineRef}
        id="historical-timeline"
        className="border-sacred/30 bg-gradient-to-br from-muted/30 to-background scroll-mt-20"
      >
        <CardHeader className="pb-2 sm:pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-sacred/10">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-sacred" />
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-sm sm:text-lg leading-tight">Historical Timeline: From Ancient Guilds to Modern Greeks</CardTitle>
              <CardDescription className="text-[10px] sm:text-sm mt-0.5">
                Tracing the fraternal tradition through 4,000 years of history
              </CardDescription>
            </div>
          </div>
          
          {/* Legend - Horizontal scroll on mobile */}
          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 mt-3 sm:mt-4">
            <div className="flex gap-1 sm:gap-2 sm:flex-wrap min-w-max sm:min-w-0">
              {Object.entries(categoryLabels).map(([key, label]) => (
                <Badge
                  key={key}
                  variant="outline"
                  className={`bg-gradient-to-r ${categoryColors[key as keyof typeof categoryColors]} text-[9px] sm:text-xs whitespace-nowrap`}
                >
                  {label}
                </Badge>
              ))}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="px-2 sm:px-6 pt-0">
          {/* Mobile Navigation Arrows */}
          <div className="flex items-center justify-between mb-2 sm:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => scrollTimeline("left")}
              className="h-8 px-2 text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              <span className="text-xs">Earlier</span>
            </Button>
            <span className="text-[10px] text-muted-foreground">Swipe or tap arrows</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => scrollTimeline("right")}
              className="h-8 px-2 text-muted-foreground hover:text-foreground"
            >
              <span className="text-xs">Later</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          {/* Timeline Scroll Container */}
          <div 
            ref={scrollContainerRef}
            className="overflow-x-auto scrollbar-thin scrollbar-thumb-sacred/30 scrollbar-track-transparent scroll-smooth"
          >
            <div className="relative pb-4">
              {/* Timeline Events */}
              <div 
                className="flex gap-3 sm:gap-4 pb-2" 
                style={{ minWidth: `${timelineEvents.length * 130}px` }}
              >
                {timelineEvents.map((event, index) => {
                  const Icon = event.icon;
                  return (
                    <div
                      key={index}
                      className="flex flex-col items-center cursor-pointer group animate-fade-in"
                      style={{ 
                        width: "115px",
                        animationDelay: `${index * 50}ms`,
                        animationFillMode: "both"
                      }}
                      onClick={() => setSelectedEvent(event)}
                    >
                      {/* Year Badge - Above the line */}
                      <Badge 
                        variant="outline" 
                        className="mb-1.5 text-[9px] sm:text-xs font-bold z-10 bg-background group-hover:bg-sacred/10 group-hover:scale-105 transition-all duration-200"
                      >
                        {event.year}
                      </Badge>
                      
                      {/* Connector Dot - On the line */}
                      <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gradient-to-r ${getEventColor(event)} border-2 z-10 relative group-hover:scale-150 transition-transform duration-200`}>
                        {/* Timeline Line Segment */}
                        {index < timelineEvents.length - 1 && (
                          <div className="absolute top-1/2 left-full w-[103px] sm:w-[102px] h-0.5 sm:h-1 -translate-y-1/2 bg-gradient-to-r from-amber-500 via-purple-500 to-sacred opacity-30" />
                        )}
                      </div>
                      
                      {/* Event Card - Below the line */}
                      <div className={`p-2 sm:p-3 rounded-lg bg-gradient-to-br ${getEventColor(event)} border h-full mt-1.5 sm:mt-2 group-hover:shadow-lg group-hover:scale-[1.03] group-hover:-translate-y-1 transition-all duration-200`}>
                        <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
                          <Icon className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
                          <h4 className="text-[9px] sm:text-xs font-bold line-clamp-2 leading-tight">{event.title}</h4>
                        </div>
                        <p className="text-[8px] sm:text-xs text-muted-foreground line-clamp-3 sm:line-clamp-4 leading-snug">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Mobile instruction */}
          <p className="text-[9px] text-muted-foreground text-center mt-1 sm:hidden animate-pulse">
            ← Swipe to explore • Tap for details →
          </p>
          
          {/* Summary */}
          <div className="mt-3 sm:mt-4 p-3 sm:p-4 rounded-lg bg-sacred/5 border border-sacred/20 animate-fade-in" style={{ animationDelay: "500ms" }}>
            <p className="text-[10px] sm:text-sm text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Key Insight:</strong> The fraternal tradition flows unbroken from ancient craft guilds through early church practices to modern Greek organizations. Secret initiations, membership bonds, service, and mutual aid are not inventions of Greek life—they are continuations of practices with deep historical and biblical roots.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Event Detail Dialog */}
      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className={`max-w-[90vw] sm:max-w-md mx-4 ${selectedEvent?.colors ? `bg-gradient-to-br ${selectedEvent.colors}` : ''}`}>
          <DialogHeader>
            <div className="flex items-center gap-2">
              {selectedEvent && <selectedEvent.icon className="w-5 h-5 text-sacred" />}
              <DialogTitle className="text-base sm:text-lg">{selectedEvent?.title}</DialogTitle>
            </div>
            <div className="flex flex-wrap gap-2 mt-1">
              <Badge variant="outline" className="w-fit text-xs">
                {selectedEvent?.year}
              </Badge>
              {selectedEvent?.orgColors && (
                <Badge variant="secondary" className="w-fit text-xs">
                  Colors: {selectedEvent.orgColors}
                </Badge>
              )}
            </div>
          </DialogHeader>
          <DialogDescription className="text-sm text-foreground leading-relaxed">
            {selectedEvent?.description}
          </DialogDescription>
          <div className="mt-2 flex flex-wrap gap-2">
            <Badge className={`bg-gradient-to-r ${selectedEvent ? getEventColor(selectedEvent) : ''} text-xs`}>
              {selectedEvent ? categoryLabels[selectedEvent.category] : ''}
            </Badge>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
});

HistoricalTimeline.displayName = "HistoricalTimeline";
