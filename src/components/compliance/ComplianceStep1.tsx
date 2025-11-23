import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";

const scenarios = [
  { value: "new_service", label: "Add a new service" },
  { value: "new_location", label: "Expand to a new location or county" },
  { value: "staffing_change", label: "Change staffing model or schedules" },
  { value: "new_program", label: "Launch a new program or line of business" },
  { value: "citation_response", label: "Respond to a citation or plan of correction" },
];

interface ComplianceStep1Props {
  onComplete: (scenario: string) => void;
}

export function ComplianceStep1({ onComplete }: ComplianceStep1Props) {
  const [selected, setSelected] = useState<string>("");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Choose Your Scenario</CardTitle>
        <CardDescription>
          Select the situation that best describes what you're considering
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup value={selected} onValueChange={setSelected}>
          <div className="space-y-3">
            {scenarios.map((scenario) => (
              <div
                key={scenario.value}
                className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => setSelected(scenario.value)}
              >
                <RadioGroupItem value={scenario.value} id={scenario.value} />
                <Label
                  htmlFor={scenario.value}
                  className="flex-1 cursor-pointer text-base font-medium"
                >
                  {scenario.label}
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>

        <div className="flex justify-end pt-4">
          <Button
            onClick={() => selected && onComplete(selected)}
            disabled={!selected}
            className="bg-compliance hover:bg-compliance/90 text-compliance-foreground"
          >
            Continue
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
