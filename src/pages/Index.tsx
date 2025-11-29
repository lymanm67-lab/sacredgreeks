import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useSubscription } from "@/hooks/use-subscription";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Users, Sparkles, LogIn, LayoutDashboard, BookOpen, ListChecks, TrendingUp, Calendar, ArrowRight, CheckCircle2, Smartphone, Headphones, Library, Lock, HandHeart, HeartHandshake, ChevronUp, Quote, Phone, MessageCircle, PenLine, Crown, Drama } from "lucide-react";
import { Testimonials } from "@/components/Testimonials";
import { ShareHealingStoryDialog } from "@/components/ShareHealingStoryDialog";
import { ApprovedHealingStories } from "@/components/ApprovedHealingStories";
import { MobileQRCode } from "@/components/MobileQRCode";
import { ThemeToggle } from "@/components/ThemeToggle";
import logo from "@/assets/sacred-greeks-logo.png";
import { ExternalContentModal } from "@/components/ui/ExternalContentModal";
import { ListenButton } from "@/components/ListenButton";
import { ScrollProgressIndicator } from "@/components/ui/ScrollProgressIndicator";
import { FloatingCTA } from "@/components/ui/FloatingCTA";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";
import { StatsSection } from "@/components/landing/StatsSection";
import { ShareSection } from "@/components/landing/ShareSection";
import { ObjectionsTeaser } from "@/components/landing/ObjectionsTeaser";

// Mobile section navigation items
const sectionNav = [
  { id: "objections-teaser", label: "Try It", icon: null, isHighlighted: true },
  { id: "core-features", label: "Tools", icon: null },
  { id: "healing-resources", label: "Support", icon: HeartHandshake },
  { id: "more-features", label: "More", icon: null },
  { id: "testimonials", label: "Stories", icon: null },
];

// Core features for the new user journey - prioritized by importance
const coreFeatures = [
  {
    title: "Shattered Masks Assessment",
    description: "Discover your archetype and understand how you navigate identity, faith, and Greek life",
    icon: Drama,
    link: "https://drlymanmontgomery.involve.me/shattered-masks-archetype-assessment",
    color: "from-fuchsia-500 to-pink-600",
    badge: "Start Here",
    isExternal: true,
    useModal: true,
  },
  {
    title: "30-Day Journey",
    description: "Daily readings, scriptures, and reflections walking you through the P.R.O.O.F. framework",
    icon: Calendar,
    link: "/journey",
    color: "from-sacred to-warm-blue",
    badge: "Foundation",
  },
  {
    title: "Myth Buster Library",
    description: "Searchable biblical responses to common accusations about Greek life",
    icon: BookOpen,
    link: "/myth-buster",
    color: "from-purple-500 to-violet-600",
  },
  {
    title: "Symbol & Ritual Guide",
    description: "Christian perspectives on Greek symbolism with guidance on participation",
    icon: Sparkles,
    link: "/symbol-guide",
    color: "from-amber-500 to-orange-600",
  },
  {
    title: "Ask Dr. Lyman",
    description: "Submit questions and get curated answers on theology, family, and campus ministry",
    icon: Users,
    link: "/ask-dr-lyman",
    color: "from-teal-500 to-emerald-600",
  },
  {
    title: "Prayer Journal",
    description: "Track your prayers, record answers, and grow in your relationship with God",
    icon: PenLine,
    link: "/prayer-journal",
    color: "from-rose-500 to-pink-600",
  },
];

