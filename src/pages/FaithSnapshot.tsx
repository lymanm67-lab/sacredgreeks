import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLandingABTest } from "@/hooks/use-landing-ab-test";
import { AssessmentTTS } from "@/components/assessment/AssessmentTTS";
import { AssessmentInstructions } from "@/components/assessment/AssessmentInstructions";
import { AssessmentResultsPanel } from "@/components/assessment/AssessmentResultsPanel";
import { useAuth } from "@/contexts/AuthContext";
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
  Target,
  MessageCircle,
  Home,
  Church,
  HelpCircle,
  Compass
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

// Revised questions focusing on faith journey and handling criticisms
const questions: Question[] = [
  {
    id: 1,
    text: "Where are you in your Greek life journey?",
    subtext: "We want to meet you exactly where you are",
    options: [
      { text: "Active member of a fraternity/sorority", value: "active", icon: Users },
      { text: "Thinking about joining (rushing/intake)", value: "interested", icon: Compass },
      { text: "Alumni who's still connected", value: "alumni", icon: Home },
      { text: "Just exploring what Greek life is about", value: "exploring", icon: HelpCircle },
    ],
  },
  {
    id: 2,
    text: "What's your biggest faith-related struggle with Greek life?",
    subtext: "Be honest — this is a judgment-free zone",
    options: [
      { text: "Family or church members criticizing my decision", value: "family_criticism", icon: Home },
      { text: "Feeling like I have to choose between faith and fraternity", value: "torn", icon: Heart },
      { text: "Defending Greek life to people who don't understand", value: "defending", icon: Shield },
      { text: "Wondering if it's spiritually okay to join/stay", value: "questioning", icon: Church },
    ],
  },
  {
    id: 3,
    text: "What criticism have you faced (or worry about facing)?",
    subtext: "Select all that apply",
    multiSelect: true,
    options: [
      { text: '"Greek life is just about partying"', value: "partying", icon: MessageCircle },
      { text: '"Those rituals seem un-Christian"', value: "rituals", icon: Shield },
      { text: '"You\'re paying for friends"', value: "paying", icon: MessageCircle },
      { text: '"It\'s a distraction from your faith"', value: "distraction", icon: Church },
    ],
  },
  {
    id: 4,
    text: "How confident are you defending your Greek life decision?",
    subtext: "When someone challenges you about being in a fraternity/sorority...",
    options: [
      { text: "Very confident — I have solid biblical backing", value: "confident", icon: Shield },
      { text: "Somewhat confident — I believe it's fine but struggle to explain", value: "somewhat", icon: Target },
      { text: "Not confident — I avoid the conversation", value: "not_confident", icon: MessageCircle },
      { text: "Honestly unsure — I'm still figuring it out myself", value: "unsure", icon: Compass },
    ],
  },
  {
    id: 5,
    text: "What would help you most right now?",
    subtext: "We'll customize your experience based on this",
    multiSelect: true,
    options: [
      { text: "Biblical responses to common criticisms", value: "responses", icon: BookOpen },
      { text: "Understanding which symbols/rituals are okay", value: "symbols", icon: Shield },
      { text: "Connecting with other faith-focused Greeks", value: "community", icon: Users },
      { text: "Daily devotionals that relate to Greek life", value: "devotionals", icon: Flame },
    ],
  },
  {
    id: 6,
    text: "Where are you on your personal faith journey?",
    subtext: "No right or wrong answer here",
    options: [
      { text: "Strong and growing — faith is central to my life", value: "strong", icon: Flame },
      { text: "Solid but struggling — life's been challenging lately", value: "struggling", icon: Target },
      { text: "Exploring — trying to figure out what I believe", value: "exploring", icon: Compass },
      { text: "Distant — used to be closer to God", value: "distant", icon: Heart },
    ],
  },
];

interface SnapshotResult {
  primaryFocus: string;
  focusDescription: string;
  recommendedPath: string[];
  faithScore: number;
  archetype: string;
}

