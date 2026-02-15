import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BookOpen, Scale, Shield, Heart } from "lucide-react";

const FAQ_ITEMS = [
  { question: "Does the Bible say Greek life is a sin?", answer: "The Bible does not mention Greek letter organizations. It does provide principles about oaths (Matthew 5:34-37), fellowship (2 Corinthians 6:14), and idolatry (Exodus 20:3-5) that can be applied to evaluate specific practices." },
  { question: "What about secret rituals?", answer: "Jesus said 'I have spoken openly to the world... I said nothing in secret' (John 18:20). The concern isn't secrecy itself but whether secret rituals involve practices that contradict Christian faith." },
  { question: "Can I be Greek and still go to heaven?", answer: "Salvation is through faith in Christ (Ephesians 2:8-9), not organizational membership. The question is whether your specific chapter's practices lead you closer to or further from God." },
  { question: "My church condemns all Greek life. Are they right?", answer: "Blanket condemnations miss nuance. Each organization and chapter has different practices. The P.R.O.O.F. framework helps you evaluate specifics rather than generalizations." },
];

export default function IsGreekLifeASin() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Is Greek Life a Sin? What the Bible Actually Says"
        description="Is joining a fraternity or sorority a sin? Explore what Scripture actually says about Greek life, oaths, rituals, and fellowship. Biblical analysis with the P.R.O.O.F. framework."
        keywords="is Greek life a sin, is fraternity a sin, Bible and Greek life, Christian view of sororities, Greek life sin Bible"
        structuredDataType="FAQPage"
        faqItems={FAQ_ITEMS}
      />

      <section className="bg-gradient-to-br from-[hsl(225,50%,8%)] to-[hsl(210,80%,18%)] text-white py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center gap-2 mb-4">
            <Scale className="w-5 h-5 text-amber-400" />
            <span className="text-amber-400 text-sm font-medium uppercase tracking-wider">Biblical Analysis</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            Is Greek Life a Sin?<br />
            <span className="text-white/70">What the Bible Actually Says</span>
          </h1>
          <p className="text-lg text-white/70 mb-8 max-w-2xl">
            It's the most searched question about faith and fraternity life. Let's look at what Scripture says — not opinions, not traditions, but the <strong className="text-white">Word of God</strong>.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/snapshot">
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white">
                Evaluate Your Membership <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/beta">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                Join Free — 100 Founding Spots
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="prose prose-lg dark:prose-invert max-w-none space-y-10">
          <div>
            <h2 className="text-2xl font-bold">The Short Answer</h2>
            <p className="text-muted-foreground text-lg">
              <strong>Greek life itself is not categorically sinful.</strong> But some <em>practices within</em> Greek organizations may conflict with biblical principles. The key is discernment, not generalization.
            </p>
          </div>

          <Card className="border-l-4 border-l-primary">
            <CardContent className="p-6">
              <BookOpen className="w-5 h-5 text-primary mb-2" />
              <blockquote className="text-lg italic mb-2">
                "Test everything; hold fast what is good. Abstain from every form of evil."
              </blockquote>
              <p className="text-sm text-primary font-medium">— 1 Thessalonians 5:21-22 (ESV)</p>
            </CardContent>
          </Card>

          <div>
            <h2 className="text-2xl font-bold">4 Biblical Areas to Evaluate</h2>
            <div className="grid gap-4 md:grid-cols-2 not-prose">
              {[
                { icon: Shield, title: "Oaths & Vows", verse: "Matthew 5:34-37", desc: "Does your organization require oaths that only God deserves?" },
                { icon: BookOpen, title: "Secret Practices", verse: "John 18:20", desc: "Are rituals hidden because they'd be questionable in the light?" },
                { icon: Heart, title: "Fellowship Quality", verse: "2 Corinthians 6:14", desc: "Does your chapter pull you toward or away from Christ?" },
                { icon: Scale, title: "Spiritual Fruit", verse: "Galatians 5:22-23", desc: "Has your membership produced love, joy, peace — or anxiety and compromise?" },
              ].map((item) => (
                <Card key={item.title}>
                  <CardContent className="p-5">
                    <item.icon className="w-5 h-5 text-primary mb-2" />
                    <h3 className="font-bold text-base">{item.title}</h3>
                    <p className="text-xs text-primary mb-1">{item.verse}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold">The Bottom Line</h2>
            <p className="text-muted-foreground">
              Don't let anyone give you a one-size-fits-all answer. Your membership is between you and God. But you owe it to yourself to evaluate it honestly with Scripture — not just cultural loyalty.
            </p>
            <p className="text-muted-foreground">
              The <Link to="/proof-course" className="text-primary hover:underline font-semibold">P.R.O.O.F. Course</Link> walks you through this evaluation step by step. The <Link to="/snapshot" className="text-primary hover:underline font-semibold">Faith Snapshot</Link> gives you a quick score in under 3 minutes.
            </p>
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

      <section className="py-16">
        <div className="container mx-auto px-4 text-center space-y-6 max-w-2xl">
          <h2 className="text-2xl font-bold">Get Your Personal Assessment</h2>
          <p className="text-muted-foreground">6 questions. 3 minutes. Your personalized Faith Confidence Score.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/snapshot"><Button size="lg">Take the Faith Snapshot <ArrowRight className="w-4 h-4 ml-2" /></Button></Link>
            <Link to="/beta"><Button size="lg" variant="outline">Join Free as Founding Member</Button></Link>
          </div>
        </div>
      </section>
    </div>
  );
}