import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Target, 
  Sparkles, 
  Scale, 
  Eye, 
  Building, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle,
  BookOpen,
  Share2,
  RotateCcw
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

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

export default function ProofAssessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<ProofCategory[]>([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

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

  const handleShare = async () => {
    const result = categoryInfo[getTopCategory()];
    const text = `I took the P.R.O.O.F. Assessment on Sacred Greeks! My primary focus area is "${result.word}" - ${result.criticism}. Take the quiz to discover yours!`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "My P.R.O.O.F. Assessment Result",
          text,
        });
      } catch {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard for sharing!");
    }
  };

  if (showResults) {
    const topCategory = getTopCategory();
    const result = categoryInfo[topCategory];
    const Icon = result.icon;

    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-primary/20">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${result.color} flex items-center justify-center shadow-lg`}
                  >
                    <span className="text-3xl font-bold text-white">{result.letter}</span>
                  </div>
                </div>
                <Badge className="w-fit mx-auto mb-2" variant="secondary">
                  Your Primary Focus Area
                </Badge>
                <CardTitle className="text-2xl">{result.word}</CardTitle>
                <CardDescription className="text-base">
                  {result.criticism}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
                  <p className="text-sm text-foreground leading-relaxed">
                    {result.description}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-primary" />
                    Recommended Resources
                  </h3>
                  <div className="space-y-2">
                    {result.resources.map((resource) => (
                      <Link
                        key={resource.path}
                        to={resource.path}
                        className="flex items-center justify-between p-3 rounded-lg bg-background border border-border/50 hover:border-primary/30 hover:bg-muted/30 transition-colors"
                      >
                        <span className="text-sm font-medium">{resource.title}</span>
                        <ArrowRight className="w-4 h-4 text-muted-foreground" />
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={handleRestart}
                    className="flex-1 gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Retake
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleShare}
                    className="flex-1 gap-2"
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </Button>
                  <Button
                    onClick={() => navigate('/proof-course')}
                    className="flex-1 gap-2"
                  >
                    <BookOpen className="w-4 h-4" />
                    Study
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
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
                <CardTitle className="text-lg leading-relaxed">
                  {question.text}
                </CardTitle>
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
