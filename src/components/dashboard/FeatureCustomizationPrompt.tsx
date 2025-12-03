import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Sparkles, Settings2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const PROMPT_DISMISSED_KEY = 'feature-customization-prompt-dismissed';
const PROMPT_DELAY_DAYS = 1; // Show again after 1 day if dismissed

export function FeatureCustomizationPrompt() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const dismissed = localStorage.getItem(PROMPT_DISMISSED_KEY);
    if (dismissed) {
      const dismissedDate = new Date(dismissed);
      const now = new Date();
      const daysDiff = (now.getTime() - dismissedDate.getTime()) / (1000 * 60 * 60 * 24);
      
      // Show again after delay period
      if (daysDiff < PROMPT_DELAY_DAYS) {
        return;
      }
    }

    // Delay showing the prompt for a smooth experience
    const timer = setTimeout(() => setShow(true), 2000);
    return () => clearTimeout(timer);
  }, [user]);

  const handleDismiss = () => {
    localStorage.setItem(PROMPT_DISMISSED_KEY, new Date().toISOString());
    setShow(false);
  };

  const handleCustomize = () => {
    handleDismiss();
    navigate('/profile', { state: { openCustomization: true } });
  };

  if (!show) return null;

  return (
    <Card className="relative bg-gradient-to-r from-sacred/10 to-sacred/5 border-sacred/20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-sacred/5 via-transparent to-sacred/10 opacity-50" />
      
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 h-6 w-6 text-muted-foreground hover:text-foreground z-10"
        onClick={handleDismiss}
      >
        <X className="h-4 w-4" />
      </Button>

      <CardContent className="p-4 relative">
        <div className="flex items-start gap-4">
          <div className="h-10 w-10 rounded-full bg-sacred/20 flex items-center justify-center shrink-0">
            <Sparkles className="h-5 w-5 text-sacred" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground mb-1">
              Personalize Your Dashboard
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              Feeling overwhelmed? Hide features you don't need yet and focus on what matters most to your journey.
            </p>
            
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                onClick={handleCustomize}
                className="bg-sacred hover:bg-sacred/90"
              >
                <Settings2 className="h-4 w-4 mr-2" />
                Customize Features
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleDismiss}
              >
                Maybe Later
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
