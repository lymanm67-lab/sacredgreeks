import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Home, 
  BookOpen, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  FileText,
  Download,
  Scale
} from "lucide-react";

const TrademarkUsageGuide = () => {
  const trademarks = [
    { name: "Sacred Greeks™", type: "Word Mark" },
    { name: "Sacred Greeks Life™", type: "Word Mark" },
    { name: "P.R.O.O.F. Framework™", type: "Word Mark" },
    { name: "Sacred, Not Sinful™", type: "Word Mark" },
    { name: "5 Persona Types Architecture™", type: "Word Mark" },
    { name: "Shattered Masks™", type: "Word Mark" }
  ];

  const correctUsageExamples = [
    "Sacred Greeks™ provides faith-based resources for Greek-letter organizations.",
    "The P.R.O.O.F. Framework™ is a proprietary assessment methodology.",
    "Download the Sacred Greeks Life™ app today.",
    "Our Sacred, Not Sinful™ program helps reconcile faith and Greek life."
  ];

  const incorrectUsageExamples = [
    { wrong: "sacred greeks", correct: "Sacred Greeks™" },
    { wrong: "SacredGreeks", correct: "Sacred Greeks™" },
    { wrong: "SACRED GREEKS", correct: "Sacred Greeks™" },
    { wrong: "The Sacred Greek App", correct: "The Sacred Greeks™ App" }
  ];

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
            <div className="flex gap-2">
              <Link to="/ip-documentation">
                <Button variant="ghost" size="sm">IP Docs</Button>
              </Link>
              <Link to="/legal">
                <Button variant="ghost" size="sm">Legal Center</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-sacred/20 to-purple-500/20">
              <BookOpen className="w-8 h-8 text-sacred" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Trademark Usage Guide</h1>
              <p className="text-muted-foreground">Guidelines for proper use of Sacred Greeks™ trademarks</p>
            </div>
          </div>
        </div>

        {/* Important Notice */}
        <Card className="mb-8 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">Important Notice</h3>
                <p className="text-amber-700 dark:text-amber-300 text-sm">
                  All trademarks listed here are the exclusive property of Sacred Greeks™. Unauthorized use may result in legal action. 
                  For licensing inquiries, contact our legal team.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="trademarks" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="trademarks">Our Marks</TabsTrigger>
            <TabsTrigger value="usage">Proper Usage</TabsTrigger>
            <TabsTrigger value="donts">Don'ts</TabsTrigger>
            <TabsTrigger value="licensing">Licensing</TabsTrigger>
          </TabsList>

          <TabsContent value="trademarks">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="w-5 h-5" />
                  Registered Trademarks
                </CardTitle>
                <CardDescription>
                  Complete list of Sacred Greeks™ trademarks and service marks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {trademarks.map((tm, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/30">
                      <span className="font-medium">{tm.name}</span>
                      <Badge variant="secondary">{tm.type}</Badge>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 rounded-lg bg-muted/50">
                  <h4 className="font-medium mb-2">Symbol Usage</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Use ™ for pending trademark applications</li>
                    <li>• Use ® for registered trademarks (once registration is complete)</li>
                    <li>• Include the symbol at least once in prominent display</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="usage">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  Correct Usage Examples
                </CardTitle>
                <CardDescription>
                  Follow these examples for proper trademark usage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {correctUsageExamples.map((example, index) => (
                    <div key={index} className="flex gap-3 p-3 rounded-lg border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <p className="text-sm">{example}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 space-y-4">
                  <h4 className="font-medium">General Guidelines</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      Always capitalize the trademark as shown
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      Use trademarks as adjectives, not nouns or verbs
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      Include the trademark symbol (™) on first or prominent use
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      Distinguish the trademark from surrounding text (bold, italics, or different color)
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      Include a trademark attribution notice when possible
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="donts">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-destructive" />
                  Incorrect Usage to Avoid
                </CardTitle>
                <CardDescription>
                  These examples show what NOT to do with our trademarks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {incorrectUsageExamples.map((example, index) => (
                    <div key={index} className="p-4 rounded-lg border border-border">
                      <div className="flex items-center gap-3 mb-2">
                        <XCircle className="w-5 h-5 text-destructive" />
                        <span className="text-destructive line-through">{example.wrong}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        <span className="text-emerald-600 dark:text-emerald-400">{example.correct}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 space-y-4">
                  <h4 className="font-medium">Prohibited Actions</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-2">
                      <XCircle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                      Do not alter the spelling or spacing of trademarks
                    </li>
                    <li className="flex gap-2">
                      <XCircle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                      Do not use trademarks in a manner that suggests endorsement
                    </li>
                    <li className="flex gap-2">
                      <XCircle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                      Do not incorporate trademarks into your own product names
                    </li>
                    <li className="flex gap-2">
                      <XCircle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                      Do not use trademarks in domain names without permission
                    </li>
                    <li className="flex gap-2">
                      <XCircle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                      Do not translate trademarks into other languages
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="licensing">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Licensing Information
                </CardTitle>
                <CardDescription>
                  How to obtain permission to use Sacred Greeks™ trademarks
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 rounded-lg bg-muted/50">
                  <h4 className="font-medium mb-2">When License is Required</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Commercial use of any trademark</li>
                    <li>• Use in marketing materials or advertisements</li>
                    <li>• Use in products or merchandise</li>
                    <li>• Use in educational materials for distribution</li>
                    <li>• Use in digital applications or websites</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-muted/50">
                  <h4 className="font-medium mb-2">Fair Use Exceptions</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Nominative fair use for accurate reference</li>
                    <li>• Editorial or news commentary</li>
                    <li>• Academic research and criticism</li>
                    <li>• Personal, non-commercial references</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg border border-sacred/30 bg-sacred/5">
                  <h4 className="font-medium mb-2">Request a License</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    To request permission to use Sacred Greeks™ trademarks, please contact our legal department with details about your intended use.
                  </p>
                  <Button className="gap-2">
                    <FileText className="w-4 h-4" />
                    Contact Legal Team
                  </Button>
                </div>

                <div className="p-4 rounded-lg bg-muted/50">
                  <h4 className="font-medium mb-2">Attribution Statement</h4>
                  <p className="text-sm text-muted-foreground italic">
                    "Sacred Greeks™, Sacred Greeks Life™, P.R.O.O.F. Framework™, Sacred, Not Sinful™, 5 Persona Types Architecture™, and Shattered Masks™ are trademarks of Sacred Greeks. All rights reserved."
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link to="/ip-documentation">
            <Button variant="outline" className="gap-2">
              IP Documentation
            </Button>
          </Link>
          <Link to="/legal">
            <Button variant="outline" className="gap-2">
              Legal Center
            </Button>
          </Link>
          <Link to="/">
            <Button variant="outline" className="gap-2">
              <Home className="w-4 h-4" />
              Home
            </Button>
          </Link>
        </div>

        {/* Footer Notice */}
        <div className="text-center pt-6 border-t border-border mt-8">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Sacred Greeks™. All Rights Reserved.
          </p>
          <p className="text-xs text-muted-foreground/70 mt-2">
            This trademark usage guide is for informational purposes only and does not constitute legal advice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrademarkUsageGuide;
