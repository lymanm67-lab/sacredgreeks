import { useSearchParams } from "react-router-dom";
import { Layers, BarChart3, Presentation, Monitor, Eye } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SlideLibrary } from "@/components/present/SlideLibrary";
import { SlideDeckEditor } from "@/components/present/SlideDeckEditor";
import { LivePolls } from "@/components/present/LivePolls";
import { PresentMode } from "@/components/present/PresentMode";
import { LivePreview } from "@/components/present/LivePreview";
import { PresentAudioGuide } from "@/components/present/PresentAudioGuide";

const tabs = [
  { value: "library", label: "Slide Library", icon: Layers },
  { value: "deck", label: "Slide Deck", icon: Presentation },
  { value: "present", label: "Present", icon: Monitor },
  { value: "polls", label: "Live Polls", icon: BarChart3 },
  { value: "preview", label: "Live Preview", icon: Eye },
];

function ComingSoonTab({ icon: Icon, label, color, description }: { icon: typeof Layers; label: string; color: string; description: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className={`w-5 h-5 ${color}`} />
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-16 space-y-4">
          <div className={`w-16 h-16 rounded-2xl ${color.replace("text-", "bg-").replace("500", "500/10")} flex items-center justify-center mx-auto`}>
            <Icon className={`w-8 h-8 ${color}`} />
          </div>
          <h3 className="text-lg font-semibold text-foreground">{label}</h3>
          <p className="text-muted-foreground max-w-md mx-auto">{description}</p>
          <Badge variant="secondary">Coming Soon</Badge>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Present() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "library";

  const handleTabChange = (value: string) => {
    setSearchParams({ tab: value });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Presentation Tools</h1>
          <p className="text-muted-foreground mt-1">
            Build, present, and engage your audience with interactive slide decks
          </p>
        </div>
        <PresentAudioGuide tabKey={activeTab} />
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-5 max-w-2xl">
          {tabs.map(tab => (
            <TabsTrigger key={tab.value} value={tab.value} className="gap-1.5 text-xs">
              <tab.icon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="library" className="mt-6">
          <SlideLibrary />
        </TabsContent>

        <TabsContent value="polls" className="mt-6">
          <LivePolls />
        </TabsContent>

        <TabsContent value="deck" className="mt-6">
          {searchParams.get("deckId") ? (
            <SlideDeckEditor
              deckId={searchParams.get("deckId")!}
              onBack={() => {
                const params = new URLSearchParams(searchParams);
                params.delete("deckId");
                params.set("tab", "library");
                setSearchParams(params);
              }}
            />
          ) : (
            <Card>
              <CardContent className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-violet-500/10 flex items-center justify-center mx-auto">
                  <Presentation className="w-8 h-8 text-violet-500" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Slide Deck Builder</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Select a deck from the Slide Library to start editing, or create a new one.
                </p>
                <button
                  onClick={() => setSearchParams({ tab: "library" })}
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                >
                  <Layers className="w-4 h-4" /> Go to Slide Library
                </button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="present" className="mt-6">
          <PresentMode />
        </TabsContent>

        <TabsContent value="preview" className="mt-6">
          <LivePreview />
        </TabsContent>
      </Tabs>
    </div>
  );
}
