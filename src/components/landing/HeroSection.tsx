import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, LayoutDashboard, CheckCircle2, Smartphone } from "lucide-react";
import { ListenButton } from "@/components/ListenButton";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";
import { BetaBenefitsDialog } from "@/components/BetaBenefitsDialog";
import { DeviceMockup } from "./DeviceMockup";
import logo from "@/assets/sacred-greeks-logo.png";

interface LandingHeroSectionProps {
  user: any;
}

const heroText = "Start each day with devotionals made for Greek Christians. Track your spiritual growth. Access prayer tools instantly. The one app that honors both your faith and your letters—right from your home screen.";

export function LandingHeroSection({ user }: LandingHeroSectionProps) {
  return (
    <div className="relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-sacred/10 via-transparent to-transparent rounded-full blur-3xl animate-gradient-shift" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-purple-500/8 via-transparent to-transparent rounded-full blur-3xl animate-gradient-shift-reverse" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-amber-500/5 to-rose-500/5 rounded-full blur-3xl animate-gradient-pulse" />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sacred/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 py-12 md:py-20 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-6">
            <Badge className="bg-sacred/10 text-sacred hover:bg-sacred/20 border-sacred/20 animate-fade-in-up shadow-[0_0_15px_rgba(59,130,246,0.4)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] transition-shadow" variant="outline">
              ✨ Trusted by Christians in Greek Life
            </Badge>
            
            <div className="inline-flex items-center justify-center lg:hidden animate-fade-in-up-delay-1">
              <div className="relative">
                <div className="absolute inset-0 bg-sacred/20 rounded-full blur-2xl animate-pulse-glow" />
                <div className="relative bg-gradient-to-br from-sacred/10 to-sacred/5 rounded-full p-6 border border-sacred/20">
                  <img 
                    src={logo} 
                    alt="Sacred Greeks" 
                    className="h-16 w-auto" 
                    loading="lazy"
                    decoding="async"
                    style={{ filter: 'brightness(0) saturate(100%) invert(38%) sepia(98%) saturate(3032%) hue-rotate(207deg) brightness(98%) contrast(97%)' }} 
                  />
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-tight animate-fade-in-up-delay-2">
              Sacred Greeks™{' '}
              <span className="hero-title-gradient">Life App</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground font-medium animate-fade-in-up-delay-3">
              Your daily companion for faith + Greek life.{' '}
              <span className="text-foreground">One tap. Every morning. Real growth.</span>
            </p>
            
            <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed animate-fade-in">
              {heroText}
            </p>

            <div className="flex justify-center lg:justify-start pt-2">
              <ListenButton
                text={heroText}
                itemId="hero-welcome"
                title="Welcome to Sacred Greeks"
                variant="ghost"
                size="icon"
                showLabel={false}
                className="h-10 w-10 rounded-full bg-muted/50 hover:bg-sacred/10 hover:text-sacred transition-colors"
              />
            </div>

            {!user && (
              <div className="grid sm:grid-cols-3 gap-3 max-w-xl mx-auto lg:mx-0 pt-4">
                <div className="flex items-start gap-2 p-3 rounded-xl bg-muted/50 border border-border/50">
                  <CheckCircle2 className="w-4 h-4 text-sacred flex-shrink-0 mt-0.5" />
                  <div className="text-left">
                    <p className="font-semibold text-foreground text-sm">Daily Devotionals</p>
                    <p className="text-xs text-muted-foreground">Scripture-based guidance</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 p-3 rounded-xl bg-muted/50 border border-border/50">
                  <CheckCircle2 className="w-4 h-4 text-sacred flex-shrink-0 mt-0.5" />
                  <div className="text-left">
                    <p className="font-semibold text-foreground text-sm">Track Your Journey</p>
                    <p className="text-xs text-muted-foreground">See your spiritual growth</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 p-3 rounded-xl bg-muted/50 border border-border/50">
                  <CheckCircle2 className="w-4 h-4 text-sacred flex-shrink-0 mt-0.5" />
                  <div className="text-left">
                    <p className="font-semibold text-foreground text-sm">100% Free</p>
                    <p className="text-xs text-muted-foreground">No credit card required</p>
                  </div>
                </div>
              </div>
            )}

            {!user && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center pt-4">
                <BetaBenefitsDialog>
                  <Button size="lg" className="bg-sacred hover:bg-sacred/90 text-sacred-foreground text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all btn-bounce hover:scale-105 group">
                    <span className="flex items-center">
                      Start Your Journey
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </BetaBenefitsDialog>
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

            <div className="text-center lg:text-left">
              <Link to="/install" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-sacred transition-colors">
                <Smartphone className="w-4 h-4" />
                Install on your phone for the best experience
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Side - Device Mockups */}
          <div className="hidden lg:flex items-center justify-center relative">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-sacred/20 via-purple-500/10 to-transparent rounded-full blur-3xl scale-150" />
            
            {/* Device mockups */}
            <div className="relative flex items-end gap-4 perspective-1000">
              <DeviceMockup screen="prayer" className="transform -rotate-6 translate-y-8 opacity-80 scale-90" delay={0.4} />
              <DeviceMockup screen="dashboard" className="z-10 shadow-2xl" delay={0.2} />
              <DeviceMockup screen="devotional" className="transform rotate-6 translate-y-8 opacity-80 scale-90" delay={0.6} />
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <ScrollIndicator targetId="core-features" />
        </div>
      </div>
    </div>
  );
}