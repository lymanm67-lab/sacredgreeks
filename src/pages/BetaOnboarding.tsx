import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Rocket, Users, Gift, Target, ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const ONBOARDING_STEPS = [
  {
    id: 1,
    title: "Welcome to Sacred Greeks Life Beta!",
    description: "You're part of an exclusive group helping us build something amazing.",
    icon: Rocket,
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground">
          As a beta tester, you'll get early access to new features and help shape the future of Sacred Greeks Life. Your feedback is invaluable!
        </p>
        <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
          <h4 className="font-semibold mb-2">What to Expect:</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
              <span>Early access to all features</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
              <span>Direct input on feature development</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
              <span>Special beta tester badge & rewards</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
              <span>Priority support from our team</span>
            </li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: 2,
    title: "Key Features to Explore",
    description: "Here's what makes Sacred Greeks Life special.",
    icon: Target,
    content: (
      <div className="space-y-4">
        <div className="grid gap-3">
          <div className="flex gap-3 p-3 bg-background rounded-lg border">
            <div className="text-2xl">📖</div>
            <div>
              <h4 className="font-semibold">Bible Study Tools</h4>
              <p className="text-sm text-muted-foreground">AI-powered verse search and daily devotionals</p>
            </div>
          </div>
          <div className="flex gap-3 p-3 bg-background rounded-lg border">
            <div className="text-2xl">🙏</div>
            <div>
              <h4 className="font-semibold">Prayer Wall</h4>
              <p className="text-sm text-muted-foreground">Share and support prayer requests with your chapter</p>
            </div>
          </div>
          <div className="flex gap-3 p-3 bg-background rounded-lg border">
            <div className="text-2xl">📊</div>
            <div>
              <h4 className="font-semibold">Sacred Greeks Assessment</h4>
              <p className="text-sm text-muted-foreground">Discover how to integrate faith in Greek life</p>
            </div>
          </div>
          <div className="flex gap-3 p-3 bg-background rounded-lg border">
            <div className="text-2xl">📚</div>
            <div>
              <h4 className="font-semibold">Resource Library</h4>
              <p className="text-sm text-muted-foreground">Articles, videos, and guides for faith-based leadership</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 3,
    title: "Your Feedback Matters",
    description: "Help us improve by sharing your thoughts.",
    icon: Users,
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground">
          We're counting on your honest feedback to make this app better. Here's how you can help:
        </p>
        <div className="space-y-3">
          <div className="bg-background p-4 rounded-lg border">
            <h4 className="font-semibold mb-2">📝 Use the Feedback Button</h4>
            <p className="text-sm text-muted-foreground">
              Found in your profile menu - report bugs, suggest features, or share general thoughts
            </p>
          </div>
          <div className="bg-background p-4 rounded-lg border">
            <h4 className="font-semibold mb-2">⭐ Rate Your Experience</h4>
            <p className="text-sm text-muted-foreground">
              Weekly check-ins help us understand what's working and what needs improvement
            </p>
          </div>
          <div className="bg-background p-4 rounded-lg border">
            <h4 className="font-semibold mb-2">🐛 Report Issues</h4>
            <p className="text-sm text-muted-foreground">
              If something breaks or behaves unexpectedly, let us know immediately
            </p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 4,
    title: "Invite Your Friends",
    description: "Earn rewards by growing our beta community.",
    icon: Gift,
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground">
          Share your unique referral code with friends and earn points for each person who joins!
        </p>
        <div className="bg-gradient-to-br from-primary/20 to-primary/5 p-6 rounded-lg border border-primary/30">
          <h4 className="font-semibold text-lg mb-4 text-center">Referral Rewards</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Friend signs up</span>
              <span className="font-bold text-primary">+50 points</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">They complete onboarding</span>
              <span className="font-bold text-primary">+100 points</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">They stay active (1 week)</span>
              <span className="font-bold text-primary">+200 points</span>
            </div>
          </div>
        </div>
        <p className="text-xs text-center text-muted-foreground">
          Find your referral code in your profile after completing onboarding
        </p>
      </div>
    )
  }
];

export default function BetaOnboarding() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleting, setIsCompleting] = useState(false);

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate('/auth');
      return;
    }

    const { data } = await supabase
      .from('beta_testers')
      .select('onboarding_completed')
      .eq('user_id', user.id)
      .maybeSingle();

    if (data?.onboarding_completed) {
      navigate('/dashboard');
    }
  };

  const handleNext = () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    setIsCompleting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Check if beta_tester record exists
      const { data: existing } = await supabase
        .from('beta_testers')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (!existing) {
        // Create beta_tester record
        await supabase.from('beta_testers').insert({
          user_id: user.id,
          onboarding_completed: true,
          onboarding_completed_at: new Date().toISOString()
        });
      } else {
        // Update existing record
        await supabase
          .from('beta_testers')
          .update({
            onboarding_completed: true,
            onboarding_completed_at: new Date().toISOString()
          })
          .eq('user_id', user.id);
      }

      // Award onboarding completion points
      await supabase.rpc('award_points', {
        _user_id: user.id,
        _points: 100,
        _action_type: 'beta_onboarding_complete'
      });

      toast.success('Welcome to the beta! You earned 100 points! 🎉');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error completing onboarding:', error);
      toast.error('Failed to complete onboarding');
    } finally {
      setIsCompleting(false);
    }
  };

  const step = ONBOARDING_STEPS[currentStep];
  const StepIcon = step.icon;
  const progress = ((currentStep + 1) / ONBOARDING_STEPS.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-lg">
                <StepIcon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl">{step.title}</CardTitle>
                <CardDescription>{step.description}</CardDescription>
              </div>
            </div>
            <div className="text-sm font-medium text-muted-foreground">
              {currentStep + 1} of {ONBOARDING_STEPS.length}
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </CardHeader>

        <CardContent className="space-y-6">
          {step.content}

          <div className="flex justify-between pt-4">
            <Button
              onClick={handleBack}
              variant="outline"
              disabled={currentStep === 0}
            >
              Back
            </Button>

            {currentStep === ONBOARDING_STEPS.length - 1 ? (
              <Button
                onClick={handleComplete}
                disabled={isCompleting}
                className="bg-primary hover:bg-primary/90"
              >
                {isCompleting ? 'Completing...' : 'Get Started'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleNext} className="bg-primary hover:bg-primary/90">
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
