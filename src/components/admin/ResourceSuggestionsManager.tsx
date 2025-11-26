import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExternalLink, Check, X, Clock } from 'lucide-react';

interface ResourceSuggestion {
  id: string;
  title: string;
  description: string;
  url: string;
  resource_type: string;
  category: string;
  status: string;
  admin_notes: string | null;
  created_at: string;
  user_id: string;
}

export const ResourceSuggestionsManager = () => {
  const { toast } = useToast();
  const [suggestions, setSuggestions] = useState<ResourceSuggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pending');
  const [adminNotes, setAdminNotes] = useState<Record<string, string>>({});

  useEffect(() => {
    loadSuggestions();
  }, []);

  const loadSuggestions = async () => {
    try {
      const { data, error } = await supabase
        .from('resource_suggestions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSuggestions(data || []);
    } catch (error) {
      console.error('Error loading suggestions:', error);
      toast({
        title: 'Error',
        description: 'Failed to load resource suggestions',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateSuggestionStatus = async (id: string, status: 'approved' | 'rejected', notes?: string) => {
    try {
      const { error } = await supabase
        .from('resource_suggestions')
        .update({
          status,
          admin_notes: notes || adminNotes[id] || null,
          reviewed_at: new Date().toISOString(),
        })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: `Suggestion ${status}`,
      });

      loadSuggestions();
      setAdminNotes((prev) => {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      });
    } catch (error) {
      console.error('Error updating suggestion:', error);
      toast({
        title: 'Error',
        description: 'Failed to update suggestion',
        variant: 'destructive',
      });
    }
  };

  const filteredSuggestions = suggestions.filter(
    (s) => s.status === activeTab
  );

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">Loading suggestions...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resource Suggestions</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending" className="gap-2">
              <Clock className="w-4 h-4" />
              Pending ({suggestions.filter((s) => s.status === 'pending').length})
            </TabsTrigger>
            <TabsTrigger value="approved" className="gap-2">
              <Check className="w-4 h-4" />
              Approved ({suggestions.filter((s) => s.status === 'approved').length})
            </TabsTrigger>
            <TabsTrigger value="rejected" className="gap-2">
              <X className="w-4 h-4" />
              Rejected ({suggestions.filter((s) => s.status === 'rejected').length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4 mt-4">
            {filteredSuggestions.length === 0 ? (
              <p className="text-center py-8 text-muted-foreground">
                No {activeTab} suggestions
              </p>
            ) : (
              filteredSuggestions.map((suggestion) => (
                <div
                  key={suggestion.id}
                  className="border rounded-lg p-4 space-y-3"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{suggestion.title}</h3>
                        <Badge variant="outline">{suggestion.resource_type}</Badge>
                        <Badge variant="secondary">{suggestion.category}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {suggestion.description}
                      </p>
                      <a
                        href={suggestion.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline flex items-center gap-1"
                      >
                        {suggestion.url}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <p className="text-xs text-muted-foreground mt-2">
                        Submitted: {new Date(suggestion.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {suggestion.admin_notes && (
                    <div className="bg-muted p-3 rounded text-sm">
                      <p className="font-medium mb-1">Admin Notes:</p>
                      <p className="text-muted-foreground">{suggestion.admin_notes}</p>
                    </div>
                  )}

                  {suggestion.status === 'pending' && (
                    <div className="space-y-2">
                      <Textarea
                        placeholder="Add notes (optional)"
                        value={adminNotes[suggestion.id] || ''}
                        onChange={(e) =>
                          setAdminNotes((prev) => ({
                            ...prev,
                            [suggestion.id]: e.target.value,
                          }))
                        }
                        rows={2}
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() =>
                            updateSuggestionStatus(suggestion.id, 'approved')
                          }
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Check className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() =>
                            updateSuggestionStatus(suggestion.id, 'rejected')
                          }
                        >
                          <X className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
