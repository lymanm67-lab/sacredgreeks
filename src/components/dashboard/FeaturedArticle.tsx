import { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, BookOpen, Maximize2, Minimize2 } from "lucide-react";
import { Link } from "react-router-dom";

const featuredArticles = [
  {
    title: "Repentance, Repair & Renewal Checklist",
    description: "A spiritual guide for members and leaders of Black Greek-letter organizations seeking to align their commitment to service with their devotion to Christ.",
    url: "https://gamma.app/embed/12fobc2w0gro04i",
    category: "Spiritual Growth",
    icon: CheckCircle,
  },
  {
    title: "Integrity Under Pressure Playbook",
    description: "A practical ethics guide for hot moments on campus and in life using the P.R.O.O.F. framework.",
    url: "https://gamma.app/embed/752n7nfkgl1wn7w",
    category: "Ethics & Decision Making",
    icon: BookOpen,
  },
];

export const FeaturedArticle = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Rotate featured article weekly based on ISO week number
  const featuredArticle = useMemo(() => {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const daysSinceStartOfYear = Math.floor((now.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));
    const weekNumber = Math.floor(daysSinceStartOfYear / 7);
    const index = weekNumber % featuredArticles.length;
    return featuredArticles[index];
  }, []);

  const Icon = featuredArticle.icon;

  const handleOpenExternal = () => {
    window.open(featuredArticle.url, "_blank", "noopener,noreferrer");
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-2 border-sacred/20 hover:border-sacred/50 bg-gradient-to-br from-card to-sacred/5">
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <Badge className="bg-sacred text-white">
            Featured Article
          </Badge>
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sacred to-warm-blue flex items-center justify-center group-hover:scale-110 transition-transform">
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
        <CardTitle className="text-xl group-hover:text-sacred transition-colors">
          {featuredArticle.title}
        </CardTitle>
        <CardDescription className="text-sm">
          {featuredArticle.category}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {featuredArticle.description}
        </p>
        
        {/* Embedded Content */}
        <div className="relative w-full rounded-lg overflow-hidden border-2 border-border bg-muted">
          <div className={`relative w-full transition-all duration-300 ${isExpanded ? 'h-[800px]' : 'h-[500px]'}`}>
            <iframe
              src={featuredArticle.url}
              className="absolute inset-0 w-full h-full"
              title={featuredArticle.title}
              allowFullScreen
              style={{ border: 'none' }}
            />
          </div>
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            variant="secondary"
            size="sm"
            className="absolute top-2 right-2 z-10 bg-background/90 hover:bg-background backdrop-blur-sm"
          >
            {isExpanded ? (
              <>
                <Minimize2 className="w-4 h-4 mr-2" />
                Collapse
              </>
            ) : (
              <>
                <Maximize2 className="w-4 h-4 mr-2" />
                Expand
              </>
            )}
          </Button>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            onClick={handleOpenExternal}
            variant="outline"
            className="flex-1 border-sacred/20 hover:bg-sacred/10 hover:border-sacred/50"
          >
            Open in New Tab
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Link to="/resources" className="flex-1">
            <Button variant="outline" className="w-full border-sacred/20 hover:bg-sacred/10 hover:border-sacred/50">
              Browse All Resources
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
