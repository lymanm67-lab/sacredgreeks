import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useDemoMode } from '@/contexts/DemoModeContext';
import { FlaskConical, BookOpen, Heart, Users, Trophy, TrendingUp, ChevronRight, ChevronLeft, Check, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

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
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dim backdrop - creates spotlight effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[100]"
            onClick={handleSkip}
          />
          
          {/* Tour Card - positioned at bottom for visibility */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-1/2 bottom-4 -translate-x-1/2 z-[101] w-full max-w-md px-4"
          >
            <Card className="border-2 border-primary/30 shadow-2xl bg-card/95 backdrop-blur-md overflow-hidden">
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
                      className={`w-2 h-2 rounded-full transition-all ${
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
        </>
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
