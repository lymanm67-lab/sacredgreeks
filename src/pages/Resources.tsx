import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useExternalLinks } from "@/hooks/use-external-links";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Heart, 
  FileText, 
  MessageSquare, 
  Lock, 
  ExternalLink,
  Home,
  Sparkles,
  CheckCircle,
  Download
} from "lucide-react";

interface ResourceItem {
  title: string;
  description: string;
  url: string;
  icon: any;
  requiresAuth?: boolean;
  badge?: string;
  category: "about" | "book" | "articles" | "testimonials";
  downloadUrl?: string;
}

const resources: ResourceItem[] = [
  // About/Mission Section
  {
    title: "Our Mission",
    description: "Learn about the Sacred Greeks movement and the P.R.O.O.F. framework",
    url: "/about",
    icon: Heart,
    requiresAuth: false,
    category: "about",
  },
  {
    title: "P.R.O.O.F. Framework",
    description: "Understanding the biblical framework for navigating Greek life",
    url: "/guide",
    icon: Sparkles,
    requiresAuth: true,
    category: "about",
  },
  
  // Book Info Section
  {
    title: "Sacred, Not Sinful",
    description: "Discover the book that started it all - biblical guidance for Greek life",
    url: "https://www.amazon.com/dp/B0CKRP2QVL",
    icon: BookOpen,
    requiresAuth: false,
    badge: "Featured",
    category: "book",
  },
  {
    title: "Book Chapters",
    description: "Explore chapter summaries and key teachings",
    url: "/study",
    icon: FileText,
    requiresAuth: true,
    badge: "Members",
    category: "book",
  },
  
  // Resources/Articles Section
  {
    title: "Articles & Blog",
    description: "Read the latest insights on faith and Greek life",
    url: "/articles",
    icon: FileText,
    requiresAuth: false,
    category: "articles",
  },
  {
    title: "Repentance, Repair & Renewal Checklist",
    description: "A spiritual guide for aligning Greek life with devotion to Christ",
    url: "https://gamma.app/docs/Christian-Black-Greek-Life-Repentance-Repair-and-Renewal-Checklis-12fobc2w0gro04i",
    icon: CheckCircle,
    requiresAuth: false,
    category: "articles",
  },
  {
    title: "Integrity Under Pressure Playbook",
    description: "A practical ethics guide for hot moments on campus and in life using the P.R.O.O.F. framework",
    url: "https://gamma.app/docs/Integrity-Under-Pressure-752n7nfkgl1wn7w",
    icon: BookOpen,
    requiresAuth: false,
    category: "articles",
    downloadUrl: "/resources/integrity-under-pressure.pdf",
  },
  {
    title: "FAQs",
    description: "Common questions about faith and Greek organizations",
    url: "/faq",
    icon: MessageSquare,
    requiresAuth: false,
    category: "articles",
  },
  
  // Testimonials Section
  {
    title: "Success Stories",
    description: "Read how others are integrating faith and Greek life",
    url: "/did-you-know",
    icon: MessageSquare,
    requiresAuth: false,
    category: "testimonials",
  },
];

