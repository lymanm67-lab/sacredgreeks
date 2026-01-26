import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useLandingABTest } from "@/hooks/use-landing-ab-test";
import logo from "@/assets/sacred-greeks-logo.png";
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Heart,
  Users,
  BookOpen,
  Shield,
  Flame,
  Target
} from "lucide-react";

interface Question {
  id: number;
  text: string;
  subtext?: string;
  options: {
    text: string;
    value: string;
    icon?: React.ElementType;
  }[];
  multiSelect?: boolean;
}

const questions: Question[] = [
  {
    id: 1,
    text: "Where are you on your faith journey?",
    subtext: "No judgment — just want to meet you where you are",
    options: [
      { text: "Strong and steady", value: "strong", icon: Flame },
      { text: "Growing but struggling", value: "growing", icon: Target },
      { text: "Curious but uncertain", value: "curious", icon: BookOpen },
      { text: "Feeling disconnected", value: "disconnected", icon: Heart },
    ],
  },
  {
    id: 2,
    text: "What's your biggest challenge in Greek life?",
    subtext: "Select the one that resonates most",
    options: [
      { text: "Balancing chapter expectations with my faith", value: "balance" },
      { text: "Finding brothers/sisters who share my values", value: "community" },
      { text: "Defending my decision to join to family/church", value: "defending" },
      { text: "Staying consistent in my spiritual practices", value: "consistency" },
    ],
  },
  {
    id: 3,
    text: "What would help you most right now?",
    subtext: "We'll personalize your experience based on this",
    multiSelect: true,
    options: [
      { text: "Daily devotionals for Greeks", value: "devotionals", icon: BookOpen },
      { text: "Biblical responses to criticisms", value: "responses", icon: Shield },
      { text: "Community of like-minded Greeks", value: "community", icon: Users },
      { text: "Practical faith integration tips", value: "practical", icon: Target },
    ],
  },
  {
    id: 4,
    text: "How often do you engage with Scripture?",
    options: [
      { text: "Daily", value: "daily" },
      { text: "A few times a week", value: "weekly" },
      { text: "Occasionally", value: "occasionally" },
      { text: "Rarely / trying to start", value: "rarely" },
    ],
  },
  {
    id: 5,
    text: "Are you part of a Greek organization?",
    options: [
      { text: "Yes, active member", value: "active" },
      { text: "Yes, alumni", value: "alumni" },
      { text: "Going through intake/pledging", value: "pledging" },
      { text: "Interested / rushing", value: "interested" },
    ],
  },
];

interface SnapshotResult {
  primaryFocus: string;
  focusDescription: string;
  recommendedPath: string[];
  faithScore: number;
}

const calculateResults = (answers: Record<number, string | string[]>): SnapshotResult => {
  const journeyStage = answers[1] as string;
  const challenge = answers[2] as string;
  const needs = answers[3] as string[];
  const scriptureFreq = answers[4] as string;

  // Calculate faith engagement score (0-100)
  let score = 50;
  if (journeyStage === "strong") score += 20;
  else if (journeyStage === "growing") score += 10;
  else if (journeyStage === "curious") score += 5;
  
  if (scriptureFreq === "daily") score += 25;
  else if (scriptureFreq === "weekly") score += 15;
  else if (scriptureFreq === "occasionally") score += 5;

  // Determine primary focus
  let primaryFocus = "Spiritual Foundation";
  let focusDescription = "Building a stronger daily connection with God while thriving in Greek life.";
  
  if (challenge === "defending") {
    primaryFocus = "Apologetics & Confidence";
    focusDescription = "Equipping you with biblical wisdom to confidently navigate tough conversations.";
  } else if (challenge === "community") {
    primaryFocus = "Faith Community";
    focusDescription = "Connecting you with like-minded Greeks who share your values and journey.";
  } else if (challenge === "balance") {
    primaryFocus = "Integration & Balance";
    focusDescription = "Practical strategies to honor both your faith and fraternity commitments.";
  }

  // Build recommended path
  const recommendedPath: string[] = [];
  if (needs?.includes("devotionals")) recommendedPath.push("Daily Devotionals");
  if (needs?.includes("responses")) recommendedPath.push("PROOF Framework Course");
  if (needs?.includes("community")) recommendedPath.push("Prayer Community");
  if (needs?.includes("practical")) recommendedPath.push("Faith Integration Guide");
  
  if (recommendedPath.length === 0) {
    recommendedPath.push("Daily Devotionals", "Getting Started Guide");
  }

  return {
    primaryFocus,
    focusDescription,
    recommendedPath,
    faithScore: Math.min(100, Math.max(0, score)),
  };
};

