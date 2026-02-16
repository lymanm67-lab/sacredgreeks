import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Heart, FileText, CheckCircle, TrendingUp, Users, ArrowRight, ChevronRight } from 'lucide-react';
import { GreekOrganizationSelector } from '@/components/GreekOrganizationSelector';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { AFFILIATION_TYPES } from '@/data/affiliationTypes';
import logo from '@/assets/sacred-greeks-logo.png';

interface OnboardingProps {
  open: boolean;
  onComplete: () => void;
  userId?: string;
}

const slideVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? -300 : 300, opacity: 0 }),
};

export function Onboarding({ open, onComplete, userId }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const [affiliationType, setAffiliationType] = useState('');
  const [greekCouncil, setGreekCouncil] = useState('');
  const [greekOrganization, setGreekOrganization] = useState('');
  const [chapterName, setChapterName] = useState('');
  const [initiationYear, setInitiationYear] = useState<number | null>(null);
  const [memberStatus, setMemberStatus] = useState('active');

  // Steps: 0=welcome, 1=affiliation, 2=org(members only), 3=features1, 4=features2, 5=features3, 6=ready
  const isMember = affiliationType === 'member';
  const steps = isMember
    ? ['welcome', 'affiliation', 'organization', 'spiritual', 'community', 'proof', 'ready']
    : ['welcome', 'affiliation', 'spiritual', 'community', 'proof', 'ready'];
  const totalSteps = steps.length;
  const currentStepName = steps[step] || 'ready';

  const saveGreekInfo = async () => {
    if (!userId) return true;
    setSaving(true);
    try {
      const { error } = await supabase.from('profiles').upsert({
        id: userId,
        affiliation_type: affiliationType || 'member',
        greek_council: isMember ? (greekCouncil || null) : null,
        greek_organization: isMember ? (greekOrganization || null) : null,
        chapter_name: isMember ? (chapterName || null) : null,
        initiation_year: isMember ? initiationYear : null,
        member_status: isMember ? (memberStatus || 'active') : null,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error saving Greek info:', error);
      toast({ title: 'Error', description: 'Failed to save your info. You can update it later in your profile.', variant: 'destructive' });
      return true;
    } finally {
      setSaving(false);
    }
  };

  const handleNext = async () => {
    if (currentStepName === 'organization' || (currentStepName === 'affiliation' && !isMember)) {
      await saveGreekInfo();
    }
    setDirection(1);
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = async () => {
    await saveGreekInfo();
    onComplete();
  };

  const progress = ((step + 1) / totalSteps) * 100;

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[hsl(222,47%,8%)] text-white flex flex-col overflow-hidden">
      {/* Top bar */}
      <header className="flex items-center justify-between px-4 sm:px-8 py-4 shrink-0">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Sacred Greeks" className="w-8 h-8 rounded-full" />
          <span className="text-sm font-medium text-white/70 hidden sm:inline">Sacred Greeks</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleSkip}
          disabled={saving}
          className="border-white/20 text-white hover:bg-white/10 hover:text-white bg-transparent"
        >
          {step === 0 ? 'Skip tour' : 'Continue to app'}
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </header>

      {/* Progress */}
      <div className="px-4 sm:px-8 shrink-0">
        <Progress value={progress} className="h-1 bg-white/10 [&>div]:bg-[hsl(var(--sacred))]" />
        <p className="text-xs text-white/40 mt-2 text-right">Step {step + 1} of {totalSteps}</p>
      </div>

      {/* Content area */}
      <div className="flex-1 flex items-center justify-center overflow-y-auto px-4 py-8">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="w-full max-w-2xl mx-auto"
          >
            {currentStepName === 'welcome' && <WelcomeStep />}
            {currentStepName === 'affiliation' && (
              <AffiliationStep value={affiliationType} onChange={setAffiliationType} />
            )}
            {currentStepName === 'organization' && (
              <OrganizationStep
                greekCouncil={greekCouncil}
                greekOrganization={greekOrganization}
                chapterName={chapterName}
                initiationYear={initiationYear}
                memberStatus={memberStatus}
                onCouncilChange={setGreekCouncil}
                onOrganizationChange={setGreekOrganization}
                onChapterChange={setChapterName}
                onYearChange={setInitiationYear}
                onStatusChange={setMemberStatus}
              />
            )}
            {currentStepName === 'spiritual' && <FeatureStep icon={BookOpen} iconColors="from-blue-500 to-indigo-600" title="Daily Spiritual Tools" description="Build a consistent spiritual practice with devotionals, Bible study, prayer guides, and journaling to strengthen your daily walk with Christ." />}
            {currentStepName === 'community' && <FeatureStep icon={Heart} iconColors="from-purple-500 to-violet-600" title="Community Features" description="Connect with others through the Prayer Wall, share requests, support brothers and sisters, and track community service hours together." />}
            {currentStepName === 'proof' && <FeatureStep icon={FileText} iconColors="from-emerald-500 to-teal-600" title="P.R.O.O.F. Framework" description="Biblical responses to common Greek life criticisms: Pledge Process (hazing), Rituals (demonic claims), Oaths (deity allegiance), Obscurity (secrecy), and Founders (Masonic ties)." />}
            {currentStepName === 'ready' && <ReadyStep />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom action */}
      <div className="px-4 sm:px-8 pb-8 pt-4 shrink-0">
        <div className="max-w-2xl mx-auto">
          <Button
            onClick={handleNext}
            disabled={saving || (currentStepName === 'affiliation' && !affiliationType)}
            size="lg"
            className="w-full bg-[hsl(var(--sacred))] hover:bg-[hsl(var(--sacred))]/90 text-white font-semibold py-6 text-lg group"
          >
            {saving ? 'Saving...' : step === totalSteps - 1 ? 'Get Started' : 'Continue'}
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ── Sub-steps ─────────────────────────────────────── */

function WelcomeStep() {
  return (
    <div className="text-center space-y-6">
      <div className="inline-block px-5 py-2 rounded-full border border-[hsl(var(--sacred))]/40 bg-[hsl(var(--sacred))]/10 text-[hsl(var(--sacred))] text-sm font-semibold tracking-wide uppercase">
        The Only App You Need
      </div>
      <h1 className="text-3xl sm:text-5xl font-bold leading-tight">
        Faithfully navigate Greek life.{' '}
        <span className="text-[hsl(var(--sacred))]">In your pocket.</span>
      </h1>
      <p className="text-white/60 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
        Grow spiritually with daily devotionals, defend your faith with the P.R.O.O.F. framework, connect with your community, and track your journey — all in one place.
      </p>
    </div>
  );
}

function AffiliationStep({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <h2 className="text-2xl sm:text-4xl font-bold">Where are you in your Greek life journey?</h2>
        <p className="text-white/50 text-sm sm:text-base">Select the option that best describes you.</p>
      </div>
      <div className="space-y-3">
        {AFFILIATION_TYPES.map((type) => (
          <button
            key={type.value}
            onClick={() => onChange(type.value)}
            className={`w-full text-left p-4 sm:p-5 rounded-xl border-2 transition-all duration-200 ${
              value === type.value
                ? 'border-[hsl(var(--sacred))] bg-[hsl(var(--sacred))]/10'
                : 'border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/8'
            }`}
          >
            <div className="flex items-center gap-4">
              <span className="text-2xl">{type.icon}</span>
              <div>
                <div className="font-semibold text-base sm:text-lg">{type.label}</div>
                <div className="text-white/50 text-sm mt-0.5">{type.description}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function OrganizationStep(props: {
  greekCouncil: string;
  greekOrganization: string;
  chapterName: string;
  initiationYear: number | null;
  memberStatus: string;
  onCouncilChange: (v: string) => void;
  onOrganizationChange: (v: string) => void;
  onChapterChange: (v: string) => void;
  onYearChange: (v: number | null) => void;
  onStatusChange: (v: string) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-3">
        <h2 className="text-2xl sm:text-4xl font-bold">Tell us about your organization</h2>
        <p className="text-white/50 text-sm">(Optional — you can update this later)</p>
      </div>
      <div className="bg-white/5 rounded-2xl p-4 sm:p-6 border border-white/10 [&_label]:text-white/70 [&_button]:border-white/20 [&_button]:text-white [&_input]:bg-white/5 [&_input]:border-white/20 [&_input]:text-white [&_.text-muted-foreground]:text-white/50">
        <GreekOrganizationSelector
          selectedCouncil={props.greekCouncil}
          selectedOrganization={props.greekOrganization}
          chapterName={props.chapterName}
          initiationYear={props.initiationYear}
          memberStatus={props.memberStatus}
          onCouncilChange={props.onCouncilChange}
          onOrganizationChange={props.onOrganizationChange}
          onChapterChange={props.onChapterChange}
          onYearChange={props.onYearChange}
          onStatusChange={props.onStatusChange}
          compact
        />
      </div>
    </div>
  );
}

function FeatureStep({ icon: Icon, iconColors, title, description }: { icon: React.ElementType; iconColors: string; title: string; description: string }) {
  return (
    <div className="text-center space-y-6">
      <div className={`w-24 h-24 mx-auto bg-gradient-to-br ${iconColors} rounded-2xl flex items-center justify-center shadow-2xl`}>
        <Icon className="w-12 h-12 text-white" />
      </div>
      <h2 className="text-2xl sm:text-4xl font-bold">{title}</h2>
      <p className="text-white/60 text-base sm:text-lg max-w-lg mx-auto leading-relaxed">{description}</p>
    </div>
  );
}

function ReadyStep() {
  return (
    <div className="text-center space-y-6">
      <div className="w-24 h-24 mx-auto bg-gradient-to-br from-yellow-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-2xl">
        <CheckCircle className="w-12 h-12 text-white" />
      </div>
      <h2 className="text-2xl sm:text-4xl font-bold">You're all set!</h2>
      <p className="text-white/60 text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
        You're ready to begin your journey of faithfully navigating Greek life. Let's get started!
      </p>
    </div>
  );
}
