import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Home, BookOpen, Star, ShoppingCart, ExternalLink, Quote, CheckCircle, Eye, ChevronRight, X } from "lucide-react";
import bookCover from "@/assets/sacred-not-sinful-cover.jpg";

const TheBook = () => {
  const [sampleOpen, setSampleOpen] = useState(false);

  const features = [
    "Biblical framework for evaluating Greek traditions",
    "The P.R.O.O.F. Framework explained in detail",
    "Real-life testimonies from Divine Nine Christians",
    "Practical guidance for common Greek life situations",
    "Scripture-based responses to critics",
    "Tools for personal and chapter transformation"
  ];

  const chapter4Sample = {
    title: "Chapter 4: D9 – Institutions of Resistance and Resilience",
    sections: [
      {
        heading: "Scrutinized Symbols",
        content: `The symbols, colors, and traditions of Black Greek Letter Organizations have long been subject to intense scrutiny—often from those who fail to understand their deeper meaning and historical context. Before rushing to judgment, we must ask: What do these symbols actually represent? And who gets to define their significance?

From their founding, BGLOs adopted symbols that carried layered meanings—Greek letters that signified shared ideals, colors that represented values, and handshakes that marked covenant relationships. These were not borrowed mindlessly from ancient paganism, as critics often suggest. They were intentionally chosen by educated, often Christian, Black men and women who sought to create institutions of excellence, service, and uplift.`
      },
      {
        heading: "Symbols: Hidden Meanings or Harmless Pride?",
        content: `Critics frequently argue that Greek letters themselves are inherently pagan or spiritually dangerous. This claim reveals a fundamental misunderstanding of how language and symbolism work. Greek letters are simply an alphabet—a writing system used by millions throughout history for everything from Scripture (the New Testament was written in Greek) to modern science and mathematics.

When Alpha Phi Alpha chose its Greek letters in 1906, the founders were not invoking Greek gods. They were using a classical academic tradition to symbolize scholarly excellence. The same principle applies to every BGLO. The letters represent organizational identity, shared values, and membership—not worship of ancient deities.

Consider this parallel: Churches display crosses, yet the cross was originally a Roman instrument of execution. Through Christ's redemptive work, it became Christianity's most powerful symbol. Similarly, symbols can be redeemed, repurposed, and filled with new meaning.`
      },
      {
        heading: "Modern Rites of Passage",
        content: `Every meaningful organization, community, or faith tradition includes rites of passage—ceremonies that mark transition from one status to another. The Bible itself is filled with such rites: circumcision marked covenant membership, baptism marks entrance into the Christian community, and ordination sets apart spiritual leaders.

BGLO initiation ceremonies serve a similar function. They mark the transition from aspirant to member, from individual to part of a collective dedicated to service and excellence. When these ceremonies are conducted with integrity, focusing on character development, mentorship, and commitment to organizational values, they mirror the discipleship process Jesus modeled with His twelve disciples.

The question is not whether rites of passage are biblical—they clearly are. The question is whether a particular rite honors God or contradicts His commands. Christians in BGLOs must evaluate their organization's practices through this lens, seeking to transform anything that falls short while preserving what reflects kingdom values.`
      },
      {
        heading: "Theological Reflections on Revelation 19:16",
        content: `"On his robe and on his thigh he has this name written: KING OF KINGS AND LORD OF LORDS." — Revelation 19:16 (NIV)

This striking image of Christ bearing a name on His thigh has profound implications for how we understand marking and identity. The King of Kings Himself is depicted with identifying marks that declare His authority and nature.

Throughout Scripture, God uses physical marks to signify covenant, protection, and identity:
• The mark of the Lord protected Cain (Genesis 4:15)
• Circumcision marked God's covenant people (Genesis 17:11)
• The blood on doorposts marked Israelite homes for protection (Exodus 12:13)
• Believers are sealed with the Holy Spirit (Ephesians 1:13)

These biblical precedents challenge simplistic interpretations that condemn all marking as sinful. The issue is not the mark itself, but what it represents and to whom allegiance is given. A brand or symbol that represents commitment to scholarship, service, and brotherhood—values aligned with Scripture—stands in a different category than marks of pagan worship or rebellion against God.`
      }
    ]
  };

  const testimonials = [
    {
      quote: "This book changed how I view my membership. I no longer feel torn between my letters and my Lord.",
      author: "Alpha Kappa Alpha Sorority Member"
    },
    {
      quote: "Finally, a resource that doesn't condemn Greek life but shows us how to honor God within it.",
      author: "Omega Psi Phi Fraternity Member"
    },
    {
      quote: "Dr. Montgomery's biblical approach gave me the confidence to be both Greek and Christian.",
      author: "Delta Sigma Theta Sorority Member"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Home className="w-4 h-4" />
            <span className="text-sm font-medium">Home</span>
          </Link>
          <h1 className="text-lg font-semibold text-foreground">The Book</h1>
          <div className="w-16" />
        </div>
      </header>

      <main className="container mx-auto px-4 py-10 max-w-4xl space-y-8">
        {/* Hero */}
        <div className="text-center space-y-4">
          <Badge className="bg-sacred/10 text-sacred border-sacred/20">
            Bestselling Book
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-sacred to-warm-blue bg-clip-text text-transparent">
            Sacred, Not Sinful
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            The definitive guide for Christians navigating Black Greek Letter Organizations with faith and integrity.
          </p>
        </div>

        {/* Book Display */}
        <Card className="border-sacred/30 bg-gradient-to-br from-sacred/5 to-background overflow-hidden">
          <div className="md:flex">
            <div className="md:w-2/5 bg-gradient-to-br from-sacred/20 to-sacred/5 p-8 flex items-center justify-center">
              <div className="relative">
                <img 
                  src={bookCover} 
                  alt="Sacred, Not Sinful book cover by Dr. Lyman A. Montgomery III"
                  className="w-48 h-auto rounded-lg shadow-xl transform rotate-3 hover:rotate-0 transition-transform"
                />
                <div className="absolute -top-2 -right-2 bg-yellow-500 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" />
                  Bestseller
                </div>
              </div>
            </div>
            <div className="md:w-3/5 p-6 space-y-4">
              <h3 className="text-2xl font-bold">By Dr. Lyman A. Montgomery</h3>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                ))}
                <span className="text-sm text-muted-foreground ml-2">5.0 Rating</span>
              </div>
              <p className="text-muted-foreground">
                In this groundbreaking work, Dr. Montgomery provides a comprehensive biblical framework for Christians in Divine Nine organizations. Learn how to redeem, reclaim, and repurpose your Greek traditions for God's glory.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="https://a.co/d/0L7ZWXD"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-sacred hover:bg-sacred/90">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Get on Amazon
                  </Button>
                </a>
                <Button variant="outline" onClick={() => setSampleOpen(true)}>
                  <Eye className="w-4 h-4 mr-2" />
                  Read Sample
                </Button>
                <Button asChild variant="outline">
                  <Link to="/study-guide">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Free Study Guide
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Read Sample Dialog */}
        <Dialog open={sampleOpen} onOpenChange={setSampleOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] p-0">
            <DialogHeader className="p-6 pb-0 sticky top-0 bg-background z-10 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <Badge className="mb-2 bg-sacred/10 text-sacred border-sacred/20">
                    Free Sample
                  </Badge>
                  <DialogTitle className="text-2xl font-bold">
                    {chapter4Sample.title}
                  </DialogTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Preview from Sacred, Not Sinful by Dr. Lyman A. Montgomery
                  </p>
                </div>
              </div>
            </DialogHeader>
            <ScrollArea className="h-[60vh] px-6 pb-6">
              <div className="space-y-8 pt-4">
                {chapter4Sample.sections.map((section, index) => (
                  <div key={index} className="space-y-4">
                    <h3 className="text-xl font-semibold text-sacred flex items-center gap-2">
                      <ChevronRight className="w-5 h-5" />
                      {section.heading}
                    </h3>
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      {section.content.split('\n\n').map((paragraph, pIdx) => (
                        <p key={pIdx} className="text-muted-foreground leading-relaxed mb-4">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
                
                <div className="bg-gradient-to-r from-sacred/10 to-warm-blue/10 rounded-lg p-6 text-center space-y-4 mt-8">
                  <p className="text-lg font-medium">
                    Continue reading the full book...
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Discover the complete P.R.O.O.F. Framework, real testimonies, and practical guidance for living faithfully in Greek life.
                  </p>
                  <a
                    href="https://a.co/d/0L7ZWXD"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-sacred hover:bg-sacred/90">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Get the Full Book on Amazon
                    </Button>
                  </a>
                </div>
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>

        {/* What's Inside */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-sacred" />
              What's Inside
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Testimonials */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-center">What Readers Say</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-muted/30">
                <CardContent className="pt-6">
                  <Quote className="w-6 h-6 text-sacred/30 mb-2" />
                  <p className="text-sm text-muted-foreground italic mb-3">
                    "{testimonial.quote}"
                  </p>
                  <p className="text-xs font-medium text-sacred">
                    — {testimonial.author}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Featured Study Guide */}
        <Card className="bg-gradient-to-br from-sacred/10 via-sacred/5 to-warm-blue/10 border-2 border-sacred/30 overflow-hidden">
          <CardContent className="p-0">
            <div className="md:flex items-center">
              <div className="md:w-2/3 p-6 space-y-4">
                <Badge className="bg-sacred text-sacred-foreground">
                  Free Companion Resource
                </Badge>
                <h3 className="text-2xl font-bold">Sacred, Not Sinful Study Guide</h3>
                <p className="text-muted-foreground">
                  Go deeper with our complete 5-session study guide. Perfect for personal study, 
                  small groups, or chapter discussions. Includes teaching content, discussion questions, 
                  action steps, and progress tracking.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-sacred" />
                    5 in-depth sessions covering each book chapter
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-sacred" />
                    Discussion questions with answer journaling
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-sacred" />
                    Track your progress & earn completion certificate
                  </li>
                </ul>
                <Button asChild size="lg" className="bg-sacred hover:bg-sacred/90 mt-2">
                  <Link to="/study-guide">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Start the Free Study Guide
                  </Link>
                </Button>
              </div>
              <div className="md:w-1/3 bg-sacred/10 p-6 flex flex-col items-center justify-center text-center space-y-2">
                <div className="w-20 h-20 rounded-full bg-sacred/20 flex items-center justify-center">
                  <BookOpen className="w-10 h-10 text-sacred" />
                </div>
                <p className="text-3xl font-bold text-sacred">5</p>
                <p className="text-sm text-muted-foreground">Complete Sessions</p>
                <p className="text-xs text-muted-foreground">Audio available • Notes saved</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* More Resources */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>More Companion Resources</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-3">
              <Button asChild variant="outline" className="h-auto py-4 justify-start">
                <Link to="/podcast" className="flex items-center gap-3">
                  <ExternalLink className="w-5 h-5 text-sacred" />
                  <div className="text-left">
                    <span className="text-sm font-medium block">Sacred Greeks Podcast</span>
                    <span className="text-xs text-muted-foreground">Listen to Dr. Lyman's teachings</span>
                  </div>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4 justify-start">
                <Link to="/video-library" className="flex items-center gap-3">
                  <ExternalLink className="w-5 h-5 text-sacred" />
                  <div className="text-left">
                    <span className="text-sm font-medium block">Video Library</span>
                    <span className="text-xs text-muted-foreground">Watch teaching videos</span>
                  </div>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">
            Ready to transform your Greek experience?
          </p>
          <a
            href="https://a.co/d/0L7ZWXD"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-sacred hover:bg-sacred/90">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Order Sacred, Not Sinful Today
            </Button>
          </a>
        </div>

        {/* Footer */}
        <div className="text-center pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Sacred Greeks™. All Rights Reserved.
          </p>
        </div>
      </main>
    </div>
  );
};

export default TheBook;
