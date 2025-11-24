import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, Shield } from 'lucide-react';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <Home className="w-4 h-4" />
            <span className="text-sm font-medium">Home</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-sacred/10 flex items-center justify-center">
              <Shield className="w-6 h-6 text-sacred" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Privacy Policy</h1>
              <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Introduction</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Sacred Greeks ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Account Information</h3>
                <p className="text-muted-foreground">When you create an account, we collect your email address, name, and password (encrypted).</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Assessment Data</h3>
                <p className="text-muted-foreground">We store your assessment responses, prayer journal entries, and devotional progress to provide personalized guidance.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Usage Information</h3>
                <p className="text-muted-foreground">With your consent, we collect anonymous analytics about how you use the app to improve our services.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>To provide and maintain our services</li>
                <li>To personalize your experience</li>
                <li>To send you important updates about the service</li>
                <li>To improve our application and features</li>
                <li>To ensure security and prevent fraud</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Rights (GDPR)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="mb-4">If you are in the European Union, you have the following rights:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li><strong>Right to Access:</strong> Request a copy of your personal data</li>
                <li><strong>Right to Rectification:</strong> Correct inaccurate data</li>
                <li><strong>Right to Erasure:</strong> Request deletion of your data</li>
                <li><strong>Right to Restriction:</strong> Limit how we use your data</li>
                <li><strong>Right to Portability:</strong> Export your data</li>
                <li><strong>Right to Object:</strong> Opt out of certain data processing</li>
              </ul>
              <p className="mt-4 text-sm">
                To exercise these rights, please contact us through your account settings or email us.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Security</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We implement industry-standard security measures to protect your data, including encryption, secure authentication, and regular security audits. However, no method of transmission over the internet is 100% secure.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cookies</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We use essential cookies to maintain your session and preferences. We only use analytics cookies with your explicit consent. You can manage your cookie preferences at any time.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Retention</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We retain your personal data for as long as your account is active or as needed to provide services. You can request deletion of your account and all associated data at any time.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Children's Privacy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our service is not intended for children under 13. We do not knowingly collect data from children.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Changes to This Policy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                If you have questions about this Privacy Policy or wish to exercise your rights, please contact us through your account settings or the FAQ page.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Privacy;
