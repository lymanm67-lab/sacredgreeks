import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Bookmark, Save } from 'lucide-react';

interface BookmarkNotesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  itemName: string;
  initialNotes?: string;
  onSave: (notes: string) => void;
  isEditing?: boolean;
}

const BookmarkNotesDialog = ({ 
  open, 
  onOpenChange, 
  itemName, 
  initialNotes = '', 
  onSave,
  isEditing = false 
}: BookmarkNotesDialogProps) => {
  const [notes, setNotes] = useState(initialNotes);

  const handleSave = () => {
    onSave(notes);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-sacred" />
            {isEditing ? 'Edit' : 'Add'} Personal Notes
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{itemName}</span>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Your Reflections</Label>
            <Textarea
              id="notes"
              placeholder="Write your personal reflections, questions, or notes here..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[150px] resize-none"
            />
            <p className="text-xs text-muted-foreground">
              These notes are private and only visible to you.
            </p>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="gap-2">
            <Save className="w-4 h-4" />
            {isEditing ? 'Save Changes' : 'Save Bookmark'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookmarkNotesDialog;
