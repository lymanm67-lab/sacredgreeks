import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, AlertTriangle, BookOpen, Shield, Users } from "lucide-react";

const FAQ_ITEMS = [
  { question: "Are Divine Nine rituals based on pagan practices?", answer: "Some critics claim D9 rituals have roots in ancient mystery religions. The P.R.O.O.F. framework helps you evaluate your specific organization's practices against Scripture, separating cultural tradition from spiritual concern." },
  { question: "What about the 'crossing' process?", answer: "The crossing/initiation process varies by organization and chapter. Some elements may be purely cultural celebration; others may warrant biblical scrutiny. We help you distinguish between the two." },
  { question: "Can I be in the Divine Nine and be saved?", answer: "Organizational membership does not determine salvation (Ephesians 2:8-9). What matters is whether specific practices lead you into sin. This requires individual evaluation, not blanket statements." },
  { question: "My family has a legacy in the D9. How do I honor them while honoring God?", answer: "Family legacy is meaningful. Sacred Greeks helps you navigate this tension with conversation scripts, the Stay or Leave assessment, and community support from others facing the same question." },
];

export default function DivineNineSpiritualConcerns() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Divine Nine Spiritual Concerns | A Biblical Perspective on D9 Membership"
        description="Explore common spiritual concerns about Divine Nine (D9/NPHC) membership from a biblical perspective. Oaths, rituals, and initiation evaluated through Scripture."
        keywords="Divine Nine spiritual concerns, D9 Christian, NPHC faith, Black fraternity spiritual, Divine Nine rituals Bible, D9 oaths"
        structuredDataType="FAQPage"
        faqItems={FAQ_ITEMS}
      />

      <section className="bg-gradient-to-br from-[hsl(225,50%,8%)] to-[hsl(210,80%,18%)] text-white py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <span className="text-amber-400 text-sm font-medium uppercase tracking-wider">Biblical Perspective</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            Divine Nine & Faith:<br />
            <span className="text-white/70">Addressing the Spiritual Concerns</span>
          </h1>
          <p className="text-lg text-white/70 mb-8 max-w-2xl">
            A thoughtful, Scripture-based look at the questions Christians in D9 organizations are asking.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/snapshot">
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white">Faith Snapshot Assessment <ArrowRight className="w-4 h-4 ml-2" /></Button>
            </Link>
            <Link to="/beta">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">Join Free — Founding Member</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="prose prose-lg dark:prose-invert max-w-none space-y-10">
          <h2 className="text-2xl font-bold">The 5 Most Common Concerns</h2>
          <div className="grid gap-4 not-prose">
            {[
              { num: "1", title: "Secret Oaths & Vows", text: "Many D9 organizations involve oaths during initiation. Matthew 5:34-37 and James 5:12 address swearing oaths. The question is whether your specific oath conflicts with your allegiance to Christ." },
              { num: "2", title: "Ritual Origins", text: "Some D9 rituals draw from historical traditions that may have non-Christian roots. Understanding the origins helps you make informed decisions about participation." },
              { num: "3", title: "Hazing & Pledging", text: "Hazing is both illegal and unbiblical (Romans 13:10). Sacred Greeks provides anti-hazing resources and reporting guidance for Christians who encounter it." },
              { num: "4", title: "Idolatry Concerns", text: "When organizational loyalty supersedes devotion to God, it becomes an idol. Evaluate whether your chapter expects worship-like devotion (Exodus 20:3)." },
              { num: "5", title: "Cultural Pressure", text: "In HBCU and Black community contexts, D9 membership carries immense cultural weight. We help you navigate the tension between cultural belonging and spiritual conviction." },
            ].map((item) => (
              <Card key={item.num} className="border-l-4 border-l-primary">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0">{item.num}</span>
                    <div>
                      <h3 className="font-bold">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{item.text}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <h2 className="text-2xl font-bold">What We Provide</h2>
          <p className="text-muted-foreground">
            Sacred Greeks Life doesn't tell you what to do. We give you the <strong>biblical tools</strong> to decide for yourself.
            The <Link to="/proof-course" className="text-primary hover:underline">P.R.O.O.F. Course</Link> walks you through 5 biblical criteria.
            The <Link to="/snapshot" className="text-primary hover:underline">Faith Snapshot</Link> gives you a quick assessment.
            And our <Link to="/beta" className="text-primary hover:underline">community of Founding Members</Link> provides support from believers who understand your journey.
          </p>
        </div>
      </section>

      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl font-bold text-center mb-8">Questions Answered</h2>
          <div className="space-y-4">
            {FAQ_ITEMS.map((faq, i) => (
              <Card key={i}><CardContent className="p-5"><h3 className="font-semibold mb-2">{faq.question}</h3><p className="text-sm text-muted-foreground">{faq.answer}</p></CardContent></Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 text-center space-y-6 max-w-2xl">
          <h2 className="text-2xl font-bold">Evaluate Your Membership Biblically</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/snapshot"><Button size="lg">Take the Faith Snapshot <ArrowRight className="w-4 h-4 ml-2" /></Button></Link>
            <Link to="/beta"><Button size="lg" variant="outline">Join Free as Founding Member</Button></Link>
          </div>
        </div>
      </section>
    </div>
  );
}