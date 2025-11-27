import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy() {
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
            <CardTitle className="text-3xl">Privacy Policy</CardTitle>
            <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          </CardHeader>
          <CardContent className="prose prose-sm dark:prose-invert max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mt-6 mb-4">1. Introduction</h2>
              <p>
                Welcome to Sacred Greeks ("we," "our," or "us"). We are committed to protecting your personal information
                and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your
                information when you use our mobile application and website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-6 mb-4">2. Information We Collect</h2>
              <h3 className="text-xl font-semibold mt-4 mb-2">2.1 Personal Information</h3>
              <p>We collect information that you provide directly to us, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name and email address (when you create an account)</li>
                <li>Profile information (optional)</li>
                <li>Prayer requests and journal entries (stored securely)</li>
                <li>Progress tracking data and achievements</li>
                <li>Community service hours and activities</li>
              </ul>

              <h3 className="text-xl font-semibold mt-4 mb-2">2.2 Automatically Collected Information</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Device information (type, operating system, browser)</li>
                <li>Usage data (features accessed, time spent)</li>
                <li>Analytics data (for improving app performance)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-6 mb-4">3. How We Use Your Information</h2>
              <p>We use your information to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide and maintain our services</li>
                <li>Personalize your experience (daily devotionals, recommendations)</li>
                <li>Track your spiritual growth and progress</li>
                <li>Send notifications (if enabled) for reminders and updates</li>
                <li>Improve our app through analytics</li>
                <li>Communicate with you about updates and features</li>
                <li>Ensure security and prevent fraud</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-6 mb-4">4. Information Sharing</h2>
              <p>We do not sell your personal information. We may share information:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>With Your Consent:</strong> When you choose to share content publicly (e.g., prayer wall)</li>
                <li><strong>Service Providers:</strong> With trusted third parties who help us operate (hosting, analytics)</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect rights and safety</li>
                <li><strong>Business Transfers:</strong> In connection with merger, sale, or acquisition</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-6 mb-4">5. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your information, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Encryption of data in transit and at rest</li>
                <li>Secure authentication systems</li>
                <li>Regular security audits</li>
                <li>Access controls and monitoring</li>
              </ul>
              <p className="mt-3">
                However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-6 mb-4">6. Your Privacy Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Access:</strong> Request a copy of your personal information</li>
                <li><strong>Correction:</strong> Update or correct your information</li>
                <li><strong>Deletion:</strong> Request deletion of your account and data</li>
                <li><strong>Portability:</strong> Request your data in a portable format</li>
                <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications</li>
              </ul>
              <p className="mt-3">
                To exercise these rights, contact us at privacy@sacredgreeks.com
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-6 mb-4">7. Children's Privacy</h2>
              <p>
                Our service is not intended for children under 13. We do not knowingly collect information from children
                under 13. If you believe we have collected such information, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-6 mb-4">8. Third-Party Services</h2>
              <p>Our app may contain links to third-party services:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Supabase (database and authentication)</li>
                <li>Analytics providers</li>
                <li>External resources and links</li>
              </ul>
              <p className="mt-3">
                These services have their own privacy policies. We encourage you to review them.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-6 mb-4">9. Data Retention</h2>
              <p>
                We retain your information for as long as your account is active or as needed to provide services.
                You can request deletion at any time through your account settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-6 mb-4">10. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of significant changes by email
                or through the app. Continued use after changes constitutes acceptance.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-6 mb-4">11. Contact Us</h2>
              <p>If you have questions about this Privacy Policy, contact us at:</p>
              <ul className="list-none space-y-1 mt-3">
                <li><strong>Email:</strong> privacy@sacredgreeks.com</li>
                <li><strong>Website:</strong> <a href="https://sacredgreeks.com" className="text-sacred hover:underline">sacredgreeks.com</a></li>
              </ul>
            </section>

            <section className="bg-muted p-6 rounded-lg mt-8">
              <h3 className="text-xl font-semibold mb-3">Your Privacy Matters</h3>
              <p className="text-sm">
                At Sacred Greeks, we take your privacy seriously. Your spiritual journey is personal, and we are committed
                to protecting your data while helping you grow in faith. If you have any concerns, please don't hesitate
                to reach out.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
