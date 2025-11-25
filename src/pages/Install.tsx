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
            <Card className="border-blue-500/20 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <Share2 className="w-5 h-5 text-white" />
                  </div>
                  iPhone Installation
                </CardTitle>
                <CardDescription>Step-by-step guide for Safari browser</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ol className="space-y-4">
                  <li className="flex gap-4 items-start">
                    <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white font-bold text-sm">
                      1
                    </span>
                    <div className="flex-1 pt-1">
                      <p className="font-semibold mb-1">Open in Safari</p>
                      <p className="text-sm text-muted-foreground">
                        Navigate to <span className="font-mono bg-muted px-2 py-0.5 rounded">www.sacredgreekslife.com</span> in Safari browser
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white font-bold text-sm">
                      2
                    </span>
                    <div className="flex-1 pt-1">
                      <p className="font-semibold mb-1 flex items-center gap-2">
                        Tap Share Button
                        <Share2 className="w-4 h-4 text-blue-500" />
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Tap the Share button at the bottom of your screen (square icon with arrow pointing up)
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white font-bold text-sm">
                      3
                    </span>
                    <div className="flex-1 pt-1">
                      <p className="font-semibold mb-1">Add to Home Screen</p>
                      <p className="text-sm text-muted-foreground">
                        Scroll down the share menu and tap "Add to Home Screen"
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white font-bold text-sm">
                      4
                    </span>
                    <div className="flex-1 pt-1">
                      <p className="font-semibold mb-1">Confirm Installation</p>
                      <p className="text-sm text-muted-foreground">
                        Tap "Add" in the top right corner. The Sacred Greeks icon will appear on your home screen!
                      </p>
                    </div>
                  </li>
                </ol>
                <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-lg p-3">
                  <p className="text-xs text-blue-900 dark:text-blue-100">
                    <strong>💡 Pro Tip:</strong> Long-press the app icon after installing to access quick shortcuts to Daily Devotional, Prayer Journal, and New Assessment!
                  </p>
                </div>
                <div className="pt-2 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    <strong>Important:</strong> Safari browser required. Installation from Chrome or other browsers is not supported on iOS.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Android Instructions */}
            <Card className="border-green-500/20 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                    <Chrome className="w-5 h-5 text-white" />
                  </div>
                  Android Installation
                </CardTitle>
                <CardDescription>Step-by-step guide for Chrome browser</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ol className="space-y-4">
                  <li className="flex gap-4 items-start">
                    <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-green-600 text-white font-bold text-sm">
                      1
                    </span>
                    <div className="flex-1 pt-1">
                      <p className="font-semibold mb-1">Open in Chrome</p>
                      <p className="text-sm text-muted-foreground">
                        Navigate to <span className="font-mono bg-muted px-2 py-0.5 rounded">www.sacredgreekslife.com</span> in Chrome browser
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-green-600 text-white font-bold text-sm">
                      2
                    </span>
                    <div className="flex-1 pt-1">
                      <p className="font-semibold mb-1 flex items-center gap-2">
                        Open Menu
                        <MoreVertical className="w-4 h-4" />
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Tap the three-dot menu button in the top right corner of Chrome
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-green-600 text-white font-bold text-sm">
                      3
                    </span>
                    <div className="flex-1 pt-1">
                      <p className="font-semibold mb-1 flex items-center gap-2">
                        Install App
                        <Download className="w-4 h-4" />
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Look for "Install App" or "Add to Home Screen" in the menu and tap it
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-green-600 text-white font-bold text-sm">
                      4
                    </span>
                    <div className="flex-1 pt-1">
                      <p className="font-semibold mb-1">Confirm Installation</p>
                      <p className="text-sm text-muted-foreground">
                        Tap "Install" in the popup. The Sacred Greeks icon will appear on your home screen!
                      </p>
                    </div>
                  </li>
                </ol>
                <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 rounded-lg p-3">
                  <p className="text-xs text-green-900 dark:text-green-100">
                    <strong>💡 Alternative:</strong> Some Android phones show an install banner automatically when you visit the site. Just tap "Install" if you see it!
                  </p>
                </div>
                <div className="pt-2 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    <strong>Note:</strong> Works with Chrome, Edge, Samsung Internet, and other Chromium-based browsers.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Troubleshooting Section */}
          <Card className="border-amber-500/20 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">Troubleshooting</CardTitle>
              <CardDescription>Having issues? Here are some common solutions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="border-l-4 border-sacred pl-4">
                  <h4 className="font-semibold mb-1.5">Don't see "Add to Home Screen"?</h4>
                  <p className="text-sm text-muted-foreground">
                    Make sure you're using the correct browser: Safari on iPhone or Chrome on Android. Other browsers may not support app installation.
                  </p>
                </div>
                <div className="border-l-4 border-sacred pl-4">
                  <h4 className="font-semibold mb-1.5">App not working offline?</h4>
                  <p className="text-sm text-muted-foreground">
                    Open the app while connected to internet first. It will automatically download content for offline use. Visit a few pages while online to cache them.
                  </p>
                </div>
                <div className="border-l-4 border-sacred pl-4">
                  <h4 className="font-semibold mb-1.5">How do I uninstall the app?</h4>
                  <p className="text-sm text-muted-foreground">
                    Just long-press the app icon on your home screen and select "Remove App" (iPhone) or "Uninstall" (Android), like any other app.
                  </p>
                </div>
                <div className="border-l-4 border-sacred pl-4">
                  <h4 className="font-semibold mb-1.5">App looks different from the website?</h4>
                  <p className="text-sm text-muted-foreground">
                    The installed app runs in full-screen mode without browser UI. This is normal and provides a better app experience!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

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
