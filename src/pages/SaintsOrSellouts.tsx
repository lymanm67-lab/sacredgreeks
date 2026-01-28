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
  Loader2,
  Crown,
  Sparkles,
  Globe,
  Scroll,
  Star,
} from "lucide-react";
import { useStudyProgress } from "@/hooks/use-study-progress";
import { useGamification } from "@/hooks/use-gamification";
import { useLessonCelebration } from "@/hooks/use-lesson-celebration";
import { useTTS } from "@/hooks/use-tts";
import { CourseRecommendations } from "@/components/courses/CourseRecommendations";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Session IDs 31-36 for Saints or Sellouts course
const COURSE_SESSION_IDS = {
  introduction: 31,
  joseph: 32,
  daniel: 33,
  esther: 34,
  churchResponse: 35,
  conclusion: 36,
};

const COURSE_INSTRUCTIONS = `Welcome to "Saints or Sellouts?" This provocative course examines three beloved biblical heroes—Joseph, Daniel, and Esther—through the lens of modern church culture. You'll discover how these icons of faith lived, dressed, and thrived in pagan cultures in ways that might shock today's congregations. Would your church embrace them... or cancel them? Complete all six modules to earn 60 points and gain a biblical framework for cultural engagement. Let's begin!`;

const INTRODUCTION_CONTENT = {
  title: "Would Your Church Cancel Them?",
  subtitle: "Three Biblical Icons Under Modern Scrutiny",
  scenario: `Imagine these scenarios being presented to your church leadership today:

A young man rises to become the second most powerful ruler in a pagan nation. He dresses in Egyptian royal garments, wears Egyptian jewelry, is given an Egyptian name, and marries the daughter of a pagan high priest. He is embalmed using Egyptian mummification practices when he dies.

Another man serves multiple pagan kings, is trained in Babylonian wisdom and astrology, is given a name honoring a Babylonian god, and rises to become a top government official.

A young woman hides her faith identity, enters a pagan king's harem, participates in a year-long beauty treatment using pagan cosmetics, wins a beauty contest, and becomes queen of a nation that worships other gods.

Would your church celebrate these individuals as heroes of faith... or condemn them as compromisers who sold out to paganism?`,
  revealText: "These are Joseph, Daniel, and Esther—three of the most celebrated figures in Scripture.",
  question: "Based on these descriptions alone, how would your church likely respond?",
  options: [
    { id: "condemn", label: "They'd likely condemn this as worldly compromise", icon: ThumbsDown },
    { id: "concerned", label: "They'd express serious concerns about syncretism", icon: AlertTriangle },
    { id: "unsure", label: "They'd need more context before judging", icon: HelpCircle },
    { id: "celebrate", label: "They'd celebrate them as examples of faithful witness", icon: ThumbsUp },
  ],
};

