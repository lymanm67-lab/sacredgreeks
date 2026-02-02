import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Target, 
  Sparkles, 
  Scale, 
  Eye, 
  Building, 
  ArrowRight, 
  ArrowLeft,
  BookOpen,
  RotateCcw,
  Loader2
} from "lucide-react";
import { AssessmentInstructions } from "@/components/assessment/AssessmentInstructions";
import { AssessmentResultsPanel } from "@/components/assessment/AssessmentResultsPanel";
import { AssessmentVisualReport } from "@/components/assessment/AssessmentVisualReport";
import { SavedAssessmentPrompt } from "@/components/assessment/SavedAssessmentPrompt";
import { AssessmentTTS } from "@/components/assessment/AssessmentTTS";
import { AssessmentBreadcrumb } from "@/components/assessment/AssessmentBreadcrumb";
import { useSavedAssessment } from "@/hooks/use-saved-assessment";
import { useAuth } from "@/contexts/AuthContext";
import { useDemoMode } from "@/contexts/DemoModeContext";

type ProofCategory = 'pledge-process' | 'rituals' | 'oaths' | 'obscurity' | 'founders';

interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    category: ProofCategory;
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "What criticism do you encounter most often about Greek life?",
    options: [
      { text: "It's just organized hazing", category: "pledge-process" },
      { text: "The rituals are demonic or occult", category: "rituals" },
      { text: "You're pledging allegiance to Greek gods", category: "oaths" },
      { text: "It's a secret society with hidden agendas", category: "obscurity" },
      { text: "The founders had questionable beliefs or Masonic ties", category: "founders" },
    ],
  },
  {
    id: 2,
    text: "Which concern comes up most in conversations with your church community?",
    options: [
      { text: "How pledging/intake process works", category: "pledge-process" },
      { text: "What happens in ceremonies", category: "rituals" },
      { text: "The meaning of oaths and vows", category: "oaths" },
      { text: "Why there are private/closed events", category: "obscurity" },
      { text: "Historical origins and founders", category: "founders" },
    ],
  },
  {
    id: 3,
    text: "When family members express concern, what do they usually focus on?",
    options: [
      { text: "Stories they've heard about hazing", category: "pledge-process" },
      { text: "Fear of spiritual harm from rituals", category: "rituals" },
      { text: "Commitment to something other than God", category: "oaths" },
      { text: "Not knowing what happens behind closed doors", category: "obscurity" },
      { text: "Who started these organizations and why", category: "founders" },
    ],
  },
  {
    id: 4,
    text: "Which topic would be most helpful for you to have a biblical response ready for?",
    options: [
      { text: "Explaining the difference between hazing and mentorship", category: "pledge-process" },
      { text: "Addressing fears about ceremonial practices", category: "rituals" },
      { text: "Clarifying what organizational oaths mean", category: "oaths" },
      { text: "Explaining why privacy isn't the same as secrecy", category: "obscurity" },
      { text: "Discussing founder backgrounds and redemption", category: "founders" },
    ],
  },
  {
    id: 5,
    text: "What aspect of Greek life do you feel least equipped to defend biblically?",
    options: [
      { text: "The intake/pledge process", category: "pledge-process" },
      { text: "Ritual and ceremonial practices", category: "rituals" },
      { text: "Organizational oaths and commitments", category: "oaths" },
      { text: "Private meetings and closed events", category: "obscurity" },
      { text: "Organizational history and founders", category: "founders" },
    ],
  },
];

