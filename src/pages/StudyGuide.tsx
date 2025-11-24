import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, BookOpen, MessageCircle, CheckCircle } from "lucide-react";
import { studyGuideSessions } from "@/sacredGreeksContent";

const StudyGuide = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/30 to-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <Badge className="bg-sacred/10 text-sacred hover:bg-sacred/20 border-sacred/20" variant="outline">
              5-Session Study Guide
            </Badge>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center space-y-6 mb-12">
          <div className="inline-flex items-center justify-center mb-4 bg-sacred/10 rounded-full p-4">
            <BookOpen className="w-12 h-12 text-sacred" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Sacred Not Sinful <span className="text-sacred">Study Guide</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A 5-session starter guide to help you navigate faith and Greek life with biblical clarity. 
            Perfect for personal study, small groups, or chapter discussions.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle className="w-5 h-5 text-sacred" />
              <span>Scripture-based</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle className="w-5 h-5 text-sacred" />
              <span>Discussion questions</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle className="w-5 h-5 text-sacred" />
              <span>Action steps</span>
            </div>
          </div>
        </div>

        {/* Study Sessions */}
        <div className="max-w-4xl mx-auto space-y-6">
          {studyGuideSessions.map((session, index) => (
            <Card key={session.id} className="border-2 hover:border-sacred/50 transition-all animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-sacred text-sacred-foreground flex items-center justify-center font-bold text-lg flex-shrink-0">
                    {session.id}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2">{session.title}</CardTitle>
                    <CardDescription className="text-base italic">
                      Theme: {session.theme}
                    </CardDescription>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {session.scriptures.map((scripture, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {scripture}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="teaching" className="border-0">
                    <AccordionTrigger className="text-base font-semibold hover:text-sacred">
                      Teaching Content
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground space-y-4">
                      {session.teaching.split('\n\n').map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                      ))}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="questions" className="border-0">
                    <AccordionTrigger className="text-base font-semibold hover:text-sacred">
                      Discussion Questions
                    </AccordionTrigger>
                    <AccordionContent>
                      <ol className="space-y-3 list-decimal list-inside text-muted-foreground">
                        {session.questions.map((question, idx) => (
                          <li key={idx} className="leading-relaxed">{question}?</li>
                        ))}
                      </ol>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="action" className="border-0">
                    <AccordionTrigger className="text-base font-semibold hover:text-sacred">
                      Action Step
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="bg-sacred/5 border border-sacred/20 rounded-lg p-4">
                        <p className="text-foreground font-medium mb-2">This Week's Challenge:</p>
                        <p className="text-muted-foreground">{session.actionStep}</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground italic">
                    {session.readMoreNote}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Coming Soon Notice */}
          <Card className="border-2 border-dashed border-muted-foreground/30">
            <CardHeader>
              <CardTitle className="text-xl text-muted-foreground flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Sessions 4-5 Coming Soon
              </CardTitle>
              <CardDescription>
                Additional sessions covering the P.R.O.O.F. Framework and practical application will be added soon.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto mt-12">
          <Card className="bg-gradient-to-br from-sacred/5 to-sacred/10 border-sacred/20">
            <CardHeader className="text-center space-y-4">
              <CardTitle className="text-2xl md:text-3xl">
                Ready to Go Deeper?
              </CardTitle>
              <CardDescription className="text-base">
                Get the full Sacred, Not Sinful book and explore personal coaching options with Dr. Lyman.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://a.co/d/5a6Yt9t"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-sacred hover:bg-sacred/90 text-sacred-foreground">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Get the Book
                </Button>
              </a>
              <a
                href="https://sacredgreeks.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Explore Coaching
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm text-muted-foreground">
              Based on "Sacred, Not Sinful" by Dr. Lyman • <Link to="/" className="text-sacred hover:underline">SacredGreeks.com</Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StudyGuide;
