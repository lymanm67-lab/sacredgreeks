import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, FileText, Bot } from "lucide-react";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-foreground hover:text-sacred transition-colors">
              <Home className="w-5 h-5" />
              <span className="font-semibold">Sacred Greeks Life</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-sacred/10">
              <FileText className="w-8 h-8 text-sacred" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Terms of Service</h1>
              <p className="text-muted-foreground">Last updated: November 28, 2025</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                By accessing and using Sacred Greeks Life ("the App"), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the App.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Description of Service</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Sacred Greeks Life is a faith-based application designed to help Christians in Greek life navigate the intersection of their faith and fraternity or sorority membership. The App provides:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Daily devotionals and scripture-based reflections</li>
                <li>The P.R.O.O.F. framework for evaluating Greek life participation</li>
                <li>Prayer tools including journals and community prayer walls</li>
                <li>Study guides and educational resources</li>
                <li>AI-powered assistants for spiritual guidance</li>
                <li>Community features for fellowship and support</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                ChatGPT GPT Usage Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                The Sacred Greeks Life Assistant GPT ("the GPT") is provided as an informational tool through OpenAI's ChatGPT platform. By using the GPT, you agree to:
              </p>
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold mb-2">Intended Use</h3>
                  <p className="text-muted-foreground">The GPT is designed to provide general information about the P.R.O.O.F. framework, Sacred Greeks Life features, and Christian guidance for Greek life members. It is not a substitute for personal spiritual counsel, pastoral guidance, or professional advice.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Accuracy Disclaimer</h3>
                  <p className="text-muted-foreground">While we strive for accuracy, the GPT may occasionally provide incomplete or imperfect information. Always verify important spiritual or organizational decisions with trusted mentors, pastors, or advisors.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Third-Party Platform</h3>
                  <p className="text-muted-foreground">The GPT operates on OpenAI's platform and is subject to OpenAI's Terms of Service and Privacy Policy in addition to these terms. We do not control OpenAI's platform or data practices.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">No Personal Data Required</h3>
                  <p className="text-muted-foreground">You can use the GPT without providing personal information. Do not share sensitive personal, financial, or confidential information with the GPT.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Accounts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Some features require account creation. When creating an account, you agree to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Notify us immediately of any unauthorized access</li>
                <li>Accept responsibility for all activities under your account</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Acceptable Use</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                You agree to use the App and GPT in accordance with these guidelines:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Use the service for lawful purposes only</li>
                <li>Respect other users in community features like the Prayer Wall</li>
                <li>Do not attempt to disrupt or compromise the service</li>
                <li>Do not use the service to harass, threaten, or harm others</li>
                <li>Do not misrepresent your identity or affiliation</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                The P.R.O.O.F. framework, "Sacred, Not Sinful" content, and all related materials are the intellectual property of Dr. Lyman Montgomery and Sacred Greeks. You may not reproduce, distribute, or create derivative works without express written permission.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Disclaimer of Warranties</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                The App and GPT are provided "as is" without warranties of any kind. We do not guarantee:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Uninterrupted or error-free service</li>
                <li>Complete accuracy of AI-generated responses</li>
                <li>Specific spiritual outcomes or results</li>
                <li>Compatibility with all devices or platforms</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Sacred Greeks Life and its creators shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the App or GPT. This includes but is not limited to decisions made based on content or guidance provided by our services.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Spiritual Guidance Disclaimer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                The spiritual guidance and biblical interpretations provided through the App and GPT are educational in nature. They are not intended to replace personal relationship with God through prayer and Scripture study, pastoral counseling, or guidance from your local church community.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We reserve the right to modify these Terms of Service at any time. Continued use of the App after changes constitutes acceptance of the new terms.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                For questions about these Terms of Service, please contact us at:
              </p>
              <p className="text-muted-foreground">
                Website: <a href="https://sacredgreekslife.com" className="text-sacred hover:underline">sacredgreekslife.com</a>
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 flex justify-center">
          <Link to="/">
            <Button variant="outline" className="gap-2">
              <Home className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Terms;