const JOSEPH_CONTENT = {
  title: "Joseph: The Egyptian Prince",
  subtitle: "From Hebrew Slave to Pharaoh's Right Hand",
  name: "Zaphenath-Paneah",
  scripture: "Genesis 41-50",
  portrait: {
    title: "The 'Problematic' Profile",
    points: [
      {
        category: "Appearance & Identity",
        items: [
          "Given Egyptian name 'Zaphenath-Paneah' (Genesis 41:45)",
          "Dressed in fine Egyptian linen robes",
          "Wore Pharaoh's signet ring and gold chain",
          "Shaved in Egyptian style (Genesis 41:14)",
          "Was unrecognizable to his own brothers",
        ],
      },
      {
        category: "Marriage & Family",
        items: [
          "Married Asenath, daughter of Potiphera—priest of On (Heliopolis)",
          "His father-in-law was a high priest of the Egyptian sun god Ra",
          "His children Ephraim and Manasseh were half-Egyptian",
          "These sons became heads of two tribes of Israel",
        ],
      },
      {
        category: "Career & Lifestyle",
        items: [
          "Served a pagan government for decades",
          "Managed Egypt's entire economy",
          "Lived in Pharaoh's palace",
          "Participated in Egyptian court culture",
          "Swore by Pharaoh's life (Genesis 42:15)",
        ],
      },
      {
        category: "Death & Burial",
        items: [
          "Was embalmed using Egyptian mummification (Genesis 50:26)",
          "Put in a coffin (Egyptian sarcophagus) in Egypt",
          "This process involved invoking Egyptian death gods",
          "His body remained in Egypt for 400+ years",
        ],
      },
    ],
  },
  modernChurchReaction: {
    title: "What Modern Critics Might Say",
    objections: [
      "He completely assimilated into pagan culture",
      "He married into a family of false god worshipers",
      "He participated in pagan burial rituals",
      "He raised his children in Egyptian culture",
      "He never publicly proclaimed his faith to Pharaoh",
    ],
  },
  biblicalReality: {
    title: "What Scripture Actually Says",
    points: [
      {
        title: "God Orchestrated His Position",
        content: "Joseph explicitly states, 'God sent me before you to preserve life' (Genesis 45:5). His Egyptian identity was part of divine strategy, not spiritual compromise.",
      },
      {
        title: "Faith Remained Central",
        content: "Despite his Egyptian exterior, Joseph consistently credited God for his abilities (Genesis 40:8, 41:16) and saw God's hand in all circumstances.",
      },
      {
        title: "Cultural Adaptation ≠ Worship",
        content: "Joseph adopted Egyptian customs for effective service but never worshiped Egyptian gods. He functioned within the culture without surrendering his covenant identity.",
      },
      {
        title: "Generational Faithfulness",
        content: "His sons Ephraim and Manasseh were blessed by Jacob and became part of Israel's inheritance, showing faith transmitted despite cultural context.",
      },
    ],
  },
};

const DANIEL_CONTENT = {
  title: "Daniel: The Babylonian Statesman",
  subtitle: "Wisdom in the Pagan Palace",
  name: "Belteshazzar",
  scripture: "Daniel 1-12",
  portrait: {
    title: "The 'Problematic' Profile",
    points: [
      {
        category: "Name & Identity",
        items: [
          "Given the name 'Belteshazzar'—honoring Bel (Marduk)",
          "This name means 'Bel protect his life'",
          "Used this pagan name throughout his career",
          "Identified by this name even in prophetic visions",
        ],
      },
      {
        category: "Education & Training",
        items: [
          "Trained in 'the literature and language of the Chaldeans' (Daniel 1:4)",
          "This included Babylonian astrology, divination texts, and occult sciences",
          "Spent three years in this 'pagan seminary'",
          "Became 'ten times better' than Babylonian magicians (Daniel 1:20)",
        ],
      },
      {
        category: "Government Service",
        items: [
          "Served pagan kings for 70+ years",
          "Rose to 'chief of the magicians, enchanters, Chaldeans, and astrologers' (Daniel 5:11)",
          "Third highest ruler in Babylon, then Medo-Persia",
          "Advised multiple pagan empires on state affairs",
        ],
      },
      {
        category: "Associations",
        items: [
          "Worked alongside actual occult practitioners",
          "His position required regular interaction with 'wise men' who practiced divination",
          "Never recorded as trying to shut down Babylon's religious practices",
          "Served kings who claimed divine status",
        ],
      },
    ],
  },
  modernChurchReaction: {
    title: "What Modern Critics Might Say",
    objections: [
      "He accepted a name honoring a false god",
      "He studied occult and astrological texts",
      "He led a department of pagan practitioners",
      "He served governments hostile to God's people",
      "He never tried to convert the Babylonian system",
    ],
  },
  biblicalReality: {
    title: "What Scripture Actually Says",
    points: [
      {
        title: "Strategic Distinction, Not Total Separation",
        content: "Daniel drew lines at specific points (food, prayer, worship) while engaging fully in other aspects of Babylonian culture. His faith was expressed through selective resistance, not total withdrawal.",
      },
      {
        title: "Excellence as Witness",
        content: "Daniel's superior wisdom repeatedly pointed kings toward the true God (Daniel 2:28, 4:34-37, 6:26-27). His competence opened doors for testimony.",
      },
      {
        title: "Knowledge ≠ Practice",
        content: "Daniel learned Babylonian wisdom without practicing divination. Understanding a system doesn't equal endorsing it—he used knowledge to serve God's purposes.",
      },
      {
        title: "Long-term Faithfulness",
        content: "Across 70+ years and multiple regime changes, Daniel maintained his integrity while operating within pagan power structures.",
      },
    ],
  },
};

