import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProgressStepper } from "@/components/ui/progress-stepper";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { ComplianceStep1 } from "@/components/compliance/ComplianceStep1";
import { ComplianceStep2 } from "@/components/compliance/ComplianceStep2";
import { ComplianceResults } from "@/components/compliance/ComplianceResults";
import { ComplianceAnswers } from "@/types/assessment";
import { calculateComplianceScores } from "@/lib/scoring";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const steps = [
  { label: "Scenario", description: "Choose your situation" },
  { label: "Questions", description: "Answer key questions" },
  { label: "Results", description: "Get your guidance" },
];

const Compliance = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Partial<ComplianceAnswers>>({});
  const [resultData, setResultData] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleStep1Complete = (scenario: string) => {
    setAnswers({ ...answers, scenario });
    setCurrentStep(2);
  };

  const handleStep2Complete = async (stepAnswers: Partial<ComplianceAnswers>) => {
    const fullAnswers = { ...answers, ...stepAnswers } as ComplianceAnswers;
    setAnswers(fullAnswers);

    // Calculate scores
    const { scores, resultType } = calculateComplianceScores(fullAnswers);

    // Save to database
    try {
      const { error } = await supabase.from('assessment_submissions').insert({
        track: 'compliance' as const,
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
              <div className="w-3 h-3 rounded-full bg-compliance"></div>
              <h1 className="text-lg font-semibold text-foreground">FDCA Compliance Checker</h1>
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
            <ComplianceStep1 onComplete={handleStep1Complete} />
          )}
          
          {currentStep === 2 && answers.scenario && (
            <ComplianceStep2
              scenario={answers.scenario}
              onComplete={handleStep2Complete}
              onBack={() => setCurrentStep(1)}
            />
          )}

          {currentStep === 3 && resultData && (
            <ComplianceResults
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

export default Compliance;
