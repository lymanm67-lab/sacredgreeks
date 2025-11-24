import { Card } from '@/components/ui/card';
import { Play } from 'lucide-react';
import { useState } from 'react';

export const WelcomeVideo = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Replace this URL with your actual welcome video URL
  const videoUrl = "https://www.youtube.com/embed/qtDlvE0a9Ok";
  
  return (
    <Card className="overflow-hidden border-2 shadow-xl animate-fade-in">
      <div className="relative">
        {/* Video Title/Header */}
        <div className="bg-gradient-to-r from-sacred to-warm-blue p-4">
          <h2 className="text-2xl font-bold text-white">Welcome to Sacred Greeks</h2>
          <p className="text-white/90 text-sm mt-1">A message from Dr. Lyman Montgomery</p>
        </div>
        
        {/* Video Container */}
        <div className="relative aspect-video bg-muted">
          {!isPlaying ? (
            // Thumbnail with play button
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-sacred/20 to-warm-blue/20 cursor-pointer group" onClick={() => setIsPlaying(true)}>
              <div className="w-20 h-20 rounded-full bg-white shadow-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Play className="w-10 h-10 text-sacred ml-1" fill="currentColor" />
              </div>
              <div className="absolute inset-0 bg-black/20" />
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