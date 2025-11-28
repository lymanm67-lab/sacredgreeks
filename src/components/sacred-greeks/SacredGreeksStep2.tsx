import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SacredGreeksAnswers } from "@/types/assessment";
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
  "Peaceful",
  "Anxious",
  "Determined",
];

const supportLevels = [
  "Strong support from all (church, family, chapter)",
  "Some support, but mixed reactions",
  "Little support, mostly opposition",
  "I feel alone in this",
  "I haven't shared this with anyone yet",
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
    whoInvolved: string;
    alreadyDone: string;
    emotions: string[];
    desiredOutcome: string;
    supportLevel: string;
    scenarioSpecific: Record<string, string>;
  }>({
    role: "",
    situation: "",
    whoInvolved: "",
    alreadyDone: "",
    emotions: [],
    desiredOutcome: "",
    supportLevel: "",
    scenarioSpecific: {},
  });

  // Honeypot spam protection
  const [honeypot, setHoneypot] = useState("");
  const [startTime] = useState(Date.now());
  const [website, setWebsite] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Honeypot spam detection
    if (honeypot || website) {
      console.log("Spam detected");
      return;
    }

    // Timing check - real users take at least 5 seconds
    const timeSpent = Date.now() - startTime;
    if (timeSpent < 5000) {
      toast({
        title: 'Please take your time',
        description: 'Take a moment to thoughtfully answer each question.',
        variant: 'destructive',
      });
      return;
    }
    
    if (!isFormValid()) {
      toast({
        title: 'Incomplete',
        description: 'Please answer all required questions.',
        variant: 'destructive',
      });
      return;
    }
    
    onComplete(formData);
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
    return (
      formData.role && 
      formData.situation && 
      formData.emotions.length > 0 &&
      formData.desiredOutcome &&
      formData.supportLevel
    );
  };

  const getPlaceholderText = () => {
    switch (scenario) {
      case "clip":
        return "Example: I watched a sermon that said all BGLOs are demonic and now I'm questioning everything about my membership.";
      case "denounce":
        return "Example: I've been a member for 10 years and lately I'm wondering if God wants me to leave or stay and make a difference.";
      case "pressure":
        return "Example: My pastor told me I need to publicly denounce my letters or I'm not truly saved.";
      case "event":
        return "Example: I want to host a Bible study for believers in my chapter but I'm worried about mixing faith and Greek life.";
      case "symbol":
        return "Example: Someone told me our hand sign is a demonic symbol and now I don't know what to believe.";
      default:
        return "Describe your situation in your own words...";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Capture Your Situation</CardTitle>
        <CardDescription>
          Help us understand where you are so we can offer the most relevant biblical guidance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Honeypot fields - hidden from real users */}
          <div style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }} aria-hidden="true">
            <input
              type="text"
              name="contact_info"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>

          {/* Question 1: Role */}
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

          {/* Question 2: Describe what is happening */}
          <div className="space-y-2">
            <Label htmlFor="situation">1. Describe what is happening in your own words</Label>
            <Textarea
              id="situation"
              value={formData.situation}
              onChange={(e) => setFormData({ ...formData, situation: e.target.value })}
              placeholder={getPlaceholderText()}
              rows={3}
              required
            />
          </div>

          {/* Question 3: Who else is involved */}
          <div className="space-y-2">
            <Label htmlFor="whoInvolved">2. Who else is involved or watching this situation?</Label>
            <Textarea
              id="whoInvolved"
              value={formData.whoInvolved}
              onChange={(e) => setFormData({ ...formData, whoInvolved: e.target.value })}
              placeholder="Example: My spouse, my pastor, my chapter brothers/sisters, my parents..."
              rows={2}
            />
          </div>

          {/* Question 4: What have you already done */}
          <div className="space-y-2">
            <Label htmlFor="alreadyDone">3. What have you already done or said?</Label>
            <Textarea
              id="alreadyDone"
              value={formData.alreadyDone}
              onChange={(e) => setFormData({ ...formData, alreadyDone: e.target.value })}
              placeholder="Example: I've been avoiding the conversation, I've started researching, I've prayed about it..."
              rows={2}
            />
          </div>

          {/* Question 5: How are you feeling (emotions) */}
          <div className="space-y-3">
            <Label>4. How are you feeling right now? (Select all that apply)</Label>
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

          {/* Question 6: Desired outcome */}
          <div className="space-y-2">
            <Label htmlFor="desiredOutcome">5. What outcome are you hoping for?</Label>
            <Textarea
              id="desiredOutcome"
              value={formData.desiredOutcome}
              onChange={(e) => setFormData({ ...formData, desiredOutcome: e.target.value })}
              placeholder="Example: I want peace about my decision, I want to know how to respond, I want clarity on what God wants..."
              rows={2}
              required
            />
          </div>

          {/* Question 7: Support level */}
          <div className="space-y-2">
            <Label htmlFor="supportLevel">6. How much support do you have from church, family, and chapter?</Label>
            <Select value={formData.supportLevel} onValueChange={(value) => setFormData({ ...formData, supportLevel: value })}>
              <SelectTrigger id="supportLevel">
                <SelectValue placeholder="Select your support level" />
              </SelectTrigger>
              <SelectContent>
                {supportLevels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Scenario-specific questions */}
          {scenario === "clip" && (
            <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
              <p className="text-sm font-medium text-muted-foreground">Additional context about the content:</p>
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
                    <SelectItem value="tiktok">TikTok / Social Media</SelectItem>
                    <SelectItem value="article">Article or blog</SelectItem>
                    <SelectItem value="conversation">Personal conversation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {scenario === "denounce" && (
            <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
              <p className="text-sm font-medium text-muted-foreground">Help us understand your position:</p>
              <div className="space-y-2">
                <Label htmlFor="currentBelief">What do you currently believe about your membership?</Label>
                <Select
                  value={formData.scenarioSpecific.currentBelief || ""}
                  onValueChange={(value) => updateScenarioField("currentBelief", value)}
                >
                  <SelectTrigger id="currentBelief">
                    <SelectValue placeholder="Select your belief" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sinful">I believe it may be sinful</SelectItem>
                    <SelectItem value="honorable">I believe it can honor Christ</SelectItem>
                    <SelectItem value="unsure">I'm genuinely unsure</SelectItem>
                    <SelectItem value="examining">I'm actively examining everything</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="yearsActive">How long have you been a member?</Label>
                <Select
                  value={formData.scenarioSpecific.yearsActive || ""}
                  onValueChange={(value) => updateScenarioField("yearsActive", value)}
                >
                  <SelectTrigger id="yearsActive">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">Less than 2 years</SelectItem>
                    <SelectItem value="moderate">2-5 years</SelectItem>
                    <SelectItem value="established">5-15 years</SelectItem>
                    <SelectItem value="veteran">15+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {scenario === "pressure" && (
            <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
              <p className="text-sm font-medium text-muted-foreground">About the pressure you're facing:</p>
              <div className="space-y-2">
                <Label htmlFor="pressureSource">Who is primarily pressuring you?</Label>
                <Select
                  value={formData.scenarioSpecific.pressureSource || ""}
                  onValueChange={(value) => updateScenarioField("pressureSource", value)}
                >
                  <SelectTrigger id="pressureSource">
                    <SelectValue placeholder="Select person" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pastor">Pastor or church leader</SelectItem>
                    <SelectItem value="parent">Parent</SelectItem>
                    <SelectItem value="spouse">Spouse or partner</SelectItem>
                    <SelectItem value="friend">Close friend</SelectItem>
                    <SelectItem value="online">Online voices / influencers</SelectItem>
                    <SelectItem value="multiple">Multiple people</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {scenario === "event" && (
            <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
              <p className="text-sm font-medium text-muted-foreground">About your event idea:</p>
              <div className="space-y-2">
                <Label htmlFor="eventType">What type of event are you planning?</Label>
                <Select
                  value={formData.scenarioSpecific.eventType || ""}
                  onValueChange={(value) => updateScenarioField("eventType", value)}
                >
                  <SelectTrigger id="eventType">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="prayer">Prayer service or gathering</SelectItem>
                    <SelectItem value="bible_study">Bible study</SelectItem>
                    <SelectItem value="memorial">Memorial or remembrance service</SelectItem>
                    <SelectItem value="service">Service project with faith focus</SelectItem>
                    <SelectItem value="panel">Faith discussion or panel</SelectItem>
                    <SelectItem value="retreat">Spiritual retreat</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {scenario === "symbol" && (
            <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
              <p className="text-sm font-medium text-muted-foreground">About your concern:</p>
              <div className="space-y-2">
                <Label htmlFor="symbolType">What type of symbol, ritual, or gesture concerns you?</Label>
                <Select
                  value={formData.scenarioSpecific.symbolType || ""}
                  onValueChange={(value) => updateScenarioField("symbolType", value)}
                >
                  <SelectTrigger id="symbolType">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="handsign">Hand sign or gesture</SelectItem>
                    <SelectItem value="shield">Shield or crest imagery</SelectItem>
                    <SelectItem value="ritual">Ritual or ceremony</SelectItem>
                    <SelectItem value="greeting">Greeting or call</SelectItem>
                    <SelectItem value="founders">Founder references</SelectItem>
                    <SelectItem value="general">General practices</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="symbolConcern">What specifically concerns you about it?</Label>
                <Textarea
                  id="symbolConcern"
                  value={formData.scenarioSpecific.symbolConcern || ""}
                  onChange={(e) => updateScenarioField("symbolConcern", e.target.value)}
                  placeholder="What have you heard or what worries you?"
                  rows={2}
                />
              </div>
            </div>
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
              See Your Guidance
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}