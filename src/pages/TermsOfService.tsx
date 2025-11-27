import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Terms of Service</CardTitle>
            <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          </CardHeader>
          <CardContent className="prose prose-sm dark:prose-invert max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mt-6 mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing or using Sacred Greeks ("the App"), you agree to be bound by these Terms of Service ("Terms").
                If you do not agree to these Terms, do not use the App.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-6 mb-4">2. Description of Service</h2>
              <p>
                Sacred Greeks is a faith-based mobile and web application designed to help members of Greek letter
                organizations navigate their Greek life experience with biblical wisdom through:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Daily devotionals and spiritual content</li>
                <li>Prayer tools and community prayer wall</li>
                <li>Bible study resources</li>
                <li>Progress tracking and gamification</li>
                <li>Leadership and service tools</li>
                <li>Community features and support</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-6 mb-4">3. User Accounts</h2>
              <h3 className="text-xl font-semibold mt-4 mb-2">3.1 Registration</h3>
              <p>You must create an account to access certain features. You agree to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your password</li>
                <li>Notify us immediately of unauthorized access</li>
                <li>Take responsibility for all activities under your account</li>
              </ul>

              <h3 className="text-xl font-semibold mt-4 mb-2">3.2 Eligibility</h3>
              <p>
                You must be at least 13 years old to use this App. Users under 18 should have parental consent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-6 mb-4">4. User Conduct</h2>
              <p>You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Post harmful, offensive, or inappropriate content</li>
                <li>Harass, threaten, or harm other users</li>
                <li>Impersonate others or misrepresent affiliation</li>
                <li>Distribute spam or malicious code</li>
                <li>Attempt to gain unauthorized access to systems</li>
                <li>Use the App for commercial purposes without permission</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-6 mb-4">5. Content</h2>
              <h3 className="text-xl font-semibold mt-4 mb-2">5.1 Your Content</h3>
              <p>
                You retain ownership of content you create (prayer requests, journal entries, etc.). By submitting content,
                you grant us a license to use, display, and distribute it as necessary to operate the App.
              </p>

              <h3 className="text-xl font-semibold mt-4 mb-2">5.2 Our Content</h3>
              <p>
                All devotionals, study guides, frameworks (including P.R.O.O.F.), and other content provided by Sacred Greeks
                are protected by copyright and intellectual property laws. You may use them for personal, non-commercial
                purposes only.
              </p>

              <h3 className="text-xl font-semibold mt-4 mb-2">5.3 User-Generated Content</h3>
              <p>
                We reserve the right to remove content that violates these Terms or is otherwise objectionable.
                We are not responsible for user-generated content.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-6 mb-4">6. Privacy</h2>
              <p>
                Your use of the App is also governed by our{' '}
                <Link to="/privacy-policy" className="text-sacred hover:underline">Privacy Policy</Link>.
                Please review it to understand how we collect and use your information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-6 mb-4">7. Subscription and Payments</h2>
              <p>
                Currently, Sacred Greeks is free to use. If we introduce paid features in the future:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Pricing will be clearly disclosed</li>
                <li>You will provide accurate payment information</li>
                <li>Subscriptions may automatically renew unless cancelled</li>
                <li>Refund policies will be clearly stated</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-6 mb-4">8. Disclaimers</h2>
              <h3 className="text-xl font-semibold mt-4 mb-2">8.1 Religious Content</h3>
              <p>
                Sacred Greeks provides Christian faith-based content and guidance. While we strive for theological accuracy,
                we encourage users to verify teachings with their local church and spiritual mentors.
              </p>

              <h3 className="text-xl font-semibold mt-4 mb-2">8.2 Not Professional Advice</h3>
              <p>
                The App does not provide professional counseling, therapy, or legal advice. For serious matters, seek
                qualified professional help.
              </p>

              <h3 className="text-xl font-semibold mt-4 mb-2">8.3 "As Is" Service</h3>
              <p>
                The App is provided "as is" without warranties of any kind. We do not guarantee uninterrupted, secure,
                or error-free operation.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-6 mb-4">9. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by law, Sacred Greeks and its founders shall not be liable for any indirect,
                incidental, special, consequential, or punitive damages resulting from your use of the App.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-6 mb-4">10. Termination</h2>
              <p>
                We reserve the right to suspend or terminate your account for violations of these Terms or for any reason
                at our discretion. You may delete your account at any time through the app settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-6 mb-4">11. Changes to Terms</h2>
              <p>
                We may modify these Terms at any time. We will notify users of significant changes. Continued use after
                changes constitutes acceptance of the new Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-6 mb-4">12. Governing Law</h2>
              <p>
                These Terms are governed by the laws of the United States, without regard to conflict of law principles.
                Any disputes shall be resolved in the appropriate courts.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-6 mb-4">13. Contact Information</h2>
              <p>For questions about these Terms, contact us at:</p>
              <ul className="list-none space-y-1 mt-3">
                <li><strong>Email:</strong> legal@sacredgreeks.com</li>
                <li><strong>Website:</strong> <a href="https://sacredgreeks.com" className="text-sacred hover:underline">sacredgreeks.com</a></li>
              </ul>
            </section>

            <section className="bg-muted p-6 rounded-lg mt-8">
              <h3 className="text-xl font-semibold mb-3">Our Commitment</h3>
              <p className="text-sm">
                Sacred Greeks is built on biblical principles and a commitment to helping Greek letter organization members
                live out their faith. These Terms protect both you and us, ensuring a safe, respectful community where
                everyone can grow spiritually.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
