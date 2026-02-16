import { useState } from 'react';
import { CheckCircle, AlertTriangle, Loader2, RotateCcw, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { YouTubeUploadDialog } from '@/components/youtube/YouTubeUploadDialog';

interface StudioGenerationProgressProps {
  jobStatus: string | null;
  videoUrl: string | null;
  onReset: () => void;
  onRegenerate: () => void;
  onBackToScript: () => void;
  videoTitle?: string;
  videoDescription?: string;
  videoRequestId?: string;
}

export function StudioGenerationProgress({
  jobStatus, videoUrl, onReset, onRegenerate, onBackToScript,
  videoTitle, videoDescription, videoRequestId,
}: StudioGenerationProgressProps) {
  const [ytDialogOpen, setYtDialogOpen] = useState(false);

  return (
    <div className="max-w-lg mx-auto text-center py-12 space-y-6">
      {jobStatus === 'completed' && videoUrl ? (
        <>
          <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold">Video Ready! 🎬</h3>
          <video
            src={videoUrl}
            controls
            className="w-full rounded-2xl shadow-xl border border-border/30"
            style={{ aspectRatio: '9/16', maxHeight: '500px' }}
          />
          <div className="flex gap-2 justify-center flex-wrap">
            <Button asChild size="lg" className="rounded-xl">
              <a href={videoUrl} target="_blank" rel="noopener noreferrer">Download</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-xl gap-2 text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
              onClick={() => setYtDialogOpen(true)}
            >
              <Youtube className="w-4 h-4" /> YouTube
            </Button>
            <Button variant="outline" size="lg" onClick={onReset} className="rounded-xl">Create Another</Button>
            <Button variant="ghost" size="sm" onClick={onRegenerate} className="gap-1">
              <RotateCcw className="w-4 h-4" /> Regenerate
            </Button>
          </div>

          <YouTubeUploadDialog
            open={ytDialogOpen}
            onOpenChange={setYtDialogOpen}
            videoUrl={videoUrl}
            defaultTitle={videoTitle || ''}
            defaultDescription={videoDescription || ''}
            videoRequestId={videoRequestId}
          />
        </>
      ) : jobStatus === 'failed' ? (
        <>
          <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
            <AlertTriangle className="w-10 h-10 text-destructive" />
          </div>
          <h3 className="text-2xl font-bold">Generation Failed</h3>
          <p className="text-muted-foreground">Something went wrong. Please try again.</p>
          <Button onClick={onBackToScript} className="rounded-xl">← Back to Script</Button>
        </>
      ) : (
        <>
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          </div>
          <h3 className="text-2xl font-bold">Generating Video...</h3>
          <p className="text-muted-foreground">This may take 1–5 minutes. You can leave and come back.</p>
          <div className="flex items-center justify-center gap-3">
            <Badge variant="outline" className="animate-pulse">{jobStatus || 'Processing'}</Badge>
          </div>
          <div className="w-full max-w-xs mx-auto h-1.5 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full animate-pulse" style={{ width: '60%' }} />
          </div>
        </>
      )}
    </div>
  );
}
