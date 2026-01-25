import { memo, useCallback, useState, useEffect, createContext, useContext } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { STORAGE_KEYS } from '@/lib/constants';

// Context to share current tour step with other components
interface TourContextType {
  currentStepId: string | null;
  isActive: boolean;
}

const TourContext = createContext<TourContextType>({ currentStepId: null, isActive: false });

export const useTourHighlight = () => useContext(TourContext);

// Map tour step IDs to data-tour attribute values
const STEP_TO_TOUR_ATTR: Record<string, string> = {
  devotional: 'devotional',
  mythbuster: 'mythbuster',
  journey: 'journey',
};

interface GuidedTourStep {
  id: string;
  title: string;
  description: string;
  targetSelector?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

const TOUR_STEPS: GuidedTourStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Sacred Greeks! 🎉',
    description: 'Let me give you a quick tour of your dashboard. This will only take a minute.',
  },
  {
    id: 'devotional',
    title: 'Daily Devotional',
    description: 'Start each day with a scripture-based devotional designed for Greeks navigating faith.',
    targetSelector: '[data-tour="devotional"]',
    position: 'bottom',
  },
  {
    id: 'mythbuster',
    title: 'Myth Buster',
    description: 'Get biblical answers to common objections about Greek life and faith compatibility.',
    targetSelector: '[data-tour="mythbuster"]',
    position: 'bottom',
  },
  {
    id: 'journey',
    title: '30-Day Journey',
    description: 'A structured program to build your faith foundation while integrating your Greek identity.',
    targetSelector: '[data-tour="journey"]',
    position: 'bottom',
  },
  {
    id: 'complete',
    title: 'You\'re All Set!',
    description: 'Explore at your own pace. Remember, your faith and Greek life can thrive together.',
  },
];

const TOUR_COMPLETED_KEY = 'sacred_greeks_tour_completed';

interface GuidedTourProps {
  onComplete?: () => void;
}

export const GuidedTour = memo(function GuidedTour({ onComplete }: GuidedTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const step = TOUR_STEPS[currentStep];
  const currentStepId = step?.id || null;

  useEffect(() => {
    const completed = localStorage.getItem(TOUR_COMPLETED_KEY);
    if (!completed) {
      // Delay tour start to let page render
      const timeout = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timeout);
    }
  }, []);

  // Add/remove highlight class on target elements
  useEffect(() => {
    if (!isVisible) return;
    
    const tourAttr = STEP_TO_TOUR_ATTR[currentStepId || ''];
    if (!tourAttr) return;

    const targetEl = document.querySelector(`[data-tour="${tourAttr}"]`);
    if (targetEl) {
      targetEl.classList.add('tour-highlight');
      return () => {
        targetEl.classList.remove('tour-highlight');
      };
    }
  }, [currentStepId, isVisible]);

  const handleNext = useCallback(() => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleComplete();
    }
  }, [currentStep]);

  const handleSkip = useCallback(() => {
    handleComplete();
  }, []);

  const handleComplete = useCallback(() => {
    localStorage.setItem(TOUR_COMPLETED_KEY, 'true');
    setIsVisible(false);
    // Clean up any lingering highlights
    document.querySelectorAll('.tour-highlight').forEach(el => {
      el.classList.remove('tour-highlight');
    });
    onComplete?.();
  }, [onComplete]);

  if (!isVisible) return null;

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === TOUR_STEPS.length - 1;

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Subtle backdrop - allows dashboard to remain visible */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/30 z-[100] pointer-events-none"
          />
          
          {/* Tour Card - positioned at bottom for visibility */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-1/2 bottom-4 -translate-x-1/2 z-[101] w-full max-w-md px-4"
          >
            <Card className="border-2 border-primary/30 shadow-2xl bg-card/95 backdrop-blur-md">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Step {currentStep + 1} of {TOUR_STEPS.length}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 -mt-1 -mr-2"
                    onClick={handleSkip}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground mb-6">{step.description}</p>

                {/* Progress dots */}
                <div className="flex items-center justify-center gap-2 mb-6">
                  {TOUR_STEPS.map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        i === currentStep
                          ? 'bg-primary'
                          : i < currentStep
                          ? 'bg-primary/50'
                          : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <Button variant="ghost" onClick={handleSkip} className="text-muted-foreground">
                    Skip tour
                  </Button>
                  <Button onClick={handleNext} className="gap-2">
                    {isLastStep ? (
                      <>
                        Get Started
                        <CheckCircle2 className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        Next
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});

export function useTourReset() {
  const resetTour = useCallback(() => {
    localStorage.removeItem(TOUR_COMPLETED_KEY);
    window.location.reload();
  }, []);

  return { resetTour };
}
