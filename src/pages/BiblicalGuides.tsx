import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Home, BookOpen, FileText, Download, ExternalLink, Scroll, Cross, Shield, Heart } from "lucide-react";

const BiblicalGuides = () => {
  const guides = [
    {
      icon: Shield,
      title: "P.R.O.O.F. Framework Guide",
      description: "The foundational biblical tool for evaluating Greek traditions and practices through Scripture.",
      link: "/study",
      linkText: "Access Study Guide"
    },
    {
      icon: Scroll,
      title: "Biblical Framework for BGLOs",
      description: "A comprehensive PDF examining Greek life through the lens of Scripture.",
      link: "/resources",
      linkText: "View Resource",
      downloadable: true
    },
    {
      icon: Cross,
      title: "Repentance, Repair & Renewal",
      description: "A checklist for those seeking to align their Greek involvement with biblical principles.",
      link: "/resources",
      linkText: "Download Checklist",
      downloadable: true
    },
    {
      icon: Heart,
      title: "Integrity Under Pressure",
      description: "Biblical guidance for maintaining faith-based convictions in challenging Greek situations.",
      link: "/resources",
      linkText: "Read Guide",
      downloadable: true
    }
  ];

  const topics = [
    "Understanding ritual symbolism from a biblical perspective",
    "Discerning cultural vs. spiritual practices",
    "Navigating hazing and peer pressure biblically",
    "Maintaining Christian witness within Greek organizations",
    "Reconciling faith and fraternity/sorority commitments",
    "Living out the P.R.O.O.F. Framework daily"
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
          <h1 className="text-lg font-semibold text-foreground">Biblical Guides</h1>
          <div className="w-16" />
        </div>
      </header>

      <main className="container mx-auto px-4 py-10 max-w-4xl space-y-8">
        {/* Hero */}
        <div className="text-center space-y-4">
          <Badge className="bg-sacred/10 text-sacred border-sacred/20">
            Scripture-Based Resources
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Biblical Guides for Greek Life
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Comprehensive biblical resources to help you navigate Greek life with wisdom, integrity, and faith.
          </p>
        </div>

        {/* Featured Guide */}
        <Card className="border-sacred/30 bg-gradient-to-br from-sacred/5 to-background overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3 bg-sacred/10 p-8 flex items-center justify-center">
              <BookOpen className="w-20 h-20 text-sacred" />
            </div>
            <div className="md:w-2/3 p-6">
              <Badge className="mb-3">Featured Resource</Badge>
              <h3 className="text-2xl font-bold mb-2">Sacred, Not Sinful Study Guide</h3>
              <p className="text-muted-foreground mb-4">
                A comprehensive 12-session study guide designed for individual or group study. Learn to apply biblical principles to real-world Greek life situations.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild className="bg-sacred hover:bg-sacred/90">
                  <Link to="/study">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Start Study Guide
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/podcast">
                    Listen to Podcast
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Guides Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {guides.map((guide, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-sacred/10">
                    <guide.icon className="w-5 h-5 text-sacred" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{guide.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <CardDescription>{guide.description}</CardDescription>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link to={guide.link}>
                    {guide.downloadable ? <Download className="w-4 h-4 mr-2" /> : <ExternalLink className="w-4 h-4 mr-2" />}
                    {guide.linkText}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Topics Covered */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-sacred" />
              Topics Covered
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-3">
              {topics.map((topic, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-sacred mt-2 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{topic}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="bg-gradient-to-br from-sacred/10 to-sacred/5 rounded-xl p-8 text-center space-y-4">
          <Scroll className="w-10 h-10 text-sacred mx-auto" />
          <h3 className="text-2xl font-bold">Need Personalized Guidance?</h3>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Take the Sacred Greeks Assessment to receive personalized biblical guidance for your specific situation.
          </p>
          <Button asChild className="bg-sacred hover:bg-sacred/90">
            <Link to="/sacred-greeks">Take the Assessment</Link>
          </Button>
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

export default BiblicalGuides;
