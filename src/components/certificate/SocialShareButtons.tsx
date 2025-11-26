import { Button } from '@/components/ui/button';
import { Facebook, Twitter, Linkedin, Link2, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

interface SocialShareButtonsProps {
  shareUrl: string;
  title: string;
  description: string;
}

export function SocialShareButtons({ shareUrl, title, description }: SocialShareButtonsProps) {
  const { toast } = useToast();
  const [isSharing, setIsSharing] = useState(false);

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };

  const handleShare = (platform: 'facebook' | 'twitter' | 'linkedin') => {
    window.open(shareLinks[platform], '_blank', 'width=600,height=400');
    toast({
      title: "Sharing...",
      description: `Opening ${platform} to share your achievement`,
    });
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Link Copied!",
        description: "Share link has been copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Please copy the link manually",
        variant: "destructive",
      });
    }
  };

  const handleWebShare = async () => {
    if (!navigator.share) {
      copyLink();
      return;
    }

    setIsSharing(true);
    try {
      await navigator.share({
        title,
        text: description,
        url: shareUrl,
      });
      toast({
        title: "Shared!",
        description: "Your achievement has been shared",
      });
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        console.error('Error sharing:', error);
      }
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-muted-foreground">Share Your Achievement</p>
      
      {/* Primary Share Buttons */}
      <div className="grid grid-cols-3 gap-2">
        <Button
          onClick={() => handleShare('facebook')}
          variant="outline"
          className="flex-1"
          size="sm"
        >
          <Facebook className="w-4 h-4 mr-2" />
          Facebook
        </Button>
        
        <Button
          onClick={() => handleShare('twitter')}
          variant="outline"
          className="flex-1"
          size="sm"
        >
          <Twitter className="w-4 h-4 mr-2" />
          Twitter
        </Button>
        
        <Button
          onClick={() => handleShare('linkedin')}
          variant="outline"
          className="flex-1"
          size="sm"
        >
          <Linkedin className="w-4 h-4 mr-2" />
          LinkedIn
        </Button>
      </div>

      {/* Secondary Actions */}
      <div className="flex gap-2">
        <Button
          onClick={copyLink}
          variant="outline"
          className="flex-1"
          size="sm"
        >
          <Link2 className="w-4 h-4 mr-2" />
          Copy Link
        </Button>
        
        {navigator.share && (
          <Button
            onClick={handleWebShare}
            variant="outline"
            disabled={isSharing}
            size="sm"
          >
            <Share2 className="w-4 h-4 mr-2" />
            More
          </Button>
        )}
      </div>
    </div>
  );
}