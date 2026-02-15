import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BookOpen, GraduationCap, Users, Heart, Shield, Cross } from "lucide-react";

const FAQ_ITEMS = [
  { question: "Are there Christian fraternities and sororities?", answer: "Yes! Organizations like Alpha Omega Epsilon, Sigma Theta Delta, and Beta Upsilon Chi are explicitly Christian. There are also strong Christian communities within D9/NPHC organizations." },
  { question: "How do I find Christian brothers and sisters in my chapter?", answer: "Start by being open about your faith. Sacred Greeks connects you with Christians across all Greek organizations through our Member Network and Prayer Wall." },
  { question: "Can I start a Bible study in my chapter?", answer: "Absolutely. Our Chapter Chaplain Toolkit provides everything you need: study guides, conversation starters, and event planning resources." },
  { question: "What resources exist for Christians in Greek life?", answer: "Sacred Greeks Life is the first app built specifically for this intersection. We offer devotionals, the P.R.O.O.F. framework, AI coaching, prayer tools, and a community of believers in Greek organizations." },
];

export default function ChristianFraternityGuide() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="The Christian Fraternity & Sorority Guide | Navigate Greek Life with Faith"
        description="The complete guide for Christians in fraternities and sororities. How to maintain your faith, find community, and navigate Greek life with biblical wisdom. Free tools included."
        keywords="Christian fraternity guide, Christian sorority, faith in Greek life, Christian Greek organization, navigating Greek life as Christian"
        structuredDataType="FAQPage"
        faqItems={FAQ_ITEMS}
      />

      <section className="bg-gradient-to-br from-[hsl(225,50%,8%)] to-[hsl(210,80%,18%)] text-white py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap className="w-5 h-5 text-amber-400" />
            <span className="text-amber-400 text-sm font-medium uppercase tracking-wider">Complete Guide</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            The Christian's Guide to<br />Fraternity & Sorority Life
          </h1>
          <p className="text-lg text-white/70 mb-8 max-w-2xl">
            You don't have to choose between your faith and your letters. Here's how to thrive in both.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/beta">
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white">
                Join Free — Founding Member <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/proof-course">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                Start P.R.O.O.F. Course
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="prose prose-lg dark:prose-invert max-w-none space-y-10">
          <h2 className="text-2xl font-bold">Why This Guide Exists</h2>
          <p className="text-muted-foreground">
            There are 9 million+ members of historically Black fraternities and sororities. Millions more in other Greek organizations.
            Many are committed Christians who've never had a resource that addresses both identities.
          </p>
          <p className="text-muted-foreground">
            <strong>Sacred Greeks Life</strong>, created by Dr. Lyman Montgomery, is the first platform built specifically for this intersection — providing biblical tools without asking you to choose sides.
          </p>

          <div className="grid gap-6 md:grid-cols-3 not-prose">
            {[
              { icon: BookOpen, title: "Daily Devotionals", desc: "Scripture-based reflections connected to Greek life experiences", link: "/devotional" },
              { icon: Shield, title: "P.R.O.O.F. Framework", desc: "Evaluate practices against 5 biblical criteria", link: "/proof-course" },
              { icon: Users, title: "Community", desc: "Connect with believers across all Greek organizations", link: "/beta" },
            ].map((item) => (
              <Link to={item.link} key={item.title}>
                <Card className="h-full hover:border-primary/50 transition-colors">
                  <CardContent className="p-5 space-y-3">
                    <item.icon className="w-6 h-6 text-primary" />
                    <h3 className="font-bold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <h2 className="text-2xl font-bold">5 Practical Steps for Christian Greeks</h2>
          <ol className="space-y-4">
            <li><strong>Know what you believe</strong> — Use the P.R.O.O.F. Course to build biblical conviction before facing peer pressure.</li>
            <li><strong>Find your people</strong> — Use Sacred Greeks' Member Network to connect with other Christian Greeks.</li>
            <li><strong>Stay in the Word</strong> — Our daily devotionals are tailored to the unique pressures of Greek life.</li>
            <li><strong>Be ready to respond</strong> — The AI Response Coach helps you practice answering tough questions from family and church.</li>
            <li><strong>Lead with integrity</strong> — The Chapter Chaplain Toolkit equips you to be a spiritual leader in your organization.</li>
          </ol>
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
          <h2 className="text-2xl font-bold">Start Your Journey Today</h2>
          <p className="text-muted-foreground">Join the first 100 Founding Members and get free lifetime access to every tool.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/beta"><Button size="lg">Become a Founding Member <ArrowRight className="w-4 h-4 ml-2" /></Button></Link>
            <Link to="/snapshot"><Button size="lg" variant="outline">Take the Faith Snapshot</Button></Link>
          </div>
        </div>
      </section>
    </div>
  );
}