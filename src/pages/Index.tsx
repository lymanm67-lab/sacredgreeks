import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useDemoMode } from "@/contexts/DemoModeContext";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";
import logo from "@/assets/sacred-greeks-logo.png";
import { cn } from "@/lib/utils";
import { Play, Sparkles, User, ChevronDown, Menu, X } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
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

  return (
    <div className={cn(
      "min-h-screen bg-muted/30 flex flex-col",
      isDemoMode && "pt-11"
    )}>
      {/* Navigation Header */}
      <header className={cn(
        "border-b border-border bg-background sticky z-50",
        isDemoMode ? "top-11" : "top-0"
      )}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Sacred Greeks" className="h-8 w-auto" loading="lazy" />
            </Link>

            {/* Main Navigation - Desktop */}
            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/" className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
                    Home
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium">
                    Meet Dr. Lyman
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-64 p-2 bg-background border border-border rounded-md shadow-lg">
                      <Link to="/meet-dr-lyman" className="block px-3 py-2 text-sm rounded-md hover:bg-muted font-medium">
                        Overview
                      </Link>
                      <Link to="/about" className="block px-3 py-2 text-sm rounded-md hover:bg-muted">
                        About Dr. Montgomery
                      </Link>
                      <Link to="/podcast-appearances" className="block px-3 py-2 text-sm rounded-md hover:bg-muted">
                        Podcast Appearances
                      </Link>
                      <Link to="/coaching-application" className="block px-3 py-2 text-sm rounded-md hover:bg-muted">
                        Book Speaking
                      </Link>
                      <Link to="/contact" className="block px-3 py-2 text-sm rounded-md hover:bg-muted">
                        Press & Media
                      </Link>
                      <a 
                        href="/resources/lyman-media-kit-2025.pdf" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block px-3 py-2 text-sm rounded-md hover:bg-muted"
                      >
                        Media Kit
                      </a>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium">
                    The Challenge
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-64 p-2">
                      <Link to="/the-challenge" className="block px-3 py-2 text-sm rounded-md hover:bg-muted font-medium">
                        Overview
                      </Link>
                      <Link to="/guide" className="block px-3 py-2 text-sm rounded-md hover:bg-muted">
                        P.R.O.O.F. Assessment
                      </Link>
                      <Link to="/shattered-masks" className="block px-3 py-2 text-sm rounded-md hover:bg-muted">
                        Shattered Masks
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium">
                    Biblical Guide
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-64 p-2">
                      <Link to="/biblical-guides" className="block px-3 py-2 text-sm rounded-md hover:bg-muted font-medium">
                        Overview
                      </Link>
                      <Link to="/symbol-guide" className="block px-3 py-2 text-sm rounded-md hover:bg-muted">
                        Symbol Guide
                      </Link>
                      <Link to="/myth-buster" className="block px-3 py-2 text-sm rounded-md hover:bg-muted">
                        Myth Buster Library
                      </Link>
                      <Link to="/bible-study" className="block px-3 py-2 text-sm rounded-md hover:bg-muted">
                        Bible Study
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/the-book" className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
                    The Book
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/podcast" className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
                    Podcast
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium">
                    Tools & Resources
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-64 p-2">
                      <Link to="/tools-resources" className="block px-3 py-2 text-sm rounded-md hover:bg-muted font-medium">
                        Overview
                      </Link>
                      <Link to="/resources" className="block px-3 py-2 text-sm rounded-md hover:bg-muted">
                        Resources Library
                      </Link>
                      <Link to="/study" className="block px-3 py-2 text-sm rounded-md hover:bg-muted">
                        Study Guide
                      </Link>
                      <Link to="/video-library" className="block px-3 py-2 text-sm rounded-md hover:bg-muted">
                        Video Library
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium">
                    Greek Life
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-64 p-2">
                      <Link to="/greek-life" className="block px-3 py-2 text-sm rounded-md hover:bg-muted font-medium">
                        Overview
                      </Link>
                      <Link to="/symbol-guide" className="block px-3 py-2 text-sm rounded-md hover:bg-muted">
                        Organizations Guide
                      </Link>
                      <Link to="/journey" className="block px-3 py-2 text-sm rounded-md hover:bg-muted">
                        30-Day Journey
                      </Link>
                      <Link to="/anti-hazing" className="block px-3 py-2 text-sm rounded-md hover:bg-muted">
                        Anti-Hazing Resources
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium">
                    Community
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-64 p-2">
                      <Link to="/forum" className="block px-3 py-2 text-sm rounded-md hover:bg-muted">
                        Forum
                      </Link>
                      <Link to="/prayer-wall" className="block px-3 py-2 text-sm rounded-md hover:bg-muted">
                        Prayer Wall
                      </Link>
                      <Link to="/ask-dr-lyman" className="block px-3 py-2 text-sm rounded-md hover:bg-muted">
                        Ask Dr. Lyman
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/contact" className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
                    Contact
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Right Side */}
            <div className="flex items-center gap-2">
              {/* Mobile Menu Button */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild className="lg:hidden">
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
  );
};

export default Index;