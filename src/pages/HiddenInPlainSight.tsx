import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  CheckCircle2,
  Circle,
  Eye,
  ChevronRight,
  ChevronDown,
  Lightbulb,
  BookMarked,
  GraduationCap,
  Shield,
  Heart,
  Trophy,
  Lock,
  Unlock,
  ArrowRight,
  ArrowLeft,
  HelpCircle,
  ThumbsUp,
  ThumbsDown,
  Volume2,
  VolumeX,
  Loader2,
  Cake,
  Church,
  Gift,
  Calendar,
  Sparkles,
  Target,
} from "lucide-react";
import { useStudyProgress } from "@/hooks/use-study-progress";
import { useGamification } from "@/hooks/use-gamification";
import { useLessonCelebration } from "@/hooks/use-lesson-celebration";
import { useTTS } from "@/hooks/use-tts";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Session IDs 40-48 for Hidden in Plain Sight course (9 modules)
const COURSE_SESSION_IDS = {
  caseStudy: 40,
  reveal: 41,
  contextMatters: 42,
  doubleStandard: 43,
  cosmetics: 44,
  architecture: 45,
  language: 46,
  application: 47,
  conclusion: 48,
};

const CASE_STUDY_SCENARIO = {
  title: "The Birthday Celebration",
  setting: "A family gathering in 2024",
  scenario: `Your family is celebrating a child's birthday. As the cake is brought out with lit candles, the child is encouraged to:

1. Make a secret wish upon the candles
2. Blow out all the flames in one breath to "seal" the wish
3. Keep the wish completely secret, or it "won't come true"

Everyone gathers in a circle, singing a traditional song, while the candles' flames flicker. The child closes their eyes, concentrates on their deepest desire, then attempts to extinguish all flames simultaneously.

If successful, the gathered witnesses clap and affirm that the wish will be granted. The child receives a crown or special hat, sits in a place of honor, and receives offerings (gifts) from all present.`,
  initialQuestion: "Based on what you've just read, how would you classify this ritual?",
  options: [
    { id: "normal", label: "This is a normal, harmless tradition", icon: ThumbsUp },
    { id: "unsure", label: "I never thought about it this way", icon: HelpCircle },
    { id: "concerning", label: "This does sound ritualistic when described this way", icon: Eye },
    { id: "pagan", label: "This could have pagan origins", icon: ThumbsDown },
  ],
};

const REVEAL_CONTENT = {
  source: "Historical & Anthropological Research",
  title: "The Pagan Origins of Birthday Celebrations",
  explanation: `What you just read is a description of a typical American birthday party—but with the ritualistic elements highlighted.

The tradition of birthday candles traces directly to ancient Greece, where round cakes with lit candles were offered to Artemis, goddess of the moon and the hunt. The candles represented moonlight, and blowing them out sent prayers to the goddess.

The Germans later developed "Kinderfest" (children's festival) where a single candle represented the "light of life." The practice of making wishes and keeping them secret is a form of sympathetic magic—the belief that speaking a desire aloud breaks its power.`,
  keyPoints: [
    {
      title: "Artemis & Moon Worship",
      content: "Ancient Greeks placed candles on round cakes offered to Artemis. The circular shape represented the full moon, and the candles' smoke carried prayers upward to the goddess. This is the direct ancestor of the modern birthday cake.",
    },
    {
      title: "Wish Magic & Secrecy",
      content: "The requirement to keep wishes secret stems from ancient magical thinking: speaking a wish aloud allows evil spirits to hear and prevent it. This 'sympathetic magic' concept persists in modern birthday traditions.",
    },
    {
      title: "Birthday Crowns & Gift Offerings",
      content: "Placing birthday children in positions of honor with crowns mirrors ancient practices of honoring individuals on their 'name day' as temporarily elevated beings worthy of tribute and offerings.",
    },
    {
      title: "The Survival of Ritual Form",
      content: "Despite Christian influence, these pagan elements survived relatively intact because they were seen as 'harmless fun' rather than religious practice—the same argument used against Greek Life rituals.",
    },
  ],
};

const CONTEXT_MATTERS_CONTENT = {
  title: "The Double Standard Exposed",
  mainPoint: "If birthday candle wishes are 'just tradition,' why are Greek Life rituals treated as spiritually dangerous?",
  sections: [
    {
      title: "Wedding Traditions",
      content: "The white wedding dress (symbol of goddess Diana/virgin purity), 'something old, new, borrowed, blue' (four elements of protection magic), wedding rings (symbol of eternity from Egyptian sun worship), bridesmaids (decoys to confuse evil spirits targeting the bride), and throwing rice (fertility blessing from pagan harvest rites) all have pagan origins.",
    },
    {
      title: "Holiday Observances",
      content: "Valentine's Day derives from Lupercalia (Roman fertility festival). Christmas trees, Yule logs, and December 25th celebrations borrowed from Saturnalia and winter solstice festivals. Easter eggs and bunnies connect to Eostre, goddess of spring and fertility.",
    },
    {
      title: "Memorial Day & Decoration Day",
      content: "The tradition of decorating graves with flowers connects directly to Rosalia, the ancient Roman festival of roses honoring the dead. Memorial wreaths, flower arrangements, and cemetery visits preserve this pagan practice of appeasing departed spirits.",
    },
  ],
};

