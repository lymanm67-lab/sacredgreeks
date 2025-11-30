import { FlaskConical, Settings, Share2, X } from 'lucide-react';
import { useDemoMode } from '@/contexts/DemoModeContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { DemoSettingsDialog } from '@/components/DemoSettingsDialog';

export function DemoBanner() {
  const { isDemoMode, setDemoMode } = useDemoMode();
  const { toast } = useToast();

  if (!isDemoMode) return null;

  const handleShare = async () => {
    const shareData = {
      title: 'Sacred Greeks - Demo Mode',
      text: 'Check out Sacred Greeks app in demo mode to explore all features with sample data!',
      url: window.location.origin + '?demo=true',
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        toast({
          title: 'Link copied!',
          description: 'Demo link has been copied to your clipboard.',
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleExit = () => {
    setDemoMode(false);
    toast({
      title: 'Demo Mode Disabled',
      description: 'You are now viewing your real data.',
    });
  };

  return (
    <div className="bg-gradient-to-r from-emerald-500/90 to-teal-500/90 text-white px-4 py-2 sticky top-0 z-[60] animate-pulse-subtle">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 min-w-0">
          <FlaskConical className="h-4 w-4 shrink-0 animate-bounce" />
          <span className="font-medium text-sm truncate">
            Demo Mode Active
          </span>
          <span className="text-white/80 text-sm hidden sm:inline">
            — viewing sample data
          </span>
        </div>
        
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <DemoSettingsDialog
            trigger={
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 sm:px-3 text-white hover:bg-white/20 hover:text-white"
              >
                <Settings className="h-4 w-4 sm:mr-1.5" />
                <span className="hidden sm:inline text-xs">Settings</span>
              </Button>
            }
          />
          
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 sm:px-3 text-white hover:bg-white/20 hover:text-white"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4 sm:mr-1.5" />
            <span className="hidden sm:inline text-xs">Share</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 sm:px-3 text-white hover:bg-white/20 hover:text-white"
            onClick={handleExit}
          >
            <X className="h-4 w-4 sm:mr-1.5" />
            <span className="hidden sm:inline text-xs">Exit</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
