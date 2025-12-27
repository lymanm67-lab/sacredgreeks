import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Heart, Users, HandHeart, MessageCircleHeart, BookOpen, Shield, ArrowRight } from "lucide-react";

export const RenouncedSupportSection = () => {
  return (
    <Card className="border-purple-500/30 bg-gradient-to-br from-purple-500/5 to-background">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-500/10">
            <HandHeart className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <Badge className="mb-1 bg-purple-500/10 text-purple-600 border-purple-500/20">
              <Heart className="w-3 h-3 mr-1" />
              Grace-Filled Approach
            </Badge>
            <CardTitle className="text-purple-700 dark:text-purple-300">
              Supporting Those Who Have Renounced
            </CardTitle>
            <CardDescription>
              A biblical framework for loving, supporting, and potentially winning back members who have left Greek life
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Introduction */}
        <div className="p-4 rounded-lg bg-muted/50 border border-border">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">The Sacred Greeks Position:</strong> We respect the sincere convictions of those who feel called to renounce their Greek affiliation. At the same time, we believe many renunciations stem from incomplete information, fear-based teaching, or unaddressed hurt. Our goal is not to argue but to <em>love well</em>—honoring their journey while keeping doors open.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {/* Understanding Their Journey */}
          <AccordionItem value="understanding" className="border-purple-500/20">
            <AccordionTrigger className="text-sm font-medium hover:no-underline">
              <span className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-purple-600" />
                Understanding Their Journey
              </span>
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground space-y-3">
              <p>
                <strong className="text-foreground">Why do people renounce?</strong> Understanding the reasons helps us respond with grace rather than defensiveness.
              </p>
              
              <div className="grid gap-3 md:grid-cols-2">
                <div className="p-3 rounded-lg bg-purple-500/5 border border-purple-500/10">
                  <h5 className="font-semibold text-foreground mb-2">Sincere Convictions</h5>
                  <ul className="text-xs space-y-1 list-disc ml-4">
                    <li>Genuine concern about specific rituals or oaths</li>
                    <li>Desire to simplify spiritual commitments</li>
                    <li>Feeling called to a different path of service</li>
                    <li>Personal revelation during prayer and study</li>
                  </ul>
                </div>
                
                <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/10">
                  <h5 className="font-semibold text-foreground mb-2">External Pressures</h5>
                  <ul className="text-xs space-y-1 list-disc ml-4">
                    <li>Fear-based teaching from spiritual leaders</li>
                    <li>Social media influence and viral testimonies</li>
                    <li>Pressure from new church community</li>
                    <li>Misinformation about organization practices</li>
                  </ul>
                </div>
                
                <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/10">
                  <h5 className="font-semibold text-foreground mb-2">Negative Experiences</h5>
                  <ul className="text-xs space-y-1 list-disc ml-4">
                    <li>Hazing trauma that was never addressed</li>
                    <li>Disappointment with chapter leadership</li>
                    <li>Feeling used for financial contributions</li>
                    <li>Witnessing hypocrisy among members</li>
                  </ul>
                </div>
                
                <div className="p-3 rounded-lg bg-blue-500/5 border border-blue-500/10">
                  <h5 className="font-semibold text-foreground mb-2">Spiritual Growth</h5>
                  <ul className="text-xs space-y-1 list-disc ml-4">
                    <li>New understanding of Scripture</li>
                    <li>Desire for radical obedience to Christ</li>
                    <li>Feeling conviction during renewal</li>
                    <li>Prioritizing kingdom work over all else</li>
                  </ul>
                </div>
              </div>
              
              <div className="p-3 rounded-lg bg-sacred/5 border border-sacred/20 mt-3">
                <p className="text-xs italic">
                  <strong>Key Insight:</strong> "Each person should be fully convinced in their own mind" (Romans 14:5). Whether they stay or leave, our calling is to support their spiritual journey, not win an argument.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* How NOT to Respond */}
          <AccordionItem value="avoid" className="border-purple-500/20">
            <AccordionTrigger className="text-sm font-medium hover:no-underline">
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-red-500" />
                What to Avoid (Counterproductive Responses)
              </span>
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground space-y-3">
              <div className="grid gap-3">
                <div className="p-3 rounded-lg bg-red-500/5 border-l-4 border-red-500">
                  <h5 className="font-bold text-foreground mb-1">❌ Attacking Their Sincerity</h5>
                  <p className="text-xs">"You're just being dramatic" or "You've been brainwashed" dismisses their experience and closes dialogue. Even if you disagree, their conviction is real to them.</p>
                </div>
                
                <div className="p-3 rounded-lg bg-red-500/5 border-l-4 border-red-500">
                  <h5 className="font-bold text-foreground mb-1">❌ Public Debates or Callouts</h5>
                  <p className="text-xs">Social media arguments make everyone defensive. Private, gentle conversation is far more effective than public confrontation (Matthew 18:15).</p>
                </div>
                
                <div className="p-3 rounded-lg bg-red-500/5 border-l-4 border-red-500">
                  <h5 className="font-bold text-foreground mb-1">❌ Shaming or Exclusion</h5>
                  <p className="text-xs">Treating them as traitors or cutting off friendship proves their critics right. Grace keeps doors open for future dialogue.</p>
                </div>
                
                <div className="p-3 rounded-lg bg-red-500/5 border-l-4 border-red-500">
                  <h5 className="font-bold text-foreground mb-1">❌ Dismissing Legitimate Concerns</h5>
                  <p className="text-xs">Some concerns about Greek life are valid. Refusing to acknowledge any problems appears defensive rather than truthful.</p>
                </div>
                
                <div className="p-3 rounded-lg bg-red-500/5 border-l-4 border-red-500">
                  <h5 className="font-bold text-foreground mb-1">❌ Immediate Theological Arguments</h5>
                  <p className="text-xs">Leading with Scripture debates feels like attack, not love. First listen deeply, then share gently if invited.</p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Grace-Filled Approach */}
          <AccordionItem value="grace" className="border-purple-500/20">
            <AccordionTrigger className="text-sm font-medium hover:no-underline">
              <span className="flex items-center gap-2">
                <MessageCircleHeart className="w-4 h-4 text-green-600" />
                A Grace-Filled Response Framework
              </span>
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground space-y-3">
              <div className="grid gap-3">
                <div className="p-3 rounded-lg bg-green-500/5 border-l-4 border-green-500">
                  <h5 className="font-bold text-foreground mb-1">✓ Step 1: Listen First</h5>
                  <p className="text-xs mb-2">Before responding, truly hear their story. What led them here? What are they feeling? Active listening honors their dignity.</p>
                  <p className="text-xs italic">"Be quick to listen, slow to speak, and slow to become angry." — James 1:19</p>
                </div>
                
                <div className="p-3 rounded-lg bg-green-500/5 border-l-4 border-green-500">
                  <h5 className="font-bold text-foreground mb-1">✓ Step 2: Validate Their Conviction</h5>
                  <p className="text-xs mb-2">Even if you disagree, honor their sincerity: "I respect that you've prayed about this and are following your conscience."</p>
                  <p className="text-xs italic">"Whatever does not proceed from faith is sin." — Romans 14:23</p>
                </div>
                
                <div className="p-3 rounded-lg bg-green-500/5 border-l-4 border-green-500">
                  <h5 className="font-bold text-foreground mb-1">✓ Step 3: Affirm the Friendship</h5>
                  <p className="text-xs mb-2">"Our friendship isn't based on letters—it's based on love. This doesn't change how I feel about you."</p>
                  <p className="text-xs italic">"Love bears all things, believes all things, hopes all things, endures all things." — 1 Corinthians 13:7</p>
                </div>
                
                <div className="p-3 rounded-lg bg-green-500/5 border-l-4 border-green-500">
                  <h5 className="font-bold text-foreground mb-1">✓ Step 4: Offer Resources (If Welcomed)</h5>
                  <p className="text-xs mb-2">"When you're ready, I'd love to share some perspectives I've found helpful. No pressure—whenever you want."</p>
                  <p className="text-xs italic">"Be prepared to give an answer...with gentleness and respect." — 1 Peter 3:15</p>
                </div>
                
                <div className="p-3 rounded-lg bg-green-500/5 border-l-4 border-green-500">
                  <h5 className="font-bold text-foreground mb-1">✓ Step 5: Keep the Door Open</h5>
                  <p className="text-xs mb-2">Many who renounce later reconsider. Maintaining a loving relationship ensures they have a safe place to explore.</p>
                  <p className="text-xs italic">"Whoever brings back a sinner from wandering will save his soul." — James 5:20</p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Winning Them Back */}
          <AccordionItem value="winback" className="border-purple-500/20">
            <AccordionTrigger className="text-sm font-medium hover:no-underline">
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4 text-sacred" />
                Winning Them Back (When Appropriate)
              </span>
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground space-y-3">
              <p>
                <strong className="text-foreground">Important Note:</strong> "Winning back" doesn't mean manipulation or pressure. It means providing information they may not have received and maintaining a relationship that allows reconsidering.
              </p>
              
              <div className="grid gap-3 md:grid-cols-2">
                <div className="p-3 rounded-lg bg-muted/50 border border-border">
                  <h5 className="font-semibold text-foreground mb-2">🔍 Addressing Misinformation</h5>
                  <ul className="text-xs space-y-1 list-disc ml-4">
                    <li>Many renounce based on viral videos, not research</li>
                    <li>Share <em>Sacred Not Sinful</em> as a balanced resource</li>
                    <li>Point to this website's scholarly citations</li>
                    <li>Highlight the historical context they may have missed</li>
                  </ul>
                </div>
                
                <div className="p-3 rounded-lg bg-muted/50 border border-border">
                  <h5 className="font-semibold text-foreground mb-2">🩹 Addressing Hurt</h5>
                  <ul className="text-xs space-y-1 list-disc ml-4">
                    <li>Acknowledge that some chapters do fail members</li>
                    <li>Distinguish between organizational ideals and individual behavior</li>
                    <li>Connect them with healthy, faith-centered chapters</li>
                    <li>Encourage therapy for hazing trauma if needed</li>
                  </ul>
                </div>
                
                <div className="p-3 rounded-lg bg-muted/50 border border-border">
                  <h5 className="font-semibold text-foreground mb-2">📚 Gentle Education</h5>
                  <ul className="text-xs space-y-1 list-disc ml-4">
                    <li>Share Scripture flashcards showing biblical fraternity</li>
                    <li>Discuss the historical timeline of fraternal traditions</li>
                    <li>Explore the P.R.O.O.F. framework together</li>
                    <li>Watch documentaries about BGLO history and impact</li>
                  </ul>
                </div>
                
                <div className="p-3 rounded-lg bg-muted/50 border border-border">
                  <h5 className="font-semibold text-foreground mb-2">💚 Model Excellence</h5>
                  <ul className="text-xs space-y-1 list-disc ml-4">
                    <li>Live out your faith visibly within your organization</li>
                    <li>Invite them to service events (no pressure to rejoin)</li>
                    <li>Let your fruit speak louder than arguments</li>
                    <li>Demonstrate that faith and letters can coexist</li>
                  </ul>
                </div>
              </div>
              
              <div className="p-3 rounded-lg bg-sacred/5 border border-sacred/20 mt-3">
                <p className="text-xs">
                  <strong>Remember:</strong> Some may never return to Greek life, and that's okay. Our ultimate goal is their spiritual health, not their organizational membership. If they're walking closely with Christ, we've succeeded regardless of their letters.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* For Those Considering Renouncing */}
          <AccordionItem value="considering" className="border-purple-500/20">
            <AccordionTrigger className="text-sm font-medium hover:no-underline">
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-600" />
                For Those Considering Renouncing
              </span>
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground space-y-3">
              <p>
                If you're currently considering renouncing your Greek affiliation, we encourage you to:
              </p>
              
              <div className="grid gap-2">
                <div className="flex items-start gap-3 p-2 rounded-lg bg-muted/30">
                  <ArrowRight className="w-4 h-4 text-sacred mt-0.5 shrink-0" />
                  <p className="text-xs"><strong>Take your time.</strong> This is a significant decision. Resist pressure to decide quickly based on emotional experiences or social media.</p>
                </div>
                
                <div className="flex items-start gap-3 p-2 rounded-lg bg-muted/30">
                  <ArrowRight className="w-4 h-4 text-sacred mt-0.5 shrink-0" />
                  <p className="text-xs"><strong>Research thoroughly.</strong> Read <em>Sacred Not Sinful</em> and other balanced resources before concluding. Have you heard both sides?</p>
                </div>
                
                <div className="flex items-start gap-3 p-2 rounded-lg bg-muted/30">
                  <ArrowRight className="w-4 h-4 text-sacred mt-0.5 shrink-0" />
                  <p className="text-xs"><strong>Seek wise counsel.</strong> Talk to pastors who understand both Scripture AND Greek life history. One-sided counsel leads to one-sided decisions.</p>
                </div>
                
                <div className="flex items-start gap-3 p-2 rounded-lg bg-muted/30">
                  <ArrowRight className="w-4 h-4 text-sacred mt-0.5 shrink-0" />
                  <p className="text-xs"><strong>Distinguish issues.</strong> Is your concern with the organization's theology or with specific people's behavior? These require different solutions.</p>
                </div>
                
                <div className="flex items-start gap-3 p-2 rounded-lg bg-muted/30">
                  <ArrowRight className="w-4 h-4 text-sacred mt-0.5 shrink-0" />
                  <p className="text-xs"><strong>Consider your influence.</strong> If you leave, who will be salt and light within the organization? Could you reform rather than abandon?</p>
                </div>
                
                <div className="flex items-start gap-3 p-2 rounded-lg bg-muted/30">
                  <ArrowRight className="w-4 h-4 text-sacred mt-0.5 shrink-0" />
                  <p className="text-xs"><strong>Honor your conscience.</strong> After careful study, if you still feel convicted to leave, do so with grace—not public denunciation of those who remain.</p>
                </div>
              </div>
              
              <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                <p className="text-xs italic">
                  "Whether you eat or drink, or whatever you do, do all to the glory of God...Give no offense to Jews or to Greeks or to the church of God." — 1 Corinthians 10:31-32
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        {/* Citation */}
        <div className="mt-4 p-3 rounded-lg bg-muted/30 border border-border text-xs">
          <h5 className="font-semibold text-foreground mb-2">📚 Further Reading:</h5>
          <p><strong>Montgomery, Dr. Lyman A.</strong> <em>Sacred Not Sinful: A Biblical Response to the Black Greek Letter Organizations Debate</em>. Chapter 9: "Bridging the Divide" and Chapter 5: "Renounce or Redeem?"</p>
        </div>
      </CardContent>
    </Card>
  );
};
