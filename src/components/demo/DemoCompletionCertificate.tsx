import React, { useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  X, 
  Download, 
  Share2, 
  Award, 
  Calendar,
  CheckCircle2,
  Copy,
  Linkedin,
  Twitter,
  Facebook
} from 'lucide-react';
import { OnboardingTemplate } from '@/data/demoOnboardingTemplates';
import { DemoPersona } from '@/data/demoUserPersonas';
import { exportToImage, exportToPDF } from '@/lib/demo-export';
import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface DemoCompletionCertificateProps {
  template: OnboardingTemplate;
  persona?: DemoPersona | null;
  completedAt: Date;
  onClose: () => void;
}

export function DemoCompletionCertificate({ 
  template, 
  persona, 
  completedAt, 
  onClose 
}: DemoCompletionCertificateProps) {
  const certificateRef = useRef<HTMLDivElement>(null);
  const [recipientName, setRecipientName] = useState(persona?.displayName || 'Demo User');
  const [isExporting, setIsExporting] = useState(false);

  const handleDownloadPNG = async () => {
    if (!certificateRef.current) return;
    setIsExporting(true);
    try {
      await exportToImage(certificateRef.current, { filename: `certificate-${template.id}`, format: 'png' });
      toast({
        title: 'Certificate Downloaded',
        description: 'Your certificate has been saved as a PNG image.',
      });
    } catch (err) {
      toast({
        title: 'Export Failed',
        description: 'Failed to download certificate.',
        variant: 'destructive',
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!certificateRef.current) return;
    setIsExporting(true);
    try {
      await exportToPDF(certificateRef.current, { filename: `certificate-${template.id}` });
      toast({
        title: 'Certificate Downloaded',
        description: 'Your certificate has been saved as a PDF.',
      });
    } catch (err) {
      toast({
        title: 'Export Failed',
        description: 'Failed to download certificate.',
        variant: 'destructive',
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyLink = () => {
    const shareUrl = `${window.location.origin}?demo=true&template=${template.id}&completed=true`;
    navigator.clipboard.writeText(shareUrl);
    toast({
      title: 'Link Copied',
      description: 'Certificate link copied to clipboard.',
    });
  };

  const handleSocialShare = (platform: 'twitter' | 'linkedin' | 'facebook') => {
    const message = `I just completed the "${template.name}" training on Sacred Greeks! 🎉`;
    const url = `${window.location.origin}?demo=true&template=${template.id}`;
    
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(message)}`,
    };

    window.open(urls[platform], '_blank', 'width=600,height=400');
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm overflow-auto">
      <div className="container max-w-3xl mx-auto py-6 px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Award className="h-6 w-6 text-amber-500" />
              Completion Certificate
            </h2>
            <p className="text-muted-foreground">
              Congratulations on completing the training!
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Name Input */}
        <div className="mb-6">
          <Label htmlFor="recipient-name">Recipient Name</Label>
          <Input
            id="recipient-name"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            placeholder="Enter your name"
            className="max-w-sm mt-1"
          />
        </div>

        {/* Certificate Preview */}
        <div 
          ref={certificateRef}
          className="bg-gradient-to-br from-amber-50 via-white to-emerald-50 dark:from-amber-950/30 dark:via-background dark:to-emerald-950/30 border-4 border-double border-amber-400 dark:border-amber-600 rounded-lg p-8 mb-6 relative overflow-hidden"
        >
          {/* Watermark Pattern */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]">
            <div className="absolute inset-0 flex items-center justify-center transform -rotate-45">
              <div className="text-center space-y-8">
                {[...Array(5)].map((_, i) => (
                  <p key={i} className="text-lg font-bold text-black dark:text-white whitespace-nowrap">
                    Sacred Greeks™ • PROPRIETARY • Sacred Greeks™ • PROPRIETARY • Sacred Greeks™
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Decorative corners */}
          <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-amber-400 dark:border-amber-600" />
          <div className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2 border-amber-400 dark:border-amber-600" />
          <div className="absolute bottom-4 left-4 w-12 h-12 border-l-2 border-b-2 border-amber-400 dark:border-amber-600" />
          <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-amber-400 dark:border-amber-600" />

          <div className="text-center space-y-4 relative z-10">
            {/* Logo/Icon */}
            <div className="flex justify-center">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-amber-400 to-emerald-500 flex items-center justify-center">
                <Award className="h-10 w-10 text-white" />
              </div>
            </div>

            {/* Title */}
            <div>
              <p className="text-sm uppercase tracking-widest text-muted-foreground">
                Certificate of Completion
              </p>
              <h3 className="text-3xl font-serif font-bold text-foreground mt-2">
                Sacred Greeks™
              </h3>
            </div>

            {/* Recipient */}
            <div className="py-4">
              <p className="text-muted-foreground">This is to certify that</p>
              <p className="text-2xl font-bold text-foreground mt-1">
                {recipientName}
              </p>
            </div>

            {/* Training Details */}
            <div className="py-4 border-y border-amber-200 dark:border-amber-800">
              <p className="text-muted-foreground">has successfully completed the</p>
              <p className="text-xl font-semibold text-foreground mt-1 flex items-center justify-center gap-2">
                <span className="text-2xl">{template.icon}</span>
                {template.name}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                {template.description}
              </p>
            </div>

            {/* Stats */}
            <div className="flex justify-center gap-6 py-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  {template.tourSteps.length}
                </p>
                <p className="text-xs text-muted-foreground">Steps Completed</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                  100%
                </p>
                <p className="text-xs text-muted-foreground">Completion Rate</p>
              </div>
            </div>

            {/* Date */}
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Completed on {format(completedAt, 'MMMM d, yyyy')}</span>
            </div>

            {/* Verification Badge */}
            <div className="pt-4">
              <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Verified Completion
              </Badge>
            </div>

            {/* Proprietary Notice */}
            <div className="pt-4 text-xs text-muted-foreground/60">
              <p>© {new Date().getFullYear()} Sacred Greeks™ • Dr. Lyman Montgomery</p>
              <p>Proprietary Content • All Rights Reserved</p>
            </div>
          </div>
        </div>

        {/* Export Actions */}
        <Card>
          <CardContent className="p-4">
            <h4 className="font-medium mb-3">Share Your Achievement</h4>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleDownloadPNG}
                disabled={isExporting}
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                Download PNG
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleDownloadPDF}
                disabled={isExporting}
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleCopyLink}
                className="gap-2"
              >
                <Copy className="h-4 w-4" />
                Copy Link
              </Button>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSocialShare('twitter')}
                className="gap-2"
              >
                <Twitter className="h-4 w-4" />
                Twitter
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSocialShare('linkedin')}
                className="gap-2"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSocialShare('facebook')}
                className="gap-2"
              >
                <Facebook className="h-4 w-4" />
                Facebook
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Close Button */}
        <div className="flex justify-end mt-6">
          <Button onClick={onClose}>Done</Button>
        </div>
      </div>
    </div>
  );
}
