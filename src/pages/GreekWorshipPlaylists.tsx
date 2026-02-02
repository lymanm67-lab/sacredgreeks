import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Music, 
  Play, 
  Heart, 
  Share2, 
  ExternalLink,
  Sparkles,
  Clock,
  ListMusic
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";

interface Playlist {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  trackCount: number;
  spotifyUrl: string;
  spotifyEmbedId: string;
  appleMusicUrl: string;
  appleMusicEmbedId: string;
  featured?: boolean;
}

const playlists: Playlist[] = [
  {
    id: "chapter-meetings",
    title: "Chapter Meeting Worship",
    description: "Set the tone for chapter meetings with uplifting worship music. Perfect for opening devotionals and creating a sacred space.",
    category: "Meetings",
    duration: "1hr 30min",
    trackCount: 25,
    spotifyUrl: "https://open.spotify.com/playlist/37i9dQZF1DX0MvtPEIgM45",
    spotifyEmbedId: "37i9dQZF1DX0MvtPEIgM45",
    appleMusicUrl: "https://music.apple.com/playlist/pl.u-EdAVzGdCMmB0Lm",
    appleMusicEmbedId: "pl.u-EdAVzGdCMmB0Lm",
    featured: true
  },
  {
    id: "study-focus",
    title: "P.R.O.O.F. Study Focus",
    description: "Instrumental worship and ambient music for deep study sessions. No lyrics to distract—just presence.",
    category: "Study",
    duration: "2hr",
    trackCount: 40,
    spotifyUrl: "https://open.spotify.com/playlist/37i9dQZF1DWWQRwui0ExPn",
    spotifyEmbedId: "37i9dQZF1DWWQRwui0ExPn",
    appleMusicUrl: "https://music.apple.com/playlist/pl.u-EdAVzGdCMmB0Lm",
    appleMusicEmbedId: "pl.u-EdAVzGdCMmB0Lm"
  },
  {
    id: "morning-devotion",
    title: "Morning Devotional",
    description: "Start your day with worship before class, work, or chapter responsibilities. Peaceful, reflective tracks.",
    category: "Devotional",
    duration: "45min",
    trackCount: 15,
    spotifyUrl: "https://open.spotify.com/playlist/37i9dQZF1DX6PKX5dyBKeq",
    spotifyEmbedId: "37i9dQZF1DX6PKX5dyBKeq",
    appleMusicUrl: "https://music.apple.com/playlist/pl.u-EdAVzGdCMmB0Lm",
    appleMusicEmbedId: "pl.u-EdAVzGdCMmB0Lm",
    featured: true
  },
  {
    id: "service-projects",
    title: "Service Project Vibes",
    description: "Upbeat, positive worship for community service events. Keep the energy high while serving others.",
    category: "Service",
    duration: "1hr 15min",
    trackCount: 22,
    spotifyUrl: "https://open.spotify.com/playlist/37i9dQZF1DX7QOv5kjbU68",
    spotifyEmbedId: "37i9dQZF1DX7QOv5kjbU68",
    appleMusicUrl: "https://music.apple.com/playlist/pl.u-EdAVzGdCMmB0Lm",
    appleMusicEmbedId: "pl.u-EdAVzGdCMmB0Lm"
  },
  {
    id: "prayer-intercession",
    title: "Prayer & Intercession",
    description: "Deep, soaking worship for prayer meetings and personal intercession. Create an atmosphere of surrender.",
    category: "Prayer",
    duration: "1hr 45min",
    trackCount: 30,
    spotifyUrl: "https://open.spotify.com/playlist/37i9dQZF1DX2T3X3sMQ9Lq",
    spotifyEmbedId: "37i9dQZF1DX2T3X3sMQ9Lq",
    appleMusicUrl: "https://music.apple.com/playlist/pl.u-EdAVzGdCMmB0Lm",
    appleMusicEmbedId: "pl.u-EdAVzGdCMmB0Lm"
  },
  {
    id: "new-member-journey",
    title: "New Member Journey",
    description: "Encouragement and strength for those navigating the new member process. Scripture-based worship.",
    category: "Growth",
    duration: "1hr",
    trackCount: 18,
    spotifyUrl: "https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO",
    spotifyEmbedId: "37i9dQZF1DX4sWSpwq3LiO",
    appleMusicUrl: "https://music.apple.com/playlist/pl.u-EdAVzGdCMmB0Lm",
    appleMusicEmbedId: "pl.u-EdAVzGdCMmB0Lm"
  },
  {
    id: "graduation-transition",
    title: "Senior Send-Off",
    description: "Worship for graduates transitioning from chapter life. Celebration, reflection, and hope for the future.",
    category: "Transition",
    duration: "50min",
    trackCount: 16,
    spotifyUrl: "https://open.spotify.com/playlist/37i9dQZF1DWTwnEm1IYyoj",
    spotifyEmbedId: "37i9dQZF1DWTwnEm1IYyoj",
    appleMusicUrl: "https://music.apple.com/playlist/pl.u-EdAVzGdCMmB0Lm",
    appleMusicEmbedId: "pl.u-EdAVzGdCMmB0Lm"
  },
  {
    id: "healing-restoration",
    title: "Healing & Restoration",
    description: "For those processing difficult experiences in Greek life. Comfort, healing, and restoration.",
    category: "Healing",
    duration: "1hr 20min",
    trackCount: 24,
    spotifyUrl: "https://open.spotify.com/playlist/37i9dQZF1DX3YSRoSdA634",
    spotifyEmbedId: "37i9dQZF1DX3YSRoSdA634",
    appleMusicUrl: "https://music.apple.com/playlist/pl.u-EdAVzGdCMmB0Lm",
    appleMusicEmbedId: "pl.u-EdAVzGdCMmB0Lm"
  }
];

