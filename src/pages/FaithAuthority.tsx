import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BeliefTeachingAudio } from "@/components/proof/BeliefTeachingAudio";
import { 
  ArrowLeft, 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  Play, 
  Clock, 
  Lightbulb,
  Zap,
  Shield,
  Heart,
  Circle
} from "lucide-react";
import { useNavigationProgress } from "@/hooks/use-navigation-progress";
import { useStudyProgress } from "@/hooks/use-study-progress";
import { useGamification } from "@/hooks/use-gamification";
import { BELIEF_SCRIPTURES } from "@/lib/proofFrameworkData";
import { ListenButton } from "@/components/ListenButton";
import { useLessonCelebration } from "@/hooks/use-lesson-celebration";
import { toast } from "sonner";

// Session IDs 16-21 are for Faith & Authority
const FAITH_SESSION_IDS = {
  intro: 16,
  jesusLimitedByUnbelief: 17,
  faithAsChannel: 18,
  beliefAndAuthority: 19,
  fearRequiresBelief: 20,
  proverbs1821: 21,
};

// Module color scheme
const MODULE_COLORS = {
  intro: { bg: 'bg-amber-500', bgLight: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-500', gradient: 'from-amber-500 to-orange-500' },
  jesusLimitedByUnbelief: { bg: 'bg-yellow-500', bgLight: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-500', gradient: 'from-yellow-500 to-orange-500' },
  faithAsChannel: { bg: 'bg-cyan-500', bgLight: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-500', gradient: 'from-cyan-500 to-blue-500' },
  beliefAndAuthority: { bg: 'bg-purple-500', bgLight: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-500', gradient: 'from-purple-500 to-pink-500' },
  fearRequiresBelief: { bg: 'bg-rose-500', bgLight: 'bg-rose-500/10', border: 'border-rose-500/30', text: 'text-rose-500', gradient: 'from-rose-500 to-red-500' },
  proverbs1821: { bg: 'bg-emerald-500', bgLight: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-500', gradient: 'from-emerald-500 to-teal-500' },
};

interface Module {
  id: string;
  sessionId: number;
  number: number;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  duration: string;
  takeaways: number;
  content: string;
  scriptures?: typeof BELIEF_SCRIPTURES.jesusLimitedByUnbelief;
}

const modules: Module[] = [
  {
    id: "intro",
    sessionId: FAITH_SESSION_IDS.intro,
    number: 0,
    title: "Introduction: The Core Principle",
    subtitle: "Understanding how belief operates in the spiritual realm",
    icon: <Zap className="w-6 h-6 text-white" />,
    duration: "5 min",
    takeaways: 3,
    content: `**The Foundation of Faith & Authority**

This module explores a powerful biblical truth: **what you don't believe cannot hold power over you**. Faith is the operating system of the spiritual realm.

**Key Principle:**

If you mentioned a deity's name during a ritual but did not know it was a deity and do not believe it to be a deity... it holds no authority over you. Paul wrote that an idol is "nothing in the world" (1 Corinthians 8:4). The false god has no real existence.

**Why This Matters:**

Many Christians live in fear of rituals, symbols, or words they encountered before understanding their alleged meaning. This teaching liberates believers from that fear by grounding them in Scripture.

**Biblical Foundation:**

• "We know that 'An idol is nothing at all in the world' and that 'There is no God but one.'" — 1 Corinthians 8:4

• "You were dead in your transgressions and sins... But because of his great love for us, God, who is rich in mercy, made us alive with Christ." — Ephesians 2:1,4-5

• "Greater is He who is in you than he who is in the world." — 1 John 4:4

**Reflection Questions:**

• Have I been living in fear of past rituals or symbols?
• Do I understand that my faith in Christ supersedes any past participation in ceremonies I didn't understand?
• Am I ready to walk in the freedom Christ has given me?`
  },
  {
    id: "jesusLimitedByUnbelief",
    sessionId: FAITH_SESSION_IDS.jesusLimitedByUnbelief,
    number: 1,
    title: "Module 1: Jesus Limited by Unbelief",
    subtitle: "Power was present, but access was blocked",
    icon: <Zap className="w-6 h-6 text-white" />,
    duration: "8 min",
    takeaways: 4,
    scriptures: BELIEF_SCRIPTURES.jesusLimitedByUnbelief,
    content: `**The Nazareth Principle**

One of the most remarkable passages in Scripture reveals that even Jesus—the Son of God with all authority—was "limited" by unbelief.

**The Key Text: Mark 6:5-6**

"He could not do any miracles there, except lay his hands on a few sick people and heal them. He was amazed at their lack of faith."

**Understanding the Principle:**

This isn't about Jesus lacking power. It's about how faith operates as the channel through which spiritual power flows. The people of Nazareth knew Jesus as "the carpenter's son." Their familiarity bred contempt, and their unbelief blocked access to His power.

**Application to Greek Life:**

If faith is required to access spiritual power—even for Jesus—then the inverse is also true: **unbelief blocks spiritual access**. When you participated in rituals without belief in their spiritual significance, you were not "opening doors" because you never gave faith-based access.

**Key Scriptures in This Module:**

${BELIEF_SCRIPTURES.jesusLimitedByUnbelief.map(s => `• **${s.reference}**: "${s.text}"\n  💡 ${s.principle}`).join('\n\n')}

**Reflection Questions:**

• How does the Nazareth account change my understanding of how spiritual power operates?
• Have I been giving power to things through fear that I never gave power to through belief?
• What does it mean that even Jesus required faith as a channel for miracles?`
  },
  {
    id: "faithAsChannel",
    sessionId: FAITH_SESSION_IDS.faithAsChannel,
    number: 2,
    title: "Module 2: Faith as the Channel",
    subtitle: "The operating system of the kingdom",
    icon: <Sparkles className="w-6 h-6 text-white" />,
    duration: "8 min",
    takeaways: 4,
    scriptures: BELIEF_SCRIPTURES.faithAsChannel,
    content: `**Faith: The Operating System of the Kingdom**

Hebrews 11:6 declares: "Without faith it is impossible to please God." But this verse reveals something even deeper—faith is not just about pleasing God; it's the mechanism through which the spiritual realm operates.

**The Principle:**

Faith functions like an operating system. Just as a computer requires an OS to run programs, the spiritual realm requires faith to "execute" spiritual realities. This works in both directions:

• **Positive faith** (trust in God) opens access to His promises
• **Negative faith** (fear/belief in false powers) opens access to bondage

**Why This Matters for Greek Life:**

When critics claim you "opened doors" through rituals, they're operating from a faulty understanding. You cannot open doors you never believed existed. The ritual was meaningless to you spiritually because you gave it no faith.

**Key Scriptures in This Module:**

${BELIEF_SCRIPTURES.faithAsChannel.map(s => `• **${s.reference}**: "${s.text}"\n  💡 ${s.principle}`).join('\n\n')}

**The Matthew 17 Principle:**

Jesus said, "If you have faith as small as a mustard seed, you can say to this mountain, 'Move from here to there,' and it will move." Faith—even small faith—is the activating agent. No faith = no activation.

**Reflection Questions:**

• Do I understand faith as more than just "believing"—but as the actual mechanism of spiritual access?
• Have I been granting spiritual authority through fear to things I never gave authority through faith?
• How does understanding faith as an "operating system" change my perspective on past rituals?`
  },
  {
    id: "beliefAndAuthority",
    sessionId: FAITH_SESSION_IDS.beliefAndAuthority,
    number: 3,
    title: "Module 3: Belief & Authority",
    subtitle: "What you don't believe cannot govern you",
    icon: <Shield className="w-6 h-6 text-white" />,
    duration: "8 min",
    takeaways: 4,
    scriptures: BELIEF_SCRIPTURES.beliefAndAuthority,
    content: `**The Authority Principle**

Paul addressed this directly when writing to the Corinthians about meat sacrificed to idols. His answer provides the framework for understanding Greek rituals.

**1 Corinthians 8:4-6:**

"So then, about eating food sacrificed to idols: We know that 'An idol is nothing at all in the world' and that 'There is no God but one.' For even if there are so-called gods, whether in heaven or on earth (as indeed there are many 'gods' and many 'lords'), yet for us there is but one God, the Father."

**The Principle:**

Paul doesn't say idols have power and we should avoid them. He says idols are **nothing**. The "gods" they represent don't exist. Therefore, the meat sacrificed to them is just... meat.

**Application:**

When you participated in Greek rituals:
• If you didn't know a name was allegedly a deity's name, it was just a word to you
• If you didn't believe in the spiritual significance, there was no spiritual significance for you
• Your conscience—informed by your beliefs—determines the spiritual effect

**Key Scriptures in This Module:**

${BELIEF_SCRIPTURES.beliefAndAuthority.map(s => `• **${s.reference}**: "${s.text}"\n  💡 ${s.principle}`).join('\n\n')}

**The Weak Conscience Warning:**

Paul does warn that if someone believes the idol is real and eats anyway, their conscience is defiled. This is why education matters—not to create fear, but to establish proper understanding.

**Reflection Questions:**

• How does 1 Corinthians 8 apply to my past participation in Greek rituals?
• Do I understand the difference between something having inherent power vs. power granted through belief?
• Am I walking in freedom or still bound by a "weak conscience"?`
  },
  {
    id: "fearRequiresBelief",
    sessionId: FAITH_SESSION_IDS.fearRequiresBelief,
    number: 4,
    title: "Module 4: Fear Requires Belief",
    subtitle: "Fear operates like faith in reverse",
    icon: <Heart className="w-6 h-6 text-white" />,
    duration: "8 min",
    takeaways: 4,
    scriptures: BELIEF_SCRIPTURES.fearRequiresBelief,
    content: `**The Fear-Faith Connection**

Here's a truth many miss: **fear is faith in reverse**. When you fear something, you're believing in its power to harm you. Fear grants authority just as faith does—but to the wrong things.

**2 Timothy 1:7:**

"For God has not given us a spirit of fear, but of power, and of love, and of a sound mind."

**The Principle:**

Many believers unknowingly empower things through fear that they never empowered through faith. When someone tells you that Greek rituals "opened doors," and you become afraid—that fear itself becomes a form of belief that grants the very authority you never originally gave.

**Breaking the Cycle:**

• **Recognize the source**: Fear about rituals often comes from well-meaning but theologically misguided teachings
• **Ground yourself in truth**: You are sealed by the Holy Spirit (Ephesians 1:13-14)
• **Exercise authority**: "Submit yourselves to God. Resist the devil, and he will flee from you" (James 4:7)

**Key Scriptures in This Module:**

See the scripture cards below for detailed references.

**The Romans 8 Declaration:**

"For I am convinced that neither death nor life, neither angels nor demons, neither the present nor the future, nor any powers, neither height nor depth, nor anything else in all creation, will be able to separate us from the love of God that is in Christ Jesus our Lord."

No ritual. No symbol. No word spoken in ignorance. NOTHING can separate you from Christ.

**Reflection Questions:**

• Have I been giving power through fear to things I never believed in?
• Do I understand that my security in Christ is not threatened by past ignorance?
• Am I ready to walk in the freedom and authority Christ has given me?`
  },
  {
    id: "proverbs1821",
    sessionId: FAITH_SESSION_IDS.proverbs1821,
    number: 5,
    title: "Module 5: Proverbs 18:21 in Context",
    subtitle: "Words, wisdom, and the nature of spiritual power",
    icon: <BookOpen className="w-6 h-6 text-white" />,
    duration: "10 min",
    takeaways: 5,
    content: `**Understanding "Death and Life in the Power of the Tongue"**

The phrase "death and life are in the power of the tongue" (Proverbs 18:21) is frequently cited to argue that spoken words in rituals automatically create spiritual consequences. However, this interpretation lifts the verse out of its wisdom literature context and applies it in a way Scripture itself does not support.

**The Wisdom Literature Context:**

Proverbs is not teaching that words possess autonomous spiritual power or magical force. Rather, it describes the **relational and social impact of speech**—how words can harm, heal, influence, or reconcile within human community.

**Scholarly Insight:**

Old Testament scholars such as Bruce Waltke and Tremper Longman emphasize that Proverbs uses **poetic exaggeration** to communicate moral truth, not metaphysical mechanics. The genre of wisdom literature employs vivid imagery to teach practical wisdom, not to establish doctrines about how the spiritual realm operates.

**The Biblical Framework for Spiritual Power:**

Scripture consistently teaches that spiritual power flows from:

• **Belief** — Romans 10:10: "For it is with your heart that you believe and are justified"
• **Covenant** — Relationship with God through Christ
• **Worship** — Intentional direction of faith and adoration

Not from speech alone. Mark 6:5–6 demonstrates that even Jesus's power was channeled through faith, not merely words.

**Application to Greek Life:**

In Greek Life rituals, spoken words function as:

• **Symbolic instruction** — Teaching organizational values and history
• **Communal commitment** — Pledging loyalty to brothers/sisters
• **Ceremonial tradition** — Preserving organizational heritage

They are **not** invocations of spiritual authority or divine power. Without belief, intent, or worship directed toward a deity, words remain descriptive, not spiritually operative.

**The Pauline Framework:**

This aligns with Paul's teaching:

• **1 Corinthians 8:4** — "An idol is nothing" apart from belief
• **Romans 14:14** — "Nothing is unclean in itself, but if anyone regards something as unclean, then for that person it is unclean"

Conscience, not vocabulary, determines spiritual consequence.

**The Conclusion:**

Proverbs 18:21 **cannot** be used to claim that ritual language in Greek organizations carries inherent spiritual power, because Scripture locates spiritual authority in the **heart and faith of the speaker**, not in the words themselves.

**Scholarly References:**

• Waltke, Bruce K. *The Book of Proverbs: Chapters 15–31*. Eerdmans
• Longman III, Tremper. *Proverbs*. Baker Academic
• Fee, Gordon D. *Pauline Christology*. Baker Academic
• Wright, N. T. *Paul and the Faithfulness of God*. Fortress Press

**Reflection Questions:**

• Have I been taught that spoken words have automatic spiritual power?
• How does understanding the wisdom literature genre change my interpretation of Proverbs 18:21?
• Do I recognize the difference between relational impact and metaphysical power?
• Am I grounding my understanding of spiritual authority in the full counsel of Scripture?

**Course Completion:**

Congratulations! You've completed the Faith & Authority training. Remember: Your conscience and your faith determine spiritual effect. This doesn't mean truth is relative—it means faith is the channel through which spiritual realities operate. Walk in freedom!`
  }
];

const getColorForModule = (id: string) => {
  return MODULE_COLORS[id as keyof typeof MODULE_COLORS] || MODULE_COLORS.intro;
};

export default function FaithAuthority() {
  const { progressData } = useNavigationProgress();
  const { isSessionComplete, toggleSession, progress: studyProgress, isAuthenticated } = useStudyProgress();
  const { awardPoints } = useGamification();
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [pointsAwarded, setPointsAwarded] = useState(false);
  
  // Get completed modules
  const completedModules = studyProgress
    .filter(p => p.session_id >= 16 && p.session_id <= 21 && p.completed)
    .map(p => p.session_id);
  
  const progress = (completedModules.length / modules.length) * 100;
  const currentModule = activeModule ? modules.find(m => m.id === activeModule) : null;
  const isProofComplete = (progressData?.proofCourse || 0) >= 100;

  // Lesson celebration hook
  const { triggerLessonComplete, triggerMilestone } = useLessonCelebration();
  const previousCompletedRef = useRef<number[]>([]);

  // Track module completions for celebrations and award points
  useEffect(() => {
    const prevCompleted = previousCompletedRef.current;
    const newlyCompleted = completedModules.filter(id => !prevCompleted.includes(id));
    
    if (newlyCompleted.length > 0) {
      const sessionId = newlyCompleted[0];
      const module = modules.find(m => m.sessionId === sessionId);
      if (module) {
        triggerLessonComplete(module.number, module.title.split(':')[0] || module.title);

        if (completedModules.length === 1) {
          setTimeout(() => triggerMilestone('first'), 2500);
        } else if (completedModules.length === 3) {
          setTimeout(() => triggerMilestone('halfway'), 2500);
        } else if (completedModules.length === 6 && !pointsAwarded) {
          // Award 70 points for completing all modules
          awardPoints({ points: 70, actionType: 'faith_authority_completion' });
          setPointsAwarded(true);
          toast.success("🏆 Faith & Authority Complete! +70 points earned!");
          setTimeout(() => triggerMilestone('complete'), 2500);
        }
      }
    }
    
    previousCompletedRef.current = [...completedModules];
  }, [completedModules, triggerLessonComplete, triggerMilestone, awardPoints, pointsAwarded]);

  const startModule = (moduleId: string) => {
    setActiveModule(moduleId);
    setTimeout(() => {
      const moduleSection = document.getElementById('module-content');
      if (moduleSection) {
        moduleSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const completeModule = (sessionId: number) => {
    if (!isAuthenticated) {
      return;
    }
    if (!isSessionComplete(sessionId)) {
      toggleSession({ sessionId, completed: true });
    }
    setActiveModule(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
          </Link>
          
          {/* Progress Widget in Header */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="hidden md:flex items-center gap-3 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-2"
          >
            <BookOpen className="w-4 h-4 text-amber-500" />
            <div className="flex items-center gap-2">
              <Progress value={progress} className="h-1.5 w-20" />
              <span className="text-xs font-medium text-amber-600 dark:text-amber-400">{Math.round(progress)}%</span>
            </div>
            {progress >= 100 && <CheckCircle2 className="w-4 h-4 text-green-500" />}
          </motion.div>
          
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400">
              {completedModules.length}/{modules.length} Complete
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 mb-6">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="text-amber-600 dark:text-amber-400 text-sm font-medium">Power of Belief Training</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Faith & Authority
          </h1>
          
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Scripture reveals a powerful truth: <strong className="text-amber-600 dark:text-amber-400">what you don't believe cannot hold power over you</strong>. 
            Discover how faith operates as the channel through which spiritual realities function.
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-sm mb-8">
            <div className="px-4 py-2 rounded-lg bg-muted border border-border">
              <span className="text-muted-foreground">Based on</span>
              <span className="text-amber-600 dark:text-amber-400 ml-2 font-medium">Mark 6:5-6 • Hebrews 11:6 • 1 Corinthians 8</span>
            </div>
            <div className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30">
              <span className="text-amber-600 dark:text-amber-400 font-semibold">🏆 Earn 70 Points</span>
              <span className="text-muted-foreground ml-2">upon completion</span>
            </div>
          </div>
        </motion.div>

        {/* Audio Teaching Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className="relative overflow-hidden bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-2 border-amber-500/30">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-500/20 rounded-full blur-2xl" />
            <CardContent className="relative p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Audio Overview</h4>
                  <p className="text-sm text-muted-foreground">Listen to the teaching summary</p>
                </div>
              </div>
              <BeliefTeachingAudio className="w-full" />
            </CardContent>
          </Card>
        </motion.div>

        {/* Active Module View */}
        {currentModule && (() => {
          const colors = getColorForModule(currentModule.id);
          return (
            <Card id="module-content" className={`mb-8 border-2 ${colors.border}`}>
              <CardHeader className={`${colors.bgLight} border-b ${colors.border}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center shadow-lg`}>
                      {currentModule.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl">{currentModule.title}</CardTitle>
                      <CardDescription>{currentModule.subtitle}</CardDescription>
                    </div>
                  </div>
                  <ListenButton text={currentModule.content || ''} itemId={`module-${currentModule.id}`} variant="outline" size="sm" />
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  {currentModule.content?.split('\n\n').map((paragraph, idx) => {
                    if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                      return (
                        <h3 key={idx} className="text-lg font-semibold mt-6 mb-3 text-foreground">
                          {paragraph.replace(/\*\*/g, '')}
                        </h3>
                      );
                    }
                    if (paragraph.startsWith('• ')) {
                      return (
                        <ul key={idx} className="list-disc pl-6 space-y-1 my-3">
                          {paragraph.split('\n').filter(line => line.trim()).map((item, i) => (
                            <li key={i} className="text-muted-foreground">
                              {item.replace(/^• /, '').split('**').map((part, j) => 
                                j % 2 === 1 ? <strong key={j} className="text-foreground">{part}</strong> : part
                              )}
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    return (
                      <p key={idx} className="text-muted-foreground my-3 leading-relaxed">
                        {paragraph.split('**').map((part, i) => 
                          i % 2 === 1 ? <strong key={i} className="text-foreground">{part}</strong> : part
                        )}
                      </p>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between mt-8 pt-6 border-t">
                  <Button variant="outline" onClick={() => setActiveModule(null)}>
                    Back to Course
                  </Button>
                  <Button 
                    onClick={() => completeModule(currentModule.sessionId)} 
                    className={`gap-2 ${colors.bg} hover:opacity-90 text-white`}
                    disabled={!isAuthenticated}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    {isSessionComplete(currentModule.sessionId) ? 'Completed' : 'Mark Module Complete'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })()}

        {/* Modules Grid (shown when no module is active) */}
        {!activeModule && (
          <>
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-between mb-6"
            >
              <div>
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-amber-500" />
                  Course Modules
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {completedModules.length > 0 
                    ? `${completedModules.length} of ${modules.length} completed` 
                    : 'Start with the introduction to begin your journey'}
                </p>
              </div>
              {completedModules.length > 0 && (
                <div className="flex items-center gap-2">
                  <Progress value={progress} className="w-24 h-2" />
                  <span className="text-xs text-muted-foreground font-medium">{Math.round(progress)}%</span>
                </div>
              )}
            </motion.div>

            {/* Modules List */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="grid gap-4 mb-8"
            >
              {modules.map((module) => {
                const isCompleted = completedModules.includes(module.sessionId);
                const colors = getColorForModule(module.id);
                
                return (
                  <Card 
                    key={module.id} 
                    className={`transition-all duration-300 ${colors.border} border-2 hover:shadow-lg cursor-pointer ${
                      isCompleted ? 'border-green-500/50 bg-green-500/5' : ''
                    }`}
                    onClick={() => startModule(module.id)}
                  >
                    <CardContent className="py-4">
                      <div className="flex items-center gap-4">
                        {/* Icon Badge */}
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${
                          isCompleted 
                            ? 'bg-green-500/20' 
                            : `bg-gradient-to-br ${colors.gradient}`
                        } shadow-lg`}>
                          {isCompleted ? (
                            <CheckCircle2 className="w-7 h-7 text-green-500" />
                          ) : (
                            module.icon
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-lg text-foreground">
                            {module.title}
                          </h3>
                          <p className="text-sm text-muted-foreground truncate">
                            {module.subtitle}
                          </p>
                          <div className="flex items-center gap-3 mt-2">
                            <span className={`flex items-center gap-1 text-xs ${colors.text}`}>
                              <Clock className="w-3.5 h-3.5" />
                              {module.duration}
                            </span>
                            <span className={`flex items-center gap-1 text-xs ${colors.text}`}>
                              <Lightbulb className="w-3.5 h-3.5" />
                              {module.takeaways} key points
                            </span>
                          </div>
                        </div>

                        {/* Action */}
                        <div className="shrink-0">
                          {isCompleted ? (
                            <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/30">
                              Complete
                            </Badge>
                          ) : (
                            <Button size="sm" className={`gap-1.5 ${colors.bg} hover:opacity-90 text-white shadow-md`}>
                              <Play className="w-4 h-4" />
                              Start
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </motion.div>

            {/* Continue Learning Section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-12"
            >
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                Continue Your Learning
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                {/* PROOF Course Card */}
                <Card className={`border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-pink-500/5 transition-all group ${
                  isProofComplete 
                    ? 'opacity-60 border-green-500/30 bg-green-500/5' 
                    : 'hover:border-purple-500/40'
                }`}>
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                        isProofComplete ? 'bg-green-500/20' : 'bg-gradient-to-br from-purple-500 to-pink-500'
                      }`}>
                        {isProofComplete ? (
                          <CheckCircle2 className="w-6 h-6 text-green-500" />
                        ) : (
                          <BookOpen className="w-6 h-6 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">P.R.O.O.F. Framework</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {isProofComplete 
                            ? 'You\'ve completed this course!' 
                            : 'Navigate Greek life criticism with biblical wisdom'}
                        </p>
                        <Button asChild size="sm" variant={isProofComplete ? "outline" : "default"} className={isProofComplete ? '' : 'bg-purple-500 hover:bg-purple-600'}>
                          <Link to="/proof-course">
                            {isProofComplete ? 'Review Course' : 'Start Course'}
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* MythBusters Card */}
                <Card className="border-orange-500/20 bg-gradient-to-br from-orange-500/5 to-amber-500/5 transition-all group hover:border-orange-500/40">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shrink-0">
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">MythBusters</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Debunk common misconceptions about Greek life
                        </p>
                        <Button asChild size="sm" className="bg-orange-500 hover:bg-orange-600">
                          <Link to="/myth-buster">Explore Myths</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
