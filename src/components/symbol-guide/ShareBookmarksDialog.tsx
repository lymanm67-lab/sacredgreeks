import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Share2, Copy, Check, Link, ExternalLink } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface ShareBookmarksDialogProps {
  bookmarkIds: string[];
  trigger?: React.ReactNode;
}

const ShareBookmarksDialog = ({ bookmarkIds, trigger }: ShareBookmarksDialogProps) => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('My Symbol Guide Collection');
  const [description, setDescription] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCreate = async () => {
    if (!user || bookmarkIds.length === 0) return;
    
    setIsCreating(true);
    try {
      // Generate share token
      const { data: tokenData, error: tokenError } = await supabase
        .rpc('generate_symbol_share_token');
      
      if (tokenError) throw tokenError;
      
      const shareToken = tokenData;
      
      // Create shared collection
      const { error } = await supabase
        .from('shared_symbol_bookmarks')
        .insert({
          user_id: user.id,
          share_token: shareToken,
          title,
          description: description || null,
          bookmark_ids: bookmarkIds,
        });
      
      if (error) throw error;
      
      const url = `${window.location.origin}/shared-symbols/${shareToken}`;
      setShareUrl(url);
      toast.success('Share link created!');
    } catch (error) {
      console.error('Error creating share link:', error);
      toast.error('Failed to create share link');
    } finally {
      setIsCreating(false);
    }
  };

  const handleCopy = async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy link');
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      setShareUrl(null);
      setTitle('My Symbol Guide Collection');
      setDescription('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm" className="gap-2">
            <Share2 className="w-4 h-4" />
            Share Collection
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-sacred" />
            Share Your Bookmarks
          </DialogTitle>
        </DialogHeader>

        {!shareUrl ? (
          <div className="space-y-4 py-4">
            <p className="text-sm text-muted-foreground">
              Create a shareable link for {bookmarkIds.length} bookmarked item{bookmarkIds.length !== 1 ? 's' : ''} with your notes. 
              Perfect for mentoring others in their faith journey.
            </p>
            
            <div className="space-y-2">
              <Label htmlFor="title">Collection Title</Label>
              <Input
                id="title"
                placeholder="My Symbol Guide Collection"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description (optional)</Label>
              <Textarea
                id="description"
                placeholder="Add context for who you're sharing this with..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="resize-none"
                rows={3}
              />
            </div>
            
            <div className="bg-muted/50 p-3 rounded-lg">
              <p className="text-xs text-muted-foreground">
                <strong>Note:</strong> Your personal notes will be included. The link can be viewed by anyone with access.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4 py-4">
            <div className="bg-badge-success/10 p-4 rounded-lg border border-badge-success/20 text-center">
              <Check className="w-8 h-8 mx-auto mb-2 text-badge-success" />
              <p className="font-medium text-badge-success-foreground">Share Link Created!</p>
            </div>
            
            <div className="space-y-2">
              <Label>Share Link</Label>
              <div className="flex gap-2">
                <Input
                  value={shareUrl}
                  readOnly
                  className="text-xs"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleCopy}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1 gap-2"
                onClick={() => window.open(shareUrl, '_blank')}
              >
                <ExternalLink className="w-4 h-4" />
                Preview
              </Button>
              <Button
                className="flex-1 gap-2"
                onClick={handleCopy}
              >
                <Link className="w-4 h-4" />
                {copied ? 'Copied!' : 'Copy Link'}
              </Button>
            </div>
          </div>
        )}

        <DialogFooter>
          {!shareUrl ? (
            <>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleCreate} 
                disabled={isCreating || bookmarkIds.length === 0}
                className="gap-2"
              >
                {isCreating ? 'Creating...' : 'Create Share Link'}
              </Button>
            </>
          ) : (
            <Button variant="outline" onClick={() => setOpen(false)} className="w-full">
              Done
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShareBookmarksDialog;