const features = [
  {
    title: "Resources Hub",
    description: "Access articles, teachings, testimonials, 5-session study guide, and the complete Sacred Greeks content library",
    icon: Library,
    link: "/resources",
    color: "text-warm-blue",
    requiresAuth: false,
  },
  {
    title: "Daily Devotionals",
    description: "Start each day with Scripture-based reflections focused on the P.R.O.O.F. framework",
    icon: Calendar,
    link: "/devotional",
    color: "text-blue-500",
    requiresAuth: true,
    lockBadgeText: "Daily guidance delivered",
  },
  {
    title: "AI Bible Study Tools",
    description: "Get AI-powered verse searches, study recommendations, and personalized spiritual insights",
    icon: Sparkles,
    link: "/bible-study",
    color: "text-sacred",
    requiresAuth: true,
    isPremium: true,
    lockBadgeText: "Pro Feature",
  },
  {
    title: "Response Coach",
    description: "Practice responding to tough questions about faith and Greek life with AI-powered feedback",
    icon: Users,
    link: "/guide",
    color: "text-teal-500",
    requiresAuth: true,
    isPremium: true,
    lockBadgeText: "Pro Feature",
  },
  {
    title: "5 Persona Assessment",
    description: "Discover your unique 5 Persona Types Architecture with this comprehensive assessment",
    icon: Heart,
    link: "https://drlymanmontgomery.involve.me/fmmpa",
    color: "text-sacred",
    isExternal: true,
    useModal: true,
    requiresAuth: false,
  },
  {
    title: "Podcast",
    description: "Listen to study guide sessions and teachings on the go with the Sacred Greeks podcast",
    icon: Headphones,
    link: "/podcast",
    color: "text-purple-500",
    requiresAuth: false,
  },
];

const benefits = [
  "Personalized Experience: Org-specific devotionals, study guides & prayer templates tailored to your Greek council",
  "Daily Spiritual Tools: Devotionals, Bible study, prayer guides & journals for consistent spiritual growth",
  "Community Features: Prayer Wall with org filters, service tracking & shared support with brothers and sisters",
  "Personal Growth: Track progress with insights, achievements, streaks & council-specific recommendations",
  "P.R.O.O.F. Framework: Navigate Greek life challenges with biblical guidance customized for your organization"
];