const DOUBLE_STANDARD_CONTENT = {
  title: "Symbols Hidden in Plain Sight",
  introduction: "Examine how pagan symbols and references permeate everyday American life without controversy.",
  points: [
    {
      title: "Nike: The Winged Goddess",
      content: "The Nike 'swoosh' represents the wing of Nike, Greek goddess of victory. This pagan deity adorns millions of Christians' clothing, shoes, and accessories—yet wearing Greek letters is condemned as 'worldly.'",
    },
    {
      title: "Mercedes-Benz: Ruler of Three Realms",
      content: "The iconic three-pointed star hood ornament symbolizes the company's ambition to dominate air, land, and sea transportation. This triad symbol echoes ancient pagan cosmology dividing existence into three realms ruled by different deities—yet Christians proudly display it on their vehicles.",
    },
    {
      title: "Volkswagen & Sundials",
      content: "The Volkswagen emblem contains overlapping V and W letters forming a design reminiscent of ancient solar symbols. Sundials, still used decoratively in Christian gardens and churches, are direct relics of sun worship—yet no one questions their presence on church grounds.",
    },
    {
      title: "Pharmacy: The Art of Sorcery",
      content: "The word 'pharmacy' derives from the Greek 'pharmakeia'—the same word translated as 'sorcery' or 'witchcraft' in Galatians 5:20 and Revelation 18:23. The Rx symbol traces to the Eye of Horus. Christians fill prescriptions at 'sorcery shops' without perceiving spiritual danger.",
    },
    {
      title: "Days of the Week",
      content: "Sunday (Sun god), Monday (Moon goddess), Tuesday (Tiw/Mars), Wednesday (Odin/Mercury), Thursday (Thor/Jupiter), Friday (Freya/Venus), Saturday (Saturn). Christians use pagan god names daily without spiritual concern.",
    },
    {
      title: "Months of the Year",
      content: "January (Janus), March (Mars), May (Maia), June (Juno)—Roman gods embedded in our calendar. We write these names, schedule church events around them, and never question their origins.",
    },
    {
      title: "Currency & Government",
      content: "The American dollar features the Eye of Providence (from Egyptian mysticism), the pyramid (ancient Egyptian symbolism), and Latin phrases. Yet Christians handle money daily without perceiving spiritual danger.",
    },
    {
      title: "Funeral Practices",
      content: "The repass (fellowship meal after burial) echoes Roman funeral banquets. Pallbearers, funeral processions, wearing black, and even coffin designs derive from pagan death rituals absorbed into Christian practice.",
    },
  ],
  conclusion: "The selective application of 'pagan origins' criticism reveals cultural bias rather than consistent theological principle. Either all pagan-derived practices are spiritually dangerous, or context and intent matter for all of them.",
};

const COSMETICS_CONTENT = {
  title: "Beauty Rituals of the Ancients",
  introduction: "Discover how modern beauty practices trace directly to ancient Egyptian religious rituals honoring pagan deities.",
  points: [
    {
      title: "Wigs: The Crown of Isis",
      content: "Ancient Egyptians wore wigs as symbols of status and religious devotion, particularly to the goddess Isis who was depicted with elaborate hairstyles. Pharaohs and priests wore wigs during religious ceremonies. Today, wigs remain popular in churches, fashion, and entertainment—yet this Egyptian religious practice raises no spiritual concerns.",
    },
    {
      title: "Eyeliner: The Eye of Horus",
      content: "The distinctive Egyptian kohl eyeliner was applied to honor and invoke the protection of Horus, god of the sky. The iconic 'cat eye' shape mimics the Eye of Horus symbol believed to ward off evil. Modern makeup tutorials teach this exact technique to Christians who would never consider it 'pagan worship.'",
    },
    {
      title: "Braids: The River Nile & Fertility",
      content: "Egyptian braiding patterns symbolized the flowing Nile River and were associated with fertility goddesses like Isis and Hathor. Intricate cornrows and braids held religious significance, connecting the wearer to divine feminine power and agricultural abundance. These same styles are worn in churches every Sunday.",
    },
    {
      title: "Perfumes & Anointing Oils",
      content: "The cosmetics industry's foundation lies in Egyptian temple practices. Perfumes were offerings to deities, and anointing oils were used in pagan rituals long before they were adopted into Jewish and Christian practice. The word 'cosmetic' itself derives from 'kosmos'—the Greek concept of divine order.",
    },
    {
      title: "Mirrors: Portal to the Divine",
      content: "Ancient Egyptians believed mirrors were magical objects that could capture the soul and provide access to the spiritual realm. Mirrors were sacred to Hathor, goddess of beauty and love. Christians use mirrors daily without perceiving any spiritual danger in this 'pagan technology.'",
    },
  ],
  conclusion: "The beauty industry is built on Egyptian religious practices honoring Isis, Horus, Hathor, and other deities. If wearing Greek letters is spiritually dangerous, then eyeliner, wigs, braids, and perfume should be equally concerning—yet they are not.",
};

