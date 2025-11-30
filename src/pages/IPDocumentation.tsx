import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Home, 
  Copyright, 
  Shield, 
  FileText, 
  Lock,
  Lightbulb,
  Code,
  BookOpen,
  Sparkles,
  Brain,
  Users,
  Award
} from "lucide-react";

const trademarks = [
  {
    name: "Sacred Greeks™",
    status: "Pending Registration",
    class: "Class 41 - Education and Entertainment",
    filingDate: "2024",
    description: "Primary brand mark for educational services related to faith and Greek life"
  },
  {
    name: "Sacred Greeks Life™",
    status: "Pending Registration",
    class: "Class 9 - Software Applications",
    filingDate: "2024",
    description: "Mobile and web application for spiritual guidance"
  },
  {
    name: "P.R.O.O.F. Framework™",
    status: "Pending Registration",
    class: "Class 41 - Educational Services",
    filingDate: "2024",
    description: "Purpose, Rituals, Obligations, Outcomes, Fellowship - Decision-making framework"
  },
  {
    name: "Sacred, Not Sinful™",
    status: "Pending Registration",
    class: "Class 16 - Printed Publications",
    filingDate: "2024",
    description: "Book title and educational program name"
  },
  {
    name: "5 Persona Types Architecture™",
    status: "Pending Registration",
    class: "Class 41 - Educational Assessment",
    filingDate: "2024",
    description: "Personality assessment methodology and framework"
  },
  {
    name: "Shattered Masks™",
    status: "Pending Registration",
    class: "Class 41 - Assessment Services",
    filingDate: "2024",
    description: "Archetype discovery assessment tool"
  }
];

const patents = [
  {
    title: "Faith-Based Decision Framework Assessment System",
    status: "Patent Pending",
    type: "Utility Patent",
    description: "A computer-implemented method for assessing and providing personalized guidance for individuals navigating faith and organizational membership decisions."
  },
  {
    title: "Multi-Factor Spiritual Alignment Scoring Algorithm",
    status: "Patent Pending",
    type: "Utility Patent",
    description: "Algorithm for calculating spiritual alignment scores based on the P.R.O.O.F. Framework™ criteria."
  },
  {
    title: "Archetype Determination System for Personal Development",
    status: "Patent Pending",
    type: "Utility Patent",
    description: "System and method for determining user archetypes based on behavioral and value-based assessments."
  }
];

const copyrights = [
  {
    title: "Sacred, Not Sinful: Biblical Framework for Greek Life",
    type: "Literary Work",
    year: "2024",
    author: "Dr. Lyman Montgomery"
  },
  {
    title: "Sacred Greeks Life Application Source Code",
    type: "Computer Program",
    year: "2024",
    author: "Sacred Greeks"
  },
  {
    title: "P.R.O.O.F. Framework Educational Materials",
    type: "Educational Content",
    year: "2024",
    author: "Dr. Lyman Montgomery"
  },
  {
    title: "Daily Devotional Content Library",
    type: "Literary Works Collection",
    year: "2024-Present",
    author: "Sacred Greeks"
  },
  {
    title: "5-Session Study Guide Content",
    type: "Educational Materials",
    year: "2024",
    author: "Dr. Lyman Montgomery"
  }
];

const tradeSecrets = [
  {
    name: "Assessment Scoring Algorithms",
    icon: Brain,
    description: "Proprietary algorithms that calculate scores across multiple dimensions of the P.R.O.O.F. Framework™"
  },
  {
    name: "Personalization Engine",
    icon: Sparkles,
    description: "AI-powered system for generating organization-specific content and recommendations"
  },
  {
    name: "User Journey Optimization",
    icon: Users,
    description: "Behavioral analytics and machine learning models for optimizing spiritual growth paths"
  },
  {
    name: "Content Generation Templates",
    icon: FileText,
    description: "Proprietary templates and prompts for AI-assisted devotional and guidance content"
  }
];

