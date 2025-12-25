import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Home, BookOpen, Star, ShoppingCart, ExternalLink, Quote, CheckCircle } from "lucide-react";
import bookCover from "@/assets/sacred-not-sinful-cover.jpg";

const TheBook = () => {
  const features = [
    "Biblical framework for evaluating Greek traditions",
    "The P.R.O.O.F. Framework explained in detail",
    "Real-life testimonies from Divine Nine Christians",
    "Practical guidance for common Greek life situations",
    "Scripture-based responses to critics",
    "Tools for personal and chapter transformation"
  ];

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
