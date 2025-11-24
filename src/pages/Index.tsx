import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Video, Users, Sparkles, LogIn, LayoutDashboard } from "lucide-react";

const scenarios = [
  {
    id: "clip",
    title: "I saw a clip or sermon attacking BGLOs",
    description: "Process what you've heard and find biblical clarity",
    icon: Video,
  },
  {
    id: "pressure",
    title: "Someone is pressuring me to denounce or resign",
    description: "Navigate pressure with wisdom and peace",
    icon: Users,
  },
  {
    id: "event",
    title: "I want to plan a faith-based event in my org",
    description: "Design ministry initiatives with confidence",
    icon: Sparkles,
  },
];

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Header with Auth */}
      <header className="border-b border-border bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-sacred" />
              <span className="font-semibold">Sacred Greeks</span>
            </div>
            <div>
              {user ? (
                <Link to="/dashboard">
                  <Button variant="outline" size="sm">
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <Link to="/auth">
                  <Button variant="outline" size="sm">
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-sacred/10 mb-4">
            <Heart className="w-10 h-10 text-sacred" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-foreground">
            Sacred Greeks Decision Guide
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground font-medium">
            You love Jesus. You love your letters. You can seek clarity without pressure.
          </p>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            This guide helps Christians in Black Greek Letter Organizations process difficult
            questions and decisions using the P.R.O.O.F. framework from "Sacred, Not Sinful."
            Take a few minutes to reflect on your situation and receive biblical, pastoral guidance
            for your next steps.
          </p>
        </div>

        {/* Scenario Cards */}
        <div className="max-w-5xl mx-auto mt-16 grid gap-6 md:grid-cols-3">
          {scenarios.map((scenario) => (
            <Link key={scenario.id} to={`/guide?scenario=${scenario.id}`}>
              <Card className="h-full transition-all hover:shadow-lg hover:scale-105 border-2 hover:border-sacred/50 cursor-pointer group">
                <CardHeader className="space-y-4">
                  <div className="w-16 h-16 rounded-full bg-sacred/10 flex items-center justify-center group-hover:bg-sacred/20 transition-colors">
                    <scenario.icon className="w-8 h-8 text-sacred" />
                  </div>
                  <CardTitle className="text-xl leading-tight">
                    {scenario.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {scenario.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

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
              <Link to="/faq" className="text-muted-foreground hover:text-sacred transition-colors">
                FAQ
              </Link>
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
