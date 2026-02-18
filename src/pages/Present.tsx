import { useSearchParams } from "react-router-dom";
import { Layers, BarChart3, Presentation, Monitor, Eye } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const tabs = [
  { value: "library", label: "Slide Library", icon: Layers },
  { value: "polls", label: "Live Polls", icon: BarChart3 },
  { value: "deck", label: "Slide Deck", icon: Presentation },
  { value: "present", label: "Present", icon: Monitor },
  { value: "preview", label: "Live Preview", icon: Eye },
];

export default function Present() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "library";

  const handleTabChange = (value: string) => {
    setSearchParams({ tab: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Presentation Tools</h1>
        <p className="text-muted-foreground mt-1">
          Build, present, and engage your audience with interactive slide decks
        </p>
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
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-500" />
                Slide Library
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center mx-auto">
                  <Layers className="w-8 h-8 text-indigo-500" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Your Slide Library</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Browse and manage your saved slide templates. Create reusable slides for PROOF presentations, devotionals, and chapter meetings.
                </p>
                <Badge variant="secondary">Coming Soon</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="polls" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-cyan-500" />
                Live Polls
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center mx-auto">
                  <BarChart3 className="w-8 h-8 text-cyan-500" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Live Audience Polls</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Engage your audience in real-time with interactive polls. Perfect for chapter meetings, workshops, and keynote presentations.
                </p>
                <Badge variant="secondary">Coming Soon</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deck" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Presentation className="w-5 h-5 text-violet-500" />
                Slide Deck Builder
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-violet-500/10 flex items-center justify-center mx-auto">
                  <Presentation className="w-8 h-8 text-violet-500" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Build Your Deck</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Create custom slide decks from templates or from scratch. Drag and drop slides, add notes, and organize your presentation flow.
                </p>
                <Badge variant="secondary">Coming Soon</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="present" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="w-5 h-5 text-amber-500" />
                Presentation Mode
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center mx-auto">
                  <Monitor className="w-8 h-8 text-amber-500" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Go Live</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Enter full-screen presentation mode with speaker notes, slide navigation, and audience controls. Share your screen and present with confidence.
                </p>
                <Badge variant="secondary">Coming Soon</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-emerald-500" />
                Live Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto">
                  <Eye className="w-8 h-8 text-emerald-500" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Audience View</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Preview what your audience sees in real-time. Share the preview link so attendees can follow along on their own devices.
                </p>
                <Badge variant="secondary">Coming Soon</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