const IPDocumentation = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-foreground hover:text-sacred transition-colors">
              <Home className="w-5 h-5" />
              <span className="font-semibold">Sacred Greeks Life™</span>
            </Link>
            <Link to="/legal">
              <Button variant="ghost" size="sm">
                Legal Center
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-sacred/20 to-purple-500/20">
              <Copyright className="w-8 h-8 text-sacred" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Intellectual Property Documentation</h1>
              <p className="text-muted-foreground">Comprehensive overview of Sacred Greeks™ intellectual property portfolio</p>
            </div>
          </div>
          <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200">
            Confidential - Proprietary Information
          </Badge>
        </div>

        <Tabs defaultValue="trademarks" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="trademarks" className="text-xs sm:text-sm">Trademarks</TabsTrigger>
            <TabsTrigger value="patents" className="text-xs sm:text-sm">Patents</TabsTrigger>
            <TabsTrigger value="copyrights" className="text-xs sm:text-sm">Copyrights</TabsTrigger>
            <TabsTrigger value="trade-secrets" className="text-xs sm:text-sm">Trade Secrets</TabsTrigger>
          </TabsList>

          {/* Trademarks Tab */}
          <TabsContent value="trademarks" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge variant="outline" className="text-sacred border-sacred/30">™</Badge>
                  Trademark Portfolio
                </CardTitle>
                <CardDescription>
                  Registered and pending trademark applications for Sacred Greeks™ brand assets
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trademarks.map((tm, index) => (
                    <div key={index} className="p-4 rounded-lg border border-border bg-muted/30">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                        <h3 className="font-bold text-lg">{tm.name}</h3>
                        <Badge variant="secondary">{tm.status}</Badge>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-2 text-sm mb-2">
                        <div><span className="text-muted-foreground">Class:</span> {tm.class}</div>
                        <div><span className="text-muted-foreground">Filing Year:</span> {tm.filingDate}</div>
                      </div>
                      <p className="text-muted-foreground text-sm">{tm.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Patents Tab */}
          <TabsContent value="patents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-amber-500" />
                  Patent Applications
                </CardTitle>
                <CardDescription>
                  Pending patent applications protecting Sacred Greeks™ technology
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {patents.map((patent, index) => (
                    <div key={index} className="p-4 rounded-lg border border-border bg-muted/30">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                        <h3 className="font-bold">{patent.title}</h3>
                        <div className="flex gap-2">
                          <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200">
                            {patent.status}
                          </Badge>
                          <Badge variant="outline">{patent.type}</Badge>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm">{patent.description}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
                  <p className="text-sm text-amber-800 dark:text-amber-200">
                    <strong>Notice:</strong> These patent applications are pending. Unauthorized use, reproduction, 
                    or implementation of the described technologies may result in legal action upon patent grant.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Copyrights Tab */}
          <TabsContent value="copyrights" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Copyright Registrations
                </CardTitle>
                <CardDescription>
                  Protected creative works and content owned by Sacred Greeks™
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {copyrights.map((copyright, index) => (
                    <div key={index} className="p-4 rounded-lg border border-border bg-muted/30">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                        <h3 className="font-bold">{copyright.title}</h3>
                        <Badge variant="secondary">{copyright.type}</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <span>© {copyright.year} {copyright.author}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-border">
                  <p className="text-sm text-muted-foreground">
                    All content is automatically protected by copyright upon creation. Registration with the 
                    U.S. Copyright Office provides additional legal protections and remedies.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Trade Secrets Tab */}
          <TabsContent value="trade-secrets" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-red-500" />
                  Trade Secrets
                </CardTitle>
                <CardDescription>
                  Confidential proprietary information and technology
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  {tradeSecrets.map((secret, index) => (
                    <div key={index} className="p-4 rounded-lg border border-red-200 dark:border-red-900 bg-red-50/50 dark:bg-red-950/20">
                      <div className="flex items-center gap-2 mb-2">
                        <secret.icon className="w-5 h-5 text-red-500" />
                        <h3 className="font-bold">{secret.name}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">{secret.description}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800">
                  <p className="text-sm text-red-800 dark:text-red-200">
                    <strong>Confidential:</strong> The information described in this section constitutes trade secrets 
                    protected under the Defend Trade Secrets Act (DTSA) and applicable state laws. Unauthorized disclosure, 
                    use, or misappropriation is strictly prohibited and may result in civil and criminal liability.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Summary Card */}
        <Card className="mt-8 bg-gradient-to-br from-sacred/5 to-purple-500/5 border-sacred/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-sacred" />
              IP Portfolio Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-4 rounded-lg bg-background border border-border">
                <p className="text-3xl font-bold text-sacred">{trademarks.length}</p>
                <p className="text-sm text-muted-foreground">Trademarks</p>
              </div>
              <div className="p-4 rounded-lg bg-background border border-border">
                <p className="text-3xl font-bold text-amber-500">{patents.length}</p>
                <p className="text-sm text-muted-foreground">Patents Pending</p>
              </div>
              <div className="p-4 rounded-lg bg-background border border-border">
                <p className="text-3xl font-bold text-purple-500">{copyrights.length}</p>
                <p className="text-sm text-muted-foreground">Copyrights</p>
              </div>
              <div className="p-4 rounded-lg bg-background border border-border">
                <p className="text-3xl font-bold text-red-500">{tradeSecrets.length}</p>
                <p className="text-sm text-muted-foreground">Trade Secrets</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 flex justify-center gap-4">
          <Link to="/legal">
            <Button variant="outline" className="gap-2">
              Legal Center
            </Button>
          </Link>
          <Link to="/">
            <Button variant="outline" className="gap-2">
              <Home className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Footer Notice */}
        <div className="text-center pt-6 border-t border-border mt-8">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Sacred Greeks™. All Rights Reserved.
          </p>
          <p className="text-xs text-muted-foreground/70 mt-2">
            This document contains confidential and proprietary information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default IPDocumentation;