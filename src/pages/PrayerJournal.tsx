import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Home, Plus, Check, Trash2, Search, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { prayerJournalSchema } from '@/lib/validation';

interface Prayer {
  id: string;
  title: string;
  content: string;
  prayer_type: string;
  answered: boolean;
  answered_at: string | null;
  created_at: string;
}

const PrayerJournal = () => {
  const { user } = useAuth();
  const [prayers, setPrayers] = useState<Prayer[]>([]);
  const [filteredPrayers, setFilteredPrayers] = useState<Prayer[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadPrayers();
  }, [user]);

  useEffect(() => {
    // Filter prayers based on search query
    if (!searchQuery.trim()) {
      setFilteredPrayers(prayers);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = prayers.filter(
        (prayer) =>
          prayer.title.toLowerCase().includes(query) ||
          prayer.content?.toLowerCase().includes(query) ||
          prayer.prayer_type.toLowerCase().includes(query)
      );
      setFilteredPrayers(filtered);
    }
  }, [searchQuery, prayers]);

  const loadPrayers = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('prayer_journal')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) {
        setPrayers(data);
        setFilteredPrayers(data);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load prayers',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const prayerType = formData.get('prayer_type') as string;

    try {
      const validated = prayerJournalSchema.parse({
        title,
        content,
        prayer_type: prayerType
      });

      const { error } = await supabase
        .from('prayer_journal')
        .insert({
          user_id: user.id,
          title: validated.title,
          content: validated.content,
          prayer_type: validated.prayer_type,
        });

      if (error) throw error;

      toast({
        title: 'Prayer added',
        description: 'Your prayer has been recorded.',
      });

      setDialogOpen(false);
      loadPrayers();
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: 'Validation Error',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Error',
          description: 'Failed to add prayer',
          variant: 'destructive',
        });
      }
    }
  };

  const markAnswered = async (prayerId: string) => {
    try {
      const { error } = await supabase
        .from('prayer_journal')
        .update({ 
          answered: true,
          answered_at: new Date().toISOString()
        })
        .eq('id', prayerId);

      if (error) throw error;

      toast({
        title: 'Prayer answered!',
        description: 'Praise God for His faithfulness.',
      });

      loadPrayers();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to mark prayer as answered',
        variant: 'destructive',
      });
    }
  };

  const deletePrayer = async () => {
    if (!deleteId) return;

    try {
      const { error } = await supabase
        .from('prayer_journal')
        .delete()
        .eq('id', deleteId);

      if (error) throw error;

      setPrayers(prayers.filter(p => p.id !== deleteId));
      toast({
        title: 'Prayer deleted',
        description: 'Prayer has been removed from your journal.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete prayer',
        variant: 'destructive',
      });
    } finally {
      setDeleteId(null);
    }
  };

  const getPrayerTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      request: 'Request',
      thanksgiving: 'Thanksgiving',
      confession: 'Confession',
      praise: 'Praise'
    };
    return labels[type] || type;
  };

  const getPrayerTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      request: 'bg-blue-100 text-blue-800',
      thanksgiving: 'bg-green-100 text-green-800',
      confession: 'bg-purple-100 text-purple-800',
      praise: 'bg-yellow-100 text-yellow-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(prayers, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `prayer-journal-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);

    toast({
      title: 'Export successful',
      description: 'Your prayer journal has been downloaded.',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-sacred border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Loading prayers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <Link to="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <Home className="w-4 h-4" />
            <span className="text-sm font-medium">Dashboard</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold">Prayer Journal</h1>
              <p className="text-muted-foreground mt-2">Record your prayers and see God's faithfulness</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleExport} disabled={prayers.length === 0}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-sacred hover:bg-sacred/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Prayer
                  </Button>
                </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Prayer</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="Brief title for this prayer"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="prayer_type">Prayer Type</Label>
                    <Select name="prayer_type" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="request">Request</SelectItem>
                        <SelectItem value="thanksgiving">Thanksgiving</SelectItem>
                        <SelectItem value="confession">Confession</SelectItem>
                        <SelectItem value="praise">Praise</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="content">Prayer</Label>
                    <Textarea
                      id="content"
                      name="content"
                      placeholder="Write your prayer..."
                      rows={6}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-sacred hover:bg-sacred/90">
                    Save Prayer
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
            </div>
          </div>

          {/* Search */}
          {prayers.length > 0 && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search prayers by title, content, or type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          )}

          {/* Prayers List */}
          {filteredPrayers.length === 0 && prayers.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <p className="text-muted-foreground mb-4">No prayers yet. Start your prayer journal today!</p>
                <Button onClick={() => setDialogOpen(true)} className="bg-sacred hover:bg-sacred/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Add First Prayer
                </Button>
              </CardContent>
            </Card>
          ) : filteredPrayers.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <p className="text-muted-foreground">No prayers match your search. Try different keywords.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredPrayers.map((prayer) => (
                <Card key={prayer.id} className={prayer.answered ? 'border-green-500/50 bg-green-50/50' : ''}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle>{prayer.title}</CardTitle>
                          {prayer.answered && (
                            <span className="inline-flex items-center text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                              <Check className="w-3 h-3 mr-1" />
                              Answered
                            </span>
                          )}
                        </div>
                        <span className={`inline-block text-xs px-2 py-1 rounded ${getPrayerTypeColor(prayer.prayer_type)}`}>
                          {getPrayerTypeLabel(prayer.prayer_type)}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        {!prayer.answered && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => markAnswered(prayer.id)}
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setDeleteId(prayer.id)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground whitespace-pre-wrap mb-3">{prayer.content}</p>
                    <div className="text-sm text-muted-foreground">
                      <p>Recorded: {new Date(prayer.created_at).toLocaleDateString()}</p>
                      {prayer.answered_at && (
                        <p>Answered: {new Date(prayer.answered_at).toLocaleDateString()}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Prayer?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This prayer will be permanently removed from your journal.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deletePrayer} className="bg-destructive hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PrayerJournal;