const Index = () => {
  const { user } = useAuth();
  const { subscribed, tier } = useSubscription();
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      // Show mobile nav after scrolling past hero
      setShowMobileNav(window.scrollY > 400);
      
      // Update active section based on scroll position
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

  const heroText = "Your daily companion for integrating faith and Greek life. Get devotionals, guidance, prayer tools, and progress tracking, all grounded in the P.R.O.O.F. framework from Sacred, Not Sinful.";

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      {/* Scroll Progress Indicator */}
      <ScrollProgressIndicator />
      
      {/* Floating CTA for non-authenticated users */}
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

      {/* Back to Top Button - All Devices */}
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
      
      {/* Header with Auth */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-sacred to-sacred/80 rounded-xl p-2 shadow-lg shadow-sacred/20">
                <img src={logo} alt="Sacred Greeks" className="h-6 w-auto brightness-0 invert" loading="lazy" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <MobileQRCode />
              {user ? (
                <Link to="/dashboard">
                  <Button className="bg-sacred hover:bg-sacred/90 text-sacred-foreground shadow-lg shadow-sacred/20 hover:shadow-xl hover:shadow-sacred/30 transition-all">
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/auth">
                    <Button variant="ghost" size="sm" className="hover:bg-muted">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/beta-signup">
                    <Button className="bg-sacred hover:bg-sacred/90 text-sacred-foreground shadow-lg shadow-sacred/20" size="sm">
                      Join Beta
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-sacred/10 via-transparent to-transparent rounded-full blur-3xl animate-gradient-shift" />
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-purple-500/8 via-transparent to-transparent rounded-full blur-3xl animate-gradient-shift-reverse" />
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-amber-500/5 to-rose-500/5 rounded-full blur-3xl animate-gradient-pulse" />
        </div>
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sacred/5 via-transparent to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge className="bg-sacred/10 text-sacred hover:bg-sacred/20 border-sacred/20 animate-fade-in-up shadow-[0_0_15px_rgba(59,130,246,0.4)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] transition-shadow" variant="outline">
              ✨ Trusted by Christians in Greek Life
            </Badge>
            
            <div className="inline-flex items-center justify-center animate-fade-in-up-delay-1">
              <div className="relative">
                <div className="absolute inset-0 bg-sacred/20 rounded-full blur-2xl animate-pulse-glow" />
                <div className="relative bg-gradient-to-br from-sacred/10 to-sacred/5 rounded-full p-8 border border-sacred/20">
                  <img 
                    src={logo} 
                    alt="Sacred Greeks" 
                    className="h-20 md:h-24 w-auto" 
                    loading="lazy"
                    decoding="async"
                    style={{ filter: 'brightness(0) saturate(100%) invert(38%) sepia(98%) saturate(3032%) hue-rotate(207deg) brightness(98%) contrast(97%)' }} 
                  />
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-foreground leading-tight animate-fade-in-up-delay-2">
              Sacred Greeks{' '}
              <span className="hero-title-gradient">Life App</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground font-medium animate-fade-in-up-delay-3 max-w-2xl mx-auto">
              You love Jesus. You love your letters.{' '}
              <span className="text-foreground">Navigate both with clarity and confidence.</span>
            </p>
            
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in">
              {heroText}
            </p>

            {/* Listen Button for Hero - Icon only for clean look */}
            <div className="flex justify-center pt-2">
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

          {/* Inline Benefits */}
          {!user && (
            <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto pt-6">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50 border border-border/50">
                <CheckCircle2 className="w-5 h-5 text-sacred flex-shrink-0 mt-0.5" />
                <div className="text-left">
                  <p className="font-semibold text-foreground text-sm">Daily Devotionals</p>
                  <p className="text-xs text-muted-foreground">Scripture-based guidance</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50 border border-border/50">
                <CheckCircle2 className="w-5 h-5 text-sacred flex-shrink-0 mt-0.5" />
                <div className="text-left">
                  <p className="font-semibold text-foreground text-sm">Track Your Journey</p>
                  <p className="text-xs text-muted-foreground">See your spiritual growth</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50 border border-border/50">
                <CheckCircle2 className="w-5 h-5 text-sacred flex-shrink-0 mt-0.5" />
                <div className="text-left">
                  <p className="font-semibold text-foreground text-sm">100% Free</p>
                  <p className="text-xs text-muted-foreground">No credit card required</p>
                </div>
              </div>
            </div>
          )}

          {!user && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link to="/beta-signup" className="group">
                <Button size="lg" className="bg-sacred hover:bg-sacred/90 text-sacred-foreground text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all btn-bounce hover:scale-105 flex flex-col h-auto">
                  <span className="flex items-center">
                    Become a Beta Tester
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="text-xs font-normal opacity-80 mt-1">Free early access • Shape the app • Exclusive features</span>
                </Button>
              </Link>
              <button 
                onClick={() => document.getElementById('objections-teaser')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center justify-center text-lg px-8 py-6 btn-bounce hover:scale-105 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Handle BGLO Objections
              </button>
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

        </div>

        {/* Mobile Install CTA */}
        <div className="mt-8 text-center">
          <Link to="/install" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-sacred transition-colors">
            <Smartphone className="w-4 h-4" />
            Install on your phone for the best experience
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-12 flex justify-center">
          <ScrollIndicator targetId="core-features" />
        </div>
      </div>
    </div>

      {/* Stats Section */}
      {!user && <StatsSection />}

      {/* BGLO Objections Teaser - Demo for non-authenticated */}
      {!user && (
        <div id="objections-teaser">
          <ObjectionsTeaser />
        </div>
      )}

      {/* Benefits Section */}
      {!user && (
        <div className="bg-gradient-to-b from-muted/30 to-background py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 animate-fade-in-up">
                Everything You Need to <span className="gradient-text">Thrive</span>
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {benefits.map((benefit, index) => (
                  <div 
                    key={index} 
                    className="flex items-start gap-3 p-4 rounded-xl bg-card/50 border border-border/50 hover-lift animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <CheckCircle2 className="w-5 h-5 text-sacred flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Core Features - The Real-Life Scene Solution */}
      <div id="core-features" className="container mx-auto px-4 py-16 bg-gradient-to-b from-muted/30 to-background scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <Badge className="bg-sky-500/20 text-sky-400 border-sky-400/30 mb-4">For the Christian Greek at Midnight</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              You Don't Have to <span className="shimmer-text">Choose</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Scrolling through denouncement videos? Feeling torn between your faith and your letters? This app is for you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {coreFeatures.map((feature, index) => {
              const isExternal = (feature as any).isExternal || false;
              const useModal = (feature as any).useModal || false;
              
              const cardContent = (
                <Card className="feature-card h-full transition-all hover:scale-[1.03] border-2 cursor-pointer group overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${feature.color}`} />
                  <CardHeader className="space-y-3 pb-2">
                    <div className="flex items-start justify-between">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      {feature.badge && (
                        <Badge className="bg-sacred text-white animate-pulse">{feature.badge}</Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg group-hover:text-sacred transition-colors">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
              
              if (isExternal && useModal) {
                return (
                  <ExternalContentModal
                    key={feature.title}
                    url={feature.link}
                    title={feature.title}
                    description={feature.description}
                    trigger={<div className="cursor-pointer">{cardContent}</div>}
                  />
                );
              }
              
              if (isExternal) {
                return (
                  <a key={feature.title} href={feature.link} target="_blank" rel="noopener noreferrer">
                    {cardContent}
                  </a>
                );
              }
              
              return (
                <Link key={feature.title} to={feature.link}>
                  {cardContent}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Subscription Upgrade Banner - Show for non-subscribed users */}
      {user && !subscribed && (
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-r from-sacred/10 via-purple-500/10 to-sacred/10 border-sacred/30 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-sacred/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
              <CardContent className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 md:p-8 relative">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-sacred to-purple-600 flex items-center justify-center shadow-lg shadow-sacred/30">
                    <Crown className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Unlock Premium Features</h3>
                    <p className="text-muted-foreground text-sm">AI Bible Study, Response Coach, and more with a free trial</p>
                  </div>
                </div>
                <Link to="/subscription">
                  <Button className="bg-sacred hover:bg-sacred/90 text-sacred-foreground shadow-lg hover:shadow-xl transition-all">
                    <Crown className="w-4 h-4 mr-2" />
                    Start Free Trial
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Subscription CTA for non-authenticated users */}
      {!user && (
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-r from-sacred/5 via-purple-500/5 to-sacred/5 border-border/50">
              <CardContent className="flex flex-col md:flex-row items-center justify-between gap-6 p-6">
                <div className="text-center md:text-left">
                  <h3 className="text-lg font-semibold text-foreground">Ready for Premium Features?</h3>
                  <p className="text-muted-foreground text-sm">Sign up free, then unlock AI tools with a trial</p>
                </div>
                <Link to="/auth">
                  <Button variant="outline" className="border-sacred/50 hover:bg-sacred/10">
                    Sign Up Free
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Features Section */}
      <div id="more-features" className="container mx-auto px-4 py-16 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in-up">
              Powerful Benefits That <span className="gradient-text">Transform</span> Your Life
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in-up-delay-1">
              Experience real transformation as you grow spiritually
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((feature, index) => {
              const isExternal = feature.isExternal || false;
              const requiresAuth = feature.requiresAuth || false;
              const isPremium = (feature as any).isPremium || false;
              const showLockBadge = requiresAuth && !user;
              const showPremiumBadge = isPremium && user && !subscribed;
              const premiumLocked = isPremium && !subscribed;
              
              // Determine link destination based on auth and subscription status
              const getLink = () => {
                if (!user) return "/auth";
                if (premiumLocked) return "/subscription";
                return feature.link;
              };
              
              if (isExternal && feature.useModal) {
                return (
                  <ExternalContentModal
                    key={feature.title}
                    url={feature.link}
                    title={feature.title}
                    description={feature.description}
                    trigger={
                      <div className="cursor-pointer">
                        <Card className="h-full transition-all hover:shadow-lg hover:scale-105 border-2 hover:border-sacred/50 cursor-pointer group animate-fade-in card-glow" style={{ animationDelay: `${index * 0.1}s` }}>
                          <CardHeader className="space-y-4">
                            <div className="flex items-start justify-between">
                              <div className="w-14 h-14 rounded-lg bg-muted flex items-center justify-center group-hover:bg-sacred/10 group-hover:scale-110 transition-all">
                                <feature.icon className={`w-7 h-7 ${feature.color}`} />
                              </div>
                            </div>
                            <CardTitle className="text-xl group-hover:text-sacred transition-colors">
                              {feature.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <CardDescription className="text-base">
                              {feature.description}
                            </CardDescription>
                          </CardContent>
                        </Card>
                      </div>
                    }
                  />
                );
              }
              
              if (isExternal) {
                return (
                  <a 
                    key={feature.title} 
                    href={feature.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Card className="h-full transition-all hover:shadow-lg hover:scale-105 border-2 hover:border-sacred/50 cursor-pointer group animate-fade-in card-glow" style={{ animationDelay: `${index * 0.1}s` }}>
                      <CardHeader className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="w-14 h-14 rounded-lg bg-muted flex items-center justify-center group-hover:bg-sacred/10 group-hover:scale-110 transition-all">
                            <feature.icon className={`w-7 h-7 ${feature.color}`} />
                          </div>
                        </div>
                        <CardTitle className="text-xl group-hover:text-sacred transition-colors">
                          {feature.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base">
                          {feature.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </a>
                );
              }
              
              return (
                <Link key={feature.title} to={getLink()}>
                  <Card className={`h-full transition-all hover:shadow-lg hover:scale-105 border-2 hover:border-sacred/50 cursor-pointer group animate-fade-in card-glow ${isPremium ? 'border-purple-500/30 bg-gradient-to-br from-purple-500/5 to-sacred/5' : ''}`} style={{ animationDelay: `${index * 0.1}s` }}>
                    <CardHeader className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className={`w-14 h-14 rounded-lg flex items-center justify-center group-hover:scale-110 transition-all ${isPremium ? 'bg-gradient-to-br from-purple-500/20 to-sacred/20' : 'bg-muted group-hover:bg-sacred/10'}`}>
                          <feature.icon className={`w-7 h-7 ${feature.color}`} />
                        </div>
                        {showPremiumBadge && (
                          <Badge className="bg-gradient-to-r from-purple-500 to-sacred text-white flex items-center gap-1 text-xs">
                            <Crown className="w-3 h-3" />
                            Pro
                          </Badge>
                        )}
                        {showLockBadge && !isPremium && (
                          <Badge variant="secondary" className="bg-sacred/10 text-sacred border-sacred/20 flex items-center gap-1 text-xs">
                            <Lock className="w-3 h-3" />
                            {feature.lockBadgeText || "Sign up"}
                          </Badge>
                        )}
                        {showLockBadge && isPremium && (
                          <Badge className="bg-gradient-to-r from-purple-500 to-sacred text-white flex items-center gap-1 text-xs">
                            <Crown className="w-3 h-3" />
                            Pro
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-xl group-hover:text-sacred transition-colors">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {feature.description}
                      </CardDescription>
                      {showLockBadge && !isPremium && (
                        <p className="text-xs text-sacred mt-3 font-medium">
                          Create a free account to unlock
                        </p>
                      )}
                      {(showPremiumBadge || (showLockBadge && isPremium)) && (
                        <p className="text-xs text-purple-600 dark:text-purple-400 mt-3 font-medium">
                          Start your free trial to unlock
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>

          {/* Healing Testimonial & Support Section */}
          <div id="healing-resources" className="mt-10 max-w-4xl mx-auto scroll-mt-20">
            {/* Family & Ministry Healing Card */}
            <Link to="/family-ministry-fallout">
              <Card className="mb-8 bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-amber-500/10 border-2 border-amber-500/30 hover:border-amber-500/50 transition-all hover:shadow-xl hover:shadow-amber-500/20 hover:scale-[1.02] cursor-pointer group">
                <CardContent className="flex flex-col sm:flex-row items-center gap-4 p-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-rose-500 to-amber-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <HandHeart className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-center sm:text-left flex-1">
                    <h3 className="text-lg font-bold text-foreground group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      Family, Ministry & Church Hurt Healing
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Navigate damaged relationships and process spiritual trauma with guided prayers and real testimonies
                    </p>
                  </div>
                  <Badge className="bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30">
                    Support
                  </Badge>
                </CardContent>
              </Card>
            </Link>
            
            {/* Testimonial Quote */}
            <div className="mt-8 bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-amber-500/10 rounded-2xl p-6 md:p-8 border border-amber-500/20">
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-rose-500 flex items-center justify-center">
                    <Quote className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="text-center md:text-left flex-1">
                  <p className="text-lg md:text-xl italic text-foreground/90 mb-3">
                    "After years of spiritual trauma from my church experience, I thought I'd never find healing. These resources helped me understand that my pain was valid and gave me a path forward. I'm finally reconnecting with my faith on my own terms."
                  </p>
                  <p className="text-sm font-medium text-amber-600 dark:text-amber-400">
                    — Anonymous Member, Healing Journey Participant
                  </p>
                </div>
              </div>
              
              {/* Share Your Story CTA */}
              <div className="mt-6 pt-6 border-t border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground text-center sm:text-left">
                  Your story could inspire someone else's healing journey.
                </p>
                <ShareHealingStoryDialog>
                  <Button 
                    variant="outline" 
                    className="border-amber-500/50 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 hover:border-amber-500"
                  >
                    <PenLine className="w-4 h-4 mr-2" />
                    Share Your Story
                  </Button>
                </ShareHealingStoryDialog>
              </div>
            </div>

            {/* Crisis Support Section */}
            <div className="mt-8 bg-gradient-to-br from-rose-500/10 to-red-500/10 dark:from-rose-950/30 dark:to-red-950/30 rounded-2xl p-6 md:p-8 border-2 border-rose-500/30">
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center mb-4 animate-pulse">
                  <Phone className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-xl md:text-2xl font-bold text-rose-600 dark:text-rose-400 mb-2">
                  Need Immediate Support?
                </h4>
                <p className="text-muted-foreground mb-4 max-w-xl">
                  If you're in crisis or experiencing a spiritual emergency, please reach out. You don't have to face this alone.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 w-full max-w-lg">
                  <a 
                    href="tel:988" 
                    className="flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 text-white font-semibold py-3 px-6 rounded-xl transition-all hover:scale-105 shadow-lg"
                  >
                    <Phone className="w-5 h-5" />
                    988 Suicide & Crisis Lifeline
                  </a>
                  <a 
                    href="https://www.crisistextline.org/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-6 rounded-xl transition-all hover:scale-105 shadow-lg"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Text HOME to 741741
                  </a>
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  Available 24/7 • Free • Confidential
                </p>
              </div>
            </div>

            {/* Approved Healing Stories from Community */}
            <div className="mt-8">
              <ApprovedHealingStories />
            </div>
          </div>
        </div>
      </div>


      {/* Testimonials */}
      <div id="testimonials" className="scroll-mt-20">
        <Testimonials />
      </div>

      {/* Share Section */}
      <ShareSection />

      {/* Final CTA */}
      {!user && (
        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-4xl mx-auto bg-gradient-to-br from-sacred/5 to-sacred/10 border-sacred/20">
            <CardHeader className="text-center space-y-4 pb-8">
              <CardTitle className="text-3xl md:text-4xl font-bold">
                Ready to Navigate Faith and Greek Life with Confidence?
              </CardTitle>
              <CardDescription className="text-lg">
                Join Christians in Greek organizations who are growing spiritually while honoring their letters.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center pb-8">
              <Link to="/auth">
                <Button size="lg" className="bg-sacred hover:bg-sacred/90 text-sacred-foreground text-lg px-10 py-6 shadow-lg hover:shadow-xl transition-all btn-bounce hover:scale-105 group">
                  Create Your Free Account
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link to="/user-guide" className="text-muted-foreground hover:text-sacred transition-colors font-medium">
                📖 User Guide
              </Link>
              <Link to="/faq" className="text-muted-foreground hover:text-sacred transition-colors">
                FAQ
              </Link>
              <a
                href="https://www.sacredgreeks.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-sacred transition-colors"
              >
                SacredGreeks.com
              </a>
              <Link to="/qr-code" className="text-muted-foreground hover:text-sacred transition-colors">
                Get QR Code
              </Link>
              <Link to="/privacy" className="text-muted-foreground hover:text-sacred transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-muted-foreground hover:text-sacred transition-colors">
                Terms of Service
              </Link>
              <a
                href="https://chatgpt.com/g/g-683eb25d5914819097a1c08dae64f36f-sacred-greeks-life-assistant"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-sacred transition-colors"
              >
                ChatGPT Assistant
              </a>
              <a
                href="https://sacredgreeks.com/#card-xr13vgv4m5slqey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-sacred transition-colors"
              >
                Start Here
              </a>
              <a
                href="https://a.co/d/5a6Yt9t"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-sacred transition-colors"
              >
                Sacred, Not Sinful Book
              </a>
              <a
                href="https://sacredgreeks.jellypod.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-sacred transition-colors"
              >
                Podcast
              </a>
              <a
                href="https://gamma.app/docs/Christian-Greek-Life-Study-Guide-ihr8fq0g089n32t"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-sacred transition-colors"
              >
                Study Guide
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
