import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { X, ChevronRight, ChevronLeft, Sparkles, MapPin, Volume2, VolumeX, Timer, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useDemoMode } from '@/contexts/DemoModeContext';
import { TourStep, OnboardingTemplate, ONBOARDING_TEMPLATES } from '@/data/demoOnboardingTemplates';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { VoiceSelector, VoiceOption } from '@/components/demo/VoiceSelector';
import { DemoCompletionCertificate } from '@/components/demo/DemoCompletionCertificate';

// Default walkthrough steps (legacy support)
const defaultWalkthroughSteps: TourStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Demo Mode!',
    description: 'Explore Sacred Greeks with sample data. This walkthrough will guide you through the key features.',
    route: '/',
    position: 'center',
  },
  {
    id: 'dashboard',
    title: 'Your Dashboard',
    description: 'Access your personalized dashboard with daily devotionals, prayer journal, and progress tracking. This is your central hub for spiritual growth.',
    route: '/dashboard',
    position: 'top',
  },
  {
    id: 'devotional',
    title: 'Daily Devotional',
    description: 'Start each day with scripture and reflection. Build your streak by completing devotionals! Each devotional includes scripture, reflection prompts, and prayer guides.',
    route: '/devotional',
    position: 'center',
  },
  {
    id: 'prayer-journal',
    title: 'Prayer Journal',
    description: 'Keep track of your prayers and mark them as answered. A private space for your spiritual journey. Record requests, thanksgiving, confessions, and praises.',
    route: '/prayer-journal',
    position: 'center',
  },
  {
    id: 'prayer-wall',
    title: 'Community Prayer Wall',
    description: 'Share prayer requests with your community and support others in their faith journey. Pray for your brothers and sisters and receive encouragement.',
    route: '/prayer-wall',
    position: 'center',
  },
  {
    id: 'achievements',
    title: 'Achievements & Progress',
    description: 'Earn badges, track streaks, and level up as you grow in your faith journey. Celebrate milestones and stay motivated on your spiritual path.',
    route: '/achievements',
    position: 'center',
  },
  {
    id: 'complete',
    title: 'You\'re Ready!',
    description: 'Start exploring all the features! When you\'re done with demo mode, click "Exit" in the banner to return to normal mode and sign up for your own account.',
    route: '/dashboard',
    position: 'center',
  },
];

interface DemoWalkthroughOverlayProps {
  customTemplate?: OnboardingTemplate | null;
}

