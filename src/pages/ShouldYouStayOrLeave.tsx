import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  CheckCircle2,
  Circle,
  AlertTriangle,
  Scale,
  Eye,
  EyeOff,
  ChevronRight,
  ChevronDown,
  Lightbulb,
  BookMarked,
  Users,
  GraduationCap,
  Shield,
  Heart,
  MessageSquare,
  Trophy,
  Lock,
  Unlock,
  ArrowRight,
  ArrowLeft,
  HelpCircle,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  Save,
  Printer,
  Volume2,
  VolumeX,
  Download,
  FileText,
} from "lucide-react";
import { useStudyProgress } from "@/hooks/use-study-progress";
import { useGamification } from "@/hooks/use-gamification";
import { useLessonCelebration } from "@/hooks/use-lesson-celebration";
import { useTTS } from "@/hooks/use-tts";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Session IDs 25-30 for Should You Stay or Leave course
const COURSE_SESSION_IDS = {
  caseStudy: 25,
  reveal: 26,
  contextMatters: 27,
  ritualAsLearning: 28,
  application: 29,
  conclusion: 30,
};

interface CaseStudyPhase {
  id: string;
  title: string;
  unlocked: boolean;
}

const CASE_STUDY_SCENARIO = {
  title: "The Accountability Ritual",
  setting: "A community organization in 2024",
  scenario: `You've been invited to join a prestigious community leadership organization. During the initiation ceremony, you witness the following ritual:

A woman accused of betraying the organization's trust is brought before the leader. She is made to stand while the leader takes ordinary water and mixes it with dust from the organization's meeting hall floor.

The leader then reads a formal oath aloud, stating that if the woman has been unfaithful to her commitments, this water will cause her harm. If she is innocent, she will be unaffected.

The woman is required to say "Amen, so be it" and then drink the water.

The leader writes the oath on paper and washes the ink into the water before she drinks it.

The entire community watches in silence as she consumes the mixture.`,
  initialQuestion: "Based on what you've just read, how would you classify this ritual?",
  options: [
    { id: "witchcraft", label: "This is witchcraft or occult practice", icon: AlertTriangle },
    { id: "harmful", label: "This is harmful and should be condemned", icon: ThumbsDown },
    { id: "unsure", label: "I'm not sure, need more context", icon: HelpCircle },
    { id: "acceptable", label: "This could be acceptable depending on context", icon: ThumbsUp },
  ],
};

const REVEAL_CONTENT = {
  source: "Numbers 5:11-31",
  title: "The Dust and Water Test",
  explanation: `What you just read is a direct, modernized retelling of a ritual prescribed by God Himself in the book of Numbers.

The "community organization" is ancient Israel. The "leader" is the priest. The "meeting hall" is the Tabernacle—God's dwelling place among His people.

This ceremony, often called the "dust and water test" or "bitter water ordeal," appears in Numbers 5:11-31. A woman accused of adultery is brought before the priest and given what Scripture calls "bitter water."`,
  keyPoints: [
    {
      title: "Not Magic, But Legal Procedure",
      content: "The passage does not describe a magical act, incantation, or invocation of spiritual forces. It functions as a legal and covenantal procedure within ancient Israel, designed to place judgment in God's hands rather than human violence or coercion.",
    },
    {
      title: "No Spell, No Deity Invoked",
      content: "No spell is spoken, no foreign deity is invoked, and no supernatural power is attributed to the elements themselves. The dust comes from the tabernacle floor, symbolizing God's presence and covenant authority, not mystical energy.",
    },
    {
      title: "Protection, Not Oppression",
      content: "Old Testament scholars note that the ritual actually protected women by preventing mob justice, forced confessions, or honor killings—outcomes common in surrounding cultures. The outcome depended on God's intervention, not the priest's words or the water itself.",
    },
    {
      title: "Biblical, Not Witchcraft",
      content: "This is consistent with biblical theology, which repeatedly rejects magic and divination while allowing symbolic legal acts under divine authority. Within Scripture, it was neither witchcraft nor magic—it was a restrained, symbolic appeal to God as judge.",
    },
  ],
};

