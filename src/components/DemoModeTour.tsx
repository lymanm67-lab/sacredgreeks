import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useDemoMode } from '@/contexts/DemoModeContext';
import { FlaskConical, BookOpen, Heart, Users, Trophy, TrendingUp, ChevronRight, ChevronLeft, Check, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TourStep {
  title: string;
  description: string;
  icon: React.ReactNode;
  feature: string;
  route?: string;
}

const TOUR_STEPS: TourStep[] = [
  {
    title: 'Welcome to Demo Mode',
    description: 'Demo mode shows you sample data across the app, so you can explore all features without needing to create your own content first.',
    icon: <FlaskConical className="w-8 h-8 text-sacred" />,
    feature: 'overview',
  },
  {
    title: 'Daily Devotionals',
    description: 'Experience daily spiritual readings with scripture, reflections, and applications. Demo mode shows a complete devotional experience.',
    icon: <BookOpen className="w-8 h-8 text-blue-500" />,
    feature: 'devotional',
    route: '/devotional',
  },
  {
    title: 'Prayer Wall & Journal',
    description: 'See sample prayer requests and journal entries. Learn how to track your prayers and support others in the community.',
    icon: <Heart className="w-8 h-8 text-red-500" />,
    feature: 'prayerWall',
    route: '/prayer-wall',
  },
  {
    title: 'Community Forum',
    description: 'Explore discussion topics and see how members engage with each other. Demo discussions showcase different categories.',
    icon: <Users className="w-8 h-8 text-green-500" />,
    feature: 'forum',
    route: '/forum',
  },
  {
    title: 'Achievements & Progress',
    description: 'Track your spiritual growth with gamification. Demo mode shows sample achievements and progress statistics.',
    icon: <Trophy className="w-8 h-8 text-yellow-500" />,
    feature: 'achievements',
    route: '/achievements',
  },
  {
    title: 'Customize Your Experience',
    description: 'You can toggle individual demo features on/off in your Profile settings. Choose what sample data you want to see!',
    icon: <Sparkles className="w-8 h-8 text-purple-500" />,
    feature: 'customize',
    route: '/profile',
  },
];

export function DemoModeTour() {
  const { isDemoMode, hasSeenTour, setHasSeenTour } = useDemoMode();
  const [currentStep, setCurrentStep] = useState(0);
  const [isOpen, setIsOpen] = useState(!hasSeenTour && isDemoMode);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    setHasSeenTour(true);
    setIsOpen(false);
  };

  const handleSkip = () => {
    setHasSeenTour(true);
    setIsOpen(false);
  };

  const handleExplore = () => {
    const route = TOUR_STEPS[currentStep].route;
    if (route) {
      setHasSeenTour(true);
      setIsOpen(false);
      navigate(route);
    }
  };

  // Don't show if demo mode is off or tour has been seen
  if (!isDemoMode || hasSeenTour) {
    return null;
  }

  const currentTourStep = TOUR_STEPS[currentStep];
  const isLastStep = currentStep === TOUR_STEPS.length - 1;
  const isFirstStep = currentStep === 0;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            {currentTourStep.icon}
            <DialogTitle>{currentTourStep.title}</DialogTitle>
          </div>
          <DialogDescription className="text-base">
            {currentTourStep.description}
          </DialogDescription>
        </DialogHeader>

        {/* Progress indicators */}
        <div className="flex justify-center gap-1.5 py-4">
          {TOUR_STEPS.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-all ${
                index === currentStep 
                  ? 'w-6 bg-sacred' 
                  : index < currentStep 
                    ? 'w-1.5 bg-sacred/50' 
                    : 'w-1.5 bg-muted'
              }`}
            />
          ))}
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="ghost" size="sm" onClick={handleSkip} className="sm:mr-auto">
            Skip Tour
          </Button>
          
          <div className="flex gap-2">
            {!isFirstStep && (
              <Button variant="outline" size="sm" onClick={handlePrevious}>
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
            )}
            
            {currentTourStep.route && !isLastStep && (
              <Button variant="outline" size="sm" onClick={handleExplore}>
                Explore
              </Button>
            )}
            
            {isLastStep ? (
              <Button onClick={handleComplete} className="bg-sacred hover:bg-sacred/90">
                <Check className="w-4 h-4 mr-1" />
                Get Started
              </Button>
            ) : (
              <Button onClick={handleNext} className="bg-sacred hover:bg-sacred/90">
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Trigger button to restart tour
export function RestartDemoTourButton() {
  const { isDemoMode, setHasSeenTour } = useDemoMode();
  
  if (!isDemoMode) return null;

  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={() => setHasSeenTour(false)}
      className="gap-2"
    >
      <FlaskConical className="w-4 h-4" />
      Restart Demo Tour
    </Button>
  );
}
