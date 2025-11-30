import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalContentModal } from "@/components/ui/ExternalContentModal";
import { Calendar, BookOpen, Sparkles, Users, PenLine, Drama, LucideIcon } from "lucide-react";

interface CoreFeature {
  title: string;
  description: string;
  icon: LucideIcon;
  link: string;
  color: string;
  badge?: string;
  isExternal?: boolean;
  useModal?: boolean;
}

const coreFeatures: CoreFeature[] = [
  {
    title: "Shattered Masks Assessment",
    description: "Discover your archetype and understand how you navigate identity, faith, and Greek life",
    icon: Drama,
    link: "https://drlymanmontgomery.involve.me/shattered-masks-archetype-assessment",
    color: "from-fuchsia-500 to-pink-600",
    badge: "Start Here",
    isExternal: true,
    useModal: true,
  },
  {
    title: "30-Day Journey",
    description: "Daily readings, scriptures, and reflections walking you through the P.R.O.O.F. framework",
    icon: Calendar,
    link: "/journey",
    color: "from-sacred to-warm-blue",
    badge: "Foundation",
  },
  {
    title: "Myth Buster Library",
    description: "Searchable biblical responses to common accusations about Greek life",
    icon: BookOpen,
    link: "/myth-buster",
    color: "from-purple-500 to-violet-600",
  },
  {
    title: "Symbol & Ritual Guide",
    description: "Christian perspectives on Greek symbolism with guidance on participation",
    icon: Sparkles,
    link: "/symbol-guide",
    color: "from-amber-500 to-orange-600",
  },
  {
    title: "Ask Dr. Lyman",
    description: "Submit questions and get curated answers on theology, family, and campus ministry",
    icon: Users,
    link: "/ask-dr-lyman",
    color: "from-teal-500 to-emerald-600",
  },
  {
    title: "Prayer Journal",
    description: "Track your prayers, record answers, and grow in your relationship with God",
    icon: PenLine,
    link: "/prayer-journal",
    color: "from-rose-500 to-pink-600",
  },
];

export function CoreFeaturesSection() {
  return (
    <div id="core-features" className="container mx-auto px-4 py-16 bg-gradient-to-b from-muted/30 to-background scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <Badge className="bg-sky-500/20 text-sky-400 border-sky-400/30 mb-4">For the Christian Greek at Midnight</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            You Don't Have to <span className="shimmer-text">Choose</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Scrolling through denouncement videos? Feeling torn between your faith and your letters? This app is for you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {coreFeatures.map((feature) => {
            const cardContent = (
              <Card className="feature-card h-full transition-all hover:scale-[1.03] border-2 cursor-pointer group overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${feature.color}`} />
                <CardHeader className="space-y-3 pb-2">
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    {feature.badge && (
                      <Badge className="bg-sacred text-white animate-pulse">{feature.badge}</Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg group-hover:text-sacred transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
            
            if (feature.isExternal && feature.useModal) {
              return (
                <ExternalContentModal
                  key={feature.title}
                  url={feature.link}
                  title={feature.title}
                  description={feature.description}
                  trigger={<div className="cursor-pointer">{cardContent}</div>}
                />
              );
            }
            
            if (feature.isExternal) {
              return (
                <a key={feature.title} href={feature.link} target="_blank" rel="noopener noreferrer">
                  {cardContent}
                </a>
              );
            }
            
            return (
              <Link key={feature.title} to={feature.link}>
                {cardContent}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
