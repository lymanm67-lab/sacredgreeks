import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useDemoMode } from '@/contexts/DemoModeContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Heart, 
  ArrowLeft, 
  ArrowRight,
  Drama, 
  Save, 
  Trash2, 
  Calendar, 
  Sparkles, 
  CheckCircle2, 
  Printer, 
  Download,
  Shield,
  Users,
  MessageCircle,
  Eye,
  Brain,
  Lightbulb,
  Target,
  RotateCcw,
  Home,
  LogIn
} from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { AssessmentInstructions } from '@/components/assessment/AssessmentInstructions';
import { AssessmentResultsPanel } from '@/components/assessment/AssessmentResultsPanel';
import { SavedAssessmentPrompt } from '@/components/assessment/SavedAssessmentPrompt';
import { AssessmentBreadcrumb } from '@/components/assessment/AssessmentBreadcrumb';
import { useSavedAssessment } from '@/hooks/use-saved-assessment';
import jsPDF from 'jspdf';

// Archetype definitions with scoring weights
const archetypes = [
  {
    name: "The Defender",
    description: "You stand firm in your faith while actively defending your choice to be in Greek life. You're confident in your ability to integrate both identities.",
    strengths: ["Strong convictions", "Articulate in expressing beliefs", "Confident under pressure"],
    growthAreas: ["May come across as defensive", "Could benefit from more listening", "Balance assertiveness with humility"],
    icon: Shield
  },
  {
    name: "The Bridge Builder",
    description: "You seek to create harmony between your faith community and Greek life. You're a natural mediator who helps others see common ground.",
    strengths: ["Diplomatic", "Empathetic", "Skilled at finding common ground"],
    growthAreas: ["May avoid necessary conflict", "Could struggle with firm boundaries", "May over-compromise on values"],
    icon: Users
  },
  {
    name: "The Silent Struggler",
    description: "You internalize the tension between your faith and Greek life, often keeping your struggles private. You may feel isolated in your journey.",
    strengths: ["Reflective", "Thoughtful", "Non-judgmental of others"],
    growthAreas: ["Need to find trusted confidants", "Should express feelings more openly", "May benefit from community support"],
    icon: MessageCircle
  },
  {
    name: "The Compartmentalizer",
    description: "You keep your faith and Greek life in separate boxes, rarely allowing them to interact. This helps you navigate both worlds but may create internal tension.",
    strengths: ["Adaptable", "Able to relate to different groups", "Practical"],
    growthAreas: ["Integration of identity", "Authenticity across contexts", "Addressing internal contradictions"],
    icon: Eye
  },
  {
    name: "The Questioner",
    description: "You're actively wrestling with questions about how faith and Greek life can coexist. You're on a journey of discovery and open to new perspectives.",
    strengths: ["Intellectually curious", "Open-minded", "Growth-oriented"],
    growthAreas: ["May experience analysis paralysis", "Could benefit from decisive action", "Finding peace amid uncertainty"],
    icon: Brain
  },
  {
    name: "The Integrator",
    description: "You've found ways to seamlessly blend your faith and Greek life into a unified identity. You see both as complementary rather than conflicting.",
    strengths: ["Holistic worldview", "Authentic", "Role model for others"],
    growthAreas: ["May not relate to those still struggling", "Could become complacent", "Continuing growth and learning"],
    icon: Lightbulb
  }
];

interface Question {
  id: number;
  text: string;
  subtext?: string;
  options: {
    text: string;
    value: string;
    scores: {
      defender: number;
      bridgeBuilder: number;
      silentStruggler: number;
      compartmentalizer: number;
      questioner: number;
      integrator: number;
    };
  }[];
}

