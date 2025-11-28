import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Home, 
  Search, 
  Play, 
  ExternalLink,
  Video,
  Sparkles,
  Filter,
  ListVideo,
  Clock,
  Tag,
  Loader2,
  X
} from "lucide-react";
import { useExternalLinks } from "@/hooks/use-external-links";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface VideoItem {
  id: string;
  title: string;
  description: string;
  url: string;
  duration?: string;
  featured?: boolean;
  tags: string[];
  category: string;
}

const videoLibrary: VideoItem[] = [
  {
    id: "vid-proof",
    title: "The P.R.O.O.F. Framework Explained",
    description: "A comprehensive video walkthrough of the P.R.O.O.F. framework for Christian Greeks.",
    url: "https://youtube.com/watch?v=proof-framework",
    duration: "18 min",
    featured: true,
    tags: ["Framework", "Tutorial", "Foundations"],
    category: "Educational",
  },
  {
    id: "vid-documentary",
    title: "Unmasking Hope Documentary Trailer",
    description: "Preview of the powerful documentary exploring faith and redemption in Greek life.",
    url: "https://www.unmaskinghopethemovie.com/",
    duration: "3 min",
    featured: true,
    tags: ["Documentary", "Testimony", "Hope"],
    category: "Documentary",
  },
  {
    id: "vid-denouncement",
    title: "Responding to Denouncement Videos",
    description: "How to process and respond to anti-Greek content from a biblical perspective.",
    url: "https://youtube.com/watch?v=denouncement-response",
    duration: "22 min",
    tags: ["Apologetics", "Response", "Social Media"],
    category: "Apologetics",
  },
  {
    id: "vid-pagan-symbols",
    title: "Pagan Symbols Explained",
    description: "Educational playlist exploring the origins and meanings of symbols often discussed in the context of Greek organizations from a biblical perspective.",
    url: "https://www.youtube.com/watch?v=48I-fdTNg8c&list=PLLJ-NqFs_FU7gvbbmAGLTXLUa00AUX8oE",
    featured: true,
    tags: ["Symbols", "Education", "Playlist", "History"],
    category: "Symbols & History",
  },
  {
    id: "vid-bglo-library",
    title: "Black Greek Letter Organizations Library",
    description: "Comprehensive video playlist covering the history, traditions, and Christian perspectives on Black Greek Letter Organizations.",
    url: "https://www.youtube.com/watch?v=GmMQisNNZjI&list=PLLJ-NqFs_FU5WGELPVR12Q0PESqnKHo0X",
    featured: true,
    tags: ["BGLO", "History", "Playlist", "Traditions"],
    category: "BGLO",
  },
  {
    id: "vid-initiation",
    title: "Navigating Initiation as a Christian",
    description: "Guidance for approaching initiation ceremonies while maintaining your faith and integrity.",
    url: "https://youtube.com/watch?v=christian-initiation",
    duration: "25 min",
    tags: ["Initiation", "Faith", "Guidance", "New Members"],
    category: "Guidance",
  },
  {
    id: "vid-pastor",
    title: "When Your Pastor Questions Your Letters",
    description: "How to have constructive conversations with church leaders about Greek life.",
    url: "https://youtube.com/watch?v=pastor-conversation",
    duration: "20 min",
    tags: ["Church", "Conversations", "Leadership", "Family"],
    category: "Relationships",
  },
  {
    id: "vid-rituals",
    title: "Understanding Rituals: A Christian Perspective",
    description: "Breaking down common ritual concerns and how to approach them biblically.",
    url: "https://youtube.com/watch?v=rituals-christian",
    duration: "30 min",
    tags: ["Rituals", "Bible", "Discernment", "Traditions"],
    category: "Educational",
  },
  {
    id: "vid-testimony",
    title: "Faith & Fraternity: Personal Testimonies",
    description: "Real stories from Christians who have navigated Greek life while growing in faith.",
    url: "https://youtube.com/watch?v=faith-testimonies",
    duration: "45 min",
    tags: ["Testimony", "Personal Stories", "Encouragement"],
    category: "Testimonies",
  },
  {
    id: "vid-service",
    title: "Service & Scholarship: Living Your Values",
    description: "How to make the most of Greek life service opportunities as a Christian witness.",
    url: "https://youtube.com/watch?v=greek-service",
    duration: "15 min",
    tags: ["Service", "Scholarship", "Witness", "Community"],
    category: "Service",
  },
];

