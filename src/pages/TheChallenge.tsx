import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Home, Target, CheckCircle, ArrowRight, Shield, BookOpen, Users, Lightbulb } from "lucide-react";

const TheChallenge = () => {
  const challenges = [
    {
      icon: Shield,
      title: "Navigating Ritual Questions",
      description: "Many Christians struggle with understanding which rituals conflict with their faith and which are cultural traditions that can be honored."
    },
    {
      icon: Users,
      title: "Peer Pressure & Belonging",
      description: "The desire to belong can conflict with biblical convictions, especially during intake processes or organizational events."
    },
    {
      icon: Lightbulb,
      title: "Lack of Biblical Framework",
      description: "Without clear scriptural guidance, members often feel lost when trying to evaluate Greek traditions through a faith lens."
    },
    {
      icon: Target,
      title: "Living Authentically",
      description: "Balancing genuine participation in Greek life while maintaining an uncompromising Christian witness."
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
          <h1 className="text-lg font-semibold text-foreground">The Challenge</h1>
          <div className="w-16" />
        </div>
      </header>

      <main className="container mx-auto px-4 py-10 max-w-4xl space-y-8">
        {/* Hero */}
        <div className="text-center space-y-4">
          <Badge className="bg-sacred/10 text-sacred border-sacred/20">
            Understanding The Journey
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            The Challenge Christians Face in Greek Life
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Millions of Christians participate in Greek Letter Organizations, yet many struggle silently with questions about faith and fraternity.
          </p>
        </div>

        {/* The Core Question */}
        <Card className="border-sacred/30 bg-gradient-to-br from-sacred/5 to-background">
          <CardContent className="p-8 text-center">
            <Target className="w-12 h-12 text-sacred mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">The Core Question</h3>
            <p className="text-lg text-muted-foreground italic">
              "Can I be a faithful Christian and an active member of my Greek organization?"
            </p>
            <p className="mt-4 text-muted-foreground">
              Sacred Greeks provides a biblical framework to answer this question with confidence and conviction.
            </p>
          </CardContent>
        </Card>

        {/* Challenges Grid */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-center">Common Challenges</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {challenges.map((challenge, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-sacred/10">
                      <challenge.icon className="w-5 h-5 text-sacred" />
                    </div>
                    <CardTitle className="text-lg">{challenge.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{challenge.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* The Solution */}
        <Card className="border-sacred/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              The Sacred Greeks Solution
            </CardTitle>
            <CardDescription>
              A comprehensive approach to navigating Greek life with faith
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-sacred text-sacred-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                <div>
                  <h4 className="font-medium">Biblical Assessment</h4>
                  <p className="text-sm text-muted-foreground">Take the Sacred Greeks Assessment to understand where you stand</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-sacred text-sacred-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                <div>
                  <h4 className="font-medium">P.R.O.O.F. Framework</h4>
                  <p className="text-sm text-muted-foreground">Learn the biblical framework for evaluating traditions and practices</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-sacred text-sacred-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                <div>
                  <h4 className="font-medium">Practical Tools</h4>
                  <p className="text-sm text-muted-foreground">Access devotionals, prayer guides, and resources for daily application</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-sacred text-sacred-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">4</div>
                <div>
                  <h4 className="font-medium">Community Support</h4>
                  <p className="text-sm text-muted-foreground">Connect with other believers navigating the same journey</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-sacred/10 to-sacred/5 rounded-xl p-8 text-center space-y-4">
          <BookOpen className="w-10 h-10 text-sacred mx-auto" />
          <h3 className="text-2xl font-bold">Ready to Begin?</h3>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Take the first step in your Sacred Greeks journey. Our assessment will help you understand where you are and provide personalized guidance.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Button asChild className="bg-sacred hover:bg-sacred/90">
              <Link to="/sacred-greeks">
                Take the Assessment
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/myth-buster">Explore Common Myths</Link>
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

export default TheChallenge;
