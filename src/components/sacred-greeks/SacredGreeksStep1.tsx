import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface Scenario {
  value: string;
  label: string;
  description: string;
  councilSpecific?: boolean;
}

const defaultScenarios: Scenario[] = [
  { 
    value: "clip", 
    label: "I am thinking about responding to a denouncement video",
    description: "Process what you've heard and find biblical clarity"
  },
  { 
    value: "denounce", 
    label: "I am wondering if I should denounce or stay",
    description: "Discern your next step with Scripture and wisdom"
  },
  { 
    value: "pressure", 
    label: "My pastor, parent, or spouse is pressuring me",
    description: "Navigate pressure with grace and peace"
  },
  { 
    value: "event", 
    label: "I want to lead a faith-based event in my org",
    description: "Design ministry initiatives with confidence"
  },
  { 
    value: "symbol", 
    label: "I am confused about a symbol, ritual, or gesture",
    description: "Get clarity on what honors Christ"
  },
];

interface SacredGreeksStep1Props {
  onComplete: (scenario: string) => void;
  scenarios?: Scenario[];
  councilName?: string;
}

export function SacredGreeksStep1({ onComplete, scenarios, councilName }: SacredGreeksStep1Props) {
  const [selected, setSelected] = useState<string>("");
  
  const displayScenarios = scenarios && scenarios.length > 0 ? scenarios : defaultScenarios;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Choose Your Situation</CardTitle>
        <CardDescription>
          {councilName ? (
            <>Scenarios tailored for <span className="font-medium text-sacred">{councilName}</span> members</>
          ) : (
            "Select what best describes where you are right now"
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup value={selected} onValueChange={setSelected}>
          <div className="space-y-3">
            {displayScenarios.map((scenario) => (
              <div
                key={scenario.value}
                className="border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => setSelected(scenario.value)}
              >
                <div className="flex items-start space-x-3">
                  <RadioGroupItem value={scenario.value} id={scenario.value} className="mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Label
                        htmlFor={scenario.value}
                        className="cursor-pointer text-base font-medium"
                      >
                        {scenario.label}
                      </Label>
                      {scenario.councilSpecific && (
                        <Badge variant="secondary" className="text-xs flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          For You
                        </Badge>
                      )}
                    </div>
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