const categoryInfo: Record<ProofCategory, {
  letter: string;
  word: string;
  criticism: string;
  description: string;
  icon: typeof Target;
  color: string;
  resources: { title: string; path: string }[];
}> = {
  'pledge-process': {
    letter: 'P',
    word: 'Pledge Process',
    criticism: 'Hazing Concerns',
    description: 'You most frequently encounter questions about hazing and the pledge/intake process. Focus on biblical mentorship principles and the difference between accountability and abuse.',
    icon: Target,
    color: 'from-blue-500 to-indigo-600',
    resources: [
      { title: 'P.R.O.O.F. Course - Pledge Process', path: '/proof-course' },
      { title: 'Anti-Hazing Resources', path: '/anti-hazing' },
    ],
  },
  'rituals': {
    letter: 'R',
    word: 'Rituals',
    criticism: 'Demonic Portal Claims',
    description: 'You face frequent questions about ceremonies and rituals. Focus on discerning the difference between cultural traditions and actual worship, using Scripture as your guide.',
    icon: Sparkles,
    color: 'from-purple-500 to-violet-600',
    resources: [
      { title: 'P.R.O.O.F. Course - Rituals', path: '/proof-course' },
      { title: 'MythBuster: Greek Rituals', path: '/myth-buster' },
    ],
  },
  'oaths': {
    letter: 'O',
    word: 'Oaths',
    criticism: 'Greek Deity Allegiance',
    description: 'You encounter concerns about oaths and commitments. Focus on explaining that using Greek letters doesn\'t mean worshiping Greek gods, and how Paul contextualized the Gospel.',
    icon: Scale,
    color: 'from-amber-500 to-orange-600',
    resources: [
      { title: 'P.R.O.O.F. Course - Oaths', path: '/proof-course' },
      { title: 'Oaths & Vows Guide', path: '/oaths-guide' },
    ],
  },
  'obscurity': {
    letter: 'O',
    word: 'Obscurity',
    criticism: 'Secret Society Claims',
    description: 'You deal with concerns about secrecy and private events. Focus on the biblical precedent for privacy (Jesus and His inner circle) while walking in the light.',
    icon: Eye,
    color: 'from-emerald-500 to-teal-600',
    resources: [
      { title: 'P.R.O.O.F. Course - Obscurity', path: '/proof-course' },
      { title: 'MythBuster: Secret Societies', path: '/myth-buster' },
    ],
  },
  'founders': {
    letter: 'F',
    word: 'Founders',
    criticism: 'Masonic Connections',
    description: 'You encounter questions about organizational origins and founder beliefs. Focus on redemption, transformation, and how God can use any organization for His purposes.',
    icon: Building,
    color: 'from-rose-500 to-pink-600',
    resources: [
      { title: 'P.R.O.O.F. Course - Founders', path: '/proof-course' },
      { title: 'Historical Context Guide', path: '/beauty-origins' },
    ],
  },
};

const instructionsConfig = {
  title: "P.R.O.O.F. Assessment",
  description: "This assessment helps identify which aspects of Greek life you're most often asked to defend, so you can focus your biblical study and preparation on the areas that matter most to you.",
  estimatedTime: "3-5 minutes",
  questionCount: 5,
  benefits: [
    "Identify your primary area of criticism or concern",
    "Get personalized resource recommendations",
    "Build confidence in defending your Greek life decision",
    "Learn which P.R.O.O.F. framework pillar to focus on first"
  ],
  howToComplete: [
    "Read each question carefully and consider your real experiences",
    "Select the answer that best represents criticism you've encountered",
    "Be honest — there are no wrong answers",
    "Your result will guide your learning path"
  ],
  whatResultsMean: "Your result reveals which of the 5 P.R.O.O.F. pillars (Pledge Process, Rituals, Oaths, Obscurity, Founders) you encounter most often. This helps you prioritize your learning and prepare biblical responses for the specific criticisms you face."
};

