import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProgressStepper } from "@/components/ui/progress-stepper";
import { Home, Sparkles } from "lucide-react";
import { SacredGreeksStep1, Scenario } from "@/components/sacred-greeks/SacredGreeksStep1";
import { SacredGreeksStep2 } from "@/components/sacred-greeks/SacredGreeksStep2";
import { SacredGreeksResults } from "@/components/sacred-greeks/SacredGreeksResults";
import { SacredGreeksAnswers } from "@/types/assessment";
import { calculateSacredGreeksScores } from "@/lib/scoring";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useDemoMode } from "@/contexts/DemoModeContext";
import { PremiumGate } from "@/components/PremiumGate";
import { getScenariosForCouncil, getCouncilContent } from "@/data/orgSpecificContent";
import { Badge } from "@/components/ui/badge";
import { invokeCheckAchievements } from "@/lib/invoke-check-achievements";

const steps = [
  { label: "Scenario", description: "Choose your situation" },
  { label: "Questions", description: "Share your story" },
  { label: "P.R.O.O.F.", description: "Receive guidance" },
];

// Demo data for presentation mode - shows a realistic completed assessment
const DEMO_ANSWERS: SacredGreeksAnswers = {
  scenario: "pressure",
  role: "Active BGLO member",
  situation: "My pastor recently preached a sermon that seemed to target Greek life members. He said we're 'serving two masters' and can't fully follow Christ while being in a sorority.",
  whoInvolved: "My pastor, church congregation, my line sisters, and my parents who are also church members",
  alreadyDone: "I've been praying about it and started reading 'Sacred, Not Sinful.' I haven't directly spoken to my pastor yet.",
  emotions: ["Conflicted", "Hurt by church", "Determined"],
  desiredOutcome: "I want to stay connected to both my faith community and my organization with peace and clarity.",
  supportLevel: "Some support, but mixed reactions",
  scenarioSpecific: {
    pressureSource: "pastor"
  }
};

const DEMO_SCORES = {
  biblicalClarity: 75,
  symbolRitualSensitivity: 68,
  traumaConscienceImpact: 82,
  witnessCommunityImpact: 71,
  relationalWisdom: 79
};

const Guide = () => {
  const [searchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Partial<SacredGreeksAnswers>>({});
  const [resultData, setResultData] = useState<any>(null);
  const [userCouncil, setUserCouncil] = useState<string | null>(null);
  const [councilScenarios, setCouncilScenarios] = useState<Scenario[]>([]);
  const { toast } = useToast();
  const { user } = useAuth();
  const { demoSettings } = useDemoMode();
  const isPresentationMode = demoSettings.presentationMode;

  // In presentation mode, skip to demo results immediately
  useEffect(() => {
    if (isPresentationMode) {
      console.log('[Guide] Presentation mode active, showing demo results');
      setAnswers(DEMO_ANSWERS);
      setResultData({
        scores: DEMO_SCORES,
        resultType: 'high_pressure',
        answers: DEMO_ANSWERS
      });
      setCurrentStep(3);
    }
  }, [isPresentationMode]);

  // Load user's Greek council for personalized scenarios (skip in presentation mode)
  useEffect(() => {
    const loadUserProfile = async () => {
      if (!user || isPresentationMode) return;
      
      const { data } = await supabase
        .from('profiles')
        .select('greek_council')
        .eq('id', user.id)
        .maybeSingle();
      
      if (data?.greek_council) {
        setUserCouncil(data.greek_council);
        
        // Get council-specific scenarios
        const orgScenarios = getScenariosForCouncil(data.greek_council);
        const formattedScenarios: Scenario[] = orgScenarios.map(s => ({
          value: s.id,
          label: s.title,
          description: s.description,
          councilSpecific: !s.councils.includes('all')
        }));
        setCouncilScenarios(formattedScenarios);
      }
    };
    
    loadUserProfile();
  }, [user]);

  useEffect(() => {
    const scenarioParam = searchParams.get('scenario');
    if (scenarioParam && ['clip', 'pressure', 'event'].includes(scenarioParam)) {
      setAnswers({ scenario: scenarioParam });
      setCurrentStep(2);
    }
  }, [searchParams]);

  const handleStep1Complete = (scenario: string) => {
    setAnswers({ ...answers, scenario });
    setCurrentStep(2);
  };

  const handleStep2Complete = async (stepAnswers: Partial<SacredGreeksAnswers>) => {
    const fullAnswers = { ...answers, ...stepAnswers } as SacredGreeksAnswers;
    setAnswers(fullAnswers);

    // Calculate scores
    const { scores, resultType } = calculateSacredGreeksScores(fullAnswers);

    // For authenticated users, save to database and award points
    if (user) {
      try {
        const { error } = await supabase.from('assessment_submissions').insert({
          track: 'sacred_greeks' as const,
          scenario: fullAnswers.scenario,
          answers_json: fullAnswers as any,
          scores_json: scores as any,
          result_type: resultType,
          user_id: user.id,
        });

        if (error) throw error;

        // Award points and check achievements
        await supabase.rpc("award_points", {
          _user_id: user.id,
          _points: 20,
          _action_type: "assessment",
        });

        await invokeCheckAchievements({ userId: user.id, actionType: "assessment" });

        toast({
          title: "Assessment Saved!",
          description: "Your results have been saved to your history. +20 points earned!",
        });
      } catch (error) {
        console.error('Error saving assessment:', error);
        // Continue to show results even if save fails
      }
    }

    // Show results (limited for non-authenticated users)
    setResultData({ scores, resultType, answers: fullAnswers });
    setCurrentStep(3);
  };

  const handleRestart = () => {
    setCurrentStep(1);
    setAnswers({});
    setResultData(null);
  };

  const councilContent = userCouncil ? getCouncilContent(userCouncil) : null;

  return (
    <PremiumGate featureName="Response Coach">
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <Home className="w-4 h-4" />
              <span className="text-sm font-medium">Dashboard</span>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-sacred"></div>
              <h1 className="text-lg font-semibold text-foreground">How to Handle BGLO Objections</h1>
              {userCouncil && councilContent && (
                <Badge variant="secondary" className="ml-2 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  {councilContent.name}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Progress Stepper */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <ProgressStepper steps={steps} currentStep={currentStep} />
        </div>
      </div>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {currentStep === 1 && (
            <SacredGreeksStep1 
              onComplete={handleStep1Complete}
              scenarios={councilScenarios.length > 0 ? councilScenarios : undefined}
              councilName={councilContent?.name}
            />
          )}
          
          {currentStep === 2 && answers.scenario && (
            <SacredGreeksStep2
              scenario={answers.scenario}
              onComplete={handleStep2Complete}
              onBack={() => setCurrentStep(1)}
            />
          )}

          {currentStep === 3 && resultData && (
            <SacredGreeksResults
              resultType={resultData.resultType}
              scores={resultData.scores}
              answers={resultData.answers}
              onRestart={handleRestart}
              limitedAccess={!user}
            />
          )}
        </div>
      </main>
    </div>
    </PremiumGate>
  );
};

export default Guide;
