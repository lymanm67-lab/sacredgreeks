import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Home, 
  Search, 
  Play, 
  Mic, 
  BookOpen, 
  FileText, 
  ExternalLink,
  Video,
  Headphones,
  GraduationCap,
  Filter
} from "lucide-react";
import { useExternalLinks } from "@/hooks/use-external-links";

interface ContentItem {
  id: string;
  title: string;
  description: string;
  url: string;
  type: "podcast" | "video" | "study-guide" | "article";
  duration?: string;
  date?: string;
  featured?: boolean;
  tags?: string[];
}

const contentItems: ContentItem[] = [
  // Podcast Episodes
  {
    id: "pod-1",
    title: "Sacred Greeks Podcast - Introduction",
    description: "Welcome to Sacred Greeks - exploring faith and Greek life together.",
    url: "https://open.spotify.com/show/sacredgreeks",
    type: "podcast",
    duration: "25 min",
    featured: true,
    tags: ["Introduction", "Faith"],
  },
  {
    id: "pod-2",
    title: "Navigating Initiation as a Christian",
    description: "Dr. Lyman discusses how to approach initiation ceremonies with faith intact.",
    url: "https://open.spotify.com/episode/navigating-initiation",
    type: "podcast",
    duration: "32 min",
    tags: ["Initiation", "Guidance"],
  },
  {
    id: "pod-3",
    title: "When Your Pastor Challenges Your Letters",
    description: "Practical guidance for conversations with church leaders about Greek life.",
    url: "https://open.spotify.com/episode/pastor-challenges",
    type: "podcast",
    duration: "28 min",
    tags: ["Church", "Conversations"],
  },
  
  // Video Content
  {
    id: "vid-1",
    title: "The P.R.O.O.F. Framework Explained",
    description: "A comprehensive video walkthrough of the P.R.O.O.F. framework for Christian Greeks.",
    url: "https://youtube.com/watch?v=proof-framework",
    type: "video",
    duration: "18 min",
    featured: true,
    tags: ["Framework", "Tutorial"],
  },
  {
    id: "vid-2",
    title: "Unmasking Hope Documentary Trailer",
    description: "Preview of the powerful documentary exploring faith and redemption in Greek life.",
    url: "https://www.unmaskinghopethemovie.com/",
    type: "video",
    duration: "3 min",
    featured: true,
    tags: ["Documentary", "Featured"],
  },
  {
    id: "vid-3",
    title: "Responding to Denouncement Videos",
    description: "How to process and respond to anti-Greek content from a biblical perspective.",
    url: "https://youtube.com/watch?v=denouncement-response",
    type: "video",
    duration: "22 min",
    tags: ["Apologetics", "Response"],
  },
  {
    id: "vid-4",
    title: "Pagan Symbols Explained",
    description: "Educational playlist exploring the origins and meanings of symbols often discussed in the context of Greek organizations from a biblical perspective.",
    url: "https://www.youtube.com/watch?v=48I-fdTNg8c&list=PLLJ-NqFs_FU7gvbbmAGLTXLUa00AUX8oE",
    type: "video",
    featured: true,
    tags: ["Symbols", "Education", "Playlist"],
  },
  {
    id: "vid-5",
    title: "Black Greek Letter Organizations Library",
    description: "Comprehensive video playlist covering the history, traditions, and Christian perspectives on Black Greek Letter Organizations.",
    url: "https://www.youtube.com/watch?v=GmMQisNNZjI&list=PLLJ-NqFs_FU5WGELPVR12Q0PESqnKHo0X",
    type: "video",
    featured: true,
    tags: ["BGLO", "History", "Playlist"],
  },
  
  // Study Guides
  {
    id: "guide-1",
    title: "Christian Greek Life Study Guide",
    description: "Comprehensive study guide for integrating Christian faith with Greek life participation.",
    url: "https://gamma.app/embed/ihr8fq0g089n32t",
    type: "study-guide",
    featured: true,
    tags: ["Study", "Framework"],
  },
  {
    id: "guide-2",
    title: "Dr. Lyman A. Montgomery Signature Greek Life Series",
    description: "Complete teaching series on integrating Christian faith with Greek life.",
    url: "https://gamma.app/embed/hfn73itjrx2l4wx",
    type: "study-guide",
    featured: true,
    tags: ["Series", "Teaching"],
  },
  {
    id: "guide-3",
    title: "CROSS Guide for Greek Life",
    description: "Comprehensive guide using the CROSS framework for Christian Greek life participation.",
    url: "https://gamma.app/embed/ug6sn2qq95613dg",
    type: "study-guide",
    tags: ["Framework", "CROSS"],
  },
  {
    id: "guide-4",
    title: "Integrity Under Pressure Playbook",
    description: "A practical ethics guide for hot moments on campus and in life.",
    url: "https://gamma.app/embed/752n7nfkgl1wn7w",
    type: "study-guide",
    tags: ["Ethics", "Leadership"],
  },
  
  // Articles
  {
    id: "art-1",
    title: "Are BGLOs Sinful? A Biblical Response",
    description: "A biblical perspective addressing common concerns about Black Greek Letter Organizations.",
    url: "https://gamma.app/embed/qj85c0up8fdigh5",
    type: "article",
    tags: ["Apologetics", "BGLO"],
  },
  {
    id: "art-2",
    title: "Should Christians Denounce BGLOs?",
    description: "Exploring truth, trauma, and theology in the discussion about Black Greek Letter Organizations.",
    url: "https://gamma.app/embed/un3ueaqjhbjf8y2",
    type: "article",
    tags: ["Apologetics", "Theology"],
  },
  {
    id: "art-3",
    title: "Why I Did Not Renounce My BGLO",
    description: "A personal testimony and pastoral guidance on remaining in Black Greek Letter Organizations.",
    url: "https://gamma.app/embed/ft5vd5wc4gdfmuv",
    type: "article",
    tags: ["Testimony", "Personal"],
  },
];

