import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HandHeart, PenLine } from "lucide-react";
import { ShareHealingStoryDialog } from "@/components/ShareHealingStoryDialog";

export function HealingResourcesSection() {
  return (
    <div id="healing-resources" className="mt-10 max-w-3xl mx-auto scroll-mt-20">
      {/* Family & Ministry Healing Card */}
      <Link to="/family-ministry-fallout">
        <Card className="bg-gradient-to-r from-amber-500/10 to-rose-500/10 border border-amber-500/30 hover:border-amber-500/50 transition-all hover:shadow-lg cursor-pointer group">
          <CardContent className="flex flex-col sm:flex-row items-center gap-4 p-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-amber-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <HandHeart className="w-6 h-6 text-white" />
            </div>
            <div className="text-center sm:text-left flex-1">
              <h3 className="text-lg font-bold text-foreground group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                Family, Ministry & Church Hurt Healing
              </h3>
              <p className="text-sm text-muted-foreground">
                Navigate damaged relationships and process spiritual trauma with guided resources
              </p>
            </div>
            <Badge className="bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30">
              Support
            </Badge>
          </CardContent>
        </Card>
      </Link>
      
      {/* Share Story CTA - Simplified */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
        <p className="text-sm text-muted-foreground">
          Your story could inspire someone's healing journey.
        </p>
        <ShareHealingStoryDialog>
          <Button 
            variant="outline" 
            size="sm"
            className="border-amber-500/50 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10"
          >
            <PenLine className="w-4 h-4 mr-2" />
            Share Your Story
          </Button>
        </ShareHealingStoryDialog>
      </div>
    </div>
  );
}