const ESTHER_CONTENT = {
  title: "Esther: The Hidden Queen",
  subtitle: "Beauty, Secrecy, and Strategic Faith",
  name: "Hadassah / Esther",
  scripture: "Esther 1-10",
  portrait: {
    title: "The 'Problematic' Profile",
    points: [
      {
        category: "Identity Concealment",
        items: [
          "Hid her Jewish identity on Mordecai's instruction (Esther 2:10)",
          "Took a Persian name meaning 'star' (possibly from goddess Ishtar)",
          "Never revealed her faith until forced by crisis",
          "Passed as Persian throughout her rise to power",
        ],
      },
      {
        category: "The Harem & Beauty Contest",
        items: [
          "Entered King Xerxes' harem (Esther 2:8)",
          "Underwent 12 months of beauty treatments with pagan cosmetics",
          "Participated in what was essentially a beauty/intimacy contest",
          "Won the king's favor and became queen",
        ],
      },
      {
        category: "Religious Practice",
        items: [
          "No mention of prayer or worship until Chapter 4",
          "God is never explicitly mentioned in the entire book",
          "No record of Sabbath observance or dietary laws",
          "Married a pagan king and lived in his palace",
        ],
      },
      {
        category: "Cultural Integration",
        items: [
          "Fully adopted Persian royal lifestyle",
          "Hosted Persian banquets with wine",
          "Operated within palace politics and intrigue",
          "Used beauty and favor as strategic tools",
        ],
      },
    ],
  },
  modernChurchReaction: {
    title: "What Modern Critics Might Say",
    objections: [
      "She hid her faith—that's denying Christ before men",
      "She entered a pagan king's harem willingly",
      "She married an unbeliever",
      "She never openly witnessed or shared her faith",
      "The book doesn't even mention God!",
    ],
  },
  biblicalReality: {
    title: "What Scripture Actually Says",
    points: [
      {
        title: "Providence Over Proclamation",
        content: "Esther's hidden identity positioned her 'for such a time as this' (Esther 4:14). God used her strategic silence to save His people. Sometimes presence precedes proclamation.",
      },
      {
        title: "Courage When It Counted",
        content: "When the moment demanded it, Esther risked her life: 'If I perish, I perish' (Esther 4:16). Faith isn't always loud—sometimes it's patient, then decisive.",
      },
      {
        title: "God Works Through Secular Spaces",
        content: "The absence of God's name in Esther doesn't mean His absence from the story. He works through beauty contests, palace politics, and secular power structures.",
      },
      {
        title: "Whole-Community Deliverance",
        content: "Esther's approach saved the entire Jewish people. Her 'compromise' became the vehicle for national preservation.",
      },
    ],
  },
};

const CHURCH_RESPONSE_CONTENT = {
  title: "The Modern Church's Double Standard",
  subtitle: "Why We Celebrate Them in Scripture but Condemn Them in Life",
  sections: [
    {
      title: "The Inconsistency",
      content: "We teach Joseph, Daniel, and Esther in Sunday School as heroes. We name our children after them. We preach sermon series about their faith. Yet if a member of our congregation today lived the way they lived—fully embedded in secular culture, working at the highest levels of non-Christian institutions, married to unbelievers, using pagan names—many churches would question their commitment to Christ.",
    },
    {
      title: "What Changed?",
      content: "The difference isn't in the behavior—it's in our perspective. We read their stories knowing the ending. We see God's hand retrospectively. We extend grace to ancient figures that we withhold from present ones. We've created an artificial divide between 'biblical times' and today, as if God's strategies for cultural engagement have fundamentally changed.",
    },
    {
      title: "The Real Biblical Pattern",
      content: "Scripture shows a consistent pattern: God places His people strategically within pagan systems not to be absorbed by them, but to be positioned for His purposes. The line is not cultural participation but spiritual allegiance. Joseph, Daniel, and Esther mastered this distinction.",
    },
  ],
  applicationQuestions: [
    "Are we judging by appearance (cultural integration) or by substance (spiritual allegiance)?",
    "Do we extend the same grace to modern believers navigating secular spaces?",
    "Have we created extra-biblical standards for 'separation' that even our heroes wouldn't meet?",
    "Can God still position believers in 'pagan' systems for strategic purposes?",
  ],
};

