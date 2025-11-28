import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, ArrowLeft, Drama, ExternalLink, Save, Trash2, Calendar, Sparkles, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

// Archetype definitions
const archetypes = [
  {
    name: "The Defender",
    description: "You stand firm in your faith while actively defending your choice to be in Greek life. You're confident in your ability to integrate both identities.",
    strengths: ["Strong convictions", "Articulate in expressing beliefs", "Confident under pressure"],
    growthAreas: ["May come across as defensive", "Could benefit from more listening", "Balance assertiveness with humility"]
  },
  {
    name: "The Bridge Builder",
    description: "You seek to create harmony between your faith community and Greek life. You're a natural mediator who helps others see common ground.",
    strengths: ["Diplomatic", "Empathetic", "Skilled at finding common ground"],
    growthAreas: ["May avoid necessary conflict", "Could struggle with firm boundaries", "May over-compromise on values"]
  },
  {
    name: "The Silent Struggler",
    description: "You internalize the tension between your faith and Greek life, often keeping your struggles private. You may feel isolated in your journey.",
    strengths: ["Reflective", "Thoughtful", "Non-judgmental of others"],
    growthAreas: ["Need to find trusted confidants", "Should express feelings more openly", "May benefit from community support"]
  },
  {
    name: "The Compartmentalizer",
    description: "You keep your faith and Greek life in separate boxes, rarely allowing them to interact. This helps you navigate both worlds but may create internal tension.",
    strengths: ["Adaptable", "Able to relate to different groups", "Practical"],
    growthAreas: ["Integration of identity", "Authenticity across contexts", "Addressing internal contradictions"]
  },
  {
    name: "The Questioner",
    description: "You're actively wrestling with questions about how faith and Greek life can coexist. You're on a journey of discovery and open to new perspectives.",
    strengths: ["Intellectually curious", "Open-minded", "Growth-oriented"],
    growthAreas: ["May experience analysis paralysis", "Could benefit from decisive action", "Finding peace amid uncertainty"]
  },
  {
    name: "The Integrator",
    description: "You've found ways to seamlessly blend your faith and Greek life into a unified identity. You see both as complementary rather than conflicting.",
    strengths: ["Holistic worldview", "Authentic", "Role model for others"],
    growthAreas: ["May not relate to those still struggling", "Could become complacent", "Continuing growth and learning"]
  }
];

interface SavedResult {
  id: string;
  archetype: string;
  archetype_description: string | null;
  strengths: string[] | null;
  growth_areas: string[] | null;
  notes: string | null;
  created_at: string;
}

