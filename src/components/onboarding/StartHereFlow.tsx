import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  GraduationCap, 
  Users, 
  Church, 
  Heart,
  AlertTriangle,
  Sparkles,
  Scale,
  UserX,
  BookOpen,
  Shield,
  ChevronRight,
  ChevronLeft,
  Check,
  Calendar
} from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface StartHereFlowProps {
  open: boolean;
  onComplete: (plan: PersonalizedPlan) => void;
  onSkip: () => void;
}

interface PersonaOption {
  id: string;
  label: string;
  description: string;
  icon: typeof GraduationCap;
  color: string;
}

interface StruggleOption {
  id: string;
  label: string;
  description: string;
  icon: typeof AlertTriangle;
}

export interface PersonalizedPlan {
  persona: string;
  struggles: string[];
  days: DayPlan[];
}

interface DayPlan {
  day: number;
  title: string;
  theme: string;
  description: string;
  action: string;
  actionRoute: string;
}

const personas: PersonaOption[] = [
  {
    id: "student",
    label: "Current Student",
    description: "Active member navigating Greek life on campus",
    icon: GraduationCap,
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: "alumni",
    label: "Alumni",
    description: "Graduate maintaining connection to your organization",
    icon: Users,
    color: "from-purple-500 to-fuchsia-500"
  },
  {
    id: "pastor",
    label: "Pastor / Minister",
    description: "Church leader guiding members in Greek organizations",
    icon: Church,
    color: "from-emerald-500 to-teal-500"
  },
  {
    id: "parent",
    label: "Parent / Family",
    description: "Supporting a loved one in Greek life",
    icon: Heart,
    color: "from-rose-500 to-pink-500"
  }
];

const struggles: StruggleOption[] = [
  {
    id: "renouncement",
    label: "Renouncement Pressure",
    description: "Being told to leave your organization",
    icon: AlertTriangle
  },
  {
    id: "ritual",
    label: "Ritual Concerns",
    description: "Questions about ceremonies and practices",
    icon: Sparkles
  },
  {
    id: "conscience",
    label: "Conscience Conflicts",
    description: "Internal tension between faith and membership",
    icon: Scale
  },
  {
    id: "family",
    label: "Family Conflict",
    description: "Disagreements with family about your membership",
    icon: UserX
  },
  {
    id: "church",
    label: "Church Conflict",
    description: "Tension with church leadership or members",
    icon: Church
  },
  {
    id: "identity",
    label: "Leadership Identity",
    description: "Balancing Christian witness with Greek leadership",
    icon: Shield
  }
];

// 7-day plans based on persona and struggles
function generatePlan(persona: string, selectedStruggles: string[]): DayPlan[] {
  const basePlan: DayPlan[] = [
    {
      day: 1,
      title: "Clarity & Conscience",
      theme: "Finding Peace in Your Identity",
      description: "Understand that your identity is first in Christ, then in your letters.",
      action: "Read Today's Devotional",
      actionRoute: "/devotional"
    },
    {
      day: 2,
      title: "Symbols vs. Worship",
      theme: "Understanding the Difference",
      description: "Learn the biblical distinction between cultural symbols and worship.",
      action: "Explore Symbol Guide",
      actionRoute: "/symbol-guide"
    },
    {
      day: 3,
      title: "Pressure & Fear",
      theme: "Standing Firm Under Opposition",
      description: "Discover how to respond gracefully when your faith is challenged.",
      action: "Try Myth Buster",
      actionRoute: "/myth-buster"
    },
    {
      day: 4,
      title: "Boundaries & Integrity",
      theme: "Knowing Your Limits",
      description: "Establish healthy boundaries while maintaining your witness.",
      action: "Start P.R.O.O.F. Course",
      actionRoute: "/proof-course"
    },
    {
      day: 5,
      title: "Witness & Service",
      theme: "Being Salt and Light",
      description: "Explore how your Greek membership can glorify God.",
      action: "Read Prayer Guide",
      actionRoute: "/prayer-guide"
    },
    {
      day: 6,
      title: "Conversations with Leaders",
      theme: "Engaging Church & Family",
      description: "Learn how to have productive conversations with skeptics.",
      action: "Handle Objections Guide",
      actionRoute: "/guide"
    },
    {
      day: 7,
      title: "Next Steps",
      theme: "Your Ongoing Journey",
      description: "Set up your daily rhythm for continued growth.",
      action: "Start 30-Day Journey",
      actionRoute: "/journey"
    }
  ];

  // Customize based on primary struggles
  if (selectedStruggles.includes("renouncement")) {
    basePlan[2] = {
      ...basePlan[2],
      title: "Responding to Renouncement",
      description: "Biblical wisdom for when you're pressured to leave your organization.",
      action: "Family Fallout Guide",
      actionRoute: "/family-ministry-fallout"
    };
  }

  if (selectedStruggles.includes("family")) {
    basePlan[5] = {
      ...basePlan[5],
      title: "Healing Family Relationships",
      description: "Rebuilding trust with family members who oppose your membership.",
      action: "Family Fallout Guide",
      actionRoute: "/family-ministry-fallout"
    };
  }

  if (persona === "pastor") {
    basePlan[0] = {
      ...basePlan[0],
      title: "Shepherding with Grace",
      description: "How to guide members without judgment or ultimatums.",
    };
  }

  return basePlan;
}

