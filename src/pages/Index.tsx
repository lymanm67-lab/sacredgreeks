import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useSubscription } from "@/hooks/use-subscription";
import { useDemoMode } from "@/contexts/DemoModeContext";
import { HeartHandshake, ChevronUp } from "lucide-react";
import { Testimonials } from "@/components/Testimonials";
import { MobileQRCode } from "@/components/MobileQRCode";
import { ThemeToggle } from "@/components/ThemeToggle";
import logo from "@/assets/sacred-greeks-logo.png";
import { ScrollProgressIndicator } from "@/components/ui/ScrollProgressIndicator";
import { FloatingCTA } from "@/components/ui/FloatingCTA";
import { StatsSection } from "@/components/landing/StatsSection";
import { ShareSection } from "@/components/landing/ShareSection";
import { ObjectionsTeaser } from "@/components/landing/ObjectionsTeaser";
import { DemoHeaderButton } from "@/components/landing/DemoHeaderButton";
import { LandingHeroSection } from "@/components/landing/HeroSection";
import { BenefitsSection } from "@/components/landing/BenefitsSection";
import { CoreFeaturesSection } from "@/components/landing/CoreFeaturesSection";
import { SubscriptionBanner } from "@/components/landing/SubscriptionBanner";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { HealingResourcesSection } from "@/components/landing/HealingResourcesSection";
import { Footer } from "@/components/landing/Footer";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { cn } from "@/lib/utils";

// Mobile section navigation items
const sectionNav = [
  { id: "objections-teaser", label: "Try It", icon: null, isHighlighted: true },
  { id: "core-features", label: "Tools", icon: null },
  { id: "healing-resources", label: "Support", icon: HeartHandshake },
  { id: "more-features", label: "More", icon: null },
  { id: "testimonials", label: "Stories", icon: null },
];

const Index = () => {
  const { user } = useAuth();
  const { subscribed } = useSubscription();
  const { isDemoMode } = useDemoMode();
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setShowMobileNav(window.scrollY > 400);
      
      const sections = sectionNav.map(s => document.getElementById(s.id));
      const scrollPos = window.scrollY + 150;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(sectionNav[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={cn(
      "min-h-screen bg-gradient-to-b from-background via-background to-muted/20",
      isDemoMode && "pt-11"
    )}>
      <ScrollProgressIndicator />
      
      {!user && <FloatingCTA scrollThreshold={600} />}

      {/* Floating Support Button */}
      <button
        onClick={() => scrollToSection('healing-resources')}
        className={`fixed bottom-24 md:bottom-20 left-4 z-40 flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-rose-500 text-white rounded-full shadow-lg shadow-amber-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-amber-500/40 ${
          showMobileNav ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'
        }`}
        aria-label="Need support?"
      >
        <HeartHandshake className="h-4 w-4" />
        <span className="text-sm font-medium hidden sm:inline">Need Support?</span>
        <span className="text-sm font-medium sm:hidden">Support</span>
      </button>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-40 p-3 bg-sacred text-white rounded-full shadow-lg shadow-sacred/30 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-sacred/40 ${
          showMobileNav ? 'opacity-100 translate-y-0 animate-[bounce_0.5s_ease-out]' : 'opacity-0 translate-y-4 pointer-events-none'
        } hidden md:flex items-center justify-center`}
        aria-label="Back to top"
      >
        <ChevronUp className="h-5 w-5" />
      </button>

      {/* Mobile Section Navigation */}
      <div className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-40 md:hidden transition-all duration-500 ease-out ${showMobileNav ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
        <div className="flex items-center gap-1 bg-background/95 backdrop-blur-lg border border-border/50 rounded-full px-2 py-1.5 shadow-lg animate-fade-in">
          {sectionNav.map((section, index) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 flex items-center gap-1.5 ${
                section.isHighlighted 
                  ? activeSection === section.id
                    ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white scale-105 shadow-lg shadow-amber-500/30'
                    : 'bg-gradient-to-r from-amber-500/20 to-rose-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 hover:from-amber-500/30 hover:to-rose-500/30'
                  : activeSection === section.id 
                    ? 'bg-sacred text-white scale-105' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted active:scale-95'
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {section.icon && <section.icon className="w-3 h-3" />}
              {section.label}
            </button>
          ))}
          <button
            onClick={scrollToTop}
            className="p-1.5 text-muted-foreground hover:text-sacred hover:bg-sacred/10 rounded-full ml-1 transition-all duration-200 active:scale-90"
            aria-label="Back to top"
          >
            <ChevronUp className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      {/* Header */}
      <header className={cn(
        "border-b border-border/50 bg-background/80 backdrop-blur-lg sticky z-50",
        isDemoMode ? "top-11" : "top-0"
      )}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-sacred to-sacred/80 rounded-xl p-2 shadow-lg shadow-sacred/20">
                <img src={logo} alt="Sacred Greeks" className="h-6 w-auto brightness-0 invert" loading="lazy" />
              </div>
            </div>
            <div className="flex items-center gap-3">
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

      {/* Stats Section */}
      {!user && <StatsSection />}

      {/* BGLO Objections Teaser */}
      {!user && (
        <div id="objections-teaser">
          <ObjectionsTeaser />
        </div>
      )}

      {/* Benefits Section */}
      {!user && <BenefitsSection />}

      {/* Core Features */}
      <CoreFeaturesSection />

      {/* Subscription Banner */}
      <SubscriptionBanner user={user} subscribed={subscribed} />

      {/* Features Section */}
      <FeaturesSection />

      {/* Healing Resources */}
      <div className="container mx-auto px-4">
        <HealingResourcesSection />
      </div>

      {/* Testimonials */}
      <div id="testimonials" className="scroll-mt-20">
        <Testimonials />
      </div>

      {/* Share Section */}
      <ShareSection />

      {/* Final CTA */}
      {!user && <FinalCTA />}

      {/* Footer */}
      <Footer />
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
        <Button className="bg-sacred hover:bg-sacred/90 text-sacred-foreground shadow-lg shadow-sacred/20 hover:shadow-xl hover:shadow-sacred/30 transition-all">
          <LayoutDashboard className="w-4 h-4 mr-2" />
          Dashboard
        </Button>
      </Link>
    );
  }

  return (
    <>
      <Link to="/auth">
        <Button variant="ghost" size="sm" className="hover:bg-muted">
          Sign In
        </Button>
      </Link>
      <BetaBenefitsDialog>
        <Button className="bg-sacred hover:bg-sacred/90 text-sacred-foreground shadow-lg shadow-sacred/20" size="sm">
          Become a Beta Tester
        </Button>
      </BetaBenefitsDialog>
    </>
  );
}

export default Index;
