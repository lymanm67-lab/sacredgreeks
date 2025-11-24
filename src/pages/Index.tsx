import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Video, Users, Sparkles, LogIn, LayoutDashboard, BookOpen, ListChecks, TrendingUp, Calendar, ArrowRight, CheckCircle2 } from "lucide-react";
import { Testimonials } from "@/components/Testimonials";
import { MobileQRCode } from "@/components/MobileQRCode";
import logo from "@/assets/sacred-greeks-logo.png";

const features = [
  {
    title: "Daily Devotionals",
    description: "Start each day with Scripture-based reflections focused on the P.R.O.O.F. framework",
    icon: BookOpen,
    link: "/devotional",
    color: "text-blue-500",
  },
  {
    title: "Decision Guide",
    description: "Navigate difficult questions with personalized biblical guidance",
    icon: Heart,
    link: "/guide",
    color: "text-sacred",
  },
  {
    title: "Prayer Journal",
    description: "Document your prayers and track God's faithfulness over time",
    icon: Sparkles,
    link: "/prayer-journal",
    color: "text-purple-500",
  },
  {
    title: "Progress Tracking",
    description: "Monitor your spiritual growth and engagement with the app",
    icon: TrendingUp,
    link: "/progress",
    color: "text-green-500",
  },
  {
    title: "Community Service",
    description: "Plan and track service projects that honor Christ",
    icon: ListChecks,
    link: "/dashboard",
    color: "text-orange-500",
  },
  {
    title: "Chapter Notes",
    description: "Keep organized records of meetings and action items",
    icon: Calendar,
    link: "/dashboard",
    color: "text-cyan-500",
  },
];

const benefits = [
  "Access daily devotionals tailored for Greek life",
  "Track your spiritual journey and progress",
  "Get personalized guidance for difficult decisions",
  "Connect faith and fraternity/sorority life",
  "Build a private prayer journal",
  "Organize chapter meetings with purpose",
];

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/30 to-background">
      {/* Header with Auth */}
      <header className="border-b border-border bg-card/80 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 rounded-lg p-2">
                <img src={logo} alt="Sacred Greeks" className="h-6 w-auto brightness-0 invert" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MobileQRCode />
              {user ? (
                <Link to="/dashboard">
                  <Button className="bg-sacred hover:bg-sacred/90 text-sacred-foreground">
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/auth">
                    <Button variant="ghost" size="sm">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/auth">
                    <Button className="bg-sacred hover:bg-sacred/90 text-sacred-foreground" size="sm">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <Badge className="bg-sacred/10 text-sacred hover:bg-sacred/20 border-sacred/20" variant="outline">
            Trusted by Christians in Greek Life
          </Badge>
          
          <div className="inline-flex items-center justify-center mb-4 animate-fade-in bg-blue-50 rounded-full p-6">
            <img src={logo} alt="Sacred Greeks" className="h-24 w-auto" style={{ filter: 'brightness(0) saturate(100%) invert(38%) sepia(98%) saturate(3032%) hue-rotate(207deg) brightness(98%) contrast(97%)' }} />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight animate-fade-in">
            Sacred Greeks <span className="text-sacred">Life App</span>
          </h1>
          
          <p className="text-2xl md:text-3xl text-muted-foreground font-medium animate-fade-in">
            You love Jesus. You love your letters. <br className="hidden md:inline" />
            Navigate both with clarity and confidence.
          </p>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Your daily companion for integrating faith and Greek life. Get devotionals, guidance, 
            prayer tools, and progress tracking—all grounded in the P.R.O.O.F. framework from 
            "Sacred, Not Sinful."
          </p>

          {!user && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link to="/auth">
                <Button size="lg" className="bg-sacred hover:bg-sacred/90 text-sacred-foreground text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all">
                  Start Your Journey Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/guide">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                  Try Decision Guide
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
        </div>
      </div>

      {/* Benefits Section */}
      {!user && (
        <div className="container mx-auto px-4 py-12 bg-muted/50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Everything You Need to Thrive
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CheckCircle2 className="w-6 h-6 text-sacred flex-shrink-0 mt-1" />
                  <p className="text-lg text-muted-foreground">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful Features for Your Journey
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Every tool you need to grow spiritually while honoring your Greek letters
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Link key={feature.title} to={user ? feature.link : "/auth"}>
                <Card className="h-full transition-all hover:shadow-lg hover:scale-105 border-2 hover:border-sacred/50 cursor-pointer group animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardHeader className="space-y-4">
                    <div className="w-14 h-14 rounded-lg bg-muted flex items-center justify-center group-hover:bg-sacred/10 transition-colors">
                      <feature.icon className={`w-7 h-7 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-xl">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <Testimonials />

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
                <Button size="lg" className="bg-sacred hover:bg-sacred/90 text-sacred-foreground text-lg px-10 py-6 shadow-lg hover:shadow-xl transition-all">
                  Create Your Free Account
                  <ArrowRight className="w-5 h-5 ml-2" />
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
              <Link to="/faq" className="text-muted-foreground hover:text-sacred transition-colors">
                FAQ
              </Link>
              <a
                href="https://sacredgreeks.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-sacred transition-colors"
              >
                SacredGreeks.com
              </a>
              <Link to="/privacy" className="text-muted-foreground hover:text-sacred transition-colors">
                Privacy Policy
              </Link>
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