// Assessment questions designed to identify archetype
const questions: Question[] = [
  {
    id: 1,
    text: "When someone criticizes Greek life as being 'un-Christian,' how do you typically respond?",
    subtext: "Think about your natural reaction",
    options: [
      { 
        text: "I immediately share biblical principles that support my involvement", 
        value: "defend",
        scores: { defender: 3, bridgeBuilder: 1, silentStruggler: 0, compartmentalizer: 0, questioner: 0, integrator: 1 }
      },
      { 
        text: "I try to find common ground and help them understand my perspective", 
        value: "bridge",
        scores: { defender: 0, bridgeBuilder: 3, silentStruggler: 0, compartmentalizer: 0, questioner: 1, integrator: 1 }
      },
      { 
        text: "I usually stay quiet and process my feelings later", 
        value: "silent",
        scores: { defender: 0, bridgeBuilder: 0, silentStruggler: 3, compartmentalizer: 1, questioner: 1, integrator: 0 }
      },
      { 
        text: "I keep those conversations separate from my Greek life activities", 
        value: "separate",
        scores: { defender: 0, bridgeBuilder: 0, silentStruggler: 1, compartmentalizer: 3, questioner: 0, integrator: 0 }
      },
      { 
        text: "I genuinely want to understand their concerns and explore them together", 
        value: "question",
        scores: { defender: 0, bridgeBuilder: 1, silentStruggler: 0, compartmentalizer: 0, questioner: 3, integrator: 1 }
      },
    ],
  },
  {
    id: 2,
    text: "How do you typically introduce your Greek life involvement to church friends?",
    subtext: "Consider how you present this part of your life",
    options: [
      { 
        text: "I proudly share how it strengthens my leadership and service to God", 
        value: "proud",
        scores: { defender: 2, bridgeBuilder: 1, silentStruggler: 0, compartmentalizer: 0, questioner: 0, integrator: 3 }
      },
      { 
        text: "I carefully explain the positive aspects while acknowledging concerns", 
        value: "careful",
        scores: { defender: 1, bridgeBuilder: 3, silentStruggler: 0, compartmentalizer: 0, questioner: 1, integrator: 1 }
      },
      { 
        text: "I rarely bring it up unless directly asked", 
        value: "avoid",
        scores: { defender: 0, bridgeBuilder: 0, silentStruggler: 3, compartmentalizer: 2, questioner: 0, integrator: 0 }
      },
      { 
        text: "I keep my church and Greek friendships mostly separate", 
        value: "separate",
        scores: { defender: 0, bridgeBuilder: 0, silentStruggler: 1, compartmentalizer: 3, questioner: 0, integrator: 0 }
      },
      { 
        text: "I share honestly, including my own questions and journey", 
        value: "honest",
        scores: { defender: 0, bridgeBuilder: 1, silentStruggler: 0, compartmentalizer: 0, questioner: 3, integrator: 1 }
      },
    ],
  },
  {
    id: 3,
    text: "When you encounter a ritual or tradition you're unsure about spiritually, what do you do?",
    subtext: "Think about your approach to uncertain situations",
    options: [
      { 
        text: "Research it thoroughly and form a confident position I can defend", 
        value: "research",
        scores: { defender: 3, bridgeBuilder: 0, silentStruggler: 0, compartmentalizer: 0, questioner: 2, integrator: 1 }
      },
      { 
        text: "Discuss it with both faith mentors and Greek advisors to find balance", 
        value: "discuss",
        scores: { defender: 0, bridgeBuilder: 3, silentStruggler: 0, compartmentalizer: 0, questioner: 1, integrator: 2 }
      },
      { 
        text: "Participate but keep my concerns to myself", 
        value: "participate_quiet",
        scores: { defender: 0, bridgeBuilder: 0, silentStruggler: 3, compartmentalizer: 2, questioner: 0, integrator: 0 }
      },
      { 
        text: "Go through the motions without deeply analyzing the meaning", 
        value: "motions",
        scores: { defender: 0, bridgeBuilder: 0, silentStruggler: 1, compartmentalizer: 3, questioner: 0, integrator: 0 }
      },
      { 
        text: "Sit with the uncertainty and explore what it might mean for me", 
        value: "explore",
        scores: { defender: 0, bridgeBuilder: 1, silentStruggler: 0, compartmentalizer: 0, questioner: 3, integrator: 1 }
      },
    ],
  },
  {
    id: 4,
    text: "How do you feel about being a Christian in Greek life?",
    subtext: "Your honest emotional response",
    options: [
      { 
        text: "Confident — I see no conflict and can articulate why", 
        value: "confident",
        scores: { defender: 2, bridgeBuilder: 1, silentStruggler: 0, compartmentalizer: 0, questioner: 0, integrator: 3 }
      },
      { 
        text: "Hopeful — I believe both can be harmonized with effort", 
        value: "hopeful",
        scores: { defender: 0, bridgeBuilder: 3, silentStruggler: 0, compartmentalizer: 0, questioner: 1, integrator: 2 }
      },
      { 
        text: "Conflicted — I often feel torn but keep it to myself", 
        value: "conflicted",
        scores: { defender: 0, bridgeBuilder: 0, silentStruggler: 3, compartmentalizer: 1, questioner: 1, integrator: 0 }
      },
      { 
        text: "Pragmatic — I handle each world separately and it works", 
        value: "pragmatic",
        scores: { defender: 0, bridgeBuilder: 0, silentStruggler: 0, compartmentalizer: 3, questioner: 0, integrator: 0 }
      },
      { 
        text: "Curious — I'm still exploring what this means for me", 
        value: "curious",
        scores: { defender: 0, bridgeBuilder: 0, silentStruggler: 0, compartmentalizer: 0, questioner: 3, integrator: 0 }
      },
    ],
  },
  {
    id: 5,
    text: "When a chapter event conflicts with a church commitment, what's your typical approach?",
    subtext: "Think about how you navigate competing priorities",
    options: [
      { 
        text: "I confidently prioritize faith and explain my values to my chapter", 
        value: "faith_first",
        scores: { defender: 3, bridgeBuilder: 1, silentStruggler: 0, compartmentalizer: 0, questioner: 0, integrator: 1 }
      },
      { 
        text: "I try to find a way to honor both commitments creatively", 
        value: "creative",
        scores: { defender: 0, bridgeBuilder: 3, silentStruggler: 0, compartmentalizer: 0, questioner: 0, integrator: 3 }
      },
      { 
        text: "I feel stressed but make a decision without discussing my conflict", 
        value: "stressed",
        scores: { defender: 0, bridgeBuilder: 0, silentStruggler: 3, compartmentalizer: 1, questioner: 1, integrator: 0 }
      },
      { 
        text: "I pick whichever fits that week without much internal struggle", 
        value: "flexible",
        scores: { defender: 0, bridgeBuilder: 0, silentStruggler: 0, compartmentalizer: 3, questioner: 0, integrator: 0 }
      },
      { 
        text: "I use it as an opportunity to reflect on my priorities", 
        value: "reflect",
        scores: { defender: 0, bridgeBuilder: 1, silentStruggler: 0, compartmentalizer: 0, questioner: 3, integrator: 1 }
      },
    ],
  },
  {
    id: 6,
    text: "How often do you think about the relationship between your faith and Greek life?",
    subtext: "Your level of conscious reflection",
    options: [
      { 
        text: "Often — it's important to me to have clear answers", 
        value: "often_clear",
        scores: { defender: 3, bridgeBuilder: 1, silentStruggler: 0, compartmentalizer: 0, questioner: 1, integrator: 1 }
      },
      { 
        text: "Regularly — I actively work to bring them together", 
        value: "regularly",
        scores: { defender: 0, bridgeBuilder: 2, silentStruggler: 0, compartmentalizer: 0, questioner: 1, integrator: 3 }
      },
      { 
        text: "Sometimes — usually when something triggers the question", 
        value: "sometimes",
        scores: { defender: 0, bridgeBuilder: 1, silentStruggler: 2, compartmentalizer: 1, questioner: 2, integrator: 0 }
      },
      { 
        text: "Rarely — I prefer to keep them as separate experiences", 
        value: "rarely",
        scores: { defender: 0, bridgeBuilder: 0, silentStruggler: 0, compartmentalizer: 3, questioner: 0, integrator: 0 }
      },
      { 
        text: "Constantly — I'm on an active journey of discovery", 
        value: "constantly",
        scores: { defender: 0, bridgeBuilder: 0, silentStruggler: 1, compartmentalizer: 0, questioner: 3, integrator: 0 }
      },
    ],
  },
  {
    id: 7,
    text: "What role does your Greek organization play in your spiritual growth?",
    subtext: "Consider the impact on your faith journey",
    options: [
      { 
        text: "It's a platform where I can boldly live out my faith", 
        value: "platform",
        scores: { defender: 3, bridgeBuilder: 1, silentStruggler: 0, compartmentalizer: 0, questioner: 0, integrator: 2 }
      },
      { 
        text: "It provides opportunities to practice Christian virtues like service and love", 
        value: "virtues",
        scores: { defender: 1, bridgeBuilder: 2, silentStruggler: 0, compartmentalizer: 0, questioner: 0, integrator: 3 }
      },
      { 
        text: "It's complicated — sometimes it helps, sometimes it challenges", 
        value: "complicated",
        scores: { defender: 0, bridgeBuilder: 0, silentStruggler: 3, compartmentalizer: 0, questioner: 2, integrator: 0 }
      },
      { 
        text: "It's neutral — I grow spiritually elsewhere", 
        value: "neutral",
        scores: { defender: 0, bridgeBuilder: 0, silentStruggler: 1, compartmentalizer: 3, questioner: 0, integrator: 0 }
      },
      { 
        text: "It raises questions that push my faith in new directions", 
        value: "questions",
        scores: { defender: 0, bridgeBuilder: 1, silentStruggler: 0, compartmentalizer: 0, questioner: 3, integrator: 1 }
      },
    ],
  },
  {
    id: 8,
    text: "How do you respond when a fellow Greek asks about your faith?",
    subtext: "Your approach to faith conversations within Greek life",
    options: [
      { 
        text: "I welcome it as an opportunity to share my testimony confidently", 
        value: "welcome",
        scores: { defender: 3, bridgeBuilder: 1, silentStruggler: 0, compartmentalizer: 0, questioner: 0, integrator: 2 }
      },
      { 
        text: "I share openly and ask about their beliefs too — it's a two-way conversation", 
        value: "dialogue",
        scores: { defender: 0, bridgeBuilder: 3, silentStruggler: 0, compartmentalizer: 0, questioner: 1, integrator: 2 }
      },
      { 
        text: "I feel uncomfortable and give a brief answer", 
        value: "brief",
        scores: { defender: 0, bridgeBuilder: 0, silentStruggler: 3, compartmentalizer: 2, questioner: 0, integrator: 0 }
      },
      { 
        text: "I mention it casually but don't go deep — it's not the context", 
        value: "casual",
        scores: { defender: 0, bridgeBuilder: 0, silentStruggler: 1, compartmentalizer: 3, questioner: 0, integrator: 0 }
      },
      { 
        text: "I'm honest about being on a journey and invite them into the conversation", 
        value: "journey",
        scores: { defender: 0, bridgeBuilder: 1, silentStruggler: 0, compartmentalizer: 0, questioner: 3, integrator: 1 }
      },
    ],
  },
];

