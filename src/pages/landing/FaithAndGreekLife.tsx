import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  ArrowRight, 
  Cross,
  HelpCircle,
  MessageSquare,
  Shield,
  Sparkles,
  Users,
  CheckCircle2
} from "lucide-react";
import { ListenButton } from "@/components/ListenButton";

const commonQuestions = [
  {
    question: "Can I be Greek and Christian?",
    shortAnswer: "Yes, with discernment.",
    fullAnswer: "Millions of believers are Greek. The key is evaluating your specific organization's practices against Scripture using the P.R.O.O.F. framework.",
    scripture: "1 Thessalonians 5:21 - Test everything; hold fast what is good."
  },
  {
    question: "What about the rituals?",
    shortAnswer: "Context matters.",
    fullAnswer: "Many Greek rituals have roots in fraternal lodges, guilds, and academic traditions. Understanding historical context helps with biblical evaluation.",
    scripture: "1 Corinthians 10:23 - All things are lawful, but not all things are helpful."
  },
  {
    question: "Is Greek life idolatry?",
    shortAnswer: "It can be—but doesn't have to be.",
    fullAnswer: "Anything can become an idol—career, relationships, even church. The question is: does your Greek identity submit to or compete with your identity in Christ?",
    scripture: "Exodus 20:3 - You shall have no other gods before me."
  },
  {
    question: "What if my pastor says I should leave?",
    shortAnswer: "Seek wise counsel with Scripture.",
    fullAnswer: "Pastoral guidance matters, but should be weighed alongside personal conviction and biblical study. Sacred Greeks provides tools for that discernment process.",
    scripture: "Proverbs 11:14 - Where there is no guidance, a people falls."
  }
];

const proofFramework = [
  { letter: "P", word: "Pledge", question: "Does the pledge conflict with your baptismal vows or commitment to Christ?" },
  { letter: "R", word: "Rituals", question: "Are the rituals compatible with Christian worship and practice?" },
  { letter: "O", word: "Oaths", question: "Do any oaths require you to swear allegiance above God?" },
  { letter: "O", word: "Origins", question: "What are the historical and spiritual origins of the organization?" },
  { letter: "F", word: "Fruit", question: "What fruit does membership produce in your spiritual life?" }
];

const overviewText = `Welcome to Faith and Greek Life—the intersection that millions of believers navigate. 
Can you be Greek and Christian? The answer isn't simple yes or no—it requires discernment. 
First Thessalonians chapter 5 verse 21 tells us to test everything and hold fast to what is good. 
That's exactly what Sacred Greeks helps you do. Many Greek rituals have historical roots in fraternal guilds 
and academic traditions—not occult practices. But some elements do require careful evaluation. 
The P.R.O.O.F. framework—Pledge, Rituals, Oaths, Origins, and Fruit—provides a biblical lens for this discernment. 
You don't have to choose between your letters and your Lord. But you do need to ensure your Greek identity 
submits to your identity in Christ. Let us help you navigate this journey with Scripture as your guide.`;

