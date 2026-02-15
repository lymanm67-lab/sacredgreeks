import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BookOpen, CheckCircle2, HelpCircle, Heart, Shield, Target } from "lucide-react";

const FAQ_ITEMS = [
  { question: "Is it a sin to be in a fraternity or sorority?", answer: "The Bible doesn't mention fraternities directly. The P.R.O.O.F. framework helps you evaluate specific practices — like oaths, rituals, and pledging — against Scripture rather than making blanket judgments." },
  { question: "What if my chapter does things that conflict with my faith?", answer: "You have options: advocate for change within your chapter, abstain from specific practices, or in some cases, step away. Our Stay or Leave assessment helps you think through this biblically." },
  { question: "Can I be a strong Christian and active Greek?", answer: "Many Christians maintain both identities. The key is evaluating your specific chapter's practices, not Greek life as a whole. The P.R.O.O.F. framework gives you a structured way to do this." },
  { question: "My pastor says I should leave. What do I do?", answer: "Pastoral counsel matters. But so does understanding what specifically concerns them. Our Conversation Scripts help you have productive dialogues with church leaders about your membership." },
];

export default function ShouldILeaveMyFraternity() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Should I Leave My Fraternity? A Christian's Guide to Discernment"
        description="Struggling with faith and Greek life membership? Use our biblical P.R.O.O.F. framework to evaluate your fraternity or sorority membership as a Christian. Free assessment inside."
        keywords="should I leave my fraternity, Christian fraternity concerns, faith and Greek life conflict, leaving sorority for faith, P.R.O.O.F. framework"
        structuredDataType="FAQPage"
        faqItems={FAQ_ITEMS}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[hsl(225,50%,8%)] to-[hsl(210,80%,18%)] text-white py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle className="w-5 h-5 text-amber-400" />
            <span className="text-amber-400 text-sm font-medium uppercase tracking-wider">Biblical Discernment Guide</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            Should I Leave My Fraternity or Sorority?
          </h1>
          <p className="text-lg text-white/70 mb-8 max-w-2xl">
            You're not alone in asking this question. Thousands of Christians in Greek life wrestle with the same tension.
            Here's how to think through it <strong className="text-white">biblically — not emotionally</strong>.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/snapshot">
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white">
                Take the Faith Snapshot <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/beta">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                Join Free — Founding Member
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="prose prose-lg dark:prose-invert max-w-none space-y-12">
          <div>
            <h2 className="flex items-center gap-2 text-2xl font-bold">
              <Target className="w-6 h-6 text-primary" />
              The Wrong Question — and the Right One
            </h2>
            <p className="text-muted-foreground">
              "Should I leave?" is actually the wrong starting question. The better question is: <strong>"What specific practices in my chapter conflict with Scripture?"</strong>
            </p>
            <p className="text-muted-foreground">
              Greek life isn't monolithic. A step show is different from a secret oath. Community service is different from hazing. 
              The P.R.O.O.F. framework helps you separate <em>cultural traditions</em> from <em>spiritual concerns</em>.
            </p>
          </div>

          <Card className="border-2 border-primary/20">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">The P.R.O.O.F. Framework</h3>
              <div className="space-y-3">
                {[
                  { letter: "P", word: "Prayer", desc: "Have you prayed specifically about this?" },
                  { letter: "R", word: "Research", desc: "Do you know what your rituals actually involve?" },
                  { letter: "O", word: "Oaths", desc: "Are the oaths compatible with your faith?" },
                  { letter: "O", word: "Origins", desc: "Do the origins conflict with Scripture?" },
                  { letter: "F", word: "Fruit", desc: "What fruit does your membership produce?" },
                ].map((item) => (
                  <div key={item.letter + item.word} className="flex items-start gap-3">
                    <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0">
                      {item.letter}
                    </span>
                    <div>
                      <strong>{item.word}</strong>
                      <span className="text-muted-foreground ml-2">— {item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/proof-course" className="mt-4 inline-block">
                <Button variant="outline" size="sm">
                  Start the P.R.O.O.F. Course <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <div>
            <h2 className="flex items-center gap-2 text-2xl font-bold">
              <CheckCircle2 className="w-6 h-6 text-green-500" />
              3 Signs You Should Stay (and Advocate)
            </h2>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 mt-1 shrink-0" /> Your chapter's practices don't require you to violate Scripture</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 mt-1 shrink-0" /> You can be a positive influence and spiritual leader within the chapter</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 mt-1 shrink-0" /> The community service and fellowship strengthen your faith walk</li>
            </ul>
          </div>

          <div>
            <h2 className="flex items-center gap-2 text-2xl font-bold">
              <Shield className="w-6 h-6 text-destructive" />
              3 Signs It May Be Time to Step Away
            </h2>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><Shield className="w-4 h-4 text-destructive mt-1 shrink-0" /> You're being asked to swear oaths that contradict your faith (Matthew 5:34-37)</li>
              <li className="flex items-start gap-2"><Shield className="w-4 h-4 text-destructive mt-1 shrink-0" /> Hazing or rituals involve practices that grieve the Holy Spirit</li>
              <li className="flex items-start gap-2"><Shield className="w-4 h-4 text-destructive mt-1 shrink-0" /> Your spiritual life has demonstrably declined since joining</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl font-bold text-center mb-8">Common Questions</h2>
          <div className="space-y-4">
            {FAQ_ITEMS.map((faq, i) => (
              <Card key={i}>
                <CardContent className="p-5">
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center space-y-6 max-w-2xl">
          <h2 className="text-2xl font-bold">Ready to Evaluate Your Membership?</h2>
          <p className="text-muted-foreground">
            Take the free Faith Snapshot assessment — 6 questions that give you a personalized Faith Confidence Score.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/snapshot">
              <Button size="lg">
                Take the Faith Snapshot <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/beta">
              <Button size="lg" variant="outline">
                Join as Founding Member — Free
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}