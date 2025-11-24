import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Video } from 'lucide-react';

const videos = [
  {
    title: "Living Out Your Faith in Greek Life",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "Practical tips for maintaining your Christian walk in Greek organizations"
  },
  {
    title: "Navigating Difficult Conversations",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "How to address faith-based concerns with chapter members"
  },
  {
    title: "Building Biblical Community",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
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
            <div key={index} className="space-y-2">
              <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                <iframe
                  src={video.url}
                  title={video.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div>
                <h3 className="font-medium text-sm">{video.title}</h3>
                <p className="text-xs text-muted-foreground">{video.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};