const CONCLUSION_CONTENT = {
  title: "The Greek Life Application",
  subtitle: "Applying Ancient Wisdom to Modern Questions",
  keyTakeaways: [
    {
      title: "Cultural Integration ≠ Spiritual Compromise",
      content: "Joseph dressed Egyptian, Daniel bore a pagan god's name, Esther hid in a harem. None of these cultural adaptations constituted worship or spiritual betrayal. The same principle applies to Greek letter organizations.",
    },
    {
      title: "Strategic Positioning Is Biblical",
      content: "God deliberately places His people in secular institutions for kingdom purposes. Being embedded in a system is different from being enslaved to its values.",
    },
    {
      title: "The Line Is Worship, Not Participation",
      content: "Joseph never worshiped Ra. Daniel never practiced divination. Esther never bowed to Persian gods. They participated in their cultures without crossing into idolatry. This is the true biblical standard.",
    },
    {
      title: "Judge Present Believers by the Same Standard",
      content: "If we would celebrate Joseph, Daniel, and Esther for their faithfulness within pagan contexts, we should extend the same understanding to believers navigating Greek Life and other secular institutions today.",
    },
  ],
  callToAction: "The next time someone questions whether a Christian can faithfully participate in Greek Life, remember: the Bible's greatest examples of cultural faithfulness looked a lot more like 'sellouts' than we're comfortable admitting. Saints and sellouts aren't as easy to distinguish as we think—and that's exactly the point.",
};

const MODULES = [
  {
    id: "introduction",
    sessionId: COURSE_SESSION_IDS.introduction,
    title: "The Scenario",
    subtitle: "Would They Pass Your Church's Test?",
    icon: Eye,
    color: "from-purple-500 to-violet-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
    description: "Encounter three biblical figures through modern eyes",
  },
  {
    id: "joseph",
    sessionId: COURSE_SESSION_IDS.joseph,
    title: "Joseph in Egypt",
    subtitle: "The Egyptian Prince",
    icon: Crown,
    color: "from-amber-500 to-yellow-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    description: "Discover how Joseph lived as an Egyptian ruler",
  },
  {
    id: "daniel",
    sessionId: COURSE_SESSION_IDS.daniel,
    title: "Daniel in Babylon",
    subtitle: "The Babylonian Statesman",
    icon: Scroll,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    description: "Explore Daniel's 70 years in pagan government",
  },
  {
    id: "esther",
    sessionId: COURSE_SESSION_IDS.esther,
    title: "Esther in Persia",
    subtitle: "The Hidden Queen",
    icon: Sparkles,
    color: "from-pink-500 to-rose-500",
    bgColor: "bg-pink-500/10",
    borderColor: "border-pink-500/30",
    description: "Uncover Esther's strategic faith concealment",
  },
  {
    id: "churchResponse",
    sessionId: COURSE_SESSION_IDS.churchResponse,
    title: "The Double Standard",
    subtitle: "Why We Judge Differently",
    icon: Scale,
    color: "from-red-500 to-orange-500",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/30",
    description: "Confront the church's inconsistent standards",
  },
  {
    id: "conclusion",
    sessionId: COURSE_SESSION_IDS.conclusion,
    title: "The Application",
    subtitle: "Greek Life & Beyond",
    icon: Trophy,
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/30",
    description: "Apply these lessons to modern cultural engagement",
  },
];

