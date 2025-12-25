import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Headphones, Play, Download, BookOpen, Rss, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

interface PodcastEpisode {
  title: string;
  description: string;
  pubDate: string;
  audioUrl: string;
  duration?: string;
}

const Podcast = () => {
  const [episodes, setEpisodes] = useState<PodcastEpisode[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentAudio, setCurrentAudio] = useState<string | null>(null);

  const RSS_URL = "https://sacredgreeks.jellypod.ai/rss";

  useEffect(() => {
    const fetchRSS = async () => {
      try {
        // Use a CORS proxy or fetch directly if allowed
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}`);
        const data = await response.json();
        
        if (data.status === "ok" && data.items) {
          const parsedEpisodes: PodcastEpisode[] = data.items.map((item: any) => ({
            title: item.title,
            description: item.description?.replace(/<[^>]*>/g, '').slice(0, 200) + '...' || '',
            pubDate: new Date(item.pubDate).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            }),
            audioUrl: item.enclosure?.link || '',
            duration: item.itunes?.duration || ''
          }));
          setEpisodes(parsedEpisodes);
        }
      } catch (error) {
        console.error("Error fetching RSS:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRSS();
  }, []);

  const handlePlay = (audioUrl: string) => {
    setCurrentAudio(currentAudio === audioUrl ? null : audioUrl);
  };

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
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-pulse text-muted-foreground">
                    Loading podcast episodes...
                  </div>
                </div>
              ) : episodes.length > 0 ? (
                <div className="space-y-4">
                  {episodes.map((episode, index) => (
                    <div 
                      key={index}
                      className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground mb-1">{episode.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{episode.description}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>{episode.pubDate}</span>
                            {episode.duration && <span>{episode.duration}</span>}
                          </div>
                        </div>
                        {episode.audioUrl && (
                          <div className="flex items-center gap-2">
                            <Button 
                              size="sm" 
                              variant={currentAudio === episode.audioUrl ? "default" : "outline"}
                              onClick={() => handlePlay(episode.audioUrl)}
                              title="Play episode"
                            >
                              <Play className="w-4 h-4" />
                            </Button>
                            <a 
                              href={episode.audioUrl} 
                              download
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Button 
                                size="sm" 
                                variant="outline"
                                title="Download for offline listening"
                              >
                                <Download className="w-4 h-4" />
                              </Button>
                            </a>
                          </div>
                        )}
                      </div>
                      
                      {currentAudio === episode.audioUrl && episode.audioUrl && (
                        <div className="mt-4">
                          <audio 
                            controls 
                            autoPlay
                            className="w-full"
                            src={episode.audioUrl}
                          >
                            Your browser does not support the audio element.
                          </audio>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">Episodes loading or coming soon!</p>
                  <a 
                    href={RSS_URL} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" className="gap-2">
                      <Rss className="w-4 h-4" />
                      View RSS Feed
                    </Button>
                  </a>
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
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <a
                  href="https://sacredgreeks.jellypod.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button variant="outline" className="w-full gap-2">
                    <ExternalLink className="w-4 h-4" />
                    Jellypod
                  </Button>
                </a>
                <a
                  href={RSS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button variant="outline" className="w-full gap-2">
                    <Rss className="w-4 h-4" />
                    RSS Feed
                  </Button>
                </a>
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
