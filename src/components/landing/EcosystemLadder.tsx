import { Link } from "react-router-dom";
import { 
  Smartphone, 
  Book, 
  Headphones, 
  Users, 
  ChevronRight, 
  CheckCircle,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useExternalLinks } from "@/hooks/use-external-links";
import { cn } from "@/lib/utils";

const ecosystemLevels = [
  {
    level: 1,
    title: "Free App",
    subtitle: "Daily Growth",
    description: "Daily devotionals, prayer tools, and the P.R.O.O.F. framework—completely free",
    icon: Smartphone,
    color: "from-blue-500 to-cyan-500",
    borderColor: "border-blue-500/30",
    action: {
      label: "Start Free",
      to: "/auth?mode=signup",
      type: "internal"
    },
    features: ["Daily Devotionals", "Prayer Journal", "P.R.O.O.F. Course", "Myth Buster Guide"]
  },
  {
    level: 2,
    title: "The Book",
    subtitle: "Deeper Grounding",
    description: "\"Sacred, Not Sinful\" by Dr. Lyman Montgomery—comprehensive theological foundation",
    icon: Book,
    color: "from-purple-500 to-fuchsia-500",
    borderColor: "border-purple-500/30",
    action: {
      label: "Get the Book",
      to: "https://www.amazon.com/dp/B0DPJGM2YT",
      type: "external"
    },
    features: ["Biblical Analysis", "Historical Context", "Practical Application", "Study Questions"]
  },
  {
    level: 3,
    title: "Podcast",
    subtitle: "Stories & Conversation",
    description: "Real stories from Christian Greeks navigating faith and fraternity life",
    icon: Headphones,
    color: "from-orange-500 to-amber-500",
    borderColor: "border-orange-500/30",
    action: {
      label: "Listen Now",
      to: "/podcast",
      type: "internal"
    },
    features: ["Weekly Episodes", "Guest Interviews", "Q&A Sessions", "Community Stories"]
  },
  {
    level: 4,
    title: "Coaching & Community",
    subtitle: "Ongoing Support",
    description: "Personal guidance and a supportive community of fellow Christian Greeks",
    icon: Users,
    color: "from-emerald-500 to-teal-500",
    borderColor: "border-emerald-500/30",
    action: {
      label: "Join Waitlist",
      to: "/coaching-waitlist",
      type: "internal"
    },
    features: ["1-on-1 Coaching", "Group Sessions", "Community Access", "Priority Support"]
  }
];

export function EcosystemLadder() {
  const { openExternalLink } = useExternalLinks();

  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          Your Growth Journey
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
          Start free and go deeper when you're ready. Each step builds on the last.
        </p>
      </div>

      <div className="grid gap-4 sm:gap-6">
        {ecosystemLevels.map((level, index) => {
          const IconComponent = level.icon;
          
          return (
            <div 
              key={level.level}
              className={cn(
                "relative flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 sm:p-6 rounded-xl",
                "bg-slate-800/50 border transition-all hover:bg-slate-800/70",
                level.borderColor
              )}
            >
              {/* Level indicator */}
              <div className="absolute -top-2 -left-2 sm:static w-8 h-8 rounded-full bg-slate-700 border-2 border-slate-600 flex items-center justify-center text-sm font-bold text-white">
                {level.level}
              </div>

              {/* Icon */}
              <div className={cn(
                "w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0",
                "bg-gradient-to-br shadow-lg",
                level.color
              )}>
                <IconComponent className="w-7 h-7 text-white" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-semibold text-white">{level.title}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700 text-slate-300">
                    {level.subtitle}
                  </span>
                </div>
                <p className="text-sm text-slate-400 mb-3">{level.description}</p>
                
                {/* Features */}
                <div className="flex flex-wrap gap-2">
                  {level.features.map((feature) => (
                    <span 
                      key={feature}
                      className="text-xs px-2 py-1 rounded-md bg-slate-700/50 text-slate-300 flex items-center gap-1"
                    >
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action */}
              {level.action.type === "internal" ? (
                <Link to={level.action.to} className="flex-shrink-0">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-slate-600 text-white hover:bg-slate-700 group"
                  >
                    {level.action.label}
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
                  </Button>
                </Link>
              ) : (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => openExternalLink(level.action.to)}
                  className="border-slate-600 text-white hover:bg-slate-700 group flex-shrink-0"
                >
                  {level.action.label}
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              )}

              {/* Connector arrow to next level */}
              {index < ecosystemLevels.length - 1 && (
                <div className="hidden sm:flex absolute -bottom-5 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-slate-800 border border-slate-700 items-center justify-center z-10">
                  <ChevronRight className="w-4 h-4 text-slate-500 rotate-90" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
