import { Link } from 'react-router-dom';
import QRCode from 'react-qr-code';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Smartphone, Download, Share2, Home, MoreVertical, Chrome, ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Install = () => {
  const appUrl = window.location.origin;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/30 to-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-semibold">Back to Home</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4 animate-fade-in">
            <Badge className="bg-sacred/10 text-sacred border-sacred/20">
              <Smartphone className="w-3 h-3 mr-1" />
              Progressive Web App
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-sacred to-warm-blue bg-clip-text text-transparent">
              Install Sacred Greeks
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get the full app experience on your phone. Install Sacred Greeks as a Progressive Web App 
              for offline access, push notifications, and a native app feel.
            </p>
          </div>

          {/* QR Code Section */}
          <Card className="border-sacred/20 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <Smartphone className="w-5 h-5 text-sacred" />
                Quick Install with QR Code
              </CardTitle>
              <CardDescription>
                Scan this code with your phone's camera to open the app instantly
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-6">
              <div className="bg-white p-6 rounded-lg shadow-inner">
                <QRCode
                  value={appUrl}
                  size={256}
                  level="M"
                />
              </div>
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  Point your phone's camera at the QR code above
                </p>
                <p className="text-xs text-muted-foreground font-mono bg-muted px-3 py-1.5 rounded inline-block">
                  {appUrl}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Installation Instructions */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* iPhone Instructions */}
            <Card className="border-blue-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-blue-500" />
                  Install on iPhone/iPad
                </CardTitle>
                <CardDescription>Using Safari browser</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ol className="space-y-3 text-sm">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-500/10 text-blue-500 font-semibold text-xs">
                      1
                    </span>
                    <span>Open <strong>{appUrl}</strong> in Safari</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-500/10 text-blue-500 font-semibold text-xs">
                      2
                    </span>
                    <span>Tap the <Share2 className="w-4 h-4 inline" /> Share button at the bottom of the screen</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-500/10 text-blue-500 font-semibold text-xs">
                      3
                    </span>
                    <span>Scroll down and tap <strong>"Add to Home Screen"</strong></span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-500/10 text-blue-500 font-semibold text-xs">
                      4
                    </span>
                    <span>Tap <strong>"Add"</strong> in the top right corner</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-500/10 text-blue-500 font-semibold text-xs">
                      5
                    </span>
                    <span>The app icon will appear on your home screen!</span>
                  </li>
                </ol>
                <div className="pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    <strong>Note:</strong> You must use Safari browser. Installation from Chrome or other browsers is not supported on iOS.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Android Instructions */}
            <Card className="border-green-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Chrome className="w-5 h-5 text-green-500" />
                  Install on Android
                </CardTitle>
                <CardDescription>Using Chrome or other browsers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ol className="space-y-3 text-sm">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-green-500/10 text-green-500 font-semibold text-xs">
                      1
                    </span>
                    <span>Open <strong>{appUrl}</strong> in Chrome</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-green-500/10 text-green-500 font-semibold text-xs">
                      2
                    </span>
                    <span>Tap the <MoreVertical className="w-4 h-4 inline" /> menu icon (three dots) in the top right</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-green-500/10 text-green-500 font-semibold text-xs">
                      3
                    </span>
                    <span>Select <strong>"Add to Home screen"</strong> or <strong>"Install app"</strong></span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-green-500/10 text-green-500 font-semibold text-xs">
                      4
                    </span>
                    <span>Confirm by tapping <strong>"Add"</strong> or <strong>"Install"</strong></span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-green-500/10 text-green-500 font-semibold text-xs">
                      5
                    </span>
                    <span>The app will be added to your home screen!</span>
                  </li>
                </ol>
                <div className="pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    <strong>Tip:</strong> Some Android browsers may show an automatic install banner at the bottom of the page.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Benefits Section */}
          <Card className="bg-gradient-to-br from-sacred/5 to-warm-blue/5 border-sacred/20">
            <CardHeader>
              <CardTitle>Why Install as an App?</CardTitle>
              <CardDescription>
                Get the best experience with these PWA features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-sacred/10 flex items-center justify-center">
                    <Download className="w-5 h-5 text-sacred" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Offline Access</h3>
                    <p className="text-sm text-muted-foreground">
                      Access your prayers, devotionals, and assessments even without internet
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-sacred/10 flex items-center justify-center">
                    <Home className="w-5 h-5 text-sacred" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Home Screen Icon</h3>
                    <p className="text-sm text-muted-foreground">
                      Quick access with a dedicated icon, just like a native app
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-sacred/10 flex items-center justify-center">
                    <Smartphone className="w-5 h-5 text-sacred" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Full Screen</h3>
                    <p className="text-sm text-muted-foreground">
                      Opens in full screen without browser UI for immersive experience
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-sacred/10 flex items-center justify-center">
                    <Download className="w-5 h-5 text-sacred" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Fast Loading</h3>
                    <p className="text-sm text-muted-foreground">
                      Cached resources load instantly for better performance
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">
              Already installed? Open the app from your home screen
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/">
                <Button variant="outline" size="lg">
                  <Home className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <Link to="/auth">
                <Button className="bg-sacred hover:bg-sacred/90 text-sacred-foreground" size="lg">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Install;