const Resources = () => {
  const { user } = useAuth();
  const { openExternalLink } = useExternalLinks();

  const handleResourceClick = (resource: ResourceItem) => {
    if (resource.requiresAuth && !user) {
      // Redirect to auth page
      window.location.href = "/auth";
      return;
    }
    
    // Check if internal or external link
    if (resource.url.startsWith('http')) {
      // Open external links in new tab
      openExternalLink(resource.url);
    } else {
      // Navigate to internal route
      window.location.href = resource.url;
    }
  };

  const handleDownload = (e: React.MouseEvent, downloadUrl: string, title: string) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = title;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const ResourceCard = ({ resource }: { resource: ResourceItem }) => {
    const Icon = resource.icon;
    const isLocked = resource.requiresAuth && !user;

    return (
      <Card 
        className={`group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 ${
          isLocked ? "opacity-75" : "hover:border-sacred/50"
        }`}
        onClick={() => handleResourceClick(resource)}
      >
        <CardHeader>
          <div className="flex items-start justify-between mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sacred to-warm-blue flex items-center justify-center group-hover:scale-110 transition-transform">
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div className="flex gap-2">
              {resource.badge && (
                <Badge className="bg-sacred/10 text-sacred border-sacred/20">
                  {resource.badge}
                </Badge>
              )}
              {isLocked && (
                <Badge variant="outline" className="gap-1">
                  <Lock className="w-3 h-3" />
                  Members
                </Badge>
              )}
            </div>
          </div>
          <CardTitle className="text-lg group-hover:text-sacred transition-colors">
            {resource.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-sm leading-relaxed">
            {resource.description}
          </CardDescription>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sacred text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              {isLocked ? (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Sign in to view</span>
                </>
              ) : (
                <>
                  <span>View content</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </div>
            {resource.downloadUrl && !isLocked && (
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => handleDownload(e, resource.downloadUrl!, resource.title)}
              >
                <Download className="w-4 h-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  const filterByCategory = (category: string) => {
    return resources.filter(r => r.category === category);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-40 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link 
              to={user ? "/dashboard" : "/"} 
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Home className="w-4 h-4" />
              <span className="text-sm font-medium">Home</span>
            </Link>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-sacred" />
              <h1 className="text-lg font-semibold text-foreground">Resources Hub</h1>
            </div>
            {!user && (
              <Link to="/auth">
                <Button size="sm" className="bg-sacred hover:bg-sacred/90">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <Badge className="bg-sacred/10 text-sacred border-sacred/20 mb-4">
            Your Complete Resource Library
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-sacred to-warm-blue bg-clip-text text-transparent">
            Sacred Greeks Resources
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore articles, teachings, testimonials, and insights on integrating faith and Greek life
          </p>
        </div>

        {/* Tabbed Navigation */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-5 mb-8">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="book">Book</TabsTrigger>
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="testimonials">Stories</TabsTrigger>
          </TabsList>

          {/* All Resources */}
          <TabsContent value="all" className="space-y-8">
            {/* Featured Resources */}
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-sacred" />
                Featured Resources
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resources.filter(r => r.badge === "Featured").map((resource) => (
                  <ResourceCard key={resource.title} resource={resource} />
                ))}
              </div>
            </div>

            {/* All Resources */}
            <div>
              <h3 className="text-xl font-semibold mb-4">All Resources</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resources.filter(r => r.badge !== "Featured").map((resource) => (
                  <ResourceCard key={resource.title} resource={resource} />
                ))}
              </div>
            </div>
          </TabsContent>

          {/* About Tab */}
          <TabsContent value="about">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterByCategory("about").map((resource) => (
                <ResourceCard key={resource.title} resource={resource} />
              ))}
            </div>
          </TabsContent>

          {/* Book Tab */}
          <TabsContent value="book">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterByCategory("book").map((resource) => (
                <ResourceCard key={resource.title} resource={resource} />
              ))}
            </div>
          </TabsContent>

          {/* Articles Tab */}
          <TabsContent value="articles">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterByCategory("articles").map((resource) => (
                <ResourceCard key={resource.title} resource={resource} />
              ))}
            </div>
          </TabsContent>

          {/* Testimonials Tab */}
          <TabsContent value="testimonials">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterByCategory("testimonials").map((resource) => (
                <ResourceCard key={resource.title} resource={resource} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Member CTA */}
        {!user && (
          <Card className="mt-12 bg-gradient-to-br from-sacred/5 to-warm-blue/5 border-sacred/20">
            <CardContent className="p-8 text-center">
              <Lock className="w-12 h-12 text-sacred mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Unlock All Resources</h3>
              <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                Create a free account to access premium content, book chapters, and member-exclusive resources
              </p>
              <Link to="/auth">
                <Button size="lg" className="bg-sacred hover:bg-sacred/90">
                  Sign Up Free
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </main>

    </div>
  );
};

export default Resources;
