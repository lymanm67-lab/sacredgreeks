import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Building2, Church, Users, GraduationCap, Crown, BookOpen } from "lucide-react";

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
  return (
    <Card className="border-sacred/30 bg-gradient-to-br from-muted/30 to-background">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-sacred/10">
            <BookOpen className="w-6 h-6 text-sacred" />
          </div>
          <div>
            <CardTitle>Historical Timeline: From Ancient Guilds to Modern Greeks</CardTitle>
            <CardDescription>
              Tracing the fraternal tradition through 4,000 years of history
            </CardDescription>
          </div>
        </div>
        
        {/* Legend */}
        <div className="flex flex-wrap gap-2 mt-4">
          {Object.entries(categoryLabels).map(([key, label]) => (
            <Badge
              key={key}
              variant="outline"
              className={`bg-gradient-to-r ${categoryColors[key as keyof typeof categoryColors]}`}
            >
              {label}
            </Badge>
          ))}
        </div>
      </CardHeader>
      
      <CardContent>
        <ScrollArea className="w-full">
          <div className="relative pb-4">
            {/* Timeline Line */}
            <div className="absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-purple-500 to-sacred" />
            
            {/* Timeline Events */}
            <div className="flex gap-4 pt-0 pb-2" style={{ minWidth: `${timelineEvents.length * 200}px` }}>
              {timelineEvents.map((event, index) => {
                const Icon = event.icon;
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center"
                    style={{ width: "180px" }}
                  >
                    {/* Connector Dot */}
                    <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${categoryColors[event.category]} border-2 mb-2 z-10`} />
                    
                    {/* Year Badge */}
                    <Badge variant="outline" className="mb-2 text-xs font-bold">
                      {event.year}
                    </Badge>
                    
                    {/* Event Card */}
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${categoryColors[event.category]} border h-full`}>
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className="w-4 h-4 shrink-0" />
                        <h4 className="text-xs font-bold line-clamp-2">{event.title}</h4>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-4">
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
        
        {/* Summary */}
        <div className="mt-4 p-4 rounded-lg bg-sacred/5 border border-sacred/20">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Key Insight:</strong> The fraternal tradition flows unbroken from ancient craft guilds through early church practices to modern Greek organizations. Secret initiations, membership bonds, service, and mutual aid are not inventions of Greek life—they are continuations of practices with deep historical and biblical roots.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
