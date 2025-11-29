import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Sparkles, 
  BookOpen, 
  Heart, 
  MessageSquare, 
  Trophy,
  CheckCircle,
  Rocket
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface BetaOnboardingProps {
  open: boolean;
  onComplete: () => void;
  userId?: string;
}

const steps = [
  {
    icon: Sparkles,
    title: "Welcome to the Beta!",
    description: "You're among the first to experience Sacred Greeks. Your feedback will shape the future of this platform for Greek life members seeking to live out their faith.",
    gradient: "from-indigo-500 to-purple-600"
  },
  {
    icon: BookOpen,
    title: "Daily Spiritual Tools",
    description: "Access devotionals, Bible study resources, prayer guides, and journaling tools designed specifically for the unique challenges of Greek life.",
    gradient: "from-blue-500 to-indigo-600"
  },
  {
    icon: Heart,
    title: "Community & Support",
    description: "Connect with others through the Prayer Wall, share requests anonymously or publicly, and track your community service hours together.",
    gradient: "from-rose-500 to-pink-600"
  },
  {
    icon: MessageSquare,
    title: "Share Your Feedback",
    description: "As a beta tester, your insights are invaluable. Use the feedback button throughout the app to report bugs, suggest features, or share what you love.",
    gradient: "from-emerald-500 to-teal-600"
  },
  {
    icon: Trophy,
    title: "Earn Rewards",
    description: "Complete challenges, maintain streaks, and earn achievements as you grow spiritually. Your beta participation earns you special recognition!",
    gradient: "from-amber-500 to-orange-600"
  },
  {
    icon: Rocket,
    title: "You're All Set!",
    description: "Thank you for being part of this journey. Let's navigate Greek life together with faith as our foundation!",
    gradient: "from-violet-500 to-purple-600"
  }
];

export function BetaOnboarding({ open, onComplete, userId }: BetaOnboardingProps) {
  const [step, setStep] = useState(0);
  const [completing, setCompleting] = useState(false);
  const navigate = useNavigate();
  const totalSteps = steps.length;

  const handleNext = async () => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      await completeOnboarding();
    }
  };

  const handleSkip = async () => {
    await completeOnboarding();
  };

  const completeOnboarding = async () => {
    setCompleting(true);
    try {
      if (userId) {
        const { error } = await supabase
          .from('beta_testers')
          .update({
            onboarding_completed: true,
            onboarding_completed_at: new Date().toISOString(),
            status: 'active'
          })
          .eq('user_id', userId);

        if (error) {
          console.error('Error updating onboarding status:', error);
        }
      }
      
      toast.success('Welcome to Sacred Greeks! 🎉');
      onComplete();
      navigate('/dashboard');
    } catch (error) {
      console.error('Error completing onboarding:', error);
      onComplete();
    } finally {
      setCompleting(false);
    }
  };

  const progress = ((step + 1) / totalSteps) * 100;
  const currentStep = steps[step];
  const Icon = currentStep.icon;

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-lg" onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-sacred" />
            Beta Onboarding
          </DialogTitle>
        </DialogHeader>
        
        <Progress value={progress} className="w-full" />
        
        <div className="py-6">
          <div className="space-y-4 text-center">
            <div className={`w-20 h-20 mx-auto bg-gradient-to-br ${currentStep.gradient} rounded-full flex items-center justify-center shadow-lg`}>
              <Icon className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-semibold">{currentStep.title}</h3>
            <p className="text-muted-foreground leading-relaxed">
              {currentStep.description}
            </p>
          </div>

          {step === totalSteps - 1 && (
            <div className="mt-6 p-4 bg-sacred/10 rounded-lg border border-sacred/20">
              <div className="flex items-center gap-2 text-sacred font-medium mb-2">
                <CheckCircle className="w-5 h-5" />
                Beta Tester Perks
              </div>
              <ul className="text-sm text-muted-foreground space-y-1 ml-7">
                <li>• Early access to all new features</li>
                <li>• Direct line to the development team</li>
                <li>• Special beta tester badge</li>
                <li>• Priority support</li>
              </ul>
            </div>
          )}
        </div>

        <div className="flex justify-between gap-3">
          <Button 
            variant="outline" 
            onClick={handleSkip}
            disabled={completing}
          >
            Skip
          </Button>
          <Button 
            onClick={handleNext} 
            className="bg-sacred hover:bg-sacred/90"
            disabled={completing}
          >
            {completing ? (
              'Setting up...'
            ) : step === totalSteps - 1 ? (
              'Get Started'
            ) : (
              'Next'
            )}
          </Button>
        </div>

        <p className="text-xs text-center text-muted-foreground">
          Step {step + 1} of {totalSteps}
        </p>
      </DialogContent>
    </Dialog>
  );
}
