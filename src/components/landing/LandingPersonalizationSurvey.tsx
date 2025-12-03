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
  UserCog,
  Volume2,
  Loader2,
  Bot
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { SurveyAnswers } from '@/hooks/use-landing-survey';
import { useNavigate } from 'react-router-dom';
import { useTextToSpeech } from '@/hooks/use-text-to-speech';

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
    shortDesc: 'Myth Buster & Objection Practice',
    fullDescription: 'Myth Buster debunks common misconceptions about Greek organizations with biblical truth. Objection Practice helps you rehearse confident, faith-based responses to critics—whether family, church members, or others questioning your membership.',
    icon: MessageSquare,
  },
  {
    value: 'daily-guidance',
    label: 'Daily spiritual guidance',
    shortDesc: 'Devotionals & 30-Day Journey',
    fullDescription: 'Start each day with scripture-based devotionals tailored for Greek Christians. The 30-Day Journey is a structured program using the P.R.O.O.F. framework to help you integrate your faith and Greek identity step by step.',
    icon: Calendar,
  },
  {
    value: 'symbols',
    label: 'Understanding symbols & rituals',
    shortDesc: 'Symbol Guide & Context',
    fullDescription: 'The Symbol Guide provides Christian perspectives on Greek letters, hand signs, and rituals. Understand the historical context and how to approach these elements from a faith-informed viewpoint without compromising your beliefs.',
    icon: Eye,
  },
  {
    value: 'healing',
    label: 'Processing hurt or conflict',
    shortDesc: 'Healing Resources & Support',
    fullDescription: 'Resources for those experiencing family rifts, church rejection, or internal conflict about their Greek membership. Includes guided reflections, community support, and pathways to reconciliation and peace.',
    icon: HeartHandshake,
  },
  {
    value: 'coaching',
    label: 'Coaching',
    shortDesc: 'Personal or group guidance',
    fullDescription: 'Connect with experienced coaches who understand both Greek life and Christian faith. Get personalized advice for your specific situation, whether navigating family conversations or growing as a faith-driven leader in your chapter.',
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
  const { speak, isPlaying, isLoading, stop } = useTextToSpeech();
  const [step, setStep] = useState(1);
  const [journey, setJourney] = useState('');
  const [alumniStatus, setAlumniStatus] = useState('');
  const [challenge, setChallenge] = useState('');
  const [helpNeeded, setHelpNeeded] = useState<string[]>([]);
  const [coachingType, setCoachingType] = useState('');
  const [showAiSuggestion, setShowAiSuggestion] = useState(false);

  const handleListen = (text: string, id: string) => {
    if (isPlaying === id) {
      stop();
    } else {
      speak(text, id);
    }
  };

  const getAiRecommendation = () => {
    // Based on challenge, recommend help options
    const recommendations: Record<string, string[]> = {
      'disapproval': ['quick-answers', 'healing'],
      'torn': ['symbols', 'daily-guidance'],
      'responses': ['quick-answers', 'symbols'],
      'growth': ['daily-guidance', 'coaching'],
    };
    return recommendations[challenge] || [];
  };
  const isAlumni = journey === 'alumni';
  const needsCoachingStep = helpNeeded.includes('coaching');
  
  const getTotalSteps = () => {
    let steps = 4; // Base: journey, challenge, help, confirmation
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
        setStep(6); // Go to confirmation step
      }
    } else if (step === 5) {
      setStep(6); // Go to confirmation step
    } else if (step === 6) {
      // Complete and redirect to signup
      onComplete({ journey, alumniStatus: isAlumni ? alumniStatus : undefined, challenge, helpNeeded, coachingType: needsCoachingStep ? coachingType : undefined });
      if (needsCoachingStep) {
        navigate('/coaching-application');
      }
    }
  };

  const handleBack = () => {
    if (step === 6) {
      setStep(needsCoachingStep ? 5 : 4);
    } else if (step === 5) {
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
      case 6: return true; // Confirmation step always allows proceed
      default: return false;
    }
  };
  
  function getCurrentQuestionNumber() {
    if (step === 1) return 1;
    if (step === 2 && isAlumni) return 2;
    if (step === 3) return isAlumni ? 3 : 2;
    if (step === 4) return isAlumni ? 4 : 3;
    if (step === 5) return isAlumni ? 5 : 4;
    if (step === 6) return totalSteps;
    return step;
  }

  // Helper to get labels for confirmation display
  const getJourneyLabel = () => journeyOptions.find(o => o.value === journey)?.label || journey;
  const getAlumniLabel = () => alumniStatusOptions.find(o => o.value === alumniStatus)?.label || alumniStatus;
  const getChallengeLabel = () => challengeOptions.find(o => o.value === challenge)?.label || challenge;
  const getHelpLabels = () => helpNeeded.map(h => helpOptions.find(o => o.value === h)?.label || h);
  const getCoachingLabel = () => coachingTypeOptions.find(o => o.value === coachingType)?.label || coachingType;

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
                <p className="text-sm text-muted-foreground">Select all that apply - tap the speaker icon to hear details</p>
              </div>
              
              {/* AI Assist Button */}
              <Button
                variant="outline"
                size="sm"
                className="w-full gap-2 border-sacred/30 text-sacred hover:bg-sacred/5"
                onClick={() => {
                  const recommended = getAiRecommendation();
                  setHelpNeeded(recommended);
                  setShowAiSuggestion(true);
                }}
              >
                <Bot className="w-4 h-4" />
                AI Assist - Recommend based on my challenge
              </Button>
              
              {showAiSuggestion && helpNeeded.length > 0 && (
                <p className="text-xs text-center text-sacred">
                  Based on your challenge, we recommend the highlighted options. Feel free to adjust!
                </p>
              )}
              
              <div className="grid gap-3">
                {helpOptions.map((option) => {
                  const isSelected = helpNeeded.includes(option.value);
                  const listenId = `help-${option.value}`;
                  const isCurrentlyPlaying = isPlaying === listenId;
                  const isCurrentlyLoading = isLoading === listenId;
                  
                  return (
                    <div
                      key={option.value}
                      className={cn(
                        "rounded-xl border-2 transition-all duration-200",
                        isSelected
                          ? "border-sacred bg-sacred/5 shadow-md shadow-sacred/10"
                          : "border-border hover:border-sacred/50"
                      )}
                    >
                      <button
                        onClick={() => toggleHelpOption(option.value)}
                        className="flex items-start gap-4 p-4 w-full text-left"
                      >
                        <div className={cn(
                          "p-2 rounded-lg transition-colors shrink-0",
                          isSelected ? "bg-sacred text-white" : "bg-muted text-muted-foreground"
                        )}>
                          <option.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{option.label}</span>
                            {isSelected && (
                              <Check className="w-4 h-4 text-sacred shrink-0" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-0.5">{option.shortDesc}</p>
                          <p className="text-xs text-muted-foreground/80 mt-2 leading-relaxed">
                            {option.fullDescription}
                          </p>
                        </div>
                      </button>
                      <div className="px-4 pb-3 flex justify-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1.5 text-xs h-7"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleListen(`${option.label}. ${option.fullDescription}`, listenId);
                          }}
                        >
                          {isCurrentlyLoading ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Volume2 className={cn("w-3.5 h-3.5", isCurrentlyPlaying && "text-sacred")} />
                          )}
                          {isCurrentlyPlaying ? "Stop" : "Listen"}
                        </Button>
                      </div>
                    </div>
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

          {step === 6 && (
            <div className="space-y-4">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-sacred/10 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6 text-sacred" />
                </div>
                <h3 className="text-lg font-semibold">Review Your Selections</h3>
                <p className="text-sm text-muted-foreground">
                  Here's what you've shared - you can edit these anytime in your profile settings after signing up
                </p>
              </div>
              
              <div className="space-y-3 bg-muted/50 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Users className="w-4 h-4 text-sacred mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Your Journey</p>
                    <p className="font-medium">{getJourneyLabel()}</p>
                    {isAlumni && alumniStatus && (
                      <p className="text-sm text-muted-foreground">{getAlumniLabel()}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Shield className="w-4 h-4 text-sacred mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Main Challenge</p>
                    <p className="font-medium">{getChallengeLabel()}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Sparkles className="w-4 h-4 text-sacred mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Help Needed</p>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {getHelpLabels().map((label, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {label}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                {needsCoachingStep && coachingType && (
                  <div className="flex items-start gap-3">
                    <UserCog className="w-4 h-4 text-sacred mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Coaching Preference</p>
                      <p className="font-medium">{getCoachingLabel()}</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="text-center pt-2">
                <p className="text-xs text-muted-foreground">
                  Your dashboard will be personalized based on these preferences
                </p>
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
            {step === 6 
              ? (needsCoachingStep ? 'Continue to Application' : 'Create Account')
              : 'Continue'}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
