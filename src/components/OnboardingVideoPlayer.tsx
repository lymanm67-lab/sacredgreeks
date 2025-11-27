import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Play, X, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface OnboardingVideoPlayerProps {
  onSkip?: () => void;
  onComplete?: () => void;
}

export function OnboardingVideoPlayer({ onSkip, onComplete }: OnboardingVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Replace this with your actual video URL once recorded
  const videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ"; // Placeholder
  const hasVideo = false; // Set to true once you have the actual video
  
  const handlePlayVideo = () => {
    setIsPlaying(true);
  };
  
  const handleVideoEnd = () => {
    if (onComplete) {
      onComplete();
    }
  };
  
  const handleSkip = () => {
    if (onSkip) {
      onSkip();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Welcome to Sacred Greeks!</h2>
        <p className="text-muted-foreground">
          Watch this quick 30-second tour to see what you can do
        </p>
      </div>

      {/* Video Placeholder / Player */}
      <Card className="overflow-hidden border-2">
        {hasVideo ? (
          <div className="relative aspect-video bg-muted">
            {!isPlaying ? (
              // Thumbnail with play button
              <div 
                className="absolute inset-0 flex items-center justify-center cursor-pointer group"
                onClick={handlePlayVideo}
              >
                {/* Gradient background as placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-sacred via-warm-blue to-sacred-light" />
                
                <div className="w-20 h-20 rounded-full bg-white shadow-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 z-10">
                  <Play className="w-10 h-10 text-sacred ml-1" fill="currentColor" />
                </div>
                
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
                
                {/* Feature badges overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex gap-2 flex-wrap z-10">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur rounded-full text-xs font-medium">
                    📖 Daily Devotionals
                  </span>
                  <span className="px-3 py-1 bg-white/90 backdrop-blur rounded-full text-xs font-medium">
                    🙏 Prayer Tools
                  </span>
                  <span className="px-3 py-1 bg-white/90 backdrop-blur rounded-full text-xs font-medium">
                    📈 Track Progress
                  </span>
                </div>
              </div>
            ) : (
              // Embedded video player
              <iframe
                className="w-full h-full"
                src={`${videoUrl}?autoplay=1`}
                title="Sacred Greeks Onboarding Tour"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onEnded={handleVideoEnd}
              />
            )}
          </div>
        ) : (
          // No video yet - show features preview
          <div className="aspect-video bg-gradient-to-br from-sacred via-warm-blue to-sacred-light p-8 flex flex-col items-center justify-center text-white text-center space-y-4">
            <Play className="w-16 h-16 opacity-50" />
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Video Coming Soon</h3>
              <p className="text-sm opacity-90">
                We're creating a quick tour video to help you get started
              </p>
            </div>
            
            {/* Feature preview */}
            <div className="grid grid-cols-2 gap-3 mt-4 w-full max-w-md">
              <div className="bg-white/20 backdrop-blur rounded-lg p-3">
                <div className="text-2xl mb-1">📖</div>
                <div className="text-xs font-medium">Daily Devotionals</div>
              </div>
              <div className="bg-white/20 backdrop-blur rounded-lg p-3">
                <div className="text-2xl mb-1">🙏</div>
                <div className="text-xs font-medium">Prayer Tools</div>
              </div>
              <div className="bg-white/20 backdrop-blur rounded-lg p-3">
                <div className="text-2xl mb-1">📚</div>
                <div className="text-xs font-medium">Bible Study</div>
              </div>
              <div className="bg-white/20 backdrop-blur rounded-lg p-3">
                <div className="text-2xl mb-1">📈</div>
                <div className="text-xs font-medium">Track Growth</div>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Action buttons */}
      <div className="flex justify-between gap-3">
        <Button variant="outline" onClick={handleSkip}>
          {hasVideo ? 'Skip Video' : 'Skip Tour'}
        </Button>
        {hasVideo ? (
          <Button onClick={handlePlayVideo} className="bg-sacred hover:bg-sacred/90">
            <Play className="w-4 h-4 mr-2" />
            Watch Tour
          </Button>
        ) : (
          <Button onClick={onComplete} className="bg-sacred hover:bg-sacred/90">
            Continue
          </Button>
        )}
      </div>

      {/* Help text */}
      <p className="text-xs text-center text-muted-foreground">
        {hasVideo 
          ? "You can always watch this tour again from your profile settings"
          : "This 30-second tour will show you everything you can do"
        }
      </p>
    </div>
  );
}
