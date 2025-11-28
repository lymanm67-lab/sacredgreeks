import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  ArrowLeft, 
  Heart, 
  BookOpen, 
  MessageCircle, 
  Users, 
  Sparkles,
  PenLine,
  HandHeart,
  Shield,
  Lightbulb,
  Quote,
  CheckCircle2,
  Play,
  Volume2
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const guidedPrayers = [
  {
    id: "lament",
    title: "A Prayer of Lament",
    category: "Processing Pain",
    description: "For when the rejection feels overwhelming",
    prayer: `Lord, I come to You with a heavy heart.

I trusted my church family to understand, to ask questions, to walk with me—and instead I received judgment, accusations, and rejection.

It hurts, Lord. It hurts to be called unfaithful by people who never asked about my faith. It hurts to be labeled when I've tried to live with integrity.

You know what it feels like to be misunderstood. You were called demon-possessed by religious leaders. You were rejected by those You came to save.

Meet me in this pain. Don't let bitterness take root. Help me grieve what I've lost without losing myself.

I don't understand why this happened, but I trust that You are still good, still present, still working.

In Jesus' name, Amen.`,
    scripture: "Psalm 13:1-2 - 'How long, Lord? Will you forget me forever? How long will you hide your face from me?'"
  },
  {
    id: "forgiveness",
    title: "A Prayer for the Journey Toward Forgiveness",
    category: "Releasing Bitterness",
    description: "For when you're ready to begin releasing resentment",
    prayer: `Father, I don't feel ready to forgive, but I'm willing to begin.

The words spoken over me—"occult," "ungodly," "deceived"—they echo in my mind. The relationships that ended, the doors that closed, the looks of disappointment—they left wounds.

But I know that unforgiveness chains me to the very people who hurt me. I don't want to carry this weight forever.

So I bring it to You. Not because I'm over it, but because I know I can't heal holding onto it.

Give me Your eyes for those who wounded me. Many believed they were protecting the faith. Some were afraid. Others simply didn't know better.

Help me release them—not because they deserve it, but because You've released me from so much more.

This is a process, Lord. Walk me through it, one day at a time.

In Jesus' name, Amen.`,
    scripture: "Ephesians 4:31-32 - 'Get rid of all bitterness, rage and anger... Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you.'"
  },
  {
    id: "identity",
    title: "A Prayer for Restored Identity",
    category: "Reclaiming Truth",
    description: "For when accusations have shaken your sense of self",
    prayer: `God, the accusations have made me question everything.

Am I deceived? Am I compromised? Have I dishonored You?

The enemy would love for me to live in perpetual doubt, second-guessing every decision, every friendship, every commitment.

But Your Word says I am a new creation. I am hidden with Christ in God. I am not what others have called me.

Help me separate conviction from condemnation. If there's genuine sin, reveal it—I want to repent. But if these are false accusations, help me stand firm.

Remind me who I am in You:
- Chosen, not rejected
- Beloved, not condemned  
- Called, not compromised

Let Your truth be louder than their labels.

In Jesus' name, Amen.`,
    scripture: "Romans 8:1 - 'Therefore, there is now no condemnation for those who are in Christ Jesus.'"
  },
  {
    id: "restoration",
    title: "A Prayer for Broken Relationships",
    category: "Family & Community",
    description: "For healing with family members and church community",
    prayer: `Lord, some of my closest relationships have been damaged.

Family members who don't understand. Church friends who pulled away. Mentors who expressed disappointment. 

Some of these relationships may never fully heal this side of heaven. That grieves me.

But I ask for wisdom:
- Show me which relationships to pursue and which to release
- Give me words that build bridges, not walls
- Help me love without enabling dysfunction
- Protect me from isolation while I heal

Where reconciliation is possible, prepare hearts on both sides. Where it isn't, give me peace to accept what I cannot change.

Thank You for the community You've provided—others who understand, who walk this path with me, who remind me I'm not alone.

In Jesus' name, Amen.`,
    scripture: "Romans 12:18 - 'If it is possible, as far as it depends on you, live at peace with everyone.'"
  },
  {
    id: "purpose",
    title: "A Prayer for Redemptive Purpose",
    category: "Moving Forward",
    description: "For finding meaning in your painful experience",
    prayer: `Father, I believe You waste nothing.

Not the tears I've cried. Not the sleepless nights. Not the conversations that went nowhere. Not the relationships that ended.

You are the God who makes beauty from ashes, who brings life from death, who redeems what was meant for harm.

Show me how to use this experience:
- To help others walking this same path
- To bring nuance to an oversimplified debate
- To demonstrate that faithfulness and fraternity can coexist
- To be a bridge between divided communities

Don't let this pain be wasted. Let it become testimony. Let my wounds become wells that water others.

You didn't cause this hurt, but You can use it. I surrender it to You.

In Jesus' name, Amen.`,
    scripture: "2 Corinthians 1:4 - 'He comforts us in all our troubles, so that we can comfort those in any trouble with the comfort we ourselves receive from God.'"
  }
];

