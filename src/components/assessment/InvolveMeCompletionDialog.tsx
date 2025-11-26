import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Download, Share2, Home, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { downloadCertificatePDF, CertificateTheme } from '@/lib/certificate-generator';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface InvolveMeCompletionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  assessmentTitle: string;
  assessmentType: string;
}

export function InvolveMeCompletionDialog({ 
  open, 
  onOpenChange,
  assessmentTitle,
  assessmentType
}: InvolveMeCompletionDialogProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<CertificateTheme>('classic');

  const handleDownloadCertificate = () => {
    const userName = user?.user_metadata?.full_name || user?.email || 'Participant';
    downloadCertificatePDF({
      userName,
      assessmentType,
      scenario: assessmentTitle,
      completionDate: new Date().toLocaleDateString(),
      theme: selectedTheme
    });
    
    toast({
      title: "Certificate Downloaded!",
      description: "Your certificate has been saved to your device.",
    });
  };

  const handleEmailCertificate = async () => {
    if (!user?.email) {
      toast({
        title: "Email Required",
        description: "Please sign in to email your certificate.",
        variant: "destructive",
      });
      return;
    }

    setIsSendingEmail(true);
    try {
      const { error } = await supabase.functions.invoke('send-results-email', {
        body: {
          email: user.email,
          userName: user.user_metadata?.full_name || user.email,
          assessmentType,
          scenario: assessmentTitle,
          resultType: 'completed',
        },
      });

      if (error) throw error;

      toast({
        title: "Certificate Sent!",
        description: "Check your email for your certificate and results.",
      });
    } catch (error) {
      console.error('Error sending certificate email:', error);
      toast({
        title: "Failed to Send",
        description: "Unable to send certificate. Please try downloading instead.",
        variant: "destructive",
      });
    } finally {
      setIsSendingEmail(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-sacred/10 flex items-center justify-center">
              <Award className="w-6 h-6 text-sacred" />
            </div>
            <div>
              <DialogTitle className="text-2xl">Assessment Complete! 🎉</DialogTitle>
              <DialogDescription className="text-base mt-1">
                Congratulations on completing the {assessmentTitle}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Card className="border-sacred/20 bg-gradient-to-br from-sacred/5 to-transparent">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <Award className="w-8 h-8 text-sacred" />
              <div>
                <h3 className="font-semibold text-lg">Your Certificate is Ready</h3>
                <p className="text-sm text-muted-foreground">
                  Choose a theme and download your completion certificate
                </p>
              </div>
            </div>

            <div className="mb-4">
              <Label className="text-sm font-medium mb-3 block">Certificate Theme</Label>
              <RadioGroup value={selectedTheme} onValueChange={(value) => setSelectedTheme(value as CertificateTheme)}>
                <div className="grid grid-cols-3 gap-3">
                  <Label
                    htmlFor="classic"
                    className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedTheme === 'classic' 
                        ? 'border-sacred bg-sacred/5' 
                        : 'border-border hover:border-sacred/50'
                    }`}
                  >
                    <RadioGroupItem value="classic" id="classic" className="sr-only" />
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-semibold">Classic</p>
                      <p className="text-xs text-muted-foreground">Traditional & Formal</p>
                    </div>
                  </Label>

                  <Label
                    htmlFor="modern"
                    className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedTheme === 'modern' 
                        ? 'border-sacred bg-sacred/5' 
                        : 'border-border hover:border-sacred/50'
                    }`}
                  >
                    <RadioGroupItem value="modern" id="modern" className="sr-only" />
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-600 to-slate-900 flex items-center justify-center">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-semibold">Modern</p>
                      <p className="text-xs text-muted-foreground">Bold & Minimalist</p>
                    </div>
                  </Label>

                  <Label
                    htmlFor="elegant"
                    className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedTheme === 'elegant' 
                        ? 'border-sacred bg-sacred/5' 
                        : 'border-border hover:border-sacred/50'
                    }`}
                  >
                    <RadioGroupItem value="elegant" id="elegant" className="sr-only" />
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-semibold">Elegant</p>
                      <p className="text-xs text-muted-foreground">Sophisticated & Refined</p>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleDownloadCertificate}
                className="flex-1 bg-sacred hover:bg-sacred/90 text-sacred-foreground"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Certificate
              </Button>
              
              <Button
                onClick={handleEmailCertificate}
                disabled={isSendingEmail || !user}
                variant="outline"
                className="flex-1"
              >
                <Share2 className="w-4 h-4 mr-2" />
                {isSendingEmail ? 'Sending...' : 'Email Certificate'}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
            What's Next?
          </h4>
          
          <div className="grid gap-3">
            <Link to="/dashboard" onClick={() => onOpenChange(false)}>
              <Card className="hover:border-sacred/50 transition-colors cursor-pointer">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Home className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-semibold">Return to Dashboard</h5>
                    <p className="text-sm text-muted-foreground">
                      Continue your faith journey
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/study-guide" onClick={() => onOpenChange(false)}>
              <Card className="hover:border-sacred/50 transition-colors cursor-pointer">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-sacred/10 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-sacred" />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-semibold">Explore Study Guides</h5>
                    <p className="text-sm text-muted-foreground">
                      Deepen your understanding with biblical studies
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
