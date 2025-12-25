import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Shield, 
  Phone, 
  AlertTriangle, 
  Activity, 
  TrendingUp, 
  Calendar,
  BookOpen,
  Scale,
  Users,
  Hand,
  Heart,
  LifeBuoy,
  ExternalLink,
  GraduationCap,
  Building,
  Headphones
} from "lucide-react";

const AntiHazing = () => {
  const stats = [
    {
      icon: AlertTriangle,
      value: "350+",
      label: "Documented Deaths",
      sublabel: "Since 1838 (Greek founding)",
      color: "text-destructive"
    },
    {
      icon: Activity,
      value: "2590+",
      label: "Documented Injuries",
      sublabel: "Reported cases only",
      color: "text-warning"
    },
    {
      icon: TrendingUp,
      value: "55%",
      label: "Students Experience Hazing",
      sublabel: "Allan & Madden Study",
      color: "text-primary"
    },
    {
      icon: Calendar,
      value: "186",
      label: "Years of Greek Life",
      sublabel: "First fraternity: 1838",
      color: "text-muted-foreground"
    }
  ];

  const preventionStrategies = [
    {
      icon: BookOpen,
      title: "Education & Awareness",
      description: "Implement comprehensive hazing prevention education programs",
      items: [
        "Mandatory anti-hazing training for all members",
        "New member education on their rights",
        "Bystander intervention training",
        "Annual refresher courses for active members",
        "Parent and family education programs"
      ]
    },
    {
      icon: Scale,
      title: "Clear Policies & Accountability",
      description: "Establish and enforce zero-tolerance hazing policies",
      items: [
        "Written anti-hazing policies in bylaws",
        "Clear reporting procedures",
        "Anonymous reporting hotlines",
        "Swift and consistent enforcement",
        "Regular policy reviews and updates"
      ]
    },
    {
      icon: Users,
      title: "Leadership Development",
      description: "Train leaders to create positive organizational cultures",
      items: [
        "Leadership ethics training",
        "Mentorship programs for officers",
        "Conflict resolution skills",
        "Positive culture building workshops",
        "Alumni mentor partnerships"
      ]
    },
    {
      icon: Hand,
      title: "Bystander Intervention",
      description: "Empower members to speak up and intervene",
      items: [
        "Green Dot or Step UP! training",
        "Practice intervention scenarios",
        "Create support networks for reporters",
        "Celebrate those who speak up",
        "Remove fear of retaliation"
      ]
    },
    {
      icon: Heart,
      title: "Positive Alternatives",
      description: "Replace hazing traditions with meaningful experiences",
      items: [
        "Community service projects",
        "Academic support programs",
        "Team-building retreats",
        "Professional development events",
        "Cultural appreciation activities"
      ]
    },
    {
      icon: LifeBuoy,
      title: "Support Systems",
      description: "Create resources for those affected by hazing",
      items: [
        "Counseling services access",
        "Peer support groups",
        "Confidential reporting options",
        "Recovery and healing programs",
        "Family support resources"
      ]
    }
  ];

  const alternativeActivities = [
    {
      category: "Team Building",
      activities: [
        "Escape room challenges",
        "Ropes courses and outdoor adventures",
        "Cooking competitions",
        "Volunteer projects together",
        "Sports tournaments"
      ]
    },
    {
      category: "Academic Excellence",
      activities: [
        "Study groups and tutoring",
        "Research presentations",
        "Guest speaker events",
        "Academic competitions",
        "Library nights"
      ]
    },
    {
      category: "Community Service",
      activities: [
        "Habitat for Humanity builds",
        "Food bank volunteering",
        "Mentoring programs",
        "Environmental cleanups",
        "Hospital visits"
      ]
    },
    {
      category: "Professional Development",
      activities: [
        "Resume workshops",
        "Mock interviews",
        "Networking events",
        "Industry panels",
        "Alumni mentorship"
      ]
    }
  ];

  const resources = [
    {
      icon: ExternalLink,
      title: "StopHazing.org",
      description: "Research, education, and advocacy to prevent hazing",
      link: "https://stophazing.org/"
    },
    {
      icon: ExternalLink,
      title: "HazingPrevention.org",
      description: "Resources for building hazing-free communities",
      link: "https://hazingprevention.org/"
    },
    {
      icon: Headphones,
      title: "National Hazing Hotline",
      description: "24/7 confidential support and reporting",
      link: "tel:1-888-668-4293"
    },
    {
      icon: Building,
      title: "Campus Security",
      description: "Your university's security department for immediate concerns",
      link: null
    },
    {
      icon: GraduationCap,
      title: "Dean of Students Office",
      description: "Institutional support for hazing prevention and reporting",
      link: null
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-14">
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-destructive/10 flex items-center justify-center">
            <Shield className="w-10 h-10 text-destructive" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-medium text-foreground mb-4">
            Anti-Hazing Resources
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Building a safer Greek life through education, prevention, and meaningful alternatives. 
            Every member deserves dignity and respect.
          </p>
        </div>

        {/* Emergency Alert */}
        <Card className="mb-12 border-destructive/30 bg-destructive/5">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-destructive" />
                <div>
                  <h3 className="font-semibold text-destructive">If You're Being Hazed</h3>
                  <p className="text-sm text-muted-foreground">
                    You have the right to say no. Your safety matters. Get help now:
                  </p>
                </div>
              </div>
              <a href="tel:1-888-668-4293">
                <Button variant="destructive" className="gap-2">
                  <Phone className="w-4 h-4" />
                  1-888-NOT-HAZE
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                <div className={`text-3xl font-bold mb-1 ${stat.color}`}>{stat.value}</div>
                <div className="text-sm font-medium text-foreground">{stat.label}</div>
                <div className="text-xs text-muted-foreground">{stat.sublabel}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs Content */}
        <Tabs defaultValue="prevention" className="mb-12">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
            <TabsTrigger value="prevention">Prevention Strategies</TabsTrigger>
            <TabsTrigger value="alternatives">Alternative Activities</TabsTrigger>
            <TabsTrigger value="statistics">Hazing Statistics</TabsTrigger>
            <TabsTrigger value="laws">State Laws</TabsTrigger>
          </TabsList>

          <TabsContent value="prevention">
            <div className="grid md:grid-cols-2 gap-6">
              {preventionStrategies.map((strategy, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <strategy.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{strategy.title}</CardTitle>
                        <CardDescription>{strategy.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {strategy.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="alternatives">
            <div className="grid md:grid-cols-2 gap-6">
              {alternativeActivities.map((category, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{category.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {category.activities.map((activity, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="statistics">
            <Card>
              <CardContent className="p-8">
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-4">Hazing by the Numbers</h3>
                  <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Research shows that hazing is far more prevalent than many realize. 
                    Understanding the scope of the problem is the first step toward prevention.
                  </p>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-4 rounded-lg bg-muted">
                      <div className="text-3xl font-bold text-primary mb-2">73%</div>
                      <div className="text-sm text-muted-foreground">
                        of students involved in social organizations experienced hazing
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted">
                      <div className="text-3xl font-bold text-primary mb-2">9 in 10</div>
                      <div className="text-sm text-muted-foreground">
                        students who experienced hazing did not report it
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted">
                      <div className="text-3xl font-bold text-primary mb-2">47%</div>
                      <div className="text-sm text-muted-foreground">
                        of students came to college having already experienced hazing
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="laws">
            <Card>
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-xl font-semibold mb-4">Anti-Hazing Legislation</h3>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    44 states plus the District of Columbia have enacted anti-hazing laws. 
                    Penalties range from misdemeanors to felonies depending on the severity and outcome.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 rounded-lg border border-border">
                    <h4 className="font-semibold mb-2 text-destructive">Felony Hazing States</h4>
                    <p className="text-sm text-muted-foreground">
                      States where hazing resulting in serious injury or death can be charged as a felony: 
                      Texas, Florida, Louisiana, Indiana, Illinois, and others.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg border border-border">
                    <h4 className="font-semibold mb-2 text-warning">Recent Legislation</h4>
                    <p className="text-sm text-muted-foreground">
                      Many states have strengthened their laws in recent years, adding requirements 
                      for reporting and increasing penalties.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Resources Section */}
        <section>
          <h2 className="text-2xl font-serif font-medium text-center mb-8">
            Hazing Prevention Resources
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {resources.map((resource, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <resource.icon className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">{resource.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>
                  {resource.link && (
                    <a 
                      href={resource.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      {resource.link.startsWith('tel:') ? 'Call Now →' : 'Visit Website →'}
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AntiHazing;