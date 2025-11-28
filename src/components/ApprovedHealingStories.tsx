import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Quote, ChevronLeft, ChevronRight, Star, Heart } from "lucide-react";

interface HealingStory {
  id: string;
  name: string | null;
  organization: string | null;
  story_title: string;
  story_content: string;
  healing_type: string;
  featured: boolean;
}

export function ApprovedHealingStories() {
  const [stories, setStories] = useState<HealingStory[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStories = async () => {
      try {
        const { data, error } = await supabase
          .from("healing_stories")
          .select("id, name, organization, story_title, story_content, healing_type, featured")
          .eq("approved", true)
          .order("featured", { ascending: false })
          .order("created_at", { ascending: false })
          .limit(10);

        if (error) throw error;
        setStories(data || []);
      } catch (error) {
        console.error("Error loading stories:", error);
      } finally {
        setLoading(false);
      }
    };

    loadStories();
  }, []);

  const getHealingTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      church_hurt: "Church Hurt",
      ministry_fallout: "Ministry Fallout",
      spiritual_trauma: "Spiritual Trauma",
      faith_reconciliation: "Faith Reconciliation",
      identity_journey: "Identity Journey",
      community_healing: "Community Healing",
      other: "Other"
    };
    return types[type] || type;
  };

  const nextStory = () => {
    setCurrentIndex((prev) => (prev + 1) % stories.length);
  };

  const prevStory = () => {
    setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length);
  };

  if (loading) {
    return (
      <div className="animate-pulse bg-muted/30 rounded-2xl h-48"></div>
    );
  }

  if (stories.length === 0) {
    return null;
  }

  const currentStory = stories[currentIndex];

  // Truncate story content for display
  const truncateContent = (content: string, maxLength: number = 300) => {
    if (content.length <= maxLength) return content;
    return content.slice(0, maxLength).trim() + "...";
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-rose-500" />
          <h3 className="text-lg font-semibold">Community Healing Stories</h3>
        </div>
        {stories.length > 1 && (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={prevStory}
              className="h-8 w-8"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm text-muted-foreground">
              {currentIndex + 1} / {stories.length}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={nextStory}
              className="h-8 w-8"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

      <Card className="bg-gradient-to-br from-rose-500/5 via-amber-500/5 to-rose-500/5 border-rose-500/20 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-500 to-amber-500 flex items-center justify-center">
                <Quote className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex-1 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    {currentStory.story_title}
                    {currentStory.featured && (
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    )}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {currentStory.name || "Anonymous"}
                    {currentStory.organization && ` • ${currentStory.organization}`}
                  </p>
                </div>
                <Badge variant="secondary" className="text-xs whitespace-nowrap">
                  {getHealingTypeLabel(currentStory.healing_type)}
                </Badge>
              </div>
              <p className="text-foreground/90 italic leading-relaxed">
                "{truncateContent(currentStory.story_content)}"
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Story Navigation Dots */}
      {stories.length > 1 && (
        <div className="flex justify-center gap-1.5">
          {stories.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-rose-500 w-4"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
