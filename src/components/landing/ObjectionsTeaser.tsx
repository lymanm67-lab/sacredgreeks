import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Lock, 
  ArrowRight, 
  MessageCircle, 
  Users, 
  Smartphone, 
  Church,
  Loader2,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Heart,
  Lightbulb
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Sample scenarios for the demo
const demoScenarios = [
  {
    icon: Users,
    value: "parent",
    label: "Family Member",
    objection: '"I saw a video saying BGLOs are demonic. How can you be a Christian and be in one?"',
    context: "A family member (parent, grandparent, etc.) expressing concern about your BGLO membership",
  },
  {
    icon: Church,
    value: "pastor",
    label: "Pastor",
    objection: '"We don\'t allow Greek members to serve in ministry leadership positions."',
    context: "A church leader questioning your involvement or ministry eligibility",
  },
  {
    icon: Smartphone,
    value: "social-media",
    label: "Social Media",
    objection: '"You were tagged: @user These organizations worship false gods. Wake up!"',
    context: "Someone tagging you in denouncement content or making public accusations",
  },
];

interface TeaserScores {
  tone: number;
  approach: number;
  relationship: number;
  overallRating: "excellent" | "good" | "needs-work" | "concerning";
}

const ratingColors = {
  excellent: "bg-green-100 text-green-700 border-green-300 dark:bg-green-950/50 dark:text-green-400 dark:border-green-800",
  good: "bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-950/50 dark:text-blue-400 dark:border-blue-800",
  "needs-work": "bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-950/50 dark:text-amber-400 dark:border-amber-800",
  concerning: "bg-red-100 text-red-700 border-red-300 dark:bg-red-950/50 dark:text-red-400 dark:border-red-800"
};

const ratingLabels = {
  excellent: "Excellent Response",
  good: "Good Approach",
  "needs-work": "Needs Refinement",
  concerning: "Reconsider This"
};

