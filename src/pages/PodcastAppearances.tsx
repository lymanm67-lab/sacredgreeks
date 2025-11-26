import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Home, Mic, ExternalLink, Play, Video } from "lucide-react";

interface PodcastEpisode {
  title: string;
  description: string;
  embedUrl: string;
  date: string;
  platform: string;
  topics: string[];
}

const podcastEpisodes: PodcastEpisode[] = [
  {
    title: "Dr. Lyman Montgomery on Faith and Greek Life",
    description: "An in-depth conversation about integrating Christian faith with Greek life participation, addressing common concerns and providing biblical guidance for students navigating fraternity and sorority membership.",
    embedUrl: "https://www.youtube.com/embed/fxQvqKTBjlg?si=wOq9tgAI5alsYFJB",
    date: "2024",
    platform: "YouTube",
    topics: ["Faith", "Greek Life", "Leadership", "Biblical Guidance"]
  },
  {
    title: "Sacred Greeks Interview with Dr. Lyman Montgomery",
    description: "Join us for an insightful discussion with Dr. Lyman Montgomery as he shares his expertise on navigating Christian values within Greek organizations, addressing theological concerns, and empowering students to live out their faith authentically.",
    embedUrl: "https://www.youtube.com/embed/l4A1FkoXmlc?si=ck8XE4bQuRt8C9cg",
    date: "2024",
    platform: "YouTube",
    topics: ["Christian Values", "Greek Organizations", "Theology", "Student Ministry"]
  },
  {
    title: "Faith, Leadership & Greek Life Discussion",
    description: "Dr. Lyman Montgomery explores the intersection of Christian leadership principles and Greek life culture, offering practical wisdom for students seeking to honor God while serving in their fraternity or sorority.",
    embedUrl: "https://www.youtube.com/embed/8Qi7SxpzMmg?si=uA8kAXyDiJ7_flSf",
    date: "2024",
    platform: "YouTube",
    topics: ["Faith", "Leadership", "Greek Culture", "Service"]
  }
];

const PodcastAppearances = () => {
  const [selectedEpisode, setSelectedEpisode] = useState<PodcastEpisode | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="sm" className="gap-2">
                  <Home className="w-4 h-4" />
                  Home
                </Button>
              </Link>
              <div className="h-6 w-px bg-border" />
              <div className="flex items-center gap-2">
                <Mic className="w-5 h-5 text-sacred" />
                <h1 className="text-xl font-semibold">Podcast Appearances</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <Badge className="bg-sacred/10 text-sacred border-sacred/20 mb-4">
            <Mic className="w-3 h-3 mr-1" />
            Media Appearances
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-sacred to-warm-blue bg-clip-text text-transparent">
            Dr. Lyman Montgomery
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Watch and listen to podcast interviews discussing faith, leadership, and navigating Greek life as a Christian
          </p>
        </div>

        {/* Featured Documentary */}
        <Card className="mb-12 overflow-hidden border-2 border-sacred/20 bg-gradient-to-br from-sacred/5 to-warm-blue/5 animate-fade-in">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2 gap-0">
              <a 
                href="https://www.unmaskinghopethemovie.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block relative group"
              >
                <div className="aspect-video md:aspect-square bg-gradient-to-br from-sacred to-warm-blue flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                  <Video className="w-24 h-24 text-white relative z-10 group-hover:scale-110 transition-transform" />
                </div>
              </a>
              <div className="p-8 flex flex-col justify-center">
                <Badge className="bg-sacred/10 text-sacred border-sacred/20 w-fit mb-4">
                  <Video className="w-3 h-3 mr-1" />
                  Featured Documentary
                </Badge>
                <h3 className="text-3xl font-bold mb-3">Unmasking Hope</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  A powerful documentary exploring faith, identity, and redemption in Greek life. 
                  Journey through authentic stories of hope, healing, and transformation for Christians 
                  navigating fraternity and sorority membership.
                </p>
                <a 
                  href="https://www.unmaskinghopethemovie.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button size="lg" className="bg-sacred hover:bg-sacred/90 text-sacred-foreground">
                    <Video className="w-5 h-5 mr-2" />
                    Watch Now
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Podcast Episodes Section Header */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-2">Podcast Interviews</h3>
          <p className="text-muted-foreground">
            Listen to Dr. Montgomery's appearances on various podcasts
          </p>
        </div>

        {/* Featured Episode */}
        {selectedEpisode ? (
          <Card className="mb-12 animate-fade-in">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="text-2xl mb-2">{selectedEpisode.title}</CardTitle>
                  <CardDescription className="text-base">
                    {selectedEpisode.description}
                  </CardDescription>
                  <div className="flex items-center gap-3 mt-4">
                    <Badge variant="outline">{selectedEpisode.platform}</Badge>
                    <Badge variant="outline">{selectedEpisode.date}</Badge>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedEpisode(null)}
                >
                  Show All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="aspect-video w-full rounded-lg overflow-hidden bg-muted mb-4">
                <iframe
                  width="100%"
                  height="100%"
                  src={selectedEpisode.embedUrl}
                  title={selectedEpisode.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedEpisode.topics.map((topic) => (
                  <Badge key={topic} className="bg-sacred/10 text-sacred border-sacred/20">
                    {topic}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* All Episodes Grid */}
            <div className="grid gap-6 mb-12">
              {podcastEpisodes.map((episode, index) => (
                <Card 
                  key={index}
                  className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  onClick={() => setSelectedEpisode(episode)}
                >
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-sacred to-warm-blue flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                        <Play className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-xl mb-2 group-hover:text-sacred transition-colors">
                          {episode.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">
                          {episode.description}
                        </CardDescription>
                        <div className="flex items-center gap-3 mt-3">
                          <Badge variant="outline">{episode.platform}</Badge>
                          <Badge variant="outline">{episode.date}</Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {episode.topics.map((topic) => (
                        <Badge 
                          key={topic} 
                          variant="secondary"
                          className="text-xs bg-sacred/5 text-sacred border-sacred/20"
                        >
                          {topic}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-sacred text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="w-4 h-4" />
                      <span>Watch episode</span>
                      <ExternalLink className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Topics Overview */}
            <Card className="bg-gradient-to-br from-sacred/5 to-warm-blue/5 border-sacred/20">
              <CardHeader>
                <CardTitle>Topics Discussed</CardTitle>
                <CardDescription>
                  Key themes explored across podcast appearances
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {["Faith", "Greek Life", "Leadership", "Biblical Guidance", "Student Ministry", "Campus Culture"].map((topic) => (
                    <div 
                      key={topic}
                      className="p-4 rounded-lg bg-background border border-border text-center hover:border-sacred/50 transition-colors"
                    >
                      <p className="font-semibold text-sm">{topic}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* CTA Section */}
        <Card className="mt-12 bg-gradient-to-br from-sacred/5 to-warm-blue/5 border-sacred/20">
          <CardContent className="p-8 text-center">
            <Mic className="w-12 h-12 text-sacred mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Book Dr. Montgomery</h3>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Interested in having Dr. Montgomery on your podcast or speaking at your event? 
              Submit a media inquiry to get started.
            </p>
            <Link to="/resources">
              <Button size="lg" className="bg-sacred hover:bg-sacred/90">
                Submit Media Inquiry
              </Button>
            </Link>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default PodcastAppearances;
