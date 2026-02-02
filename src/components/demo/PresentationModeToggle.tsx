import { useState } from 'react';
import { Presentation, Eye, EyeOff, Download, Play, Projector } from 'lucide-react';
import { useDemoMode } from '@/contexts/DemoModeContext';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

interface PresentationModeToggleProps {
  onGenerateDeck?: () => void;
  onStartSlideshow?: () => void;
}

export function PresentationModeToggle({ onGenerateDeck, onStartSlideshow }: PresentationModeToggleProps) {
  const { isDemoMode, setDemoMode, demoSettings, setDemoSetting } = useDemoMode();
  const [isOpen, setIsOpen] = useState(false);

  const isPresentationMode = demoSettings.presentationMode;

  const handleTogglePresentationMode = () => {
    // Ensure demo mode is enabled when presentation mode is on
    if (!isPresentationMode && !isDemoMode) {
      setDemoMode(true);
    }
    setDemoSetting('presentationMode', !isPresentationMode);
    
    if (!isPresentationMode) {
      toast.success('Presentation Mode Activated', {
        description: 'All personal data is now hidden. Sample data will be displayed.',
      });
    } else {
      toast.info('Presentation Mode Deactivated', {
        description: 'Normal view restored.',
      });
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={isPresentationMode ? "default" : "outline"}
          size="sm"
          className={`gap-2 ${
            isPresentationMode 
              ? 'bg-blue-600 hover:bg-blue-700 text-white border-blue-500' 
              : 'hover:bg-muted'
          }`}
        >
          <Presentation className="w-4 h-4" />
          <span className="hidden sm:inline">Present</span>
          {isPresentationMode && (
            <span className="flex h-2 w-2 rounded-full bg-white/60 animate-pulse" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-80" 
        align="end"
        sideOffset={8}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Presentation className="w-5 h-5 text-primary" />
              <h4 className="font-semibold">Presentation Mode</h4>
            </div>
            <Switch
              checked={isPresentationMode}
              onCheckedChange={handleTogglePresentationMode}
            />
          </div>
          
          <p className="text-sm text-muted-foreground">
            {isPresentationMode 
              ? 'Showing curated sample data for live demos. Personal information is hidden.' 
              : 'Enable to hide real user data and show polished sample content for sales presentations.'}
          </p>

          {isPresentationMode && (
            <div className="space-y-3 pt-2 border-t">
              <div className="flex items-center gap-2 text-sm text-primary">
                <Eye className="w-4 h-4" />
                <span>Sample data is being displayed</span>
              </div>
              
              <div className="text-xs text-muted-foreground space-y-1">
                <p>✓ User names anonymized</p>
                <p>✓ Email addresses hidden</p>
                <p>✓ Curated testimonials shown</p>
                <p>✓ Polished statistics displayed</p>
              </div>
            </div>
          )}

          <div className="pt-2 border-t space-y-2">
            {/* Launch Slideshow - Primary Action */}
            {onStartSlideshow && (
              <Button
                size="sm"
                className="w-full justify-start bg-primary"
                onClick={() => {
                  onStartSlideshow();
                  setIsOpen(false);
                }}
              >
                <Projector className="w-4 h-4 mr-2" />
                Launch Sales Slideshow
              </Button>
            )}

            {onGenerateDeck && (
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={() => {
                  onGenerateDeck();
                  setIsOpen(false);
                }}
              >
                <Download className="w-4 h-4 mr-2" />
                Generate Sales Deck PDF
              </Button>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-muted-foreground"
              onClick={() => {
                toast.info('30-45 Minute Pitch Guide', {
                  description: 'Start with Faith Snapshot → P.R.O.O.F. → Financial Tools → Community Features',
                  duration: 8000,
                });
              }}
            >
              <Play className="w-4 h-4 mr-2" />
              Show Pitch Sequence
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
