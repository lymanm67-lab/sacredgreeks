import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useDemoMode } from "@/contexts/DemoModeContext";
import { useLandingSurvey } from "@/hooks/use-landing-survey";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";
import logo from "@/assets/sacred-greeks-logo.png";
import { cn } from "@/lib/utils";
import { Play, Sparkles, User, ChevronRight, Shield, Heart, BookOpen, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardPreview } from "@/components/landing/DashboardPreview";
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

  // If user is logged in, redirect to dashboard (avoid navigate during render)
  useEffect(() => {
    if (user) navigate('/dashboard', { replace: true });
  }, [user, navigate]);

  if (user) return null;

  return (
    <div className={cn(
      "min-h-screen bg-[hsl(225,50%,8%)] flex flex-col w-full max-w-full overflow-x-hidden",
      isDemoMode && "pt-11"
    )}>
      {/* Dark Navy Header */}
      <header className={cn(
        "border-b border-slate-700/50 bg-[hsl(225,50%,8%)]/95 backdrop-blur-sm sticky z-50",
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
              <span className="font-semibold text-white hidden sm:inline">Sacred Greeks</span>
            </Link>
            <div className="flex items-center gap-1 sm:gap-2">
              <Button 
                onClick={handleSignIn}
                variant="ghost"
                size="sm"
                className="text-xs sm:text-sm px-2 sm:px-3 text-slate-300 hover:text-white hover:bg-slate-800"
              >
                Sign In
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Scrollable on mobile */}
      <main className="flex-1 flex flex-col items-center px-3 sm:px-4 py-6 sm:py-8 md:py-12 overflow-y-auto overflow-x-hidden w-full max-w-full bg-[hsl(225,50%,8%)]">
        {/* Hero Card */}
        <Card className="w-full max-w-lg shadow-xl border-slate-700/50 overflow-hidden animate-fade-in bg-slate-800/50">
          {/* Decorative top gradient bar - Blue accent */}
          <div className="h-1.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500" />
          
          <CardContent className="p-4 sm:p-6 md:p-8">
            {/* Logo with glow effect */}
            <div className="flex justify-center mb-4 sm:mb-5">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl animate-pulse" />
                <div className="relative bg-gradient-to-br from-slate-700 to-slate-800 rounded-full p-3 sm:p-4 border-2 border-slate-600 shadow-lg">
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
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-3 leading-tight">
                Faith + Greek Life,{' '}
                <span className="gradient-shimmer">
                  United
                </span>
              </h1>
              <p className="text-slate-400 text-sm sm:text-base md:text-lg max-w-md mx-auto leading-relaxed">
                Daily devotionals, biblical guidance, and practical tools to help you{' '}
                <span className="gradient-shimmer font-semibold">thrive</span> in faith and fraternity
              </p>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center justify-center gap-4 sm:gap-6 mb-5 sm:mb-6 text-xs sm:text-sm text-slate-400">
              <div className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400" />
                <span>Faith-First</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400" />
                <span>Community</span>
              </div>
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400" />
                <span>Daily Growth</span>
              </div>
            </div>

            {/* Podcast CTA */}
            <Link 
              to="/podcast"
              className="flex items-center justify-center gap-2 mb-5 sm:mb-6 py-2 px-4 rounded-full bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 border border-purple-500/30 hover:from-purple-500/30 hover:to-fuchsia-500/30 transition-all group"
            >
              <Headphones className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
              <span className="text-sm text-purple-300">Listen to our Podcast</span>
              <ChevronRight className="w-4 h-4 text-purple-400/60 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            {/* Entry Options */}
            <div className="space-y-2.5 sm:space-y-3">
              {/* Demo Option */}
              <button
                onClick={handleDemoClick}
                className="w-full p-3 sm:p-4 rounded-xl border border-slate-600 bg-slate-700/50 hover:bg-slate-700 transition-all text-left flex items-center gap-3 sm:gap-4 group shadow-sm hover:shadow-md"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-600 flex items-center justify-center flex-shrink-0 group-hover:bg-slate-500 transition-all">
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 text-slate-300" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-white text-sm sm:text-base">Try Demo First</h3>
                  <p className="text-xs sm:text-sm text-slate-400 truncate sm:whitespace-normal">
                    Explore all features with sample data
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
              </button>

              {/* Create Account Option - Primary CTA with cyan accent */}
              <button
                onClick={handleCreateAccount}
                className="w-full p-3 sm:p-4 rounded-xl border border-blue-500/50 bg-slate-700/50 hover:bg-slate-700 transition-all text-left flex items-center gap-3 sm:gap-4 group shadow-md hover:shadow-lg hover:border-blue-400"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/30 transition-all">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-white text-sm sm:text-base">Create Your Account</h3>
                  <p className="text-xs sm:text-sm text-slate-400 truncate sm:whitespace-normal">
                    Start your personalized faith journey today
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
              </button>

              {/* Sign In Option */}
              <button
                onClick={handleSignIn}
                className="w-full p-3 sm:p-4 rounded-xl border border-slate-600 bg-slate-700/50 hover:bg-slate-700 transition-all text-left flex items-center gap-3 sm:gap-4 group shadow-sm hover:shadow-md"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-600 flex items-center justify-center flex-shrink-0 group-hover:bg-slate-500 transition-all">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-slate-300" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-white text-sm sm:text-base">Sign In</h3>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Already have an account? Continue here
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Dashboard Preview Section */}
        <DashboardPreview />
        
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