export function ObjectionsTeaser() {
  const { toast } = useToast();
  const [selectedScenario, setSelectedScenario] = useState(demoScenarios[0]);
  const [userResponse, setUserResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [scores, setScores] = useState<TeaserScores | null>(null);

  const handleAnalyze = async () => {
    if (!userResponse.trim()) {
      toast({
        title: "Enter your response",
        description: "Please type what you're planning to say first.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    setScores(null);

    try {
      const { data, error } = await supabase.functions.invoke('response-coach', {
        body: {
          userResponse: userResponse.trim(),
          context: selectedScenario.context,
          scenario: selectedScenario.label
        }
      });

      if (error) throw error;

      if (data?.feedback) {
        // Extract only the scores for the teaser
        setScores({
          tone: data.feedback.toneAnalysis?.score || 0,
          approach: data.feedback.approachAnalysis?.score || 0,
          relationship: data.feedback.relationshipImpact?.score || 0,
          overallRating: data.feedback.overallRating || "needs-work"
        });
      } else {
        throw new Error('No feedback received');
      }
    } catch (error: any) {
      console.error('Response coach error:', error);
      toast({
        title: "Analysis failed",
        description: "Please try again in a moment.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const resetDemo = () => {
    setScores(null);
    setUserResponse("");
  };

  return (
    <div className="bg-gradient-to-b from-background to-muted/30 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <Badge className="bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30 mb-4">
              Try It Free
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Handle <span className="gradient-text">BGLO Objections</span> with Grace
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get AI-powered coaching on how to respond. Try it now — see your scores instantly.
            </p>
          </div>

          {!scores ? (
            /* Interactive Input Form */
            <Card className="border-sacred/20 bg-gradient-to-br from-card to-muted/20 overflow-hidden">
              <CardContent className="p-6 md:p-8 space-y-6">
                {/* Scenario Selection */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Choose a scenario:</label>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {demoScenarios.map((scenario) => (
                      <button
                        key={scenario.value}
                        onClick={() => setSelectedScenario(scenario)}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${
                          selectedScenario.value === scenario.value
                            ? "border-sacred bg-sacred/10"
                            : "border-border hover:border-sacred/50 hover:bg-muted/50"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <scenario.icon className="w-4 h-4 text-sacred" />
                          <span className="font-medium text-sm">{scenario.label}</span>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {scenario.objection}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Selected Objection Display */}
                <div className="bg-muted/50 rounded-lg p-4 border border-border/50">
                  <p className="text-sm font-medium text-foreground mb-1">They said:</p>
                  <p className="text-muted-foreground italic">{selectedScenario.objection}</p>
                </div>

                {/* Response Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">What would you say back?</label>
                  <Textarea
                    placeholder="Type your response here... Be honest about what you're actually thinking of saying."
                    value={userResponse}
                    onChange={(e) => setUserResponse(e.target.value)}
                    className="min-h-[120px] resize-none"
                  />
                  <p className="text-xs text-muted-foreground">
                    {userResponse.length} characters • The more detail, the better your feedback
                  </p>
                </div>

                {/* Analyze Button */}
                <Button 
                  onClick={handleAnalyze} 
                  disabled={loading || !userResponse.trim()}
                  className="w-full bg-sacred hover:bg-sacred/90 text-sacred-foreground py-6 text-lg"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Analyzing your response...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Get My Score
                    </>
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Free to try • No account required for scores
                </p>
              </CardContent>
            </Card>
          ) : (
            /* Results Display - Scores Visible, Details Locked */
            <Card className="border-sacred/20 bg-gradient-to-br from-card to-muted/20 overflow-hidden">
              <CardContent className="p-6 md:p-8 space-y-6">
                {/* Overall Rating */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-border/50">
                  <div className="text-center sm:text-left">
                    <h3 className="text-xl font-bold">Your Response Analysis</h3>
                    <p className="text-sm text-muted-foreground">Based on what you said to: {selectedScenario.label}</p>
                  </div>
                  <Badge className={`${ratingColors[scores.overallRating]} border px-4 py-2 text-sm`}>
                    {ratingLabels[scores.overallRating]}
                  </Badge>
                </div>

                {/* Score Cards - VISIBLE */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-muted/50 rounded-xl p-4 text-center border border-border/50">
                    <MessageCircle className="w-5 h-5 mx-auto mb-2 text-sacred" />
                    <div className="text-3xl font-bold text-sacred">{scores.tone}/10</div>
                    <p className="text-xs text-muted-foreground font-medium">Tone</p>
                  </div>
                  <div className="bg-muted/50 rounded-xl p-4 text-center border border-border/50">
                    <Lightbulb className="w-5 h-5 mx-auto mb-2 text-sacred" />
                    <div className="text-3xl font-bold text-sacred">{scores.approach}/10</div>
                    <p className="text-xs text-muted-foreground font-medium">Approach</p>
                  </div>
                  <div className="bg-muted/50 rounded-xl p-4 text-center border border-border/50">
                    <Heart className="w-5 h-5 mx-auto mb-2 text-sacred" />
                    <div className="text-3xl font-bold text-sacred">{scores.relationship}/10</div>
                    <p className="text-xs text-muted-foreground font-medium">Relationship</p>
                  </div>
                </div>

                {/* Locked Content Preview */}
                <div className="space-y-3">
                  {/* Locked: Detailed Analysis */}
                  <div className="relative">
                    <div className="bg-muted/30 rounded-xl p-4 border border-border/50 blur-[2px] select-none pointer-events-none">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-medium">Strengths in your response</span>
                      </div>
                      <p className="text-sm text-muted-foreground">You showed empathy and acknowledged their concern which is important for...</p>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center bg-background/60 rounded-xl">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Lock className="w-4 h-4" />
                        <span>Detailed strengths analysis</span>
                      </div>
                    </div>
                  </div>

                  {/* Locked: Suggestions */}
                  <div className="relative">
                    <div className="bg-muted/30 rounded-xl p-4 border border-border/50 blur-[2px] select-none pointer-events-none">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-4 h-4 text-amber-500" />
                        <span className="text-sm font-medium">Areas to improve</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Consider adding a biblical reference to support your position. Also, the tone could be...</p>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center bg-background/60 rounded-xl">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Lock className="w-4 h-4" />
                        <span>Specific improvement tips</span>
                      </div>
                    </div>
                  </div>

                  {/* Locked: Improved Response */}
                  <div className="relative">
                    <div className="bg-green-50 dark:bg-green-950/30 rounded-xl p-4 border border-green-200 dark:border-green-800 blur-[2px] select-none pointer-events-none">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-4 h-4 text-sacred" />
                        <span className="text-sm font-medium text-green-700 dark:text-green-400">AI-Improved Response</span>
                      </div>
                      <p className="text-sm text-muted-foreground">"I appreciate you sharing your concern with me. I've actually researched this deeply and want to share what I've found. The Bible teaches us in 1 Thessalonians 5:21 to..."</p>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center bg-background/60 rounded-xl">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Lock className="w-4 h-4" />
                        <span>Copy-ready improved response</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA to Unlock */}
                <div className="bg-gradient-to-r from-sacred/10 via-purple-500/10 to-sacred/10 rounded-xl p-6 border border-sacred/20 text-center space-y-4">
                  <h4 className="text-lg font-bold">
                    Want to see your full report?
                  </h4>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    Sign up free to unlock detailed feedback, specific suggestions, and an AI-improved version of your response.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link to="/beta-signup">
                      <Button size="lg" className="bg-sacred hover:bg-sacred/90 text-sacred-foreground shadow-lg hover:shadow-xl transition-all w-full sm:w-auto">
                        <span>See Full Report</span>
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                    <Link to="/auth">
                      <Button size="lg" variant="outline" className="w-full sm:w-auto">
                        Already have an account?
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Try Again */}
                <button 
                  onClick={resetDemo}
                  className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  ← Try a different response
                </button>
              </CardContent>
            </Card>
          )}

          <p className="text-xs text-center text-muted-foreground mt-4">
            Free to sign up • No credit card required • Premium features available
          </p>
        </div>
      </div>
    </div>
  );
}
