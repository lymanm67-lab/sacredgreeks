import { useState } from 'react';
import { Play } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface VideoThumbnailProps {
  thumbnailUrl: string;
  title: string;
  subtitle?: string;
  duration?: string;
  className?: string;
}

export const VideoThumbnail = ({
  thumbnailUrl,
  title,
  subtitle = 'Click to Watch',
  duration = '45:00',
  className = '',
}: VideoThumbnailProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <Card className={`overflow-hidden shadow-xl cursor-pointer hover-lift card-shine ${className}`}>
      <CardContent className="p-0">
        <div className="block relative group">
          <div className="aspect-video relative overflow-hidden">
            {/* Thumbnail image with fallback gradient */}
            {!imageError ? (
              <img
                src={thumbnailUrl}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
                decoding="async"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-sacred via-sacred/80 to-warm-blue" />
            )}
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/60 group-hover:via-black/20 transition-colors duration-300" />
            
            {/* Duration Badge */}
            <Badge 
              className="absolute top-3 right-3 bg-black/70 text-white border-0 text-xs font-medium backdrop-blur-sm"
            >
              {duration}
            </Badge>
            
            {/* Play Button with pulse effect */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                {/* Pulse ring */}
                <div className="absolute inset-0 w-20 h-20 rounded-full bg-white/30 animate-ping opacity-75" />
                {/* Button */}
                <div className="relative w-20 h-20 rounded-full bg-white/95 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-2xl group-hover:bg-white">
                  <Play className="w-10 h-10 text-sacred ml-1" fill="currentColor" />
                </div>
              </div>
            </div>
            
            {/* Title overlay */}
            <div className="absolute bottom-4 left-4 right-4 z-10">
              <p className="text-white font-bold text-xl drop-shadow-lg mb-1">{title}</p>
              <p className="text-white/90 text-sm drop-shadow">{subtitle}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
