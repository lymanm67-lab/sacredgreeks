import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  Bot, 
  Send, 
  Loader2, 
  CheckCircle2, 
  AlertTriangle, 
  Lightbulb,
  Heart,
  MessageCircle,
  Copy,
  RefreshCw,
  Sparkles
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface FeedbackData {
  overallRating: "excellent" | "good" | "needs-work" | "concerning";
  toneAnalysis: {
    score: number;
    description: string;
    concerns: string[];
  };
  approachAnalysis: {
    score: number;
    description: string;
    strengths: string[];
    weaknesses: string[];
  };
  relationshipImpact: {
    score: number;
    description: string;
  };
  suggestions: Array<{
    issue: string;
    suggestion: string;
    example: string;
  }>;
  improvedResponse: string;
  keyTakeaway: string;
}

const scenarios = [
  { value: "parent", label: "Responding to a Parent", context: "A family member (parent, grandparent, etc.) expressing concern about your BGLO membership" },
  { value: "pastor", label: "Responding to a Pastor", context: "A church leader questioning your involvement or ministry eligibility" },
  { value: "social-media", label: "Responding to Social Media", context: "Someone tagging you in denouncement content or making public accusations" },
  { value: "friend", label: "Responding to a Friend", context: "A friend sending you videos or articles about BGLOs being 'demonic'" },
  { value: "announcing", label: "Announcing a Decision", context: "Sharing your decision to stay or leave your organization publicly or privately" },
  { value: "other", label: "Other Situation", context: "A different challenging conversation about your faith and Greek life" }
];

const ratingColors = {
  excellent: "bg-green-100 text-green-700 border-green-300",
  good: "bg-blue-100 text-blue-700 border-blue-300",
  "needs-work": "bg-amber-100 text-amber-700 border-amber-300",
  concerning: "bg-red-100 text-red-700 border-red-300"
};

const ratingLabels = {
  excellent: "Excellent Response",
  good: "Good Approach",
  "needs-work": "Needs Refinement",
  concerning: "Reconsider This"
};