const CONTEXT_MATTERS_CONTENT = {
  title: "Why Context Changes Everything",
  mainPoint: "If the same ritual were removed from its covenant context and reenacted today, it would indeed resemble superstition. But within Scripture, it was neither witchcraft nor magic.",
  sections: [
    {
      title: "The Modern Misreading",
      content: "When read through a modern lens, this ceremony can sound strange or even superstitious. If introduced today without context, many in the church would likely label it witchcraft. However, this interpretation misunderstands both the purpose and nature of the ritual.",
    },
    {
      title: "The Critical Distinction",
      content: "Ritual without worship, belief, or invocation of power is not the same as sorcery. This distinction is often lost when modern readers project contemporary assumptions back onto ancient texts.",
    },
    {
      title: "Application to Greek Life",
      content: "The same principle applies when evaluating Greek Life rituals. Are we judging by appearance or by theological substance? Is worship being offered? Is a deity being invoked with belief? Is spiritual power being claimed?",
    },
  ],
};

const RITUAL_AS_LEARNING_CONTENT = {
  title: "Ritual: A Universal Learning Tool",
  introduction: "A key issue often missing from objections to Greek Life rituals is that ritual is a universal human learning tool, not a religious act by default.",
  points: [
    {
      title: "Anthropological Reality",
      content: "Anthropologists and biblical scholars alike note that rituals function primarily as pedagogical and communal devices—ways societies transmit values, identity, and moral expectations across generations.",
    },
    {
      title: "Scripture Uses Ritual to Teach",
      content: "From Passover questions asked by children (Exodus 12:26) to symbolic prophetic actions performed by Isaiah, Jeremiah, and Ezekiel, God regularly used enacted symbols to teach truth without those actions becoming objects of worship.",
    },
    {
      title: "The Inconsistent Standard",
      content: "When critics single out Greek Life rituals as spiritually dangerous simply because they are formal, memorized, or symbolic, they unintentionally apply a standard that would also indict large portions of biblical practice—including communion, baptismal vows, marriage ceremonies, and ordination rites.",
    },
    {
      title: "The Real Biblical Concern",
      content: "The biblical concern has never been the presence of ritual, but whether ritual claims spiritual power independent of God or redirects allegiance away from Him. Greek Life rituals do neither.",
    },
  ],
  conclusion: "They function at the level of meaning, memory, and moral formation—much like ancient guild ceremonies or covenant reminders in Scripture. When ritual is evaluated by theology rather than appearance, objections based solely on form collapse, revealing that the discomfort is cultural, not biblical.",
};

const APPLICATION_CONTENT = {
  title: "Applying the Lesson",
  questions: [
    {
      question: "Before judging a ritual, what questions should you ask?",
      answers: [
        "Is a deity being worshiped or invoked with genuine belief?",
        "Is spiritual power being claimed independent of God?",
        "Is allegiance being redirected away from Christ?",
        "What is the stated purpose and function of the ritual?",
      ],
    },
    {
      question: "What does this teach us about context?",
      answers: [
        "The same actions can have completely different meanings in different contexts",
        "Judging by appearance alone leads to inconsistent standards",
        "Scripture itself contains rituals that would seem strange without context",
        "Cultural discomfort is not the same as biblical prohibition",
      ],
    },
  ],
  finalThought: "The dust and water ritual in Numbers teaches us that God Himself prescribed symbolic ceremonies that, if stripped of context, would appear superstitious to modern eyes. Yet within their proper framework, they served legitimate purposes of justice, protection, and covenant faithfulness. The same grace of context should be extended when evaluating any ritual practice.",
};

const CONCLUSION_CONTENT = {
  title: "Course Summary",
  keyTakeaways: [
    {
      title: "Context Determines Meaning",
      content: "The same ritual can be sacred or superstitious depending on its context. Numbers 5 demonstrates that God Himself prescribed ceremonies that would seem strange to modern eyes.",
    },
    {
      title: "Ritual Is Not Inherently Religious",
      content: "Rituals are universal learning tools used to transmit values and identity. Scripture uses ritual throughout to teach truth without those actions becoming worship.",
    },
    {
      title: "Judge Theology, Not Appearance",
      content: "The biblical concern is whether ritual claims power independent of God or redirects allegiance away from Him—not whether it looks formal or symbolic.",
    },
    {
      title: "Extend Grace of Context",
      content: "Before condemning any practice, ask: Is worship being offered? Is a deity being invoked? Is spiritual power being claimed? Apply the same standard to Greek Life that you would to biblical rituals.",
    },
  ],
  callToAction: "Armed with this understanding, you can now evaluate ritual practices—whether in Greek Life, church tradition, or cultural ceremonies—with theological clarity rather than cultural assumption.",
};

