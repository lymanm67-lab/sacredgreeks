import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Headphones, Play, Download, BookOpen, Rss, ExternalLink, Search, X, Clock, RotateCcw } from "lucide-react";
import { useEffect, useState, useMemo, useRef, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface PodcastEpisode {
  title: string;
  description: string;
  pubDate: string;
  rawDate: Date;
  audioUrl: string;
  duration?: string;
}

interface ListeningProgress {
  episode_title: string;
  episode_url: string;
  episode_pub_date: string | null;
  playback_position: number;
  duration: number | null;
  last_played_at: string;
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const Podcast = () => {
  const { user } = useAuth();
  const [episodes, setEpisodes] = useState<PodcastEpisode[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentAudio, setCurrentAudio] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [listeningProgress, setListeningProgress] = useState<ListeningProgress | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const RSS_URL = "https://sacredgreeks.jellypod.ai/rss";

  // Fetch listening progress for signed-in users
  useEffect(() => {
    const fetchListeningProgress = async () => {
      if (!user) {
        setListeningProgress(null);
        return;
      }

      setLoadingProgress(true);
      try {
        const { data, error } = await supabase
          .from('podcast_listening_progress')
          .select('*')
          .eq('user_id', user.id)
          .order('last_played_at', { ascending: false })
          .limit(1)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching listening progress:', error);
        }

        if (data) {
          setListeningProgress({
            episode_title: data.episode_title,
            episode_url: data.episode_url,
            episode_pub_date: data.episode_pub_date,
            playback_position: Number(data.playback_position),
            duration: data.duration ? Number(data.duration) : null,
            last_played_at: data.last_played_at
          });
        }
      } catch (error) {
        console.error('Error fetching listening progress:', error);
      } finally {
        setLoadingProgress(false);
      }
    };

    fetchListeningProgress();
  }, [user]);

  // Fetch RSS feed
  useEffect(() => {
    const fetchRSS = async () => {
      try {
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}`);
        const data = await response.json();
        
        if (data.status === "ok" && data.items) {
          const parsedEpisodes: PodcastEpisode[] = data.items.map((item: any) => {
            const rawDate = new Date(item.pubDate);
            return {
              title: item.title,
              description: item.description?.replace(/<[^>]*>/g, '').slice(0, 200) + '...' || '',
              pubDate: rawDate.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              }),
              rawDate,
              audioUrl: item.enclosure?.link || '',
              duration: item.itunes?.duration || ''
            };
          });
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

  // Save progress to database
  const saveProgress = useCallback(async (
    episodeTitle: string,
    episodeUrl: string,
    episodePubDate: string | null,
    position: number,
    audioDuration: number | null
  ) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('podcast_listening_progress')
        .upsert({
          user_id: user.id,
          episode_title: episodeTitle,
          episode_url: episodeUrl,
          episode_pub_date: episodePubDate,
          playback_position: position,
          duration: audioDuration,
          last_played_at: new Date().toISOString()
        }, {
          onConflict: 'user_id,episode_url'
        });

      if (error) {
        console.error('Error saving progress:', error);
      } else {
        setListeningProgress({
          episode_title: episodeTitle,
          episode_url: episodeUrl,
          episode_pub_date: episodePubDate,
          playback_position: position,
          duration: audioDuration,
          last_played_at: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  }, [user]);

  // Debounced save progress
  const debouncedSaveProgress = useCallback((
    episodeTitle: string,
    episodeUrl: string,
    episodePubDate: string | null,
    position: number,
    audioDuration: number | null
  ) => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    saveTimeoutRef.current = setTimeout(() => {
      saveProgress(episodeTitle, episodeUrl, episodePubDate, position, audioDuration);
    }, 2000);
  }, [saveProgress]);

  const filteredEpisodes = useMemo(() => {
    let filtered = [...episodes];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        ep => ep.title.toLowerCase().includes(query) || 
              ep.description.toLowerCase().includes(query)
      );
    }

    if (dateFilter !== "all") {
      const now = new Date();
      let cutoffDate: Date;

      switch (dateFilter) {
        case "week":
          cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case "month":
          cutoffDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        case "3months":
          cutoffDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
          break;
        case "year":
          cutoffDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
          break;
        default:
          cutoffDate = new Date(0);
      }

      filtered = filtered.filter(ep => ep.rawDate >= cutoffDate);
    }

    return filtered;
  }, [episodes, searchQuery, dateFilter]);

  const handlePlay = (audioUrl: string, episode?: PodcastEpisode) => {
    if (currentAudio === audioUrl) {
      setCurrentAudio(null);
    } else {
      setCurrentAudio(audioUrl);
    }
  };

  const handleContinueListening = () => {
    if (listeningProgress) {
      setCurrentAudio(listeningProgress.episode_url);
    }
  };

  const handleAudioTimeUpdate = (episode: PodcastEpisode) => {
    if (!audioRef.current || !user) return;
    
    const position = audioRef.current.currentTime;
    const duration = audioRef.current.duration;
    
    debouncedSaveProgress(
      episode.title,
      episode.audioUrl,
      episode.pubDate,
      position,
      isNaN(duration) ? null : duration
    );
  };

  const handleAudioLoadedMetadata = (episode: PodcastEpisode) => {
    if (!audioRef.current) return;
    
    // If this is the continue listening episode, seek to saved position
    if (listeningProgress && 
        listeningProgress.episode_url === episode.audioUrl && 
        listeningProgress.playback_position > 0) {
      audioRef.current.currentTime = listeningProgress.playback_position;
    }
  };

  const handleAudioPause = (episode: PodcastEpisode) => {
    if (!audioRef.current || !user) return;
    
    // Clear debounce and save immediately on pause
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    
    const position = audioRef.current.currentTime;
    const duration = audioRef.current.duration;
    
    saveProgress(
      episode.title,
      episode.audioUrl,
      episode.pubDate,
      position,
      isNaN(duration) ? null : duration
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setDateFilter("all");
  };

  const currentEpisode = episodes.find(ep => ep.audioUrl === currentAudio);
  const progressPercentage = listeningProgress?.duration 
    ? (listeningProgress.playback_position / listeningProgress.duration) * 100 
    : 0;

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

          {/* Continue Listening Section - Only for signed-in users with progress */}
          {user && listeningProgress && listeningProgress.playback_position > 5 && (
            <Card className="border-2 border-sacred/30 bg-gradient-to-r from-sacred/5 to-sacred/10">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <RotateCcw className="w-5 h-5 text-sacred" />
                  Continue Listening
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">{listeningProgress.episode_title}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <Clock className="w-4 h-4" />
                      <span>
                        {formatTime(listeningProgress.playback_position)}
                        {listeningProgress.duration && ` / ${formatTime(listeningProgress.duration)}`}
                      </span>
                    </div>
                    {listeningProgress.duration && (
                      <Progress value={progressPercentage} className="mt-2 h-1.5" />
                    )}
                  </div>
                  <Button 
                    onClick={handleContinueListening}
                    className="bg-sacred hover:bg-sacred/90 text-sacred-foreground shrink-0"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Resume
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Sign in prompt for non-authenticated users */}
          {!user && (
            <Card className="border border-muted bg-muted/30">
              <CardContent className="py-4">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Sign in to save your listening progress and continue where you left off
                    </p>
                  </div>
                  <Link to="/auth">
                    <Button variant="outline" size="sm">
                      Sign In
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Podcast Player */}
          <Card className="border-2 border-sacred/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Headphones className="w-5 h-5 text-sacred" />
                Episodes
              </CardTitle>
              <CardDescription>
                Listen to study guide sessions, teachings, and discussions
              </CardDescription>
              
              {/* Search and Filter Controls */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search episodes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-9"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All time</SelectItem>
                    <SelectItem value="week">Last 7 days</SelectItem>
                    <SelectItem value="month">Last 30 days</SelectItem>
                    <SelectItem value="3months">Last 3 months</SelectItem>
                    <SelectItem value="year">Last year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Active filters indicator */}
              {(searchQuery || dateFilter !== "all") && (
                <div className="flex items-center gap-2 pt-2">
                  <span className="text-sm text-muted-foreground">
                    Showing {filteredEpisodes.length} of {episodes.length} episodes
                  </span>
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="h-auto py-1 px-2 text-xs">
                    Clear filters
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-pulse text-muted-foreground">
                    Loading podcast episodes...
                  </div>
                </div>
              ) : filteredEpisodes.length > 0 ? (
                <div className="space-y-4">
                  {filteredEpisodes.map((episode, index) => (
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
                              onClick={() => handlePlay(episode.audioUrl, episode)}
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
                            ref={audioRef}
                            controls 
                            autoPlay
                            className="w-full"
                            src={episode.audioUrl}
                            onTimeUpdate={() => handleAudioTimeUpdate(episode)}
                            onLoadedMetadata={() => handleAudioLoadedMetadata(episode)}
                            onPause={() => handleAudioPause(episode)}
                            onEnded={() => handleAudioPause(episode)}
                          >
                            Your browser does not support the audio element.
                          </audio>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : episodes.length > 0 ? (
                <div className="text-center py-12">
                  <Search className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">No episodes match your search criteria</p>
                  <Button variant="outline" onClick={clearFilters}>
                    Clear filters
                  </Button>
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
