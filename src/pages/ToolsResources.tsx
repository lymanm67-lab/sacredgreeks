import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Home, Compass, BookOpen, MessageSquare, FileText, Shield, 
  Users, Headphones, Video, Download, ArrowRight, Sparkles 
} from "lucide-react";

const ToolsResources = () => {
  const tools = [
    {
      icon: Compass,
      title: "Sacred Greeks Assessment",
      description: "Discover where you stand in your faith and Greek journey with our comprehensive assessment.",
      link: "/sacred-greeks",
      badge: "Popular"
    },
    {
      icon: BookOpen,
      title: "Study Guide",
      description: "12-session study guide based on Sacred, Not Sinful for individual or group study.",
      link: "/study"
    },
    {
      icon: MessageSquare,
      title: "Response Coach",
      description: "AI-powered tool to help you respond to challenging Greek life situations biblically.",
      link: "/dashboard",
      badge: "AI Powered"
    },
    {
      icon: Shield,
      title: "Myth Buster",
      description: "Biblical responses to common myths and misconceptions about Greek life and faith.",
      link: "/myth-buster"
    },
    {
      icon: FileText,
      title: "Symbol Guide",
      description: "Comprehensive guide to understanding Greek symbols through a biblical lens.",
      link: "/symbol-guide"
    },
    {
      icon: Users,
      title: "Prayer Wall",
      description: "Connect with other believers through prayer support and encouragement.",
      link: "/prayer-wall"
    }
  ];

  const resources = [
    {
      icon: FileText,
      title: "Biblical Framework PDF",
      description: "Downloadable guide for understanding Greek life biblically",
      link: "/resources"
    },
    {
      icon: Download,
      title: "Repentance Checklist",
      description: "Practical checklist for spiritual renewal",
      link: "/resources"
    },
    {
      icon: Headphones,
      title: "Podcast Episodes",
      description: "Audio teaching from Dr. Montgomery",
      link: "/podcast"
    },
    {
      icon: Video,
      title: "Video Library",
      description: "Watch teachings, testimonies, and more",
      link: "/video-library"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Home className="w-4 h-4" />
            <span className="text-sm font-medium">Home</span>
          </Link>
          <h1 className="text-lg font-semibold text-foreground">Tools & Resources</h1>
          <div className="w-16" />
        </div>
      </header>

      <main className="container mx-auto px-4 py-10 max-w-5xl space-y-8">
        {/* Hero */}
        <div className="text-center space-y-4">
          <Badge className="bg-sacred/10 text-sacred border-sacred/20">
            Equipping Believers
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Tools & Resources
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to navigate Greek life with faith, integrity, and biblical wisdom.
          </p>
        </div>

        {/* Interactive Tools */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Interactive Tools</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tools.map((tool, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow relative overflow-hidden">
                {tool.badge && (
                  <Badge className="absolute top-3 right-3 bg-sacred/10 text-sacred text-xs">
                    {tool.badge}
                  </Badge>
                )}
                <CardHeader>
                  <div className="p-2 rounded-lg bg-sacred/10 w-fit">
                    <tool.icon className="w-5 h-5 text-sacred" />
                  </div>
                  <CardTitle className="text-lg mt-2">{tool.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <CardDescription>{tool.description}</CardDescription>
                  <Button asChild variant="ghost" size="sm" className="p-0 h-auto text-sacred">
                    <Link to={tool.link}>
                      Access Tool <ArrowRight className="w-3 h-3 ml-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Downloadable Resources</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {resources.map((resource, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6 text-center space-y-3">
                  <div className="p-3 rounded-full bg-sacred/10 w-fit mx-auto">
                    <resource.icon className="w-6 h-6 text-sacred" />
                  </div>
                  <h4 className="font-medium">{resource.title}</h4>
                  <p className="text-xs text-muted-foreground">{resource.description}</p>
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link to={resource.link}>View</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Ask Dr. Lyman */}
        <Card className="border-sacred/30 bg-gradient-to-br from-sacred/5 to-background">
          <CardContent className="p-8">
            <div className="md:flex items-center justify-between gap-6">
              <div className="space-y-3 mb-4 md:mb-0">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-sacred" />
                  <Badge variant="outline" className="border-sacred/30 text-sacred">AI Powered</Badge>
                </div>
                <h3 className="text-2xl font-bold">Ask Dr. Lyman</h3>
                <p className="text-muted-foreground max-w-lg">
                  Get instant, biblically-grounded answers to your questions about Greek life and faith. Our AI assistant is trained on Dr. Montgomery's teachings.
                </p>
              </div>
              <Button asChild className="bg-sacred hover:bg-sacred/90">
                <Link to="/ask-dr-lyman">
                  Ask a Question
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Daily Tools */}
        <Card className="bg-gradient-to-br from-sacred/5 to-sacred/10 border-sacred/20">
          <CardHeader>
            <CardTitle>Daily Spiritual Tools</CardTitle>
            <CardDescription>Build consistent spiritual habits with these daily resources</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-3 gap-4">
              <Button asChild variant="outline" className="h-auto py-4 flex-col">
                <Link to="/devotional">
                  <BookOpen className="w-6 h-6 text-sacred mb-2" />
                  <span className="font-medium">Daily Devotional</span>
                  <span className="text-xs text-muted-foreground">Scripture & reflection</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4 flex-col">
                <Link to="/prayer-journal">
                  <FileText className="w-6 h-6 text-sacred mb-2" />
                  <span className="font-medium">Prayer Journal</span>
                  <span className="text-xs text-muted-foreground">Track your prayers</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4 flex-col">
                <Link to="/bible-study">
                  <BookOpen className="w-6 h-6 text-sacred mb-2" />
                  <span className="font-medium">Bible Study</span>
                  <span className="text-xs text-muted-foreground">Topical searches</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">
            Not sure where to start? Take the assessment to get personalized recommendations.
          </p>
          <Button asChild className="bg-sacred hover:bg-sacred/90">
            <Link to="/sacred-greeks">Start Your Journey</Link>
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Sacred Greeks™. All Rights Reserved.
          </p>
        </div>
      </main>
    </div>
  );
};

export default ToolsResources;