// Helper function to get module TTS content
const getModuleTTSContent = (moduleId: string): string => {
  switch (moduleId) {
    case "introduction":
      return `${INTRODUCTION_CONTENT.title}. ${INTRODUCTION_CONTENT.subtitle}. ${INTRODUCTION_CONTENT.scenario}`;
    case "joseph":
      return `${JOSEPH_CONTENT.title}. ${JOSEPH_CONTENT.subtitle}. ${JOSEPH_CONTENT.portrait.points.map(p => `${p.category}: ${p.items.join('. ')}`).join('. ')}. ${JOSEPH_CONTENT.biblicalReality.points.map(p => `${p.title}: ${p.content}`).join('. ')}`;
    case "daniel":
      return `${DANIEL_CONTENT.title}. ${DANIEL_CONTENT.subtitle}. ${DANIEL_CONTENT.portrait.points.map(p => `${p.category}: ${p.items.join('. ')}`).join('. ')}. ${DANIEL_CONTENT.biblicalReality.points.map(p => `${p.title}: ${p.content}`).join('. ')}`;
    case "esther":
      return `${ESTHER_CONTENT.title}. ${ESTHER_CONTENT.subtitle}. ${ESTHER_CONTENT.portrait.points.map(p => `${p.category}: ${p.items.join('. ')}`).join('. ')}. ${ESTHER_CONTENT.biblicalReality.points.map(p => `${p.title}: ${p.content}`).join('. ')}`;
    case "churchResponse":
      return `${CHURCH_RESPONSE_CONTENT.title}. ${CHURCH_RESPONSE_CONTENT.sections.map(s => `${s.title}: ${s.content}`).join('. ')}`;
    case "conclusion":
      return `${CONCLUSION_CONTENT.title}. ${CONCLUSION_CONTENT.keyTakeaways.map(t => `${t.title}: ${t.content}`).join('. ')}. ${CONCLUSION_CONTENT.callToAction}`;
    default:
      return "";
  }
};

