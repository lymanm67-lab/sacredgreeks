import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { ZoomIn } from 'lucide-react';

interface ExpandableImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
}

const ExpandableImage = ({ src, alt, className = '', containerClassName = '' }: ExpandableImageProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div 
        className={`relative cursor-pointer group ${containerClassName}`}
        onClick={() => setIsOpen(true)}
      >
        <img 
          src={src} 
          alt={alt}
          className={`${className} transition-transform group-hover:scale-105`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
          <div className="bg-background/90 rounded-full p-2">
            <ZoomIn className="w-5 h-5 text-foreground" />
          </div>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl p-2 bg-background/95 backdrop-blur-sm">
          <VisuallyHidden>
            <DialogTitle>{alt}</DialogTitle>
          </VisuallyHidden>
          <div className="relative w-full">
            <img 
              src={src} 
              alt={alt}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
            <p className="text-center text-sm text-muted-foreground mt-2 font-medium">{alt}</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ExpandableImage;
