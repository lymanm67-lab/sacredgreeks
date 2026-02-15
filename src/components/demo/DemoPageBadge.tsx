import { FlaskConical, Volume2, VolumeX, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useDemoMode } from '@/contexts/DemoModeContext';
import { useTextToSpeech } from '@/hooks/use-text-to-speech';
import { getDemoNarration } from '@/data/demoNarrationScripts';

interface DemoPageBadgeProps {
  pageKey: string;
  className?: string;
}

/**
 * Inline badge + TTS walkthrough button for page headers.
 * Only renders when Demo Mode is active.
 * Provides a full guided narration of the page's features and demo data.
 */
export function DemoPageBadge({ pageKey, className = '' }: DemoPageBadgeProps) {
  const { isDemoMode } = useDemoMode();
  const { speak, stop, isPlaying, isLoading } = useTextToSpeech();

  if (!isDemoMode) return null;

  const narration = getDemoNarration(pageKey);
  const ttsItemId = `demo-narration-${pageKey}`;
  const isThisPlaying = isPlaying === ttsItemId;
  const isThisLoading = isLoading === ttsItemId;

  const handleToggleTTS = () => {
    if (isThisPlaying || isThisLoading) {
      stop();
    } else if (narration) {
      speak(narration.script, ttsItemId, narration.voice || 'onyx', narration.title);
    }
  };

  return (
    <div className={`flex items-center gap-2 flex-wrap ${className}`}>
      <Badge 
        variant="outline" 
        className="bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30 gap-1.5 animate-in fade-in duration-300"
      >
        <FlaskConical className="w-3 h-3" />
        <span className="text-xs font-medium">Demo Mode Active</span>
        <span className="flex h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
      </Badge>

      {narration && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleToggleTTS}
          className={`h-7 px-2 gap-1.5 text-xs ${
            isThisPlaying 
              ? 'text-sacred bg-sacred/10 hover:bg-sacred/20' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {isThisLoading ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : isThisPlaying ? (
            <VolumeX className="w-3.5 h-3.5" />
          ) : (
            <Volume2 className="w-3.5 h-3.5" />
          )}
          {isThisPlaying ? 'Stop Tour' : 'Audio Tour'}
        </Button>
      )}
    </div>
  );
}
