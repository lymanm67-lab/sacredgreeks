import { useAuth } from "@/contexts/AuthContext";
import { useDemoMode } from "@/contexts/DemoModeContext";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";
import logo from "@/assets/sacred-greeks-logo.png";
import { cn } from "@/lib/utils";
import { Play, Sparkles, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { user } = useAuth();
  const { isDemoMode, setDemoMode } = useDemoMode();
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
      "min-h-screen bg-gradient-to-b from-background to-muted/30 flex flex-col",
      isDemoMode && "pt-11"
    )}>
      {/* Simple Header */}
      <header className={cn(
        "border-b border-border/50 bg-background/80 backdrop-blur-sm sticky z-50",
        isDemoMode ? "top-11" : "top-0"
      )}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="Sacred Greeks" className="h-8 w-auto" loading="lazy" />
              <span className="font-semibold text-foreground hidden sm:inline">Sacred Greeks</span>
            </Link>
            <div className="flex items-center gap-2">
              <Button 
                onClick={handleSignIn}
                variant="ghost"
                size="sm"
              >
                Sign In
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Centered */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-lg shadow-lg border-border/50">
          <CardContent className="p-8">
            {/* Logo */}
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-full p-3 border border-primary/20">
                <img src={logo} alt="Sacred Greeks" className="h-10 w-auto" loading="lazy" />
              </div>
            </div>

            {/* Strong Value Proposition */}
            <div className="text-center mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                Faith + Greek Life,{' '}
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  United
                </span>
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto">
                The P.R.O.O.F. framework helps you grow spiritually while honoring your Greek commitments. Daily devotionals, guided journeys, and community—all in one place.
              </p>
            </div>

            {/* Entry Options */}
            <div className="space-y-3">
              {/* Demo Option */}
              <button
                onClick={handleDemoClick}
                className="w-full p-4 rounded-xl border border-border bg-background hover:bg-muted/50 transition-colors text-left flex items-start gap-4 group"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Play className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Try Demo First</h3>
                  <p className="text-sm text-muted-foreground">
                    Explore all features with sample data. No account needed.
                  </p>
                </div>
              </button>

              {/* Create Account Option */}
              <button
                onClick={handleCreateAccount}
                className="w-full p-4 rounded-xl border border-border bg-background hover:bg-muted/50 transition-colors text-left flex items-start gap-4 group"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Create Your Account</h3>
                  <p className="text-sm text-muted-foreground">
                    Join the Sacred Greeks community and start your personalized faith journey today.
                  </p>
                </div>
              </button>

              {/* Sign In Option */}
              <button
                onClick={handleSignIn}
                className="w-full p-4 rounded-xl border border-border bg-background hover:bg-muted/50 transition-colors text-left flex items-start gap-4 group"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Sign In</h3>
                  <p className="text-sm text-muted-foreground">
                    Already have an account? Continue your faith journey.
                  </p>
                </div>
              </button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Index;