interface SavedResult {
  id: string;
  archetype: string;
  archetype_description: string | null;
  strengths: string[] | null;
  growth_areas: string[] | null;
  notes: string | null;
  created_at: string;
}

const instructionsConfig = {
  title: "Shattered Masks Assessment",
  description: "Discover your archetype and understand how you navigate identity, faith, and Greek life. This assessment reveals your unique approach to integrating multiple aspects of your identity.",
  estimatedTime: "5-7 minutes",
  questionCount: 8,
  benefits: [
    "Discover your unique identity archetype",
    "Understand your strengths and growth areas",
    "Learn how you navigate faith and Greek life",
    "Get personalized insights for personal development"
  ],
  howToComplete: [
    "Answer each question honestly based on your typical behavior",
    "There are no right or wrong answers",
    "Your archetype reveals your natural approach",
    "Save your results to track your growth over time"
  ],
  whatResultsMean: "Your archetype reveals your primary approach to integrating faith and Greek life. Understanding your archetype helps you leverage your strengths while being aware of potential growth areas."
};

const calculateArchetype = (answers: Record<number, string>): { archetype: typeof archetypes[0], scores: Record<string, number>, confidence: number } => {
  const totalScores = {
    defender: 0,
    bridgeBuilder: 0,
    silentStruggler: 0,
    compartmentalizer: 0,
    questioner: 0,
    integrator: 0
  };

  // Calculate scores from all answers
  Object.entries(answers).forEach(([questionId, answerValue]) => {
    const question = questions.find(q => q.id === parseInt(questionId));
    if (question) {
      const selectedOption = question.options.find(o => o.value === answerValue);
      if (selectedOption) {
        Object.entries(selectedOption.scores).forEach(([key, score]) => {
          totalScores[key as keyof typeof totalScores] += score;
        });
      }
    }
  });

  // Find the archetype with highest score
  const archetypeMap: Record<string, typeof archetypes[0]> = {
    defender: archetypes[0],
    bridgeBuilder: archetypes[1],
    silentStruggler: archetypes[2],
    compartmentalizer: archetypes[3],
    questioner: archetypes[4],
    integrator: archetypes[5]
  };

  const maxScore = Math.max(...Object.values(totalScores));
  const totalPossible = questions.length * 3; // Max 3 points per question
  const confidence = Math.round((maxScore / totalPossible) * 100);
  
  const winningKey = Object.entries(totalScores).find(([_, score]) => score === maxScore)?.[0] || 'integrator';
  
  return {
    archetype: archetypeMap[winningKey],
    scores: totalScores,
    confidence: Math.min(confidence + 40, 100) // Add base confidence
  };
};