export default function SaintsOrSellouts() {
  const { isSessionComplete, toggleSession, progress: studyProgress, isAuthenticated } = useStudyProgress();
  const { awardPoints } = useGamification();
  const { speak, stop, isPlaying, isLoading } = useTTS({ voice: 'marcus' }); // African-American male voice for modules
  const { speak: speakQuestion, stop: stopQuestion, isPlaying: isPlayingQuestion, isLoading: isLoadingQuestion } = useTTS({ voice: 'marcus' }); // African-American male voice for questions
  const [playingModuleId, setPlayingModuleId] = useState<string | null>(null);
  const [isQuestionTTSActive, setIsQuestionTTSActive] = useState(false);
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasRevealed, setHasRevealed] = useState(false);
  const [pointsAwarded, setPointsAwarded] = useState(false);

  // Get completed modules
  const completedModules = studyProgress
    .filter(p => p.session_id >= 31 && p.session_id <= 36 && p.completed)
    .map(p => p.session_id);

  const completedCount = completedModules.length;
  const progressPercentage = (completedCount / 6) * 100;

  const { triggerLessonComplete, triggerMilestone } = useLessonCelebration();
  const previousCompletedRef = useRef<number[]>([]);

  // TTS handlers
  const handlePlayInstructions = () => {
    if (isPlaying) {
      stop();
      setPlayingModuleId(null);
    } else {
      setPlayingModuleId("instructions");
      speak(COURSE_INSTRUCTIONS);
    }
  };

  const handlePlayModuleTTS = (e: React.MouseEvent, moduleId: string) => {
    e.stopPropagation();
    if (isPlaying && playingModuleId === moduleId) {
      stop();
      setPlayingModuleId(null);
    } else {
      setPlayingModuleId(moduleId);
      const content = getModuleTTSContent(moduleId);
      speak(content);
    }
  };

  // Track module completions for celebrations and award points
  useEffect(() => {
    const prevCompleted = previousCompletedRef.current;
    const newlyCompleted = completedModules.filter(id => !prevCompleted.includes(id));

    if (newlyCompleted.length > 0) {
      newlyCompleted.forEach((sessionId, index) => {
        const moduleIndex = sessionId - 31;
        const module = MODULES[moduleIndex];
        const moduleTitle = module?.title || `Module ${moduleIndex + 1}`;
        setTimeout(() => triggerLessonComplete(moduleIndex + 1, moduleTitle), index * 500);
      });

      if (prevCompleted.length < completedModules.length) {
        if (completedModules.length === 1 && prevCompleted.length === 0) {
          setTimeout(() => triggerMilestone('first'), 2500);
        } else if (completedModules.length === 3) {
          setTimeout(() => triggerMilestone('halfway'), 2500);
        } else if (completedModules.length === 6 && !pointsAwarded) {
          awardPoints({ points: 60, actionType: 'saints_sellouts_completion' });
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

  const renderIntroductionModule = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-500/20 to-violet-500/20 rounded-lg p-6 border border-purple-500/30">
        <Badge variant="outline" className="bg-purple-500/10 text-purple-600 border-purple-500/30 mb-4">
          Opening Scenario
        </Badge>
        <h3 className="text-2xl font-bold mb-2">{INTRODUCTION_CONTENT.title}</h3>
        <p className="text-muted-foreground">{INTRODUCTION_CONTENT.subtitle}</p>
      </div>

      <div className="prose prose-sm dark:prose-invert max-w-none bg-muted/50 rounded-lg p-6 border">
        <p className="whitespace-pre-line text-foreground/90 leading-relaxed">
          {INTRODUCTION_CONTENT.scenario}
        </p>
      </div>

      {!hasRevealed ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h4 className="font-semibold text-lg">{INTRODUCTION_CONTENT.question}</h4>
            <button
              onClick={() => {
                if (isPlayingQuestion) {
                  stopQuestion();
                  setIsQuestionTTSActive(false);
                } else {
                  setIsQuestionTTSActive(true);
                  const questionText = `${INTRODUCTION_CONTENT.question} Your options are: ${INTRODUCTION_CONTENT.options.map(o => o.label).join('. ')}`;
                  speakQuestion(questionText);
                }
              }}
              disabled={isLoadingQuestion}
              className={cn(
                "p-2 rounded-full transition-all shrink-0",
                isPlayingQuestion
                  ? "bg-purple-500/20 text-purple-500"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
              title={isPlayingQuestion ? "Stop audio" : "Listen to question"}
            >
              {isLoadingQuestion ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : isPlayingQuestion ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </button>
          </div>
          <div className="grid gap-3">
            {INTRODUCTION_CONTENT.options.map((option) => {
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

          {selectedOption && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-end"
            >
              <Button onClick={() => setHasRevealed(true)} className="gap-2">
                <Eye className="w-4 h-4" /> Reveal Who They Are
              </Button>
            </motion.div>
          )}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          <div className="text-center p-6 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 rounded-lg border border-amber-500/30">
            <Sparkles className="w-12 h-12 mx-auto text-amber-500 mb-4" />
            <h3 className="text-2xl font-bold text-amber-600 dark:text-amber-400 mb-2">
              The Reveal
            </h3>
            <p className="text-lg font-medium">{INTRODUCTION_CONTENT.revealText}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card className="border-amber-500/30 bg-amber-500/5">
              <CardHeader className="text-center pb-2">
                <Crown className="w-8 h-8 mx-auto text-amber-500 mb-2" />
                <CardTitle className="text-lg">Joseph</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-sm text-muted-foreground">
                Egyptian Prince & Vizier
              </CardContent>
            </Card>
            <Card className="border-blue-500/30 bg-blue-500/5">
              <CardHeader className="text-center pb-2">
                <Scroll className="w-8 h-8 mx-auto text-blue-500 mb-2" />
                <CardTitle className="text-lg">Daniel</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-sm text-muted-foreground">
                Babylonian Statesman
              </CardContent>
            </Card>
            <Card className="border-pink-500/30 bg-pink-500/5">
              <CardHeader className="text-center pb-2">
                <Sparkles className="w-8 h-8 mx-auto text-pink-500 mb-2" />
                <CardTitle className="text-lg">Esther</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-sm text-muted-foreground">
                Persian Queen
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end">
            <Button onClick={() => completeModule("introduction")} className="gap-2">
              Begin the Journey <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );

  const renderBiblicalFigureModule = (content: typeof JOSEPH_CONTENT, accentColor: string) => (
    <div className="space-y-6">
      <div className={cn("text-center p-6 rounded-lg border", `bg-${accentColor}-500/10 border-${accentColor}-500/30`)}>
        <Badge className={cn("mb-4", `bg-${accentColor}-500/20 text-${accentColor}-600 border-${accentColor}-500/30`)}>
          {content.scripture}
        </Badge>
        <h3 className="text-2xl font-bold mb-1">{content.title}</h3>
        <p className="text-muted-foreground">{content.subtitle}</p>
        <p className="text-sm mt-2 font-medium">Given Name: <span className="italic">{content.name}</span></p>
      </div>

      {/* Problematic Profile */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            {content.portrait.title}
          </CardTitle>
          <CardDescription>What modern critics might find troubling</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {content.portrait.points.map((section, index) => (
            <div key={index}>
              <h5 className="font-semibold text-sm mb-2">{section.category}</h5>
              <ul className="space-y-1">
                {section.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Circle className="w-2 h-2 mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Modern Church Reaction */}
      <Card className="border-red-500/30 bg-red-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg text-red-600 dark:text-red-400">
            <ThumbsDown className="w-5 h-5" />
            {content.modernChurchReaction.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {content.modernChurchReaction.objections.map((objection, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <AlertTriangle className="w-4 h-4 mt-0.5 text-red-500 flex-shrink-0" />
                <span className="text-foreground/80">{objection}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Biblical Reality */}
      <Card className="border-green-500/30 bg-green-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg text-green-600 dark:text-green-400">
            <BookMarked className="w-5 h-5" />
            {content.biblicalReality.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {content.biblicalReality.points.map((point, i) => (
            <div key={i} className="space-y-1">
              <h5 className="font-semibold text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                {point.title}
              </h5>
              <p className="text-sm text-muted-foreground pl-6">{point.content}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={() => completeModule(activeModule!)} className="gap-2">
          Continue <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );

  const renderChurchResponseModule = () => (
    <div className="space-y-6">
      <div className="text-center p-6 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-lg border border-red-500/30">
        <Scale className="w-12 h-12 mx-auto text-red-500 mb-4" />
        <h3 className="text-2xl font-bold mb-2">{CHURCH_RESPONSE_CONTENT.title}</h3>
        <p className="text-muted-foreground">{CHURCH_RESPONSE_CONTENT.subtitle}</p>
      </div>

      <div className="space-y-4">
        {CHURCH_RESPONSE_CONTENT.sections.map((section, index) => (
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

      <Card className="border-purple-500/30 bg-purple-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <HelpCircle className="w-5 h-5 text-purple-500" />
            Questions for Reflection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {CHURCH_RESPONSE_CONTENT.applicationQuestions.map((question, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-purple-500">{i + 1}</span>
                </div>
                <span className="text-foreground/90">{question}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={() => completeModule("churchResponse")} className="gap-2">
          Continue to Conclusion <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );

  const renderConclusionModule = () => (
    <div className="space-y-6">
      <div className="text-center py-6">
        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center mb-4">
          <Trophy className="w-10 h-10 text-green-500" />
        </div>
        <h3 className="text-2xl font-bold mb-2">{CONCLUSION_CONTENT.title}</h3>
        <p className="text-muted-foreground">{CONCLUSION_CONTENT.subtitle}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {CONCLUSION_CONTENT.keyTakeaways.map((takeaway, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full border-green-500/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 font-bold text-sm">
                    {index + 1}
                  </div>
                  {takeaway.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{takeaway.content}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg p-6 border border-green-500/30">
        <h4 className="font-semibold mb-3 text-green-600 dark:text-green-400 flex items-center gap-2">
          <Lightbulb className="w-5 h-5" />
          Final Thought
        </h4>
        <p className="text-foreground/90 italic">{CONCLUSION_CONTENT.callToAction}</p>
      </div>

      <div className="flex justify-end">
        <Button onClick={() => completeModule("conclusion")} className="gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
          <Trophy className="w-4 h-4" /> Complete Course
        </Button>
      </div>
    </div>
  );

  const renderActiveModule = () => {
    switch (activeModule) {
      case "introduction":
        return renderIntroductionModule();
      case "joseph":
        return renderBiblicalFigureModule(JOSEPH_CONTENT, "amber");
      case "daniel":
        return renderBiblicalFigureModule(DANIEL_CONTENT, "blue");
      case "esther":
        return renderBiblicalFigureModule(ESTHER_CONTENT, "pink");
      case "churchResponse":
        return renderChurchResponseModule();
      case "conclusion":
        return renderConclusionModule();
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-16 px-4 bg-gradient-to-br from-purple-900/20 via-background to-amber-900/10 border-b">
        <div className="max-w-6xl mx-auto">
          {/* Back to Dashboard */}
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Badge className="bg-gradient-to-r from-purple-500 to-amber-500 text-white border-0">
                  Interactive Course
                </Badge>
                <Badge variant="outline" className="border-amber-500/50 text-amber-600">
                  6 Modules
                </Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">
                <span className="bg-gradient-to-r from-purple-500 via-amber-500 to-pink-500 bg-clip-text text-transparent">
                  Saints or Sellouts?
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Biblical Icons the Modern Church Might Cancel
              </p>
              <p className="text-muted-foreground max-w-xl">
                Would your church embrace Joseph, Daniel, and Esther... or condemn them as worldly compromisers?
              </p>
            </div>

            <div className="flex flex-col items-end gap-3">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Your Progress</p>
                <p className="text-3xl font-bold">{completedCount}/6</p>
              </div>
              <Progress value={progressPercentage} className="w-48 h-2" />
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2"
                onClick={handlePlayInstructions}
                disabled={isLoading}
              >
                {isLoading && playingModuleId === "instructions" ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : isPlaying && playingModuleId === "instructions" ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
                {isPlaying && playingModuleId === "instructions" ? "Stop" : "Listen to Instructions"}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            {activeModule ? (
              <motion.div
                key="active-module"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <Button
                  variant="ghost"
                  onClick={() => setActiveModule(null)}
                  className="gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Modules
                </Button>
                
                <Card className="overflow-hidden">
                  <CardHeader className="bg-muted/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {(() => {
                          const module = MODULES.find(m => m.id === activeModule);
                          const Icon = module?.icon || BookOpen;
                          return (
                            <>
                              <div className={cn("p-3 rounded-lg", module?.bgColor)}>
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
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => handlePlayModuleTTS(e, activeModule)}
                        disabled={isLoading}
                      >
                        {isLoading && playingModuleId === activeModule ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : isPlaying && playingModuleId === activeModule ? (
                          <VolumeX className="w-5 h-5" />
                        ) : (
                          <Volume2 className="w-5 h-5" />
                        )}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ScrollArea className="h-[60vh]">
                      {renderActiveModule()}
                    </ScrollArea>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="module-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
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
                            "cursor-pointer transition-all hover:shadow-lg",
                            module.borderColor,
                            isComplete && "bg-green-500/5 border-green-500/30",
                            isLocked && "opacity-50 cursor-not-allowed"
                          )}
                          onClick={() => !isLocked && startModule(module.id)}
                        >
                          <CardHeader>
                            <div className="flex items-center justify-between mb-2">
                              <div className={cn(
                                "p-3 rounded-lg",
                                isComplete ? "bg-green-500/20" : module.bgColor
                              )}>
                                {isComplete ? (
                                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                                ) : isLocked ? (
                                  <Lock className="w-6 h-6 text-muted-foreground" />
                                ) : (
                                  <Icon className="w-6 h-6" />
                                )}
                              </div>
                              <Badge variant="outline" className={cn(
                                "text-xs",
                                isComplete && "bg-green-500/10 text-green-600 border-green-500/30"
                              )}>
                                {isComplete ? "Complete" : `Module ${index + 1}`}
                              </Badge>
                            </div>
                            <CardTitle className="text-lg">{module.title}</CardTitle>
                            <CardDescription>{module.subtitle}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground">
                              {module.description}
                            </p>
                            {!isLocked && !isComplete && (
                              <Button className="w-full mt-4 gap-2" size="sm">
                                Start Module <ArrowRight className="w-4 h-4" />
                              </Button>
                            )}
                            {isComplete && (
                              <Button variant="outline" className="w-full mt-4 gap-2" size="sm">
                                Review <Eye className="w-4 h-4" />
                              </Button>
                            )}
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>

                {completedCount === 6 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-8"
                  >
                    <Card className="bg-gradient-to-r from-purple-500/10 via-amber-500/10 to-pink-500/10 border-amber-500/30">
                      <CardContent className="text-center py-8">
                        <Trophy className="w-16 h-16 mx-auto text-amber-500 mb-4" />
                        <h3 className="text-2xl font-bold mb-2">Course Complete!</h3>
                        <p className="text-muted-foreground max-w-md mx-auto">
                          You've gained a biblical framework for understanding cultural engagement through the lives of Joseph, Daniel, and Esther.
                        </p>
                        <CourseRecommendations 
                          excludePaths={["/saints-or-sellouts"]} 
                          maxRecommendations={2}
                        />
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