const categories = ["All", "Meetings", "Study", "Devotional", "Service", "Prayer", "Growth", "Transition", "Healing"];

function PlaylistCard({ playlist, platform }: { playlist: Playlist; platform: "spotify" | "apple" }) {
  const [showEmbed, setShowEmbed] = useState(false);
  
  return (
    <Card className={`border-border/50 hover:border-sacred/50 transition-all ${playlist.featured ? 'ring-2 ring-sacred/30' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {playlist.featured && (
                <Badge className="bg-sacred/20 text-sacred border-sacred/30">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Featured
                </Badge>
              )}
              <Badge variant="outline">{playlist.category}</Badge>
            </div>
            <CardTitle className="text-lg">{playlist.title}</CardTitle>
          </div>
          <div className="w-10 h-10 rounded-lg bg-sacred/10 flex items-center justify-center">
            <Music className="w-5 h-5 text-sacred" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <CardDescription>{playlist.description}</CardDescription>
        
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {playlist.duration}
          </span>
          <span className="flex items-center gap-1">
            <ListMusic className="w-3 h-3" />
            {playlist.trackCount} tracks
          </span>
        </div>
        
        {showEmbed && (
          <div className="rounded-lg overflow-hidden">
            {platform === "spotify" ? (
              <iframe
                src={`https://open.spotify.com/embed/playlist/${playlist.spotifyEmbedId}?utm_source=generator&theme=0`}
                width="100%"
                height="152"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-lg"
              />
            ) : (
              <iframe
                allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
                frameBorder="0"
                height="175"
                style={{ width: '100%', maxWidth: '660px', overflow: 'hidden', borderRadius: '10px' }}
                sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                src={`https://embed.music.apple.com/us/playlist/${playlist.appleMusicEmbedId}`}
              />
            )}
          </div>
        )}
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowEmbed(!showEmbed)}
            className="flex-1"
          >
            <Play className="w-3 h-3 mr-1" />
            {showEmbed ? "Hide Player" : "Preview"}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            asChild
          >
            <a 
              href={platform === "spotify" ? playlist.spotifyUrl : playlist.appleMusicUrl} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <ExternalLink className="w-3 h-3 mr-1" />
              Open
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function GreekWorshipPlaylists() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [platform, setPlatform] = useState<"spotify" | "apple">("spotify");

  const filteredPlaylists = selectedCategory === "All" 
    ? playlists 
    : playlists.filter(p => p.category === selectedCategory);

  const featuredPlaylists = filteredPlaylists.filter(p => p.featured);
  const regularPlaylists = filteredPlaylists.filter(p => !p.featured);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <PageHeader
          title="Greek Worship Playlists"
          description="Curated worship music for every moment in Greek life—chapter meetings, study sessions, service projects, and personal devotions."
          badge={{ text: "Spotify + Apple Music", variant: "default" }}
        />

        {/* Platform Toggle */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-foreground">Choose Platform:</span>
                <Tabs value={platform} onValueChange={(v) => setPlatform(v as "spotify" | "apple")}>
                  <TabsList>
                    <TabsTrigger value="spotify" className="gap-2">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                      </svg>
                      Spotify
                    </TabsTrigger>
                    <TabsTrigger value="apple" className="gap-2">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.997 6.124a9.23 9.23 0 00-.24-2.19 5.07 5.07 0 00-1.207-2.229 5.07 5.07 0 00-2.229-1.207 9.23 9.23 0 00-2.19-.24C16.77.035 16.35 0 12 0S7.23.035 5.87.257a9.23 9.23 0 00-2.19.24A5.07 5.07 0 001.45 1.704a5.07 5.07 0 00-1.207 2.23 9.23 9.23 0 00-.24 2.19C-.22 7.23 0 7.65 0 12s-.035 4.77.257 6.13a9.23 9.23 0 00.24 2.19 5.07 5.07 0 001.207 2.229 5.07 5.07 0 002.229 1.207 9.23 9.23 0 002.19.24c1.36.223 1.78.257 6.13.257s4.77-.035 6.13-.257a9.23 9.23 0 002.19-.24 5.32 5.32 0 003.436-3.436 9.23 9.23 0 00.24-2.19c.223-1.36.257-1.78.257-6.13s-.035-4.77-.257-6.13zm-6.8 10.93H6.8V6.947h10.397v10.107z"/>
                      </svg>
                      Apple Music
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? "bg-sacred hover:bg-sacred/90" : ""}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Featured Playlists */}
        {featuredPlaylists.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-sacred" />
              Featured Playlists
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {featuredPlaylists.map(playlist => (
                <PlaylistCard key={playlist.id} playlist={playlist} platform={platform} />
              ))}
            </div>
          </div>
        )}

        {/* All Playlists */}
        <div>
          {regularPlaylists.length > 0 && (
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <ListMusic className="w-5 h-5 text-sacred" />
              All Playlists
            </h2>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {regularPlaylists.map(playlist => (
              <PlaylistCard key={playlist.id} playlist={playlist} platform={platform} />
            ))}
          </div>
        </div>

        {filteredPlaylists.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Music className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No playlists found</h3>
              <p className="text-sm text-muted-foreground">
                Try selecting a different category
              </p>
            </CardContent>
          </Card>
        )}

        {/* Suggestion CTA */}
        <Card className="mt-8 border-sacred/30">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Have a Playlist Suggestion?
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Know a worship playlist that would bless the Greek community? Let us know!
            </p>
            <Button variant="outline">
              <Heart className="w-4 h-4 mr-2" />
              Suggest a Playlist
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
