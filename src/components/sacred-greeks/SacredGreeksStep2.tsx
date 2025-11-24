import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SacredGreeksAnswers } from "@/types/assessment";
import { assessmentStep2Schema } from "@/lib/validation";
import { useToast } from "@/hooks/use-toast";

const roles = [
  "Active BGLO member",
  "Alumni or financial member",
  "Interested in joining",
  "Pastor or ministry leader",
  "Parent or family member",
  "Other",
];

const emotions = [
  "Confused",
  "Angry",
  "Ashamed",
  "Curious",
  "Afraid of being judged",
  "Hurt by church",
  "Defensive",
  "Hopeful",
  "Numb",
];

interface SacredGreeksStep2Props {
  scenario: string;
  onComplete: (answers: Partial<SacredGreeksAnswers>) => void;
  onBack: () => void;
}

export function SacredGreeksStep2({ scenario, onComplete, onBack }: SacredGreeksStep2Props) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<{
    role: string;
    situation: string;
    emotions: string[];
    scenarioSpecific: Record<string, string>;
  }>({
    role: "",
    situation: "",
    emotions: [],
    scenarioSpecific: {},
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      assessmentStep2Schema.parse(formData);
      onComplete(formData);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: 'Validation Error',
          description: error.message,
          variant: 'destructive',
        });
      }
    }
  };

  const toggleEmotion = (emotion: string) => {
    setFormData({
      ...formData,
      emotions: formData.emotions.includes(emotion)
        ? formData.emotions.filter((e) => e !== emotion)
        : [...formData.emotions, emotion],
    });
  };

  const updateScenarioField = (key: string, value: string) => {
    setFormData({
      ...formData,
      scenarioSpecific: {
        ...formData.scenarioSpecific,
        [key]: value,
      },
    });
  };

  const isFormValid = () => {
    return formData.role && formData.situation && formData.emotions.length > 0;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Share Your Story</CardTitle>
        <CardDescription>
          Help us understand where you are so we can offer the most relevant guidance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="role">Which best describes you?</Label>
            <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
              <SelectTrigger id="role">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="situation">In one or two sentences, describe what is happening</Label>
            <Textarea
              id="situation"
              value={formData.situation}
              onChange={(e) => setFormData({ ...formData, situation: e.target.value })}
              placeholder={
                scenario === "clip"
                  ? "Example: I watched a sermon that said all BGLOs are demonic and now I'm questioning everything about my membership."
                  : scenario === "pressure"
                  ? "Example: My pastor told me I need to publicly denounce my letters or I'm not truly saved."
                  : "Example: I want to host a Bible study for believers in my chapter but I'm worried about mixing faith and Greek life."
              }
              rows={3}
              required
            />
          </div>

          <div className="space-y-3">
            <Label>Right now, which words fit how you feel? (Select all that apply)</Label>
            <div className="flex flex-wrap gap-2">
              {emotions.map((emotion) => (
                <Badge
                  key={emotion}
                  variant={formData.emotions.includes(emotion) ? "default" : "outline"}
                  className={`cursor-pointer transition-all ${
                    formData.emotions.includes(emotion)
                      ? "bg-sacred text-sacred-foreground hover:bg-sacred/90"
                      : "hover:bg-muted"
                  }`}
                  onClick={() => toggleEmotion(emotion)}
                >
                  {emotion}
                </Badge>
              ))}
            </div>
          </div>

          {scenario === "clip" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="contentType">What type of content was it?</Label>
                <Select
                  value={formData.scenarioSpecific.contentType || ""}
                  onValueChange={(value) => updateScenarioField("contentType", value)}
                >
                  <SelectTrigger id="contentType">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sermon">Sermon</SelectItem>
                    <SelectItem value="youtube">YouTube video</SelectItem>
                    <SelectItem value="tiktok">TikTok</SelectItem>
                    <SelectItem value="article">Article</SelectItem>
                    <SelectItem value="conversation">Conversation</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="claim">What was the main claim?</Label>
                <Textarea
                  id="claim"
                  value={formData.scenarioSpecific.claim || ""}
                  onChange={(e) => updateScenarioField("claim", e.target.value)}
                  placeholder="What did they say about BGLOs?"
                  rows={2}
                />
              </div>
            </>
          )}

          {scenario === "pressure" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="pressureFrom">Who is pressuring you?</Label>
                <Select
                  value={formData.scenarioSpecific.pressureFrom || ""}
                  onValueChange={(value) => updateScenarioField("pressureFrom", value)}
                >
                  <SelectTrigger id="pressureFrom">
                    <SelectValue placeholder="Select person" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pastor">Pastor</SelectItem>
                    <SelectItem value="parent">Parent</SelectItem>
                    <SelectItem value="spouse">Spouse</SelectItem>
                    <SelectItem value="friend">Friend</SelectItem>
                    <SelectItem value="influencer">Online influencer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="belief">What do you currently believe in your heart about membership?</Label>
                <Select
                  value={formData.scenarioSpecific.belief || ""}
                  onValueChange={(value) => updateScenarioField("belief", value)}
                >
                  <SelectTrigger id="belief">
                    <SelectValue placeholder="Select your belief" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sin">I believe it is sin</SelectItem>
                    <SelectItem value="christ_honoring">I believe it can be Christ-honoring</SelectItem>
                    <SelectItem value="not sure">Not sure</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {scenario === "event" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="eventType">What type of event?</Label>
                <Select
                  value={formData.scenarioSpecific.eventType || ""}
                  onValueChange={(value) => updateScenarioField("eventType", value)}
                >
                  <SelectTrigger id="eventType">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="prayer">Prayer service</SelectItem>
                    <SelectItem value="bible_study">Bible study</SelectItem>
                    <SelectItem value="memorial">Memorial service</SelectItem>
                    <SelectItem value="service">Service project</SelectItem>
                    <SelectItem value="panel">Faith panel</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="concern">What is your main concern?</Label>
                <Textarea
                  id="concern"
                  value={formData.scenarioSpecific.concern || ""}
                  onChange={(e) => updateScenarioField("concern", e.target.value)}
                  placeholder="What worries you most about this event?"
                  rows={2}
                />
              </div>
            </>
          )}

          <div className="flex justify-between pt-4">
            <Button type="button" variant="outline" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button
              type="submit"
              disabled={!isFormValid()}
              className="bg-sacred hover:bg-sacred/90 text-sacred-foreground"
            >
              See P.R.O.O.F. Guidance
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