export function StartHereFlow({ open, onComplete, onSkip }: StartHereFlowProps) {
  const [step, setStep] = useState(1);
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null);
  const [selectedStruggles, setSelectedStruggles] = useState<string[]>([]);
  const [generatedPlan, setGeneratedPlan] = useState<DayPlan[] | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  const handlePersonaSelect = (personaId: string) => {
    setSelectedPersona(personaId);
  };

  const handleStruggleToggle = (struggleId: string) => {
    setSelectedStruggles(prev => 
      prev.includes(struggleId)
        ? prev.filter(s => s !== struggleId)
        : [...prev, struggleId]
    );
  };

  const handleNext = () => {
    if (step === 2) {
      // Generate the plan
      const plan = generatePlan(selectedPersona!, selectedStruggles);
      setGeneratedPlan(plan);
    }
    setStep(s => s + 1);
  };

  const handleBack = () => {
    setStep(s => s - 1);
  };

  const handleComplete = async () => {
    if (!selectedPersona || !generatedPlan) return;

    // Save to profile if logged in
    if (user) {
      try {
        await supabase
          .from('profiles')
          .update({
            affiliation_type: selectedPersona,
          })
          .eq('id', user.id);
      } catch (error) {
        console.error('Error saving persona:', error);
      }
    }

    const plan: PersonalizedPlan = {
      persona: selectedPersona,
      struggles: selectedStruggles,
      days: generatedPlan
    };

    toast({
      title: "Your 7-Day Plan is Ready! 🎉",
      description: "We've created a personalized journey just for you."
    });

    onComplete(plan);
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto p-0 gap-0">
        {/* Header */}
        <div className="p-6 pb-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Start Your Journey</h2>
            <Button variant="ghost" size="sm" onClick={onSkip} className="text-muted-foreground">
              Skip for now
            </Button>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-muted-foreground mt-2">Step {step} of {totalSteps}</p>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Step 1: Persona Selection */}
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold mb-1">What describes you?</h3>
                <p className="text-sm text-muted-foreground">This helps us personalize your experience</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {personas.map((persona) => {
                  const IconComponent = persona.icon;
                  const isSelected = selectedPersona === persona.id;
                  
                  return (
                    <button
                      key={persona.id}
                      onClick={() => handlePersonaSelect(persona.id)}
                      className={cn(
                        "p-4 rounded-xl border-2 text-left transition-all",
                        isSelected 
                          ? "border-primary bg-primary/5" 
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center mb-3 bg-gradient-to-br",
                        persona.color
                      )}>
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="font-medium text-sm">{persona.label}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{persona.description}</p>
                      {isSelected && (
                        <Check className="w-4 h-4 text-primary mt-2" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 2: Struggles Selection */}
          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold mb-1">What are you wrestling with?</h3>
                <p className="text-sm text-muted-foreground">Select all that apply (optional)</p>
              </div>

              <div className="space-y-2">
                {struggles.map((struggle) => {
                  const IconComponent = struggle.icon;
                  const isSelected = selectedStruggles.includes(struggle.id);
                  
                  return (
                    <button
                      key={struggle.id}
                      onClick={() => handleStruggleToggle(struggle.id)}
                      className={cn(
                        "w-full p-3 rounded-lg border flex items-center gap-3 transition-all text-left",
                        isSelected 
                          ? "border-primary bg-primary/5" 
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                        isSelected ? "bg-primary/20" : "bg-muted"
                      )}>
                        <IconComponent className={cn("w-4 h-4", isSelected ? "text-primary" : "text-muted-foreground")} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm">{struggle.label}</h4>
                        <p className="text-xs text-muted-foreground">{struggle.description}</p>
                      </div>
                      {isSelected && (
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 3: Plan Preview */}
          {step === 3 && generatedPlan && (
            <div className="space-y-4 animate-fade-in">
              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-1">Your 7-Day Plan</h3>
                <p className="text-sm text-muted-foreground">Tailored to your journey</p>
              </div>

              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                {generatedPlan.map((day) => (
                  <div 
                    key={day.day}
                    className="p-3 rounded-lg border border-border bg-card"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-primary">{day.day}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm">{day.title}</h4>
                        <p className="text-xs text-muted-foreground">{day.theme}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-xs text-center text-muted-foreground">
                You can access this plan anytime from your dashboard
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 pt-4 border-t flex justify-between">
          {step > 1 ? (
            <Button variant="outline" onClick={handleBack}>
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <Button 
              onClick={handleNext}
              disabled={step === 1 && !selectedPersona}
            >
              Continue
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button onClick={handleComplete} className="bg-primary hover:bg-primary/90">
              Start Day 1
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