export default function FaithSnapshot() {
  const navigate = useNavigate();
  const { trackConversion } = useLandingABTest();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<SnapshotResult | null>(null);

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleSelect = (value: string) => {
    const q = questions[currentQuestion];
    
    if (q.multiSelect) {
      const current = (answers[q.id] as string[]) || [];
      if (current.includes(value)) {
        setAnswers({ ...answers, [q.id]: current.filter(v => v !== value) });
      } else {
        setAnswers({ ...answers, [q.id]: [...current, value] });
      }
    } else {
      setAnswers({ ...answers, [q.id]: value });
    }
  };

  const isSelected = (value: string) => {
    const answer = answers[question.id];
    if (Array.isArray(answer)) {
      return answer.includes(value);
    }
    return answer === value;
  };

  const canProceed = () => {
    const answer = answers[question.id];
    if (question.multiSelect) {
      return Array.isArray(answer) && answer.length > 0;
    }
    return !!answer;
  };

  const handleNext = async () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate and show results
      const calculatedResults = calculateResults(answers);
      setResults(calculatedResults);
      setShowResults(true);
      await trackConversion('snapshot_completed');
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSignup = async () => {
    await trackConversion('signup_started');
    // Store snapshot results for personalization
    sessionStorage.setItem('snapshot_results', JSON.stringify(results));
    navigate('/auth?mode=signup');
  };

  if (showResults && results) {
    return (
      <div className="min-h-screen bg-[hsl(225,50%,8%)] flex flex-col">
        <header className="border-b border-slate-700/50 bg-[hsl(225,50%,8%)]/95 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 h-14">
              <img src={logo} alt="Sacred Greeks" className="h-8 w-8 rounded-full object-cover" />
              <span className="font-semibold text-white">Sacred Greeks</span>
            </div>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center px-4 py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg"
          >
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                </div>
                <Badge className="w-fit mx-auto mb-2 bg-green-500/20 text-green-400 border-green-500/30">
                  Your Faith Snapshot
                </Badge>
                <CardTitle className="text-2xl text-white">{results.primaryFocus}</CardTitle>
                <CardDescription className="text-slate-400">
                  {results.focusDescription}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Faith Engagement Score */}
                <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-700/50">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-slate-400">Faith Engagement Score</span>
                    <span className="text-lg font-bold text-white">{results.faithScore}%</span>
                  </div>
                  <Progress value={results.faithScore} className="h-2" />
                  <p className="text-xs text-slate-500 mt-2">
                    {results.faithScore >= 70 
                      ? "You're on a strong path! Let's help you go deeper." 
                      : results.faithScore >= 40 
                        ? "Great foundation! We'll help you build consistency." 
                        : "Perfect time to start! We're here to guide you."}
                  </p>
                </div>

                {/* Recommended Path */}
                <div>
                  <h3 className="text-sm font-medium text-white mb-3">Your Recommended Path</h3>
                  <div className="space-y-2">
                    {results.recommendedPath.map((item, index) => (
                      <div 
                        key={index}
                        className="flex items-center gap-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20"
                      >
                        <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0" />
                        <span className="text-slate-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <Button
                  size="lg"
                  onClick={handleSignup}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-6 text-lg rounded-xl"
                >
                  Create Free Account
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>

                <p className="text-center text-sm text-slate-500">
                  Your personalized dashboard is ready — just sign up to access it
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[hsl(225,50%,8%)] flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-[hsl(225,50%,8%)]/95 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-2">
              <img src={logo} alt="Sacred Greeks" className="h-8 w-8 rounded-full object-cover" />
              <span className="font-semibold text-white">Sacred Greeks</span>
            </div>
            <span className="text-sm text-slate-400">
              Faith Snapshot Assessment
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">
          {/* Progress */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-slate-400 mb-2">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={question.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="bg-slate-800/50 border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-xl text-white">{question.text}</CardTitle>
                  {question.subtext && (
                    <CardDescription className="text-slate-400">
                      {question.subtext}
                    </CardDescription>
                  )}
                  {question.multiSelect && (
                    <Badge variant="outline" className="w-fit text-blue-400 border-blue-400/50">
                      Select all that apply
                    </Badge>
                  )}
                </CardHeader>

                <CardContent className="space-y-3">
                  {question.options.map((option) => {
                    const Icon = option.icon;
                    const selected = isSelected(option.value);
                    
                    return (
                      <button
                        key={option.value}
                        onClick={() => handleSelect(option.value)}
                        className={`w-full p-4 rounded-lg border text-left transition-all flex items-center gap-3 ${
                          selected
                            ? "bg-blue-500/20 border-blue-500/50 text-white"
                            : "bg-slate-900/50 border-slate-700/50 text-slate-300 hover:border-slate-600"
                        }`}
                      >
                        {Icon && <Icon className={`w-5 h-5 ${selected ? "text-blue-400" : "text-slate-500"}`} />}
                        <span className="flex-1">{option.text}</span>
                        {selected && <CheckCircle2 className="w-5 h-5 text-blue-400" />}
                      </button>
                    );
                  })}
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between mt-6">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={currentQuestion === 0}
              className="text-slate-400 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
            >
              {currentQuestion === questions.length - 1 ? "See Results" : "Continue"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