const journalingPrompts = [
  {
    category: "Processing the Experience",
    prompts: [
      "Describe the moment you first realized your church community viewed your BGLO membership negatively. What did that feel like physically and emotionally?",
      "What specific words or phrases were used about you or your organization that hurt the most? Why did those particular words cut so deeply?",
      "If you could go back and have the conversation differently, what would you say? What would you ask?",
      "What assumptions did people make about you without asking questions first?"
    ]
  },
  {
    category: "Examining Your Faith",
    prompts: [
      "Has this experience strengthened or weakened your faith? Be honest—there's no wrong answer.",
      "What truths about God have become more real to you through this pain?",
      "Have you confused 'church hurt' with 'God hurt'? How might you separate the two?",
      "What spiritual practices have been hardest to maintain? Which have been most sustaining?"
    ]
  },
  {
    category: "Navigating Relationships",
    prompts: [
      "List the relationships that have been affected. For each one, write whether you believe restoration is possible, desirable, and worth pursuing.",
      "What boundaries do you need to set with certain people to protect your healing?",
      "Who has surprised you with their support? Who has surprised you with their rejection?",
      "Write a letter (that you don't have to send) to someone who hurt you. Say everything you wish you could say."
    ]
  },
  {
    category: "Finding Clarity",
    prompts: [
      "What would it look like for you to be 'fully healed' from this experience? Paint a picture of that future.",
      "What have you learned about yourself through this that you couldn't have learned any other way?",
      "If you could help one person going through the same thing, what would you tell them?",
      "Write out your 'testimony' of this season—not glossing over the pain, but showing how God has been present."
    ]
  },
  {
    category: "Moving Forward",
    prompts: [
      "What does it look like to forgive without reconciling? Is that something you're ready for?",
      "How has this experience changed how you'll engage with church community going forward?",
      "What good has come from this painful season—even if it's hard to see?",
      "What is God inviting you into next? What doors might be opening as others close?"
    ]
  }
];

