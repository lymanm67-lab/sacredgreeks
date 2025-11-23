import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProgressStepper } from "@/components/ui/progress-stepper";
import { Home } from "lucide-react";
import { SacredGreeksStep1 } from "@/components/sacred-greeks/SacredGreeksStep1";
import { SacredGreeksStep2 } from "@/components/sacred-greeks/SacredGreeksStep2";
import { SacredGreeksResults } from "@/components/sacred-greeks/SacredGreeksResults";
import { SacredGreeksAnswers } from "@/types/assessment";
import { calculateSacredGreeksScores } from "@/lib/scoring";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const steps = [
  { label: "Scenario", description: "Choose your situation" },
  { label: "Questions", description: "Share your story" },
  { label: "P.R.O.O.F.", description: "Receive guidance" },
];

const SacredGreeks = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Partial<SacredGreeksAnswers>>({});
  const [resultData, setResultData] = useState<any>(null);
  const { toast } = useToast();

  const handleStep1Complete = (scenario: string) => {
    setAnswers({ ...answers, scenario });
    setCurrentStep(2);
  };

  const handleStep2Complete = async (stepAnswers: Partial<SacredGreeksAnswers>) => {
    const fullAnswers = { ...answers, ...stepAnswers } as SacredGreeksAnswers;
    setAnswers(fullAnswers);

    // Calculate scores
    const { scores, resultType } = calculateSacredGreeksScores(fullAnswers);

    // Save to database
    try {
      const { error } = await supabase.from('assessment_submissions').insert({
        track: 'sacred_greeks' as const,
        scenario: fullAnswers.scenario,
        answers_json: fullAnswers as any,
        scores_json: scores as any,
        result_type: resultType,
      });

      if (error) throw error;

      setResultData({ scores, resultType, answers: fullAnswers });
      setCurrentStep(3);
    } catch (error) {
      console.error('Error saving submission:', error);
      toast({
        title: "Error",
        description: "Failed to save your assessment. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleRestart = () => {
    setCurrentStep(1);
    setAnswers({});
    setResultData(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <Home className="w-4 h-4" />
              <span className="text-sm font-medium">Home</span>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-sacred"></div>
              <h1 className="text-lg font-semibold text-foreground">Sacred Greeks Guide</h1>
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
            <SacredGreeksStep1 onComplete={handleStep1Complete} />
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
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default SacredGreeks;
