import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, AlertCircle } from "lucide-react";

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

export const FISTFramework = () => {
  return (
    <Card className="mb-8 border-2 border-sacred/20 bg-gradient-to-br from-card to-muted/30">
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

        {/* Application Note */}
        <p className="text-sm text-muted-foreground italic border-t pt-4">
          This same pattern applies to many accusations about Greek life. When you encounter a claim, ask yourself: 
          <em className="text-foreground font-medium"> Is this actual truth, or perceived truth built on a flawed F.I.S.T. cycle?</em>
        </p>
      </CardContent>
    </Card>
  );
};
