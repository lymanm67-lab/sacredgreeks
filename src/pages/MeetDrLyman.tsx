import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Home, BookOpen, Youtube, ExternalLink, Sparkles, Heart, Users, Award } from "lucide-react";

const MeetDrLyman = () => {
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
          <h1 className="text-lg font-semibold text-foreground">Meet Dr. Lyman</h1>
          <div className="w-16" />
        </div>
      </header>

      <main className="container mx-auto px-4 py-10 max-w-4xl space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <Badge className="bg-sacred/10 text-sacred border-sacred/20">
            Architect of The Sacred Greeks Movement
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Meet Dr. Lyman A. Montgomery
          </h2>
        </div>

        {/* Photo and Bio */}
        <Card className="overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3 bg-gradient-to-br from-sacred/20 to-sacred/5 p-6 flex items-center justify-center">
              <div className="w-48 h-48 rounded-full bg-sacred/20 flex items-center justify-center">
                <Award className="w-24 h-24 text-sacred" />
              </div>
            </div>
            <CardContent className="md:w-2/3 p-6 space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Dr. Lyman A. Montgomery is a beacon for Divine Nine members seeking to harmonize their faith with Greek commitments. Through his groundbreaking work in Christian Greek Life and Cultural Redemption, he champions The Sacred Greeks Movement.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                His bestselling book, <em className="text-foreground font-medium">Sacred, Not Sinful</em>, and the Sacred Greeks platform provide a guiding light, helping brothers and sisters reconcile their faith and fraternity/sorority. He powerfully illustrates how beloved Greek traditions can be redeemed, reclaimed, and repurposed to truly glorify God.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                As a proud member of <span className="text-sacred font-medium">Phi Beta Sigma Fraternity, Inc.</span> and an ordained elder, Dr. Montgomery masterfully blends over three decades of ministry and leadership with profound biblical insight.
              </p>
            </CardContent>
          </div>
        </Card>

        {/* The Sacred Greeks Movement */}
        <Card className="border-sacred/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-sacred" />
              The Sacred Greeks Movement
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              The Sacred Greeks Movement is a heartfelt invitation for believers to live distinct and purpose-filled lives within their Greek organizations. It's about consciously using letters, rituals, and service not just for tradition, but for God's glory.
            </p>
            <p>
              This movement isn't about altering the Divine Nine; it's about <span className="text-foreground font-medium">transforming the hearts and intentions</span> of those who serve within them, impacting communities from the inside out.
            </p>
          </CardContent>
        </Card>

        {/* Mission Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="text-center p-6">
            <Heart className="w-10 h-10 text-sacred mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Biblical Clarity</h3>
            <p className="text-sm text-muted-foreground">
              Equipping members with scriptural wisdom for Greek life decisions
            </p>
          </Card>
          <Card className="text-center p-6">
            <Users className="w-10 h-10 text-sacred mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Cultural Understanding</h3>
            <p className="text-sm text-muted-foreground">
              Genuine appreciation for the heritage and traditions of BGLOs
            </p>
          </Card>
          <Card className="text-center p-6">
            <Sparkles className="w-10 h-10 text-sacred mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Personal Transformation</h3>
            <p className="text-sm text-muted-foreground">
              Deep, lasting change that glorifies God in all areas of life
            </p>
          </Card>
        </div>

        {/* Resources */}
        <Card className="bg-gradient-to-br from-sacred/5 to-sacred/10 border-sacred/20">
          <CardHeader>
            <CardTitle>Explore Dr. Montgomery's Resources</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <a
                href="https://sacredgreekslife.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button variant="outline" className="w-full justify-start gap-2 h-auto py-3">
                  <ExternalLink className="w-4 h-4 text-sacred" />
                  <div className="text-left">
                    <div className="font-medium">SacredGreeksLife.com</div>
                    <div className="text-xs text-muted-foreground">Advancing Christian Greek Life</div>
                  </div>
                </Button>
              </a>
              <a
                href="https://www.youtube.com/@sacredgreeks"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button variant="outline" className="w-full justify-start gap-2 h-auto py-3">
                  <Youtube className="w-4 h-4 text-sacred" />
                  <div className="text-left">
                    <div className="font-medium">YouTube Channel</div>
                    <div className="text-xs text-muted-foreground">Sacred Greeks Movement Videos</div>
                  </div>
                </Button>
              </a>
              <a
                href="https://a.co/d/0L7ZWXD"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button variant="outline" className="w-full justify-start gap-2 h-auto py-3">
                  <BookOpen className="w-4 h-4 text-sacred" />
                  <div className="text-left">
                    <div className="font-medium">Sacred, Not Sinful</div>
                    <div className="text-xs text-muted-foreground">Get the book on Amazon</div>
                  </div>
                </Button>
              </a>
              <Link to="/book" className="block">
                <Button variant="outline" className="w-full justify-start gap-2 h-auto py-3">
                  <BookOpen className="w-4 h-4 text-sacred" />
                  <div className="text-left">
                    <div className="font-medium">Companion Guide</div>
                    <div className="text-xs text-muted-foreground">Study guide & resources</div>
                  </div>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">
            Ready to take your Sacred Greeks journey to the next level?
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild className="bg-sacred hover:bg-sacred/90">
              <Link to="/sacred-greeks">Take the Assessment</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/study">View Study Guide</Link>
            </Button>
          </div>
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

export default MeetDrLyman;
