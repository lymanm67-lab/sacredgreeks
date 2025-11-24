import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ExternalLink, X } from 'lucide-react';

interface ExternalContentModalProps {
  url: string;
  title: string;
  description?: string;
  trigger: React.ReactNode;
  allowDirectLink?: boolean;
}

export function ExternalContentModal({ 
  url, 
  title, 
  description,
  trigger,
  allowDirectLink = true 
}: ExternalContentModalProps) {
  const [open, setOpen] = useState(false);

  const handleOpenExternal = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
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
                  Open in New Tab
                </Button>
              )}
            </div>
          </DialogHeader>
          
          <div className="flex-1 px-6 pb-6">
            <iframe
              src={url}
              title={title}
              className="w-full h-full rounded-md border bg-background"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