export function ResponseCoach() {
  const { toast } = useToast();
  const [scenario, setScenario] = useState<string>("");
  const [customContext, setCustomContext] = useState("");
  const [userResponse, setUserResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackData | null>(null);

  const getContext = () => {
    const selectedScenario = scenarios.find(s => s.value === scenario);
    if (scenario === "other") {
      return customContext || "General conversation about BGLO membership";
    }
    return selectedScenario?.context || "";
  };

  const handleSubmit = async () => {
    if (!scenario || !userResponse.trim()) {
      toast({
        title: "Missing Information",
        description: "Please select a scenario and enter your planned response.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    setFeedback(null);

    try {
      const { data, error } = await supabase.functions.invoke('response-coach', {
        body: {
          userResponse: userResponse.trim(),
          context: getContext(),
          scenario: scenarios.find(s => s.value === scenario)?.label || scenario
        }
      });

      if (error) throw error;

      if (data?.feedback) {
        setFeedback(data.feedback);
      } else {
        throw new Error('No feedback received');
      }
    } catch (error: any) {
      console.error('Response coach error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to get AI feedback. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const copyImprovedResponse = () => {
    if (feedback?.improvedResponse) {
      navigator.clipboard.writeText(feedback.improvedResponse);
      toast({
        title: "Copied",
        description: "Improved response copied to clipboard"
      });
    }
  };

  const resetForm = () => {
    setFeedback(null);
    setUserResponse("");
  };

  return (
    <Card className="border-sacred/30 bg-gradient-to-br from-sacred/5 to-transparent">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Bot className="w-5 h-5 text-sacred" />
          AI Response Coach
        </CardTitle>
        <CardDescription>
          Get personalized feedback on what you're planning to say before you say it
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!feedback ? (
          <>
            {/* Scenario Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">What situation are you responding to?</label>
              <Select value={scenario} onValueChange={setScenario}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a scenario..." />
                </SelectTrigger>
                <SelectContent>
                  {scenarios.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {scenario === "other" && (
                <Textarea
                  placeholder="Describe the situation..."
                  value={customContext}
                  onChange={(e) => setCustomContext(e.target.value)}
                  className="mt-2"
                />
              )}
            </div>

            {/* User Response Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium">What are you planning to say or post?</label>
              <Textarea
                placeholder="Type your planned response here... Be honest about what you're actually thinking of saying."
                value={userResponse}
                onChange={(e) => setUserResponse(e.target.value)}
                className="min-h-[150px]"
              />
              <p className="text-xs text-muted-foreground">
                {userResponse.length} characters • The more detail you provide, the better feedback you'll receive
              </p>
            </div>

            {/* Submit Button */}
            <Button 
              onClick={handleSubmit} 
              disabled={loading || !scenario || !userResponse.trim()}
              className="w-full bg-sacred hover:bg-sacred/90"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing your response...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Get AI Feedback
                </>
              )}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              Your response is analyzed privately and not stored
            </p>
          </>
        ) : (
          /* Feedback Display */
          <div className="space-y-6">
            {/* Overall Rating */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Overall Assessment</h3>
                <p className="text-sm text-muted-foreground">{feedback.keyTakeaway}</p>
              </div>
              <Badge className={`${ratingColors[feedback.overallRating]} border px-3 py-1`}>
                {ratingLabels[feedback.overallRating]}
              </Badge>
            </div>

            {/* Score Cards */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-sacred">{feedback.toneAnalysis.score}/10</div>
                <p className="text-xs text-muted-foreground">Tone</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-sacred">{feedback.approachAnalysis.score}/10</div>
                <p className="text-xs text-muted-foreground">Approach</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-sacred">{feedback.relationshipImpact.score}/10</div>
                <p className="text-xs text-muted-foreground">Relationship</p>
              </div>
            </div>

            {/* Detailed Analysis */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="tone">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-sacred" />
                    <span>Tone Analysis</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{feedback.toneAnalysis.description}</p>
                  {feedback.toneAnalysis.concerns.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Concerns:</p>
                      <ul className="space-y-1">
                        {feedback.toneAnalysis.concerns.map((concern, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                            {concern}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="approach">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-sacred" />
                    <span>Approach Analysis</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{feedback.approachAnalysis.description}</p>
                  {feedback.approachAnalysis.strengths.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-green-600">Strengths:</p>
                      <ul className="space-y-1">
                        {feedback.approachAnalysis.strengths.map((strength, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {feedback.approachAnalysis.weaknesses.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-amber-600">Areas to Improve:</p>
                      <ul className="space-y-1">
                        {feedback.approachAnalysis.weaknesses.map((weakness, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                            {weakness}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="relationship">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-sacred" />
                    <span>Relationship Impact</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">{feedback.relationshipImpact.description}</p>
                </AccordionContent>
              </AccordionItem>

              {feedback.suggestions.length > 0 && (
                <AccordionItem value="suggestions">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-sacred" />
                      <span>Specific Suggestions ({feedback.suggestions.length})</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4">
                    {feedback.suggestions.map((suggestion, idx) => (
                      <div key={idx} className="bg-muted/30 rounded-lg p-4 space-y-2">
                        <p className="text-sm font-medium text-amber-600">{suggestion.issue}</p>
                        <p className="text-sm text-muted-foreground">{suggestion.suggestion}</p>
                        {suggestion.example && (
                          <div className="bg-green-50 dark:bg-green-950/30 rounded-lg p-3 border border-green-200 dark:border-green-800">
                            <p className="text-xs font-medium text-green-700 dark:text-green-400 mb-1">Better phrasing:</p>
                            <p className="text-sm italic">"{suggestion.example}"</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              )}
            </Accordion>

            {/* Improved Response */}
            {feedback.improvedResponse && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-sacred" />
                    Suggested Improved Response
                  </h4>
                  <Button variant="ghost" size="sm" onClick={copyImprovedResponse}>
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </Button>
                </div>
                <div className="bg-green-50 dark:bg-green-950/30 rounded-lg p-4 border border-green-200 dark:border-green-800">
                  <p className="text-sm whitespace-pre-wrap">{feedback.improvedResponse}</p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button variant="outline" onClick={resetForm} className="flex-1">
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Another Response
              </Button>
              <Button onClick={() => setUserResponse(feedback.improvedResponse || userResponse)} className="flex-1 bg-sacred hover:bg-sacred/90">
                Use Improved Version
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}