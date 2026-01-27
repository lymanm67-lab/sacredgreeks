import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  Info, 
  ChevronDown, 
  Clock, 
  Target, 
  CheckCircle2, 
  HelpCircle,
  Award,
  Volume2
} from "lucide-react";
import { AssessmentTTS } from "./AssessmentTTS";

interface AssessmentInstructionsProps {
  title: string;
  description: string;
  estimatedTime: string;
  questionCount: number;
  benefits: string[];
  howToComplete: string[];
  whatResultsMean: string;
  ttsText?: string;
  onStart?: () => void;
}

export function AssessmentInstructions({
  title,
  description,
  estimatedTime,
  questionCount,
  benefits,
  howToComplete,
  whatResultsMean,
  ttsText,
  onStart
}: AssessmentInstructionsProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const fullTTSText = ttsText || `
    Welcome to the ${title}. ${description}. 
    This assessment takes approximately ${estimatedTime} and has ${questionCount} questions.
    Benefits of taking this assessment include: ${benefits.join(". ")}.
    Here's how to complete it: ${howToComplete.join(". ")}.
    About your results: ${whatResultsMean}
  `;

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-muted/50 to-muted/30">
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/30 transition-colors rounded-t-lg">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Info className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Assessment Instructions</CardTitle>
                  <CardDescription>Learn what to expect and how your results will help you</CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {ttsText && (
                  <AssessmentTTS 
                    text={fullTTSText} 
                    itemId="assessment-instructions" 
                    title="Assessment Instructions"
                    variant="button"
                    label="Listen"
                  />
                )}
                <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${isExpanded ? "rotate-180" : ""}`} />
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="space-y-6">
            {/* Quick Stats */}
            <div className="flex flex-wrap gap-3">
              <Badge variant="outline" className="flex items-center gap-1.5 px-3 py-1.5">
                <Clock className="w-3.5 h-3.5" />
                {estimatedTime}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1.5 px-3 py-1.5">
                <HelpCircle className="w-3.5 h-3.5" />
                {questionCount} Questions
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1.5 px-3 py-1.5">
                <Award className="w-3.5 h-3.5" />
                Earn Points
              </Badge>
            </div>

            {/* Description */}
            <div>
              <p className="text-muted-foreground">{description}</p>
            </div>

            {/* Benefits */}
            <div>
              <h4 className="font-semibold flex items-center gap-2 mb-3">
                <Target className="w-4 h-4 text-primary" />
                Why Take This Assessment?
              </h4>
              <ul className="space-y-2">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            {/* How to Complete */}
            <div>
              <h4 className="font-semibold flex items-center gap-2 mb-3">
                <HelpCircle className="w-4 h-4 text-primary" />
                How to Complete
              </h4>
              <ol className="space-y-2">
                {howToComplete.map((step, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-medium">
                      {index + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            {/* What Results Mean */}
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
              <h4 className="font-semibold flex items-center gap-2 mb-2">
                <Award className="w-4 h-4 text-primary" />
                Understanding Your Results
              </h4>
              <p className="text-sm text-muted-foreground">{whatResultsMean}</p>
            </div>

            {onStart && (
              <Button onClick={onStart} className="w-full" size="lg">
                Begin Assessment
              </Button>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