export default function ProofAssessment() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { demoSettings } = useDemoMode();
  const isPresentationMode = demoSettings.presentationMode;
  const { savedAssessment, hasSavedAssessment, isLoading: loadingSaved } = useSavedAssessment("proof-quiz");
  
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<ProofCategory[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [viewingSavedResults, setViewingSavedResults] = useState(false);
  const [forceRetake, setForceRetake] = useState(false);
  const [demoTopCategory] = useState<ProofCategory>('rituals');

  // In presentation mode, show demo results immediately
  useEffect(() => {
    if (isPresentationMode) {
      console.log('[ProofAssessment] Presentation mode active, showing demo results');
      setAnswers(['rituals', 'rituals', 'oaths', 'rituals', 'founders']);
      setShowResults(true);
      setStarted(true);
    }
  }, [isPresentationMode]);

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (category: ProofCategory) => {
    const newAnswers = [...answers, category];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1));
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
    setStarted(false);
    setForceRetake(false);
  };

  const getTopCategory = (): ProofCategory => {
    const counts: Record<ProofCategory, number> = {
      'pledge-process': 0,
      'rituals': 0,
      'oaths': 0,
      'obscurity': 0,
      'founders': 0,
    };

    answers.forEach((answer) => {
      counts[answer]++;
    });

    return (Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as ProofCategory);
  };

  const generateTTSText = (result: typeof categoryInfo[ProofCategory]) => {
    return `Your P.R.O.O.F. Assessment Results. Your primary focus area is ${result.word}, which addresses ${result.criticism}. ${result.description}. We recommend starting with these resources: ${result.resources.map(r => r.title).join(", ")}.`;
  };

  const getColorScheme = (category: ProofCategory) => {
    switch (category) {
      case "pledge-process": return "blue";
      case "rituals": return "purple";
      case "oaths": return "amber";
      case "obscurity": return "green";
      case "founders": return "fuchsia";
      default: return "purple";
    }
  };

  // Loading state
  if (loadingSaved && user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-10 h-10 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Loading your assessment...</p>
        </div>
      </div>
    );
  }

  // Show saved results for logged-in users
  if (viewingSavedResults && savedAssessment) {
    const scoresJson = savedAssessment.scores_json as { topCategory?: ProofCategory };
    const topCategory = scoresJson.topCategory || "rituals";
    const result = categoryInfo[topCategory];
    
    const chartData = Object.entries(categoryInfo).map(([key, info]) => ({
      name: info.letter,
      value: key === topCategory ? 80 : Math.floor(Math.random() * 40) + 20,
      fullMark: 100
    }));

    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <AssessmentBreadcrumb
            assessmentName="P.R.O.O.F. Assessment"
            currentStep="results"
            colorScheme="purple"
          />
          <Button 
            variant="ghost" 
            onClick={() => setViewingSavedResults(false)}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <AssessmentVisualReport
            assessmentTitle="P.R.O.O.F. Assessment"
            assessmentType="proof-quiz"
            resultTitle={result.word}
            resultSubtitle={result.criticism}
            archetype={`${result.letter} - ${result.word}`}
            completedAt={savedAssessment.created_at}
            chartData={chartData}
            chartType="bar"
            sections={[
              { title: "Your Focus Area", content: result.description },
              { title: "Common Criticism", content: `People often challenge you with concerns about "${result.criticism}".` }
            ]}
            recommendations={result.resources.map(r => r.title)}
            colorScheme={getColorScheme(topCategory) as "purple" | "amber" | "fuchsia" | "blue" | "green"}
          />
          
          <div className="mt-6 flex gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setViewingSavedResults(false);
                setForceRetake(true);
              }}
              className="flex-1"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Retake
            </Button>
            <Button
              onClick={() => navigate('/proof-course')}
              className="flex-1"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Study P.R.O.O.F.
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Show prompt for returning users with saved results
  if (hasSavedAssessment && !forceRetake && !started && savedAssessment) {
    const scoresJson = savedAssessment.scores_json as { topCategory?: ProofCategory };
    const topCategory = scoresJson.topCategory || "rituals";
    const result = categoryInfo[topCategory];
    
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <AssessmentBreadcrumb
            assessmentName="P.R.O.O.F. Assessment"
            currentStep="instructions"
            colorScheme="purple"
          />
          <SavedAssessmentPrompt
            assessmentTitle="P.R.O.O.F. Assessment"
            resultTitle={result.word}
            archetype={`${result.letter} - ${result.word}`}
            completedAt={savedAssessment.created_at}
            onViewResults={() => setViewingSavedResults(true)}
            onRetake={() => setForceRetake(true)}
            colorScheme={getColorScheme(topCategory) as "purple" | "amber" | "fuchsia" | "blue" | "green"}
          />
        </div>
      </div>
    );
  }

  // Show instructions first
  if (!started) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <AssessmentBreadcrumb
            assessmentName="P.R.O.O.F. Assessment"
            currentStep="instructions"
            colorScheme="purple"
          />
          <AssessmentInstructions
            {...instructionsConfig}
            ttsText={`${instructionsConfig.description} ${instructionsConfig.whatResultsMean}`}
            onStart={() => setStarted(true)}
          />
        </div>
      </div>
    );
  }

  if (showResults) {
    const topCategory = getTopCategory();
    const result = categoryInfo[topCategory];
    const Icon = result.icon;

    const sections = [
      {
        title: "Your Focus Area",
        content: result.description
      },
      {
        title: "Common Criticism",
        content: `People often challenge you with concerns about "${result.criticism}". The P.R.O.O.F. framework's "${result.letter}" pillar provides biblical responses for this.`
      }
    ];

    const recommendations = result.resources.map(r => r.title);

    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <AssessmentBreadcrumb
            assessmentName="P.R.O.O.F. Assessment"
            currentStep="results"
            colorScheme="purple"
          />
          <AssessmentResultsPanel
            assessmentType="proof-quiz"
            assessmentTitle="P.R.O.O.F. Assessment"
            resultTitle={result.word}
            resultSubtitle={result.criticism}
            archetype={`${result.letter} - ${result.word}`}
            sections={sections}
            recommendations={recommendations}
            ttsText={generateTTSText(result)}
            icon={<span className="text-3xl font-bold text-white">{result.letter}</span>}
            colorScheme={
              topCategory === "pledge-process" ? "blue" :
              topCategory === "rituals" ? "purple" :
              topCategory === "oaths" ? "amber" :
              topCategory === "obscurity" ? "green" :
              "fuchsia"
            }
            additionalData={{ answers, topCategory }}
          />

          <div className="flex flex-col gap-3 mt-6">
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleRestart}
                className="flex-1 gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Retake
              </Button>
              <Button
                onClick={() => navigate('/proof-course')}
                className="flex-1 gap-2"
              >
                <BookOpen className="w-4 h-4" />
                Study P.R.O.O.F.
              </Button>
            </div>
            <Button
              variant="ghost"
              onClick={() => navigate('/dashboard')}
              className="w-full gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const questionTTSText = `Question ${currentQuestion + 1} of ${questions.length}. ${question.text}. ${question.options.map((opt, i) => `Option ${i + 1}: ${opt.text}`).join(". ")}`;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <AssessmentBreadcrumb
          assessmentName="P.R.O.O.F. Assessment"
          currentStep="questions"
          currentQuestion={currentQuestion + 1}
          totalQuestions={questions.length}
          colorScheme="purple"
        />
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-xl font-bold">P.R.O.O.F. Assessment</h1>
            <span className="text-sm text-muted-foreground">
              {currentQuestion + 1} of {questions.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg leading-relaxed flex-1">
                    {question.text}
                  </CardTitle>
                  <AssessmentTTS 
                    text={questionTTSText} 
                    itemId={`question-${currentQuestion}`} 
                    title={`Question ${currentQuestion + 1}`}
                  />
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                {question.options.map((option, index) => (
                  <motion.button
                    key={option.category + index}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleAnswer(option.category)}
                    className="w-full p-4 text-left rounded-lg border border-border bg-background hover:bg-muted/50 hover:border-primary/30 transition-colors"
                  >
                    <span className="text-sm">{option.text}</span>
                  </motion.button>
                ))}

                {currentQuestion > 0 && (
                  <Button
                    variant="ghost"
                    onClick={handleBack}
                    className="w-full mt-4 gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Previous Question
                  </Button>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        <p className="text-center text-xs text-muted-foreground mt-6">
          This assessment helps identify which P.R.O.O.F. category you encounter most,
          so you can focus your biblical study and preparation.
        </p>
      </div>
    </div>
  );
}
