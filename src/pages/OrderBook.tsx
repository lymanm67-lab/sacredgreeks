import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ExternalLink, Star, CheckCircle2, Quote } from "lucide-react";
import bookCover from "@/assets/sacred-not-sinful-cover.jpg";

const OrderBook = () => {
  const bookUrl = "https://a.co/d/aAtPGAM";

  const bookHighlights = [
    "Biblical foundation for Greek membership",
    "Historical context of BGLOs",
    "Practical guidance for navigating faith & fraternity",
    "Theological clarity on rituals and symbolism",
    "Healing for divided communities",
  ];

  return (
    <div className="container max-w-4xl py-8 px-4 space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <Badge variant="secondary" className="text-sm">
          By Dr. Lyman Montgomery
        </Badge>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          Sacred Not Sinful
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A Biblical Response to the Black Greek Letter Organization Debate
        </p>
      </div>

      {/* Main Content Card */}
      <Card className="overflow-hidden">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Book Cover */}
          <div className="bg-gradient-to-br from-amber-900/30 to-black p-6 flex items-center justify-center min-h-[400px]">
            <div className="text-center space-y-4">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-amber-500/30 to-sacred/30 rounded-lg blur-lg opacity-75 group-hover:opacity-100 transition-opacity" />
                <img 
                  src={bookCover} 
                  alt="Sacred Not Sinful Book Cover" 
                  className="relative w-48 md:w-56 h-auto rounded-lg shadow-2xl border border-white/10"
                />
              </div>
              <div className="flex items-center justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
          </div>

          {/* Book Details */}
          <CardContent className="p-6 space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-3">What You'll Learn</h2>
              <ul className="space-y-2">
                {bookHighlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-sacred shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button 
              size="lg" 
              className="w-full bg-sacred hover:bg-sacred/90"
              onClick={() => window.open(bookUrl, '_blank')}
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Order on Amazon
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              Available in paperback, hardcover, and Kindle formats — audio coming soon!
            </p>
          </CardContent>
        </div>
      </Card>

      {/* Quote Section */}
      <Card className="bg-muted/50">
        <CardContent className="p-6">
          <div className="flex gap-4">
            <Quote className="h-8 w-8 text-sacred shrink-0" />
            <blockquote className="space-y-2">
              <p className="text-lg italic text-foreground">
                "This book provides the theological foundation for everything you'll find in the Sacred Greeks app. It's a must-read for anyone seeking clarity on faith and Greek life."
              </p>
              <footer className="text-sm text-muted-foreground">
                — Dr. Lyman Montgomery
              </footer>
            </blockquote>
          </div>
        </CardContent>
      </Card>

      {/* About the Author */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-sacred" />
            About the Author
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Dr. Lyman Montgomery is a devoted scholar and minister who understands the unique challenges Christians face when navigating Black Greek Letter Organization membership. After years of witnessing the pain, confusion, and division caused by the faith versus fraternity debate, he set out to provide biblical clarity and healing for Greek-affiliated believers.
          </p>
          <p className="text-muted-foreground">
            His mission through Sacred Greeks is to equip you with sound theology, historical context, and practical tools to live confidently in both your faith and your Greek identity.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderBook;
