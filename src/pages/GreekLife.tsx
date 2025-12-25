import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Home, Users, Shield, BookOpen, Compass, Heart, Award, ArrowRight } from "lucide-react";

const GreekLife = () => {
  const councils = [
    {
      name: "Divine Nine (NPHC)",
      description: "National Pan-Hellenic Council - Nine historically Black Greek Letter Organizations",
      organizations: [
        "Alpha Phi Alpha Fraternity, Inc.",
        "Alpha Kappa Alpha Sorority, Inc.",
        "Kappa Alpha Psi Fraternity, Inc.",
        "Omega Psi Phi Fraternity, Inc.",
        "Delta Sigma Theta Sorority, Inc.",
        "Phi Beta Sigma Fraternity, Inc.",
        "Zeta Phi Beta Sorority, Inc.",
        "Sigma Gamma Rho Sorority, Inc.",
        "Iota Phi Theta Fraternity, Inc."
      ]
    },
    {
      name: "NPC",
      description: "National Panhellenic Conference - 26 women's sororities",
      link: "/symbol-guide?tab=organizations"
    },
    {
      name: "IFC",
      description: "Interfraternity Council - Men's fraternities across North America",
      link: "/symbol-guide?tab=organizations"
    },
    {
      name: "Cultural Greek",
      description: "Multicultural and culturally-based Greek organizations",
      link: "/symbol-guide?tab=organizations"
    }
  ];

  const resources = [
    {
      icon: BookOpen,
      title: "Symbol & Ritual Guide",
      description: "Biblical analysis of common Greek symbols and rituals",
      link: "/symbol-guide"
    },
    {
      icon: Shield,
      title: "Anti-Hazing Resources",
      description: "Biblical guidance and practical resources against hazing",
      link: "/anti-hazing"
    },
    {
      icon: Compass,
      title: "Organization Guide",
      description: "Christian perspectives on specific Greek organizations",
      link: "/symbol-guide?tab=organizations"
    },
    {
      icon: Heart,
      title: "Myth Buster",
      description: "Addressing common misconceptions about Greeks and faith",
      link: "/myth-buster"
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
          <h1 className="text-lg font-semibold text-foreground">Greek Life</h1>
          <div className="w-16" />
        </div>
      </header>

      <main className="container mx-auto px-4 py-10 max-w-4xl space-y-8">
        {/* Hero */}
        <div className="text-center space-y-4">
          <Badge className="bg-sacred/10 text-sacred border-sacred/20">
            Understanding Greek Organizations
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Greek Life Through a Biblical Lens
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore resources, guidance, and biblical perspectives for Christians in Greek Letter Organizations.
          </p>
        </div>

        {/* Divine Nine Focus */}
        <Card className="border-sacred/30 bg-gradient-to-br from-sacred/5 to-background">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-sacred/10">
                <Award className="w-6 h-6 text-sacred" />
              </div>
              <div>
                <CardTitle>{councils[0].name}</CardTitle>
                <CardDescription>{councils[0].description}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-3 gap-2">
              {councils[0].organizations?.map((org, index) => (
                <div key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-sacred" />
                  {org}
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <Button asChild variant="outline" size="sm">
                <Link to="/symbol-guide?tab=organizations">
                  View Organization Details
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Other Councils */}
        <div className="grid md:grid-cols-3 gap-4">
          {councils.slice(1).map((council, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{council.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{council.description}</p>
                <Button asChild variant="ghost" size="sm" className="p-0 h-auto text-sacred">
                  <Link to={council.link || "/symbol-guide"}>
                    Learn More <ArrowRight className="w-3 h-3 ml-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Resources */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-center">Greek Life Resources</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {resources.map((resource, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-sacred/10 flex-shrink-0">
                      <resource.icon className="w-5 h-5 text-sacred" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-medium">{resource.title}</h4>
                      <p className="text-sm text-muted-foreground">{resource.description}</p>
                      <Button asChild variant="ghost" size="sm" className="p-0 h-auto text-sacred">
                        <Link to={resource.link}>
                          Explore <ArrowRight className="w-3 h-3 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sacred Greeks Mission */}
        <Card className="bg-gradient-to-br from-sacred/10 to-sacred/5 border-sacred/20">
          <CardContent className="p-8 text-center space-y-4">
            <Users className="w-12 h-12 text-sacred mx-auto" />
            <h3 className="text-2xl font-bold">The Sacred Greeks Mission</h3>
            <p className="text-muted-foreground max-w-lg mx-auto">
              We're not about changing Greek organizations—we're about transforming hearts and intentions. Living sacred lives within your letters, shining God's light from the inside out.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <Button asChild className="bg-sacred hover:bg-sacred/90">
                <Link to="/sacred-greeks">Take the Assessment</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/meet-dr-lyman">Meet Dr. Lyman</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

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

export default GreekLife;
