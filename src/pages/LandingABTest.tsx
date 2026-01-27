import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDemoMode } from "@/contexts/DemoModeContext";
import { useLandingABTest } from "@/hooks/use-landing-ab-test";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ThemeToggle";
import logo from "@/assets/sacred-greeks-logo.png";
import { cn } from "@/lib/utils";
import { 
  Sparkles, 
  CheckCircle2, 
  Users, 
  Shield, 
  Clock, 
  ArrowRight,
  Quote,
  Loader2,
  MessageCircle,
  Church,
  Heart
} from "lucide-react";

// Pain points that address survey anxiety and criticisms
const painPoints = [
  {
    icon: MessageCircle,
    title: '"Are fraternities even Christian?"',
    description: "Get biblical clarity on Greek life — no judgment, just truth.",
    gradient: "from-teal-500 to-cyan-500"
  },
  {
    icon: Shield,
    title: "Handle Criticism Confidently",
    description: "Learn how to respond when family, church, or friends question your decision.",
    gradient: "from-purple-500 to-violet-500"
  },
  {
    icon: Heart,
    title: "Faith + Fraternity, United",
    description: "You don't have to choose. We'll show you how to thrive in both.",
    gradient: "from-emerald-500 to-teal-500"
  }
];

// Social proof testimonial
const testimonial = {
  quote: "My pastor said Greek life was 'spiritually dangerous.' Sacred Greeks gave me the biblical foundation to have an honest conversation with him. Now he's supportive.",
  author: "Jasmine K.",
  org: "Delta Sigma Theta, Spelman College",
  avatar: "✨"
};

