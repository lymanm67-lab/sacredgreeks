import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Sun, LucideIcon } from "lucide-react";

interface CoreFeature {
  title: string;
  description: string;
  icon: LucideIcon;
  link: string;
  color: string;
  badge?: string;
}

const coreFeatures: CoreFeature[] = [
  {
    title: "Daily Devotional",
    description: "Scripture and reflection for Christian Greeks",
    icon: Sun,
    link: "/devotional",
    color: "from-amber-500 to-orange-500",
    badge: "Free",
  },
  {
    title: "30-Day Journey",
    description: "Walk through the P.R.O.O.F. framework",
    icon: Calendar,
    link: "/journey",
    color: "from-sacred to-warm-blue",
    badge: "Free",
  },
];

export function CoreFeaturesSection() {
  return (
    <div id="core-features" className="container mx-auto px-4 py-10">
      <div className="max-w-xl mx-auto">
        <div className="grid grid-cols-2 gap-3">
          {coreFeatures.map((feature) => (
            <Link key={feature.title} to={feature.link}>
              <Card className="h-full transition-all hover:scale-[1.02] border cursor-pointer group">
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform shadow-md`}>
                      <feature.icon className="w-5 h-5 text-white" />
                    </div>
                    {feature.badge && (
                      <Badge variant="secondary" className="text-xs">{feature.badge}</Badge>
                    )}
                  </div>
                  <h3 className="font-semibold text-sm group-hover:text-sacred transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-4">
          <Link 
            to="/sacred-greeks" 
            className="text-sm text-muted-foreground hover:text-sacred transition-colors underline-offset-4 hover:underline"
          >
            Explore all features →
          </Link>
        </div>
      </div>
    </div>
  );
}