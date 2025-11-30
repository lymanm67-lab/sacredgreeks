import { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useDemoMode } from '@/contexts/DemoModeContext';

interface WalkthroughStep {
  id: string;
  title: string;
  description: string;
  target?: string;
  position: 'center' | 'top' | 'bottom';
}

const walkthroughSteps: WalkthroughStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Demo Mode!',
    description: 'Explore Sacred Greeks with sample data. This walkthrough will guide you through the key features.',
    position: 'center',
  },
  {
    id: 'dashboard',
    title: 'Your Dashboard',
    description: 'Access your personalized dashboard with daily devotionals, prayer journal, and progress tracking.',
    position: 'top',
  },
  {
    id: 'features',
    title: 'Explore Features',
    description: 'Try out Bible Study, Prayer Wall, Service Tracker, and more with pre-loaded sample data.',
    position: 'center',
  },
  {
    id: 'scenarios',
    title: 'Demo Scenarios',
    description: 'Switch between different user scenarios (New User, Power User, Greek Leader) to see varied experiences.',
    position: 'center',
  },
  {
    id: 'settings',
    title: 'Demo Settings',
    description: 'Customize your demo experience using the settings in the green banner above.',
    position: 'top',
  },
  {
    id: 'complete',
    title: 'You\'re Ready!',
    description: 'Start exploring! When you\'re done, click "Exit" in the banner to return to normal mode.',
    position: 'center',
  },
];

export function DemoWalkthroughOverlay() {
  const { isDemoMode, hasSeenTour, setHasSeenTour } = useDemoMode();
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isDemoMode && !hasSeenTour) {
      setIsVisible(true);
      setCurrentStep(0);
    }
  }, [isDemoMode, hasSeenTour]);

  if (!isVisible) return null;

  const step = walkthroughSteps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === walkthroughSteps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      handleClose();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (!isFirstStep) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setHasSeenTour(true);
  };

  const handleSkip = () => {
    handleClose();
  };

  const positionClasses = {
    center: 'items-center justify-center',
    top: 'items-start justify-center pt-24',
    bottom: 'items-end justify-center pb-24',
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex animate-fade-in">
      <div className={`flex w-full ${positionClasses[step.position]}`}>
        <Card className="max-w-md mx-4 shadow-2xl border-2 border-emerald-200 dark:border-emerald-800 animate-scale-in">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-full bg-emerald-100 dark:bg-emerald-900">
                  <Sparkles className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <span className="text-xs font-medium text-muted-foreground">
                  Step {currentStep + 1} of {walkthroughSteps.length}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={handleClose}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-muted-foreground mb-6">{step.description}</p>

            {/* Progress dots */}
            <div className="flex justify-center gap-1.5 mb-4">
              {walkthroughSteps.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 rounded-full transition-all ${
                    index === currentStep
                      ? 'w-6 bg-emerald-500'
                      : index < currentStep
                      ? 'w-2 bg-emerald-300'
                      : 'w-2 bg-muted'
                  }`}
                  onClick={() => setCurrentStep(index)}
                />
              ))}
            </div>

            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSkip}
                className="text-muted-foreground"
              >
                Skip Tour
              </Button>

              <div className="flex gap-2">
                {!isFirstStep && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePrev}
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Back
                  </Button>
                )}
                <Button
                  size="sm"
                  onClick={handleNext}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  {isLastStep ? 'Get Started' : 'Next'}
                  {!isLastStep && <ChevronRight className="h-4 w-4 ml-1" />}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
