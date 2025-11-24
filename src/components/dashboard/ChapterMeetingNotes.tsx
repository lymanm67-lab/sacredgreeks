import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { FileText, Plus, Calendar } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface MeetingNote {
  id: string;
  title: string;
  meeting_date: string;
  notes: string;
  attendees: string;
  action_items: string;
  created_at: string;
}

export const ChapterMeetingNotes = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [notes, setNotes] = useState<MeetingNote[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    meeting_date: '',
    notes: '',
    attendees: '',
    action_items: ''
  });

  useEffect(() => {
    if (user) {
      loadNotes();
    }
  }, [user]);

  const loadNotes = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('chapter_meeting_notes')
        .select('*')
        .eq('user_id', user.id)
        .order('meeting_date', { ascending: false })
        .limit(5);

      if (error) throw error;
      setNotes(data || []);
    } catch (error) {
      console.error('Error loading notes:', error);
    } finally {
      setLoading(false);
    }
  };

  const addNote = async () => {
    if (!user || !formData.title.trim() || !formData.meeting_date) return;

    try {
      const { error } = await supabase
        .from('chapter_meeting_notes')
        .insert({
          user_id: user.id,
          ...formData
        });

      if (error) throw error;

      setFormData({
        title: '',
        meeting_date: '',
        notes: '',
        attendees: '',
        action_items: ''
      });
      setIsOpen(false);
      loadNotes();
      toast({
        title: 'Saved',
        description: 'Meeting notes saved successfully',
      });
    } catch (error) {
      console.error('Error adding note:', error);
      toast({
        title: 'Error',
        description: 'Failed to save meeting notes',
        variant: 'destructive',
      });
    }
  };

  if (loading) return null;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-sacred" />
            <CardTitle>Chapter Meeting Notes</CardTitle>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Note
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>New Meeting Note</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Meeting Title</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Weekly Chapter Meeting"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Date</label>
                  <Input
                    type="date"
                    value={formData.meeting_date}
                    onChange={(e) => setFormData({ ...formData, meeting_date: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Attendees</label>
                  <Input
                    value={formData.attendees}
                    onChange={(e) => setFormData({ ...formData, attendees: e.target.value })}
                    placeholder="Names of attendees..."
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Notes</label>
                  <Textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Meeting notes..."
                    rows={4}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Action Items</label>
                  <Textarea
                    value={formData.action_items}
                    onChange={(e) => setFormData({ ...formData, action_items: e.target.value })}
                    placeholder="Action items and follow-ups..."
                    rows={3}
                  />
                </div>
                <Button onClick={addNote} className="w-full">
                  Save Meeting Note
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {notes.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              No meeting notes yet. Click "Add Note" to create your first one!
            </p>
          ) : (
            notes.map((note) => (
              <div key={note.id} className="p-3 border rounded-lg hover:bg-muted/50">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium">{note.title}</h3>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {format(new Date(note.meeting_date), 'MMM d, yyyy')}
                  </div>
                </div>
                {note.notes && (
                  <p className="text-sm text-muted-foreground line-clamp-2">{note.notes}</p>
                )}
                {note.action_items && (
                  <div className="mt-2">
                    <span className="text-xs font-medium text-sacred">Action Items:</span>
                    <p className="text-xs text-muted-foreground line-clamp-1">{note.action_items}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};