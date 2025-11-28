import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { 
  Home, 
  Heart, 
  Users, 
  Church, 
  MessageCircle, 
  Shield, 
  Scale, 
  BookOpen,
  Lightbulb,
  HandHeart,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Quote,
  Sparkles
} from "lucide-react";

interface AssessmentQuestion {
  id: string;
  question: string;
  stayIndicator: string;
  leaveIndicator: string;
}

// Talking points for leaving gracefully
const leavingGracefullyPoints = [
  {
    title: "Honor Your Covenant Without Worshiping It",
    description: "You made commitments. Those commitments can be released without being renounced. The difference matters.",
    guidance: "Say: 'I'm stepping back from active participation, but I honor the relationships and values we shared. My departure is about my personal spiritual journey, not a judgment on yours.'"
  },
  {
    title: "Exit Through the Front Door",
    description: "Don't ghost. Don't fade away and let rumors fill the silence. Have direct conversations with key brothers/sisters.",
    guidance: "Say: 'I want you to hear this from me directly, not through the grapevine. I'm making a change in my involvement, and I wanted to respect you enough to tell you why.'"
  },
  {
    title: "Name What You're Keeping",
    description: "Leaving doesn't mean erasing. The friendships, the growth, the service—those were real and remain part of your story.",
    guidance: "Say: 'I'm not pretending the last [X] years didn't happen. I grew in ways I couldn't have elsewhere. I'm making a change going forward, not rewriting history.'"
  },
  {
    title: "Don't Become a Missionary Against Your Own",
    description: "Some people leave and then spend years trying to 'rescue' others. This creates the very damage you're trying to avoid.",
    guidance: "Say: 'I've made my decision for my own conscience. I'm not asking anyone else to make the same choice. If you want to talk about my journey, I'm open, but I'm not recruiting.'"
  },
  {
    title: "Set Boundaries on Public Declarations",
    description: "You don't owe the internet your testimony. A public denouncement video may feel cathartic but often causes harm to others still walking faithfully.",
    guidance: "Say: 'I'm not going to make public statements that weaponize my experience against people I love. My decision is between me and God, not content for social media.'"
  }
];

// Key distinction between leaving and denouncing
const leavingVsDenouncingPoints = [
  {
    category: "Intent",
    leaving: "Following your conscience where God is leading you",
    denouncing: "Declaring that everyone in the organization is deceived or sinning"
  },
  {
    category: "Tone",
    leaving: "Humble uncertainty: 'This is what I believe God is calling me to do'",
    denouncing: "Prophetic certainty: 'God showed me this is demonic and you need to leave too'"
  },
  {
    category: "Relationships",
    leaving: "Preserved. You can still love and respect your brothers/sisters",
    denouncing: "Damaged. Public declarations often sever relationships permanently"
  },
  {
    category: "Story",
    leaving: "Your membership was a chapter in your story, not a mistake to erase",
    denouncing: "Your membership was deception, and everyone needs to know"
  },
  {
    category: "Others' Choices",
    leaving: "Respected. You don't pressure others to make your decision",
    denouncing: "Judged. Others are seen as 'not as far along' spiritually"
  },
  {
    category: "Platform",
    leaving: "Private conversations with those who matter",
    denouncing: "Public videos, testimonies, warnings to strangers"
  }
];

// Idea evaluation scenarios
interface IdeaEvaluation {
  scenario: string;
  context: string;
  goodApproach: string;
  problematicApproach: string;
  whyItMatters: string;
}