const ContentHub = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const { openExternalLink } = useExternalLinks();

  const filteredContent = useMemo(() => {
    return contentItems.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesType = activeTab === "all" || item.type === activeTab;
      return matchesSearch && matchesType;
    });
  }, [searchQuery, activeTab]);

  const featuredContent = contentItems.filter(item => item.featured);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "podcast": return <Headphones className="h-5 w-5" />;
      case "video": return <Video className="h-5 w-5" />;
      case "study-guide": return <GraduationCap className="h-5 w-5" />;
      case "article": return <FileText className="h-5 w-5" />;
      default: return <BookOpen className="h-5 w-5" />;
    }
  };

  const getTypeBadge = (type: string) => {
    const styles: Record<string, string> = {
      "podcast": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
      "video": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
      "study-guide": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
      "article": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    };
    return styles[type] || "bg-muted text-muted-foreground";
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <Home className="w-4 h-4" />
              <span className="text-sm font-medium">Home</span>
            </Link>
            <h1 className="text-lg font-semibold text-foreground">Content Hub</h1>
            <Link to="/dashboard">
              <Button variant="outline" size="sm">Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-sacred to-sacred-dark bg-clip-text text-transparent">
            Sacred Greeks Content Hub
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore podcasts, videos, study guides, and articles to deepen your understanding of faith in Greek life.
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search podcasts, videos, guides..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 text-lg"
          />
        </div>

        {/* Featured Content */}
        {!searchQuery && activeTab === "all" && (
          <section className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Play className="h-5 w-5 text-sacred" />
              Featured Content
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredContent.slice(0, 3).map((item) => (
                <Card key={item.id} className="group hover:shadow-lg transition-all duration-300 border-sacred/20">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className={`p-2 rounded-lg ${getTypeBadge(item.type)}`}>
                        {getTypeIcon(item.type)}
                      </div>
                      <Badge variant="secondary" className="bg-sacred/10 text-sacred">
                        Featured
                      </Badge>
                    </div>
                    <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      {item.duration && (
                        <span className="text-sm text-muted-foreground">{item.duration}</span>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-sacred hover:text-sacred-dark"
                        onClick={() => openExternalLink(item.url)}
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-5">
            <TabsTrigger value="all" className="flex items-center gap-1">
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">All</span>
            </TabsTrigger>
            <TabsTrigger value="podcast" className="flex items-center gap-1">
              <Headphones className="h-4 w-4" />
              <span className="hidden sm:inline">Podcasts</span>
            </TabsTrigger>
            <TabsTrigger value="video" className="flex items-center gap-1">
              <Video className="h-4 w-4" />
              <span className="hidden sm:inline">Videos</span>
            </TabsTrigger>
            <TabsTrigger value="study-guide" className="flex items-center gap-1">
              <GraduationCap className="h-4 w-4" />
              <span className="hidden sm:inline">Guides</span>
            </TabsTrigger>
            <TabsTrigger value="article" className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Articles</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {filteredContent.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No content found matching your search.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredContent.map((item) => (
                  <Card key={item.id} className="group hover:shadow-md transition-all duration-300">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`p-1.5 rounded-md ${getTypeBadge(item.type)}`}>
                          {getTypeIcon(item.type)}
                        </div>
                        <Badge variant="outline" className="text-xs capitalize">
                          {item.type.replace("-", " ")}
                        </Badge>
                      </div>
                      <CardTitle className="text-base line-clamp-2">{item.title}</CardTitle>
                      <CardDescription className="text-sm line-clamp-2">
                        {item.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {item.tags?.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openExternalLink(item.url)}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                      {item.duration && (
                        <p className="text-xs text-muted-foreground mt-2">{item.duration}</p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Quick Links */}
        <section className="border-t pt-8 space-y-4">
          <h2 className="text-lg font-semibold">Quick Links</h2>
          <div className="flex flex-wrap gap-3">
            <Link to="/resources">
              <Button variant="outline" size="sm">
                <BookOpen className="h-4 w-4 mr-2" />
                Full Resources Library
              </Button>
            </Link>
            <Link to="/podcast">
              <Button variant="outline" size="sm">
                <Mic className="h-4 w-4 mr-2" />
                Podcast Page
              </Button>
            </Link>
            <Link to="/study">
              <Button variant="outline" size="sm">
                <GraduationCap className="h-4 w-4 mr-2" />
                Study Guide
              </Button>
            </Link>
            <Link to="/articles">
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Article Library
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ContentHub;