const testimonials = [
  {
    id: 1,
    name: "Marcus T.",
    org: "Alpha Phi Alpha",
    title: "Called to Leave, Not Denounce",
    story: `When my pastor gave me an ultimatum—"renounce your fraternity or step down from ministry"—I thought my world was ending.

I'd been a worship leader for three years. My fraternity had been part of my life for eight. Both felt like callings.

I spent six months researching, praying, fasting. I read every "exposé" and every defense. I examined our rituals with fresh eyes. I talked to older brothers about their faith journeys.

In the end, I chose to step away from active fraternity involvement—not because I was convinced it was sinful, but because I felt God leading me to a season of focused ministry.

Here's what I didn't do: I didn't denounce. I didn't call my brothers deceived. I didn't pretend my years in the organization were wasted.

The church wasn't satisfied. They wanted a public renunciation. I couldn't give that in good conscience.

So I left that church too.

It was the loneliest year of my life. But it was also the year I learned that obedience to God sometimes means disappointing everyone—including people who claim to speak for Him.

I'm in a different church now. One that asks questions before making judgments. One that lets me hold complexity. I still love my fraternity brothers. I still serve in ministry. Both/and, not either/or.`,
    lesson: "Faithfulness doesn't always look the way others expect. Sometimes integrity means refusing to perform certainty you don't have."
  },
  {
    id: 2,
    name: "Jasmine W.",
    org: "Delta Sigma Theta",
    title: "My Mother Couldn't Accept It",
    story: `The hardest part wasn't the church. It was my mother.

She'd raised me in holiness tradition. When I pledged Delta, she cried for days. When YouTube videos about "Greek demonic rituals" started circulating, she sent them to me weekly. Family dinners became interrogations.

"How could you join something satanic after everything I taught you?"

I tried explaining the difference between ritual and worship, between tradition and idolatry. She wouldn't hear it. To her, I'd betrayed our family's faith.

For two years, our relationship was surface-level. We talked about weather and work, never anything real. It was like losing my mom while she was still alive.

The breakthrough came unexpectedly. Her best friend's daughter pledged AKA. Suddenly mom had to decide: was her friend's daughter also "deceived"? 

That forced her to actually investigate rather than react. She still doesn't fully agree with my choice, but she's stopped calling it demonic. We're rebuilding.

The scar tissue is still there. Trust was broken. But we're in relationship again.

If you're in the middle of family rejection, know this: people can change. Hearts can soften. Bridges can be rebuilt. It just takes longer than we want.`,
    lesson: "Sometimes God uses unexpected circumstances to soften hearts. Keep the door open while protecting your peace."
  },
  {
    id: 3,
    name: "David K.",
    org: "Kappa Alpha Psi",
    title: "Finding My Voice After Being Silenced",
    story: `My small group leader told me I couldn't share my testimony anymore because my fraternity involvement made me "not a credible witness."

Credible. That word haunted me.

I'd led three friends to Christ through relationships formed in my fraternity chapter. I'd been the one they called at 2am with questions about faith. I'd been the reason some of them stepped into a church for the first time.

But none of that mattered. The label "Kappa" overrode everything.

I went through a season where I stopped sharing my faith entirely. If I wasn't credible, why bother? The shame silenced me.

What brought me back was realizing that my greatest testimony might be this very tension—showing that a committed Christian can navigate complex spaces with integrity.

Now I speak specifically to Christian Greeks who feel caught in the middle. I've led workshops, written articles, had countless one-on-one conversations. The very thing meant to silence me has become my platform.

The people who dismissed my witness? They were wrong. My story is credible because it's true. And it's reaching people they never could.`,
    lesson: "What others use to disqualify you might be exactly what qualifies you to reach people they can't."
  },
  {
    id: 4,
    name: "Alicia R.",
    org: "Zeta Phi Beta",
    title: "When Your Pastor Gets It Wrong",
    story: `My pastor preached a three-week series on "Secret Societies and the Christian."

I sat in the congregation as he displayed our hand signs, mispronounced our founders' names, and quoted sources that had been debunked decades ago. He never once asked me—a member in good standing for six years—for input.

After the third sermon, I requested a meeting. I brought documentation, historical context, personal testimony. He listened politely, then said, "I appreciate your perspective, but I've done my research."

His research: three YouTube videos and one self-published book.

I didn't leave immediately. I tried to be a gracious presence, to demonstrate that a faithful Zeta could exist in his congregation. But every week there were subtle comments, sermon illustrations that felt pointed, looks from other members.

Eventually I realized: staying was costing me too much spiritually. I was shrinking myself to fit in a space that refused to see me accurately.

The church I found after isn't perfect. But the pastor there said something revolutionary: "I don't know enough about BGLOs to have a strong opinion. Tell me about your experience."

That's all I ever wanted. Not agreement—just genuine curiosity before condemnation.`,
    lesson: "Sometimes the most faithful thing you can do is leave a community that can't see you. Finding people who ask questions before judging is worth the search."
  },
  {
    id: 5,
    name: "Robert M.",
    org: "Phi Beta Sigma",
    title: "Staying Greek and Staying Faithful",
    story: `I'm still active in my fraternity. I'm also a deacon, Bible study leader, and seminary student.

Some people can't hold those things together. I've learned to let that be their problem, not mine.

The church hurt came early—a campus minister who told me I'd have to choose between "Jesus and Greeks." I was a sophomore, brand new in my faith. It almost derailed me entirely.

What saved me was an older Sigma who was also a pastor. He showed me that the binary I'd been presented was false. He walked me through our rituals, showed me what was cultural vs. what was concerning, and taught me to think critically rather than react defensively.

I've since done the same for younger brothers. When they come to me scared after a sermon or social media post, I don't tell them what to think. I help them learn how to think—how to evaluate claims, examine practices, and follow their conscience.

My position hasn't changed: I believe a Christian can be a faithful member of a BGLO without compromise. Not everyone agrees. That's okay.

What's not okay is letting fear or pressure make the decision for you. Whether you stay or go, let it be your conviction—not someone else's coercion.`,
    lesson: "Faithfulness is forming your own convictions through prayer and study, then living them out with integrity—regardless of what others think."
  }
];