const ideaEvaluations: IdeaEvaluation[] = [
  {
    scenario: "Responding to a Parent",
    context: "Your mother texts: 'I saw another video about Greek organizations being occult. When are you going to leave?'",
    goodApproach: "Mom, I know this worries you because you love me. I've actually studied these claims carefully and prayed through them. I'm not dismissing your concern—I'm just asking for your trust that I'm taking this seriously before God. Can we talk about what specifically worries you most?",
    problematicApproach: "Mom, you don't know what you're talking about. Those videos are made by people who were never Greek. Stop sending me this stuff.",
    whyItMatters: "The good approach honors the relationship and opens dialogue. The problematic approach wins the battle but loses the war—it makes her feel dismissed rather than heard."
  },
  {
    scenario: "Responding to a Pastor",
    context: "Your pastor says: 'We can't have you leading Bible study while you're affiliated with that organization.'",
    goodApproach: "Pastor, I respect your authority here and I'm not going to fight you on this. Can you help me understand: is this based on a specific Scripture that disqualifies me, or is this a wisdom call you're making for the church? I want to submit appropriately, but I also need to understand what standard I'm being held to.",
    problematicApproach: "That's not fair. You're letting [other person] serve and they [other issue]. Why are you singling me out?",
    whyItMatters: "The good approach seeks understanding while maintaining respect. It also clarifies whether this is a scriptural mandate or a leadership preference—an important distinction."
  },
  {
    scenario: "Responding to a Social Media Tag",
    context: "A friend tags you in a viral denouncement video with the comment: 'Praying for you 🙏'",
    goodApproach: "[Private message]: Hey, I saw you tagged me in that video. I appreciate that you're thinking of me. I've actually looked into a lot of this content and have come to different conclusions. I'm happy to talk privately if you want to understand where I'm coming from, but I'd prefer not to have this conversation in public comments.",
    problematicApproach: "[Public comment]: This video is full of misinformation. Not everything you see online is true. Do your research before spreading fear.",
    whyItMatters: "Public rebuttals rarely change minds and often escalate conflict. Moving to private conversation preserves the friendship and avoids making your position a spectacle."
  },
  {
    scenario: "Posting About Your Decision to Leave",
    context: "You've decided to step back from active membership and want to share your journey.",
    goodApproach: "After much prayer and reflection, I've made the decision to step back from active involvement in my organization. This isn't a judgment on anyone else's choice—it's me following where I believe God is leading me. I'm grateful for the friendships and growth from my time there. If you're walking through something similar and want to talk, I'm here.",
    problematicApproach: "God delivered me from [organization name]! If you're in a Greek organization, please hear my testimony about what I was really involved in. Share this so others can be set free! 🙌 #delivered #truth #exposed",
    whyItMatters: "The good approach shares your journey without weaponizing it. The problematic approach makes your testimony a recruitment tool against your former brothers/sisters."
  },
  {
    scenario: "When Someone Asks Why You Joined",
    context: "At church, someone asks: 'Why would you join something like that in the first place?'",
    goodApproach: "Honestly, I joined because I saw an opportunity to build community, serve others, and grow as a leader. Those motivations haven't changed—I just express them through my organization alongside my faith. I'd be happy to share more about what we actually do if you're genuinely curious.",
    problematicApproach: "Why does everyone keep asking me that? I don't have to justify myself to you.",
    whyItMatters: "Curiosity is an opportunity. Defensiveness confirms suspicion. The good approach invites understanding rather than shutting down conversation."
  }
];

const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: "conscience",
    question: "When I participate in my organization's activities, my conscience before God feels...",
    stayIndicator: "Generally at peace. I can honor Christ and serve my chapter without persistent guilt.",
    leaveIndicator: "Persistently troubled. I feel ongoing spiritual unease that prayer and study have not resolved."
  },
  {
    id: "rituals",
    question: "Regarding the rituals and symbols I've encountered...",
    stayIndicator: "I understand them as cultural traditions that don't compete with my worship of Christ.",
    leaveIndicator: "I believe I participated in something that violated Scripture, and I need to repent and separate."
  },
  {
    id: "witness",
    question: "My Christian witness within my chapter is...",
    stayIndicator: "An opportunity. I can be salt and light, and I see fruit from my presence.",
    leaveIndicator: "Compromised. I find myself hiding my faith or unable to live it out authentically."
  },
  {
    id: "pressure",
    question: "The pressure I feel to denounce is primarily coming from...",
    stayIndicator: "External sources (social media, certain preachers) rather than the Holy Spirit's conviction.",
    leaveIndicator: "A deep, persistent internal conviction that has grown through prayer and Scripture study."
  },
  {
    id: "relationships",
    question: "My relationships in the organization are...",
    stayIndicator: "Opportunities for discipleship and genuine fellowship that honor Christ.",
    leaveIndicator: "Leading me away from Christ or requiring me to hide my faith to maintain them."
  },
  {
    id: "growth",
    question: "Since joining, my spiritual growth has...",
    stayIndicator: "Continued or even flourished as I've learned to integrate faith and Greek life.",
    leaveIndicator: "Stagnated or declined, and I've struggled to maintain spiritual disciplines."
  },
  {
    id: "obligations",
    question: "The obligations I committed to in my organization...",
    stayIndicator: "Align with biblical values like service, scholarship, and community uplift.",
    leaveIndicator: "Include elements that directly contradict Scripture or my loyalty to Christ."
  },
  {
    id: "timing",
    question: "The urgency I feel to make a decision is...",
    stayIndicator: "Allowing me time for prayerful discernment without panic.",
    leaveIndicator: "A clear, settled conviction that has matured over time, not a reaction to pressure."
  }
];