export default function FaithAndGreekLife() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sacred/20 via-transparent to-transparent" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
        
        <div className="container mx-auto px-4 py-16 lg:py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-sacred/20 text-sacred border-sacred/30">
              <Cross className="w-3 h-3 mr-1" />
              Faith & Greek Identity
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Your{" "}
              <span className="bg-gradient-to-r from-sacred via-amber-400 to-sacred bg-clip-text text-transparent">
                Letters
              </span>
              {" "}and Your{" "}
              <span className="bg-gradient-to-r from-amber-400 via-sacred to-amber-400 bg-clip-text text-transparent">
                Lord
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Millions of Christians are Greek. Navigate this intersection with biblical wisdom, 
              not fear or compromise. Discernment is the path forward.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <ListenButton 
                text={overviewText}
                itemId="faith-greek-life-overview"
                variant="outline"
                className="border-sacred/50 text-sacred hover:bg-sacred/10"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-sacred hover:bg-sacred/90 text-white">
                <Link to="/snapshot">
                  Take Faith Assessment
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                <Link to="/proof-course">
                  Learn P.R.O.O.F. Framework
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Common Questions */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-500/20 text-blue-300 border-blue-500/30">
              <HelpCircle className="w-3 h-3 mr-1" />
              Common Questions
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Questions Every Greek Christian Asks
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {commonQuestions.map((item) => (
              <Card key={item.question} className="bg-slate-800/50 border-slate-700 hover:border-sacred/50 transition-all">
                <CardHeader>
                  <CardTitle className="text-white text-lg flex items-start gap-2">
                    <MessageSquare className="w-5 h-5 text-sacred shrink-0 mt-0.5" />
                    {item.question}
                  </CardTitle>
                  <CardDescription className="text-emerald-400 font-medium">
                    {item.shortAnswer}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-slate-300 text-sm">{item.fullAnswer}</p>
                  <p className="text-sacred text-xs italic">{item.scripture}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* P.R.O.O.F. Framework Preview */}
      <section className="py-16 lg:py-24 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30">
              <Shield className="w-3 h-3 mr-1" />
              The P.R.O.O.F. Framework
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Biblical Discernment for Greek Membership
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Five questions to evaluate your organization against Scripture. 
              Not to condemn, but to clarify your convictions.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {proofFramework.map((item, index) => (
              <Card key={item.letter} className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-sacred/20 flex items-center justify-center shrink-0">
                    <span className="text-xl font-bold text-sacred">{item.letter}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-white">{item.word}</p>
                    <p className="text-slate-400 text-sm">{item.question}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button asChild size="lg" className="bg-sacred hover:bg-sacred/90">
              <Link to="/proof-course">
                Take Full P.R.O.O.F. Course
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* What Sacred Greeks Offers */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
              <Sparkles className="w-3 h-3 mr-1" />
              Tools for Discernment
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What Sacred Greeks Provides
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: BookOpen, title: "Daily Devotionals", desc: "Scripture specifically for Greek life challenges" },
              { icon: Users, title: "Community Forum", desc: "Connect with believers navigating the same questions" },
              { icon: Shield, title: "Symbol Guide", desc: "Biblical analysis of Greek symbols and traditions" },
              { icon: MessageSquare, title: "AI Faith Coach", desc: "Get personalized answers to your specific questions" },
              { icon: CheckCircle2, title: "Faith Assessment", desc: "Understand where you stand on key issues" },
              { icon: Cross, title: "Prayer Wall", desc: "Lift up fellow Greeks and receive prayer support" }
            ].map((item) => (
              <Card key={item.title} className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-4">
          <Card className="max-w-3xl mx-auto bg-gradient-to-r from-sacred/20 to-amber-500/20 border-sacred/30">
            <CardContent className="p-8 md:p-12 text-center">
              <Cross className="w-12 h-12 text-sacred mx-auto mb-6" />
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Navigate Faith & Greek Life With Confidence
              </h2>
              <p className="text-slate-300 mb-8 max-w-xl mx-auto">
                You don't have to choose between your letters and your Lord. 
                But you do need discernment. Let Sacred Greeks guide your journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
                  <Link to="/auth">
                    Join Sacred Greeks Free
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                  <Link to="/snapshot">
                    Start Faith Assessment
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer Navigation */}
      <section className="py-8 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
            <Link to="/greek-financial-leadership" className="hover:text-sacred transition-colors">
              Financial Stewardship
            </Link>
            <Link to="/greek-leadership" className="hover:text-sacred transition-colors">
              Leadership & Service
            </Link>
            <Link to="/symbols-rituals" className="hover:text-sacred transition-colors">
              Symbols Guide
            </Link>
            <Link to="/auth" className="hover:text-sacred transition-colors">
              Join Sacred Greeks
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
