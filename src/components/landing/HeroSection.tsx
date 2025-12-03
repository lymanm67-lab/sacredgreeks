import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, LayoutDashboard, Smartphone } from "lucide-react";
import { BetaBenefitsDialog } from "@/components/BetaBenefitsDialog";
import logo from "@/assets/sacred-greeks-logo.png";

interface LandingHeroSectionProps {
  user: any;
}

export function LandingHeroSection({ user }: LandingHeroSectionProps) {
  return (
    <div className="relative overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-sacred/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <Badge className="bg-sacred/10 text-sacred hover:bg-sacred/20 border-sacred/20" variant="outline">
            ✨ Trusted by Christians in Greek Life
          </Badge>
          
          {/* Logo */}
          <div className="inline-flex items-center justify-center">
            <div className="relative">
              <div className="relative bg-gradient-to-br from-sacred/10 to-sacred/5 rounded-full p-5 border border-sacred/20">
                <img 
                  src={logo} 
                  alt="Sacred Greeks" 
                  className="h-12 w-auto" 
                  loading="lazy"
                  style={{ filter: 'brightness(0) saturate(100%) invert(38%) sepia(98%) saturate(3032%) hue-rotate(207deg) brightness(98%) contrast(97%)' }} 
                />
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-tight">
            Sacred Greeks™{' '}
            <span className="hero-title-gradient">Life App</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your daily companion for faith + Greek life.{' '}
            <span className="text-foreground font-medium">One tap. Every morning. Real growth.</span>
          </p>

          {!user && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <BetaBenefitsDialog>
                <Button size="lg" className="bg-sacred hover:bg-sacred/90 text-sacred-foreground text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all group">
                  <span className="flex items-center">
                    Start Your Journey
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </BetaBenefitsDialog>
              <Link to="/auth">
                <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                  Sign In
                </Button>
              </Link>
            </div>
          )}

          {user && (
            <Link to="/dashboard">
              <Button size="lg" className="bg-sacred hover:bg-sacred/90 text-sacred-foreground text-lg px-8 py-6 shadow-lg">
                Go to Dashboard
                <LayoutDashboard className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          )}

          <div className="pt-4">
            <Link to="/install" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-sacred transition-colors">
              <Smartphone className="w-4 h-4" />
              Install on your phone for the best experience
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}