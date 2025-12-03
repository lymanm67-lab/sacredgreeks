import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useDemoMode } from "@/contexts/DemoModeContext";
import { useLandingSurvey } from "@/hooks/use-landing-survey";
import { ChevronUp } from "lucide-react";
import { Testimonials } from "@/components/Testimonials";
import { MobileQRCode } from "@/components/MobileQRCode";
import { ThemeToggle } from "@/components/ThemeToggle";
import logo from "@/assets/sacred-greeks-logo.png";
import { DemoHeaderButton } from "@/components/landing/DemoHeaderButton";
import { LandingHeroSection } from "@/components/landing/HeroSection";
import { CoreFeaturesSection } from "@/components/landing/CoreFeaturesSection";
import { HealingResourcesSection } from "@/components/landing/HealingResourcesSection";
import { Footer } from "@/components/landing/Footer";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { LandingPersonalizationSurvey } from "@/components/landing/LandingPersonalizationSurvey";
import { cn } from "@/lib/utils";

const Index = () => {
  const { user } = useAuth();
  const { isDemoMode } = useDemoMode();
  const { showSurvey, completeSurvey, skipSurvey } = useLandingSurvey();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={cn(
      "min-h-screen bg-background",
      isDemoMode && "pt-11"
    )}>
      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-40 p-3 bg-sacred text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
          showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Back to top"
      >
        <ChevronUp className="h-5 w-5" />
      </button>
      
      {/* Header */}
      <header className={cn(
        "border-b border-border/50 bg-background/95 backdrop-blur-sm sticky z-50",
        isDemoMode ? "top-11" : "top-0"
      )}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-sacred to-sacred/80 rounded-xl p-2 shadow-lg shadow-sacred/20">
                <img src={logo} alt="Sacred Greeks" className="h-6 w-auto brightness-0 invert" loading="lazy" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <DemoHeaderButton />
              <MobileQRCode />
              <HeaderAuthButtons user={user} />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <LandingHeroSection user={user} />

      {/* Core Features - 4 Free Tools */}
      <CoreFeaturesSection />

      {/* Healing Resources - Simplified */}
      <div className="container mx-auto px-4 py-12">
        <HealingResourcesSection />
      </div>

      {/* Testimonials */}
      <div id="testimonials" className="py-12">
        <Testimonials />
      </div>

      {/* Final CTA */}
      {!user && <FinalCTA />}

      {/* Footer */}
      <Footer />

      {/* Personalization Survey for new visitors */}
      {!user && (
        <LandingPersonalizationSurvey
          open={showSurvey}
          onComplete={completeSurvey}
          onSkip={skipSurvey}
        />
      )}
    </div>
  );
};

// Header auth buttons component
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LayoutDashboard } from "lucide-react";
import { BetaBenefitsDialog } from "@/components/BetaBenefitsDialog";

function HeaderAuthButtons({ user }: { user: any }) {
  if (user) {
    return (
      <Link to="/dashboard">
        <Button className="bg-sacred hover:bg-sacred/90 text-sacred-foreground shadow-lg shadow-sacred/20" size="sm">
          <LayoutDashboard className="w-4 h-4 mr-2" />
          Dashboard
        </Button>
      </Link>
    );
  }

  return (
    <>
      <Link to="/auth" className="hidden sm:block">
        <Button variant="ghost" size="sm">
          Sign In
        </Button>
      </Link>
      <BetaBenefitsDialog>
        <Button className="bg-sacred hover:bg-sacred/90 text-sacred-foreground" size="sm">
          Get Started
        </Button>
      </BetaBenefitsDialog>
    </>
  );
}

export default Index;