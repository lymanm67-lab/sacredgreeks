import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, LayoutDashboard } from "lucide-react";
import { BetaBenefitsDialog } from "@/components/BetaBenefitsDialog";
import logo from "@/assets/sacred-greeks-logo.png";

interface LandingHeroSectionProps {
  user: any;
}

export function LandingHeroSection({ user }: LandingHeroSectionProps) {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-sacred/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 py-12 md:py-16 relative">
        <div className="max-w-2xl mx-auto text-center space-y-5">
          {/* Logo */}
          <div className="inline-flex items-center justify-center">
            <div className="bg-gradient-to-br from-sacred/10 to-sacred/5 rounded-full p-4 border border-sacred/20">
              <img 
                src={logo} 
                alt="Sacred Greeks" 
                className="h-10 w-auto" 
                loading="lazy"
                style={{ filter: 'brightness(0) saturate(100%) invert(38%) sepia(98%) saturate(3032%) hue-rotate(207deg) brightness(98%) contrast(97%)' }} 
              />
            </div>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
            Faith + Greek Life,{' '}
            <span className="hero-title-gradient">Together</span>
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Daily devotionals, guided journeys, and tools designed for Christian Greeks.
          </p>

          {!user && (
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-2">
              <BetaBenefitsDialog>
                <Button size="lg" className="bg-sacred hover:bg-sacred/90 text-sacred-foreground px-6 py-5 shadow-lg hover:shadow-xl transition-all group">
                  <span className="flex items-center">
                    Get Started Free
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </BetaBenefitsDialog>
              <Link to="/auth">
                <Button variant="ghost" size="lg" className="px-6 py-5">
                  Sign In
                </Button>
              </Link>
            </div>
          )}

          {user && (
            <Link to="/dashboard">
              <Button size="lg" className="bg-sacred hover:bg-sacred/90 text-sacred-foreground px-6 py-5 shadow-lg">
                Go to Dashboard
                <LayoutDashboard className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}