export default function FamilyMinistryFallout() {
  const [assessmentAnswers, setAssessmentAnswers] = useState<Record<string, "stay" | "leave" | null>>({});
  const [showResults, setShowResults] = useState(false);

  const answeredCount = Object.values(assessmentAnswers).filter(v => v !== null).length;
  const stayCount = Object.values(assessmentAnswers).filter(v => v === "stay").length;
  const leaveCount = Object.values(assessmentAnswers).filter(v => v === "leave").length;

  const handleAnswer = (questionId: string, answer: "stay" | "leave") => {
    setAssessmentAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const getResultMessage = () => {
    if (stayCount > leaveCount + 2) {
      return {
        title: "Your answers suggest peace with staying",
        description: "Based on your responses, it appears you can honor Christ while remaining in your organization. The key is to continue walking in the light, keeping your conscience clear, and using your platform for Kingdom purposes.",
        icon: CheckCircle2,
        color: "text-green-600"
      };
    } else if (leaveCount > stayCount + 2) {
      return {
        title: "Your answers suggest conviction to leave",
        description: "Based on your responses, you may have genuine conviction from the Holy Spirit about stepping away. This is not failure—it's faithfulness to follow Christ wherever He leads. Consider speaking with a trusted pastor who understands both Scripture and your situation.",
        icon: Shield,
        color: "text-amber-600"
      };
    } else {
      return {
        title: "Your answers suggest ongoing discernment",
        description: "This is normal and healthy. You're wrestling honestly with a complex question. Continue in prayer, Scripture study, and conversation with mature believers who know you. God is not in a hurry, and neither should you be.",
        icon: Scale,
        color: "text-blue-600"
      };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group">
              <Home className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Dashboard</span>
            </Link>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-sacred" />
              <span className="font-semibold text-foreground">Family & Ministry Fallout</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12 space-y-4">
          <Badge variant="outline" className="mb-4 border-sacred/50 text-sacred">
            <HandHeart className="w-3 h-3 mr-1" />
            Healing & Restoration
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-sacred via-warm-blue to-sacred bg-clip-text text-transparent">
            Navigating Family & Ministry Fallout
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            When your faith and your letters collide with those you love most, you need more than doctrine—
            you need wisdom for the wounded places.
          </p>
        </div>

        {/* Why Sacred Greeks Is Different */}
        <Card className="mb-12 border-sacred/20 bg-gradient-to-br from-sacred/5 to-transparent">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-sacred/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-sacred" />
              </div>
              <CardTitle className="text-xl">Why Sacred Greeks Speaks to Your Real Question</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sacred font-semibold">
                  <MessageCircle className="w-5 h-5" />
                  <span>We Answer Your Actual Question</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Most Greek ministry content asks: "How do I lead friends to Jesus in my chapter?"
                  <br /><br />
                  <span className="font-medium text-foreground">Your question is different:</span> "Can I be faithful to Christ and my letters without living under constant accusation?"
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sacred font-semibold">
                  <BookOpen className="w-5 h-5" />
                  <span>Lived Experience + Theological Depth</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  We're not watching Greek life from a distance. We speak as Christian Greeks who have studied the texts, the history, and the culture.
                  <br /><br />
                  <span className="font-medium text-foreground">That credibility matters</span> when you're defending your soul to your pastor or your mother.
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sacred font-semibold">
                  <Heart className="w-5 h-5" />
                  <span>We Name the Trauma</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  The denouncement conversation has emotional landmines. We offer practical tools for how to respond, what to say, and how to heal—
                  <br /><br />
                  <span className="font-medium text-foreground">not just another generic devotional.</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="damaged" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto gap-2 bg-transparent">
            <TabsTrigger value="damaged" className="data-[state=active]:bg-sacred data-[state=active]:text-white flex flex-col py-3 h-auto">
              <Users className="w-4 h-4 mb-1" />
              <span className="text-xs">Damaged Relationships</span>
            </TabsTrigger>
            <TabsTrigger value="conversations" className="data-[state=active]:bg-sacred data-[state=active]:text-white flex flex-col py-3 h-auto">
              <MessageCircle className="w-4 h-4 mb-1" />
              <span className="text-xs">Redemptive Conversations</span>
            </TabsTrigger>
            <TabsTrigger value="trust" className="data-[state=active]:bg-sacred data-[state=active]:text-white flex flex-col py-3 h-auto">
              <Church className="w-4 h-4 mb-1" />
              <span className="text-xs">Rebuilding Trust</span>
            </TabsTrigger>
            <TabsTrigger value="assessment" className="data-[state=active]:bg-sacred data-[state=active]:text-white flex flex-col py-3 h-auto">
              <Scale className="w-4 h-4 mb-1" />
              <span className="text-xs">Stay/Leave Assessment</span>
            </TabsTrigger>
          </TabsList>

          {/* Damaged Relationships Tab */}
          <TabsContent value="damaged" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-sacred" />
                  When Your Letters Damaged Your Relationships
                </CardTitle>
                <CardDescription>
                  Understanding the landscape of relational fallout from BGLO membership
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-muted/50 rounded-lg p-4 border-l-4 border-sacred">
                  <p className="italic text-muted-foreground">
                    "My mother hasn't spoken to me the same way since I crossed. My pastor asked me to step down from ministry. 
                    My small group leader sent me a video calling my organization demonic. I feel like I'm living under constant accusation."
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">The Three Circles of Fallout</h3>
                  
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="family">
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-rose-500" />
                          <span>Family Fallout</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-4">
                        <p className="text-muted-foreground">
                          Parents, grandparents, or siblings who see your membership as spiritual betrayal. 
                          They may have been influenced by denouncement content, or carry their own unresolved trauma from Greek life.
                        </p>
                        <div className="bg-background rounded-lg p-4 space-y-3">
                          <h4 className="font-medium">What You're Actually Facing:</h4>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-start gap-2">
                              <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                              <span>Silence or emotional distance that feels like rejection</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                              <span>Repeated confrontations or "interventions" about your membership</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                              <span>Being excluded from family ministry roles or spiritual conversations</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                              <span>Fear that your salvation is being questioned by those who raised you in faith</span>
                            </li>
                          </ul>
                        </div>
                        <div className="bg-sacred/5 rounded-lg p-4 border border-sacred/20">
                          <h4 className="font-medium text-sacred mb-2">Scripture Anchor:</h4>
                          <p className="text-sm">
                            <span className="font-medium">"Honor your father and mother"</span> (Ephesians 6:2) does not mean 
                            agreeing with everything they believe. It means treating them with respect while also 
                            <span className="font-medium"> "speaking the truth in love"</span> (Ephesians 4:15).
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="church">
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center gap-2">
                          <Church className="w-4 h-4 text-blue-500" />
                          <span>Church & Ministry Fallout</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-4">
                        <p className="text-muted-foreground">
                          Pastors, elders, or ministry leaders who view your membership as disqualifying. 
                          This may come from genuine theological conviction, secondhand information, or a desire to protect the congregation from controversy.
                        </p>
                        <div className="bg-background rounded-lg p-4 space-y-3">
                          <h4 className="font-medium">What You're Actually Facing:</h4>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-start gap-2">
                              <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                              <span>Being asked to step down from leadership, worship team, or teaching roles</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                              <span>Public or private conversations questioning your spiritual maturity</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                              <span>Feeling like you have to hide your letters to remain in good standing</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                              <span>Wondering if you need to find a new church home</span>
                            </li>
                          </ul>
                        </div>
                        <div className="bg-sacred/5 rounded-lg p-4 border border-sacred/20">
                          <h4 className="font-medium text-sacred mb-2">Scripture Anchor:</h4>
                          <p className="text-sm">
                            <span className="font-medium">"Obey your leaders and submit to them"</span> (Hebrews 13:17) applies to 
                            matters where Scripture is clear. On disputable matters, <span className="font-medium">"each one should be fully convinced in his own mind"</span> (Romans 14:5).
                            Your pastor's opinion is not the same as Scripture's authority.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="social">
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center gap-2">
                          <MessageCircle className="w-4 h-4 text-purple-500" />
                          <span>Social & Online Fallout</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-4">
                        <p className="text-muted-foreground">
                          Friends, online communities, or social media voices who have made Greek denouncement a marker of true faith. 
                          The algorithm amplifies the loudest voices, not necessarily the wisest ones.
                        </p>
                        <div className="bg-background rounded-lg p-4 space-y-3">
                          <h4 className="font-medium">What You're Actually Facing:</h4>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-start gap-2">
                              <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                              <span>Friends sending you denouncement videos or "prophetic warnings"</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                              <span>Being tagged in social media posts that call your organization demonic</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                              <span>Feeling the need to defend yourself publicly or stay silent and be judged</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                              <span>Anxiety every time a new denouncement clip goes viral</span>
                            </li>
                          </ul>
                        </div>
                        <div className="bg-sacred/5 rounded-lg p-4 border border-sacred/20">
                          <h4 className="font-medium text-sacred mb-2">Scripture Anchor:</h4>
                          <p className="text-sm">
                            <span className="font-medium">"Fear of man will prove to be a snare"</span> (Proverbs 29:25). 
                            You are not called to win every argument on the internet. You are called to 
                            <span className="font-medium"> "live at peace with everyone"</span> (Romans 12:18) as far as it depends on you—
                            which means some battles are not yours to fight.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Redemptive Conversations Tab */}
          <TabsContent value="conversations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-sacred" />
                  Having Redemptive Conversations
                </CardTitle>
                <CardDescription>
                  Practical language for the hardest conversations about your faith and your letters
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground">
                  A redemptive conversation is not about winning an argument. It's about preserving relationship 
                  while honoring truth. You may not change their mind, but you can change the atmosphere from 
                  accusation to understanding.
                </p>

                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-950/30 dark:to-rose-900/20 rounded-xl p-6 border border-rose-200 dark:border-rose-800">
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5 text-rose-600" />
                      With Parents or Family
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-white/50 dark:bg-background/50 rounded-lg p-4">
                        <p className="font-medium text-sm text-rose-700 dark:text-rose-400 mb-2">When they say:</p>
                        <p className="italic text-muted-foreground">"I didn't raise you to be in a cult."</p>
                      </div>
                      <div className="bg-white/50 dark:bg-background/50 rounded-lg p-4">
                        <p className="font-medium text-sm text-green-700 dark:text-green-400 mb-2">You can say:</p>
                        <p className="text-foreground">
                          "Mom/Dad, I hear how much this scares you, and I love that you care about my soul. 
                          I'm not asking you to approve of my membership. I'm asking you to trust that the faith 
                          you raised me in is still my foundation. Can we talk about what specifically concerns you, 
                          so I can show you how I'm thinking through this before God?"
                        </p>
                      </div>
                      <div className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Lightbulb className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        <span><strong>Key principle:</strong> Lead with honor, not defense. Acknowledge their fear before addressing their facts.</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <Church className="w-5 h-5 text-blue-600" />
                      With Pastors or Church Leaders
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-white/50 dark:bg-background/50 rounded-lg p-4">
                        <p className="font-medium text-sm text-blue-700 dark:text-blue-400 mb-2">When they say:</p>
                        <p className="italic text-muted-foreground">"We can't have you in leadership while you're still affiliated."</p>
                      </div>
                      <div className="bg-white/50 dark:bg-background/50 rounded-lg p-4">
                        <p className="font-medium text-sm text-green-700 dark:text-green-400 mb-2">You can say:</p>
                        <p className="text-foreground">
                          "Pastor, I respect your authority in this house and I'm not here to fight you. 
                          Can you help me understand: Is this based on something specific in Scripture that 
                          disqualifies me, or is this a wisdom call you're making for the church? I want to 
                          honor your leadership, but I also need to understand if this is a matter of sin or 
                          a matter of preference."
                        </p>
                      </div>
                      <div className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Lightbulb className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        <span><strong>Key principle:</strong> Ask for clarity on whether this is Scripture or preference. Don't let preference be presented as prophecy.</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <MessageCircle className="w-5 h-5 text-purple-600" />
                      With Friends Who Send You Denouncement Content
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-white/50 dark:bg-background/50 rounded-lg p-4">
                        <p className="font-medium text-sm text-purple-700 dark:text-purple-400 mb-2">When they send:</p>
                        <p className="italic text-muted-foreground">A viral clip or sermon calling your org demonic</p>
                      </div>
                      <div className="bg-white/50 dark:bg-background/50 rounded-lg p-4">
                        <p className="font-medium text-sm text-green-700 dark:text-green-400 mb-2">You can say:</p>
                        <p className="text-foreground">
                          "I appreciate you thinking of me, and I know you're sharing this because you care. 
                          I've seen content like this before, and I've spent a lot of time studying what Scripture 
                          actually says about the concerns raised. I'm not dismissing it—I'm discerning it. 
                          If you want to have a real conversation about my specific experience, I'm open to that. 
                          But I'm not going to make a decision based on someone else's sermon clip."
                        </p>
                      </div>
                      <div className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Lightbulb className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        <span><strong>Key principle:</strong> You don't owe a response to every video. You owe a response to God and to people who genuinely know you.</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/30 dark:to-amber-900/20 rounded-xl p-6 border border-amber-200 dark:border-amber-800">
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-amber-600" />
                      When You Need to Set a Boundary
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-white/50 dark:bg-background/50 rounded-lg p-4">
                        <p className="font-medium text-sm text-amber-700 dark:text-amber-400 mb-2">When the conversation becomes harmful:</p>
                        <p className="text-foreground">
                          "I love you and I value our relationship, but I'm not going to keep having this same 
                          conversation if it always ends with my salvation being questioned. I've made my position 
                          clear. I'm open to talking about faith, but I'm not open to being put on trial every time 
                          we're together. Can we agree to disagree on this and still be family?"
                        </p>
                      </div>
                      <div className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Lightbulb className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        <span><strong>Key principle:</strong> Boundaries are not rejection. They are the shape love takes when repetition becomes harm.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Rebuilding Trust Tab */}
          <TabsContent value="trust" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HandHeart className="w-5 h-5 text-sacred" />
                  Rebuilding Trust with Family & Church
                </CardTitle>
                <CardDescription>
                  A long-game approach to restoring relationships damaged by the denouncement conversation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-muted/50 rounded-lg p-4 border-l-4 border-sacred">
                  <Quote className="w-5 h-5 text-sacred mb-2" />
                  <p className="italic text-muted-foreground">
                    "Trust is rebuilt in small moments, not grand gestures. Your life is your argument."
                  </p>
                </div>

                <div className="space-y-6">
                  <h3 className="font-semibold text-lg">The Trust-Rebuilding Framework</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="border-green-200 dark:border-green-800">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-green-600 font-bold">1</div>
                          Live Louder Than You Argue
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm text-muted-foreground">
                        <p>
                          Your most powerful apologetic is your life. When your family sees you serving, praying, 
                          giving, and growing in Christ, it speaks louder than any theological debate.
                        </p>
                        <div className="mt-3 p-3 bg-green-50 dark:bg-green-950/30 rounded-lg">
                          <p className="font-medium text-green-700 dark:text-green-400">Action Step:</p>
                          <p className="text-foreground">
                            Find ways to serve alongside family members in non-Greek contexts. 
                            Let them see your faith in action apart from your letters.
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-blue-200 dark:border-blue-800">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 font-bold">2</div>
                          Don't Hide, But Don't Flaunt
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm text-muted-foreground">
                        <p>
                          You don't need to wear your letters to every family gathering, but you also don't need 
                          to pretend they don't exist. Wisdom knows when to be visible and when to be quiet.
                        </p>
                        <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                          <p className="font-medium text-blue-700 dark:text-blue-400">Action Step:</p>
                          <p className="text-foreground">
                            Be matter-of-fact about your membership without being provocative. 
                            "I have a chapter event" is enough—you don't need to justify it every time.
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-purple-200 dark:border-purple-800">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-purple-600 font-bold">3</div>
                          Invite, Don't Insist
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm text-muted-foreground">
                        <p>
                          Create opportunities for your family to see the good your organization does—
                          service projects, scholarship events, community impact. But don't force it.
                        </p>
                        <div className="mt-3 p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
                          <p className="font-medium text-purple-700 dark:text-purple-400">Action Step:</p>
                          <p className="text-foreground">
                            "We're doing a back-to-school supply drive. No pressure, but you're welcome to come 
                            if you'd like to see what we do."
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-amber-200 dark:border-amber-800">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center text-amber-600 font-bold">4</div>
                          Give It Time
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm text-muted-foreground">
                        <p>
                          Some wounds take years to heal. You may not see reconciliation in weeks or months. 
                          That's okay. Your job is to keep the door open and keep walking with Christ.
                        </p>
                        <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg">
                          <p className="font-medium text-amber-700 dark:text-amber-400">Action Step:</p>
                          <p className="text-foreground">
                            Pray for your family's hearts, not just for them to agree with you. 
                            God is working even when you can't see it.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="border-sacred/30 bg-gradient-to-br from-sacred/5 to-transparent">
                    <CardHeader>
                      <CardTitle className="text-base">When Reconciliation Isn't Possible (Yet)</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm">
                      <p className="text-muted-foreground">
                        Sometimes, despite your best efforts, the relationship remains strained. 
                        This is painful, but it's not failure. Scripture acknowledges this reality:
                      </p>
                      <div className="bg-background rounded-lg p-4 border">
                        <p className="font-medium">Romans 12:18</p>
                        <p className="italic text-muted-foreground">
                          "If it is possible, as far as it depends on you, live at peace with everyone."
                        </p>
                        <p className="mt-2 text-foreground">
                          Notice: "If it is possible" and "as far as it depends on you." 
                          Some reconciliation requires the other person to move too. 
                          You can only control your part.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Stay/Leave Assessment Tab */}
          <TabsContent value="assessment" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="w-5 h-5 text-sacred" />
                  Balanced Stay/Leave Discernment Tool
                </CardTitle>
                <CardDescription>
                  An honest framework for evaluating your membership—not to push you in either direction, 
                  but to help you hear your own conscience before God
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-muted/50 rounded-lg p-4 border-l-4 border-sacred">
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Important:</strong> This tool is not meant to make your decision for you. 
                    Faithful Christians have landed in different places on this question. 
                    The goal is to help you identify where you actually are, not where you think you should be.
                  </p>
                </div>

                {!showResults ? (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Progress: {answeredCount} of {assessmentQuestions.length} questions
                      </span>
                      <span className="text-sm font-medium">
                        {Math.round((answeredCount / assessmentQuestions.length) * 100)}%
                      </span>
                    </div>
                    <Progress value={(answeredCount / assessmentQuestions.length) * 100} className="h-2" />

                    <div className="space-y-6">
                      {assessmentQuestions.map((q, index) => (
                        <Card key={q.id} className={`transition-all ${assessmentAnswers[q.id] ? 'border-sacred/50' : ''}`}>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base font-medium">
                              {index + 1}. {q.question}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <button
                              onClick={() => handleAnswer(q.id, "stay")}
                              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                                assessmentAnswers[q.id] === "stay"
                                  ? "border-green-500 bg-green-50 dark:bg-green-950/30"
                                  : "border-border hover:border-green-300 hover:bg-green-50/50 dark:hover:bg-green-950/20"
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <CheckCircle2 className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                                  assessmentAnswers[q.id] === "stay" ? "text-green-600" : "text-muted-foreground"
                                }`} />
                                <span className="text-sm">{q.stayIndicator}</span>
                              </div>
                            </button>
                            <button
                              onClick={() => handleAnswer(q.id, "leave")}
                              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                                assessmentAnswers[q.id] === "leave"
                                  ? "border-amber-500 bg-amber-50 dark:bg-amber-950/30"
                                  : "border-border hover:border-amber-300 hover:bg-amber-50/50 dark:hover:bg-amber-950/20"
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <Shield className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                                  assessmentAnswers[q.id] === "leave" ? "text-amber-600" : "text-muted-foreground"
                                }`} />
                                <span className="text-sm">{q.leaveIndicator}</span>
                              </div>
                            </button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <div className="flex justify-center pt-4">
                      <Button 
                        size="lg"
                        onClick={() => setShowResults(true)}
                        disabled={answeredCount < assessmentQuestions.length}
                        className="bg-sacred hover:bg-sacred/90"
                      >
                        See My Results
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {(() => {
                      const result = getResultMessage();
                      return (
                        <Card className="border-2 border-sacred/30">
                          <CardHeader>
                            <div className="flex items-center gap-3">
                              <div className={`w-12 h-12 rounded-full bg-muted flex items-center justify-center ${result.color}`}>
                                <result.icon className="w-6 h-6" />
                              </div>
                              <div>
                                <CardTitle>{result.title}</CardTitle>
                                <CardDescription>Based on your {assessmentQuestions.length} responses</CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            <p className="text-muted-foreground">{result.description}</p>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div className="bg-green-50 dark:bg-green-950/30 rounded-lg p-4 text-center">
                                <p className="text-2xl font-bold text-green-600">{stayCount}</p>
                                <p className="text-sm text-muted-foreground">Responses suggesting peace with staying</p>
                              </div>
                              <div className="bg-amber-50 dark:bg-amber-950/30 rounded-lg p-4 text-center">
                                <p className="text-2xl font-bold text-amber-600">{leaveCount}</p>
                                <p className="text-sm text-muted-foreground">Responses suggesting conviction to leave</p>
                              </div>
                            </div>

                            {/* Conditional guidance based on results */}
                            {leaveCount > stayCount && (
                              <div className="bg-amber-50 dark:bg-amber-950/30 rounded-lg p-4 border border-amber-200 dark:border-amber-800">
                                <h4 className="font-medium mb-3 flex items-center gap-2">
                                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                                  Important: Before You Act
                                </h4>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                  <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                                    <span><strong>Read the "Leaving vs. Denouncing" section below</strong> — they are NOT the same</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                                    <span>Review the "How to Leave Without Damaging Brotherhood/Sisterhood" talking points</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                                    <span>Use the "Idea Evaluation" tool before posting anything publicly</span>
                                  </li>
                                </ul>
                              </div>
                            )}

                            {stayCount > leaveCount && (
                              <div className="bg-green-50 dark:bg-green-950/30 rounded-lg p-4 border border-green-200 dark:border-green-800">
                                <h4 className="font-medium mb-3 flex items-center gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                                  Walking Forward with Confidence
                                </h4>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                  <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                    <span>Use the "Idea Evaluation" tool when responding to critics or concerned family</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                    <span>Check the "Redemptive Conversations" tab for language to use with pastors and parents</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                    <span>Take the full P.R.O.O.F. Assessment for deeper framework on handling objections</span>
                                  </li>
                                </ul>
                              </div>
                            )}

                            <div className="bg-muted/50 rounded-lg p-4">
                              <h4 className="font-medium mb-2">What Now?</h4>
                              <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="flex items-start gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-sacred mt-0.5 flex-shrink-0" />
                                  <span>Share these results with a trusted mentor or pastor who knows you</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-sacred mt-0.5 flex-shrink-0" />
                                  <span>Continue in prayer and Scripture study on this question</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-sacred mt-0.5 flex-shrink-0" />
                                  <span>Remember: God is not in a hurry, and neither should you be</span>
                                </li>
                              </ul>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })()}

                    <div className="flex justify-center gap-4">
                      <Button 
                        variant="outline"
                        onClick={() => {
                          setAssessmentAnswers({});
                          setShowResults(false);
                        }}
                      >
                        Start Over
                      </Button>
                      <Link to="/guide">
                        <Button className="bg-sacred hover:bg-sacred/90">
                          Take Full P.R.O.O.F. Assessment
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Scripture Foundation */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-sacred" />
                  The Scripture Foundation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Whether you stay or leave, these principles from Romans 14 guide faithful discernment:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="font-medium text-sm mb-2">For Those Who Stay:</p>
                    <p className="text-sm italic text-muted-foreground">
                      "The one who eats everything must not treat with contempt the one who does not" (v.3)
                    </p>
                    <p className="text-xs mt-2 text-foreground">
                      Don't look down on those who feel convicted to leave.
                    </p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="font-medium text-sm mb-2">For Those Who Leave:</p>
                    <p className="text-sm italic text-muted-foreground">
                      "The one who does not eat everything must not judge the one who does" (v.3)
                    </p>
                    <p className="text-xs mt-2 text-foreground">
                      Don't judge those who remain as less faithful.
                    </p>
                  </div>
                </div>
                <div className="bg-sacred/5 rounded-lg p-4 border border-sacred/20">
                  <p className="text-sm">
                    <strong>For Everyone:</strong> "Each of them should be fully convinced in their own mind" (v.5). 
                    Your conviction before God is what matters—not the approval of the loudest voice in your life.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Leaving vs. Denouncing - Critical Distinction */}
            <Card className="border-amber-200 dark:border-amber-800">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  Critical: Leaving vs. Denouncing
                </CardTitle>
                <CardDescription>
                  These are NOT the same thing. Understanding the difference protects relationships and honors truth.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-amber-50 dark:bg-amber-950/30 rounded-lg p-4 border-l-4 border-amber-500">
                  <p className="text-sm">
                    <strong>You can follow your conscience out of an organization without burning bridges, 
                    destroying relationships, or positioning yourself as a prophet called to rescue everyone else.</strong>
                  </p>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-semibold">Aspect</th>
                        <th className="text-left py-3 px-4 font-semibold text-green-600">Leaving Gracefully</th>
                        <th className="text-left py-3 px-4 font-semibold text-red-600">Denouncing</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leavingVsDenouncingPoints.map((point, idx) => (
                        <tr key={idx} className="border-b last:border-0">
                          <td className="py-3 px-4 font-medium">{point.category}</td>
                          <td className="py-3 px-4 text-muted-foreground bg-green-50/50 dark:bg-green-950/20">{point.leaving}</td>
                          <td className="py-3 px-4 text-muted-foreground bg-red-50/50 dark:bg-red-950/20">{point.denouncing}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* How to Leave Without Damaging Brotherhood/Sisterhood */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <HandHeart className="w-5 h-5 text-sacred" />
                  How to Leave Without Damaging Brotherhood/Sisterhood
                </CardTitle>
                <CardDescription>
                  If you've discerned that leaving is right for you, here's how to do it with integrity
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Accordion type="single" collapsible className="w-full">
                  {leavingGracefullyPoints.map((point, idx) => (
                    <AccordionItem key={idx} value={`leaving-${idx}`}>
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-sacred/20 flex items-center justify-center text-sacred text-sm font-bold">
                            {idx + 1}
                          </div>
                          <span className="font-medium">{point.title}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-4 pl-8">
                        <p className="text-muted-foreground">{point.description}</p>
                        <div className="bg-green-50 dark:bg-green-950/30 rounded-lg p-4 border border-green-200 dark:border-green-800">
                          <p className="font-medium text-sm text-green-700 dark:text-green-400 mb-2">Language you can use:</p>
                          <p className="text-sm italic">{point.guidance}</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            {/* Idea Evaluation Tool */}
            <Card className="border-sacred/30 bg-gradient-to-br from-sacred/5 to-transparent">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-sacred" />
                  Idea Evaluation: What to Say (and What Not to Say)
                </CardTitle>
                <CardDescription>
                  This is where Sacred Greeks differs from generic devotionals—practical language for real situations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-muted/50 rounded-lg p-4 border-l-4 border-sacred">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">The Sacred Greeks Difference:</strong> An app that offers "idea evaluation" 
                    for how to respond, what to post, and what to say to a pastor or parent is a different category 
                    from a generic devotional. These scenarios come from real conversations Christian Greeks have faced.
                  </p>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  {ideaEvaluations.map((eval_, idx) => (
                    <AccordionItem key={idx} value={`eval-${idx}`}>
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center gap-2">
                          <MessageCircle className="w-5 h-5 text-sacred" />
                          <span className="font-medium">{eval_.scenario}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-4">
                        <div className="bg-muted/30 rounded-lg p-4">
                          <p className="font-medium text-sm mb-2">The Situation:</p>
                          <p className="text-sm text-muted-foreground italic">{eval_.context}</p>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-green-50 dark:bg-green-950/30 rounded-lg p-4 border border-green-200 dark:border-green-800">
                            <div className="flex items-center gap-2 mb-2">
                              <CheckCircle2 className="w-4 h-4 text-green-600" />
                              <p className="font-medium text-sm text-green-700 dark:text-green-400">Good Approach:</p>
                            </div>
                            <p className="text-sm">{eval_.goodApproach}</p>
                          </div>
                          
                          <div className="bg-red-50 dark:bg-red-950/30 rounded-lg p-4 border border-red-200 dark:border-red-800">
                            <div className="flex items-center gap-2 mb-2">
                              <AlertTriangle className="w-4 h-4 text-red-600" />
                              <p className="font-medium text-sm text-red-700 dark:text-red-400">Problematic Approach:</p>
                            </div>
                            <p className="text-sm">{eval_.problematicApproach}</p>
                          </div>
                        </div>
                        
                        <div className="bg-sacred/5 rounded-lg p-4 border border-sacred/20">
                          <div className="flex items-start gap-2">
                            <Lightbulb className="w-4 h-4 text-sacred mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="font-medium text-sm">Why This Matters:</p>
                              <p className="text-sm text-muted-foreground">{eval_.whyItMatters}</p>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <div className="mt-12 text-center space-y-4">
          <h2 className="text-2xl font-bold">Ready for Deeper Guidance?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Sacred Greeks offers tools for the real questions you're facing—not generic devotionals, 
            but specific guidance for the intersection of faith and Greek life.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/guide">
              <Button size="lg" className="bg-sacred hover:bg-sacred/90">
                Take the P.R.O.O.F. Assessment
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/articles">
              <Button size="lg" variant="outline">
                Explore Article Library
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