const calculateResults = (answers: Record<number, string | string[]>): SnapshotResult => {
  const greekStatus = answers[1] as string;
  const struggle = answers[2] as string;
  const criticisms = answers[3] as string[];
  const confidence = answers[4] as string;
  const needs = answers[5] as string[];
  const faithJourney = answers[6] as string;

  // Calculate confidence and faith score
  let score = 40;
  
  // Faith journey contribution
  if (faithJourney === "strong") score += 30;
  else if (faithJourney === "struggling") score += 20;
  else if (faithJourney === "exploring") score += 10;
  else score += 5;

  // Confidence contribution  
  if (confidence === "confident") score += 25;
  else if (confidence === "somewhat") score += 15;
  else if (confidence === "not_confident") score += 5;
  else score += 0;

  // Determine archetype and primary focus
  let archetype = "Faith Seeker";
  let primaryFocus = "Building Your Foundation";
  let focusDescription = "You're at the perfect starting point to integrate faith with Greek life.";

  if (struggle === "family_criticism" || struggle === "defending") {
    archetype = "Apologetics Ready";
    primaryFocus = "Confident Defense";
    focusDescription = "You need clear, biblical responses to handle criticism from family, church, or others.";
  } else if (struggle === "torn" || struggle === "questioning") {
    archetype = "Seeking Clarity";
    primaryFocus = "Faith Integration";
    focusDescription = "You're wrestling with important questions about faith and Greek life — and we're here to help.";
  }

  // If rituals criticism is selected, emphasize symbol understanding
  if (criticisms?.includes("rituals")) {
    primaryFocus = "Symbol & Ritual Understanding";
    focusDescription = "You need clarity on what's spiritually acceptable in Greek life symbols and ceremonies.";
  }

  // Build recommended path based on needs
  const recommendedPath: string[] = [];
  
  if (needs?.includes("responses")) {
    recommendedPath.push("PROOF Framework: Biblical Responses to Critics");
  }
  if (needs?.includes("symbols")) {
    recommendedPath.push("Greek Symbols Guide: What's Okay & What's Not");
  }
  if (needs?.includes("community")) {
    recommendedPath.push("Connect with Faith-Focused Greeks");
  }
  if (needs?.includes("devotionals")) {
    recommendedPath.push("Daily Devotionals for Greeks");
  }
  
  if (recommendedPath.length === 0) {
    recommendedPath.push("Getting Started Guide", "Daily Devotionals");
  }

  return {
    primaryFocus,
    focusDescription,
    recommendedPath,
    faithScore: Math.min(100, Math.max(0, score)),
    archetype,
  };
};

// TTS content for the assessment
const introTTSText = `Welcome to the Faith Snapshot Assessment. This quick 6-question assessment will help you discover where you are on your faith journey as a member of Greek life. We'll identify your biggest challenges, understand the criticisms you face, and create a personalized path to help you confidently integrate your faith with your fraternity or sorority experience. There are no wrong answers. Just be honest and we'll meet you exactly where you are.`;

const generateResultsTTSText = (result: SnapshotResult) => {
  const scoreInterpretation = result.faithScore >= 70 
    ? "You have a strong foundation that we'll help make unshakeable." 
    : result.faithScore >= 40 
      ? "You're on the right track, and we'll help you grow in confidence." 
      : "Perfect timing! We're here to equip you with the answers you need.";

  return `Your Faith Snapshot Results. Based on your responses, you are identified as: ${result.archetype}. Your primary focus area is: ${result.primaryFocus}. ${result.focusDescription}. Your Faith Confidence Score is ${result.faithScore} percent. ${scoreInterpretation}. We've created a personalized path for you, including: ${result.recommendedPath.join(', ')}. Create your free account to access your personalized dashboard and start your journey.`;
};

const instructionsConfig = {
  title: "Faith Snapshot Assessment",
  description: "This quick 6-question assessment helps you discover where you are on your faith journey as a Greek life member. We'll identify your biggest challenges and create a personalized path forward.",
  estimatedTime: "2-3 minutes",
  questionCount: 6,
  benefits: [
    "Discover your unique faith archetype",
    "Get your Faith Confidence Score",
    "Receive personalized resource recommendations",
    "Understand your specific challenges and strengths"
  ],
  howToComplete: [
    "Answer honestly — there are no wrong answers",
    "Some questions allow multiple selections",
    "Consider your real experiences and concerns",
    "Your results will guide your personalized learning path"
  ],
  whatResultsMean: "Your Faith Confidence Score (0-100%) reflects how equipped you are to integrate faith with Greek life. Your archetype identifies your primary challenge area, and your personalized path provides resources tailored to your specific needs."
};

