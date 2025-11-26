import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Award, AlertCircle, Home, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useCertificateMeta } from '@/hooks/use-certificate-meta';

interface SharedCertificate {
  certificate_type: string;
  assessment_type: string;
  scenario: string;
  theme: string;
  og_image_url: string | null;
  completion_date: string;
  user_name: string;
}

export default function SharedCertificate() {
  const { shareToken } = useParams<{ shareToken: string }>();
  const [certificate, setCertificate] = useState<SharedCertificate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Update meta tags for social sharing
  useCertificateMeta(
    certificate
      ? {
          assessmentType: certificate.assessment_type,
          scenario: certificate.scenario,
          userName: certificate.user_name,
        }
      : null
  );

  useEffect(() => {
    if (!shareToken) return;

    const fetchCertificate = async () => {
      try {
        // Fetch certificate data
        const { data, error: fetchError } = await supabase
          .from('shared_certificates')
          .select('*')
          .eq('share_token', shareToken)
          .maybeSingle();

        if (fetchError) throw fetchError;

        if (!data) {
          setError('Certificate not found');
          setLoading(false);
          return;
        }

        // Check if expired
        if (data.expires_at && new Date(data.expires_at) < new Date()) {
          setError('This certificate link has expired');
          setLoading(false);
          return;
        }

        setCertificate(data);

        // Update view count
        const { error: updateError } = await supabase
          .from('shared_certificates')
          .update({
            view_count: (data.view_count || 0) + 1,
            last_viewed_at: new Date().toISOString(),
          })
          .eq('share_token', shareToken);

        if (updateError) {
          console.error('Failed to update view count:', updateError);
        }
      } catch (err) {
        console.error('Error fetching certificate:', err);
        setError('Failed to load certificate');
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();
  }, [shareToken]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <Award className="w-12 h-12 text-sacred mx-auto mb-4 animate-pulse" />
            <p className="text-muted-foreground">Loading certificate...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !certificate) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center space-y-4">
            <AlertCircle className="w-12 h-12 text-destructive mx-auto" />
            <div>
              <h2 className="text-xl font-bold mb-2">Certificate Not Found</h2>
              <p className="text-muted-foreground">{error}</p>
            </div>
            <Link to="/">
              <Button className="bg-sacred hover:bg-sacred/90 text-sacred-foreground">
                <Home className="w-4 h-4 mr-2" />
                Go to Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-sacred/5 to-muted p-4">
        <Card className="w-full max-w-2xl border-sacred/20">
          <CardContent className="p-8 space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
              <div className="w-16 h-16 mx-auto rounded-full bg-sacred/10 flex items-center justify-center mb-4">
                <Award className="w-8 h-8 text-sacred" />
              </div>
              <h1 className="text-3xl font-bold">Certificate of Completion</h1>
              <p className="text-muted-foreground">
                Sacred Greeks Decision Guide
              </p>
            </div>

            {/* Certificate Preview */}
            {certificate.og_image_url && (
              <div className="rounded-lg overflow-hidden border-2 border-sacred/20">
                <img
                  src={certificate.og_image_url}
                  alt="Certificate"
                  className="w-full h-auto"
                />
              </div>
            )}

            {/* Certificate Details */}
            <div className="space-y-3 text-center">
              <div>
                <p className="text-sm text-muted-foreground">Completed by</p>
                <p className="text-2xl font-bold text-sacred">{certificate.user_name}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Assessment</p>
                <p className="font-semibold">{certificate.assessment_type}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Scenario</p>
                <p className="font-medium">{certificate.scenario}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Completed on</p>
                <p className="font-medium">{certificate.completion_date}</p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-sacred/10 to-transparent rounded-lg p-6 space-y-4">
              <h3 className="font-semibold text-lg">Ready to start your journey?</h3>
              <p className="text-sm text-muted-foreground">
                Join Sacred Greeks Life and explore faith-based guidance for navigating Greek life.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/sacred-greeks" className="flex-1">
                  <Button className="w-full bg-sacred hover:bg-sacred/90 text-sacred-foreground">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Take Assessment
                  </Button>
                </Link>
                <Link to="/" className="flex-1">
                  <Button variant="outline" className="w-full">
                    <Home className="w-4 h-4 mr-2" />
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
  );
}