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
  ArrowLeft,
  UserCheck,
  UserX,
  RefreshCw,
  UsersRound,
  UserCog
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { SurveyAnswers } from '@/hooks/use-landing-survey';
import { useNavigate } from 'react-router-dom';

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

const alumniStatusOptions = [
  {
    value: 'active',
    label: 'Active',
    description: 'Still involved with my chapter or alumni association',
    icon: UserCheck,
  },
  {
    value: 'inactive',
    label: 'Inactive',
    description: 'Not currently involved but still connected',
    icon: UserX,
  },
  {
    value: 'reconnecting',
    label: 'Reconnecting',
    description: 'Looking to re-engage with my fraternity or sorority',
    icon: RefreshCw,
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
  {
    value: 'coaching',
    label: 'Coaching',
    description: 'Personal or group guidance from experts',
    icon: UsersRound,
  },
];

const coachingTypeOptions = [
  {
    value: 'group',
    label: 'Group Coaching',
    description: 'Learn alongside others in a supportive community setting',
    icon: UsersRound,
  },
  {
    value: 'personalized',
    label: 'Personalized Coaching',
    description: 'One-on-one guidance tailored to your specific situation',
    icon: UserCog,
  },
];

export function LandingPersonalizationSurvey({ open, onComplete, onSkip }: LandingPersonalizationSurveyProps) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [journey, setJourney] = useState('');
  const [alumniStatus, setAlumniStatus] = useState('');
  const [challenge, setChallenge] = useState('');
  const [helpNeeded, setHelpNeeded] = useState<string[]>([]);
  const [coachingType, setCoachingType] = useState('');

  // Dynamic step calculation based on selections
  const isAlumni = journey === 'alumni';
  const needsCoachingStep = helpNeeded.includes('coaching');
  
  const getTotalSteps = () => {
    let steps = 3; // Base: journey, challenge, help
    if (isAlumni) steps += 1; // Alumni status
    if (needsCoachingStep) steps += 1; // Coaching type
    return steps;
  };
  
  const totalSteps = getTotalSteps();
  const progress = (getCurrentQuestionNumber() / totalSteps) * 100;

  const handleNext = () => {
    if (step === 1 && isAlumni) {
      setStep(2); // Go to alumni status question
    } else if (step === 2 && isAlumni) {
      setStep(3); // Go to challenge question
    } else if (step === 1 && !isAlumni) {
      setStep(3); // Skip alumni status, go to challenge
    } else if (step === 3) {
      setStep(4); // Go to help needed
    } else if (step === 4) {
      if (helpNeeded.includes('coaching')) {
        setStep(5); // Go to coaching type selection
      } else {
        onComplete({ journey, alumniStatus: isAlumni ? alumniStatus : undefined, challenge, helpNeeded });
      }
    } else if (step === 5) {
      // Complete with coaching type and redirect to application
      onComplete({ journey, alumniStatus: isAlumni ? alumniStatus : undefined, challenge, helpNeeded, coachingType });
      navigate('/coaching-application');
    }
  };

  const handleBack = () => {
    if (step === 5) {
      setStep(4);
    } else if (step === 4) {
      setStep(3);
    } else if (step === 3 && isAlumni) {
      setStep(2);
    } else if (step === 3 && !isAlumni) {
      setStep(1);
    } else if (step === 2) {
      setStep(1);
    }
  };

  const toggleHelpOption = (value: string) => {
    setHelpNeeded(prev => 
      prev.includes(value) 
        ? prev.filter(v => v !== value)
        : [...prev, value]
    );
    // Reset coaching type if coaching is deselected
    if (value === 'coaching' && helpNeeded.includes('coaching')) {
      setCoachingType('');
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1: return !!journey;
      case 2: return !!alumniStatus;
      case 3: return !!challenge;
      case 4: return helpNeeded.length > 0;
      case 5: return !!coachingType;
      default: return false;
    }
  };
  
  function getCurrentQuestionNumber() {
    if (step === 1) return 1;
    if (step === 2 && isAlumni) return 2;
    if (step === 3) return isAlumni ? 3 : 2;
    if (step === 4) return isAlumni ? 4 : 3;
    if (step === 5) return totalSteps;
    return step;
  }

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto" hideCloseButton>
        <DialogHeader className="space-y-3">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="text-xs">
              Question {getCurrentQuestionNumber()} of {totalSteps}
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

          {step === 2 && isAlumni && (
            <div className="space-y-4">
              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold">How would you describe your current involvement?</h3>
                <p className="text-sm text-muted-foreground">This helps us tailor resources for your situation</p>
              </div>
              <div className="grid gap-3">
                {alumniStatusOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setAlumniStatus(option.value)}
                    className={cn(
                      "flex items-start gap-4 p-4 rounded-xl border-2 transition-all duration-200 text-left",
                      alumniStatus === option.value
                        ? "border-sacred bg-sacred/5 shadow-md shadow-sacred/10"
                        : "border-border hover:border-sacred/50 hover:bg-muted/50"
                    )}
                  >
                    <div className={cn(
                      "p-2 rounded-lg transition-colors",
                      alumniStatus === option.value ? "bg-sacred text-white" : "bg-muted text-muted-foreground"
                    )}>
                      <option.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{option.label}</span>
                        {alumniStatus === option.value && (
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

          {step === 4 && (
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

          {step === 5 && (
            <div className="space-y-4">
              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold">What type of coaching are you interested in?</h3>
                <p className="text-sm text-muted-foreground">Select the option that best fits your needs</p>
              </div>
              <div className="grid gap-3">
                {coachingTypeOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setCoachingType(option.value)}
                    className={cn(
                      "flex items-start gap-4 p-4 rounded-xl border-2 transition-all duration-200 text-left",
                      coachingType === option.value
                        ? "border-sacred bg-sacred/5 shadow-md shadow-sacred/10"
                        : "border-border hover:border-sacred/50 hover:bg-muted/50"
                    )}
                  >
                    <div className={cn(
                      "p-2 rounded-lg transition-colors",
                      coachingType === option.value ? "bg-sacred text-white" : "bg-muted text-muted-foreground"
                    )}>
                      <option.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{option.label}</span>
                        {coachingType === option.value && (
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
            {step === 5 
              ? 'Continue to Application' 
              : (step === 4 && !helpNeeded.includes('coaching')) 
                ? 'Get Started' 
                : 'Continue'}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
