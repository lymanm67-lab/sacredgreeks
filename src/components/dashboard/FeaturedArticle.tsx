import { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, BookOpen, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

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
  const [isOpen, setIsOpen] = useState(false);
  
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
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className="overflow-hidden border-2 hover:shadow-xl transition-all duration-300 border-sacred/20 hover:border-sacred/50">
        <CardHeader className="bg-gradient-to-br from-sacred/10 via-warm-blue/5 to-transparent pb-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sacred to-warm-blue flex items-center justify-center">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <Badge variant="secondary" className="bg-sacred/10 text-sacred hover:bg-sacred/20">
                  Featured Article
                </Badge>
              </div>
              <CardTitle className="text-2xl mb-2 bg-gradient-to-r from-sacred to-warm-blue bg-clip-text text-transparent">
                {featuredArticle.title}
              </CardTitle>
              <CardDescription className="text-base">
                {featuredArticle.category}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-6 space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            {featuredArticle.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <CollapsibleTrigger asChild>
              <Button 
                variant="default"
                className="flex-1 bg-sacred hover:bg-sacred/90"
              >
                {isOpen ? (
                  <>
                    <ChevronUp className="w-4 h-4 mr-2" />
                    Hide Article
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4 mr-2" />
                    Read Article
                  </>
                )}
              </Button>
            </CollapsibleTrigger>
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
                <BookOpen className="w-4 h-4 mr-2" />
                More Resources
              </Button>
            </Link>
          </div>

          <CollapsibleContent className="space-y-4">
            {/* Embedded Content */}
            <div className="relative w-full rounded-lg overflow-hidden border-2 border-border bg-muted mt-4 animate-in fade-in-50 slide-in-from-top-2">
              <div className="relative w-full h-[600px]">
                <iframe
                  src={featuredArticle.url}
                  className="absolute inset-0 w-full h-full"
                  title={featuredArticle.title}
                  allowFullScreen
                  style={{ border: 'none' }}
                />
              </div>
            </div>
          </CollapsibleContent>
        </CardContent>
      </Card>
    </Collapsible>
  );
};
