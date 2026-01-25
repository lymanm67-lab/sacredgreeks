import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, AlertCircle, Target, Sparkles, Scale, Eye, Building, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const fistSteps = [
  {
    letter: "F",
    title: "Facts",
    description: "Observable events or data points, often incomplete or taken out of context.",
    color: "bg-blue-500"
  },
  {
    letter: "I",
    title: "Interpretation",
    description: "How we explain or connect those facts based on assumptions and bias.",
    color: "bg-amber-500"
  },
  {
    letter: "S",
    title: "Stories",
    description: "Personal anecdotes and experiences that reinforce the interpretation.",
    color: "bg-purple-500"
  },
  {
    letter: "T",
    title: "Truth",
    description: "The perceived truth that becomes accepted as fact, even when flawed.",
    color: "bg-red-500"
  }
];

const classicExample = {
  myth: "Going outside without a hat causes colds",
  steps: [
    { letter: "F", text: "It's cold and raining outside." },
    { letter: "I", text: "If you go outside without an umbrella or hat, you'll catch a cold or flu." },
    { letter: "S", text: '"I remember when Tom went outside while it was cold without a hat—he caught the flu and had to be hospitalized."' },
    { letter: "T", text: "Going outside without a hat causes colds and flu." }
  ],
  reality: "Cold and wet conditions do not cause colds or flu—viruses do. But the myth persists because the F.I.S.T. cycle reinforces it."
};

const proofSteps = [
  {
    letter: "P",
    word: "Pledge Process",
    criticism: "Hazing",
    description: "Biblical guidance on navigating intake with integrity",
    icon: Target,
    color: "from-blue-500 to-blue-600",
  },
  {
    letter: "R",
    word: "Rituals",
    criticism: "Demonic portals",
    description: "Discerning ceremonies through Scripture",
    icon: Sparkles,
    color: "from-purple-500 to-purple-600",
  },
  {
    letter: "O",
    word: "Oaths",
    criticism: "Greek deity allegiance",
    description: "Understanding vows in light of Scripture",
    icon: Scale,
    color: "from-orange-500 to-orange-600",
  },
  {
    letter: "O",
    word: "Obscurity",
    criticism: "Secret societies",
    description: "Addressing secrecy while walking in light",
    icon: Eye,
    color: "from-green-500 to-green-600",
  },
  {
    letter: "F",
    word: "Founders",
    criticism: "Masonic connections",
    description: "Examining history biblically",
    icon: Building,
    color: "from-red-500 to-red-600",
  },
];

export const FISTFramework = () => {
  return (
    <div className="space-y-6 mb-8">
      {/* F.I.S.T. Framework Card */}
      <Card className="border-2 border-sacred/20 bg-gradient-to-br from-card to-muted/30">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-5 h-5 text-sacred" />
            <Badge variant="secondary" className="bg-sacred/10 text-sacred">Dr. Lyman's Framework</Badge>
          </div>
          <CardTitle className="text-xl">How Myths Become "Truth": The F.I.S.T. Framework</CardTitle>
          <p className="text-muted-foreground text-sm">
            Many accusations against Greek life follow a predictable pattern. What starts as an isolated fact gets interpreted, 
            wrapped in stories, and eventually solidifies into accepted "truth"—even when the underlying logic is flawed.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* F.I.S.T. Steps */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {fistSteps.map((step) => (
              <div key={step.letter} className="relative">
                <div className="flex flex-col items-center text-center p-4 rounded-lg bg-background border">
                  <div className={`w-10 h-10 rounded-full ${step.color} flex items-center justify-center text-white font-bold text-lg mb-2`}>
                    {step.letter}
                  </div>
                  <h4 className="font-semibold text-sm">{step.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Classic Example */}
          <div className="bg-muted/50 rounded-lg p-4 border">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-500" />
              Classic Example: "{classicExample.myth}"
            </h4>
            <div className="space-y-2 mb-4">
              {classicExample.steps.map((step) => (
                <div key={step.letter} className="flex gap-3 items-start">
                  <span className="font-bold text-sacred min-w-[24px]">{step.letter} -</span>
                  <span className="text-sm text-muted-foreground">{step.text}</span>
                </div>
              ))}
            </div>
            <div className="bg-sacred/10 rounded-lg p-3 border-l-4 border-sacred">
              <p className="text-sm font-medium">
                <strong>The Reality:</strong> {classicExample.reality}
              </p>
            </div>
          </div>

          {/* Transition to P.R.O.O.F. */}
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <div className="h-px flex-1 bg-border" />
            <ArrowRight className="w-4 h-4" />
            <span className="text-xs font-medium">Now respond with biblical truth</span>
            <ArrowRight className="w-4 h-4" />
            <div className="h-px flex-1 bg-border" />
          </div>
        </CardContent>
      </Card>

      {/* P.R.O.O.F. Framework Card */}
      <Card className="border-2 border-primary/20 bg-gradient-to-br from-card to-primary/5">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="default" className="bg-primary/10 text-primary border-primary/20">Biblical Response</Badge>
          </div>
          <CardTitle className="text-xl">The P.R.O.O.F. Framework</CardTitle>
          <p className="text-muted-foreground text-sm">
            Once you recognize how myths form, use these biblical responses to address the 5 most common anti-Greek life criticisms.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* P.R.O.O.F. Steps */}
          <div className="space-y-2">
            {proofSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.letter + index}
                  className="flex items-center gap-3 p-3 rounded-lg bg-background border hover:border-primary/30 transition-colors"
                >
                  <div className={`flex-shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br ${step.color} flex items-center justify-center shadow-sm`}>
                    <span className="text-sm font-bold text-white">{step.letter}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-medium text-foreground text-sm">{step.word}</h4>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-destructive/10 text-destructive font-medium">
                        {step.criticism}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{step.description}</p>
                  </div>
                  <Icon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="pt-2">
            <Link to="/proof-course">
              <Button variant="outline" size="sm" className="w-full border-primary/30 hover:bg-primary/10 hover:border-primary/50">
                Learn Biblical Responses in P.R.O.O.F. Course
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
