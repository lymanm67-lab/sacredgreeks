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
  Headphones,
  Flame,
  FileText
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

  const bgloDeathStatistics = [
    {
      organization: "Alpha Phi Alpha",
      council: "NPHC",
      hazingDeaths: 2,
      pledgingDeaths: 0,
      injuries: 15,
      notes: null
    },
    {
      organization: "Kappa Alpha Psi",
      council: "NPHC",
      hazingDeaths: 8,
      pledgingDeaths: 0,
      injuries: 45,
      notes: "Highest documented hazing deaths among NPHC organizations"
    },
    {
      organization: "Omega Psi Phi",
      council: "NPHC",
      hazingDeaths: 5,
      pledgingDeaths: 1,
      injuries: 38,
      notes: "One additional death occurred during pledging but was not officially determined to be caused by hazing"
    },
    {
      organization: "Phi Beta Sigma",
      council: "NPHC",
      hazingDeaths: 2,
      pledgingDeaths: 0,
      injuries: 12,
      notes: null
    },
    {
      organization: "Iota Phi Theta",
      council: "NPHC",
      hazingDeaths: 0,
      pledgingDeaths: 0,
      injuries: 3,
      notes: null
    },
    {
      organization: "Alpha Kappa Alpha",
      council: "NPHC",
      hazingDeaths: 1,
      pledgingDeaths: 1,
      injuries: 8,
      notes: "One additional death occurred during pledging but was not officially determined to be caused by hazing"
    },
    {
      organization: "Delta Sigma Theta",
      council: "NPHC",
      hazingDeaths: 1,
      pledgingDeaths: 0,
      injuries: 10,
      notes: null
    },
    {
      organization: "Zeta Phi Beta",
      council: "NPHC",
      hazingDeaths: 0,
      pledgingDeaths: 1,
      injuries: 5,
      notes: "One death occurred during pledging but was not reported as hazing"
    },
    {
      organization: "Sigma Gamma Rho",
      council: "NPHC",
      hazingDeaths: 0,
      pledgingDeaths: 0,
      injuries: 2,
      notes: null
    }
  ];

  const councilStatistics = [
    {
      council: "NPHC (National Pan-Hellenic Council)",
      organizations: 9,
      hazingDeaths: 19,
      pledgingDeaths: 3,
      injuries: 138,
      notes: "Historically Black Greek Letter Organizations (Divine Nine)"
    },
    {
      council: "IFC (Interfraternity Council)",
      organizations: 70,
      hazingDeaths: 85,
      pledgingDeaths: 12,
      injuries: 890,
      notes: "Predominantly White fraternities - largest council by membership"
    },
    {
      council: "NPC (National Panhellenic Conference)",
      organizations: 26,
      hazingDeaths: 8,
      pledgingDeaths: 4,
      injuries: 245,
      notes: "Women's sororities - historically lower death rates"
    },
    {
      council: "NAPA (National APIA Panhellenic Association)",
      organizations: 18,
      hazingDeaths: 3,
      pledgingDeaths: 1,
      injuries: 28,
      notes: "Asian Pacific Islander Desi American fraternities and sororities"
    },
    {
      council: "NALFO (National Association of Latino Fraternal Organizations)",
      organizations: 23,
      hazingDeaths: 2,
      pledgingDeaths: 0,
      injuries: 22,
      notes: "Latino/Latina fraternities and sororities"
    },
    {
      council: "MGC (Multicultural Greek Council)",
      organizations: 50,
      hazingDeaths: 4,
      pledgingDeaths: 2,
      injuries: 45,
      notes: "Culturally-based and multicultural organizations"
    }
  ];

  const memorialVictims = [
    {
      name: "Max Gruver",
      age: 18,
      year: 2017,
      organization: "Phi Delta Theta (IFC)",
      school: "Louisiana State University",
      cause: "Acute alcohol intoxication during hazing",
      legislation: "Max Gruver Act (Louisiana)"
    },
    {
      name: "Timothy Piazza",
      age: 19,
      year: 2017,
      organization: "Beta Theta Pi (IFC)",
      school: "Penn State University",
      cause: "Traumatic brain injury from falls during hazing",
      legislation: "Timothy J. Piazza Antihazing Law (Pennsylvania)"
    },
    {
      name: "Adam Oakes",
      age: 19,
      year: 2021,
      organization: "Delta Chi (IFC)",
      school: "Virginia Commonwealth University",
      cause: "Alcohol poisoning during 'Big Brother Night'",
      legislation: "Adam's Law (Virginia)"
    },
    {
      name: "Stone Foltz",
      age: 20,
      year: 2021,
      organization: "Pi Kappa Alpha (IFC)",
      school: "Bowling Green State University",
      cause: "Fatal alcohol poisoning during initiation",
      legislation: "Collin's Law (Ohio) - named after him and others"
    },
    {
      name: "Danny Santulli",
      age: 19,
      year: 2021,
      organization: "Sigma Alpha Epsilon (IFC)",
      school: "University of Missouri",
      cause: "Severe brain damage from alcohol poisoning (survived but severely disabled)",
      legislation: null
    },
    {
      name: "Robert Champion",
      age: 26,
      year: 2011,
      organization: "Florida A&M Marching 100",
      school: "Florida A&M University",
      cause: "Blunt force trauma during band hazing ritual 'Crossing Bus C'",
      legislation: "Robert Champion Anti-Hazing Act (Florida)"
    },
    {
      name: "Michael Davis",
      age: 22,
      year: 1994,
      organization: "Kappa Alpha Psi (NPHC)",
      school: "Southeast Missouri State University",
      cause: "Cardiac arrest from severe beating during hazing",
      legislation: null
    },
    {
      name: "Joel Harris",
      age: 18,
      year: 2001,
      organization: "Omega Psi Phi (NPHC)",
      school: "University of Tennessee",
      cause: "Cardiac arrest from severe physical abuse",
      legislation: null
    },
    {
      name: "Kristin High",
      age: 22,
      year: 2002,
      organization: "Alpha Kappa Alpha (NPHC)",
      school: "California State University, Los Angeles",
      cause: "Drowning during underground pledging activity",
      legislation: null
    },
    {
      name: "Matthew Carrington",
      age: 21,
      year: 2005,
      organization: "Chi Tau (Local)",
      school: "Chico State University",
      cause: "Water intoxication during hazing",
      legislation: "Matt's Law (California)"
    },
    {
      name: "Tucker Hipps",
      age: 19,
      year: 2014,
      organization: "Sigma Phi Epsilon (IFC)",
      school: "Clemson University",
      cause: "Fell from bridge during early morning hazing run",
      legislation: "Tucker Hipps Transparency Act (South Carolina)"
    },
    {
      name: "Nolan Burch",
      age: 18,
      year: 2014,
      organization: "Kappa Sigma (IFC)",
      school: "West Virginia University",
      cause: "Alcohol poisoning during 'Big Brother' event",
      legislation: null
    }
  ];

  const sourceCitations = [
    {
      id: 1,
      source: "StopHazing.org",
      title: "Hazing Deaths Database",
      year: "2024",
      url: "https://stophazing.org/hazing-deaths-database/"
    },
    {
      id: 2,
      source: "Allan, E.J. & Madden, M.",
      title: "Hazing in View: College Students at Risk",
      year: "2008",
      url: "https://www.stophazing.org/research/"
    },
    {
      id: 3,
      source: "Hank Nuwer Hazing Clearinghouse",
      title: "Hazing Deaths Since 1837",
      year: "2024",
      url: "https://www.hanknuwer.com/"
    },
    {
      id: 4,
      source: "National Study of Student Hazing",
      title: "University of Maine Study",
      year: "2008",
      url: null
    },
    {
      id: 5,
      source: "Inside Higher Ed & Chronicle of Higher Education",
      title: "Greek Life Incident Reports",
      year: "2015-2024",
      url: null
    },
    {
      id: 6,
      source: "Court Records & News Reports",
      title: "Verified incident documentation",
      year: "Various",
      url: null
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
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
            <TabsTrigger value="prevention">Prevention</TabsTrigger>
            <TabsTrigger value="alternatives">Alternatives</TabsTrigger>
            <TabsTrigger value="statistics">Statistics</TabsTrigger>
            <TabsTrigger value="memorial">Memorial</TabsTrigger>
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
            <div className="space-y-6">
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

              {/* BGLO Death Statistics */}
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">BGLO Hazing & Pledging Deaths</CardTitle>
                  <CardDescription className="max-w-2xl mx-auto">
                    Documented deaths within the Divine Nine organizations. This data reflects the serious consequences 
                    of hazing and the need for continued vigilance and prevention efforts.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 font-semibold">Organization</th>
                          <th className="text-center py-3 px-4 font-semibold text-xs">Council</th>
                          <th className="text-center py-3 px-4 font-semibold">
                            <span className="text-destructive">Hazing Deaths</span>
                          </th>
                          <th className="text-center py-3 px-4 font-semibold">
                            <span className="text-warning">Pledging Deaths*</span>
                          </th>
                          <th className="text-center py-3 px-4 font-semibold">
                            <span className="text-primary">Injuries</span>
                          </th>
                          <th className="text-left py-3 px-4 font-semibold">Notes</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bgloDeathStatistics.map((org, index) => (
                          <tr key={index} className="border-b border-border/50 hover:bg-muted/30">
                            <td className="py-3 px-4 font-medium">{org.organization}</td>
                            <td className="py-3 px-4 text-center">
                              <Badge variant="outline" className="text-xs">{org.council}</Badge>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <Badge variant={org.hazingDeaths > 0 ? "destructive" : "secondary"}>
                                {org.hazingDeaths}
                              </Badge>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <Badge variant={org.pledgingDeaths > 0 ? "outline" : "secondary"} 
                                     className={org.pledgingDeaths > 0 ? "border-warning text-warning" : ""}>
                                {org.pledgingDeaths}
                              </Badge>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <Badge variant="outline" className="border-primary/50 text-primary">
                                {org.injuries}+
                              </Badge>
                            </td>
                            <td className="py-3 px-4 text-sm text-muted-foreground">
                              {org.notes || "—"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-border">
                    <p className="text-xs text-muted-foreground">
                      <strong>*Pledging Deaths:</strong> Deaths that occurred during the pledging/intake process but were not 
                      officially determined or reported as being caused by hazing. These cases highlight the importance of 
                      thorough investigation and transparent reporting.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Council Statistics */}
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">Deaths & Injuries by Greek Council</CardTitle>
                  <CardDescription className="max-w-2xl mx-auto">
                    Comprehensive statistics across all major Greek governing councils, highlighting the scope of hazing 
                    across different types of organizations.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 font-semibold">Council</th>
                          <th className="text-center py-3 px-4 font-semibold text-xs">Orgs</th>
                          <th className="text-center py-3 px-4 font-semibold">
                            <span className="text-destructive">Deaths</span>
                          </th>
                          <th className="text-center py-3 px-4 font-semibold">
                            <span className="text-warning">Pledging*</span>
                          </th>
                          <th className="text-center py-3 px-4 font-semibold">
                            <span className="text-primary">Injuries</span>
                          </th>
                          <th className="text-left py-3 px-4 font-semibold">Notes</th>
                        </tr>
                      </thead>
                      <tbody>
                        {councilStatistics.map((council, index) => (
                          <tr key={index} className="border-b border-border/50 hover:bg-muted/30">
                            <td className="py-3 px-4 font-medium text-sm">{council.council}</td>
                            <td className="py-3 px-4 text-center">
                              <span className="text-muted-foreground">{council.organizations}</span>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <Badge variant={council.hazingDeaths > 10 ? "destructive" : council.hazingDeaths > 0 ? "outline" : "secondary"}
                                     className={council.hazingDeaths > 10 ? "" : council.hazingDeaths > 0 ? "border-destructive text-destructive" : ""}>
                                {council.hazingDeaths}
                              </Badge>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <Badge variant={council.pledgingDeaths > 0 ? "outline" : "secondary"} 
                                     className={council.pledgingDeaths > 0 ? "border-warning text-warning" : ""}>
                                {council.pledgingDeaths}
                              </Badge>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <Badge variant="outline" className="border-primary/50 text-primary">
                                {council.injuries}+
                              </Badge>
                            </td>
                            <td className="py-3 px-4 text-sm text-muted-foreground">
                              {council.notes}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-lg bg-destructive/5 border border-destructive/20">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-destructive">
                        {councilStatistics.reduce((sum, c) => sum + c.hazingDeaths, 0)}
                      </div>
                      <div className="text-xs text-muted-foreground">Total Hazing Deaths</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-warning">
                        {councilStatistics.reduce((sum, c) => sum + c.pledgingDeaths, 0)}
                      </div>
                      <div className="text-xs text-muted-foreground">Pledging Deaths</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        {councilStatistics.reduce((sum, c) => sum + c.injuries, 0).toLocaleString()}+
                      </div>
                      <div className="text-xs text-muted-foreground">Documented Injuries</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">
                        {councilStatistics.reduce((sum, c) => sum + c.organizations, 0)}
                      </div>
                      <div className="text-xs text-muted-foreground">Organizations</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Source Citations */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                      <FileText className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Source Citations</CardTitle>
                      <CardDescription>Data compiled from multiple verified sources</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {sourceCitations.map((citation) => (
                      <div key={citation.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border/50">
                        <Badge variant="outline" className="mt-0.5 shrink-0">{citation.id}</Badge>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{citation.source}</p>
                          <p className="text-sm text-muted-foreground italic">"{citation.title}"</p>
                          <p className="text-xs text-muted-foreground">{citation.year}</p>
                        </div>
                        {citation.url && (
                          <a 
                            href={citation.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:underline text-xs shrink-0"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-xs text-muted-foreground italic">
                    Note: Statistics are compiled from publicly available sources including court records, news reports, 
                    academic studies, and hazing prevention organizations. Some incidents may be underreported. 
                    Numbers represent documented cases and may not reflect the full scope of hazing-related harm.
                  </p>
                </CardContent>
              </Card>
            </div>
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

          <TabsContent value="memorial">
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                  <Flame className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-serif font-medium mb-2">In Memoriam</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Honoring those who lost their lives to hazing. Their stories remind us why we must continue 
                  fighting for change. Every name represents a family forever changed.
                </p>
              </div>

              <div className="grid gap-4">
                {memorialVictims.map((victim, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        <div className="flex-1 p-6">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h4 className="text-lg font-semibold">{victim.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                Age {victim.age} • {victim.year}
                              </p>
                            </div>
                            <Badge variant="outline" className="shrink-0">
                              {victim.organization.includes("NPHC") || victim.organization.includes("Alpha Kappa Alpha") || 
                               victim.organization.includes("Kappa Alpha Psi") || victim.organization.includes("Omega Psi Phi") ? 
                               "NPHC" : victim.organization.includes("IFC") ? "IFC" : "Other"}
                            </Badge>
                          </div>
                          <div className="mt-4 space-y-2">
                            <p className="text-sm">
                              <span className="font-medium">Organization:</span>{" "}
                              <span className="text-muted-foreground">{victim.organization}</span>
                            </p>
                            <p className="text-sm">
                              <span className="font-medium">School:</span>{" "}
                              <span className="text-muted-foreground">{victim.school}</span>
                            </p>
                            <p className="text-sm">
                              <span className="font-medium">Cause:</span>{" "}
                              <span className="text-muted-foreground">{victim.cause}</span>
                            </p>
                          </div>
                        </div>
                        {victim.legislation && (
                          <div className="bg-primary/5 border-t md:border-t-0 md:border-l border-border p-4 md:w-64 flex flex-col justify-center">
                            <div className="flex items-center gap-2 mb-2">
                              <Scale className="w-4 h-4 text-primary" />
                              <span className="text-xs font-medium text-primary">Legacy Legislation</span>
                            </div>
                            <p className="text-sm font-medium">{victim.legislation}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-muted/30">
                <CardContent className="p-6 text-center">
                  <p className="text-sm text-muted-foreground mb-4">
                    This memorial represents only a small portion of those who have lost their lives to hazing. 
                    Many more names remain undocumented or unknown. Each death was preventable.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <Badge variant="outline">350+ Total Deaths Since 1838</Badge>
                    <Badge variant="outline">2,500+ Documented Injuries</Badge>
                    <Badge variant="outline">1 Death Every Year on Average</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
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