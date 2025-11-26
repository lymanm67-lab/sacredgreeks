import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Download, Share2, Smartphone } from 'lucide-react';
import QRCode from 'react-qr-code';
import { useToast } from '@/hooks/use-toast';
import logo from '@/assets/sacred-greeks-logo.png';

const QRCodePage = () => {
  const { toast } = useToast();
  const qrRef = useRef<HTMLDivElement>(null);
  const appUrl = 'https://www.sacredgreekslife.com';

  const handleDownload = async () => {
    if (!qrRef.current) return;

    try {
      // Get the SVG element
      const svg = qrRef.current.querySelector('svg');
      if (!svg) return;

      // Convert SVG to canvas
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const svgData = new XMLSerializer().serializeToString(svg);
      const img = new Image();
      
      canvas.width = 1200;
      canvas.height = 1400;

      img.onload = () => {
        if (!ctx) return;
        
        // White background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Add gradient header
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 200);
        gradient.addColorStop(0, '#2563eb');
        gradient.addColorStop(1, '#7c3aed');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, 200);

        // Title
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 60px system-ui, -apple-system, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Sacred Greeks Life', canvas.width / 2, 120);

        // Draw QR code
        const qrSize = 600;
        const qrX = (canvas.width - qrSize) / 2;
        const qrY = 250;
        ctx.drawImage(img, qrX, qrY, qrSize, qrSize);

        // Instructions
        ctx.fillStyle = '#1f2937';
        ctx.font = 'bold 40px system-ui, -apple-system, sans-serif';
        ctx.fillText('Scan to Get the App', canvas.width / 2, 920);

        ctx.font = '32px system-ui, -apple-system, sans-serif';
        ctx.fillStyle = '#6b7280';
        ctx.fillText('Daily devotionals • Prayer tools • Community support', canvas.width / 2, 980);

        // URL
        ctx.font = '28px system-ui, -apple-system, sans-serif';
        ctx.fillStyle = '#2563eb';
        ctx.fillText(appUrl, canvas.width / 2, 1050);

        // Download
        canvas.toBlob((blob) => {
          if (!blob) return;
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'sacred-greeks-qr-code.png';
          link.click();
          URL.revokeObjectURL(url);

          toast({
            title: 'QR Code Downloaded',
            description: 'You can now add this to your website or print materials',
          });
        });
      };

      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    } catch (error) {
      console.error('Error downloading QR code:', error);
      toast({
        title: 'Error',
        description: 'Failed to download QR code',
        variant: 'destructive',
      });
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Sacred Greeks Life App',
          text: 'Check out the Sacred Greeks Life app - daily devotionals, prayer tools, and community support for Christians in Greek life!',
          url: appUrl,
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(appUrl);
      toast({
        title: 'Link Copied',
        description: 'App URL copied to clipboard',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/30 to-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center mb-4 bg-sacred/10 rounded-full p-4">
              <Smartphone className="w-12 h-12 text-sacred" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Share the <span className="text-sacred">Sacred Greeks Life</span> App
            </h1>
            <p className="text-xl text-muted-foreground">
              Download or share this QR code to help others discover the app
            </p>
          </div>

          {/* QR Code Card */}
          <Card className="border-2">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Scan to Install</CardTitle>
              <CardDescription>
                Works on all phones - iPhone and Android
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* QR Code */}
              <div 
                ref={qrRef}
                className="flex flex-col items-center justify-center p-8 bg-white rounded-lg mx-auto max-w-md"
              >
                <div className="mb-4">
                  <img src={logo} alt="Sacred Greeks" className="h-12 w-auto" />
                </div>
                <QRCode 
                  value={appUrl}
                  size={256}
                  level="H"
                  className="w-full max-w-[300px] h-auto"
                />
                <p className="mt-4 text-center font-medium text-gray-800">
                  Sacred Greeks Life
                </p>
                <p className="text-sm text-gray-600">
                  {appUrl}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  onClick={handleDownload}
                  className="bg-sacred hover:bg-sacred/90"
                  size="lg"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download QR Code
                </Button>
                <Button 
                  onClick={handleShare}
                  variant="outline"
                  size="lg"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Link
                </Button>
              </div>

              {/* Instructions */}
              <div className="bg-muted/50 rounded-lg p-6 space-y-4">
                <h3 className="font-semibold text-lg">How to Use This QR Code:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-sacred">1.</span>
                    <span>Download the QR code image using the button above</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-sacred">2.</span>
                    <span>Add it to your website, social media, or print materials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-sacred">3.</span>
                    <span>People can scan it with their phone camera to instantly open the app</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-sacred">4.</span>
                    <span>They can then install it to their home screen for easy access</span>
                  </li>
                </ul>
              </div>

              {/* Perfect for Section */}
              <div className="border-t pt-6">
                <h3 className="font-semibold text-lg mb-4">Perfect For:</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2 text-sm">
                    <span>✅</span>
                    <span>Adding to sacredgreeks.com</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <span>✅</span>
                    <span>Social media posts</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <span>✅</span>
                    <span>Chapter presentations</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <span>✅</span>
                    <span>Email signatures</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <span>✅</span>
                    <span>Printed flyers</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <span>✅</span>
                    <span>Event materials</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Direct Link Card */}
          <Card className="mt-6 bg-gradient-to-br from-sacred/5 to-sacred/10 border-sacred/20">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <h3 className="font-semibold text-lg">Direct Link to App</h3>
                <div className="flex items-center gap-2 bg-white dark:bg-gray-900 p-4 rounded-lg">
                  <code className="flex-1 text-sm font-mono text-left">{appUrl}</code>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(appUrl);
                      toast({
                        title: 'Copied!',
                        description: 'Link copied to clipboard',
                      });
                    }}
                  >
                    Copy
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default QRCodePage;
