import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { X, ChevronRight, ChevronLeft, Sparkles, MapPin, Volume2, VolumeX, Timer, GripVertical, Minimize2, Maximize2 } from 'lucide-react';
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

interface Position {
  x: number;
  y: number;
}

function DemoWalkthroughOverlayInner({ customTemplate }: DemoWalkthroughOverlayProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDemoMode, hasSeenTour, setHasSeenTour, currentScenario, markTemplateCompleted } = useDemoMode();
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [autoAdvance, setAutoAdvance] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const [autoAdvanceTimer] = useState<number>(8);
  const [selectedVoice, setSelectedVoice] = useState<VoiceOption>('alloy');
  const [showCertificate, setShowCertificate] = useState(false);
  const [completionDate, setCompletionDate] = useState<Date | null>(null);
  
  // Dragging state
  const [isMinimized, setIsMinimized] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);
  const dragStartPos = useRef<Position>({ x: 0, y: 0 });
  const cardStartPos = useRef<Position>({ x: 0, y: 0 });

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
        setTimeout(() => setIsNavigating(false), 500);
      }
    }
  }, [currentStep, isVisible, walkthroughSteps, navigate, location.pathname]);

  // Auto-advance timer
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    
    if (autoAdvance && isVisible && !isNavigating && !isMinimized) {
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
  }, [autoAdvance, isVisible, currentStep, isNavigating, walkthroughSteps.length, autoAdvanceTimer, isMinimized]);

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

  // Dragging handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    setIsDragging(true);
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    cardStartPos.current = { ...position };
  }, [position]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - dragStartPos.current.x;
    const deltaY = e.clientY - dragStartPos.current.y;
    
    const newX = Math.max(0, Math.min(window.innerWidth - 100, cardStartPos.current.x + deltaX));
    const newY = Math.max(0, Math.min(window.innerHeight - 100, cardStartPos.current.y + deltaY));
    
    setPosition({ x: newX, y: newY });
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const speakDescription = useCallback(async () => {
    const step = walkthroughSteps[currentStep];
    if (!step) return;

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

  // Minimized view
  if (isMinimized) {
    return (
      <div
        ref={dragRef}
        className="fixed z-[100] cursor-move select-none"
        style={{ left: position.x, top: position.y }}
        onMouseDown={handleMouseDown}
      >
        <Card className="shadow-lg border-2 border-emerald-200 dark:border-emerald-800 bg-card">
          <CardContent className="p-3 flex items-center gap-3">
            <GripVertical className="h-4 w-4 text-muted-foreground" />
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-emerald-600" />
              <span className="text-sm font-medium">Tour: Step {currentStep + 1}/{walkthroughSteps.length}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0"
              onClick={() => setIsMinimized(false)}
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0"
              onClick={handleSkip}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div
      ref={dragRef}
      className="fixed z-[100] select-none"
      style={{ 
        left: position.x, 
        top: position.y,
        cursor: isDragging ? 'grabbing' : 'default',
      }}
    >
      <Card 
        className="w-[360px] max-w-[calc(100vw-40px)] shadow-2xl border-2 border-emerald-200 dark:border-emerald-800 animate-scale-in bg-card"
      >
        <CardContent className="p-4">
          {/* Drag handle header */}
          <div 
            className="flex items-start justify-between mb-3 cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
          >
            <div className="flex items-center gap-2">
              <GripVertical className="h-4 w-4 text-muted-foreground" />
              <div className="p-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900">
                <Sparkles className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <span className="text-xs font-medium text-muted-foreground">
                Step {currentStep + 1} of {walkthroughSteps.length}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0"
                onClick={() => setIsMinimized(true)}
                title="Minimize"
              >
                <Minimize2 className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0"
                onClick={handleClose}
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>

          <h3 className="text-lg font-semibold mb-1.5">{step.title}</h3>
          <p className="text-sm text-muted-foreground mb-3">{step.description}</p>

          {/* Listen button and voice selector */}
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              onClick={isSpeaking ? stopSpeaking : speakDescription}
              className="flex items-center gap-1.5 h-8 text-xs"
            >
              {isSpeaking ? (
                <>
                  <VolumeX className="h-3.5 w-3.5" />
                  Stop
                </>
              ) : (
                <>
                  <Volume2 className="h-3.5 w-3.5" />
                  Listen
                </>
              )}
            </Button>
            
            <VoiceSelector 
              selectedVoice={selectedVoice}
              onVoiceChange={setSelectedVoice}
            />
            
            {/* Auto-advance toggle */}
            <div className="flex items-center gap-1.5 ml-auto">
              <Switch
                id="auto-advance"
                checked={autoAdvance}
                onCheckedChange={toggleAutoAdvance}
                className="scale-90"
              />
              <Label htmlFor="auto-advance" className="text-xs flex items-center gap-1 cursor-pointer">
                <Timer className="h-3 w-3" />
                Auto
              </Label>
            </div>
          </div>

          {/* Current route indicator */}
          <div className="flex items-center gap-2 mb-3 p-2 bg-muted/50 rounded-lg">
            <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {isNavigating ? 'Navigating...' : `Currently at: ${step.route}`}
            </span>
            <Badge variant="outline" className="ml-auto text-[10px] h-5">
              {step.route}
            </Badge>
          </div>

          {/* Progress dots */}
          <div className="flex justify-center gap-1 mb-3">
            {walkthroughSteps.map((_, index) => (
              <button
                key={index}
                className={`h-1.5 rounded-full transition-all ${
                  index === currentStep
                    ? 'w-5 bg-emerald-500'
                    : index < currentStep
                    ? 'w-1.5 bg-emerald-300'
                    : 'w-1.5 bg-muted'
                }`}
                onClick={() => handleGoToStep(index)}
                title={walkthroughSteps[index].title}
              />
            ))}
          </div>

          {/* Auto-advance progress bar */}
          {autoAdvance && !isLastStep && (
            <div className="mb-3">
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
              className="text-muted-foreground text-xs h-8"
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
                  className="h-8 text-xs"
                >
                  <ChevronLeft className="h-3.5 w-3.5 mr-0.5" />
                  Back
                </Button>
              )}
              <Button
                size="sm"
                onClick={handleNext}
                disabled={isNavigating}
                className="bg-emerald-600 hover:bg-emerald-700 h-8 text-xs"
              >
                {isLastStep ? 'Get Started' : 'Next'}
                {!isLastStep && <ChevronRight className="h-3.5 w-3.5 ml-0.5" />}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <style>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
}

// Exported wrapper with error handling for HMR stability
export function DemoWalkthroughOverlay(props: DemoWalkthroughOverlayProps) {
  return <DemoWalkthroughOverlayInner {...props} />;
}
