import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useDemoMode } from '@/contexts/DemoModeContext';
import { FlaskConical, BookOpen, Heart, Users, Trophy, Sparkles, ChevronRight, ChevronLeft, Check, Library, Calendar, ChevronUp } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface TourStep {
  title: string;
  description: string;
  icon: React.ReactNode;
  feature: string;
  route?: string;
  targetSelector?: string; // Selector for highlighting dashboard elements
}

const TOUR_STEPS: TourStep[] = [
  {
    title: 'Welcome to Demo Mode',
    description: 'Demo mode shows you sample data across the app. Let me show you the key features on your dashboard!',
    icon: <FlaskConical className="w-8 h-8 text-primary" />,
    feature: 'overview',
  },
  {
    title: 'Daily Devotionals',
    description: 'Start each day with scripture-based devotionals designed for Greeks navigating faith. Tap the highlighted card to explore!',
    icon: <BookOpen className="w-8 h-8 text-blue-500" />,
    feature: 'devotional',
    route: '/devotional',
    targetSelector: '[data-tour="devotional"]',
  },
  {
    title: 'Myth Buster Library',
    description: 'Get biblical answers to common objections about Greek life and faith compatibility.',
    icon: <Library className="w-8 h-8 text-purple-500" />,
    feature: 'mythbuster',
    route: '/myth-buster',
    targetSelector: '[data-tour="mythbuster"]',
  },
  {
    title: '30-Day Journey',
    description: 'A structured program to build your faith foundation while integrating your Greek identity.',
    icon: <Calendar className="w-8 h-8 text-amber-500" />,
    feature: 'journey',
    route: '/journey',
    targetSelector: '[data-tour="journey"]',
  },
  {
    title: 'Prayer Wall & Journal',
    description: 'See sample prayer requests and journal entries. Track your prayers and support others in the community.',
    icon: <Heart className="w-8 h-8 text-red-500" />,
    feature: 'prayerWall',
    route: '/prayer-wall',
  },
  {
    title: 'Community Forum',
    description: 'Explore discussion topics and see how members engage with each other.',
    icon: <Users className="w-8 h-8 text-green-500" />,
    feature: 'forum',
    route: '/forum',
  },
  {
    title: 'Achievements & Progress',
    description: 'Track your spiritual growth with gamification. Demo mode shows sample achievements and progress.',
    icon: <Trophy className="w-8 h-8 text-yellow-500" />,
    feature: 'achievements',
    route: '/achievements',
  },
  {
    title: 'You\'re All Set!',
    description: 'Explore at your own pace. You can toggle demo features on/off in your Profile settings anytime.',
    icon: <Sparkles className="w-8 h-8 text-primary" />,
    feature: 'customize',
    route: '/profile',
  },
];

export function DemoModeTour() {
  const { isDemoMode, hasSeenTour, setHasSeenTour } = useDemoMode();
  const [currentStep, setCurrentStep] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Sync isOpen with hasSeenTour - when hasSeenTour becomes false, open the tour
  useEffect(() => {
    if (isDemoMode && !hasSeenTour) {
      setIsOpen(true);
      setCurrentStep(0); // Reset to first step when reopening
    } else {
      setIsOpen(false);
    }
  }, [isDemoMode, hasSeenTour]);

  const currentTourStep = TOUR_STEPS[currentStep];
  const isOnDashboard = location.pathname === '/dashboard';

  // Add/remove highlight class on target elements and scroll into view
  useEffect(() => {
    if (!isOpen) return;
    
    const targetSelector = currentTourStep?.targetSelector;
    if (!targetSelector || !isOnDashboard) return;

    const targetEl = document.querySelector(targetSelector);
    if (targetEl) {
      targetEl.classList.add('tour-highlight');
      // Scroll element into view with smooth animation
      targetEl.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center',
        inline: 'nearest'
      });
      return () => {
        targetEl.classList.remove('tour-highlight');
      };
    }
  }, [currentStep, isOpen, currentTourStep?.targetSelector, isOnDashboard]);

  // Clean up highlights when tour closes
  useEffect(() => {
    if (!isOpen) {
      document.querySelectorAll('.tour-highlight').forEach(el => {
        el.classList.remove('tour-highlight');
      });
    }
  }, [isOpen]);

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

  const isLastStep = currentStep === TOUR_STEPS.length - 1;
  const isFirstStep = currentStep === 0;
  const hasTarget = !!currentTourStep.targetSelector && isOnDashboard;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed left-1/2 bottom-4 -translate-x-1/2 z-50 w-full max-w-md px-4 pointer-events-none"
        >
          {/* Pointer arrow - only show when there's a target element */}
          {hasTarget && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center mb-2"
            >
              <div className="flex flex-col items-center text-primary">
                <ChevronUp className="w-6 h-6 animate-bounce" />
                <div className="w-0.5 h-8 bg-gradient-to-b from-primary to-transparent" />
              </div>
            </motion.div>
          )}
          
          <Card className="border-2 border-primary/30 shadow-2xl bg-card/95 backdrop-blur-md overflow-hidden pointer-events-auto">
            {/* Progress bar */}
            <div className="h-1 bg-muted w-full">
              <motion.div 
                className="h-full bg-gradient-to-r from-primary to-accent"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / TOUR_STEPS.length) * 100}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </div>
            
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
                  <Check className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center gap-3 mb-2">
                {currentTourStep.icon}
                <h3 className="text-xl font-bold text-foreground">{currentTourStep.title}</h3>
              </div>
              <p className="text-muted-foreground mb-6">{currentTourStep.description}</p>

              {/* Progress dots */}
              <div className="flex items-center justify-center gap-2 mb-6">
                {TOUR_STEPS.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 rounded-full transition-all ${
                      index === currentStep
                        ? 'w-6 bg-primary'
                        : index < currentStep
                        ? 'w-2 bg-primary/50'
                        : 'w-2 bg-muted'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center justify-between gap-2">
                {!isFirstStep && (
                  <Button variant="outline" size="sm" onClick={handlePrevious}>
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Back
                  </Button>
                )}
                
                {isFirstStep && (
                  <Button variant="ghost" size="sm" onClick={handleSkip} className="text-muted-foreground">
                    Skip tour
                  </Button>
                )}
                
                <div className="flex gap-2 ml-auto">
                  {currentTourStep.route && !isLastStep && (
                    <Button variant="outline" size="sm" onClick={handleExplore}>
                      Explore
                    </Button>
                  )}
                  
                  {isLastStep ? (
                    <Button onClick={handleComplete} className="bg-primary hover:bg-primary/90">
                      <Check className="w-4 h-4 mr-1" />
                      Get Started
                    </Button>
                  ) : (
                    <Button onClick={handleNext} className="bg-primary hover:bg-primary/90">
                      Next
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
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
