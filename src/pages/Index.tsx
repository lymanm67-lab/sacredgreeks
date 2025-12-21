import { useAuth } from "@/contexts/AuthContext";
import { useDemoMode } from "@/contexts/DemoModeContext";
import { useLandingSurvey, SurveyAnswers } from "@/hooks/use-landing-survey";
import { useNavigate } from "react-router-dom";
import { MobileQRCode } from "@/components/MobileQRCode";
import { ThemeToggle } from "@/components/ThemeToggle";
import logo from "@/assets/sacred-greeks-logo.png";
import { DemoHeaderButton } from "@/components/landing/DemoHeaderButton";
import { LandingHeroSection } from "@/components/landing/HeroSection";
import { CoreFeaturesSection } from "@/components/landing/CoreFeaturesSection";
import { Footer } from "@/components/landing/Footer";
import { LandingPersonalizationSurvey } from "@/components/landing/LandingPersonalizationSurvey";
import { cn } from "@/lib/utils";

const Index = () => {
  const { user } = useAuth();
  const { isDemoMode } = useDemoMode();
  const navigate = useNavigate();
  const { showSurvey, completeSurvey, skipSurvey } = useLandingSurvey();

  const handleSurveyComplete = (answers: SurveyAnswers) => {
    completeSurvey(answers);
    navigate('/auth?mode=signup');
  };

  const handleSurveySkip = () => {
    skipSurvey();
    navigate('/auth?mode=signup');
  };

  return (
    <div className={cn(
      "min-h-screen bg-background flex flex-col",
      isDemoMode && "pt-11"
    )}>
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

      {/* Core Features - Just 2 */}
      <CoreFeaturesSection />

      {/* Spacer */}
      <div className="flex-1" />

      {/* Footer */}
      <Footer />

      {/* Personalization Survey for new visitors */}
      {!user && (
        <LandingPersonalizationSurvey
          open={showSurvey}
          onComplete={handleSurveyComplete}
          onSkip={handleSurveySkip}
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