const ARCHITECTURE_CONTENT = {
  title: "Sacred Spaces & Design",
  introduction: "Examine how pagan design elements permeate Christian worship spaces and religious art.",
  points: [
    {
      title: "Church Domes: Eyes of Zeus",
      content: "The dome structure in Christian architecture traces to Roman temples dedicated to the gods, particularly the Pantheon (temple to 'all gods'). The oculus (central opening) represented the 'Eye of Zeus' or the heavens watching down. St. Peter's Basilica and countless churches feature this pagan architectural element.",
    },
    {
      title: "Pulpits: From the Roman Senate",
      content: "The elevated pulpit where pastors preach derives from the Roman rostra—the raised platform in the Senate where orators addressed crowds. This political symbol of authority was adopted by churches, yet the 'pagan government' origin is never questioned.",
    },
    {
      title: "Church Altars: Pagan Sacrifice Tables",
      content: "The rectangular altar at the front of churches mirrors the design of ancient pagan sacrifice tables. Greek, Roman, and other temples featured identical rectangular stone structures for offerings to deities. The Christian altar maintains this exact form.",
    },
    {
      title: "Church Steeples & Obelisks",
      content: "Church steeples evolved from Egyptian obelisks dedicated to the sun god Ra. The pointed spire reaching toward heaven mirrors pagan 'axis mundi' concepts—the connection between earth and the divine realm.",
    },
    {
      title: "Halos in Religious Art",
      content: "The golden disc behind saints' heads derives from sun worship. Roman emperors, Persian kings, and Greek gods were depicted with solar halos long before Christians adopted the symbol for Jesus and saints.",
    },
    {
      title: "Gargoyles & Grotesques",
      content: "Medieval churches feature pagan creatures—dragons, demons, and hybrid beasts—carved into their facades. Originally protective spirits from pre-Christian religions, they were 'baptized' into Christian architecture.",
    },
    {
      title: "Cathedral Floor Labyrinths",
      content: "Circular labyrinths in cathedral floors (like Chartres) trace to Greek mythology's Cretan labyrinth. Walking these patterns was a pagan meditative practice adapted for Christian pilgrimage.",
    },
  ],
  conclusion: "Christians worship in buildings featuring Zeus's eye (domes), Roman Senate platforms (pulpits), and pagan sacrifice tables (altars)—yet these 'baptized' elements raise no concern while Greek organizational symbols face condemnation.",
};

const LANGUAGE_CONTENT = {
  title: "Everyday Pagan Phrases",
  introduction: "Discover the pagan origins hidden in common English expressions—and a common misinterpretation of Proverbs 18:21.",
  points: [
    {
      title: "The 'Power of Death and Life' Misinterpretation",
      content: "Some Christian leaders have taken Proverbs 18:21 ('Death and life are in the power of the tongue') out of context, teaching that spoken words have autonomous magical power. If this interpretation were true, merely saying words would invoke magic spells—making every pagan phrase Christians speak a genuine spiritual danger. But the verse describes the relational and social impact of speech, not incantation magic.",
    },
    {
      title: "Sympathetic Witchcraft Warning",
      content: "If you believe that uttering words has power without faith or belief behind them, you are guilty of practicing sympathetic witchcraft—the casting of spells. Sympathetic magic operates on the principle that 'like produces like' and that words or symbols automatically produce effects regardless of intent. This is sorcery, not biblical faith. Scripture teaches that faith activates spiritual reality (Hebrews 11:1), not the mere pronunciation of syllables.",
    },
    {
      title: "If Words Were Magic Spells...",
      content: "If words automatically invoked spiritual power, then saying 'Thursday' (Thor's Day), 'cereal' (goddess Ceres), or 'good luck' (the Fates) would be actual pagan worship. The fact that Christians say these words without spiritual consequence proves that context and intent matter—not the mere utterance of sounds.",
    },
    {
      title: "'Knock on Wood'",
      content: "This phrase comes from Celtic tree worship—knocking to awaken protective spirits living in trees. Christians say this without perceiving spiritual danger, yet similar protective gestures in other contexts are condemned.",
    },
    {
      title: "'Bless You' (Sneezing)",
      content: "Originally said to prevent evil spirits from entering through the open mouth, or to keep the soul from escaping. Pope Gregory I popularized it during plague years, but the practice predates Christianity.",
    },
    {
      title: "'Good Luck' & 'Lucky'",
      content: "Derived from 'Lachesis,' one of the Greek Fates who determined destiny. Wishing someone 'good luck' invokes pagan concepts of fortune and fate that contradict Christian providence theology.",
    },
    {
      title: "'Nightmare'",
      content: "From 'mare'—a Germanic demon believed to sit on sleepers' chests causing bad dreams. Using this word perpetuates belief in pagan night demons, yet no one considers it spiritually compromising.",
    },
    {
      title: "'Cereal' & 'Jovial'",
      content: "'Cereal' honors Ceres, Roman goddess of grain. 'Jovial' refers to Jupiter's supposed influence on mood. Christians eat cereal and describe friends as jovial without invoking pagan deities.",
    },
    {
      title: "'Panic' & 'Echo'",
      content: "'Panic' derives from Pan, the Greek god who caused sudden fear. 'Echo' was a nymph cursed by Hera. These mythological references saturate English without spiritual concern.",
    },
  ],
  conclusion: "The English language is saturated with pagan deity references, mythological concepts, and superstitious phrases. If Proverbs 18:21 meant words have magical power, Christians using these terms daily would be practicing sorcery. The consistent application proves context and intent matter—not the words themselves.",
};

