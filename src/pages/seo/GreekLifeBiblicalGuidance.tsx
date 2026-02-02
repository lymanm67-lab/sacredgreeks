import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SEOHead } from "@/components/SEOHead";
import { 
  BookOpen, Scale, Eye, Users, Cross, ArrowRight, 
  CheckCircle2, AlertTriangle, Lightbulb, Trophy, Sparkles, Zap
} from "lucide-react";
import { BlueOceanBadge, FreeForeverBadge } from "@/components/seo/BlueOceanBadge";

const proofFramework = [
  {
    letter: "P",
    title: "Pledge Process",
    description: "Biblical evaluation of intake procedures, new member education, and commitment requirements.",
    color: "bg-blue-500",
    questions: ["Does pledging involve practices contrary to Scripture?", "Are you being asked to compromise your faith?"],
  },
  {
    letter: "R",
    title: "Rituals",
    description: "Examining Greek ceremonies, initiations, and traditions through a scriptural lens.",
    color: "bg-purple-500",
    questions: ["Do rituals contain elements that conflict with Christian worship?", "Are religious symbols used inappropriately?"],
  },
  {
    letter: "O",
    title: "Oaths & Vows",
    description: "Understanding what you're committing to and whether it aligns with biblical teachings on vows.",
    color: "bg-orange-500",
    questions: ["What exactly are you swearing to?", "Does Jesus' teaching on oaths apply here?"],
  },
  {
    letter: "O",
    title: "Obscurity",
    description: "Evaluating secrecy requirements and whether they conflict with Christian transparency.",
    color: "bg-emerald-500",
    questions: ["What must be kept secret?", "Does secrecy serve a legitimate purpose?"],
  },
  {
    letter: "F",
    title: "Founders & History",
    description: "Researching organizational origins, founding principles, and historical context.",
    color: "bg-red-500",
    questions: ["What were the founders' intentions?", "Has the organization evolved in concerning ways?"],
  },
];

const whyPROOF = [
  { stat: "5", label: "Key Areas", detail: "Comprehensive evaluation" },
  { stat: "20+", label: "Questions", detail: "Deep biblical analysis" },
  { stat: "Only", label: "Framework", detail: "Of its kind anywhere" },
  { stat: "$0", label: "Forever", detail: "Completely free access" },
];

const biblicalPrinciples = [
  {
    title: "Matthew 5:33-37",
    topic: "On Oaths",
    summary: "Jesus teaches about the seriousness of making vows and commitments.",
  },
  {
    title: "2 Corinthians 6:14",
    topic: "On Partnerships",
    summary: "Guidance on being unequally yoked and maintaining spiritual integrity.",
  },
  {
    title: "Ephesians 5:11-12",
    topic: "On Secrecy",
    summary: "Instructions about avoiding fruitless deeds of darkness.",
  },
  {
    title: "Colossians 2:8",
    topic: "On Traditions",
    summary: "Warning against hollow philosophy and human tradition over Christ.",
  },
];