const ShatteredMasks = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedArchetype, setSelectedArchetype] = useState('');
  const [notes, setNotes] = useState('');
  const [savedResults, setSavedResults] = useState<SavedResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      loadSavedResults();
    }
  }, [user]);

  const loadSavedResults = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('shattered_masks_results')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSavedResults(data || []);
    } catch (error) {
      console.error('Error loading results:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveResult = async () => {
    if (!user || !selectedArchetype) {
      toast({
        title: 'Please select an archetype',
        description: 'Choose your archetype from the dropdown to save your result.',
        variant: 'destructive'
      });
      return;
    }

    setSaving(true);
    try {
      const archetype = archetypes.find(a => a.name === selectedArchetype);
      
      const { error } = await supabase
        .from('shattered_masks_results')
        .insert({
          user_id: user.id,
          archetype: selectedArchetype,
          archetype_description: archetype?.description || null,
          strengths: archetype?.strengths || null,
          growth_areas: archetype?.growthAreas || null,
          notes: notes || null
        });

      if (error) throw error;

      toast({
        title: 'Result saved!',
        description: 'Your Shattered Masks archetype has been saved to your profile.',
      });

      setSelectedArchetype('');
      setNotes('');
      await loadSavedResults();
    } catch (error) {
      console.error('Error saving result:', error);
      toast({
        title: 'Error saving result',
        description: 'Please try again later.',
        variant: 'destructive'
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteResult = async (id: string) => {
    try {
      const { error } = await supabase
        .from('shattered_masks_results')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Result deleted',
        description: 'Your assessment result has been removed.',
      });

      await loadSavedResults();
    } catch (error) {
      console.error('Error deleting result:', error);
      toast({
        title: 'Error deleting result',
        description: 'Please try again later.',
        variant: 'destructive'
      });
    }
  };

  const selectedArchetypeData = archetypes.find(a => a.name === selectedArchetype);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <Heart className="w-5 h-5 text-sacred" />
              <span className="font-semibold bg-gradient-to-r from-sacred to-warm-blue bg-clip-text text-transparent">
                Back to Dashboard
              </span>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Page Header */}
          <div className="text-center space-y-4 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-fuchsia-500/20 to-pink-600/20 mb-4">
              <Drama className="w-10 h-10 text-fuchsia-500" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-fuchsia-500 to-pink-600 bg-clip-text text-transparent">
              Shattered Masks Assessment
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover your archetype and understand how you navigate identity, faith, and Greek life
            </p>
          </div>

          <Tabs defaultValue="assessment" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="assessment">Take Assessment</TabsTrigger>
              <TabsTrigger value="results">My Results ({savedResults.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="assessment" className="space-y-6">
              {/* Take Assessment Card */}
              <Card className="border-fuchsia-500/20 bg-gradient-to-br from-fuchsia-500/5 to-pink-600/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-fuchsia-500" />
                    Take the Assessment
                  </CardTitle>
                  <CardDescription>
                    Click below to take the Shattered Masks Archetype Assessment. After completing it, return here to save your results.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <a 
                    href="https://drlymanmontgomery.involve.me/shattered-masks-archetype-assessment"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full bg-gradient-to-r from-fuchsia-500 to-pink-600 hover:from-fuchsia-600 hover:to-pink-700 text-white">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Start Assessment
                    </Button>
                  </a>
                </CardContent>
              </Card>

              {/* Save Results Card */}
              {user ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Save className="w-5 h-5 text-sacred" />
                      Save Your Results
                    </CardTitle>
                    <CardDescription>
                      After completing the assessment, select your archetype below to save it to your profile
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label>Your Archetype</Label>
                      <Select value={selectedArchetype} onValueChange={setSelectedArchetype}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your archetype..." />
                        </SelectTrigger>
                        <SelectContent>
                          {archetypes.map((archetype) => (
                            <SelectItem key={archetype.name} value={archetype.name}>
                              {archetype.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {selectedArchetypeData && (
                      <Card className="bg-muted/50">
                        <CardContent className="pt-6 space-y-4">
                          <div>
                            <h4 className="font-semibold text-lg text-fuchsia-500">{selectedArchetypeData.name}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{selectedArchetypeData.description}</p>
                          </div>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <h5 className="font-medium text-sm text-green-600 dark:text-green-400 mb-2">Strengths</h5>
                              <ul className="space-y-1">
                                {selectedArchetypeData.strengths.map((s, i) => (
                                  <li key={i} className="text-sm flex items-center gap-2">
                                    <CheckCircle2 className="w-3 h-3 text-green-500" />
                                    {s}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h5 className="font-medium text-sm text-amber-600 dark:text-amber-400 mb-2">Growth Areas</h5>
                              <ul className="space-y-1">
                                {selectedArchetypeData.growthAreas.map((g, i) => (
                                  <li key={i} className="text-sm flex items-center gap-2">
                                    <Sparkles className="w-3 h-3 text-amber-500" />
                                    {g}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    <div className="space-y-2">
                      <Label>Personal Notes (Optional)</Label>
                      <Textarea
                        placeholder="Add any personal reflections or insights from your assessment..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={4}
                      />
                    </div>

                    <Button 
                      onClick={handleSaveResult} 
                      disabled={saving || !selectedArchetype}
                      className="w-full"
                    >
                      {saving ? 'Saving...' : 'Save My Result'}
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-amber-500/30 bg-amber-500/5">
                  <CardContent className="pt-6 text-center">
                    <p className="text-muted-foreground mb-4">Sign in to save your assessment results to your profile</p>
                    <Link to="/auth">
                      <Button>Sign In to Save Results</Button>
                    </Link>
                  </CardContent>
                </Card>
              )}

              {/* Archetypes Overview */}
              <Card>
                <CardHeader>
                  <CardTitle>The Six Archetypes</CardTitle>
                  <CardDescription>
                    Learn about the different ways people navigate identity, faith, and Greek life
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {archetypes.map((archetype, index) => (
                      <div 
                        key={archetype.name} 
                        className="p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                      >
                        <h4 className="font-semibold text-fuchsia-500">{archetype.name}</h4>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {archetype.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="results" className="space-y-6">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="w-8 h-8 border-4 border-sacred border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : savedResults.length === 0 ? (
                <Card>
                  <CardContent className="pt-6 text-center py-12">
                    <Drama className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-semibold text-lg mb-2">No Saved Results</h3>
                    <p className="text-muted-foreground mb-4">
                      Take the assessment and save your archetype to see it here
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {savedResults.map((result) => (
                    <Card key={result.id} className="overflow-hidden">
                      <div className="h-1 bg-gradient-to-r from-fuchsia-500 to-pink-600" />
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-fuchsia-500">{result.archetype}</CardTitle>
                            <CardDescription className="flex items-center gap-2 mt-1">
                              <Calendar className="w-4 h-4" />
                              {format(new Date(result.created_at), 'MMMM d, yyyy')}
                            </CardDescription>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDeleteResult(result.id)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {result.archetype_description && (
                          <p className="text-sm text-muted-foreground">{result.archetype_description}</p>
                        )}
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          {result.strengths && result.strengths.length > 0 && (
                            <div>
                              <h5 className="font-medium text-sm text-green-600 dark:text-green-400 mb-2">Strengths</h5>
                              <ul className="space-y-1">
                                {result.strengths.map((s, i) => (
                                  <li key={i} className="text-sm flex items-center gap-2">
                                    <CheckCircle2 className="w-3 h-3 text-green-500" />
                                    {s}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {result.growth_areas && result.growth_areas.length > 0 && (
                            <div>
                              <h5 className="font-medium text-sm text-amber-600 dark:text-amber-400 mb-2">Growth Areas</h5>
                              <ul className="space-y-1">
                                {result.growth_areas.map((g, i) => (
                                  <li key={i} className="text-sm flex items-center gap-2">
                                    <Sparkles className="w-3 h-3 text-amber-500" />
                                    {g}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        {result.notes && (
                          <div className="p-3 bg-muted/50 rounded-lg">
                            <h5 className="font-medium text-sm mb-1">My Notes</h5>
                            <p className="text-sm text-muted-foreground">{result.notes}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default ShatteredMasks;
