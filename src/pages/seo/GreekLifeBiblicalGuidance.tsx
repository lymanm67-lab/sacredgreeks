import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SEOHead } from "@/components/SEOHead";
import { 
  BookOpen, Scale, Eye, Users, Cross, ArrowRight, 
  CheckCircle2, AlertTriangle, Lightbulb, FileText
} from "lucide-react";

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
    color: "bg-green-500",
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
        title="Greek Life Biblical Guidance | P.R.O.O.F. Framework for Christian Discernment"
        description="Biblical guidance for Greek life decisions. Use the P.R.O.O.F. framework to evaluate fraternity and sorority membership through Scripture. Christian perspective on Greek rituals, oaths, pledging, and traditions."
        keywords="Greek life biblical guidance, P.R.O.O.F. framework, Christian perspective Greek rituals, biblical view fraternity, sorority Christian guidance, Greek oaths Bible, fraternity rituals Scripture, Greek life discernment, Christian Greek life evaluation"
        structuredDataType="WebPage"
      />
      
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <header className="relative overflow-hidden bg-gradient-to-b from-amber-500/10 via-background to-background">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                <BookOpen className="w-4 h-4" />
                <span className="text-sm font-medium">Biblical Guidance for Greek Life</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Greek Life Through a{' '}
                <span className="text-amber-600 dark:text-amber-400">Biblical Lens</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Use the P.R.O.O.F. framework to evaluate Greek organization membership with 
                Scripture as your guide. Make informed, faith-honoring decisions.
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

        {/* P.R.O.O.F. Framework Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                The P.R.O.O.F. Framework
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A biblical evaluation tool developed by Dr. Lyman Montgomery to help Christians 
                assess Greek organization membership through Scripture.
              </p>
            </div>
            
            <div className="space-y-6 max-w-4xl mx-auto">
              {proofFramework.map((item, index) => (
                <Card key={index} className="border-2 hover:border-amber-500/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-14 h-14 rounded-lg ${item.color} flex items-center justify-center shrink-0 text-white font-bold text-2xl`}>
                        {item.letter}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
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
                Biblical Guidance Topics
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Should Christians join Greek organizations?",
                  "Biblical perspective on fraternity rituals",
                  "What the Bible says about secret oaths",
                  "Evaluating Greek traditions scripturally",
                  "Christian response to hazing practices",
                  "Balancing brotherhood with faith",
                  "When to stay vs. leave an organization",
                  "Honoring God in Greek membership",
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

        {/* Warning Section */}
        <section className="py-12 bg-amber-500/10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto flex items-start gap-4">
              <AlertTriangle className="w-8 h-8 text-amber-600 dark:text-amber-400 shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Important Disclaimer
                </h3>
                <p className="text-muted-foreground">
                  This guidance is designed to help you make informed decisions using Scripture. 
                  Each organization and chapter may differ. We encourage prayer, counsel from 
                  spiritual leaders, and personal discernment in your decision-making process.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Get Personalized Biblical Guidance
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Take the P.R.O.O.F. Assessment to receive customized guidance based on your 
              specific situation and organization.
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
