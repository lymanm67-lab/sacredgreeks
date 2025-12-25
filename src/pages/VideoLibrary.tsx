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
  X,
  Plus
} from "lucide-react";
import { useExternalLinks } from "@/hooks/use-external-links";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import SuggestVideoDialog from "@/components/video-library/SuggestVideoDialog";

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
  // Featured Sacred Greeks Videos
  {
    id: "vid-truth-christian",
    title: "The Truth About Being Christian in a Greek Organization",
    description: "Sacred Greeks TV explores the reality of maintaining your Christian faith while being an active member of a Greek letter organization.",
    url: "https://www.youtube.com/watch?v=GmMQisNNZjI",
    featured: true,
    tags: ["Faith", "Greek Life", "Christianity"],
    category: "Faith & Identity",
  },
  {
    id: "vid-should-join",
    title: "Should Christians Join BGLOs? How to Balance Faith and Greek Life",
    description: "A comprehensive discussion on whether Christians should join Black Greek Letter Organizations and practical guidance for balancing faith.",
    url: "https://www.youtube.com/watch?v=25gQ4qXxXi0",
    featured: true,
    tags: ["BGLO", "Faith", "Guidance"],
    category: "Faith & Identity",
  },
  {
    id: "vid-top10",
    title: "Top 10 Faith Questions About Greek Life Answered!",
    description: "The most common questions church leaders and Christians have about Greek life, answered with biblical wisdom and practical insight.",
    url: "https://www.youtube.com/watch?v=PLQG1lOu-48",
    featured: true,
    tags: ["FAQ", "Questions", "Biblical"],
    category: "FAQ",
  },
  {
    id: "vid-pagan-symbols",
    title: "Understanding Greek Letter Organization Rituals",
    description: "A deep dive into the spiritual aspects of Greek rituals and how Christians can navigate them with biblical discernment.",
    url: "https://www.youtube.com/watch?v=48I-fdTNg8c",
    featured: true,
    tags: ["Rituals", "Symbols", "Discernment"],
    category: "Symbols & History",
  },
  {
    id: "vid-balance",
    title: "Faith, Family & Fraternity: Finding Balance",
    description: "Practical wisdom for maintaining priorities while honoring your Greek organization commitments.",
    url: "https://www.youtube.com/watch?v=FTeOlOv2cDM",
    tags: ["Balance", "Family", "Priorities"],
    category: "Guidance",
  },
  {
    id: "vid-history",
    title: "The History of Faith in Black Greek Organizations",
    description: "Exploring the Christian roots and faith heritage within Divine Nine organizations.",
    url: "https://www.youtube.com/watch?v=f8WECW23fSg",
    tags: ["History", "BGLO", "Heritage"],
    category: "Symbols & History",
  },
  {
    id: "vid-critics",
    title: "Responding to Critics of Greek Life",
    description: "How to gracefully respond when others question your involvement in Greek letter organizations.",
    url: "https://www.youtube.com/watch?v=-q3FNrUe8YY",
    tags: ["Apologetics", "Response", "Critics"],
    category: "Apologetics",
  },
  {
    id: "vid-leadership",
    title: "Greek Life and Church Leadership",
    description: "Can you serve in church leadership while being an active Greek member? Biblical perspectives explored.",
    url: "https://www.youtube.com/watch?v=ZJ-sDBR2mCU",
    tags: ["Leadership", "Church", "Service"],
    category: "Leadership",
  },
  {
    id: "vid-hazing",
    title: "Addressing Hazing from a Christian Perspective",
    description: "Understanding hazing, its impact, and how Christians should respond to this serious issue.",
    url: "https://www.youtube.com/watch?v=GbaqBExsqbs",
    tags: ["Hazing", "Safety", "Ethics"],
    category: "Guidance",
  },
  {
    id: "vid-unity",
    title: "Christian Unity Across Greek Organizations",
    description: "Building bridges of faith across different fraternities and sororities.",
    url: "https://www.youtube.com/watch?v=rr639o9Gev0",
    tags: ["Unity", "Community", "Brotherhood"],
    category: "Community",
  },
  {
    id: "vid-prayer",
    title: "Prayer and Greek Life: A Guide for Members",
    description: "Developing and maintaining a strong prayer life while active in Greek organizations.",
    url: "https://www.youtube.com/watch?v=ICyKY7z7E5M",
    tags: ["Prayer", "Spiritual Growth", "Devotion"],
    category: "Spiritual Growth",
  },
  {
    id: "vid-biblical",
    title: "Biblical Foundations for Community and Brotherhood",
    description: "Exploring scriptural principles that align with the ideals of Greek letter organizations.",
    url: "https://www.youtube.com/watch?v=Y6N089RVnBU",
    tags: ["Biblical", "Brotherhood", "Scripture"],
    category: "Faith & Identity",
  },
  {
    id: "vid-events",
    title: "Navigating Greek Events as a Christian",
    description: "Practical advice for attending Greek events while maintaining your Christian witness.",
    url: "https://www.youtube.com/watch?v=oN_DDjKjVCo",
    tags: ["Events", "Witness", "Practical"],
    category: "Guidance",
  },
  {
    id: "vid-mentorship",
    title: "Mentorship in Greek Organizations",
    description: "Using your platform as a Greek member to mentor and disciple others in faith.",
    url: "https://www.youtube.com/watch?v=dUU9zT-YjB0",
    tags: ["Mentorship", "Discipleship", "Leadership"],
    category: "Leadership",
  },
  {
    id: "vid-service",
    title: "Serving Your Community Through Greek Life",
    description: "How Greek service projects align with Christian values of serving others.",
    url: "https://www.youtube.com/watch?v=DBlNzNlVUKI",
    tags: ["Service", "Community", "Outreach"],
    category: "Service",
  },
  {
    id: "vid-bridges",
    title: "The Divine Nine and the Church: Building Bridges",
    description: "Creating stronger relationships between Greek organizations and local churches.",
    url: "https://www.youtube.com/watch?v=NYGoQuUt6QM",
    tags: ["Church", "Divine Nine", "Partnership"],
    category: "Community",
  },
  {
    id: "vid-testimony",
    title: "Testimony: My Journey as a Christian Greek",
    description: "Personal testimonies from Christians who have navigated Greek life with their faith intact.",
    url: "https://www.youtube.com/watch?v=CN11FQ7tanU",
    tags: ["Testimony", "Personal Story", "Encouragement"],
    category: "Testimonies",
  },
  {
    id: "vid-secret",
    title: "What the Bible Says About Secret Societies",
    description: "A biblical examination of secrecy, oaths, and membership organizations.",
    url: "https://www.youtube.com/watch?v=QsvD9LDmUEU",
    tags: ["Bible", "Secrets", "Oaths"],
    category: "Apologetics",
  },
  {
    id: "vid-warfare",
    title: "Greek Life and Spiritual Warfare",
    description: "Understanding spiritual dynamics and maintaining spiritual health as a Greek member.",
    url: "https://www.youtube.com/watch?v=9qLofoqskHk",
    tags: ["Spiritual Warfare", "Protection", "Discernment"],
    category: "Spiritual Growth",
  },
  {
    id: "vid-symbolism",
    title: "Answering Tough Questions About Greek Symbolism",
    description: "Addressing concerns about symbols, colors, and imagery in Greek organizations.",
    url: "https://www.youtube.com/watch?v=G14XXWLKq5Q",
    tags: ["Symbols", "Questions", "Imagery"],
    category: "Symbols & History",
  },
  {
    id: "vid-accountability",
    title: "Christian Accountability in Greek Life",
    description: "Building accountability structures to support your faith journey in Greek organizations.",
    url: "https://www.youtube.com/watch?v=kvRDvnBq43w",
    tags: ["Accountability", "Support", "Growth"],
    category: "Spiritual Growth",
  },
  {
    id: "vid-legacy",
    title: "Legacy and Leadership: Christian Greeks Making Impact",
    description: "Stories of Christian Greeks who have made significant positive impacts in their communities.",
    url: "https://www.youtube.com/watch?v=6jMIu-7_KIE",
    tags: ["Legacy", "Impact", "Leadership"],
    category: "Leadership",
  },
  {
    id: "vid-renounce",
    title: "Renounce, Retreat, or Redeem Greek Life?",
    description: "Should Christians renounce, retreat, or redeem their Greek Letter Organizations?",
    url: "https://www.youtube.com/watch?v=ZK9HfHf3mLc",
    featured: true,
    tags: ["Redemption", "Decision", "Theology"],
    category: "Apologetics",
  },
  {
    id: "vid-future",
    title: "The Future of Faith in Greek Organizations",
    description: "Vision for how Christians can shape the future of Greek life for generations to come.",
    url: "https://www.youtube.com/watch?v=XKVZ_1sOd7w",
    tags: ["Future", "Vision", "Hope"],
    category: "Leadership",
  },
  {
    id: "vid-living",
    title: "Sacred Greeks: Living Out Your Faith",
    description: "Practical daily practices for living out your Christian faith within Greek life.",
    url: "https://www.youtube.com/watch?v=rF8LEzWwW5Q",
    tags: ["Daily Practice", "Faith", "Lifestyle"],
    category: "Spiritual Growth",
  },
  // Documentary
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
            Sacred Greeks Video Library
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our curated collection of videos on faith, Greek life, symbols, and more from Sacred Greeks TV.
          </p>
          
          {/* Subscribe Button */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white">
              <a href="https://www.youtube.com/@Sacredgreeks?sub_confirmation=1" target="_blank" rel="noopener noreferrer">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                Subscribe to Sacred Greeks TV
              </a>
            </Button>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-3 flex-wrap pt-2">
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
            
            <SuggestVideoDialog />
          </div>
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