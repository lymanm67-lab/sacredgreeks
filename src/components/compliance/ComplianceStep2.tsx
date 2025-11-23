import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ComplianceAnswers } from "@/types/assessment";

interface ComplianceStep2Props {
  scenario: string;
  onComplete: (answers: Partial<ComplianceAnswers>) => void;
  onBack: () => void;
}

export function ComplianceStep2({ scenario, onComplete, onBack }: ComplianceStep2Props) {
  const [formData, setFormData] = useState<Partial<ComplianceAnswers>>({
    description: "",
    individualsAffected: 0,
    staffInvolved: 0,
    citationHistory: "",
    policies: "",
    trainingPlan: "",
    timeline: "",
    biggestFear: "",
    scenarioSpecific: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(formData);
  };

  const isFormValid = () => {
    return (
      formData.description &&
      formData.individualsAffected &&
      formData.staffInvolved &&
      formData.citationHistory &&
      formData.policies &&
      formData.trainingPlan &&
      formData.timeline &&
      formData.biggestFear
    );
  };

  const getScenarioQuestion = () => {
    switch (scenario) {
      case "new_service":
        return "Have you confirmed payor source and rate for this service?";
      case "new_location":
        return "How will you handle transportation and staffing coverage?";
      case "citation_response":
        return "What was the citation about?";
      case "staffing_change":
        return "How many staff will be affected by this change?";
      default:
        return "Any additional details about your situation?";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Assessment Questions</CardTitle>
        <CardDescription>
          Answer these questions to help us evaluate your idea
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="description">Briefly describe the idea or change you are considering</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter your description..."
              rows={3}
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="individuals">How many individuals will this affect in the first 12 months?</Label>
              <Input
                id="individuals"
                type="number"
                min="0"
                value={formData.individualsAffected || ""}
                onChange={(e) => setFormData({ ...formData, individualsAffected: parseInt(e.target.value) || 0 })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="staff">How many staff do you currently have who would be involved?</Label>
              <Input
                id="staff"
                type="number"
                min="0"
                value={formData.staffInvolved || ""}
                onChange={(e) => setFormData({ ...formData, staffInvolved: parseInt(e.target.value) || 0 })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="citations">Have you received a citation or corrective action related to this area?</Label>
            <Select value={formData.citationHistory} onValueChange={(value) => setFormData({ ...formData, citationHistory: value })}>
              <SelectTrigger id="citations">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes, in the past 12 months">Yes, in the past 12 months</SelectItem>
                <SelectItem value="Yes, more than 12 months ago">Yes, more than 12 months ago</SelectItem>
                <SelectItem value="No">No</SelectItem>
                <SelectItem value="Not sure">Not sure</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="policies">Do you have written policies and procedures that fully cover this?</Label>
            <Select value={formData.policies} onValueChange={(value) => setFormData({ ...formData, policies: value })}>
              <SelectTrigger id="policies">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes, up to date">Yes, up to date</SelectItem>
                <SelectItem value="Yes, but outdated">Yes, but outdated</SelectItem>
                <SelectItem value="Not really">Not really</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="training">Do you have a training plan in place for staff related to this change?</Label>
            <Select value={formData.trainingPlan} onValueChange={(value) => setFormData({ ...formData, trainingPlan: value })}>
              <SelectTrigger id="training">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes, formal training plan">Yes, formal training plan</SelectItem>
                <SelectItem value="Some informal training">Some informal training</SelectItem>
                <SelectItem value="No plan yet">No plan yet</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="timeline">What is your target launch timeframe?</Label>
            <Select value={formData.timeline} onValueChange={(value) => setFormData({ ...formData, timeline: value })}>
              <SelectTrigger id="timeline">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Within 30 days">Within 30 days</SelectItem>
                <SelectItem value="31 to 90 days">31 to 90 days</SelectItem>
                <SelectItem value="3 to 6 months">3 to 6 months</SelectItem>
                <SelectItem value="More than 6 months from now">More than 6 months from now</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="scenarioSpecific">{getScenarioQuestion()}</Label>
            <Textarea
              id="scenarioSpecific"
              value={formData.scenarioSpecific}
              onChange={(e) => setFormData({ ...formData, scenarioSpecific: e.target.value })}
              placeholder="Enter your answer..."
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fear">What is your biggest fear about this idea?</Label>
            <Textarea
              id="fear"
              value={formData.biggestFear}
              onChange={(e) => setFormData({ ...formData, biggestFear: e.target.value })}
              placeholder="Be honest - what concerns you most?"
              rows={3}
              required
            />
          </div>

          <div className="flex justify-between pt-4">
            <Button type="button" variant="outline" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button
              type="submit"
              disabled={!isFormValid()}
              className="bg-compliance hover:bg-compliance/90 text-compliance-foreground"
            >
              See Results
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
