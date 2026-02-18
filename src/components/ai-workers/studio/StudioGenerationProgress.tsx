import { useState, useEffect } from 'react';
import { CheckCircle, AlertTriangle, Loader2, RotateCcw, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
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

const STAGES = [
  { label: 'Submitting request…', minPct: 0, maxPct: 10 },
  { label: 'Warming up Wan 2.1 model…', minPct: 10, maxPct: 25 },
  { label: 'Generating frames…', minPct: 25, maxPct: 70 },
  { label: 'Compositing & encoding…', minPct: 70, maxPct: 90 },
  { label: 'Finalizing video…', minPct: 90, maxPct: 98 },
];

export function StudioGenerationProgress({
  jobStatus, videoUrl, onReset, onRegenerate, onBackToScript,
  videoTitle, videoDescription, videoRequestId,
}: StudioGenerationProgressProps) {
  const [ytDialogOpen, setYtDialogOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [stageIdx, setStageIdx] = useState(0);

  const isProcessing = jobStatus !== 'completed' && jobStatus !== 'failed';

  // Simulate progress over ~5 minutes
  useEffect(() => {
    if (!isProcessing) {
      if (jobStatus === 'completed') setProgress(100);
      return;
    }

    const interval = setInterval(() => {
      setElapsed(prev => prev + 1);
      setProgress(prev => {
        // Advance ~0.3% per second, slowing near the end
        const target = Math.min(98, prev + (prev < 25 ? 0.5 : prev < 70 ? 0.35 : 0.15));
        return target;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isProcessing, jobStatus]);

  // Update stage based on progress
  useEffect(() => {
    const idx = STAGES.findIndex(s => progress >= s.minPct && progress < s.maxPct);
    if (idx >= 0) setStageIdx(idx);
    else if (progress >= 98) setStageIdx(STAGES.length - 1);
  }, [progress]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

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
          <p className="text-sm text-muted-foreground">
            {STAGES[stageIdx]?.label || 'Processing…'}
          </p>

          {/* Progress bar */}
          <div className="w-full max-w-sm mx-auto space-y-2">
            <Progress value={progress} className="h-2.5" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{Math.round(progress)}%</span>
              <span>Elapsed: {formatTime(elapsed)}</span>
            </div>
          </div>

          {/* Stage indicators */}
          <div className="flex justify-center gap-1.5 mt-2">
            {STAGES.map((stage, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all ${
                  i < stageIdx ? 'bg-primary' : i === stageIdx ? 'bg-primary animate-pulse' : 'bg-muted'
                }`}
                title={stage.label}
              />
            ))}
          </div>

          <p className="text-xs text-muted-foreground mt-4">
            Typically takes 2–5 minutes. You can leave and come back.
          </p>
          <Badge variant="outline" className="text-xs">{jobStatus || 'Processing'}</Badge>
        </>
      )}
    </div>
  );
}