export function DemoWalkthroughOverlay({ customTemplate }: DemoWalkthroughOverlayProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDemoMode, hasSeenTour, setHasSeenTour, currentScenario, markTemplateCompleted } = useDemoMode();
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [autoAdvance, setAutoAdvance] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const [autoAdvanceTimer, setAutoAdvanceTimer] = useState<number>(8);
  const [selectedVoice, setSelectedVoice] = useState<VoiceOption>('alloy');
  const [showCertificate, setShowCertificate] = useState(false);
  const [completionDate, setCompletionDate] = useState<Date | null>(null);

  // Determine which steps to use
  const walkthroughSteps = customTemplate?.tourSteps || defaultWalkthroughSteps;
  const activeTemplate = customTemplate || ONBOARDING_TEMPLATES.find(t => t.scenario === currentScenario) || ONBOARDING_TEMPLATES[0];

  useEffect(() => {
    if (isDemoMode && !hasSeenTour) {
      setIsVisible(true);
      setCurrentStep(0);
    }
  }, [isDemoMode, hasSeenTour]);

  // Navigate to the step's route when step changes
  useEffect(() => {
    if (isVisible && walkthroughSteps[currentStep]) {
      const step = walkthroughSteps[currentStep];
      if (step.route && location.pathname !== step.route) {
        setIsNavigating(true);
        navigate(step.route);
        // Allow time for navigation
        setTimeout(() => setIsNavigating(false), 500);
      }
    }
  }, [currentStep, isVisible, walkthroughSteps, navigate, location.pathname]);

  // Auto-advance timer
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    
    if (autoAdvance && isVisible && !isNavigating) {
      timer = setTimeout(() => {
        if (currentStep < walkthroughSteps.length - 1) {
          setCurrentStep(prev => prev + 1);
        } else {
          setAutoAdvance(false);
        }
      }, autoAdvanceTimer * 1000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [autoAdvance, isVisible, currentStep, isNavigating, walkthroughSteps.length, autoAdvanceTimer]);

  // Stop audio when step changes or component unmounts
  useEffect(() => {
    return () => {
      if (audioElement) {
        audioElement.pause();
        setAudioElement(null);
        setIsSpeaking(false);
      }
    };
  }, [currentStep]);

  const speakDescription = useCallback(async () => {
    const step = walkthroughSteps[currentStep];
    if (!step) return;

    // Stop any existing audio
    if (audioElement) {
      audioElement.pause();
      setAudioElement(null);
    }

    setIsSpeaking(true);

    try {
      const { data, error } = await supabase.functions.invoke('text-to-speech', {
        body: {
          text: `${step.title}. ${step.description}`,
          voice: selectedVoice,
        },
      });

      if (error) throw error;

      if (data?.audioContent) {
        const audio = new Audio(`data:audio/mp3;base64,${data.audioContent}`);
        setAudioElement(audio);
        
        audio.onended = () => {
          setIsSpeaking(false);
          setAudioElement(null);
        };

        audio.onerror = () => {
          setIsSpeaking(false);
          setAudioElement(null);
          toast.error('Audio playback failed');
        };

        await audio.play();
      }
    } catch (error) {
      console.error('Text-to-speech error:', error);
      setIsSpeaking(false);
      toast.error('Unable to play audio narration');
    }
  }, [currentStep, walkthroughSteps, audioElement, selectedVoice]);

  const stopSpeaking = useCallback(() => {
    if (audioElement) {
      audioElement.pause();
      setAudioElement(null);
      setIsSpeaking(false);
    }
  }, [audioElement]);

  // Show certificate if tour is completed
  if (showCertificate && completionDate) {
    return (
      <DemoCompletionCertificate
        template={activeTemplate}
        persona={null}
        completedAt={completionDate}
        onClose={() => setShowCertificate(false)}
      />
    );
  }

  if (!isVisible) return null;

  const step = walkthroughSteps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === walkthroughSteps.length - 1;

  const handleNext = () => {
    stopSpeaking();
    if (isLastStep) {
      handleClose();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    stopSpeaking();
    if (!isFirstStep) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleClose = () => {
    stopSpeaking();
    setAutoAdvance(false);
    setIsVisible(false);
    setHasSeenTour(true);
    // If this was the last step, mark template as completed and show certificate
    if (currentStep === walkthroughSteps.length - 1) {
      markTemplateCompleted(activeTemplate);
      setCompletionDate(new Date());
      setShowCertificate(true);
    }
  };

  const handleSkip = () => {
    stopSpeaking();
    setAutoAdvance(false);
    setIsVisible(false);
    setHasSeenTour(true);
  };

  const handleGoToStep = (index: number) => {
    stopSpeaking();
    setCurrentStep(index);
  };

  const toggleAutoAdvance = () => {
    setAutoAdvance(!autoAdvance);
    if (!autoAdvance) {
      toast.info('Auto-advance enabled - tour will progress automatically');
    }
  };

  const positionClasses = {
    center: 'items-center justify-center',
    top: 'items-start justify-center pt-24',
    bottom: 'items-end justify-center pb-24',
    left: 'items-center justify-start pl-8',
    right: 'items-center justify-end pr-8',
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/30 backdrop-blur-[2px] flex animate-fade-in">
      <div className={`flex w-full ${positionClasses[step.position]}`}>
        <Card className="max-w-md mx-4 shadow-2xl border-2 border-emerald-200 dark:border-emerald-800 animate-scale-in bg-card/95 backdrop-blur-sm">
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
            <p className="text-muted-foreground mb-4">{step.description}</p>

            {/* Listen button and voice selector */}
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Button
                variant="outline"
                size="sm"
                onClick={isSpeaking ? stopSpeaking : speakDescription}
                className="flex items-center gap-2"
              >
                {isSpeaking ? (
                  <>
                    <VolumeX className="h-4 w-4" />
                    Stop
                  </>
                ) : (
                  <>
                    <Volume2 className="h-4 w-4" />
                    Listen
                  </>
                )}
              </Button>
              
              {/* Voice selector */}
              <VoiceSelector 
                selectedVoice={selectedVoice}
                onVoiceChange={setSelectedVoice}
              />
              
              {/* Auto-advance toggle */}
              <div className="flex items-center gap-2 ml-auto">
                <Switch
                  id="auto-advance"
                  checked={autoAdvance}
                  onCheckedChange={toggleAutoAdvance}
                />
                <Label htmlFor="auto-advance" className="text-xs flex items-center gap-1 cursor-pointer">
                  <Timer className="h-3 w-3" />
                  Auto
                </Label>
              </div>
            </div>

            {/* Current route indicator */}
            <div className="flex items-center gap-2 mb-4 p-2 bg-muted/50 rounded-lg">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {isNavigating ? 'Navigating...' : `Currently at: ${step.route}`}
              </span>
              <Badge variant="outline" className="ml-auto text-[10px]">
                {step.route}
              </Badge>
            </div>

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
                  onClick={() => handleGoToStep(index)}
                  title={walkthroughSteps[index].title}
                />
              ))}
            </div>

            {/* Auto-advance progress bar */}
            {autoAdvance && !isLastStep && (
              <div className="mb-4">
                <div className="h-1 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 transition-all ease-linear"
                    style={{
                      width: '100%',
                      animation: `shrink ${autoAdvanceTimer}s linear forwards`,
                    }}
                  />
                </div>
                <p className="text-[10px] text-center text-muted-foreground mt-1">
                  Auto-advancing in {autoAdvanceTimer}s
                </p>
              </div>
            )}

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
                    disabled={isNavigating}
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Back
                  </Button>
                )}
                <Button
                  size="sm"
                  onClick={handleNext}
                  disabled={isNavigating}
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

      <style>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
}
