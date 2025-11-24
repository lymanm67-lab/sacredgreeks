import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Headphones, Play, Download, BookOpen } from "lucide-react";
import { useEffect, useState } from "react";

const Podcast = () => {
  const [podcastLoaded, setPodcastLoaded] = useState(false);

  useEffect(() => {
    // Load Buzzsprout embed script
    const script = document.createElement("script");
    script.src = "https://www.buzzsprout.com/2533260.js?container_id=buzzsprout-large-player&player=large";
    script.async = true;
    script.onload = () => setPodcastLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/30 to-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/study">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Study Guide
              </Button>
            </Link>
            <Badge className="bg-sacred/10 text-sacred hover:bg-sacred/20 border-sacred/20" variant="outline">
              Audio Study Guide
            </Badge>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Title Section */}
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center mb-4 bg-sacred/10 rounded-full p-4">
              <Headphones className="w-12 h-12 text-sacred" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Sacred Greeks <span className="text-sacred">Podcast</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Listen to the Sacred, Not Sinful study guide sessions on the go. Perfect for commutes, workouts, or whenever you want to learn while multitasking.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Play className="w-5 h-5 text-sacred" />
                <span>Stream episodes</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Download className="w-5 h-5 text-sacred" />
                <span>Download for offline</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <BookOpen className="w-5 h-5 text-sacred" />
                <span>Study guide companion</span>
              </div>
            </div>
          </div>

          {/* Podcast Player */}
          <Card className="border-2 border-sacred/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Headphones className="w-5 h-5 text-sacred" />
                Latest Episodes
              </CardTitle>
              <CardDescription>
                Listen to study guide sessions, teachings, and discussions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Buzzsprout Player Container */}
              <div 
                id="buzzsprout-large-player"
                className="min-h-[400px] w-full"
              />
              
              {!podcastLoaded && (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-pulse text-muted-foreground">
                    Loading podcast player...
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Subscribe Section */}
          <Card className="bg-gradient-to-br from-sacred/5 to-sacred/10 border-sacred/20">
            <CardHeader>
              <CardTitle>Subscribe & Follow</CardTitle>
              <CardDescription>
                Never miss an episode - subscribe on your favorite podcast platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Get new episodes automatically delivered to your device. Subscribe on:
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <a
                  href="https://podcasts.apple.com/podcast/id-needed"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button variant="outline" className="w-full">
                    Apple Podcasts
                  </Button>
                </a>
                <a
                  href="https://open.spotify.com/show/id-needed"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button variant="outline" className="w-full">
                    Spotify
                  </Button>
                </a>
                <a
                  href="https://www.buzzsprout.com/2533260"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button variant="outline" className="w-full">
                    Buzzsprout
                  </Button>
                </a>
              </div>

              <div className="bg-background/50 rounded-lg p-4 mt-6">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Tip:</strong> Combine the audio sessions with the written study guide for a complete learning experience. Listen to episodes first, then dive deeper with the written questions and reflections.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* CTA Back to Study Guide */}
          <Card className="border-sacred/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="text-xl font-bold mb-1">Continue Your Study Journey</h3>
                  <p className="text-muted-foreground">
                    Access the full written study guide with discussion questions and personal notes
                  </p>
                </div>
                <Link to="/study">
                  <Button className="bg-sacred hover:bg-sacred/90 text-sacred-foreground">
                    <BookOpen className="w-4 h-4 mr-2" />
                    View Study Guide
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm text-muted-foreground">
              Based on "Sacred, Not Sinful" by Dr. Lyman • <Link to="/" className="text-sacred hover:underline">SacredGreeks.com</Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Podcast;
