import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ExternalLink, AlertCircle, Loader2 } from 'lucide-react';
import { useResourceHistory } from '@/hooks/use-resource-history';
import { useExternalLinks } from '@/hooks/use-external-links';

interface ExternalContentModalProps {
  url: string;
  title: string;
  description?: string;
  category?: string;
  trigger: React.ReactNode;
  allowDirectLink?: boolean;
  onOpen?: () => void;
}

export function ExternalContentModal({ 
  url, 
  title, 
  description,
  category = "Resource",
  trigger,
  allowDirectLink = true,
  onOpen
}: ExternalContentModalProps) {
  const [open, setOpen] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const { addToHistory } = useResourceHistory();
  const { openExternalLink } = useExternalLinks();

  useEffect(() => {
    if (open) {
      // Reset states when opening
      setIframeLoaded(false);
      setIframeError(false);
      
      // Track this view in history
      addToHistory({
        title,
        url,
        category,
      });
      onOpen?.();

      // Set a timeout - if iframe doesn't load in 5 seconds, show fallback
      const timeout = setTimeout(() => {
        if (!iframeLoaded) {
          setIframeError(true);
        }
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [open]);

  const handleOpenExternal = () => {
    openExternalLink(url);
  };

  const handleIframeLoad = () => {
    setIframeLoaded(true);
    setIframeError(false);
  };

  const handleIframeError = () => {
    setIframeError(true);
  };

  return (
    <>
      <div onClick={() => setOpen(true)}>
        {trigger}
      </div>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl h-[80vh] flex flex-col p-0">
          <DialogHeader className="px-6 pt-6 pb-2">
            <div className="flex items-start justify-between">
              <div className="flex-1 pr-8">
                <DialogTitle>{title}</DialogTitle>
                {description && (
                  <DialogDescription className="mt-2">
                    {description}
                  </DialogDescription>
                )}
              </div>
              {allowDirectLink && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleOpenExternal}
                  className="flex-shrink-0"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open in Browser
                </Button>
              )}
            </div>
          </DialogHeader>
          
          <div className="flex-1 px-6 pb-6 relative">
            {/* Loading State */}
            {!iframeLoaded && !iframeError && (
              <div className="absolute inset-0 flex items-center justify-center bg-muted/50 rounded-md">
                <div className="text-center space-y-3">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto text-sacred" />
                  <p className="text-sm text-muted-foreground">Loading content...</p>
                </div>
              </div>
            )}

            {/* Error/Fallback State */}
            {iframeError && (
              <div className="absolute inset-0 flex items-center justify-center bg-muted/50 rounded-md z-10">
                <div className="text-center space-y-4 p-6 max-w-sm">
                  <AlertCircle className="w-12 h-12 mx-auto text-muted-foreground" />
                  <div>
                    <h3 className="font-semibold mb-1">Content couldn't load in app</h3>
                    <p className="text-sm text-muted-foreground">
                      This content may not support embedded viewing. Open it in your browser for the best experience.
                    </p>
                  </div>
                  <Button onClick={handleOpenExternal} className="bg-sacred hover:bg-sacred/90">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open in Browser
                  </Button>
                </div>
              </div>
            )}

            <iframe
              src={url}
              title={title}
              className={`w-full h-full rounded-md border bg-background ${iframeError ? 'opacity-0' : ''}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onLoad={handleIframeLoad}
              onError={handleIframeError}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
