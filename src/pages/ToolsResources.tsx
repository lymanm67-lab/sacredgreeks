import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Home, Compass, BookOpen, MessageSquare, FileText, ShieldAlert, 
  Heart, Headphones, Video, Library, ArrowRight, Sparkles, Calendar
} from "lucide-react";

const ToolsResources = () => {
  const mainTools = [
    {
      icon: Calendar,
      title: "30-Day Journey",
      description: "A guided 30-day spiritual journey to deepen your faith while embracing your Greek identity. Daily devotionals, reflections, and action steps.",
      link: "/journey",
      badge: "Featured",
      color: "from-purple-500/20 to-sacred/10"
    },
    {
      icon: Heart,
      title: "Prayer Journal",
      description: "Track your prayers, celebrate answered prayers, and build a consistent prayer life. Your personal space for communion with God.",
      link: "/prayer-journal",
      badge: "Daily Tool",
      color: "from-rose-500/20 to-sacred/10"
    },
    {
      icon: Compass,
      title: "Healing Resources",
      description: "Resources for those seeking healing from hazing trauma, spiritual confusion, or difficult Greek life experiences. You're not alone.",
      link: "/resources",
      badge: "Support",
      color: "from-blue-500/20 to-sacred/10"
    },
    {
      icon: ShieldAlert,
      title: "Anti-Hazing Resources",
      description: "Education, prevention strategies, and support for building a safer Greek life. Every member deserves dignity and respect.",
      link: "/anti-hazing",
      badge: "Important",
      color: "from-amber-500/20 to-sacred/10"
    },
    {
      icon: Sparkles,
      title: "Ask Dr. Lyman",
      description: "Get instant, biblically-grounded answers to your questions about Greek life and faith. AI assistant trained on Dr. Montgomery's teachings.",
      link: "/ask-dr-lyman",
      badge: "AI Powered",
      color: "from-emerald-500/20 to-sacred/10"
    },
    {
      icon: Library,
      title: "Resource Library",
      description: "Comprehensive collection of PDFs, guides, checklists, and downloadable materials for your Sacred Greeks journey.",
      link: "/resources",
      badge: "Library",
      color: "from-indigo-500/20 to-sacred/10"
    }
  ];

  const additionalTools = [
    {
      icon: BookOpen,
      title: "Study Guide",
      description: "12-session study guide based on Sacred, Not Sinful",
      link: "/study"
    },
    {
      icon: MessageSquare,
      title: "Response Coach",
      description: "AI-powered biblical responses to Greek life situations",
      link: "/dashboard"
    },
    {
      icon: FileText,
      title: "Symbol Guide",
      description: "Understanding Greek symbols through a biblical lens",
      link: "/symbol-guide"
    },
    {
      icon: Headphones,
      title: "Podcast",
      description: "Audio teachings from Dr. Montgomery",
      link: "/podcast"
    },
    {
      icon: Video,
      title: "Video Library",
      description: "Watch teachings, testimonies, and more",
      link: "/video-library"
    },
    {
      icon: BookOpen,
      title: "Bible Study",
      description: "Topical Bible studies for Greek life",
      link: "/bible-study"
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

      <main className="container mx-auto px-4 py-10 max-w-6xl space-y-10">
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

        {/* Main Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mainTools.map((tool, index) => (
            <Card 
              key={index} 
              className={`hover:shadow-lg transition-all duration-300 relative overflow-hidden group border-2 hover:border-sacred/30`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-50`} />
              <CardHeader className="relative">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-background/80 shadow-sm">
                    <tool.icon className="w-6 h-6 text-sacred" />
                  </div>
                  <Badge className="bg-sacred/10 text-sacred text-xs border-sacred/20">
                    {tool.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl mt-4">{tool.title}</CardTitle>
              </CardHeader>
              <CardContent className="relative space-y-4">
                <CardDescription className="text-sm leading-relaxed">
                  {tool.description}
                </CardDescription>
                <Button asChild className="w-full bg-sacred hover:bg-sacred/90 group-hover:shadow-md transition-all">
                  <Link to={tool.link}>
                    Explore
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Tools */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-center">More Tools</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {additionalTools.map((tool, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-4 pb-4 text-center space-y-2">
                  <div className="p-2 rounded-lg bg-sacred/10 w-fit mx-auto">
                    <tool.icon className="w-5 h-5 text-sacred" />
                  </div>
                  <h4 className="font-medium text-sm">{tool.title}</h4>
                  <p className="text-xs text-muted-foreground line-clamp-2">{tool.description}</p>
                  <Button asChild variant="ghost" size="sm" className="text-sacred p-0 h-auto">
                    <Link to={tool.link}>
                      Open <ArrowRight className="w-3 h-3 ml-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Access Daily Tools */}
        <Card className="bg-gradient-to-br from-sacred/5 to-sacred/10 border-sacred/20">
          <CardHeader className="text-center">
            <CardTitle>Daily Spiritual Disciplines</CardTitle>
            <CardDescription>Build consistent spiritual habits with these daily resources</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-4 gap-4">
              <Button asChild variant="outline" className="h-auto py-4 flex-col">
                <Link to="/devotional">
                  <BookOpen className="w-6 h-6 text-sacred mb-2" />
                  <span className="font-medium">Daily Devotional</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4 flex-col">
                <Link to="/prayer-journal">
                  <Heart className="w-6 h-6 text-sacred mb-2" />
                  <span className="font-medium">Prayer Journal</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4 flex-col">
                <Link to="/journey">
                  <Calendar className="w-6 h-6 text-sacred mb-2" />
                  <span className="font-medium">30-Day Journey</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4 flex-col">
                <Link to="/bible-study">
                  <BookOpen className="w-6 h-6 text-sacred mb-2" />
                  <span className="font-medium">Bible Study</span>
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