const ShatteredMasks = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { demoSettings } = useDemoMode();
  const isPresentationMode = demoSettings.presentationMode;
  
  // Assessment state
  const [showInstructions, setShowInstructions] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  
  // Saved results state
  const [savedResults, setSavedResults] = useState<SavedResult[]>([]);
  const [loading, setLoading] = useState(false);

  // Check for existing assessment
  const { savedAssessment, isLoading: loadingSaved, hasSavedAssessment } = useSavedAssessment('shattered-masks');

  // Demo answers for presentation mode - shows "The Integrator" archetype
  const DEMO_ANSWERS: Record<number, string> = {
    1: 'bridge',
    2: 'proud',
    3: 'discuss',
    4: 'confident',
    5: 'creative',
    6: 'regularly',
    7: 'virtues',
    8: 'dialogue'
  };

  // In presentation mode, show demo results immediately
  useEffect(() => {
    if (isPresentationMode) {
      console.log('[ShatteredMasks] Presentation mode active, showing demo results');
      setAnswers(DEMO_ANSWERS);
      setShowResults(true);
      setShowInstructions(false);
    }
  }, [isPresentationMode]);

  useEffect(() => {
    if (user && !isPresentationMode) {
      loadSavedResults();
    }
  }, [user, isPresentationMode]);

  const loadSavedResults = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('shattered_masks_results')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSavedResults(data || []);
    } catch (error) {
      console.error('Error loading results:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartAssessment = () => {
    setShowInstructions(false);
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: value };
    setAnswers(newAnswers);
    
    // Auto-advance after short delay
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResults(true);
      }
    }, 300);
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRestart = () => {
    setShowInstructions(true);
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  const result = useMemo(() => {
    if (Object.keys(answers).length === questions.length) {
      return calculateArchetype(answers);
    }
    return null;
  }, [answers]);

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const resultsTTSText = result ? `
    Congratulations on completing the Shattered Masks Assessment! 
    Your archetype is: ${result.archetype.name}.
    ${result.archetype.description}
    Your confidence score is ${result.confidence} percent.
    Your key strengths include: ${result.archetype.strengths.join(', ')}.
    Areas for growth include: ${result.archetype.growthAreas.join(', ')}.
  ` : '';

  const resultSections = result ? [
    {
      title: "Your Strengths",
      content: result.archetype.strengths.join(", "),
      items: result.archetype.strengths
    },
    {
      title: "Growth Opportunities", 
      content: result.archetype.growthAreas.join(", "),
      items: result.archetype.growthAreas
    }
  ] : [];

  // Show saved assessment prompt if user has completed before
  if (!loadingSaved && savedAssessment && showInstructions && savedResults.length > 0) {
    const latestResult = savedResults[0];
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-fuchsia-950/5 to-background">
        <div className="container mx-auto px-4 py-8">
          <AssessmentBreadcrumb
            assessmentName="Shattered Masks"
            currentStep="instructions"
            colorScheme="fuchsia"
          />
        </div>

        <main className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="w-full max-w-lg">
            <SavedAssessmentPrompt
              assessmentTitle="Shattered Masks Assessment"
              resultTitle={latestResult.archetype}
              archetype={latestResult.archetype}
              completedAt={latestResult.created_at}
              onViewResults={() => setShowResults(true)}
              onRetake={handleStartAssessment}
              colorScheme="fuchsia"
              ttsText={`You previously completed the Shattered Masks Assessment. Your archetype was ${latestResult.archetype}. ${latestResult.archetype_description || ''}`}
            />
          </div>
        </main>
      </div>
    );
  }

  // Show results
  if (showResults && result) {
    const ArchetypeIcon = result.archetype.icon;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-fuchsia-950/5 to-background flex flex-col">
        <div className="container mx-auto px-4 py-8">
          <AssessmentBreadcrumb
            assessmentName="Shattered Masks"
            currentStep="results"
            colorScheme="fuchsia"
          />
        </div>

        <main className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-lg space-y-6">
            <AssessmentResultsPanel
              assessmentType="shattered-masks"
              assessmentTitle="Shattered Masks Assessment"
              resultTitle={result.archetype.name}
              resultSubtitle={result.archetype.description}
              score={result.confidence}
              scoreLabel="Confidence Score"
              archetype={result.archetype.name}
              sections={resultSections}
              recommendations={[
                "Reflect on how your archetype shows up in daily interactions",
                "Consider how your strengths can support others in your chapter",
                "Work on one growth area this month"
              ]}
              ttsText={resultsTTSText}
              icon={<ArchetypeIcon className="w-8 h-8 text-white" />}
              colorScheme="fuchsia"
              additionalData={{ answers, scores: result.scores }}
            />

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
                onClick={() => navigate('/dashboard')}
                className="flex-1 gap-2"
              >
                <Target className="w-4 h-4" />
                View Dashboard
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Show instructions
  if (showInstructions) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-fuchsia-950/5 to-background">
        <div className="container mx-auto px-4 py-8">
          <AssessmentBreadcrumb
            assessmentName="Shattered Masks"
            currentStep="instructions"
            colorScheme="fuchsia"
          />
        </div>

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-center space-y-4 animate-fade-in">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-fuchsia-500/20 to-pink-600/20 mb-4">
                <Drama className="w-10 h-10 text-fuchsia-500" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-fuchsia-500 to-pink-600 bg-clip-text text-transparent">
                Shattered Masks Assessment
              </h1>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Discover your archetype and understand how you navigate identity, faith, and Greek life
              </p>
            </div>

            <AssessmentInstructions
              {...instructionsConfig}
              ttsText={`${instructionsConfig.description} ${instructionsConfig.whatResultsMean}`}
            />

            <Button
              size="lg"
              onClick={handleStartAssessment}
              className="w-full bg-gradient-to-r from-fuchsia-500 to-pink-600 hover:from-fuchsia-600 hover:to-pink-700 text-white font-semibold py-6 text-lg rounded-xl shadow-lg shadow-fuchsia-500/25"
            >
              Start Assessment
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </main>
      </div>
    );
  }

  // Show questions
  const question = questions[currentQuestion];
  const selectedAnswer = answers[question.id];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-fuchsia-950/5 to-background flex flex-col">
      <div className="container mx-auto px-4 py-4">
        <AssessmentBreadcrumb
          assessmentName="Shattered Masks"
          currentStep="questions"
          currentQuestion={currentQuestion + 1}
          totalQuestions={questions.length}
          colorScheme="fuchsia"
        />
        <div className="flex items-center justify-between mt-2">
          <button 
            onClick={handleRestart}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm">Start Over</span>
          </button>
          <Badge variant="outline" className="bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/30">
            {currentQuestion + 1} of {questions.length}
          </Badge>
        </div>
      </div>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl space-y-8">
          {/* Progress */}
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-muted-foreground text-center">
              {Math.round(progress)}% complete
            </p>
          </div>

          {/* Question */}
          <AnimatePresence mode="wait">
            <motion.div
              key={question.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold">{question.text}</h2>
                {question.subtext && (
                  <p className="text-muted-foreground">{question.subtext}</p>
                )}
              </div>

              <div className="space-y-3">
                {question.options.map((option) => (
                  <motion.button
                    key={option.value}
                    onClick={() => handleAnswer(option.value)}
                    className={`w-full p-4 rounded-xl border text-left transition-all ${
                      selectedAnswer === option.value
                        ? 'bg-fuchsia-500/20 border-fuchsia-500 text-foreground'
                        : 'bg-card/50 border-border hover:border-fuchsia-500/50 hover:bg-fuchsia-500/5'
                    }`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedAnswer === option.value
                          ? 'border-fuchsia-500 bg-fuchsia-500'
                          : 'border-muted-foreground'
                      }`}>
                        {selectedAnswer === option.value && (
                          <CheckCircle2 className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <span className="flex-1">{option.text}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="ghost"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                if (selectedAnswer && currentQuestion < questions.length - 1) {
                  setCurrentQuestion(currentQuestion + 1);
                } else if (selectedAnswer && currentQuestion === questions.length - 1) {
                  setShowResults(true);
                }
              }}
              disabled={!selectedAnswer}
              className="gap-2"
            >
              {currentQuestion === questions.length - 1 ? 'See Results' : 'Next'}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ShatteredMasks;
