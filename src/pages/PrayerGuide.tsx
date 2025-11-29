import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Home, Sparkles, BookOpen, GraduationCap, Heart, Save, Copy, Check, Loader2, Mic, Music, Users } from 'lucide-react';
import { toast } from 'sonner';
import { prayerTemplates, prayerCategories } from '@/data/prayerTemplates';
import { prayerMethods } from '@/data/prayerLearning';
import { VoiceRecordingButton, VoiceInputButton } from '@/components/VoiceInputButton';
import { AmbientSoundPlayer } from '@/components/prayer/AmbientSoundPlayer';
import { PrayAlongKaraoke } from '@/components/prayer/PrayAlongKaraoke';
import { ListenButton } from '@/components/ListenButton';
import { OrgPrayerTemplates } from '@/components/prayer/OrgPrayerTemplates';

export default function PrayerGuide() {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('thanksgiving');
  const [situation, setSituation] = useState('');
  const [generatedPrayer, setGeneratedPrayer] = useState('');
  const [generating, setGenerating] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(prayerMethods[0]);
  const [copied, setCopied] = useState(false);

  const handleGeneratePrayer = async () => {
    if (!user) {
      toast.error('Please sign in to generate personalized prayers');
      return;
    }

    setGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-prayer', {
        body: {
          category: selectedCategory,
          situation: situation.trim(),
          userName: user.user_metadata?.full_name?.split(' ')[0]
        }
      });

      if (error) throw error;

      if (data?.prayer) {
        setGeneratedPrayer(data.prayer);
        toast.success('Prayer generated!');
      }
    } catch (error: any) {
      console.error('Error generating prayer:', error);
      toast.error(error.message || 'Failed to generate prayer');
    } finally {
      setGenerating(false);
    }
  };

  const handleSavePrayer = async (prayerText: string, title: string) => {
    if (!user) {
      toast.error('Please sign in to save prayers');
      return;
    }

    try {
      const { error } = await supabase
        .from('prayer_journal')
        .insert({
          user_id: user.id,
          title,
          content: prayerText,
          prayer_type: selectedCategory
        });

      if (error) throw error;

      toast.success('Prayer saved to your journal!');
    } catch (error) {
      console.error('Error saving prayer:', error);
      toast.error('Failed to save prayer');
    }
  };

  const handleCopyPrayer = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('Prayer copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const categoryTemplates = prayerTemplates.filter(t => t.category === selectedCategory);
  const selectedCategoryData = prayerCategories.find(c => c.id === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-lg sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/dashboard"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Home className="w-5 h-5" />
              <span className="font-semibold">Back to Dashboard</span>
            </Link>
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-sacred to-warm-blue bg-clip-text text-transparent">
              Prayer Guide
            </h1>
            <div className="w-32" /> {/* Spacer for alignment */}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Learn to Pray with Confidence
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover AI-powered personalized prayers, ready-to-use templates, and proven methods to deepen your prayer life
          </p>
        </div>

        <Tabs defaultValue="ai" className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger value="ai" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">AI Prayer</span>
              <span className="sm:hidden">AI</span>
            </TabsTrigger>
            <TabsTrigger value="org" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">My Org</span>
              <span className="sm:hidden">Org</span>
            </TabsTrigger>
            <TabsTrigger value="pray-along" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Pray Along</span>
              <span className="sm:hidden">Along</span>
            </TabsTrigger>
            <TabsTrigger value="ambient" className="flex items-center gap-2">
              <Music className="w-4 h-4" />
              <span className="hidden sm:inline">Ambient</span>
              <span className="sm:hidden">Sound</span>
            </TabsTrigger>
            <TabsTrigger value="templates" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Templates</span>
              <span className="sm:hidden">Temp</span>
            </TabsTrigger>
            <TabsTrigger value="learn" className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              <span className="hidden sm:inline">Learn</span>
              <span className="sm:hidden">Learn</span>
            </TabsTrigger>
          </TabsList>

          {/* Org Prayer Templates Tab */}
          <TabsContent value="org" className="space-y-6">
            <OrgPrayerTemplates 
              onSelectPrayer={(prayer, title) => {
                handleSavePrayer(prayer, title);
              }}
            />
          </TabsContent>

          {/* AI Prayer Guide Tab */}
          <TabsContent value="ai" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  AI-Powered Personalized Prayer
                </CardTitle>
                <CardDescription>
                  Let AI help you articulate your prayers with biblically-grounded guidance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Category Selection */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Choose a prayer category:</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {prayerCategories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`p-4 rounded-lg border-2 transition-all text-left ${
                          selectedCategory === cat.id
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className="text-2xl mb-1">{cat.icon}</div>
                        <div className="text-sm font-medium">{cat.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Situation Input */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">
                      Describe your situation (optional):
                    </label>
                    <VoiceInputButton
                      onTranscript={setSituation}
                      existingText={situation}
                      appendMode={true}
                      showLabel={true}
                    />
                  </div>
                  <Textarea
                    placeholder="E.g., 'I'm facing a difficult decision about my career' or 'I'm dealing with anxiety about an upcoming exam' (or use voice input above)"
                    value={situation}
                    onChange={(e) => setSituation(e.target.value)}
                    rows={4}
                    className="resize-none"
                  />
                  <p className="text-xs text-muted-foreground">
                    The more specific you are, the more personalized your prayer will be
                  </p>
                  
                  {/* Immersive Voice Prayer Section */}
                  <Card className="border-dashed border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10">
                    <CardContent className="pt-6">
                      <div className="text-center mb-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
                          <Mic className="w-4 h-4" />
                          Voice Prayer Mode
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Speak your heart directly - let your words flow naturally
                        </p>
                      </div>
                      <VoiceRecordingButton
                        onTranscript={setSituation}
                        existingText={situation}
                        appendMode={false}
                        showLivePreview={true}
                        placeholder="Your spoken prayer will appear here in real-time..."
                      />
                    </CardContent>
                  </Card>
                </div>

                {/* Generate Button */}
                <Button
                  onClick={handleGeneratePrayer}
                  disabled={generating}
                  className="w-full"
                  size="lg"
                >
                  {generating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating Prayer...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Prayer
                    </>
                  )}
                </Button>

                {/* Generated Prayer Display */}
                {generatedPrayer && (
                  <Card className="bg-muted/50">
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <h4 className="font-semibold">Your Personalized Prayer</h4>
                          <div className="flex flex-wrap gap-2">
                            <ListenButton
                              text={generatedPrayer}
                              itemId={`generated-prayer-${Date.now()}`}
                              title="Generated Prayer"
                              showLabel={true}
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleCopyPrayer(generatedPrayer)}
                            >
                              {copied ? (
                                <Check className="w-4 h-4" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleSavePrayer(generatedPrayer, `AI Prayer - ${selectedCategoryData?.name}`)}
                            >
                              <Save className="w-4 h-4 mr-2" />
                              Save
                            </Button>
                          </div>
                        </div>
                        <Separator />
                        <div className="whitespace-pre-wrap text-sm leading-relaxed">
                          {generatedPrayer}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pray Along Karaoke Tab */}
          <TabsContent value="pray-along" className="space-y-6">
            <div className="grid gap-6">
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold">Follow Along & Pray Together</h3>
                <p className="text-muted-foreground">
                  Let the highlighted text guide your prayer pace. Perfect for meditation and focused prayer time.
                </p>
              </div>
              
              {/* Ambient sound toggle for pray along */}
              <div className="flex justify-center">
                <AmbientSoundPlayer compact />
              </div>
              
              <PrayAlongKaraoke />
            </div>
          </TabsContent>

          {/* Ambient Sounds Tab */}
          <TabsContent value="ambient" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Music className="w-5 h-5 text-primary" />
                  Ambient Prayer Sounds
                </CardTitle>
                <CardDescription>
                  Create a peaceful atmosphere for prayer and meditation with calming background sounds
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <AmbientSoundPlayer />
                
                <div className="grid md:grid-cols-2 gap-4 pt-4">
                  <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
                    <CardContent className="pt-6">
                      <h4 className="font-semibold mb-2">🌊 Ocean Meditation</h4>
                      <p className="text-sm text-muted-foreground">
                        Let the gentle rhythm of ocean waves calm your mind as you enter into prayer. 
                        Studies show natural water sounds reduce stress and promote focus.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
                    <CardContent className="pt-6">
                      <h4 className="font-semibold mb-2">🌲 Forest Prayer</h4>
                      <p className="text-sm text-muted-foreground">
                        Connect with God's creation through peaceful forest sounds. 
                        The birds and rustling leaves create a natural sanctuary for reflection.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border-orange-500/20">
                    <CardContent className="pt-6">
                      <h4 className="font-semibold mb-2">🔥 Fireside Devotion</h4>
                      <p className="text-sm text-muted-foreground">
                        The crackling warmth of a fire creates an intimate setting for personal prayer 
                        and quiet time with God.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gradient-to-br from-slate-500/10 to-gray-500/10 border-slate-500/20">
                    <CardContent className="pt-6">
                      <h4 className="font-semibold mb-2">🌧️ Rain Reflection</h4>
                      <p className="text-sm text-muted-foreground">
                        Gentle rain creates a cocoon of peace, helping you block out distractions 
                        and focus deeply on your prayers.
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground text-center">
                    💡 <strong>Tip:</strong> Combine ambient sounds with the Pray Along mode for a deeply immersive prayer experience
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Prayer Templates Tab */}
          <TabsContent value="templates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Prayer Template Library
                </CardTitle>
                <CardDescription>
                  Browse pre-written prayers for various situations and needs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Category Filter */}
                <div className="flex flex-wrap gap-2">
                  {prayerCategories.map((cat) => (
                    <Badge
                      key={cat.id}
                      variant={selectedCategory === cat.id ? 'default' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => setSelectedCategory(cat.id)}
                    >
                      {cat.icon} {cat.name}
                    </Badge>
                  ))}
                </div>

                <Separator />

                {/* Template Cards */}
                <div className="grid gap-4">
                  {categoryTemplates.map((template) => (
                    <Card key={template.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between gap-2">
                          <div className="space-y-1 flex-1">
                            <CardTitle className="text-lg">{template.title}</CardTitle>
                            <CardDescription className="text-xs">
                              <span className="font-semibold">Scripture:</span> {template.scripture}
                            </CardDescription>
                          </div>
                          <div className="flex gap-1 flex-shrink-0">
                            <ListenButton
                              text={template.prayer}
                              itemId={`template-${template.id}`}
                              title={template.title}
                              showLabel={false}
                              size="icon"
                              variant="ghost"
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleSavePrayer(template.prayer, template.title)}
                            >
                              <Save className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-48">
                          <div className="whitespace-pre-wrap text-sm leading-relaxed pr-4">
                            {template.prayer}
                          </div>
                        </ScrollArea>
                        <div className="flex flex-wrap gap-1 mt-4">
                          {template.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Learn to Pray Tab */}
          <TabsContent value="learn" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-primary" />
                  Prayer Methods & Tutorials
                </CardTitle>
                <CardDescription>
                  Master proven prayer techniques to deepen your relationship with God
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  {prayerMethods.map((method) => (
                    <Button
                      key={method.id}
                      variant={selectedMethod.id === method.id ? 'default' : 'outline'}
                      className="h-auto py-4 justify-start text-left"
                      onClick={() => setSelectedMethod(method)}
                    >
                      <div>
                        <div className="font-semibold">{method.name}</div>
                        <div className="text-xs opacity-80 mt-1">
                          {method.description.substring(0, 50)}...
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>

                <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
                  <CardHeader>
                    <CardTitle className="text-2xl">{selectedMethod.name}</CardTitle>
                    <CardDescription className="text-base">
                      {selectedMethod.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Steps */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-lg">Steps:</h4>
                      <ol className="space-y-3">
                        {selectedMethod.steps.map((step, index) => (
                          <li key={index} className="flex gap-3">
                            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                              {index + 1}
                            </span>
                            <p className="flex-1 pt-1">{step}</p>
                          </li>
                        ))}
                      </ol>
                    </div>

                    <Separator />

                    {/* Example */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-lg">Example:</h4>
                      <Card className="bg-muted/50">
                        <CardContent className="pt-4">
                          <pre className="whitespace-pre-wrap text-sm leading-relaxed font-sans">
                            {selectedMethod.example}
                          </pre>
                        </CardContent>
                      </Card>
                    </div>

                    <Separator />

                    {/* Scripture */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-lg flex items-center gap-2">
                        <Heart className="w-5 h-5 text-primary" />
                        Biblical Foundation:
                      </h4>
                      <p className="text-sm italic pl-7">{selectedMethod.scripture}</p>
                    </div>

                    <Separator />

                    {/* Tips */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-lg">Helpful Tips:</h4>
                      <ul className="space-y-2 pl-5 list-disc">
                        {selectedMethod.tips.map((tip, index) => (
                          <li key={index} className="text-sm">{tip}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
