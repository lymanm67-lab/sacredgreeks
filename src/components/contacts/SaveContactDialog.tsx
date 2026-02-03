import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Bell, BellOff, Save, Clock } from 'lucide-react';
import { useSavedContacts, NewContact } from '@/hooks/useSavedContacts';

interface SaveContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contact: NewContact;
  source: 'qr_scan' | 'business_card';
  onSaved?: () => void;
}

const REMINDER_OPTIONS = [
  { label: 'Tomorrow', days: 1 },
  { label: 'In 3 days', days: 3 },
  { label: 'In 1 week', days: 7 },
  { label: 'In 2 weeks', days: 14 },
  { label: 'In 1 month', days: 30 },
];

export function SaveContactDialog({ 
  open, 
  onOpenChange, 
  contact, 
  source,
  onSaved 
}: SaveContactDialogProps) {
  const { saveContact } = useSavedContacts();
  const [notes, setNotes] = useState('');
  const [selectedReminder, setSelectedReminder] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    
    let reminderAt: string | undefined;
    if (selectedReminder !== null) {
      const date = new Date();
      date.setDate(date.getDate() + selectedReminder);
      reminderAt = date.toISOString();
    }

    const savedContact = await saveContact({
      ...contact,
      notes: notes || undefined,
      reminder_at: reminderAt,
      source,
    });

    setIsSaving(false);
    
    if (savedContact) {
      setNotes('');
      setSelectedReminder(null);
      onOpenChange(false);
      onSaved?.();
    }
  };

  const getReminderDate = (days: number) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toLocaleDateString();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Save Contact</DialogTitle>
          <DialogDescription>
            Add notes and set a follow-up reminder for {contact.name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Contact Preview */}
          <div className="bg-muted/50 rounded-lg p-3">
            <p className="font-medium">{contact.name}</p>
            {contact.organization && (
              <p className="text-sm text-muted-foreground">{contact.organization}</p>
            )}
            {contact.email && (
              <p className="text-sm text-muted-foreground">{contact.email}</p>
            )}
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Private Notes</Label>
            <Textarea
              id="notes"
              placeholder="Where did you meet? What did you discuss? Any follow-up items?"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          {/* Reminder */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Follow-up Reminder
            </Label>
            <div className="flex flex-wrap gap-2">
              {REMINDER_OPTIONS.map((option) => (
                <Button
                  key={option.days}
                  type="button"
                  variant={selectedReminder === option.days ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedReminder(
                    selectedReminder === option.days ? null : option.days
                  )}
                  className={selectedReminder === option.days ? 'bg-sacred hover:bg-sacred/90' : ''}
                >
                  <Clock className="w-3 h-3 mr-1" />
                  {option.label}
                </Button>
              ))}
            </div>
            {selectedReminder !== null && (
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Bell className="w-3 h-3" />
                Reminder set for {getReminderDate(selectedReminder)}
              </p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={isSaving}
            className="bg-sacred hover:bg-sacred/90"
          >
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? 'Saving...' : 'Save Contact'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
