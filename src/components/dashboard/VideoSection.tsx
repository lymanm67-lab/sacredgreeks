import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Video, Play } from 'lucide-react';
import { ExternalContentModal } from '@/components/ui/ExternalContentModal';

const videos = [
  {
    title: "Living Out Your Faith in Greek Life",
    url: "https://www.youtube.com/embed/qtDlvE0a9Ok",
    description: "Practical tips for maintaining your Christian walk in Greek organizations"
  },
  {
    title: "Navigating Difficult Conversations",
    url: "https://www.youtube.com/embed/ICyKY7z7E5M",
    description: "How to address faith-based concerns with chapter members"
  },
  {
    title: "Building Biblical Community",
    url: "https://www.youtube.com/embed/PLQG1lOu-48",
    description: "Creating meaningful fellowship within your organization"
  }
];

export const VideoSection = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Video className="w-5 h-5 text-sacred" />
          <CardTitle>Featured Resources</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((video, index) => (
            <ExternalContentModal
              key={index}
              url={video.url}
              title={video.title}
              description={video.description}
              category="Video"
              trigger={
                <div className="space-y-2 cursor-pointer group">
                  <div className="aspect-video rounded-lg overflow-hidden bg-muted border-2 border-border group-hover:border-sacred/50 transition-all relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-sacred/20 to-warm-blue/20 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 text-sacred ml-0.5" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm group-hover:text-sacred transition-colors">{video.title}</h3>
                    <p className="text-xs text-muted-foreground">{video.description}</p>
                  </div>
                </div>
              }
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
