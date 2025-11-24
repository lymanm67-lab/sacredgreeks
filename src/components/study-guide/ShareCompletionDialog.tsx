import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Share2, Twitter, Facebook, Linkedin, Link2, Check } from "lucide-react";
import { toast } from "sonner";

interface ShareCompletionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ShareCompletionDialog = ({ open, onOpenChange }: ShareCompletionDialogProps) => {
  const [copied, setCopied] = useState(false);

  const shareMessage = "I just completed all 5 sessions of the Sacred, Not Sinful study guide! 📖✨ A powerful journey exploring faith and Greek life with biblical clarity. #SacredGreeks #FaithJourney";
  const shareUrl = window.location.origin + "/study";

  const handleShare = (platform: string) => {
    let url = "";
    const encodedMessage = encodeURIComponent(shareMessage);
    const encodedUrl = encodeURIComponent(shareUrl);

    switch (platform) {
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${encodedMessage}&url=${encodedUrl}`;
        break;
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedMessage}`;
        break;
      case "linkedin":
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
    }

    if (url) {
      window.open(url, "_blank", "width=600,height=400");
      toast.success(`Opening ${platform} share dialog...`);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`${shareMessage}\n\n${shareUrl}`);
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy to clipboard");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-sacred" />
            Share Your Achievement
          </DialogTitle>
          <DialogDescription>
            Celebrate completing the Sacred, Not Sinful study guide by sharing your journey with others!
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Completion Badge */}
          <div className="bg-gradient-to-br from-sacred/10 to-sacred/5 border-2 border-sacred/20 rounded-lg p-6 text-center">
            <div className="mb-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sacred text-sacred-foreground mb-3">
                <Check className="w-8 h-8" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">
              Study Guide Completed! 🎉
            </h3>
            <p className="text-sm text-muted-foreground">
              5 sessions of biblical wisdom and reflection
            </p>
          </div>

          {/* Share Message Preview */}
          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-2 font-medium">Share message:</p>
            <p className="text-sm text-foreground italic">{shareMessage}</p>
          </div>

          {/* Social Share Buttons */}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground font-medium">Share on:</p>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant="outline"
                className="flex flex-col gap-2 h-auto py-4"
                onClick={() => handleShare("twitter")}
              >
                <Twitter className="w-5 h-5" />
                <span className="text-xs">Twitter</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col gap-2 h-auto py-4"
                onClick={() => handleShare("facebook")}
              >
                <Facebook className="w-5 h-5" />
                <span className="text-xs">Facebook</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col gap-2 h-auto py-4"
                onClick={() => handleShare("linkedin")}
              >
                <Linkedin className="w-5 h-5" />
                <span className="text-xs">LinkedIn</span>
              </Button>
            </div>
          </div>

          {/* Copy Link Button */}
          <Button
            variant="outline"
            className="w-full"
            onClick={copyToClipboard}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Link2 className="w-4 h-4 mr-2" />
                Copy Share Text
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
