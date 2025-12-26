import React, { useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Play } from 'lucide-react';
import welcomeThumbnail from '@/assets/welcome-video-thumbnail.jpg';
import { ExternalContentModal } from '@/components/ui/ExternalContentModal';

interface VideoItem {
  id: string;
  title: string;
  description: string;
  url: string;
}

// Featured videos from the Video Library for daily rotation
const rotatingVideos: VideoItem[] = [
  {
    id: "vid-welcome",
    title: "Welcome to Sacred Greeks",
    description: "Discover how to navigate Greek life with faith and integrity",
    url: "https://www.youtube.com/embed/dslPmKSDJ50?si=e0r7XTNi-8YiRYBA",
  },
  {
    id: "vid-truth-christian",
    title: "The Truth About Being Christian in a Greek Organization",
    description: "Sacred Greeks TV explores the reality of maintaining your Christian faith while being an active member of a Greek letter organization.",
    url: "https://www.youtube.com/embed/GmMQisNNZjI",
  },
  {
    id: "vid-should-join",
    title: "Should Christians Join BGLOs?",
    description: "A comprehensive discussion on whether Christians should join Black Greek Letter Organizations and practical guidance for balancing faith.",
    url: "https://www.youtube.com/embed/25gQ4qXxXi0",
  },
  {
    id: "vid-top10",
    title: "Top 10 Faith Questions About Greek Life Answered!",
    description: "The most common questions church leaders and Christians have about Greek life, answered with biblical wisdom and practical insight.",
    url: "https://www.youtube.com/embed/PLQG1lOu-48",
  },
  {
    id: "vid-pagan-symbols",
    title: "Understanding Greek Letter Organization Rituals",
    description: "A deep dive into the spiritual aspects of Greek rituals and how Christians can navigate them with biblical discernment.",
    url: "https://www.youtube.com/embed/48I-fdTNg8c",
  },
  {
    id: "vid-renounce",
    title: "Renounce, Retreat, or Redeem Greek Life?",
    description: "Should Christians renounce, retreat, or redeem their Greek Letter Organizations?",
    url: "https://www.youtube.com/embed/ZK9HfHf3mLc",
  },
];

// Get the video for today based on the date
const getDailyVideo = (): VideoItem => {
  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 0);
  const diff = today.getTime() - startOfYear.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  // Use day of year to select a video, cycling through the array
  const videoIndex = dayOfYear % rotatingVideos.length;
  return rotatingVideos[videoIndex];
};

export const WelcomeVideo = () => {
  const dailyVideo = useMemo(() => getDailyVideo(), []);
  
  return (
    <Card className="overflow-hidden border-2 shadow-xl h-full flex flex-col">
      <div className="flex flex-col h-full">
        {/* Video Title/Header */}
        <div className="bg-gradient-to-r from-sacred to-warm-blue p-4">
          <h2 className="text-xl md:text-2xl font-bold text-white line-clamp-1">{dailyVideo.title}</h2>
          <p className="text-white/90 text-xs md:text-sm mt-1 line-clamp-2">{dailyVideo.description}</p>
        </div>
        
        {/* Video Container */}
        <div className="relative aspect-video bg-muted flex-1">
          <ExternalContentModal
            url={dailyVideo.url}
            title={dailyVideo.title}
            description={dailyVideo.description}
            category="Daily Featured Video"
            trigger={
              <div className="absolute inset-0 flex items-center justify-center cursor-pointer group">
                {/* Custom thumbnail */}
                <img 
                  src={welcomeThumbnail}
                  alt={dailyVideo.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white shadow-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 z-10">
                  <Play className="w-8 h-8 md:w-10 md:h-10 text-sacred ml-1" fill="currentColor" />
                </div>
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
              </div>
            }
          />
        </div>
      </div>
    </Card>
  );
};
