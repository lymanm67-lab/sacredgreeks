import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, CheckCircle2, ArrowRight } from "lucide-react";

interface SignUpPromptProps {
  scenario: string;
}

export function SignUpPrompt({ scenario }: SignUpPromptProps) {
  // Create state parameter to return user to guide after signup
  const returnUrl = `/guide?scenario=${scenario}`;
  
  return (
    <Card className="border-2 border-sacred/30 bg-gradient-to-br from-sacred/10 to-background">
      <CardHeader className="text-center pb-2">
        <div className="w-16 h-16 rounded-full bg-sacred/20 flex items-center justify-center mx-auto mb-4">
          <Lock className="w-8 h-8 text-sacred" />
        </div>
        <CardTitle className="text-2xl">Unlock Your Full Results</CardTitle>
        <CardDescription className="text-base">
          Create a free account to access your complete personalized guidance
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <p className="text-sm font-medium text-foreground">With a free account, you'll unlock:</p>
          <ul className="space-y-2">
            {[
              "Complete Scripture Toolkit with all verses",
              "All Sample Responses for your situation",
              "Full P.R.O.O.F. Framework breakdown",
              "Personalized prayer for your journey",
              "Recommended video resources",
              "Save & share your results",
              "Track your spiritual growth",
            ].map((benefit, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-sacred flex-shrink-0 mt-0.5" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <Link to={`/auth?redirect=${encodeURIComponent(returnUrl)}`}>
            <Button className="w-full bg-sacred hover:bg-sacred/90 text-sacred-foreground" size="lg">
              Create Free Account
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link to={`/auth?redirect=${encodeURIComponent(returnUrl)}`}>
            <Button variant="ghost" className="w-full" size="sm">
              Already have an account? Sign in
            </Button>
          </Link>
        </div>

        <p className="text-xs text-center text-muted-foreground">
          100% free. No credit card required.
        </p>
      </CardContent>
    </Card>
  );
}