const APPLICATION_CONTENT = {
  title: "Applying Consistent Standards",
  questions: [
    {
      question: "What makes something 'pagan' versus 'cultural'?",
      answers: [
        "Is worship being offered to a deity?",
        "Is spiritual power being claimed or invoked?",
        "Is allegiance being redirected from Christ?",
        "Or is it simply a cultural practice with historical roots?",
      ],
    },
    {
      question: "Questions to ask before condemning any practice:",
      answers: [
        "Do I apply this same standard to birthday parties, weddings, and holidays?",
        "Am I judging by appearance or by actual theological content?",
        "Is my discomfort cultural rather than biblical?",
        "Would I call my grandmother's practices 'pagan' using the same criteria?",
      ],
    },
  ],
  finalThought: "If birthday candles, wedding rings, Valentine's cards, Christmas trees, Nike shoes, and calendar names don't make us pagans, then neither do Greek letters, handshakes, or organizational rituals. Consistency requires either condemning all pagan-derived practices or extending grace to understand context and intent.",
};

const CONCLUSION_CONTENT = {
  title: "Course Summary: Hidden in Plain Sight",
  keyTakeaways: [
    {
      title: "Pagan Origins Are Everywhere",
      content: "Birthday candles, wedding traditions, holidays, weekday names, months, corporate logos, and even funeral customs all trace to pagan sources—yet Christians participate without spiritual concern.",
    },
    {
      title: "The Double Standard Is Real",
      content: "Condemning Greek Life rituals while celebrating birthdays with Artemis-derived candle wishes reveals inconsistent application of 'pagan origins' criticism.",
    },
    {
      title: "Intent and Context Matter",
      content: "Just as blowing out candles doesn't make you a moon-goddess worshiper, participating in organizational rituals doesn't make you a pagan—unless worship and allegiance are actually involved.",
    },
    {
      title: "Consistency Is Required",
      content: "Biblical discernment requires applying the same standard to familiar practices as to unfamiliar ones. Either all pagan-derived customs are dangerous, or none are inherently so.",
    },
  ],
  callToAction: "Armed with this understanding, you can now evaluate ritual practices consistently—whether birthday parties, wedding ceremonies, holiday celebrations, or organizational rituals. The standard must be theological content, not cultural familiarity.",
};

const COURSE_INSTRUCTIONS = `Welcome to "Hidden in Plain Sight"—a course that will challenge how you evaluate cultural practices. You'll discover that many beloved American and Christian traditions have direct pagan origins that we've accepted as "normal." Through an eye-opening case study format, you'll see how birthday candles, wedding traditions, holidays, cosmetics, architecture, language, and everyday symbols all trace to pagan sources. By the end, you'll have tools to evaluate practices consistently rather than selectively. Complete all nine modules to earn 200 points (22 points each, 24 for final). Let's uncover what's been hidden in plain sight!`;

