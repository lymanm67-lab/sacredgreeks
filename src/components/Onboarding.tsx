import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Heart, FileText, CheckCircle, TrendingUp } from 'lucide-react';

interface OnboardingProps {
  open: boolean;
  onComplete: () => void;
}

export function Onboarding({ open, onComplete }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const totalSteps = 5;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const progress = (step / totalSteps) * 100;

  return (
    <Dialog open={open} onOpenChange={onComplete}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl">Welcome to Sacred Greeks!</DialogTitle>
        </DialogHeader>
        
        <Progress value={progress} className="w-full" />
        
        <div className="py-6">
          {step === 1 && (
            <div className="space-y-4 text-center">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                <BookOpen className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Daily Spiritual Tools</h3>
              <p className="text-muted-foreground">
                Build a consistent spiritual practice with devotionals, Bible study, prayer guides, and journaling to strengthen your daily walk with Christ.
              </p>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 text-center">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-500 to-violet-600 rounded-full flex items-center justify-center">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Community Features</h3>
              <p className="text-muted-foreground">
                Connect with others through the Prayer Wall, share requests, support brothers and sisters, and track community service hours together.
              </p>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 text-center">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex items-center justify-center">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Personal Growth</h3>
              <p className="text-muted-foreground">
                Track your spiritual journey with progress insights, achievements, streaks, and personalized recommendations tailored to your growth.
              </p>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4 text-center">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                <FileText className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold">P.R.O.O.F. Framework</h3>
              <p className="text-muted-foreground">
                Navigate challenging Greek life situations with biblical wisdom using our proven framework: Purpose, Relationships, Obedience, Opportunity, and Freedom.
              </p>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4 text-center">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-yellow-500 to-amber-600 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold">You're All Set!</h3>
              <p className="text-muted-foreground">
                You're ready to begin your journey of faithfully navigating Greek life. Let's get started!
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-between gap-3">
          <Button variant="outline" onClick={handleSkip}>
            Skip
          </Button>
          <Button onClick={handleNext} className="bg-sacred hover:bg-sacred/90">
            {step === totalSteps ? 'Get Started' : 'Next'}
          </Button>
        </div>

        <p className="text-xs text-center text-muted-foreground">
          Step {step} of {totalSteps}
        </p>
      </DialogContent>
    </Dialog>
  );
}
