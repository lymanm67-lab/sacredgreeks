import { useState, useEffect } from 'react';
import { X, Radio, Share2, Download, Copy, Monitor, Info } from 'lucide-react';
import { usePresentationMode } from '@/hooks/use-presentation-mode';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useDemoMode } from '@/contexts/DemoModeContext';

export function PresentationModeBar() {
  const { isPresentationMode } = usePresentationMode();
  const { setDemoSetting } = useDemoMode();
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(timer);
  }, []);

  if (!isPresentationMode) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-11 bg-blue-700 text-white flex items-center px-4 gap-3 text-sm shadow-lg">
      {/* LIVE indicator */}
      <div className="flex items-center gap-2 font-semibold">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
        </span>
        LIVE
      </div>

      {/* Divider */}
      <div className="w-px h-5 bg-white/30" />

      {/* Action icons */}
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="h-7 w-7 text-white/80 hover:text-white hover:bg-white/10"
          onClick={() => toast.info('Presentation mode active — sample data displayed')}>
          <Monitor className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-white/80 hover:text-white hover:bg-white/10"
          onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success('Link copied'); }}>
          <Share2 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-white/80 hover:text-white hover:bg-white/10"
          onClick={() => toast.info('Use the Present tab to share your screen')}>
          <Copy className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-white/80 hover:text-white hover:bg-white/10"
          onClick={() => toast.info('Use the Slide Library to download decks')}>
          <Download className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-white/80 hover:text-white hover:bg-white/10"
          onClick={() => toast.info('Presentation Mode hides real data and shows curated samples for live demos')}>
          <Info className="h-4 w-4" />
        </Button>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Date & Time */}
      <div className="hidden sm:flex items-center gap-2 text-white/80 text-xs">
        <span>📅 {format(now, 'EEEE, MMMM d, yyyy')}</span>
        <span>🕐 {format(now, 'h:mm a')}</span>
      </div>

      {/* Close */}
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7 text-white/80 hover:text-white hover:bg-white/10"
        onClick={() => {
          setDemoSetting('presentationMode', false);
          toast.info('Presentation Mode deactivated');
        }}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}
