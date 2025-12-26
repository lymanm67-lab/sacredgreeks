import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useDemoMode } from "@/contexts/DemoModeContext";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";
import logo from "@/assets/sacred-greeks-logo.png";
import { cn } from "@/lib/utils";
import { Play, Sparkles, User, ChevronDown, ChevronRight, Menu, Home, BookOpen, Mic, Users, Phone, Award, Heart, Video, FileText, Shield, Map, MessageCircle, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";

const Index = () => {
  const { user } = useAuth();
  const { isDemoMode, setDemoMode } = useDemoMode();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

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

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // If user is logged in, redirect to dashboard
  if (user) {
    navigate('/dashboard');
    return null;
  }

  const MobileNavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
    <Link
      to={to}
      onClick={closeMobileMenu}
      className="block px-4 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-colors"
    >
      {children}
    </Link>
  );

  const MobileNavSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <Collapsible>
      <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-md transition-colors">
        {title}
        <ChevronDown className="h-4 w-4" />
      </CollapsibleTrigger>
      <CollapsibleContent className="pl-4 space-y-1">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );

  // Desktop sidebar navigation items
  const navSections = [
    {
      id: 'home',
      title: 'Home',
      icon: Home,
      iconColor: 'text-blue-500',
      to: '/',
      items: []
    },
    {
      id: 'dr-lyman',
      title: 'Meet Dr. Lyman',
      icon: User,
      iconColor: 'text-purple-500',
      items: [
        { to: '/meet-dr-lyman', label: 'Overview' },
        { to: '/about', label: 'About Dr. Montgomery' },
        { to: '/podcast-appearances', label: 'Podcast Appearances' },
        { to: '/coaching-application', label: 'Book Speaking' },
        { to: '/contact', label: 'Press & Media' },
        { to: '/resources/lyman-media-kit-2025.pdf', label: 'Media Kit', external: true },
      ]
    },
    {
      id: 'challenge',
      title: 'The Challenge',
      icon: Award,
      iconColor: 'text-amber-500',
      items: [
        { to: '/the-challenge', label: 'Overview' },
        { to: '/guide', label: 'P.R.O.O.F. Assessment' },
        { to: '/shattered-masks', label: 'Shattered Masks' },
      ]
    },
    {
      id: 'biblical',
      title: 'Biblical Guide',
      icon: BookOpen,
      iconColor: 'text-emerald-500',
      items: [
        { to: '/biblical-guides', label: 'Overview' },
        { to: '/symbol-guide', label: 'Symbol Guide' },
        { to: '/myth-buster', label: 'Myth Buster Library' },
        { to: '/bible-study', label: 'Bible Study' },
      ]
    },
    {
      id: 'book',
      title: 'The Book',
      icon: FileText,
      iconColor: 'text-rose-500',
      to: '/the-book',
      items: []
    },
    {
      id: 'podcast',
      title: 'Podcast',
      icon: Mic,
      iconColor: 'text-orange-500',
      to: '/podcast',
      items: []
    },
    {
      id: 'tools',
      title: 'Tools & Resources',
      icon: Video,
      iconColor: 'text-cyan-500',
      items: [
        { to: '/tools-resources', label: 'Overview' },
        { to: '/resources', label: 'Resources Library' },
        { to: '/study', label: 'Study Guide' },
        { to: '/video-library', label: 'Video Library' },
      ]
    },
    {
      id: 'greek-life',
      title: 'Greek Life',
      icon: Shield,
      iconColor: 'text-indigo-500',
      items: [
        { to: '/greek-life', label: 'Overview' },
        { to: '/symbol-guide', label: 'Organizations Guide' },
        { to: '/journey', label: '30-Day Journey' },
        { to: '/anti-hazing', label: 'Anti-Hazing Resources' },
      ]
    },
    {
      id: 'community',
      title: 'Community',
      icon: Users,
      iconColor: 'text-pink-500',
      items: [
        { to: '/forum', label: 'Forum' },
        { to: '/prayer-wall', label: 'Prayer Wall' },
        { to: '/ask-dr-lyman', label: 'Ask Dr. Lyman' },
      ]
    },
    {
      id: 'contact',
      title: 'Contact',
      icon: Phone,
      iconColor: 'text-teal-500',
      to: '/contact',
      items: []
    },
  ];

  return (
    <div className={cn(
      "min-h-screen bg-muted/30 flex",
      isDemoMode && "pt-11"
    )}>
      {/* Desktop Sidebar Navigation */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-border bg-background h-screen sticky top-0">
        {/* Logo */}
        <div className="p-4 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Sacred Greeks" className="h-8 w-auto" loading="lazy" />
            <span className="font-semibold text-foreground">Sacred Greeks</span>
          </Link>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 py-4">
          <nav className="px-3 space-y-1">
            {navSections.map((section) => {
              const Icon = section.icon;
              const isOpen = openSections[section.id];
              const hasItems = section.items && section.items.length > 0;

              if (!hasItems && section.to) {
                return (
                  <Link
                    key={section.id}
                    to={section.to}
                    className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
                  >
                    <Icon className={cn("w-4 h-4", section.iconColor)} />
                    {section.title}
                  </Link>
                );
              }

              return (
                <div key={section.id}>
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="flex items-center justify-between w-full px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
                  >
                    <span className="flex items-center gap-3">
                      <Icon className={cn("w-4 h-4", section.iconColor)} />
                      {section.title}
                    </span>
                    <ChevronRight className={cn(
                      "w-4 h-4 text-muted-foreground transition-transform",
                      isOpen && "rotate-90"
                    )} />
                  </button>
                  {isOpen && (
                    <div className="ml-7 mt-1 space-y-1 border-l border-border pl-3">
                      {section.items.map((item) => (
                        item.external ? (
                          <a
                            key={item.to}
                            href={item.to}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors"
                          >
                            {item.label}
                          </a>
                        ) : (
                          <Link
                            key={item.to}
                            to={item.to}
                            className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors"
                          >
                            {item.label}
                          </Link>
                        )
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </ScrollArea>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-border space-y-2">
          <Button 
            onClick={handleSignIn}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            size="sm"
          >
            <User className="w-4 h-4 mr-2" />
            Sign In
          </Button>
          <div className="flex justify-center">
            <ThemeToggle />
          </div>
        </div>
      </aside>

      {/* Mobile Header + Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <header className={cn(
          "lg:hidden border-b border-border bg-background sticky z-50",
          isDemoMode ? "top-11" : "top-0"
        )}>
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-14">
              {/* Logo */}
              <Link to="/" className="flex items-center">
                <img src={logo} alt="Sacred Greeks" className="h-8 w-auto" loading="lazy" />
              </Link>

              {/* Right Side */}
              <div className="flex items-center gap-2">
                {/* Mobile Menu Button */}
                <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Menu className="h-5 w-5" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-80 p-0">
                    <SheetHeader className="p-4 border-b border-border">
                      <SheetTitle className="flex items-center gap-2">
                        <img src={logo} alt="Sacred Greeks" className="h-6 w-auto" />
                      </SheetTitle>
                    </SheetHeader>
                    <ScrollArea className="h-[calc(100vh-80px)]">
                      <div className="p-4 space-y-2">
                        <MobileNavLink to="/">Home</MobileNavLink>
                        
                        <MobileNavSection title="Meet Dr. Lyman">
                          <MobileNavLink to="/meet-dr-lyman">Overview</MobileNavLink>
                          <MobileNavLink to="/about">About Dr. Montgomery</MobileNavLink>
                          <MobileNavLink to="/podcast-appearances">Podcast Appearances</MobileNavLink>
                          <MobileNavLink to="/coaching-application">Book Speaking</MobileNavLink>
                          <a 
                            href="/resources/lyman-media-kit-2025.pdf" 
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={closeMobileMenu}
                            className="block px-4 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-colors"
                          >
                            Media Kit
                          </a>
                          <MobileNavLink to="/contact">Press & Media</MobileNavLink>
                        </MobileNavSection>

                        <MobileNavSection title="The Challenge">
                          <MobileNavLink to="/the-challenge">Overview</MobileNavLink>
                          <MobileNavLink to="/guide">P.R.O.O.F. Assessment</MobileNavLink>
                          <MobileNavLink to="/shattered-masks">Shattered Masks</MobileNavLink>
                        </MobileNavSection>

                        <MobileNavSection title="Biblical Guide">
                          <MobileNavLink to="/biblical-guides">Overview</MobileNavLink>
                          <MobileNavLink to="/symbol-guide">Symbol Guide</MobileNavLink>
                          <MobileNavLink to="/myth-buster">Myth Buster Library</MobileNavLink>
                          <MobileNavLink to="/bible-study">Bible Study</MobileNavLink>
                        </MobileNavSection>

                        <MobileNavLink to="/the-book">The Book</MobileNavLink>
                        <MobileNavLink to="/podcast">Podcast</MobileNavLink>

                        <MobileNavSection title="Tools & Resources">
                          <MobileNavLink to="/tools-resources">Overview</MobileNavLink>
                          <MobileNavLink to="/resources">Resources Library</MobileNavLink>
                          <MobileNavLink to="/study">Study Guide</MobileNavLink>
                          <MobileNavLink to="/video-library">Video Library</MobileNavLink>
                        </MobileNavSection>

                        <MobileNavSection title="Greek Life">
                          <MobileNavLink to="/greek-life">Overview</MobileNavLink>
                          <MobileNavLink to="/symbol-guide">Organizations Guide</MobileNavLink>
                          <MobileNavLink to="/journey">30-Day Journey</MobileNavLink>
                          <MobileNavLink to="/anti-hazing">Anti-Hazing Resources</MobileNavLink>
                        </MobileNavSection>

                        <MobileNavSection title="Community">
                          <MobileNavLink to="/forum">Forum</MobileNavLink>
                          <MobileNavLink to="/prayer-wall">Prayer Wall</MobileNavLink>
                          <MobileNavLink to="/ask-dr-lyman">Ask Dr. Lyman</MobileNavLink>
                        </MobileNavSection>

                        <MobileNavLink to="/contact">Contact</MobileNavLink>

                        <div className="pt-4 border-t border-border mt-4">
                          <Button 
                            onClick={() => {
                              closeMobileMenu();
                              handleSignIn();
                            }}
                            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                          >
                            <User className="w-4 h-4 mr-2" />
                            Sign In
                          </Button>
                        </div>
                      </div>
                    </ScrollArea>
                  </SheetContent>
                </Sheet>

                <Button 
                  onClick={handleSignIn}
                  className="hidden sm:flex bg-primary hover:bg-primary/90 text-primary-foreground"
                  size="sm"
                >
                  <User className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center px-4 py-12">
          <Card className="w-full max-w-lg shadow-lg border-border/50">
            <CardContent className="p-8">
              {/* Logo */}
              <div className="flex justify-center mb-6">
                <img src={logo} alt="Sacred Greeks" className="h-12 w-auto opacity-80" loading="lazy" />
              </div>

              {/* Title */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-serif font-medium text-foreground mb-2">
                  Welcome to Sacred Greeks
                </h1>
                <p className="text-muted-foreground">
                  Navigate Greek life with faith and confidence
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
    </div>
  );
};

export default Index;