const healingResources = [
  {
    title: "Understanding Religious Trauma",
    description: "Recognizing the difference between conviction and spiritual manipulation",
    icon: Shield,
    content: [
      "Religious trauma occurs when spiritual authority is used to harm rather than heal",
      "Signs include: persistent shame, fear of questioning, loss of trust in all spiritual leaders",
      "Healing requires separating God's character from human misrepresentation",
      "It's okay to take a break from certain church contexts while you heal"
    ]
  },
  {
    title: "Rebuilding Spiritual Practices",
    description: "Re-engaging with faith after painful church experiences",
    icon: Sparkles,
    content: [
      "Start small—even 5 minutes of Scripture reading counts",
      "Try new expressions of worship that don't carry painful associations",
      "Find online communities if local church feels too triggering",
      "Give yourself permission to wrestle, doubt, and question"
    ]
  },
  {
    title: "Finding Safe Community",
    description: "Identifying churches that practice healthy discernment",
    icon: Users,
    content: [
      "Look for curiosity over condemnation",
      "Healthy churches ask questions before making pronouncements",
      "Leaders who admit 'I don't know' are often safer than those with all the answers",
      "It's okay to visit many churches before committing"
    ]
  },
  {
    title: "Setting Healthy Boundaries",
    description: "Protecting your peace while maintaining relationships",
    icon: HandHeart,
    content: [
      "You don't owe anyone a debate about your BGLO membership",
      "'I'd rather not discuss this' is a complete sentence",
      "Limit exposure to people who consistently harm your peace",
      "Boundaries aren't walls—they're gates you control"
    ]
  }
];

