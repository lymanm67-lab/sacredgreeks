import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { FileText, ExternalLink, ArrowRight, CheckCircle, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const featuredArticles = [
  {
    title: "Repentance, Repair & Renewal Checklist",
    description: "A spiritual guide for members and leaders of Black Greek-letter organizations seeking to align their commitment to service with their devotion to Christ.",
    url: "https://gamma.app/docs/Christian-Black-Greek-Life-Repentance-Repair-and-Renewal-Checklis-12fobc2w0gro04i",
    category: "Spiritual Growth",
    icon: CheckCircle,
  },
  {
    title: "Integrity Under Pressure Playbook",
    description: "A practical ethics guide for hot moments on campus and in life using the P.R.O.O.F. framework.",
    url: "https://gamma.app/docs/Integrity-Under-Pressure-752n7nfkgl1wn7w",
    category: "Ethics & Decision Making",
    icon: BookOpen,
  },
];

export const FeaturedArticle = () => {
  const [showArticle, setShowArticle] = useState(false);
  
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
    <>
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
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={() => setShowArticle(true)}
              className="flex-1 bg-sacred hover:bg-sacred/90"
            >
              Read Article
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Link to="/resources" className="flex-1">
              <Button variant="outline" className="w-full border-sacred/20 hover:bg-sacred/10 hover:border-sacred/50">
                Browse All Resources
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Article Modal */}
      <Dialog open={showArticle} onOpenChange={setShowArticle}>
        <DialogContent className="max-w-5xl h-[85vh] flex flex-col p-0">
          <DialogHeader className="px-6 pt-6 pb-2">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <DialogTitle className="text-xl">{featuredArticle.title}</DialogTitle>
                <DialogDescription className="mt-1">
                  {featuredArticle.category} • Sacred Greeks Resources
                </DialogDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleOpenExternal}
                className="flex-shrink-0"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open in New Tab
              </Button>
            </div>
          </DialogHeader>
          
          <div className="flex-1 px-6 pb-6 overflow-hidden">
            <iframe
              src={featuredArticle.url}
              title={featuredArticle.title}
              className="w-full h-full rounded-md border bg-background"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
