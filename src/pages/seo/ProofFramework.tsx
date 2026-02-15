import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Target, BookOpen, Search, AlertTriangle, Compass, Trees } from "lucide-react";

const FAQ_ITEMS = [
  { question: "What is the P.R.O.O.F. framework?", answer: "P.R.O.O.F. stands for Prayer, Research, Oaths, Origins, and Fruit. It's a 5-step biblical evaluation tool created by Dr. Lyman Montgomery to help Christians assess whether their Greek life membership aligns with Scripture." },
  { question: "Who created the P.R.O.O.F. framework?", answer: "Dr. Lyman Montgomery developed the framework based on years of pastoral counseling with Christians in Greek organizations. It's the first systematic, biblical approach to Greek life evaluation." },
  { question: "Is P.R.O.O.F. anti-Greek life?", answer: "No. P.R.O.O.F. is a discernment tool, not a condemnation tool. Many people complete the framework and feel more confident in their membership. Others identify specific concerns to address. It's about clarity, not judgment." },
  { question: "How long does the P.R.O.O.F. Course take?", answer: "The full course has 5 interactive lessons and takes 2-3 hours total. You can complete it at your own pace. The quick Faith Snapshot assessment takes under 3 minutes." },
];

const STEPS = [
  { letter: "P", word: "Prayer", icon: Compass, color: "from-blue-500 to-blue-600", desc: "Begin with seeking God's wisdom. James 1:5 promises that if we lack wisdom, we can ask God who gives generously. Before evaluating anything, pray for discernment." },
  { letter: "R", word: "Research", icon: Search, color: "from-purple-500 to-purple-600", desc: "Study your organization's history, rituals, and requirements. Hosea 4:6 warns 'My people are destroyed for lack of knowledge.' Know what you're evaluating." },
  { letter: "O", word: "Oaths", icon: AlertTriangle, color: "from-amber-500 to-amber-600", desc: "Examine any oaths or pledges required. Jesus said in Matthew 5:34-37 to let your yes be yes. Do the oaths conflict with your commitment to Christ?" },
  { letter: "O", word: "Origins", icon: BookOpen, color: "from-green-500 to-green-600", desc: "Understand the spiritual origins of practices. 1 John 4:1 says to test the spirits. This isn't about condemning history but understanding the spiritual roots." },
  { letter: "F", word: "Fruit", icon: Trees, color: "from-rose-500 to-rose-600", desc: "Evaluate the fruit of your membership (Galatians 5:22-23). Has it drawn you closer to God or further away? The fruit test is ultimately the most revealing." },
];

export default function ProofFramework() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="The P.R.O.O.F. Framework | Biblical Tool for Evaluating Greek Life"
        description="Learn about the P.R.O.O.F. framework — a 5-step biblical evaluation tool for Christians in fraternities and sororities. Prayer, Research, Oaths, Origins, Fruit. Created by Dr. Lyman Montgomery."
        keywords="P.R.O.O.F. framework, biblical Greek life evaluation, Christian fraternity assessment, Dr. Lyman Montgomery, Sacred Greeks PROOF"
        structuredDataType="FAQPage"
        faqItems={FAQ_ITEMS}
      />

      <section className="bg-gradient-to-br from-[hsl(225,50%,8%)] to-[hsl(210,80%,18%)] text-white py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-amber-400" />
            <span className="text-amber-400 text-sm font-medium uppercase tracking-wider">Branded Framework</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            The P.R.O.O.F. Framework
          </h1>
          <p className="text-lg text-white/70 mb-2">
            <strong className="text-white">Prayer • Research • Oaths • Origins • Fruit</strong>
          </p>
          <p className="text-lg text-white/70 mb-8 max-w-2xl">
            The first systematic, biblical tool for evaluating Greek life membership. Created by Dr. Lyman Montgomery.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/proof-course">
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white">
                Start the Course <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/snapshot">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                Quick Assessment (3 min)
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 max-w-4xl">
        <h2 className="text-2xl font-bold mb-8 text-center">The 5 Steps</h2>
        <div className="space-y-6">
          {STEPS.map((step, i) => (
            <Card key={step.letter + step.word} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row">
                  <div className={`bg-gradient-to-br ${step.color} p-6 flex items-center justify-center sm:w-24 shrink-0`}>
                    <span className="text-4xl font-bold text-white">{step.letter}</span>
                  </div>
                  <div className="p-6 space-y-2">
                    <div className="flex items-center gap-2">
                      <step.icon className="w-5 h-5 text-primary" />
                      <h3 className="text-xl font-bold">{step.word}</h3>
                    </div>
                    <p className="text-muted-foreground">{step.desc}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl font-bold text-center mb-8">Common Questions</h2>
          <div className="space-y-4">
            {FAQ_ITEMS.map((faq, i) => (
              <Card key={i}><CardContent className="p-5"><h3 className="font-semibold mb-2">{faq.question}</h3><p className="text-sm text-muted-foreground">{faq.answer}</p></CardContent></Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 text-center space-y-6 max-w-2xl">
          <h2 className="text-2xl font-bold">Ready to Evaluate?</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/proof-course"><Button size="lg">Full P.R.O.O.F. Course <ArrowRight className="w-4 h-4 ml-2" /></Button></Link>
            <Link to="/snapshot"><Button size="lg" variant="outline">Quick Faith Snapshot</Button></Link>
            <Link to="/beta"><Button size="lg" variant="outline">Join Free — Founding Member</Button></Link>
          </div>
        </div>
      </section>
    </div>
  );
}