export default function ChurchHurtHealing() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [journalEntry, setJournalEntry] = useState("");
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
  const [savedEntries, setSavedEntries] = useState<string[]>([]);

  const handleSaveJournalEntry = async () => {
    if (!journalEntry.trim()) {
      toast({
        title: "Empty Entry",
        description: "Please write something before saving.",
        variant: "destructive"
      });
      return;
    }

    if (user) {
      try {
        await supabase.from("prayer_journal").insert({
          user_id: user.id,
          title: selectedPrompt || "Church Hurt Healing Journal",
          content: journalEntry,
          prayer_type: "healing"
        });
        toast({
          title: "Saved",
          description: "Your journal entry has been saved."
        });
        setSavedEntries([...savedEntries, journalEntry]);
        setJournalEntry("");
        setSelectedPrompt(null);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to save entry. Please try again.",
          variant: "destructive"
        });
      }
    } else {
      toast({
        title: "Sign In Required",
        description: "Please sign in to save your journal entries."
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-sacred/5 to-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/dashboard">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-xl font-bold text-foreground">Church Hurt Healing</h1>
              <p className="text-sm text-muted-foreground">Processing trauma with faith and community</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <Card className="mb-8 bg-gradient-to-br from-sacred/10 via-warm-blue/10 to-background border-sacred/20 overflow-hidden">
          <CardContent className="p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-sacred/20 rounded-full">
                <Heart className="h-8 w-8 text-sacred" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">You're Not Alone in This</h2>
                <p className="text-muted-foreground max-w-2xl">
                  Harsh church responses to BGLO membership have wounded many faithful believers. 
                  This space is for processing that pain—not rushing past it, not pretending it didn't happen, 
                  but walking through it with honesty, faith, and community.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="flex items-center gap-3 p-4 bg-background/50 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-sacred" />
                <span className="text-sm">Your pain is valid</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-background/50 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-sacred" />
                <span className="text-sm">Healing takes time</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-background/50 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-sacred" />
                <span className="text-sm">Faith and doubt can coexist</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Tabs */}
        <Tabs defaultValue="prayers" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto gap-2 bg-transparent p-0">
            <TabsTrigger value="prayers" className="data-[state=active]:bg-sacred data-[state=active]:text-primary-foreground flex items-center gap-2 py-3">
              <HandHeart className="h-4 w-4" />
              <span>Guided Prayers</span>
            </TabsTrigger>
            <TabsTrigger value="journal" className="data-[state=active]:bg-sacred data-[state=active]:text-primary-foreground flex items-center gap-2 py-3">
              <PenLine className="h-4 w-4" />
              <span>Journaling</span>
            </TabsTrigger>
            <TabsTrigger value="stories" className="data-[state=active]:bg-sacred data-[state=active]:text-primary-foreground flex items-center gap-2 py-3">
              <Quote className="h-4 w-4" />
              <span>Real Stories</span>
            </TabsTrigger>
            <TabsTrigger value="resources" className="data-[state=active]:bg-sacred data-[state=active]:text-primary-foreground flex items-center gap-2 py-3">
              <BookOpen className="h-4 w-4" />
              <span>Resources</span>
            </TabsTrigger>
          </TabsList>

          {/* Guided Prayers Tab */}
          <TabsContent value="prayers" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Prayers for the Healing Journey</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                These prayers put words to experiences that are hard to articulate. 
                Use them as written, or let them spark your own conversations with God.
              </p>
            </div>

            <div className="grid gap-6">
              {guidedPrayers.map((prayer) => (
                <Card key={prayer.id} className="overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-sacred/5 to-warm-blue/5">
                    <div className="flex items-start justify-between">
                      <div>
                        <Badge variant="secondary" className="mb-2">{prayer.category}</Badge>
                        <CardTitle className="text-xl">{prayer.title}</CardTitle>
                        <CardDescription>{prayer.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="prose prose-sm max-w-none dark:prose-invert">
                      <pre className="whitespace-pre-wrap font-serif text-base leading-relaxed bg-muted/30 p-6 rounded-lg border">
                        {prayer.prayer}
                      </pre>
                    </div>
                    <div className="mt-4 p-4 bg-sacred/5 rounded-lg border border-sacred/20">
                      <p className="text-sm font-medium text-sacred">{prayer.scripture}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Journaling Tab */}
          <TabsContent value="journal" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Healing Through Writing</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Journaling helps process complex emotions and see patterns in your healing journey.
                Choose a prompt or write freely.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Prompts Column */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Choose a Prompt</h3>
                <Accordion type="single" collapsible className="space-y-2">
                  {journalingPrompts.map((category, idx) => (
                    <AccordionItem key={idx} value={`category-${idx}`} className="border rounded-lg px-4">
                      <AccordionTrigger className="hover:no-underline">
                        <span className="font-medium">{category.category}</span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 pt-2">
                          {category.prompts.map((prompt, promptIdx) => (
                            <button
                              key={promptIdx}
                              onClick={() => setSelectedPrompt(prompt)}
                              className={`w-full text-left p-3 rounded-lg border transition-all text-sm ${
                                selectedPrompt === prompt 
                                  ? "bg-sacred/10 border-sacred text-foreground" 
                                  : "bg-muted/30 border-transparent hover:bg-muted/50"
                              }`}
                            >
                              {prompt}
                            </button>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              {/* Writing Column */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Your Journal Entry</h3>
                <Card>
                  <CardContent className="pt-6">
                    {selectedPrompt && (
                      <div className="mb-4 p-3 bg-sacred/10 rounded-lg border border-sacred/20">
                        <p className="text-sm font-medium">Prompt:</p>
                        <p className="text-sm text-muted-foreground mt-1">{selectedPrompt}</p>
                      </div>
                    )}
                    <Textarea
                      placeholder="Begin writing here... This is a safe space for your honest thoughts."
                      value={journalEntry}
                      onChange={(e) => setJournalEntry(e.target.value)}
                      className="min-h-[300px] resize-none"
                    />
                    <div className="flex justify-between items-center mt-4">
                      <p className="text-sm text-muted-foreground">
                        {journalEntry.length} characters
                      </p>
                      <Button onClick={handleSaveJournalEntry} className="gap-2">
                        <CheckCircle2 className="h-4 w-4" />
                        Save Entry
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                {!user && (
                  <p className="text-sm text-muted-foreground text-center">
                    <Link to="/auth" className="text-sacred hover:underline">Sign in</Link> to save your journal entries
                  </p>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Real Stories Tab */}
          <TabsContent value="stories" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Real Stories, Real Healing</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                These testimonies come from Christians who've walked through church hurt related to their BGLO membership.
                Different paths, same faithfulness.
              </p>
            </div>

            <div className="grid gap-6">
              {testimonials.map((testimony) => (
                <Card key={testimony.id} className="overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-sacred/5 to-warm-blue/5">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-sacred/20 flex items-center justify-center">
                        <span className="text-lg font-bold text-sacred">{testimony.name.charAt(0)}</span>
                      </div>
                      <div>
                        <CardTitle className="text-xl">{testimony.title}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <span>{testimony.name}</span>
                          <span>•</span>
                          <Badge variant="outline">{testimony.org}</Badge>
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="prose prose-sm max-w-none dark:prose-invert">
                      <pre className="whitespace-pre-wrap font-sans text-base leading-relaxed bg-transparent p-0">
                        {testimony.story}
                      </pre>
                    </div>
                    <div className="mt-6 p-4 bg-gradient-to-r from-sacred/10 to-warm-blue/10 rounded-lg border border-sacred/20">
                      <div className="flex items-start gap-3">
                        <Lightbulb className="h-5 w-5 text-sacred mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-sm">Key Takeaway</p>
                          <p className="text-sm text-muted-foreground mt-1">{testimony.lesson}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Share Your Story CTA */}
            <Card className="bg-gradient-to-r from-sacred/10 to-warm-blue/10 border-sacred/20">
              <CardContent className="p-6 text-center">
                <MessageCircle className="h-10 w-10 text-sacred mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Share Your Story</h3>
                <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                  Your experience could help another Christian Greek navigate their own church hurt journey.
                </p>
                <Button variant="outline" className="gap-2">
                  <PenLine className="h-4 w-4" />
                  Submit Your Testimony
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Resources for Your Journey</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Practical guidance for navigating the complex terrain of church hurt and spiritual healing.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {healingResources.map((resource, idx) => (
                <Card key={idx} className="h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-sacred/10 rounded-lg">
                        <resource.icon className="h-5 w-5 text-sacred" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{resource.title}</CardTitle>
                        <CardDescription>{resource.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {resource.content.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-3">
                          <CheckCircle2 className="h-4 w-4 text-sacred mt-1 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Additional Support */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>When to Seek Additional Support</CardTitle>
                <CardDescription>
                  Some wounds need professional care. There's no shame in getting help.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Consider professional counseling if:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-sacred">•</span>
                        You're experiencing persistent anxiety or depression
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-sacred">•</span>
                        Church hurt is affecting your daily functioning
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-sacred">•</span>
                        You're struggling with intrusive thoughts about the experience
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-sacred">•</span>
                        Relationships outside of church are being impacted
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Finding the right support:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-sacred">•</span>
                        Look for counselors experienced with religious trauma
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-sacred">•</span>
                        Christian counselors can integrate faith into healing
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-sacred">•</span>
                        Online therapy options expand your choices
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-sacred">•</span>
                        Support groups provide community understanding
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Related Resources */}
        <div className="mt-12 grid md:grid-cols-3 gap-4">
          <Card className="hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <Link to="/family-ministry-fallout" className="flex items-center gap-3">
                <Users className="h-8 w-8 text-sacred" />
                <div>
                  <h4 className="font-semibold">Family & Ministry Fallout</h4>
                  <p className="text-sm text-muted-foreground">Navigate damaged relationships</p>
                </div>
              </Link>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <Link to="/prayer-guide" className="flex items-center gap-3">
                <HandHeart className="h-8 w-8 text-sacred" />
                <div>
                  <h4 className="font-semibold">Prayer Guide</h4>
                  <p className="text-sm text-muted-foreground">Guided prayer & ambient sounds</p>
                </div>
              </Link>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <Link to="/prayer-journal" className="flex items-center gap-3">
                <BookOpen className="h-8 w-8 text-sacred" />
                <div>
                  <h4 className="font-semibold">Prayer Journal</h4>
                  <p className="text-sm text-muted-foreground">Track your healing journey</p>
                </div>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}