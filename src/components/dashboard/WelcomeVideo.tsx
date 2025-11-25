import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Play } from 'lucide-react';

export const WelcomeVideo = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Replace this URL with your actual welcome video URL
  const videoUrl = "https://www.youtube.com/embed/dslPmKSDJ50";
  const videoId = "dslPmKSDJ50";
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  
  return (
    <Card className="overflow-hidden border-2 shadow-xl h-full flex flex-col">
      <div className="flex flex-col h-full">
        {/* Video Title/Header */}
        <div className="bg-gradient-to-r from-sacred to-warm-blue p-4">
          <h2 className="text-xl md:text-2xl font-bold text-white">Welcome to Sacred Greeks</h2>
          <p className="text-white/90 text-xs md:text-sm mt-1">A message from Dr. Lyman Montgomery</p>
        </div>
        
        {/* Video Container */}
        <div className="relative aspect-video bg-muted flex-1">
          {!isPlaying ? (
            // Thumbnail with play button
            <div 
              className="absolute inset-0 flex items-center justify-center cursor-pointer group"
              style={{
                backgroundImage: `url(${thumbnailUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
              onClick={() => setIsPlaying(true)}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white shadow-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 z-10">
                <Play className="w-8 h-8 md:w-10 md:h-10 text-sacred ml-1" fill="currentColor" />
              </div>
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
            </div>
          ) : (
            // Actual video iframe
            <iframe
              src={`${videoUrl}?autoplay=1`}
              title="Welcome Video"
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
      </div>
    </Card>
  );
};