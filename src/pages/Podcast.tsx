import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Headphones, Play, Download, BookOpen, Rss, ExternalLink, Search, X, Clock, RotateCcw, Mic } from "lucide-react";
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

  // Sacred Greeks Podcast RSS Feed
  const RSS_URL = "https://sacredgreeks.jellypod.ai/rss";
  const WEBINAR_REGISTRATION_URL = "https://event.webinarjam.com/nkygr/register/97165cgr";

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

  // Get first episode as featured sample
  const featuredEpisode = episodes[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-950/20 via-background to-background">
      {/* Header */}
      <header className="border-b border-purple-500/20 bg-gradient-to-r from-purple-900/10 via-card/80 to-sacred/10 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/study">
              <Button variant="ghost" size="sm" className="hover:bg-purple-500/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Study Guide
              </Button>
            </Link>
            <Badge className="bg-gradient-to-r from-purple-500/20 to-sacred/20 text-purple-300 hover:from-purple-500/30 hover:to-sacred/30 border-purple-500/30" variant="outline">
              🎙️ Audio Study Guide
            </Badge>
          </div>
        </div>
      </header>

      {/* Hero Section with colorful gradient background */}
      <div className="relative overflow-hidden">
        {/* Animated background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-20 -left-20 w-60 h-60 bg-sacred/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-fuchsia-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
        </div>

        <div className="container mx-auto px-4 py-12 relative z-10">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Title Section */}
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center mb-4 bg-gradient-to-br from-purple-500/30 to-sacred/30 rounded-full p-5 shadow-lg shadow-purple-500/20 border border-purple-500/20">
                <Headphones className="w-14 h-14 text-purple-300" />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold">
                <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-sacred bg-clip-text text-transparent">Sacred Greeks</span>{" "}
                <span className="text-foreground">Podcast</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Listen to the Sacred, Not Sinful study guide sessions on the go. Perfect for commutes, workouts, or whenever you want to learn while multitasking.
              </p>

              <div className="flex flex-wrap justify-center gap-6 pt-4">
                <div className="flex items-center gap-2 bg-purple-500/10 px-4 py-2 rounded-full border border-purple-500/20">
                  <Play className="w-5 h-5 text-purple-400" />
                  <span className="text-purple-300">Stream episodes</span>
                </div>
                <div className="flex items-center gap-2 bg-sacred/10 px-4 py-2 rounded-full border border-sacred/20">
                  <Download className="w-5 h-5 text-sacred" />
                  <span className="text-sacred">Download for offline</span>
                </div>
                <div className="flex items-center gap-2 bg-fuchsia-500/10 px-4 py-2 rounded-full border border-fuchsia-500/20">
                  <BookOpen className="w-5 h-5 text-fuchsia-400" />
                  <span className="text-fuchsia-300">Study guide companion</span>
                </div>
              </div>
            </div>

            {/* Featured Episode Sample */}
            {featuredEpisode && (
              <Card className="border-2 border-purple-500/30 bg-gradient-to-br from-purple-900/20 via-card to-fuchsia-900/10 shadow-xl shadow-purple-500/10 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-transparent rounded-bl-full" />
                <CardHeader className="relative">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white border-0">
                      ✨ Featured Episode
                    </Badge>
                    <Badge variant="outline" className="border-purple-500/30 text-purple-300">
                      Latest
                    </Badge>
                  </div>
                  <CardTitle className="text-xl text-foreground flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                      <Mic className="w-6 h-6 text-white" />
                    </div>
                    {featuredEpisode.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground mt-2">
                    {featuredEpisode.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-purple-400" />
                        {featuredEpisode.pubDate}
                      </span>
                      {featuredEpisode.duration && (
                        <span className="flex items-center gap-1">
                          <Headphones className="w-4 h-4 text-fuchsia-400" />
                          {featuredEpisode.duration}
                        </span>
                      )}
                    </div>
                    
                    {/* Audio Player Preview */}
                    {currentAudio === featuredEpisode.audioUrl ? (
                      <audio 
                        ref={audioRef}
                        controls 
                        autoPlay
                        className="w-full rounded-lg"
                        src={featuredEpisode.audioUrl}
                        onTimeUpdate={() => handleAudioTimeUpdate(featuredEpisode)}
                        onLoadedMetadata={() => handleAudioLoadedMetadata(featuredEpisode)}
                        onPause={() => handleAudioPause(featuredEpisode)}
                        onEnded={() => handleAudioPause(featuredEpisode)}
                      >
                        Your browser does not support the audio element.
                      </audio>
                    ) : (
                      <div className="flex items-center gap-3">
                        <Button 
                          onClick={() => handlePlay(featuredEpisode.audioUrl, featuredEpisode)}
                          className="bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:from-purple-600 hover:to-fuchsia-600 text-white shadow-lg shadow-purple-500/30"
                        >
                          <Play className="w-5 h-5 mr-2" />
                          Play Sample
                        </Button>
                        <a 
                          href={featuredEpisode.audioUrl} 
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button variant="outline" className="border-purple-500/30 hover:bg-purple-500/10">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </a>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto px-4 pb-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Continue Listening Section - Only for signed-in users with progress */}
          {user && listeningProgress && listeningProgress.playback_position > 5 && (
            <Card className="border-2 border-amber-500/30 bg-gradient-to-r from-amber-900/20 via-card to-orange-900/10 shadow-lg shadow-amber-500/10">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                    <RotateCcw className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-amber-300">Continue Listening</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">{listeningProgress.episode_title}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <Clock className="w-4 h-4 text-amber-400" />
                      <span>
                        {formatTime(listeningProgress.playback_position)}
                        {listeningProgress.duration && ` / ${formatTime(listeningProgress.duration)}`}
                      </span>
                    </div>
                    {listeningProgress.duration && (
                      <Progress value={progressPercentage} className="mt-2 h-1.5 bg-amber-900/30" />
                    )}
                  </div>
                  <Button 
                    onClick={handleContinueListening}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg shadow-amber-500/30 shrink-0"
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
            <Card className="border border-purple-500/20 bg-gradient-to-r from-purple-900/10 to-muted/30">
              <CardContent className="py-4">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <Clock className="w-4 h-4 text-purple-400" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Sign in to save your listening progress and continue where you left off
                    </p>
                  </div>
                  <Link to="/auth">
                    <Button variant="outline" size="sm" className="border-purple-500/30 hover:bg-purple-500/10 text-purple-300">
                      Sign In
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Podcast Player */}
          <Card className="border-2 border-purple-500/20 bg-gradient-to-br from-card via-card to-purple-900/5 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20 flex items-center justify-center border border-purple-500/30">
                  <Headphones className="w-5 h-5 text-purple-400" />
                </div>
                <span>All Episodes</span>
                <Badge variant="outline" className="ml-auto border-purple-500/30 text-purple-300">
                  {episodes.length} episodes
                </Badge>
              </CardTitle>
              <CardDescription>
                Listen to study guide sessions, teachings, and discussions
              </CardDescription>
              
              {/* Search and Filter Controls */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-400" />
                  <Input
                    placeholder="Search episodes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-9 border-purple-500/20 focus:border-purple-500/40 bg-purple-500/5"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-purple-400"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="w-full sm:w-[180px] border-purple-500/20 bg-purple-500/5">
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
                  <span className="text-sm text-purple-300">
                    Showing {filteredEpisodes.length} of {episodes.length} episodes
                  </span>
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="h-auto py-1 px-2 text-xs text-purple-400 hover:text-purple-300 hover:bg-purple-500/10">
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
                  {filteredEpisodes.slice(1).map((episode, index) => (
                    <div 
                      key={index}
                      className="border border-purple-500/20 rounded-xl p-4 hover:bg-purple-500/5 hover:border-purple-500/30 transition-all group"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-fuchsia-500/10 flex items-center justify-center border border-purple-500/20 shrink-0 group-hover:from-purple-500/30 group-hover:to-fuchsia-500/20 transition-colors">
                            <Play className="w-4 h-4 text-purple-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-foreground mb-1 group-hover:text-purple-300 transition-colors">{episode.title}</h3>
                            <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{episode.description}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3 text-purple-400" />
                                {episode.pubDate}
                              </span>
                              {episode.duration && (
                                <span className="flex items-center gap-1">
                                  <Headphones className="w-3 h-3 text-fuchsia-400" />
                                  {episode.duration}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        {episode.audioUrl && (
                          <div className="flex items-center gap-2">
                            <Button 
                              size="sm" 
                              variant={currentAudio === episode.audioUrl ? "default" : "outline"}
                              onClick={() => handlePlay(episode.audioUrl, episode)}
                              title="Play episode"
                              className={currentAudio === episode.audioUrl 
                                ? "bg-gradient-to-r from-purple-500 to-fuchsia-500 border-0" 
                                : "border-purple-500/30 hover:bg-purple-500/10"
                              }
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
                                className="border-purple-500/30 hover:bg-purple-500/10"
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
          <Card className="bg-gradient-to-br from-emerald-900/20 via-card to-teal-900/10 border-2 border-emerald-500/20 shadow-lg shadow-emerald-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <Rss className="w-5 h-5 text-white" />
                </div>
                Subscribe & Follow
              </CardTitle>
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
                  <Button variant="outline" className="w-full gap-2 border-emerald-500/30 hover:bg-emerald-500/10 hover:border-emerald-500/50 transition-all">
                    <ExternalLink className="w-4 h-4 text-emerald-400" />
                    Jellypod
                  </Button>
                </a>
                <a
                  href={RSS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button variant="outline" className="w-full gap-2 border-teal-500/30 hover:bg-teal-500/10 hover:border-teal-500/50 transition-all">
                    <Rss className="w-4 h-4 text-teal-400" />
                    RSS Feed
                  </Button>
                </a>
                <a
                  href="https://podcasts.apple.com/podcast/id-needed"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button variant="outline" className="w-full border-rose-500/30 hover:bg-rose-500/10 hover:border-rose-500/50 transition-all text-rose-300">
                    🎧 Apple Podcasts
                  </Button>
                </a>
                <a
                  href="https://open.spotify.com/show/id-needed"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button variant="outline" className="w-full border-green-500/30 hover:bg-green-500/10 hover:border-green-500/50 transition-all text-green-300">
                    🎵 Spotify
                  </Button>
                </a>
              </div>

              <div className="bg-gradient-to-r from-emerald-900/20 to-teal-900/20 rounded-xl p-4 mt-6 border border-emerald-500/20">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-emerald-300">💡 Pro Tip:</strong> Combine the audio sessions with the written study guide for a complete learning experience. Listen to episodes first, then dive deeper with the written questions and reflections.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Sacred Greeks Podcast Registration CTA */}
          <Card className="border-2 border-sacred/30 bg-gradient-to-br from-sacred/20 via-card to-amber-900/10 shadow-xl shadow-sacred/10 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sacred via-amber-500 to-orange-500" />
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sacred to-amber-500 flex items-center justify-center shadow-lg shadow-sacred/30">
                  <Mic className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="block text-xl">Join Our Live Podcast Sessions</span>
                  <span className="text-sm text-sacred font-normal">🔴 Live recordings every month</span>
                </div>
              </CardTitle>
              <CardDescription>
                Be part of the Sacred Greeks Podcast community
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Want to be part of a live recording or ask questions directly? Register for our upcoming podcast sessions and join the conversation about faith and Greek life.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={WEBINAR_REGISTRATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button className="w-full bg-gradient-to-r from-sacred to-amber-500 hover:from-sacred/90 hover:to-amber-500/90 text-white gap-2 shadow-lg shadow-sacred/30 h-12 text-base">
                    <ExternalLink className="w-5 h-5" />
                    Register for Live Sessions
                  </Button>
                </a>
              </div>
              
              <div className="bg-gradient-to-r from-sacred/10 to-amber-500/10 rounded-xl p-4 mt-4 border border-sacred/20">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sacred/30 to-amber-500/30 flex items-center justify-center flex-shrink-0 border border-sacred/30">
                    <Mic className="w-5 h-5 text-sacred" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-sacred">What to expect:</p>
                    <ul className="text-sm text-muted-foreground mt-2 space-y-2">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-sacred" />
                        Live Q&A with Dr. Lyman Montgomery
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        Deep dives into faith and Greek life topics
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                        Community discussion and shared experiences
                      </li>
                    </ul>
                  </div>
                </div>
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