const COURSE_INSTRUCTIONS = `Welcome to "Should You Stay or Leave?" This interactive course will challenge your assumptions about ritual and context through an eye-opening case study. You'll first encounter a ritual scenario and give your initial reaction. Then, you'll discover its surprising source and explore why context changes everything. By the end, you'll have a theological framework for evaluating any ritual practice. Complete all six modules to earn 60 points. Let's begin!`;

const MODULES = [
  {
    id: "caseStudy",
    sessionId: COURSE_SESSION_IDS.caseStudy,
    title: "The Case Study",
    subtitle: "Read and React",
    icon: Eye,
    color: "from-red-500 to-orange-500",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/30",
    description: "Experience a ritual scenario and give your initial reaction",
  },
  {
    id: "reveal",
    sessionId: COURSE_SESSION_IDS.reveal,
    title: "The Reveal",
    subtitle: "Discover the Source",
    icon: BookMarked,
    color: "from-amber-500 to-yellow-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    description: "Learn where this ritual actually comes from",
  },
  {
    id: "contextMatters",
    sessionId: COURSE_SESSION_IDS.contextMatters,
    title: "Context Matters",
    subtitle: "Why Understanding Changes Everything",
    icon: Scale,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    description: "Understand how context transforms interpretation",
  },
  {
    id: "ritualAsLearning",
    sessionId: COURSE_SESSION_IDS.ritualAsLearning,
    title: "Ritual as Learning",
    subtitle: "A Universal Tool",
    icon: GraduationCap,
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
    description: "Discover how ritual functions across cultures and Scripture",
  },
  {
    id: "application",
    sessionId: COURSE_SESSION_IDS.application,
    title: "Application",
    subtitle: "Putting It All Together",
    icon: Lightbulb,
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/30",
    description: "Apply these principles to real-world decisions",
  },
  {
    id: "conclusion",
    sessionId: COURSE_SESSION_IDS.conclusion,
    title: "Conclusion",
    subtitle: "Key Takeaways",
    icon: Trophy,
    color: "from-teal-500 to-cyan-500",
    bgColor: "bg-teal-500/10",
    borderColor: "border-teal-500/30",
    description: "Review what you've learned and earn your completion",
  },
];

