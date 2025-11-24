import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Heart, FileText, CheckCircle } from 'lucide-react';

interface OnboardingProps {
  open: boolean;
  onComplete: () => void;
}

export function Onboarding({ open, onComplete }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const totalSteps = 4;

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
              <div className="w-20 h-20 mx-auto bg-sacred/10 rounded-full flex items-center justify-center">
                <BookOpen className="w-10 h-10 text-sacred" />
              </div>
              <h3 className="text-xl font-semibold">Daily Devotionals</h3>
              <p className="text-muted-foreground">
                Start each day with biblical wisdom focused on integrating faith and Greek life through the P.R.O.O.F. framework.
              </p>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 text-center">
              <div className="w-20 h-20 mx-auto bg-sacred/10 rounded-full flex items-center justify-center">
                <FileText className="w-10 h-10 text-sacred" />
              </div>
              <h3 className="text-xl font-semibold">P.R.O.O.F. Assessments</h3>
              <p className="text-muted-foreground">
                Get personalized guidance for challenging situations using our proven framework: Purpose, Relationships, Obedience, Opportunity, and Freedom.
              </p>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 text-center">
              <div className="w-20 h-20 mx-auto bg-sacred/10 rounded-full flex items-center justify-center">
                <Heart className="w-10 h-10 text-sacred" />
              </div>
              <h3 className="text-xl font-semibold">Prayer Journal</h3>
              <p className="text-muted-foreground">
                Record your prayers, track answered requests, and build a personal testimony of God's faithfulness in your life.
              </p>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4 text-center">
              <div className="w-20 h-20 mx-auto bg-sacred/10 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-sacred" />
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
