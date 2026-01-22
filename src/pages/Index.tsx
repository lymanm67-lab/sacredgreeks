import { useAuth } from "@/contexts/AuthContext";
import { useDemoMode } from "@/contexts/DemoModeContext";
import { useLandingSurvey } from "@/hooks/use-landing-survey";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";
import logo from "@/assets/sacred-greeks-logo.png";
import { cn } from "@/lib/utils";
import { Play, Sparkles, User, ChevronRight, Shield, Heart, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardPreview } from "@/components/landing/DashboardPreview";
import { ProofFrameworkSection } from "@/components/landing/ProofFrameworkSection";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/landing/Footer";
import { LandingPersonalizationSurvey } from "@/components/landing/LandingPersonalizationSurvey";

const Index = () => {
  const { user } = useAuth();
  const { isDemoMode, setDemoMode } = useDemoMode();
  const { showSurvey, completeSurvey, skipSurvey } = useLandingSurvey();
  const navigate = useNavigate();

  const handleDemoClick = () => {
    setDemoMode(true);
    navigate('/dashboard');
  };

  const handleCreateAccount = () => {
    navigate('/auth?mode=signup');
  };

  const handleSignIn = () => {
    navigate('/auth');
  };

  // If user is logged in, redirect to dashboard
  if (user) {
    navigate('/dashboard');
    return null;
  }

  return (
    <div className={cn(
      "min-h-screen bg-gradient-to-b from-background via-background to-muted/50 flex flex-col",
      isDemoMode && "pt-11"
    )}>
      {/* Simple Header */}
      <header className={cn(
        "border-b border-border/50 bg-background/80 backdrop-blur-sm sticky z-50",
        isDemoMode ? "top-11" : "top-0"
      )}>
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex items-center justify-between h-12 sm:h-14">
            <Link to="/" className="flex items-center gap-2 group">
              <img
                src={logo}
                alt="Sacred Greeks"
                className="h-7 w-7 sm:h-8 sm:w-8 rounded-full object-cover bg-transparent transition-transform group-hover:scale-105"
                loading="lazy"
              />
              <span className="font-semibold text-foreground hidden sm:inline">Sacred Greeks</span>
            </Link>
            <div className="flex items-center gap-1 sm:gap-2">
              <Button 
                onClick={handleSignIn}
                variant="ghost"
                size="sm"
                className="text-xs sm:text-sm px-2 sm:px-3"
              >
                Sign In
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Scrollable on mobile */}
      <main className="flex-1 flex flex-col items-center px-3 sm:px-4 py-6 sm:py-8 md:py-12 overflow-y-auto">
        {/* Hero Card */}
        <Card className="w-full max-w-lg shadow-xl border-border/50 overflow-hidden animate-fade-in">
          {/* Decorative top gradient bar */}
          <div className="h-1.5 bg-gradient-to-r from-primary via-primary/80 to-primary/60" />
          
          <CardContent className="p-4 sm:p-6 md:p-8">
            {/* Logo with glow effect */}
            <div className="flex justify-center mb-4 sm:mb-5">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
                <div className="relative bg-gradient-to-br from-primary/15 to-primary/5 rounded-full p-3 sm:p-4 border border-primary/30 shadow-lg">
                  <img
                    src={logo}
                    alt="Sacred Greeks"
                    className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover bg-transparent"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Strong Value Proposition */}
            <div className="text-center mb-5 sm:mb-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2 sm:mb-3 leading-tight">
                Faith + Greek Life,{' '}
                <span className="bg-gradient-to-r from-primary via-emerald-500 to-primary bg-clip-text text-transparent">
                  United
                </span>
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-md mx-auto leading-relaxed">
                Daily devotionals, biblical guidance, and practical tools to help you{' '}
                <span className="font-semibold text-foreground">thrive in faith and fraternity</span>
              </p>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center justify-center gap-4 sm:gap-6 mb-5 sm:mb-6 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                <span>Faith-First</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                <span>Community</span>
              </div>
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                <span>Daily Growth</span>
              </div>
            </div>

            {/* Entry Options */}
            <div className="space-y-2.5 sm:space-y-3">
              {/* Demo Option */}
              <button
                onClick={handleDemoClick}
                className="w-full p-3 sm:p-4 rounded-xl border border-border bg-background hover:bg-muted/50 hover:border-primary/30 transition-all text-left flex items-center gap-3 sm:gap-4 group shadow-sm hover:shadow-md"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center flex-shrink-0 group-hover:from-primary/30 group-hover:to-primary/20 transition-all">
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-foreground text-sm sm:text-base">Try Demo First</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground truncate sm:whitespace-normal">
                    Explore all features with sample data
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all flex-shrink-0" />
              </button>

              {/* Create Account Option - Primary CTA */}
              <button
                onClick={handleCreateAccount}
                className="w-full p-3 sm:p-4 rounded-xl border-2 border-primary/60 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 hover:from-primary/20 hover:via-primary/10 hover:to-primary/20 transition-all text-left flex items-center gap-3 sm:gap-4 group shadow-md hover:shadow-lg hover:border-primary"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-105 transition-transform">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-foreground text-sm sm:text-base">Create Your Account</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground truncate sm:whitespace-normal">
                    Start your personalized faith journey today
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-primary group-hover:translate-x-0.5 transition-all flex-shrink-0" />
              </button>

              {/* Sign In Option */}
              <button
                onClick={handleSignIn}
                className="w-full p-3 sm:p-4 rounded-xl border border-border bg-background hover:bg-muted/50 hover:border-primary/30 transition-all text-left flex items-center gap-3 sm:gap-4 group shadow-sm hover:shadow-md"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center flex-shrink-0 group-hover:from-primary/30 group-hover:to-primary/20 transition-all">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-foreground text-sm sm:text-base">Sign In</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Already have an account? Continue here
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all flex-shrink-0" />
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Dashboard Preview Section */}
        <DashboardPreview />
        
        {/* P.R.O.O.F. Framework Explainer */}
        <ProofFrameworkSection />
        
        {/* Testimonials Section */}
        <Testimonials />
      </main>
      
      {/* Footer */}
      <Footer />

      {/* Personalization Survey Modal */}
      <LandingPersonalizationSurvey
        open={showSurvey}
        onComplete={completeSurvey}
        onSkip={skipSurvey}
      />
    </div>
  );
};

export default Index;