export default function ShouldYouStayOrLeave() {
  const { isSessionComplete, toggleSession, progress: studyProgress, isAuthenticated } = useStudyProgress();
  const { awardPoints } = useGamification();
  const { speak, stop, isPlaying } = useTTS();
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasRevealed, setHasRevealed] = useState(false);
  const [pointsAwarded, setPointsAwarded] = useState(false);

  // Get completed modules (now includes session 30)
  const completedModules = studyProgress
    .filter(p => p.session_id >= 25 && p.session_id <= 30 && p.completed)
    .map(p => p.session_id);

  const completedCount = completedModules.length;
  const progressPercentage = (completedCount / 6) * 100;

  const { triggerLessonComplete, triggerMilestone } = useLessonCelebration();
  const previousCompletedRef = useRef<number[]>([]);

  // TTS handlers
  const handlePlayInstructions = () => {
    if (isPlaying) {
      stop();
    } else {
      speak(COURSE_INSTRUCTIONS);
    }
  };

  // Print report handler
  const handlePrintReport = () => {
    window.print();
  };

  // Save progress handler
  const handleSaveProgress = () => {
    toast.success("Progress saved successfully!");
  };

  // Track module completions for celebrations and award points
  useEffect(() => {
    const prevCompleted = previousCompletedRef.current;
    const newlyCompleted = completedModules.filter(id => !prevCompleted.includes(id));

    if (newlyCompleted.length > 0) {
      // Trigger celebration for each newly completed module
      newlyCompleted.forEach((sessionId, index) => {
        const moduleIndex = sessionId - 25;
        const module = MODULES[moduleIndex];
        const moduleTitle = module?.title || `Module ${moduleIndex + 1}`;
        setTimeout(() => triggerLessonComplete(moduleIndex + 1, moduleTitle), index * 500);
      });

      // Check for milestone celebrations
      if (prevCompleted.length < completedModules.length) {
        if (completedModules.length === 1 && prevCompleted.length === 0) {
          setTimeout(() => triggerMilestone('first'), 2500);
        } else if (completedModules.length === 3) {
          setTimeout(() => triggerMilestone('halfway'), 2500);
        } else if (completedModules.length === 6 && !pointsAwarded) {
          // Award 60 points for completing all modules
          awardPoints({ points: 60, actionType: 'stay_or_leave_completion' });
          setPointsAwarded(true);
          toast.success("🏆 Course Complete! +60 points earned!");
          setTimeout(() => triggerMilestone('complete'), 2500);
        }
      }
    }

    previousCompletedRef.current = [...completedModules];
  }, [completedModules, triggerLessonComplete, triggerMilestone, awardPoints, pointsAwarded]);

  const startModule = (moduleId: string) => {
    setActiveModule(moduleId);
    setSelectedOption(null);
    setHasRevealed(false);
  };

  const completeModule = (moduleId: string) => {
    const module = MODULES.find(m => m.id === moduleId);
    if (module && isAuthenticated) {
      toggleSession({ sessionId: module.sessionId, completed: true });
    }
    setActiveModule(null);
  };

  const renderCaseStudyModule = () => (
    <div className="space-y-6">
      <div className="bg-muted/50 rounded-lg p-6 border">
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="outline" className="bg-red-500/10 text-red-600 border-red-500/30">
            Case Study
          </Badge>
          <span className="text-sm text-muted-foreground">{CASE_STUDY_SCENARIO.setting}</span>
        </div>
        
        <h3 className="text-xl font-semibold mb-4">{CASE_STUDY_SCENARIO.title}</h3>
        
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <p className="whitespace-pre-line text-foreground/90 leading-relaxed">
            {CASE_STUDY_SCENARIO.scenario}
          </p>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h4 className="font-semibold text-lg">{CASE_STUDY_SCENARIO.initialQuestion}</h4>
        
        <div className="grid gap-3">
          {CASE_STUDY_SCENARIO.options.map((option) => {
            const Icon = option.icon;
            const isSelected = selectedOption === option.id;
            
            return (
              <button
                key={option.id}
                onClick={() => setSelectedOption(option.id)}
                className={cn(
                  "flex items-center gap-3 p-4 rounded-lg border text-left transition-all",
                  isSelected
                    ? "bg-primary/10 border-primary"
                    : "bg-card hover:bg-muted/50 border-border"
                )}
              >
                <div className={cn(
                  "p-2 rounded-full",
                  isSelected ? "bg-primary/20" : "bg-muted"
                )}>
                  <Icon className={cn(
                    "w-5 h-5",
                    isSelected ? "text-primary" : "text-muted-foreground"
                  )} />
                </div>
                <span className={cn(
                  "font-medium",
                  isSelected && "text-primary"
                )}>
                  {option.label}
                </span>
                {isSelected && <CheckCircle2 className="w-5 h-5 text-primary ml-auto" />}
              </button>
            );
          })}
        </div>
      </div>

      {selectedOption && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-end"
        >
          <Button onClick={() => completeModule("caseStudy")} className="gap-2">
            Continue to Reveal <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      )}
    </div>
  );

  const renderRevealModule = () => (
    <div className="space-y-6">
      {!hasRevealed ? (
        <div className="text-center py-8 space-y-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-amber-500/20 flex items-center justify-center">
            <EyeOff className="w-10 h-10 text-amber-500" />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-2">Ready for the Reveal?</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              You've given your initial reaction. Now discover the true source of this ritual.
            </p>
          </div>
          <Button size="lg" onClick={() => setHasRevealed(true)} className="gap-2">
            <Eye className="w-5 h-5" /> Reveal the Source
          </Button>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="text-center p-6 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 rounded-lg border border-amber-500/30">
            <Badge className="mb-4 bg-amber-500/20 text-amber-600 border-amber-500/30">
              <BookMarked className="w-4 h-4 mr-1" /> Source Revealed
            </Badge>
            <h3 className="text-2xl font-bold text-amber-600 dark:text-amber-400 mb-2">
              {REVEAL_CONTENT.source}
            </h3>
            <p className="text-lg font-medium">{REVEAL_CONTENT.title}</p>
          </div>

          <div className="prose prose-sm dark:prose-invert max-w-none bg-muted/50 rounded-lg p-6 border">
            <p className="text-foreground/90 leading-relaxed">
              {REVEAL_CONTENT.explanation}
            </p>
          </div>

          <div className="grid gap-4">
            {REVEAL_CONTENT.keyPoints.map((point, index) => (
              <Card key={index} className="border-amber-500/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-amber-500" />
                    {point.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{point.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-end">
            <Button onClick={() => completeModule("reveal")} className="gap-2">
              Continue <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );

  const renderContextMattersModule = () => (
    <div className="space-y-6">
      <div className="text-center p-6 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg border border-blue-500/30">
        <Scale className="w-12 h-12 mx-auto text-blue-500 mb-4" />
        <h3 className="text-2xl font-bold mb-2">{CONTEXT_MATTERS_CONTENT.title}</h3>
        <p className="text-lg font-medium text-blue-600 dark:text-blue-400">
          {CONTEXT_MATTERS_CONTENT.mainPoint}
        </p>
      </div>

      <div className="space-y-4">
        {CONTEXT_MATTERS_CONTENT.sections.map((section, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{section.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-end">
        <Button onClick={() => completeModule("contextMatters")} className="gap-2">
          Continue <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );

  const renderRitualAsLearningModule = () => (
    <div className="space-y-6">
      <div className="text-center p-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-500/30">
        <GraduationCap className="w-12 h-12 mx-auto text-purple-500 mb-4" />
        <h3 className="text-2xl font-bold mb-2">{RITUAL_AS_LEARNING_CONTENT.title}</h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {RITUAL_AS_LEARNING_CONTENT.introduction}
        </p>
      </div>

      <div className="grid gap-4">
        {RITUAL_AS_LEARNING_CONTENT.points.map((point, index) => (
          <Card key={index} className="border-purple-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-500 font-bold text-sm">
                  {index + 1}
                </div>
                {point.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{point.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-purple-500/10 rounded-lg p-6 border border-purple-500/30">
        <p className="text-foreground/90 italic">{RITUAL_AS_LEARNING_CONTENT.conclusion}</p>
      </div>

      <div className="flex justify-end">
        <Button onClick={() => completeModule("ritualAsLearning")} className="gap-2">
          Continue <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );

  const renderApplicationModule = () => (
    <div className="space-y-6">
      <div className="text-center p-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg border border-green-500/30">
        <Lightbulb className="w-12 h-12 mx-auto text-green-500 mb-4" />
        <h3 className="text-2xl font-bold mb-2">{APPLICATION_CONTENT.title}</h3>
      </div>

      <div className="space-y-6">
        {APPLICATION_CONTENT.questions.map((q, qIndex) => (
          <Card key={qIndex}>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-green-500" />
                {q.question}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {q.answers.map((answer, aIndex) => (
                  <li key={aIndex} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{answer}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg p-6 border border-green-500/30">
        <h4 className="font-semibold mb-2 text-green-600 dark:text-green-400">Final Thought</h4>
        <p className="text-foreground/90">{APPLICATION_CONTENT.finalThought}</p>
      </div>

      <div className="flex justify-end">
        <Button onClick={() => completeModule("application")} className="gap-2">
          Continue to Conclusion <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );

  const renderConclusionModule = () => (
    <div className="space-y-6">
      <div className="text-center py-6">
        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-teal-500/20 to-cyan-500/20 flex items-center justify-center mb-4">
          <Trophy className="w-10 h-10 text-teal-500" />
        </div>
        <h3 className="text-2xl font-bold mb-2">{CONCLUSION_CONTENT.title}</h3>
        <p className="text-muted-foreground">You've completed the full case study journey</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {CONCLUSION_CONTENT.keyTakeaways.map((takeaway, index) => (
          <motion.div
            key={takeaway.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-4 h-full border-teal-500/20 bg-teal-500/5">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-teal-500/20 flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-teal-500" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">{takeaway.title}</h4>
                  <p className="text-sm text-muted-foreground">{takeaway.content}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-teal-500/10 to-cyan-500/10 rounded-lg p-6 border border-teal-500/30">
        <h4 className="font-semibold mb-2 text-teal-600 dark:text-teal-400 flex items-center gap-2">
          <Lightbulb className="w-5 h-5" /> Call to Action
        </h4>
        <p className="text-foreground/90">{CONCLUSION_CONTENT.callToAction}</p>
      </div>

      <Separator />

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePrintReport} className="gap-2">
            <Printer className="w-4 h-4" /> Print Report
          </Button>
          <Button variant="outline" onClick={handleSaveProgress} className="gap-2">
            <Save className="w-4 h-4" /> Save Progress
          </Button>
        </div>
        <Button onClick={() => completeModule("conclusion")} className="gap-2 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600">
          Complete Course <Trophy className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );

  const renderModuleContent = () => {
    switch (activeModule) {
      case "caseStudy":
        return renderCaseStudyModule();
      case "reveal":
        return renderRevealModule();
      case "contextMatters":
        return renderContextMattersModule();
      case "ritualAsLearning":
        return renderRitualAsLearningModule();
      case "application":
        return renderApplicationModule();
      case "conclusion":
        return renderConclusionModule();
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-red-900/20 via-amber-900/20 to-orange-900/20 border-b">
        <div className="absolute inset-0 bg-grid-white/5" />
        <div className="container mx-auto px-4 py-12 relative">
          {/* Back to Dashboard */}
          <div className="flex items-center justify-between mb-6">
            <Link to="/dashboard">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="w-4 h-4" /> Back to Dashboard
              </Button>
            </Link>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePlayInstructions}
                className="gap-2"
              >
                {isPlaying ? (
                  <>
                    <VolumeX className="w-4 h-4" /> Stop
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4" /> Listen to Instructions
                  </>
                )}
              </Button>
              <Button variant="outline" size="sm" onClick={handlePrintReport} className="gap-2">
                <Printer className="w-4 h-4" /> Print
              </Button>
              <Button variant="outline" size="sm" onClick={handleSaveProgress} className="gap-2">
                <Save className="w-4 h-4" /> Save
              </Button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge className="mb-4 bg-amber-500/20 text-amber-600 border-amber-500/30">
              <BookOpen className="w-4 h-4 mr-1" /> Interactive Course
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-500 via-amber-500 to-orange-500 bg-clip-text text-transparent">
              Should You Stay or Leave?
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Discover how things taken out of context can lead to harm through an eye-opening case study.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30">
                <span className="text-amber-600 dark:text-amber-400 font-semibold">🏆 Earn 60 Points</span>
                <span className="text-muted-foreground ml-2">upon completion</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Section */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Course Progress</CardTitle>
                <CardDescription>
                  {completedCount} of 6 modules completed
                </CardDescription>
              </div>
              {completedCount === 6 && (
                <Badge className="bg-green-500/20 text-green-600 border-green-500/30">
                  <Trophy className="w-4 h-4 mr-1" /> Complete!
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={progressPercentage} className="h-3" />
          </CardContent>
        </Card>

        {/* Active Module Content */}
        <AnimatePresence mode="wait">
          {activeModule ? (
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="mb-8">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {(() => {
                        const module = MODULES.find(m => m.id === activeModule);
                        const Icon = module?.icon || BookOpen;
                        return (
                          <>
                            <div className={cn("p-2 rounded-lg", module?.bgColor)}>
                              <Icon className="w-6 h-6" />
                            </div>
                            <div>
                              <CardTitle>{module?.title}</CardTitle>
                              <CardDescription>{module?.subtitle}</CardDescription>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                    <Button variant="ghost" onClick={() => setActiveModule(null)}>
                      <RotateCcw className="w-4 h-4 mr-2" /> Back to Overview
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="max-h-[70vh]">
                    {renderModuleContent()}
                  </ScrollArea>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Module Cards */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {MODULES.map((module, index) => {
                  const Icon = module.icon;
                  const isComplete = completedModules.includes(module.sessionId);
                  const isLocked = index > 0 && !completedModules.includes(MODULES[index - 1].sessionId);

                  return (
                    <motion.div
                      key={module.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card
                        className={cn(
                          "relative overflow-hidden transition-all cursor-pointer hover:shadow-lg",
                          isComplete && "border-green-500/50",
                          isLocked && "opacity-60"
                        )}
                        onClick={() => !isLocked && startModule(module.id)}
                      >
                        <div className={cn("absolute top-0 left-0 right-0 h-1 bg-gradient-to-r", module.color)} />
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div className={cn("p-3 rounded-lg", module.bgColor)}>
                              <Icon className="w-6 h-6" />
                            </div>
                            {isComplete ? (
                              <CheckCircle2 className="w-6 h-6 text-green-500" />
                            ) : isLocked ? (
                              <Lock className="w-6 h-6 text-muted-foreground" />
                            ) : (
                              <ChevronRight className="w-6 h-6 text-muted-foreground" />
                            )}
                          </div>
                          <CardTitle className="text-lg">{module.title}</CardTitle>
                          <CardDescription>{module.description}</CardDescription>
                        </CardHeader>
                        {isLocked && (
                          <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
                            <Badge variant="outline" className="gap-1">
                              <Lock className="w-3 h-3" /> Complete previous module
                            </Badge>
                          </div>
                        )}
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Not Authenticated Warning */}
        {!isAuthenticated && (
          <Card className="mt-8 border-amber-500/50 bg-amber-500/10">
            <CardContent className="flex items-center gap-4 py-4">
              <AlertTriangle className="w-8 h-8 text-amber-500" />
              <div>
                <p className="font-medium">Sign in to track your progress</p>
                <p className="text-sm text-muted-foreground">
                  Your progress will be saved when you create an account or sign in.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
