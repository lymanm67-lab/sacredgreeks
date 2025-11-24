import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Award, Download, Share2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface AchievementBadgeDialogProps {
  type: "study_guide" | "devotional" | "assessment";
  title: string;
  subtitle?: string;
  completionDate?: string;
  trigger?: React.ReactNode;
}

export function AchievementBadgeDialog({
  type,
  title,
  subtitle,
  completionDate,
  trigger
}: AchievementBadgeDialogProps) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const generateBadge = async () => {
    setGenerating(true);
    try {
      // Get user's full name from profile
      let userName = user?.email || "Sacred Greeks Member";
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name")
          .eq("id", user.id)
          .single();
        
        if (profile?.full_name) {
          userName = profile.full_name;
        }
      }

      const { data, error } = await supabase.functions.invoke("generate-achievement-badge", {
        body: {
          type,
          title,
          subtitle,
          completionDate: completionDate || new Date().toLocaleDateString(),
          userName
        }
      });

      if (error) throw error;

      if (data.success && data.imageUrl) {
        setImageUrl(data.imageUrl);
        toast.success("Achievement badge created!");
      } else {
        throw new Error("Failed to generate badge");
      }
    } catch (error: any) {
      console.error("Error generating badge:", error);
      toast.error(error.message || "Failed to generate badge");
    } finally {
      setGenerating(false);
    }
  };

  const downloadBadge = () => {
    if (!imageUrl) return;

    // Create a temporary link and trigger download
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `sacred-greeks-${type}-badge.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Badge downloaded! Share it on social media!");
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (newOpen && !imageUrl) {
      // Auto-generate when dialog opens
      generateBadge();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="gap-2">
            <Award className="h-4 w-4" />
            Get Badge
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Your Achievement Badge
          </DialogTitle>
          <DialogDescription>
            Download and share your beautiful achievement badge on Instagram, Twitter, or any social platform!
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          {/* Badge Preview */}
          <div className="relative bg-gradient-to-br from-muted/50 to-muted rounded-lg overflow-hidden min-h-[400px] flex items-center justify-center">
            {generating ? (
              <div className="text-center space-y-3">
                <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
                <p className="text-sm text-muted-foreground">Creating your badge...</p>
                <p className="text-xs text-muted-foreground">This may take a moment</p>
              </div>
            ) : imageUrl ? (
              <img 
                src={imageUrl} 
                alt="Achievement Badge" 
                className="w-full h-auto rounded-lg"
              />
            ) : (
              <div className="text-center space-y-3 p-6">
                <Award className="h-16 w-16 text-muted-foreground mx-auto" />
                <p className="text-sm text-muted-foreground">Your badge will appear here</p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {imageUrl && (
            <div className="space-y-2">
              <Button
                onClick={downloadBadge}
                className="w-full bg-primary hover:bg-primary/90"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Badge
              </Button>
              
              <div className="text-center">
                <p className="text-xs text-muted-foreground">
                  Perfect for Instagram posts and stories! (1080x1080px)
                </p>
              </div>
            </div>
          )}

          {!generating && !imageUrl && (
            <Button
              onClick={generateBadge}
              className="w-full"
            >
              <Award className="h-4 w-4 mr-2" />
              Generate Badge
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
