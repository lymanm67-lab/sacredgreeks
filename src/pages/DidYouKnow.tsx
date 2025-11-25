import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronDown, ChevronUp, Volume2, Pause, Play, Square, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { didYouKnowCategories } from "@/sacredGreeksContent";
import { useTextToSpeech } from "@/hooks/use-text-to-speech";
import { VoiceSelector, type VoiceOption } from "@/components/VoiceSelector";

const DidYouKnow = () => {
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set());
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [selectedVoice, setSelectedVoice] = useState<VoiceOption>("alloy");
  const { speak, pause, resume, stop, isPlaying, isPaused, isLoading } = useTextToSpeech();

  const toggleCategory = (categoryId: string) => {
    setOpenCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  const toggleItem = (itemId: string) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const handleListen = (item: any) => {
    const textToSpeak = `${item.title}. 
    
    Pagan Origin: ${item.origin}
    
    Used Today: ${item.today}
    
    Reflection: ${item.reflection}`;
    
    speak(textToSpeak, item.id, selectedVoice, item.title);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Did You Know?</h1>
              <p className="text-sm text-muted-foreground">
                Common Christian practices with pagan roots
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Voice Selector */}
        <div className="mb-6">
          <VoiceSelector 
            onVoiceChange={setSelectedVoice} 
            defaultVoice={selectedVoice}
          />
        </div>

        {/* Introduction */}
        <Card className="mb-8 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
          <CardHeader>
            <CardTitle className="text-xl">Understanding Double Standards</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="leading-relaxed">
              Many people criticize Black Greek Letter Organizations (BGLOs) for having roots
              in Greek mythology or pagan symbolism. But did you know that countless
              Christian-friendly practices, institutions, and traditions have the same origins?
            </p>
            <p className="leading-relaxed">
              This page highlights everyday practices that Christians embrace without concern,
              despite their pagan or mythological roots. The goal is not to condemn these
              practices, but to show that <strong>context and intent matter more than
              historical origins</strong>.
            </p>
            <p className="leading-relaxed text-primary font-medium">
              If we can redeem Christmas trees, wedding rings, and medical symbols (all with
              pagan origins), why can't individuals redeem their BGLO membership for service,
              community, and Christian witness?
            </p>
          </CardContent>
        </Card>

        {/* Categories */}
        <div className="space-y-4">
          {didYouKnowCategories.map((category) => (
            <Card key={category.id} className="overflow-hidden">
              <CardHeader className="bg-muted/50">
                <Collapsible
                  open={openCategories.has(category.id)}
                  onOpenChange={() => toggleCategory(category.id)}
                >
                  <CollapsibleTrigger className="w-full">
                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <CardTitle className="text-lg mb-1">{category.title}</CardTitle>
                        <p className="text-sm text-muted-foreground font-normal">
                          {category.description}
                        </p>
                      </div>
                      {openCategories.has(category.id) ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0 ml-4" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0 ml-4" />
                      )}
                    </div>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <div className="mt-4 space-y-4">
                      {/* Video Section */}
                      {category.videos && category.videos.length > 0 && (
                        <div className="space-y-3 pb-4 border-b border-border">
                          <h3 className="font-semibold text-lg px-6">📺 Educational Videos</h3>
                          <div className="px-6 grid gap-4">
                            {category.videos.map((video, idx) => (
                              <div key={idx} className="space-y-2">
                                <div className="aspect-video rounded-lg overflow-hidden border-2 border-primary/20">
                                  <iframe
                                    width="100%"
                                    height="100%"
                                    src={`https://www.youtube.com/embed/${video.url.split('/').pop()}`}
                                    title={video.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-full"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <h4 className="font-medium text-sm">{video.title}</h4>
                                  <p className="text-xs text-muted-foreground">{video.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Items Section */}
                      <div className="space-y-3">
                        {category.items.map((item) => (
                        <Card key={item.id} className="border-l-4 border-l-primary">
                          <CardHeader className="pb-3">
                            <Collapsible
                              open={openItems.has(item.id)}
                              onOpenChange={() => toggleItem(item.id)}
                            >
                              <CollapsibleTrigger className="w-full">
                                <div className="flex items-center justify-between gap-2">
                                  <CardTitle className="text-base text-left flex-1">
                                    {item.title}
                                  </CardTitle>
                                  <div className="flex items-center gap-1 flex-shrink-0">
                                    {isPlaying === item.id && !isLoading ? (
                                      <>
                                        <Button
                                          size="sm"
                                          variant="ghost"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            if (isPaused) {
                                              resume();
                                            } else {
                                              pause();
                                            }
                                          }}
                                          className="h-8 w-8 p-0"
                                          title={isPaused ? "Resume" : "Pause"}
                                        >
                                          {isPaused ? (
                                            <Play className="h-4 w-4" />
                                          ) : (
                                            <Pause className="h-4 w-4" />
                                          )}
                                        </Button>
                                        <Button
                                          size="sm"
                                          variant="ghost"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            stop();
                                          }}
                                          className="h-8 w-8 p-0"
                                          title="Stop"
                                        >
                                          <Square className="h-4 w-4" />
                                        </Button>
                                      </>
                                    ) : (
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleListen(item);
                                        }}
                                        disabled={isLoading === item.id}
                                        className="h-8 w-8 p-0"
                                        title="Play"
                                      >
                                        {isLoading === item.id ? (
                                          <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                          <Volume2 className="h-4 w-4" />
                                        )}
                                      </Button>
                                    )}
                                    {openItems.has(item.id) ? (
                                      <ChevronUp className="h-4 w-4 text-muted-foreground" />
                                    ) : (
                                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                    )}
                                  </div>
                                </div>
                              </CollapsibleTrigger>

                              <CollapsibleContent>
                                <CardContent className="pt-4 px-0 space-y-4">
                                  <div>
                                    <h4 className="font-semibold text-sm text-primary mb-2">
                                      Pagan Origin:
                                    </h4>
                                    <p className="text-sm leading-relaxed text-muted-foreground">
                                      {item.origin}
                                    </p>
                                  </div>

                                  <div>
                                    <h4 className="font-semibold text-sm text-primary mb-2">
                                      Used Today:
                                    </h4>
                                    <p className="text-sm leading-relaxed text-muted-foreground">
                                      {item.today}
                                    </p>
                                  </div>

                                  <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
                                    <h4 className="font-semibold text-sm text-primary mb-2">
                                      💭 Reflection:
                                    </h4>
                                    <p className="text-sm leading-relaxed italic">
                                      {item.reflection}
                                    </p>
                                  </div>
                                </CardContent>
                              </CollapsibleContent>
                            </Collapsible>
                          </CardHeader>
                        </Card>
                        ))}
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Conclusion */}
        <Card className="mt-8 border-2 border-primary/20 bg-gradient-to-br from-secondary/5 to-primary/5">
          <CardHeader>
            <CardTitle>The Bottom Line</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="leading-relaxed">
              This isn't about proving BGLOs are sinless or above criticism. It's about
              <strong> fairness and consistency</strong>. If Christians can:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li>Work in hospitals with Greek god symbols</li>
              <li>Celebrate holidays with pagan traditions</li>
              <li>Build churches with classical architecture</li>
              <li>Study Greek to read the Bible</li>
              <li>Name children after mythological figures</li>
              <li>Shop at stores named after goddesses</li>
            </ul>
            <p className="leading-relaxed mt-4">
              ...then the argument that BGLOs are automatically demonic simply because of Greek
              letters or historical references <strong>falls apart</strong>.
            </p>
            <p className="leading-relaxed text-primary font-medium">
              The real question isn't the origin, it's the current use and intent. Are you
              using your membership to serve Christ and your community? That's what matters.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default DidYouKnow;