const MODULES = [
  {
    id: "caseStudy",
    sessionId: COURSE_SESSION_IDS.caseStudy,
    title: "The Case Study",
    subtitle: "A Familiar Ritual",
    icon: Eye,
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    description: "Experience a ritual scenario and give your initial reaction",
  },
  {
    id: "reveal",
    sessionId: COURSE_SESSION_IDS.reveal,
    title: "The Reveal",
    subtitle: "Birthday Origins",
    icon: Cake,
    color: "from-pink-500 to-rose-500",
    bgColor: "bg-pink-500/10",
    borderColor: "border-pink-500/30",
    description: "Discover the pagan roots of birthday celebrations",
  },
  {
    id: "contextMatters",
    sessionId: COURSE_SESSION_IDS.contextMatters,
    title: "More Examples",
    subtitle: "Weddings, Holidays & More",
    icon: Gift,
    color: "from-purple-500 to-violet-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
    description: "Explore pagan origins in other beloved traditions",
  },
  {
    id: "doubleStandard",
    sessionId: COURSE_SESSION_IDS.doubleStandard,
    title: "Hidden Symbols",
    subtitle: "Logos, Pharmacy & Calendar",
    icon: Target,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    description: "See pagan symbols in everyday American life",
  },
  {
    id: "cosmetics",
    sessionId: COURSE_SESSION_IDS.cosmetics,
    title: "Beauty Rituals",
    subtitle: "Cosmetics & Egyptian Origins",
    icon: Sparkles,
    color: "from-fuchsia-500 to-pink-500",
    bgColor: "bg-fuchsia-500/10",
    borderColor: "border-fuchsia-500/30",
    description: "Explore Egyptian religious origins of wigs, eyeliner, and braids",
  },
  {
    id: "architecture",
    sessionId: COURSE_SESSION_IDS.architecture,
    title: "Sacred Spaces",
    subtitle: "Domes, Pulpits & Altars",
    icon: Church,
    color: "from-indigo-500 to-purple-500",
    bgColor: "bg-indigo-500/10",
    borderColor: "border-indigo-500/30",
    description: "Examine pagan elements in Christian architecture and art",
  },
  {
    id: "language",
    sessionId: COURSE_SESSION_IDS.language,
    title: "Hidden Words",
    subtitle: "Language & 'Power of the Tongue'",
    icon: BookMarked,
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/30",
    description: "Discover pagan phrases and the Proverbs 18:21 misinterpretation",
  },
  {
    id: "application",
    sessionId: COURSE_SESSION_IDS.application,
    title: "Application",
    subtitle: "Consistent Standards",
    icon: Lightbulb,
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/30",
    description: "Apply these principles consistently",
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

// Helper function to get module TTS content
const getModuleTTSContent = (moduleId: string): string => {
  switch (moduleId) {
    case "caseStudy":
      return `The Case Study: ${CASE_STUDY_SCENARIO.title}. ${CASE_STUDY_SCENARIO.scenario}`;
    case "reveal":
      return `The Reveal: ${REVEAL_CONTENT.title}. ${REVEAL_CONTENT.explanation}. ${REVEAL_CONTENT.keyPoints.map(p => `${p.title}: ${p.content}`).join(". ")}`;
    case "contextMatters":
      return `${CONTEXT_MATTERS_CONTENT.title}. ${CONTEXT_MATTERS_CONTENT.mainPoint}. ${CONTEXT_MATTERS_CONTENT.sections.map(s => `${s.title}: ${s.content}`).join(". ")}`;
    case "doubleStandard":
      return `${DOUBLE_STANDARD_CONTENT.title}. ${DOUBLE_STANDARD_CONTENT.introduction}. ${DOUBLE_STANDARD_CONTENT.points.map(p => `${p.title}: ${p.content}`).join(". ")}. ${DOUBLE_STANDARD_CONTENT.conclusion}`;
    case "cosmetics":
      return `${COSMETICS_CONTENT.title}. ${COSMETICS_CONTENT.introduction}. ${COSMETICS_CONTENT.points.map(p => `${p.title}: ${p.content}`).join(". ")}. ${COSMETICS_CONTENT.conclusion}`;
    case "architecture":
      return `${ARCHITECTURE_CONTENT.title}. ${ARCHITECTURE_CONTENT.introduction}. ${ARCHITECTURE_CONTENT.points.map(p => `${p.title}: ${p.content}`).join(". ")}. ${ARCHITECTURE_CONTENT.conclusion}`;
    case "language":
      return `${LANGUAGE_CONTENT.title}. ${LANGUAGE_CONTENT.introduction}. ${LANGUAGE_CONTENT.points.map(p => `${p.title}: ${p.content}`).join(". ")}. ${LANGUAGE_CONTENT.conclusion}`;
    case "application":
      return `${APPLICATION_CONTENT.title}. ${APPLICATION_CONTENT.questions.map(q => `${q.question} ${q.answers.join(". ")}`).join(". ")}. ${APPLICATION_CONTENT.finalThought}`;
    case "conclusion":
      return `${CONCLUSION_CONTENT.title}. ${CONCLUSION_CONTENT.keyTakeaways.map(t => `${t.title}: ${t.content}`).join(". ")}. ${CONCLUSION_CONTENT.callToAction}`;
    default:
      return "";
  }
};

export default function HiddenInPlainSight() {
  const { isSessionComplete, toggleSession, progress: studyProgress, isAuthenticated } = useStudyProgress();
  const { awardPoints } = useGamification();
  const { speak, stop, isPlaying, isLoading } = useTTS({ voice: 'marcus' });
  const { speak: speakQuestion, stop: stopQuestion, isPlaying: isPlayingQuestion, isLoading: isLoadingQuestion } = useTTS({ voice: 'marcus' });
  const [playingModuleId, setPlayingModuleId] = useState<string | null>(null);
  const [isQuestionTTSActive, setIsQuestionTTSActive] = useState(false);
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasRevealed, setHasRevealed] = useState(false);
  const [pointsAwarded, setPointsAwarded] = useState(false);

  // Get completed modules (now 40-48 for 9 modules)
  const completedModules = studyProgress
    .filter(p => p.session_id >= 40 && p.session_id <= 48 && p.completed)
    .map(p => p.session_id);

  const completedCount = completedModules.length;
  const progressPercentage = (completedCount / 9) * 100;

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
        const moduleIndex = sessionId - 40;
        const module = MODULES[moduleIndex];
        const moduleTitle = module?.title || `Module ${moduleIndex + 1}`;
        setTimeout(() => triggerLessonComplete(moduleIndex + 1, moduleTitle), index * 500);
      });

      if (prevCompleted.length < completedModules.length) {
        if (completedModules.length === 1 && prevCompleted.length === 0) {
          setTimeout(() => triggerMilestone('first'), 2500);
        } else if (completedModules.length === 5) {
          // Halfway at 5 of 9 modules
          setTimeout(() => triggerMilestone('halfway'), 2500);
        } else if (completedModules.length === 9 && !pointsAwarded) {
          awardPoints({ points: 200, actionType: 'hidden_plain_sight_completion' });
          setPointsAwarded(true);
          toast.success("🏆 Course Complete! +200 points earned!");
          setTimeout(() => triggerMilestone('complete'), 2500);
        }
      }
    }

    previousCompletedRef.current = [...completedModules];
  }, [completedModules, triggerLessonComplete, triggerMilestone, awardPoints, pointsAwarded]);

  // Stop TTS when component unmounts or active module changes
  useEffect(() => {
    return () => {
      stop();
      stopQuestion();
    };
  }, [stop, stopQuestion]);

  const handleModuleClick = (moduleId: string) => {
    setActiveModule(activeModule === moduleId ? null : moduleId);
  };

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleComplete = (moduleId: string, sessionId: number) => {
    if (!isAuthenticated) {
      toast.error("Please log in to track your progress");
      return;
    }
    toggleSession({ sessionId, completed: true });
  };

  const renderModuleContent = (moduleId: string) => {
    switch (moduleId) {
      case "caseStudy":
        return (
          <div className="space-y-6">
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-6">
              <h4 className="font-semibold text-lg mb-2">{CASE_STUDY_SCENARIO.title}</h4>
              <p className="text-sm text-muted-foreground mb-4">{CASE_STUDY_SCENARIO.setting}</p>
              <div className="whitespace-pre-line text-sm leading-relaxed">
                {CASE_STUDY_SCENARIO.scenario}
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="font-medium">{CASE_STUDY_SCENARIO.initialQuestion}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    if (isPlayingQuestion) {
                      stopQuestion();
                      setIsQuestionTTSActive(false);
                    } else {
                      setIsQuestionTTSActive(true);
                      const questionText = `${CASE_STUDY_SCENARIO.initialQuestion} Your options are: ${CASE_STUDY_SCENARIO.options.map(o => o.label).join(". ")}`;
                      speakQuestion(questionText);
                    }
                  }}
                  disabled={isLoadingQuestion}
                >
                  {isLoadingQuestion ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : isPlayingQuestion ? (
                    <VolumeX className="h-4 w-4" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {CASE_STUDY_SCENARIO.options.map((option) => (
                  <Button
                    key={option.id}
                    variant={selectedOption === option.id ? "default" : "outline"}
                    className={cn(
                      "justify-start h-auto py-3 px-4",
                      selectedOption === option.id && "bg-primary text-primary-foreground"
                    )}
                    onClick={() => handleOptionSelect(option.id)}
                  >
                    <option.icon className="h-4 w-4 mr-2 shrink-0" />
                    <span className="text-left text-sm">{option.label}</span>
                  </Button>
                ))}
              </div>
            </div>

            {selectedOption && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-4"
              >
                <Button
                  onClick={() => handleComplete("caseStudy", COURSE_SESSION_IDS.caseStudy)}
                  disabled={isSessionComplete(COURSE_SESSION_IDS.caseStudy)}
                  className="w-full"
                >
                  {isSessionComplete(COURSE_SESSION_IDS.caseStudy) ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Completed
                    </>
                  ) : (
                    <>
                      Continue to The Reveal
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </motion.div>
            )}
          </div>
        );

      case "reveal":
        return (
          <div className="space-y-6">
            <div className="bg-pink-500/10 border border-pink-500/30 rounded-lg p-6">
              <Badge className="mb-3 bg-pink-500/20 text-pink-700 dark:text-pink-300">
                {REVEAL_CONTENT.source}
              </Badge>
              <h4 className="font-semibold text-lg mb-4">{REVEAL_CONTENT.title}</h4>
              <p className="text-sm leading-relaxed whitespace-pre-line">
                {REVEAL_CONTENT.explanation}
              </p>
            </div>

            <div className="space-y-4">
              {REVEAL_CONTENT.keyPoints.map((point, index) => (
                <Card key={index} className="bg-card/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{point.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{point.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button
              onClick={() => handleComplete("reveal", COURSE_SESSION_IDS.reveal)}
              disabled={isSessionComplete(COURSE_SESSION_IDS.reveal)}
              className="w-full"
            >
              {isSessionComplete(COURSE_SESSION_IDS.reveal) ? (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Completed
                </>
              ) : (
                <>
                  I Understand the Origins
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        );

      case "contextMatters":
        return (
          <div className="space-y-6">
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-lg mb-2">{CONTEXT_MATTERS_CONTENT.title}</h4>
              <p className="text-sm text-muted-foreground italic">
                {CONTEXT_MATTERS_CONTENT.mainPoint}
              </p>
            </div>

            <div className="space-y-4">
              {CONTEXT_MATTERS_CONTENT.sections.map((section, index) => (
                <Card key={index} className="bg-card/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      {index === 0 && <Heart className="h-4 w-4 text-pink-500" />}
                      {index === 1 && <Calendar className="h-4 w-4 text-red-500" />}
                      {index === 2 && <Sparkles className="h-4 w-4 text-purple-500" />}
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{section.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button
              onClick={() => handleComplete("contextMatters", COURSE_SESSION_IDS.contextMatters)}
              disabled={isSessionComplete(COURSE_SESSION_IDS.contextMatters)}
              className="w-full"
            >
              {isSessionComplete(COURSE_SESSION_IDS.contextMatters) ? (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Completed
                </>
              ) : (
                <>
                  Continue to Hidden Symbols
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        );

      case "doubleStandard":
        return (
          <div className="space-y-6">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-lg mb-2">{DOUBLE_STANDARD_CONTENT.title}</h4>
              <p className="text-sm text-muted-foreground">
                {DOUBLE_STANDARD_CONTENT.introduction}
              </p>
            </div>

            <div className="grid gap-4">
              {DOUBLE_STANDARD_CONTENT.points.map((point, index) => (
                <Card key={index} className="bg-card/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{point.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{point.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <p className="text-sm font-medium">{DOUBLE_STANDARD_CONTENT.conclusion}</p>
            </div>

            <Button
              onClick={() => handleComplete("doubleStandard", COURSE_SESSION_IDS.doubleStandard)}
              disabled={isSessionComplete(COURSE_SESSION_IDS.doubleStandard)}
              className="w-full"
            >
              {isSessionComplete(COURSE_SESSION_IDS.doubleStandard) ? (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Completed
                </>
              ) : (
                <>
                  Continue to Beauty Rituals
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        );

      case "cosmetics":
        return (
          <div className="space-y-6">
            <div className="bg-fuchsia-500/10 border border-fuchsia-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-lg mb-2">{COSMETICS_CONTENT.title}</h4>
              <p className="text-sm text-muted-foreground">
                {COSMETICS_CONTENT.introduction}
              </p>
            </div>

            <div className="grid gap-4">
              {COSMETICS_CONTENT.points.map((point, index) => (
                <Card key={index} className="bg-card/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{point.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{point.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <p className="text-sm font-medium">{COSMETICS_CONTENT.conclusion}</p>
            </div>

            <Button
              onClick={() => handleComplete("cosmetics", COURSE_SESSION_IDS.cosmetics)}
              disabled={isSessionComplete(COURSE_SESSION_IDS.cosmetics)}
              className="w-full"
            >
              {isSessionComplete(COURSE_SESSION_IDS.cosmetics) ? (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Completed
                </>
              ) : (
                <>
                  Continue to Sacred Spaces
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        );

      case "architecture":
        return (
          <div className="space-y-6">
            <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-lg mb-2">{ARCHITECTURE_CONTENT.title}</h4>
              <p className="text-sm text-muted-foreground">
                {ARCHITECTURE_CONTENT.introduction}
              </p>
            </div>

            <div className="grid gap-4">
              {ARCHITECTURE_CONTENT.points.map((point, index) => (
                <Card key={index} className="bg-card/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{point.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{point.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <p className="text-sm font-medium">{ARCHITECTURE_CONTENT.conclusion}</p>
            </div>

            <Button
              onClick={() => handleComplete("architecture", COURSE_SESSION_IDS.architecture)}
              disabled={isSessionComplete(COURSE_SESSION_IDS.architecture)}
              className="w-full"
            >
              {isSessionComplete(COURSE_SESSION_IDS.architecture) ? (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Completed
                </>
              ) : (
                <>
                  Continue to Hidden Words
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        );

      case "language":
        return (
          <div className="space-y-6">
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-lg mb-2">{LANGUAGE_CONTENT.title}</h4>
              <p className="text-sm text-muted-foreground">
                {LANGUAGE_CONTENT.introduction}
              </p>
            </div>

            <div className="grid gap-4">
              {LANGUAGE_CONTENT.points.map((point, index) => (
                <Card key={index} className="bg-card/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{point.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{point.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <p className="text-sm font-medium">{LANGUAGE_CONTENT.conclusion}</p>
            </div>

            <Button
              onClick={() => handleComplete("language", COURSE_SESSION_IDS.language)}
              disabled={isSessionComplete(COURSE_SESSION_IDS.language)}
              className="w-full"
            >
              {isSessionComplete(COURSE_SESSION_IDS.language) ? (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Completed
                </>
              ) : (
                <>
                  Continue to Application
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        );

      case "application":
        return (
          <div className="space-y-6">
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-lg mb-2">{APPLICATION_CONTENT.title}</h4>
            </div>

            <div className="space-y-6">
              {APPLICATION_CONTENT.questions.map((q, qIndex) => (
                <Card key={qIndex} className="bg-card/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{q.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {q.answers.map((answer, aIndex) => (
                        <li key={aIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                          {answer}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
              <p className="text-sm font-medium">{APPLICATION_CONTENT.finalThought}</p>
            </div>

            <Button
              onClick={() => handleComplete("application", COURSE_SESSION_IDS.application)}
              disabled={isSessionComplete(COURSE_SESSION_IDS.application)}
              className="w-full"
            >
              {isSessionComplete(COURSE_SESSION_IDS.application) ? (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Completed
                </>
              ) : (
                <>
                  Continue to Conclusion
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        );

      case "conclusion":
        return (
          <div className="space-y-6">
            <div className="bg-teal-500/10 border border-teal-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-lg mb-2">{CONCLUSION_CONTENT.title}</h4>
            </div>

            <div className="space-y-4">
              {CONCLUSION_CONTENT.keyTakeaways.map((takeaway, index) => (
                <Card key={index} className="bg-card/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-amber-500" />
                      {takeaway.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{takeaway.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-lg p-4">
              <p className="text-sm font-medium">{CONCLUSION_CONTENT.callToAction}</p>
            </div>

            <Button
              onClick={() => handleComplete("conclusion", COURSE_SESSION_IDS.conclusion)}
              disabled={isSessionComplete(COURSE_SESSION_IDS.conclusion)}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
            >
            {isSessionComplete(COURSE_SESSION_IDS.conclusion) ? (
                <>
                  <Trophy className="h-4 w-4 mr-2" />
                  Course Completed! +200 Points
                </>
              ) : (
                <>
                  Complete Course & Earn 200 Points
                  <Trophy className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Dashboard</span>
          </Link>
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl md:text-3xl font-bold">Hidden in Plain Sight</h1>
              {progressPercentage === 100 ? (
                <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                  <Trophy className="w-3 h-3 mr-1" />
                  200 Points Earned
                </Badge>
              ) : (
                <Badge variant="outline" className="border-amber-500/50 text-amber-600">
                  <Trophy className="w-3 h-3 mr-1" />
                  Earn 200 Points
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground text-sm md:text-base">
              Discover pagan roots in everyday American & Christian traditions
            </p>
          </div>
        </div>

        {/* Progress Section */}
        <Card className="mb-6 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Course Progress</span>
              <span className="text-sm text-muted-foreground">
                {completedCount} / 9 modules completed
              </span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePlayInstructions}
                  disabled={isLoading}
                  className="gap-2"
                >
                  {isLoading && playingModuleId === "instructions" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : isPlaying && playingModuleId === "instructions" ? (
                    <VolumeX className="h-4 w-4" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                  Listen to Instructions
                </Button>
              </div>
              {progressPercentage === 100 && (
                <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/30">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Complete
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Modules */}
        <div className="space-y-4">
          {MODULES.map((module, index) => {
            const isComplete = isSessionComplete(module.sessionId);
            const isActive = activeModule === module.id;
            const isLocked = index > 0 && !isSessionComplete(MODULES[index - 1].sessionId);

            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={cn(
                    "cursor-pointer transition-all duration-300",
                    isActive && "ring-2 ring-primary",
                    isLocked && "opacity-60",
                    module.bgColor,
                    module.borderColor
                  )}
                  onClick={() => !isLocked && handleModuleClick(module.id)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "p-2 rounded-lg bg-gradient-to-br",
                          module.color
                        )}>
                          <module.icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg flex items-center gap-2">
                            {module.title}
                            {isLocked && <Lock className="h-4 w-4 text-muted-foreground" />}
                            {isComplete && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                          </CardTitle>
                          <CardDescription>{module.subtitle}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {!isLocked && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => handlePlayModuleTTS(e, module.id)}
                            disabled={isLoading}
                          >
                            {isLoading && playingModuleId === module.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : isPlaying && playingModuleId === module.id ? (
                              <VolumeX className="h-4 w-4" />
                            ) : (
                              <Volume2 className="h-4 w-4" />
                            )}
                          </Button>
                        )}
                        {isActive ? (
                          <ChevronDown className="h-5 w-5" />
                        ) : (
                          <ChevronRight className="h-5 w-5" />
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <CardContent className="pt-4">
                          <Separator className="mb-4" />
                          {renderModuleContent(module.id)}
                        </CardContent>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Auth Prompt */}
        {!isAuthenticated && (
          <Card className="mt-6 bg-amber-500/10 border-amber-500/30">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <Lock className="h-8 w-8 text-amber-500" />
                <div>
                  <h3 className="font-semibold">Sign in to Track Progress</h3>
                  <p className="text-sm text-muted-foreground">
                    Create an account to save your progress and earn achievements.
                  </p>
                </div>
                <Link to="/auth" className="ml-auto">
                  <Button>Sign In</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
