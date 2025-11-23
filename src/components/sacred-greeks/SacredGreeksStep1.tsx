import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";

const scenarios = [
  { 
    value: "clip", 
    label: "I saw a clip or sermon attacking BGLOs",
    description: "Process what you've heard and find biblical clarity"
  },
  { 
    value: "pressure", 
    label: "Someone is pressuring me to denounce or resign",
    description: "Navigate pressure with wisdom and peace"
  },
  { 
    value: "event", 
    label: "I want to plan a faith-based event in my org",
    description: "Design ministry initiatives with confidence"
  },
];

interface SacredGreeksStep1Props {
  onComplete: (scenario: string) => void;
}

export function SacredGreeksStep1({ onComplete }: SacredGreeksStep1Props) {
  const [selected, setSelected] = useState<string>("");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Choose Your Situation</CardTitle>
        <CardDescription>
          Select what best describes where you are right now
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup value={selected} onValueChange={setSelected}>
          <div className="space-y-3">
            {scenarios.map((scenario) => (
              <div
                key={scenario.value}
                className="border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => setSelected(scenario.value)}
              >
                <div className="flex items-start space-x-3">
                  <RadioGroupItem value={scenario.value} id={scenario.value} className="mt-1" />
                  <div className="flex-1">
                    <Label
                      htmlFor={scenario.value}
                      className="cursor-pointer text-base font-medium block mb-1"
                    >
                      {scenario.label}
                    </Label>
                    <p className="text-sm text-muted-foreground">{scenario.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </RadioGroup>

        <div className="flex justify-end pt-4">
          <Button
            onClick={() => selected && onComplete(selected)}
            disabled={!selected}
            className="bg-sacred hover:bg-sacred/90 text-sacred-foreground"
          >
            Continue
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
