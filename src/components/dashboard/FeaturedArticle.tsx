import { useMemo, useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, BookOpen, Download, WifiOff, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { ExternalContentModal } from "@/components/ui/ExternalContentModal";
import { useOfflineArticles } from "@/hooks/use-offline-articles";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { ListenButton } from "@/components/ListenButton";

const featuredArticles = [
  {
    id: "repentance-repair-renewal",
    title: "Repentance, Repair & Renewal Checklist",
    description: "A spiritual guide for members and leaders of Black Greek-letter organizations seeking to align their commitment to service with their devotion to Christ.",
    url: "https://gamma.app/embed/12fobc2w0gro04i",
    category: "Spiritual Growth",
    icon: CheckCircle,
  },
  {
    id: "integrity-under-pressure",
    title: "Integrity Under Pressure Playbook",
    description: "A practical ethics guide for hot moments on campus and in life using the P.R.O.O.F. framework.",
    url: "https://gamma.app/embed/752n7nfkgl1wn7w",
    category: "Ethics & Decision Making",
    icon: BookOpen,
  },
];

export const FeaturedArticle = () => {
  const { isOffline, cacheArticle, isArticleCached, getOfflineContent, getCachedArticle } = useOfflineArticles();
  const [offlineDialogOpen, setOfflineDialogOpen] = useState(false);
  const [selectedArticleContent, setSelectedArticleContent] = useState<string | null>(null);
  
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
  const isCached = isArticleCached(featuredArticle.id);

  // Auto-cache articles on mount for offline use
  useEffect(() => {
    featuredArticles.forEach(article => {
      if (!isArticleCached(article.id)) {
        const offlineContent = getOfflineContent(article.id);
        if (offlineContent) {
          cacheArticle({
            id: article.id,
            title: article.title,
            description: article.description,
            category: article.category,
            url: article.url,
            content: offlineContent,
          });
        }
      }
    });
  }, []);

  const handleSaveOffline = () => {
    const offlineContent = getOfflineContent(featuredArticle.id);
    if (offlineContent) {
      cacheArticle({
        id: featuredArticle.id,
        title: featuredArticle.title,
        description: featuredArticle.description,
        category: featuredArticle.category,
        url: featuredArticle.url,
        content: offlineContent,
      });
      toast.success("Article saved for offline reading!");
    }
  };

  const handleReadOffline = () => {
    const cached = getCachedArticle(featuredArticle.id);
    if (cached) {
      setSelectedArticleContent(cached.content);
      setOfflineDialogOpen(true);
    } else {
      const content = getOfflineContent(featuredArticle.id);
      if (content) {
        setSelectedArticleContent(content);
        setOfflineDialogOpen(true);
      }
    }
  };

  // Convert markdown-like content to plain text for TTS
  const getPlainTextContent = (content: string): string => {
    return content
      .replace(/^#+\s*/gm, '') // Remove heading markers
      .replace(/\*\*/g, '') // Remove bold markers
      .replace(/\*/g, '') // Remove italic markers
      .replace(/^-\s*/gm, '') // Remove list markers
      .replace(/^\d+\.\s*/gm, '') // Remove numbered list markers
      .trim();
  };

  return (
    <>
      <Card className="group hover:shadow-xl transition-all duration-300 border-2 border-sacred/20 hover:border-sacred/50 bg-gradient-to-br from-card to-sacred/5">
        <CardHeader>
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <Badge className="bg-sacred text-white">
                Featured Article
              </Badge>
              {isCached && (
                <Badge variant="outline" className="text-xs bg-green-500/10 text-green-600 border-green-500/20">
                  <WifiOff className="w-3 h-3 mr-1" />
                  Available Offline
                </Badge>
              )}
            </div>
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
          
          <div className="flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row gap-3">
              {isOffline ? (
                // Offline mode - show offline reader
                <Button 
                  className="flex-1 bg-sacred hover:bg-sacred/90"
                  onClick={handleReadOffline}
                  disabled={!isCached}
                >
                  <WifiOff className="w-4 h-4 mr-2" />
                  Read Offline
                </Button>
              ) : (
                // Online mode - show modal
                <ExternalContentModal
                  url={featuredArticle.url}
                  title={featuredArticle.title}
                  description={featuredArticle.description}
                  category={featuredArticle.category}
                  trigger={
                    <Button className="flex-1 bg-sacred hover:bg-sacred/90">
                      Read Article
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  }
                />
              )}
              <Link to="/resources" className="flex-1">
                <Button variant="outline" className="w-full border-sacred/20 hover:bg-sacred/10 hover:border-sacred/50">
                  Browse All Resources
                </Button>
              </Link>
            </div>
            
            {/* Save for offline / Read offline button */}
            <div className="flex gap-2">
              {!isCached ? (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={handleSaveOffline}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Save for Offline
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 text-green-600 border-green-500/20 hover:bg-green-500/10"
                  onClick={handleReadOffline}
                >
                  <Check className="w-4 h-4 mr-2" />
                  Read Offline Version
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Offline Reading Dialog */}
      <Dialog open={offlineDialogOpen} onOpenChange={setOfflineDialogOpen}>
        <DialogContent className="max-w-3xl h-[85vh] flex flex-col">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle>{featuredArticle.title}</DialogTitle>
                <DialogDescription className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">
                    <WifiOff className="w-3 h-3 mr-1" />
                    Offline Version
                  </Badge>
                  {featuredArticle.category}
                </DialogDescription>
              </div>
              {selectedArticleContent && (
                <ListenButton
                  text={getPlainTextContent(selectedArticleContent)}
                  itemId={`offline-article-${featuredArticle.id}`}
                  title={featuredArticle.title}
                  voice="onyx"
                  size="sm"
                />
              )}
            </div>
          </DialogHeader>
          
          <ScrollArea className="flex-1 pr-4">
            {selectedArticleContent && (
              <div className="prose prose-sm dark:prose-invert max-w-none">
                {selectedArticleContent.split('\n').map((line, index) => {
                  if (line.startsWith('# ')) {
                    return <h1 key={index} className="text-2xl font-bold mt-6 mb-4">{line.slice(2)}</h1>;
                  }
                  if (line.startsWith('## ')) {
                    return <h2 key={index} className="text-xl font-bold mt-5 mb-3">{line.slice(3)}</h2>;
                  }
                  if (line.startsWith('### ')) {
                    return <h3 key={index} className="text-lg font-semibold mt-4 mb-2">{line.slice(4)}</h3>;
                  }
                  if (line.startsWith('**') && line.endsWith('**')) {
                    return <p key={index} className="font-bold my-2">{line.slice(2, -2)}</p>;
                  }
                  if (line.startsWith('- ')) {
                    return <li key={index} className="ml-4 my-1">{line.slice(2)}</li>;
                  }
                  if (line.match(/^\d+\./)) {
                    return <li key={index} className="ml-4 my-1 list-decimal">{line.replace(/^\d+\.\s*/, '')}</li>;
                  }
                  if (line.trim() === '') {
                    return <br key={index} />;
                  }
                  return <p key={index} className="my-2 leading-relaxed">{line}</p>;
                })}
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
};
