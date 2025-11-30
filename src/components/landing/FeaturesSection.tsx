import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useSubscription } from "@/hooks/use-subscription";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalContentModal } from "@/components/ui/ExternalContentModal";
import { Heart, Users, Sparkles, Calendar, Headphones, Library, Lock, Crown, LucideIcon } from "lucide-react";

interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
  link: string;
  color: string;
  requiresAuth?: boolean;
  isPremium?: boolean;
  lockBadgeText?: string;
  isExternal?: boolean;
  useModal?: boolean;
}

const features: Feature[] = [
  {
    title: "Resources Hub",
    description: "Access articles, teachings, testimonials, 5-session study guide, and the complete Sacred Greeks content library",
    icon: Library,
    link: "/resources",
    color: "text-warm-blue",
    requiresAuth: false,
  },
  {
    title: "Daily Devotionals",
    description: "Start each day with Scripture-based reflections focused on the P.R.O.O.F. framework",
    icon: Calendar,
    link: "/devotional",
    color: "text-blue-500",
    requiresAuth: true,
    lockBadgeText: "Daily guidance delivered",
  },
  {
    title: "AI Bible Study Tools",
    description: "Get AI-powered verse searches, study recommendations, and personalized spiritual insights",
    icon: Sparkles,
    link: "/bible-study",
    color: "text-sacred",
    requiresAuth: true,
    isPremium: true,
    lockBadgeText: "Pro Feature",
  },
  {
    title: "Response Coach",
    description: "Practice responding to tough questions about faith and Greek life with AI-powered feedback",
    icon: Users,
    link: "/guide",
    color: "text-teal-500",
    requiresAuth: true,
    isPremium: true,
    lockBadgeText: "Pro Feature",
  },
  {
    title: "5 Persona Assessment",
    description: "Discover your unique 5 Persona Types Architecture with this comprehensive assessment",
    icon: Heart,
    link: "https://drlymanmontgomery.involve.me/fmmpa",
    color: "text-sacred",
    isExternal: true,
    useModal: true,
    requiresAuth: false,
  },
  {
    title: "Podcast",
    description: "Listen to study guide sessions and teachings on the go with the Sacred Greeks podcast",
    icon: Headphones,
    link: "/podcast",
    color: "text-purple-500",
    requiresAuth: false,
  },
];

export function FeaturesSection() {
  const { user } = useAuth();
  const { subscribed } = useSubscription();

  return (
    <div id="more-features" className="container mx-auto px-4 py-16 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in-up">
            Powerful Benefits That <span className="gradient-text">Transform</span> Your Life
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in-up-delay-1">
            Experience real transformation as you grow spiritually
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => {
            const isExternal = feature.isExternal || false;
            const requiresAuth = feature.requiresAuth || false;
            const isPremium = feature.isPremium || false;
            const showLockBadge = requiresAuth && !user;
            const showPremiumBadge = isPremium && user && !subscribed;
            const premiumLocked = isPremium && !subscribed;
            
            const getLink = () => {
              if (!user) return "/auth";
              if (premiumLocked) return "/subscription";
              return feature.link;
            };
            
            if (isExternal && feature.useModal) {
              return (
                <ExternalContentModal
                  key={feature.title}
                  url={feature.link}
                  title={feature.title}
                  description={feature.description}
                  trigger={
                    <div className="cursor-pointer">
                      <Card className="h-full transition-all hover:shadow-lg hover:scale-105 border-2 hover:border-sacred/50 cursor-pointer group animate-fade-in card-glow" style={{ animationDelay: `${index * 0.1}s` }}>
                        <CardHeader className="space-y-4">
                          <div className="flex items-start justify-between">
                            <div className="w-14 h-14 rounded-lg bg-muted flex items-center justify-center group-hover:bg-sacred/10 group-hover:scale-110 transition-all">
                              <feature.icon className={`w-7 h-7 ${feature.color}`} />
                            </div>
                          </div>
                          <CardTitle className="text-xl group-hover:text-sacred transition-colors">
                            {feature.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="text-base">
                            {feature.description}
                          </CardDescription>
                        </CardContent>
                      </Card>
                    </div>
                  }
                />
              );
            }
            
            if (isExternal) {
              return (
                <a 
                  key={feature.title} 
                  href={feature.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Card className="h-full transition-all hover:shadow-lg hover:scale-105 border-2 hover:border-sacred/50 cursor-pointer group animate-fade-in card-glow" style={{ animationDelay: `${index * 0.1}s` }}>
                    <CardHeader className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="w-14 h-14 rounded-lg bg-muted flex items-center justify-center group-hover:bg-sacred/10 group-hover:scale-110 transition-all">
                          <feature.icon className={`w-7 h-7 ${feature.color}`} />
                        </div>
                      </div>
                      <CardTitle className="text-xl group-hover:text-sacred transition-colors">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </a>
              );
            }
            
            return (
              <Link key={feature.title} to={getLink()}>
                <Card className={`h-full transition-all hover:shadow-lg hover:scale-105 border-2 hover:border-sacred/50 cursor-pointer group animate-fade-in card-glow ${isPremium ? 'border-purple-500/30 bg-gradient-to-br from-purple-500/5 to-sacred/5' : ''}`} style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardHeader className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className={`w-14 h-14 rounded-lg flex items-center justify-center group-hover:scale-110 transition-all ${isPremium ? 'bg-gradient-to-br from-purple-500/20 to-sacred/20' : 'bg-muted group-hover:bg-sacred/10'}`}>
                        <feature.icon className={`w-7 h-7 ${feature.color}`} />
                      </div>
                      {showPremiumBadge && (
                        <Badge className="bg-gradient-to-r from-purple-500 to-sacred text-white flex items-center gap-1 text-xs">
                          <Crown className="w-3 h-3" />
                          Pro
                        </Badge>
                      )}
                      {showLockBadge && !isPremium && (
                        <Badge variant="secondary" className="bg-sacred/10 text-sacred border-sacred/20 flex items-center gap-1 text-xs">
                          <Lock className="w-3 h-3" />
                          {feature.lockBadgeText || "Sign up"}
                        </Badge>
                      )}
                      {showLockBadge && isPremium && (
                        <Badge className="bg-gradient-to-r from-purple-500 to-sacred text-white flex items-center gap-1 text-xs">
                          <Crown className="w-3 h-3" />
                          Pro
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl group-hover:text-sacred transition-colors">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                    {showLockBadge && !isPremium && (
                      <p className="text-xs text-sacred mt-3 font-medium">
                        Create a free account to unlock
                      </p>
                    )}
                    {(showPremiumBadge || (showLockBadge && isPremium)) && (
                      <p className="text-xs text-purple-600 dark:text-purple-400 mt-3 font-medium">
                        Start your free trial to unlock
                      </p>
                    )}
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
