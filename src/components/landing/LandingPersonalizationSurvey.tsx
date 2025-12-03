import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  GraduationCap, 
  Church, 
  HelpCircle,
  Heart,
  BookOpen,
  Shield,
  Sparkles,
  MessageSquare,
  Calendar,
  Eye,
  HeartHandshake,
  Check,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { SurveyAnswers } from '@/hooks/use-landing-survey';

interface LandingPersonalizationSurveyProps {
  open: boolean;
  onComplete: (answers: SurveyAnswers) => void;
  onSkip: () => void;
}

const journeyOptions = [
  {
    value: 'considering',
    label: 'Considering joining',
    description: 'Exploring if Greek life is right for me',
    icon: HelpCircle,
  },
  {
    value: 'member',
    label: 'Current member',
    description: 'Active in my chapter',
    icon: Users,
  },
  {
    value: 'alumni',
    label: 'Alumni/Graduate',
    description: 'Graduated but still connected',
    icon: GraduationCap,
  },
  {
    value: 'pastor',
    label: 'Pastor/Ministry leader',
    description: 'Seeking to understand and support',
    icon: Church,
  },
];

const challengeOptions = [
  {
    value: 'disapproval',
    label: 'Family or church disapproval',
    description: 'Facing pushback from loved ones',
    icon: Heart,
  },
  {
    value: 'torn',
    label: 'Feeling torn',
    description: 'Struggling between faith and letters',
    icon: Shield,
  },
  {
    value: 'responses',
    label: 'Need biblical responses',
    description: 'Want answers to tough questions',
    icon: BookOpen,
  },
  {
    value: 'growth',
    label: 'Spiritual growth',
    description: 'Want to deepen my faith journey',
    icon: Sparkles,
  },
];

const helpOptions = [
  {
    value: 'quick-answers',
    label: 'Quick answers to criticism',
    description: 'Myth Buster & Objection Practice',
    icon: MessageSquare,
  },
  {
    value: 'daily-guidance',
    label: 'Daily spiritual guidance',
    description: 'Devotionals & 30-Day Journey',
    icon: Calendar,
  },
  {
    value: 'symbols',
    label: 'Understanding symbols & rituals',
    description: 'Symbol Guide & Context',
    icon: Eye,
  },
  {
    value: 'healing',
    label: 'Processing hurt or conflict',
    description: 'Healing Resources & Support',
    icon: HeartHandshake,
  },
];

export function LandingPersonalizationSurvey({ open, onComplete, onSkip }: LandingPersonalizationSurveyProps) {
  const [step, setStep] = useState(1);
  const [journey, setJourney] = useState('');
  const [challenge, setChallenge] = useState('');
  const [helpNeeded, setHelpNeeded] = useState<string[]>([]);

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete({ journey, challenge, helpNeeded });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const toggleHelpOption = (value: string) => {
    setHelpNeeded(prev => 
      prev.includes(value) 
        ? prev.filter(v => v !== value)
        : [...prev, value]
    );
  };

  const canProceed = () => {
    switch (step) {
      case 1: return !!journey;
      case 2: return !!challenge;
      case 3: return helpNeeded.length > 0;
      default: return false;
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto" hideCloseButton>
        <DialogHeader className="space-y-3">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="text-xs">
              Question {step} of {totalSteps}
            </Badge>
            <Button variant="ghost" size="sm" onClick={onSkip} className="text-muted-foreground hover:text-foreground">
              Skip for now
            </Button>
          </div>
          <DialogTitle className="text-2xl bg-gradient-to-r from-sacred to-sacred/70 bg-clip-text text-transparent">
            Personalize Your Experience
          </DialogTitle>
        </DialogHeader>

        <Progress value={progress} className="w-full h-2" />

        <div className="py-4 space-y-4">
          {step === 1 && (
            <div className="space-y-4">
              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold">Where are you in your Greek life journey?</h3>
                <p className="text-sm text-muted-foreground">This helps us personalize your experience</p>
              </div>
              <div className="grid gap-3">
                {journeyOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setJourney(option.value)}
                    className={cn(
                      "flex items-start gap-4 p-4 rounded-xl border-2 transition-all duration-200 text-left",
                      journey === option.value
                        ? "border-sacred bg-sacred/5 shadow-md shadow-sacred/10"
                        : "border-border hover:border-sacred/50 hover:bg-muted/50"
                    )}
                  >
                    <div className={cn(
                      "p-2 rounded-lg transition-colors",
                      journey === option.value ? "bg-sacred text-white" : "bg-muted text-muted-foreground"
                    )}>
                      <option.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{option.label}</span>
                        {journey === option.value && (
                          <Check className="w-4 h-4 text-sacred" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-0.5">{option.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold">What's your biggest challenge right now?</h3>
                <p className="text-sm text-muted-foreground">We'll prioritize resources that address this</p>
              </div>
              <div className="grid gap-3">
                {challengeOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setChallenge(option.value)}
                    className={cn(
                      "flex items-start gap-4 p-4 rounded-xl border-2 transition-all duration-200 text-left",
                      challenge === option.value
                        ? "border-sacred bg-sacred/5 shadow-md shadow-sacred/10"
                        : "border-border hover:border-sacred/50 hover:bg-muted/50"
                    )}
                  >
                    <div className={cn(
                      "p-2 rounded-lg transition-colors",
                      challenge === option.value ? "bg-sacred text-white" : "bg-muted text-muted-foreground"
                    )}>
                      <option.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{option.label}</span>
                        {challenge === option.value && (
                          <Check className="w-4 h-4 text-sacred" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-0.5">{option.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold">What would help you most today?</h3>
                <p className="text-sm text-muted-foreground">Select all that apply - we'll create your personalized dashboard</p>
              </div>
              <div className="grid gap-3">
                {helpOptions.map((option) => {
                  const isSelected = helpNeeded.includes(option.value);
                  return (
                    <button
                      key={option.value}
                      onClick={() => toggleHelpOption(option.value)}
                      className={cn(
                        "flex items-start gap-4 p-4 rounded-xl border-2 transition-all duration-200 text-left",
                        isSelected
                          ? "border-sacred bg-sacred/5 shadow-md shadow-sacred/10"
                          : "border-border hover:border-sacred/50 hover:bg-muted/50"
                      )}
                    >
                      <div className={cn(
                        "p-2 rounded-lg transition-colors",
                        isSelected ? "bg-sacred text-white" : "bg-muted text-muted-foreground"
                      )}>
                        <option.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{option.label}</span>
                          {isSelected && (
                            <Check className="w-4 h-4 text-sacred" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-0.5">{option.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-2">
          <Button 
            variant="outline" 
            onClick={handleBack}
            disabled={step === 1}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <Button 
            onClick={handleNext}
            disabled={!canProceed()}
            className="bg-sacred hover:bg-sacred/90 text-sacred-foreground gap-2"
          >
            {step === totalSteps ? 'Get Started' : 'Continue'}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