export default function FaithSnapshot() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { trackConversion } = useLandingABTest();
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<SnapshotResult | null>(null);

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  // Generate question TTS text
  const questionTTSText = useMemo(() => {
    const q = questions[currentQuestion];
    const optionsText = q.options.map((opt, i) => `Option ${i + 1}: ${opt.text}`).join('. ');
    return `Question ${currentQuestion + 1} of ${questions.length}. ${q.text}. ${q.subtext || ''}. ${q.multiSelect ? 'You can select multiple options.' : 'Choose one option.'} ${optionsText}`;
  }, [currentQuestion]);

  // Generate results TTS text
  const resultsTTSText = useMemo(() => {
    if (results) {
      return generateResultsTTSText(results);
    }
    return '';
  }, [results]);

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

  // Show instructions first
  if (!started) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[hsl(225,50%,8%)] via-[hsl(250,40%,12%)] to-[hsl(225,50%,8%)] flex flex-col">
        <header className="border-b border-purple-500/20 bg-[hsl(225,50%,8%)]/95 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 h-14">
              <img src={logo} alt="Sacred Greeks" className="h-8 w-8 rounded-full object-cover" />
              <span className="font-semibold text-white">Sacred Greeks</span>
            </div>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-lg">
            <AssessmentInstructions
              {...instructionsConfig}
              ttsText={introTTSText}
              onStart={() => setStarted(true)}
            />
          </div>
        </main>
      </div>
    );
  }

  if (showResults && results) {
    const sections = [
      {
        title: "Your Focus Area",
        content: results.focusDescription
      },
      {
        title: "Score Interpretation",
        content: results.faithScore >= 70 
          ? "You have a strong foundation — let's make it unshakeable." 
          : results.faithScore >= 40 
            ? "You're on the right track. We'll help you grow in confidence." 
            : "Perfect timing! We're here to equip you with answers."
      },
      {
        title: "Your Personalized Path",
        content: "Based on your responses, we recommend focusing on these resources:",
        items: results.recommendedPath
      }
    ];

    return (
      <div className="min-h-screen bg-gradient-to-br from-[hsl(225,50%,8%)] via-[hsl(250,40%,12%)] to-[hsl(225,50%,8%)] flex flex-col">
        <header className="border-b border-purple-500/20 bg-[hsl(225,50%,8%)]/95 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 h-14">
              <img src={logo} alt="Sacred Greeks" className="h-8 w-8 rounded-full object-cover" />
              <span className="font-semibold text-white">Sacred Greeks</span>
            </div>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-lg space-y-6">
            <AssessmentResultsPanel
              assessmentType="faith-snapshot"
              assessmentTitle="Faith Snapshot Assessment"
              resultTitle={results.primaryFocus}
              resultSubtitle={results.focusDescription}
              score={results.faithScore}
              scoreLabel="Faith Confidence Score"
              archetype={results.archetype}
              sections={sections}
              recommendations={results.recommendedPath}
              ttsText={resultsTTSText}
              icon={<Sparkles className="w-8 h-8 text-white" />}
              colorScheme="amber"
              additionalData={{ answers }}
            />

            {/* CTA - Show different options for logged in vs logged out users */}
            {user ? (
              <Button
                size="lg"
                onClick={() => navigate('/dashboard')}
                className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 hover:from-amber-600 hover:via-orange-600 hover:to-pink-600 text-white font-semibold py-6 text-lg rounded-xl shadow-lg shadow-orange-500/25"
              >
                Go to Dashboard
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            ) : (
              <>
                <Button
                  size="lg"
                  onClick={handleSignup}
                  className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 hover:from-amber-600 hover:via-orange-600 hover:to-pink-600 text-white font-semibold py-6 text-lg rounded-xl shadow-lg shadow-orange-500/25"
                >
                  Get Your Free Access
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>

                <p className="text-center text-sm text-slate-400">
                  Your personalized dashboard is ready — create your free account to access it
                </p>
              </>
            )}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(225,50%,8%)] via-[hsl(250,40%,12%)] to-[hsl(225,50%,8%)] flex flex-col">
      {/* Header */}
      <header className="border-b border-purple-500/20 bg-[hsl(225,50%,8%)]/95 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-2">
              <img src={logo} alt="Sacred Greeks" className="h-8 w-8 rounded-full object-cover" />
              <span className="font-semibold text-white">Sacred Greeks</span>
            </div>
            <Badge variant="outline" className="text-purple-300 border-purple-500/50">
              Faith Snapshot
            </Badge>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">
          {/* Progress */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-purple-300 mb-2">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <div className="h-2 bg-purple-900/50 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
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
              <Card className="bg-gradient-to-br from-slate-800/80 to-purple-900/30 border-purple-500/30 shadow-xl">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-xl text-white flex-1">{question.text}</CardTitle>
                    <AssessmentTTS 
                      text={currentQuestion === 0 ? `${introTTSText} ${questionTTSText}` : questionTTSText} 
                      itemId={`question-${currentQuestion}`} 
                      title={`Question ${currentQuestion + 1}`}
                    />
                  </div>
                  {question.subtext && (
                    <CardDescription className="text-purple-200/80">
                      {question.subtext}
                    </CardDescription>
                  )}
                  {question.multiSelect && (
                    <Badge variant="outline" className="w-fit text-amber-400 border-amber-400/50">
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
                            ? "bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-500/50 text-white"
                            : "bg-purple-900/30 border-purple-500/30 text-slate-300 hover:border-purple-400/50 hover:bg-purple-900/50"
                        }`}
                      >
                        {Icon && <Icon className={`w-5 h-5 ${selected ? "text-amber-400" : "text-purple-400"}`} />}
                        <span className="flex-1">{option.text}</span>
                        {selected && <CheckCircle2 className="w-5 h-5 text-amber-400" />}
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
              className="text-purple-300 hover:text-white hover:bg-purple-900/50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 hover:from-amber-600 hover:via-orange-600 hover:to-pink-600 text-white"
            >
              {currentQuestion === questions.length - 1 ? "See My Results" : "Continue"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
