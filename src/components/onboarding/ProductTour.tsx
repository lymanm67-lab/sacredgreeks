import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  BookOpen, 
  Target, 
  Trophy, 
  Heart,
  Lightbulb,
  CheckCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";

interface TourStep {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  targetSelector?: string;
  position?: "top" | "bottom" | "left" | "right" | "center";
  highlight?: boolean;
}

const tourSteps: TourStep[] = [
  {
    id: "welcome",
    title: "Welcome to Sacred Greeks! 🎉",
    description: "You've taken the first step toward clarity. Let's show you how to make the most of your journey here.",
    icon: Sparkles,
    position: "center"
  },
  {
    id: "devotionals",
    title: "Daily Devotionals",
    description: "Start each day with scripture and reflection tailored for Christians in Greek life. Build your spiritual foundation one day at a time.",
    icon: BookOpen,
    targetSelector: "[data-tour='devotional']",
    position: "right"
  },
  {
    id: "proof",
    title: "P.R.O.O.F. Framework",
    description: "Our core biblical evaluation tool. Use it to assess any practice, ritual, or tradition through a faith-based lens.",
    icon: Target,
    targetSelector: "[data-tour='proof']",
    position: "right"
  },
  {
    id: "training",
    title: "Training Courses",
    description: "Dive deep into topics like Greek history, symbols, and leadership. Each course awards points toward achievements.",
    icon: Lightbulb,
    targetSelector: "[data-tour='training']",
    position: "right"
  },
  {
    id: "achievements",
    title: "Earn Achievements",
    description: "Track your progress and earn badges as you grow. Complete courses and challenges to unlock rewards!",
    icon: Trophy,
    targetSelector: "[data-tour='achievements']",
    position: "right"
  },
  {
    id: "community",
    title: "Prayer Community",
    description: "You're not alone. Share prayer requests, support others, and grow together in faith.",
    icon: Heart,
    targetSelector: "[data-tour='prayer']",
    position: "right"
  },
  {
    id: "complete",
    title: "You're All Set! ✨",
    description: "Start with today's devotional or take the Faith Snapshot assessment to get personalized recommendations.",
    icon: CheckCircle,
    position: "center"
  }
];

interface ProductTourProps {
  onComplete: () => void;
  onSkip: () => void;
}

export function ProductTour({ onComplete, onSkip }: ProductTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const step = tourSteps[currentStep];
  const progress = ((currentStep + 1) / tourSteps.length) * 100;

  useEffect(() => {
    // Highlight target element if specified
    if (step.targetSelector) {
      const element = document.querySelector(step.targetSelector);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        element.classList.add("tour-highlight");
        return () => element.classList.remove("tour-highlight");
      }
    }
  }, [step.targetSelector]);

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    setIsVisible(false);
    localStorage.setItem("product-tour-completed", "true");
    onComplete();
  };

  const handleSkip = () => {
    setIsVisible(false);
    localStorage.setItem("product-tour-completed", "true");
    onSkip();
  };

  if (!isVisible) return null;

  const Icon = step.icon;

  const content = (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleSkip}
      />
      
      {/* Tour Card */}
      <Card className={cn(
        "relative z-10 w-full max-w-md mx-4 bg-slate-900 border-slate-700 shadow-2xl",
        "animate-in fade-in slide-in-from-bottom-4 duration-300"
      )}>
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <Badge variant="outline" className="bg-sacred/10 text-sacred border-sacred/30">
              Step {currentStep + 1} of {tourSteps.length}
            </Badge>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-400 hover:text-white"
              onClick={handleSkip}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Progress */}
          <Progress value={progress} className="h-1 mb-6" />

          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-sacred/20 flex items-center justify-center">
              <Icon className="w-8 h-8 text-sacred" />
            </div>
          </div>

          {/* Content */}
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
            <p className="text-slate-400 leading-relaxed">{step.description}</p>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between gap-3">
            <Button
              variant="ghost"
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="text-slate-400"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back
            </Button>

            <div className="flex gap-1">
              {tourSteps.map((_, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    idx === currentStep ? "bg-sacred w-4" : "bg-slate-600"
                  )}
                />
              ))}
            </div>

            <Button
              onClick={handleNext}
              className="bg-sacred hover:bg-sacred/90"
            >
              {currentStep === tourSteps.length - 1 ? "Get Started" : "Next"}
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          {/* Skip link */}
          {currentStep < tourSteps.length - 1 && (
            <button
              onClick={handleSkip}
              className="w-full text-center text-sm text-slate-500 hover:text-slate-400 mt-4"
            >
              Skip tour
            </button>
          )}
        </CardContent>
      </Card>
    </div>
  );

  return createPortal(content, document.body);
}

// Hook to manage tour state
export function useProductTour() {
  const [showTour, setShowTour] = useState(false);

  useEffect(() => {
    // Check if tour has been completed
    const completed = localStorage.getItem("product-tour-completed");
    const isNewUser = !completed;
    
    // Show tour for new users after a brief delay
    if (isNewUser) {
      const timer = setTimeout(() => setShowTour(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const startTour = () => setShowTour(true);
  const completeTour = () => setShowTour(false);
  const skipTour = () => setShowTour(false);
  const resetTour = () => {
    localStorage.removeItem("product-tour-completed");
    setShowTour(true);
  };

  return { showTour, startTour, completeTour, skipTour, resetTour };
}
