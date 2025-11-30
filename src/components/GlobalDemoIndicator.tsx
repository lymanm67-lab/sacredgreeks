import React, { useState } from 'react';
import { FlaskConical, X, Settings, Eye, EyeOff } from 'lucide-react';
import { useDemoMode } from '@/contexts/DemoModeContext';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export function GlobalDemoIndicator() {
  const { isDemoMode, setDemoMode, toggleDemoMode, setHasSeenTour } = useDemoMode();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop position - top right, below header */}
      <div className="fixed top-20 right-4 z-[100] hidden sm:block">
        <DemoPopover 
          isDemoMode={isDemoMode}
          setDemoMode={setDemoMode}
          toggleDemoMode={toggleDemoMode}
          setHasSeenTour={setHasSeenTour}
          user={user}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          align="end"
        />
      </div>

      {/* Mobile position - bottom right, above other floating elements */}
      <div className="fixed bottom-20 right-4 z-[100] sm:hidden">
        <DemoPopover 
          isDemoMode={isDemoMode}
          setDemoMode={setDemoMode}
          toggleDemoMode={toggleDemoMode}
          setHasSeenTour={setHasSeenTour}
          user={user}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          align="end"
          isMobile
        />
      </div>
    </>
  );
}

interface DemoPopoverProps {
  isDemoMode: boolean;
  setDemoMode: (enabled: boolean) => void;
  toggleDemoMode: () => void;
  setHasSeenTour: (seen: boolean) => void;
  user: any;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  align?: "start" | "center" | "end";
  isMobile?: boolean;
}

function DemoPopover({ 
  isDemoMode, 
  setDemoMode, 
  toggleDemoMode, 
  setHasSeenTour, 
  user, 
  isOpen, 
  setIsOpen,
  align = "end",
  isMobile = false
}: DemoPopoverProps) {
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={isDemoMode ? "default" : "outline"}
          size={isMobile ? "default" : "sm"}
          className={`gap-2 shadow-lg ${
            isDemoMode 
              ? 'bg-amber-500 hover:bg-amber-600 text-amber-950 border-amber-400' 
              : 'bg-background/90 backdrop-blur-sm border-border hover:bg-accent'
          } ${isMobile ? 'h-12 px-4 rounded-full' : ''}`}
        >
          <FlaskConical className={isMobile ? "w-5 h-5" : "w-4 h-4"} />
          <span className={isMobile ? "text-sm font-medium" : "hidden sm:inline"}>
            Demo
          </span>
          {isDemoMode && (
            <span className="flex h-2 w-2 rounded-full bg-amber-950/60 animate-pulse" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className={`${isMobile ? 'w-[calc(100vw-2rem)] max-w-sm' : 'w-72'}`} 
        align={align}
        side={isMobile ? "top" : "bottom"}
        sideOffset={8}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FlaskConical className="w-5 h-5 text-sacred" />
              <h4 className="font-semibold">Demo Mode</h4>
            </div>
            <Switch
              checked={isDemoMode}
              onCheckedChange={toggleDemoMode}
            />
          </div>
          
          <p className="text-sm text-muted-foreground">
            {isDemoMode 
              ? 'Viewing sample data to explore app features.' 
              : 'Enable to see sample data throughout the app.'}
          </p>

          {isDemoMode && (
            <div className="space-y-3 pt-2 border-t">
              <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400">
                <Eye className="w-4 h-4" />
                <span>Demo data is being displayed</span>
              </div>
              
              <div className="flex flex-col gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => {
                    setHasSeenTour(false);
                    setIsOpen(false);
                  }}
                >
                  <FlaskConical className="w-4 h-4 mr-2" />
                  Take Demo Tour
                </Button>
                
                {user && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    asChild
                  >
                    <Link to="/profile" onClick={() => setIsOpen(false)}>
                      <Settings className="w-4 h-4 mr-2" />
                      Customize Features
                    </Link>
                  </Button>
                )}
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="w-full text-muted-foreground"
                onClick={() => {
                  setDemoMode(false);
                  setIsOpen(false);
                }}
              >
                <EyeOff className="w-4 h-4 mr-2" />
                Turn Off Demo Mode
              </Button>
            </div>
          )}

          {!isDemoMode && (
            <div className="pt-2 border-t">
              <p className="text-xs text-muted-foreground">
                Demo mode lets you explore all features with sample data before creating your own content.
              </p>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
