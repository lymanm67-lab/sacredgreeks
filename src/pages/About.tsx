import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Home, Sparkles } from "lucide-react";

const About = () => {
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
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-sacred" />
            <h1 className="text-lg font-semibold text-foreground">Our Mission</h1>
          </div>
          <div className="w-16" />
        </div>
      </header>

      <main className="container mx-auto px-4 py-10 max-w-4xl space-y-8">
        <div className="text-center space-y-4">
          <Badge className="bg-sacred/10 text-sacred border-sacred/20">
            Sacred Greeks Movement
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-sacred to-warm-blue bg-clip-text text-transparent">
            Sacred, Not Sinful
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Helping Christians in Black Greek Letter Organizations honor Christ fully while engaging
            their fraternity or sorority with wisdom, integrity, and biblical conviction.
          </p>
        </div>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-sacred" />
              Why Sacred Greeks Exists
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Many Christian students feel torn between loyalty to Christ and loyalty to their Greek
              organization. Sacred Greeks exists to resolve that tension by pointing people back to
              Scripture, helping them evaluate traditions and practices through a biblical lens, and
              offering practical tools for courageous, Christ-centered leadership.
            </p>
            <p>
              Our mission is to equip members and leaders of Black Greek Letter Organizations to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Discern what is biblical, what is cultural, and what is harmful or idolatrous.</li>
              <li>Repent where needed, repair relationships, and walk in renewed obedience.</li>
              <li>Model integrity under pressure in line with the P.R.O.O.F. framework.</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>The P.R.O.O.F. Framework</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground leading-relaxed">
            <p>
              Throughout the app you&apos;ll see references to the P.R.O.O.F. framework. This is a
              practical biblical tool that helps you pause, pray, and respond wisely when facing hard
              conversations, hazing culture, or pressure to compromise.
            </p>
            <p>
              Use the tools in this app—assessments, devotionals, prayer guides, and resources—to
              apply P.R.O.O.F. in real-life Greek situations so that Christ is honored in both your
              letters and your life.
            </p>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button asChild className="bg-sacred hover:bg-sacred/90">
            <Link to="/resources">Explore Resources</Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default About;