const allTags = Array.from(new Set(videoLibrary.flatMap(v => v.tags))).sort();
const allCategories = Array.from(new Set(videoLibrary.map(v => v.category))).sort();

const VideoLibrary = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [aiDialogOpen, setAiDialogOpen] = useState(false);
  const [aiIssue, setAiIssue] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiRecommendations, setAiRecommendations] = useState<{
    recommendations: { videoId: string; reason: string }[];
    encouragement: string;
  } | null>(null);
  const { openExternalLink } = useExternalLinks();

  const filteredVideos = useMemo(() => {
    return videoLibrary.filter(video => {
      const matchesSearch = searchQuery === "" ||
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesTags = selectedTags.length === 0 ||
        selectedTags.some(tag => video.tags.includes(tag));
      
      const matchesCategory = selectedCategory === "all" || video.category === selectedCategory;
      
      return matchesSearch && matchesTags && matchesCategory;
    });
  }, [searchQuery, selectedTags, selectedCategory]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTags([]);
    setSelectedCategory("all");
  };

  const handleAIRecommend = async () => {
    if (!aiIssue.trim()) {
      toast.error("Please describe what you're dealing with");
      return;
    }

    setAiLoading(true);
    setAiRecommendations(null);

    try {
      const { data, error } = await supabase.functions.invoke('recommend-video', {
        body: { 
          issue: aiIssue,
          videos: videoLibrary.map(v => ({
            id: v.id,
            title: v.title,
            description: v.description,
            tags: v.tags,
            category: v.category
          }))
        }
      });

      if (error) throw error;
      setAiRecommendations(data);
    } catch (error: any) {
      console.error("AI recommendation error:", error);
      if (error.message?.includes("429")) {
        toast.error("Rate limit exceeded. Please try again in a moment.");
      } else if (error.message?.includes("402")) {
        toast.error("AI service temporarily unavailable.");
      } else {
        toast.error("Failed to get recommendations. Please try again.");
      }
    } finally {
      setAiLoading(false);
    }
  };

  const getVideoById = (id: string) => videoLibrary.find(v => v.id === id);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <Home className="w-4 h-4" />
              <span className="text-sm font-medium">Home</span>
            </Link>
            <h1 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Video className="w-5 h-5 text-sacred" />
              Video Library
            </h1>
            <Link to="/content-hub">
              <Button variant="outline" size="sm">Content Hub</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4 py-6">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-sacred to-sacred-dark bg-clip-text text-transparent">
            Video Library
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our curated collection of videos on faith, Greek life, symbols, and more.
          </p>
          
          {/* AI Assist Button */}
          <Dialog open={aiDialogOpen} onOpenChange={setAiDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-gradient-to-r from-sacred to-warm-blue hover:opacity-90">
                <Sparkles className="w-4 h-4" />
                AI Video Picker
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-sacred" />
                  AI Video Recommendations
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">What are you dealing with?</label>
                  <Textarea
                    placeholder="e.g., My pastor says Greek life is sinful and I don't know how to respond..."
                    value={aiIssue}
                    onChange={(e) => setAiIssue(e.target.value)}
                    className="min-h-[100px]"
                  />
                  <p className="text-xs text-muted-foreground">
                    Describe your situation or question, and AI will recommend the best videos for you.
                  </p>
                </div>

                <Button 
                  onClick={handleAIRecommend} 
                  disabled={aiLoading || !aiIssue.trim()}
                  className="w-full gap-2"
                >
                  {aiLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Finding best videos...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Get Recommendations
                    </>
                  )}
                </Button>

                {aiRecommendations && (
                  <div className="space-y-4 pt-4 border-t">
                    {aiRecommendations.encouragement && (
                      <p className="text-sm text-muted-foreground italic bg-sacred/5 p-3 rounded-lg">
                        {aiRecommendations.encouragement}
                      </p>
                    )}
                    
                    <div className="space-y-3">
                      {aiRecommendations.recommendations.map((rec, idx) => {
                        const video = getVideoById(rec.videoId);
                        if (!video) return null;
                        return (
                          <Card key={idx} className="border-sacred/20">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex-1">
                                  <h4 className="font-medium text-sm">{video.title}</h4>
                                  <p className="text-xs text-muted-foreground mt-1">{rec.reason}</p>
                                </div>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => openExternalLink(video.url)}
                                >
                                  <Play className="w-3 h-3 mr-1" />
                                  Watch
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4">
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search videos by title, description, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("all")}
              className={selectedCategory === "all" ? "bg-sacred hover:bg-sacred/90" : ""}
            >
              All Categories
            </Button>
            {allCategories.map(cat => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
                className={selectedCategory === cat ? "bg-sacred hover:bg-sacred/90" : ""}
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* Tag Filters */}
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Tag className="w-4 h-4" />
              <span>Filter by tags</span>
              {selectedTags.length > 0 && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="h-6 px-2">
                  <X className="w-3 h-3 mr-1" />
                  Clear
                </Button>
              )}
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {allTags.map(tag => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className={`cursor-pointer transition-colors ${
                    selectedTags.includes(tag) 
                      ? "bg-sacred hover:bg-sacred/90" 
                      : "hover:bg-sacred/10"
                  }`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Video Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <ListVideo className="w-5 h-5" />
              {filteredVideos.length} Video{filteredVideos.length !== 1 ? 's' : ''}
            </h2>
          </div>

          {filteredVideos.length === 0 ? (
            <Card className="p-12 text-center">
              <Video className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground mb-4">No videos match your filters</p>
              <Button variant="outline" onClick={clearFilters}>Clear Filters</Button>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredVideos.map((video) => (
                <Card key={video.id} className="group hover:shadow-lg transition-all duration-300 flex flex-col">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="p-2 rounded-lg bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300">
                        <Video className="h-5 w-5" />
                      </div>
                      {video.featured && (
                        <Badge variant="secondary" className="bg-sacred/10 text-sacred">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-base line-clamp-2">{video.title}</CardTitle>
                    <CardDescription className="text-sm line-clamp-2">
                      {video.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0 flex-1 flex flex-col justify-end">
                    <div className="flex flex-wrap gap-1 mb-3">
                      {video.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {video.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">+{video.tags.length - 3}</Badge>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      {video.duration ? (
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {video.duration}
                        </span>
                      ) : (
                        <Badge variant="outline" className="text-xs">Playlist</Badge>
                      )}
                      <Button
                        variant="default"
                        size="sm"
                        className="gap-1 bg-sacred hover:bg-sacred/90"
                        onClick={() => openExternalLink(video.url)}
                      >
                        <Play className="h-3 w-3" />
                        Watch
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Quick Links */}
        <section className="border-t pt-8 space-y-4">
          <h2 className="text-lg font-semibold">More Resources</h2>
          <div className="flex flex-wrap gap-3">
            <Link to="/content-hub">
              <Button variant="outline" size="sm">
                <ListVideo className="h-4 w-4 mr-2" />
                Full Content Hub
              </Button>
            </Link>
            <Link to="/symbol-guide">
              <Button variant="outline" size="sm">
                <Tag className="h-4 w-4 mr-2" />
                Symbol Guide
              </Button>
            </Link>
            <Link to="/resources">
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                Resources
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default VideoLibrary;