export default function LandingABTest() {
  const navigate = useNavigate();
  const { setDemoMode } = useDemoMode();
  const { variant, isLoading, trackConversion } = useLandingABTest();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleCTAClick = async () => {
    setIsNavigating(true);
    await trackConversion('cta_click');
    await trackConversion('snapshot_started');
    navigate('/snapshot');
  };

  const handleDemoClick = async () => {
    await trackConversion('demo_started');
    setDemoMode(true);
    navigate('/dashboard');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[hsl(210,60%,6%)] via-[hsl(220,50%,10%)] to-[hsl(180,40%,8%)] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-teal-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(210,60%,6%)] via-[hsl(220,50%,10%)] to-[hsl(180,40%,8%)] flex flex-col overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 left-1/4 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }} />
      </div>

      {/* Header */}
      <header className="border-b border-teal-500/20 bg-[hsl(210,60%,6%)]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-2">
              <img
                src={logo}
                alt="Sacred Greeks"
                className="h-8 w-8 rounded-full object-cover ring-2 ring-teal-500/30"
              />
              <span className="font-semibold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                Sacred Greeks
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/auth')}
                className="text-cyan-200 hover:text-white hover:bg-teal-900/50"
              >
                Sign In
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col relative z-10">
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            {/* Badge */}
            <Badge className="mb-6 bg-gradient-to-r from-teal-500/20 to-emerald-500/20 text-teal-400 border-teal-500/30 hover:bg-teal-500/30 animate-bounce">
              <Sparkles className="w-3 h-3 mr-1" />
              Free Faith Snapshot Assessment
            </Badge>

            {/* A/B Tested Headline with gradient */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-cyan-200 to-teal-200 bg-clip-text text-transparent">
                {variant?.headline || "Faith + Greek Life, United"}
              </span>
            </h1>

            {/* A/B Tested Subheadline */}
            <p className="text-lg sm:text-xl text-cyan-200/90 mb-10 max-w-2xl mx-auto leading-relaxed">
              {variant?.subheadline || "Stop feeling torn. Get biblical clarity on Greek life, handle criticism with confidence, and thrive in both worlds."}
            </p>

            {/* Primary CTA with glow effect */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button
                size="lg"
                onClick={handleCTAClick}
                disabled={isNavigating}
                className="relative bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-500 hover:from-teal-600 hover:via-emerald-600 hover:to-cyan-600 text-white font-semibold px-10 py-7 text-xl rounded-2xl shadow-2xl shadow-teal-500/30 transition-all hover:shadow-teal-500/50 hover:scale-105 group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                <span className="relative flex items-center">
                  {isNavigating ? (
                    <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                  ) : (
                    <Sparkles className="w-6 h-6 mr-2" />
                  )}
                  {variant?.cta_text || "Start Free Snapshot"}
                  <ArrowRight className="w-6 h-6 ml-2" />
                </span>
              </Button>
            </div>

            {/* Secondary action */}
            <p className="text-sm text-cyan-300/70">
              or{" "}
              <button 
                onClick={handleDemoClick}
                className="text-teal-400 hover:text-teal-300 underline underline-offset-2 transition-colors"
              >
                explore with sample data first
              </button>
            </p>

            {/* Trust indicators with colored icons */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-cyan-200">
              <div className="flex items-center gap-2 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>100% Free</span>
              </div>
              <div className="flex items-center gap-2 bg-cyan-500/10 px-4 py-2 rounded-full border border-cyan-500/20">
                <Clock className="w-5 h-5 text-cyan-400" />
                <span>3 Minutes</span>
              </div>
              <div className="flex items-center gap-2 bg-purple-500/10 px-4 py-2 rounded-full border border-purple-500/20">
                <Shield className="w-5 h-5 text-purple-400" />
                <span>Judgment-Free</span>
              </div>
            </div>
          </div>
        </section>

        {/* Pain Points Section with colorful cards */}
        <section className="py-16 px-4 bg-gradient-to-b from-transparent via-teal-900/10 to-transparent">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold text-center mb-4">
              <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                We Get It.
              </span>
            </h2>
            <p className="text-center text-cyan-200/80 mb-12 max-w-2xl mx-auto">
              Being a Christian in Greek life comes with questions. We're here with answers.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {painPoints.map((point, index) => (
                <Card 
                  key={index}
                  className="bg-slate-900/60 border-0 hover:scale-105 transition-transform duration-300 overflow-hidden group"
                >
                  <div className={`h-1 bg-gradient-to-r ${point.gradient}`} />
                  <CardContent className="p-6 text-center relative">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${point.gradient} flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                      <point.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-semibold text-white mb-2 text-lg">{point.title}</h3>
                    <p className="text-sm text-cyan-200/80">{point.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Social Proof Testimonial with gradient border */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-3xl">
            <div className="relative p-1 rounded-3xl bg-gradient-to-r from-teal-500 via-purple-500 to-emerald-500">
              <Card className="bg-gradient-to-br from-slate-950 to-teal-950 border-0 rounded-[22px] overflow-hidden">
                <CardContent className="p-10">
                  <Quote className="w-12 h-12 text-teal-400/50 mb-6" />
                  <blockquote className="text-xl sm:text-2xl text-white mb-8 leading-relaxed font-light">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-500 via-purple-500 to-emerald-500 flex items-center justify-center text-2xl shadow-lg">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-white text-lg">{testimonial.author}</div>
                      <div className="text-cyan-300">{testimonial.org}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Community stats */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-teal-500/10 border border-cyan-500/20">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                  1,000+
                </div>
                <div className="text-cyan-200/80 text-sm mt-1">Greeks Growing</div>
              </div>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-violet-500/10 border border-purple-500/20">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                  50+
                </div>
                <div className="text-cyan-200/80 text-sm mt-1">Organizations</div>
              </div>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-green-500/10 border border-emerald-500/20">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                  100%
                </div>
                <div className="text-cyan-200/80 text-sm mt-1">Free to Start</div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA with dramatic gradient */}
        <section className="py-20 px-4 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-teal-900/30 via-transparent to-transparent" />
          <div className="container mx-auto max-w-xl text-center relative z-10">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-500 via-emerald-500 to-cyan-500 flex items-center justify-center mx-auto mb-6 animate-pulse">
              <Church className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Find Your Balance?
            </h2>
            <p className="text-cyan-200/80 mb-8 text-lg">
              Take the Faith Snapshot and discover your personalized path to thriving in faith and Greek life.
            </p>
            <Button
              size="lg"
              onClick={handleCTAClick}
              disabled={isNavigating}
              className="bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-500 hover:from-teal-600 hover:via-emerald-600 hover:to-cyan-600 text-white font-semibold px-10 py-7 text-xl rounded-2xl shadow-2xl shadow-teal-500/30"
            >
              {variant?.cta_text || "Start Free Snapshot"}
              <ArrowRight className="w-6 h-6 ml-2" />
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-teal-500/20 relative z-10">
        <div className="container mx-auto text-center text-sm text-cyan-300/60">
          © 2026 Sacred Greeks. Faith + Greek Life, United.
        </div>
      </footer>

      {/* Variant indicator (dev only) */}
      {variant && import.meta.env.DEV && (
        <div className="fixed bottom-4 left-4 bg-teal-900/90 text-xs text-cyan-300 px-3 py-1.5 rounded-full border border-teal-500/50 z-50">
          Variant: {variant.variant_key}
        </div>
      )}
    </div>
  );
}