export default function GreekLifeBiblicalGuidance() {
  return (
    <>
      <SEOHead
        title="Greek Life Biblical Guidance | P.R.O.O.F. Framework™ | Only Christian Evaluation Tool"
        description="The P.R.O.O.F. Framework™ is the ONLY biblical evaluation tool for Greek life. No other app offers systematic Scripture-based guidance for fraternity and sorority decisions. 100% FREE."
        keywords="Greek life biblical guidance, P.R.O.O.F. framework, Christian perspective Greek rituals, biblical view fraternity, sorority Christian guidance, Greek oaths Bible, fraternity rituals Scripture, Greek life discernment Christian, only Greek Bible app"
        structuredDataType="WebPage"
      />
      
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <header className="relative overflow-hidden bg-gradient-to-b from-amber-500/10 via-background to-background">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="flex flex-wrap gap-2 justify-center">
                <BlueOceanBadge variant="gold" />
                <FreeForeverBadge />
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                The <span className="text-amber-600 dark:text-amber-400">Only</span> Biblical Evaluation Tool for{' '}
                <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                  Greek Life
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                The <strong className="text-foreground">P.R.O.O.F. Framework™</strong> is a proprietary system 
                developed by Dr. Lyman Montgomery. <span className="text-amber-600 dark:text-amber-400 font-semibold">
                No other app, website, or resource offers a systematic biblical evaluation tool for Greek organizations.</span>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link to="/proof-course">
                  <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white px-8">
                    Learn P.R.O.O.F. Framework
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link to="/proof-assessment">
                  <Button size="lg" variant="outline" className="px-8">
                    Take the Assessment
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Stats */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {whyPROOF.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-amber-600 dark:text-amber-400">{item.stat}</div>
                  <div className="text-sm font-medium text-foreground">{item.label}</div>
                  <div className="text-xs text-muted-foreground mt-1">{item.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Proprietary Notice */}
        <section className="py-8 bg-amber-500/10 border-y border-amber-500/20">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-3 text-center">
              <Trophy className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              <p className="text-amber-700 dark:text-amber-300 font-medium">
                P.R.O.O.F.™ is exclusive to Sacred Greeks. You won't find this framework anywhere else.
              </p>
            </div>
          </div>
        </section>

        {/* P.R.O.O.F. Framework Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Sparkles className="w-10 h-10 text-amber-500 mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                The P.R.O.O.F. Framework™
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Five critical areas for biblical discernment, available nowhere else.
              </p>
            </div>
            
            <div className="space-y-6 max-w-4xl mx-auto">
              {proofFramework.map((item, index) => (
                <Card key={index} className="border-2 hover:border-amber-500/50 transition-colors overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex">
                      <div className={`w-20 ${item.color} flex items-center justify-center text-white font-bold text-3xl shrink-0`}>
                        {item.letter}
                      </div>
                      <div className="p-6 flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-600 dark:text-amber-400 font-medium">EXCLUSIVE</span>
                        </div>
                        <p className="text-muted-foreground mb-3">{item.description}</p>
                        <div className="space-y-2">
                          {item.questions.map((q, qIndex) => (
                            <div key={qIndex} className="flex items-center gap-2 text-sm">
                              <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
                              <span className="text-muted-foreground">{q}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Biblical Principles */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">
              Key Scripture for Greek Life Decisions
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {biblicalPrinciples.map((principle, index) => (
                <Card key={index} className="bg-background">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <Cross className="w-5 h-5 text-amber-500 shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-foreground">{principle.title}</h3>
                        <p className="text-sm text-amber-600 dark:text-amber-400 mb-2">{principle.topic}</p>
                        <p className="text-sm text-muted-foreground">{principle.summary}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Topics Covered */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">
                Questions P.R.O.O.F. Helps You Answer
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Should Christians join Greek organizations?",
                  "What does the Bible say about fraternity rituals?",
                  "Are Greek oaths compatible with Christian faith?",
                  "How to evaluate Greek traditions scripturally",
                  "What's the Christian response to hazing?",
                  "Can I balance brotherhood with my faith?",
                  "When should I stay vs. leave an organization?",
                  "How to honor God in Greek membership",
                ].map((topic, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0" />
                    <span className="text-foreground">{topic}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-amber-500/5">
          <div className="container mx-auto px-4 text-center">
            <Zap className="w-12 h-12 text-amber-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">
              Get Personalized Biblical Guidance
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Take the P.R.O.O.F. Assessment for customized guidance based on your organization. 
              Only available here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/proof-assessment">
                <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white">
                  Start P.R.O.O.F. Assessment
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/ask-dr-lyman">
                <Button size="lg" variant="outline">
                  Ask Dr. Lyman
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Related Links */}
        <footer className="py-12 border-t">
          <div className="container mx-auto px-4">
            <h3 className="text-lg font-semibold mb-6 text-center">Related Resources</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/christian-greek-life" className="text-amber-600 dark:text-amber-400 hover:underline">Christian Greek Life</Link>
              <Link to="/oaths" className="text-amber-600 dark:text-amber-400 hover:underline">Oaths Guide</Link>
              <Link to="/symbol-guide" className="text-amber-600 dark:text-amber-400 hover:underline">Symbol Guide</Link>
              <Link to="/myth-buster" className="text-amber-600 dark:text-amber-400 hover:underline">Myth Buster</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
