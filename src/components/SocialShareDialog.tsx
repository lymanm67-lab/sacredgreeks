import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Share2, Facebook, Twitter, Linkedin, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { useExternalLinks } from "@/hooks/use-external-links";

interface SocialShareDialogProps {
  title: string;
  description: string;
  url?: string;
  hashtags?: string[];
  trigger?: React.ReactNode;
}

export function SocialShareDialog({ 
  title, 
  description, 
  url = window.location.href,
  hashtags = ["SacredGreeks"],
  trigger
}: SocialShareDialogProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { openExternalLink } = useExternalLinks();

  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);
  const encodedUrl = encodeURIComponent(url);
  const encodedHashtags = hashtags.join(",");

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}%0A${encodedDescription}&url=${encodedUrl}&hashtags=${encodedHashtags}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    openExternalLink(shareLinks[platform]);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5 text-primary" />
            Share Your Achievement
          </DialogTitle>
          <DialogDescription>
            Share your progress with your community and inspire others!
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">Share on social media</p>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant="outline"
                onClick={() => handleShare("twitter")}
                className="gap-2 hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2] transition-colors"
              >
                <Twitter className="h-4 w-4" />
                Twitter
              </Button>
              <Button
                variant="outline"
                onClick={() => handleShare("facebook")}
                className="gap-2 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-colors"
              >
                <Facebook className="h-4 w-4" />
                Facebook
              </Button>
              <Button
                variant="outline"
                onClick={() => handleShare("linkedin")}
                className="gap-2 hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-colors"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Or copy link</p>
            <div className="flex gap-2">
              <Input
                value={url}
                readOnly
                className="flex-1"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopyLink}
                className="shrink-0"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="bg-muted p-3 rounded-lg space-y-1">
            <p className="text-sm font-semibold">{title}</p>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
