import React from 'react';
import { Link } from 'react-router-dom';
import { FlaskConical, X } from 'lucide-react';
import { useDemoMode } from '@/contexts/DemoModeContext';
import { Button } from '@/components/ui/button';

export function GlobalDemoIndicator() {
  const { isDemoMode, setDemoMode } = useDemoMode();

  if (!isDemoMode) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 animate-fade-in">
      <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-amber-500/90 text-amber-950 shadow-lg backdrop-blur-sm border border-amber-400/50">
        <FlaskConical className="w-4 h-4" />
        <span className="text-sm font-medium">Demo Mode</span>
        <Link 
          to="/profile" 
          className="text-xs underline underline-offset-2 hover:no-underline"
        >
          Settings
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="h-5 w-5 ml-1 hover:bg-amber-600/20"
          onClick={() => setDemoMode(false)}
        >
          <X className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
}
