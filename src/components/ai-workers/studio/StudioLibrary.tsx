import { useState } from 'react';
import { Film, Play, Plus, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { YouTubeUploadDialog } from '@/components/youtube/YouTubeUploadDialog';

interface StudioLibraryProps {
  videos: any[];
  onNewVideo: () => void;
}

export function StudioLibrary({ videos, onNewVideo }: StudioLibraryProps) {
  const [ytDialogOpen, setYtDialogOpen] = useState(false);
  const [ytVideo, setYtVideo] = useState<any>(null);

  const handleYouTubeUpload = (video: any) => {
    setYtVideo(video);
    setYtDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-foreground">My Videos</h3>
        <Button onClick={onNewVideo} className="gap-2 rounded-xl">
          <Plus className="w-4 h-4" /> New Video
        </Button>
      </div>

      {videos.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
            <Film className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground mb-4">No videos yet. Create your first one!</p>
          <Button onClick={onNewVideo} className="rounded-xl gap-2">
            <Plus className="w-4 h-4" /> Get Started
          </Button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-3">
          {videos.map(v => (
            <Card key={v.id} className="overflow-hidden hover:shadow-md transition-shadow border-border/30">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{v.title}</p>
                    <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                      <Badge variant="outline" className="text-[10px]">{v.template_type}</Badge>
                      <Badge variant="outline" className="text-[10px]">{v.provider || 'runway'}</Badge>
                      {v.generation_mode === 'image_to_video' && (
                        <Badge className="bg-violet-500/10 text-violet-600 text-[10px] border-0">Image→Video</Badge>
                      )}
                      {v.generation_mode === 'video_upload' && (
                        <Badge className="bg-blue-500/10 text-blue-600 text-[10px] border-0">Uploaded</Badge>
                      )}
                      {v.is_custom_content && (
                        <Badge className="bg-primary/10 text-primary text-[10px] border-0">Custom</Badge>
                      )}
                      <Badge
                        variant={v.status === 'completed' ? 'default' : v.status === 'blocked' ? 'destructive' : 'secondary'}
                        className="text-[10px]"
                      >
                        {v.status}
                      </Badge>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1.5">
                      {new Date(v.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1 shrink-0">
                    {v.status === 'completed' && (
                      <>
                        <Button size="sm" variant="outline" className="gap-1 rounded-lg">
                          <Play className="w-3 h-3" /> View
                        </Button>
                        {v.video_url && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="gap-1 rounded-lg text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                            onClick={() => handleYouTubeUpload(v)}
                          >
                            <Youtube className="w-3 h-3" /> YouTube
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {ytVideo && (
        <YouTubeUploadDialog
          open={ytDialogOpen}
          onOpenChange={setYtDialogOpen}
          videoUrl={ytVideo.video_url || ''}
          defaultTitle={ytVideo.title || ''}
          defaultDescription={ytVideo.description || ''}
          videoRequestId={ytVideo.id}
        />
      )}
    </div>
  );
}
