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
  Loader2
} from "lucide-react";

// Pain points that address survey anxiety
const painPoints = [
  {
    icon: Clock,
    title: "Takes only 3 minutes",
    description: "Quick snapshot of where you stand spiritually in Greek life"
  },
  {
    icon: Shield,
    title: "100% Private & Judgment-Free",
    description: "Your answers stay between you and God. No one else sees them."
  },
  {
    icon: Users,
    title: "Built by Greeks, for Greeks",
    description: "Created by fraternity members who understand your unique challenges"
  }
];

// Social proof testimonial
const testimonial = {
  quote: "I was skeptical at first, but the Snapshot helped me see exactly where I was slipping. Now I'm leading our chapter's first Bible study in 3 years.",
  author: "Marcus T.",
  org: "Alpha Phi Alpha, Howard University",
  avatar: "🎓"
};

export default function LandingABTest() {
  const navigate = useNavigate();
  const { setDemoMode } = useDemoMode();
  const { variant, isLoading, trackConversion } = useLandingABTest();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleCTAClick = async () => {
    setIsNavigating(true);
    await trackConversion('cta_click');
    await trackConversion('signup_started');
    navigate('/auth?mode=signup');
  };

  const handleDemoClick = async () => {
    await trackConversion('demo_started');
    setDemoMode(true);
    navigate('/dashboard');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[hsl(225,50%,8%)] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[hsl(225,50%,8%)] flex flex-col">
      {/* Minimal Header */}
      <header className="border-b border-slate-700/50 bg-[hsl(225,50%,8%)]/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-2">
              <img
                src={logo}
                alt="Sacred Greeks"
                className="h-8 w-8 rounded-full object-cover"
              />
              <span className="font-semibold text-white">Sacred Greeks</span>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/auth')}
                className="text-slate-300 hover:text-white hover:bg-slate-800"
              >
                Sign In
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        {/* Hero Section - Conversion Focused */}
        <section className="py-12 md:py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            {/* Badge */}
            <Badge className="mb-6 bg-blue-500/20 text-blue-400 border-blue-500/30 hover:bg-blue-500/30">
              <Sparkles className="w-3 h-3 mr-1" />
              Free Faith Snapshot Assessment
            </Badge>

            {/* A/B Tested Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              {variant?.headline || "Faith + Greek Life, United"}
            </h1>

            {/* A/B Tested Subheadline */}
            <p className="text-lg sm:text-xl text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
              {variant?.subheadline || "Daily devotionals, biblical guidance, and practical tools to help you thrive in faith and fraternity"}
            </p>

            {/* Single Primary CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <Button
                size="lg"
                onClick={handleCTAClick}
                disabled={isNavigating}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold px-8 py-6 text-lg rounded-xl shadow-lg shadow-blue-500/25 transition-all hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105"
              >
                {isNavigating ? (
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  <Sparkles className="w-5 h-5 mr-2" />
                )}
                {variant?.cta_text || "Start Free Snapshot"}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>

            {/* Secondary action */}
            <p className="text-sm text-slate-500">
              or{" "}
              <button 
                onClick={handleDemoClick}
                className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
              >
                explore with sample data first
              </button>
            </p>

            {/* Trust indicators */}
            <div className="flex items-center justify-center gap-6 mt-8 text-sm text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>No credit card</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>3 min assessment</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>Instant results</span>
              </div>
            </div>
          </div>
        </section>

        {/* Pain Points Section - Address Survey Anxiety */}
        <section className="py-12 px-4 bg-slate-900/50">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold text-white text-center mb-8">
              Why Greeks Love the Faith Snapshot
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {painPoints.map((point, index) => (
                <Card 
                  key={index}
                  className="bg-slate-800/50 border-slate-700/50 hover:border-blue-500/30 transition-colors"
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
                      <point.icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="font-semibold text-white mb-2">{point.title}</h3>
                    <p className="text-sm text-slate-400">{point.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Social Proof Testimonial */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-2xl">
            <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700/50 overflow-hidden">
              <CardContent className="p-8">
                <Quote className="w-10 h-10 text-blue-400/30 mb-4" />
                <blockquote className="text-lg sm:text-xl text-white mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{testimonial.author}</div>
                    <div className="text-sm text-slate-400">{testimonial.org}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-12 px-4 bg-gradient-to-b from-transparent to-slate-900/50">
          <div className="container mx-auto max-w-xl text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Ready to See Where You Stand?
            </h2>
            <p className="text-slate-400 mb-6">
              Get your personalized Faith Snapshot in just 3 minutes.
            </p>
            <Button
              size="lg"
              onClick={handleCTAClick}
              disabled={isNavigating}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold px-8 py-6 text-lg rounded-xl shadow-lg shadow-blue-500/25"
            >
              {variant?.cta_text || "Start Free Snapshot"}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </section>
      </main>

      {/* Minimal Footer */}
      <footer className="py-6 px-4 border-t border-slate-700/50">
        <div className="container mx-auto text-center text-sm text-slate-500">
          © 2026 Sacred Greeks. All rights reserved.
        </div>
      </footer>

      {/* Variant indicator (dev only) */}
      {variant && import.meta.env.DEV && (
        <div className="fixed bottom-4 left-4 bg-slate-800 text-xs text-slate-400 px-3 py-1.5 rounded-full border border-slate-700">
          Variant: {variant.variant_key}
        </div>
      )}
    </div>
  );
}
