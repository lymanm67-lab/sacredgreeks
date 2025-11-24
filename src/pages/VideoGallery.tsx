import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, Filter, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { didYouKnowCategories, sacredGreeksResults } from "@/sacredGreeksContent";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Video {
  title: string;
  url: string;
  description: string;
  category: string;
  categoryId: string;
}

const VideoGallery = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Collect all videos from different sources
  const allVideos = useMemo(() => {
    const videos: Video[] = [];

    // Videos from Did You Know categories
    didYouKnowCategories.forEach((category) => {
      if (category.videos) {
        category.videos.forEach((video) => {
          videos.push({
            ...video,
            category: category.title,
            categoryId: category.id,
          });
        });
      }
    });

    // Videos from Sacred Greeks Results
    Object.entries(sacredGreeksResults).forEach(([scenario, results]) => {
      Object.entries(results).forEach(([resultType, content]) => {
        if (content.videos) {
          content.videos.forEach((video) => {
            videos.push({
              ...video,
              category: "Sacred Greeks Guidance",
              categoryId: `${scenario}-${resultType}`,
            });
          });
        }
      });
    });

    return videos;
  }, []);

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = new Set(allVideos.map((v) => v.category));
    return Array.from(uniqueCategories);
  }, [allVideos]);

  // Filter videos based on search and category
  const filteredVideos = useMemo(() => {
    return allVideos.filter((video) => {
      const matchesSearch =
        searchQuery === "" ||
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || video.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [allVideos, searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Video Gallery</h1>
              <p className="text-sm text-muted-foreground">
                Educational videos organized by topic
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Search and Filter Controls */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search videos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="w-full md:w-64">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <Play className="h-4 w-4" />
              <span>
                Showing {filteredVideos.length} of {allVideos.length} videos
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Video Grid */}
        {filteredVideos.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">
                No videos found matching your search criteria.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredVideos.map((video, index) => (
              <Card key={`${video.categoryId}-${index}`} className="overflow-hidden group hover:shadow-lg transition-shadow">
                <div className="aspect-video relative overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${video.url.split("/").pop()}`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {video.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-base line-clamp-2">
                    {video.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {video.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default VideoGallery;
