import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, AlertTriangle, ExternalLink, RefreshCw, Mail } from "lucide-react";
import { ComplianceAnswers, ComplianceScores, ResultType } from "@/types/assessment";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ComplianceResultsProps {
  resultType: ResultType;
  scores: ComplianceScores;
  answers: ComplianceAnswers;
  onRestart: () => void;
}

export function ComplianceResults({ resultType, scores, answers, onRestart }: ComplianceResultsProps) {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const { toast } = useToast();

  const getResultConfig = () => {
    switch (resultType) {
      case 'high_risk':
        return {
          icon: AlertCircle,
          color: 'status-high',
          title: 'Your Current Idea is High Risk',
          description: 'This idea needs significant work before moving forward',
        };
      case 'medium_risk':
        return {
          icon: AlertTriangle,
          color: 'status-medium',
          title: 'Your Idea Looks Reasonable with Adjustments',
          description: 'You can move forward with some important modifications',
        };
      case 'low_risk':
        return {
          icon: CheckCircle2,
          color: 'status-low',
          title: 'Your Idea is Well-Positioned',
          description: 'This looks like a smart, well-thought-out move',
        };
      default:
        return {
          icon: AlertTriangle,
          color: 'status-medium',
          title: 'Assessment Complete',
          description: 'Review your results below',
        };
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In V1, just update the record with the email
    // Actual email sending can be added later
    try {
      toast({
        title: "Email saved",
        description: "We'll send your summary shortly (feature coming soon)",
      });
      setEmailSent(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save email",
        variant: "destructive",
      });
    }
  };

  const config = getResultConfig();
  const Icon = config.icon;

  return (
    <div className="space-y-6">
      <Card className="border-2">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-full bg-${config.color}/10 flex items-center justify-center`}>
              <Icon className={`w-8 h-8 text-${config.color}`} />
            </div>
            <div className="flex-1">
              <CardTitle className="text-2xl mb-1">{config.title}</CardTitle>
              <CardDescription className="text-base">{config.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Compliance and Documentation */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Compliance and Documentation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {scores.complianceRiskScore > 60 && (
            <p className="text-sm">
              • You reported {answers.citationHistory.toLowerCase()}. Before launching anything new, strengthen your internal monitoring around this rule.
            </p>
          )}
          {scores.documentationAndTrainingScore < 50 && (
            <p className="text-sm">
              • Your policies and training appear {answers.policies === 'No' || answers.policies === 'Not really' ? 'missing' : 'outdated'} for this service. Update your procedures and schedule staff training before you set a firm launch date.
            </p>
          )}
          {resultType === 'low_risk' && (
            <p className="text-sm">
              • Your documentation and training plans are solid. Make sure to maintain these standards as you implement.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Staffing and Operations */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Staffing and Operations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {scores.operationalCapacityScore < 50 && (
            <p className="text-sm">
              • With {answers.staffInvolved} staff involved and {answers.individualsAffected} individuals affected, your current capacity may be stretched. Consider phasing implementation or hiring support.
            </p>
          )}
          {answers.timeline === 'Within 30 days' && (
            <p className="text-sm">
              • Your 30-day timeline is aggressive. Consider extending to at least 60-90 days to ensure quality implementation and staff readiness.
            </p>
          )}
          {resultType === 'low_risk' && (
            <p className="text-sm">
              • Your staffing and operational timeline appear realistic for this change. Continue to monitor capacity as you implement.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Stress and Leadership Impact */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Stress and Leadership Impact</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm">
            Your biggest concern is: "{answers.biggestFear}"
          </p>
          {scores.leadershipStressScore > 60 && (
            <p className="text-sm">
              • This change will put significant stress on leadership. Build in regular check-ins and be prepared to adjust course if warning signs appear.
            </p>
          )}
          {resultType !== 'low_risk' && (
            <p className="text-sm">
              • Before committing, take 48 hours to review these findings with your leadership team. Slow decisions now prevent crisis later.
            </p>
          )}
        </CardContent>
      </Card>

      {/* CTAs */}
      <Card className="bg-compliance/5">
        <CardHeader>
          <CardTitle>Next Steps with FDCA</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3">
            <Button
              variant="outline"
              className="justify-start"
              asChild
            >
              <a href="https://focuseddrivencompliance.com" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Book a Compliance Strategy Session
              </a>
            </Button>
            <Button
              variant="outline"
              className="justify-start"
              asChild
            >
              <a href="https://focuseddrivencompliance.com" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Download Internal Monitoring Checklist
              </a>
            </Button>
            <Button
              variant="outline"
              className="justify-start"
              asChild
            >
              <a href="https://focuseddrivencompliance.com" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                View FDCA Training and Courses
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Email Capture */}
      {!emailSent ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Get Your Summary via Email</CardTitle>
            <CardDescription>We'll send a copy of your assessment results</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleEmailSubmit} className="flex gap-2">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="bg-compliance hover:bg-compliance/90">
                <Mail className="w-4 h-4 mr-2" />
                Send Summary
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-muted">
          <CardContent className="pt-6">
            <p className="text-sm text-center text-muted-foreground">
              ✓ Email saved! We'll send your summary shortly.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Restart */}
      <div className="flex justify-center pt-4">
        <Button variant="outline" onClick={onRestart}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Start Over
        </Button>
      </div>
    </div>
  );
}
