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
import { Label } from '@/components/ui/label';
import { Bell, BellOff, Clock, Calendar } from 'lucide-react';
import { useSavedContacts, SavedContact } from '@/hooks/useSavedContacts';
import { format } from 'date-fns';

interface ReminderDialogProps {
  contact: SavedContact;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const REMINDER_OPTIONS = [
  { label: 'Tomorrow', days: 1, icon: '🌅' },
  { label: 'In 3 days', days: 3, icon: '📅' },
  { label: 'In 1 week', days: 7, icon: '📆' },
  { label: 'In 2 weeks', days: 14, icon: '🗓️' },
  { label: 'In 1 month', days: 30, icon: '📋' },
];

export function ReminderDialog({ contact, open, onOpenChange }: ReminderDialogProps) {
  const { setReminder } = useSavedContacts();
  const [selectedDays, setSelectedDays] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleSetReminder = async () => {
    setIsSaving(true);
    
    let reminderDate: Date | null = null;
    if (selectedDays !== null) {
      reminderDate = new Date();
      reminderDate.setDate(reminderDate.getDate() + selectedDays);
    }

    const success = await setReminder(contact.id, reminderDate);
    setIsSaving(false);
    
    if (success) {
      onOpenChange(false);
    }
  };

  const handleClearReminder = async () => {
    setIsSaving(true);
    const success = await setReminder(contact.id, null);
    setIsSaving(false);
    
    if (success) {
      onOpenChange(false);
    }
  };

  const getReminderDate = (days: number) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return format(date, 'EEEE, MMMM d');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-sacred" />
            Set Follow-up Reminder
          </DialogTitle>
          <DialogDescription>
            Get reminded to follow up with {contact.name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {contact.reminder_at && (
            <div className="bg-sacred/10 border border-sacred/20 rounded-lg p-3 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-sacred" />
                <span>Current reminder: {format(new Date(contact.reminder_at), 'MMMM d, yyyy')}</span>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label>Remind me</Label>
            <div className="grid grid-cols-1 gap-2">
              {REMINDER_OPTIONS.map((option) => (
                <Button
                  key={option.days}
                  type="button"
                  variant={selectedDays === option.days ? 'default' : 'outline'}
                  className={`justify-between ${selectedDays === option.days ? 'bg-sacred hover:bg-sacred/90' : ''}`}
                  onClick={() => setSelectedDays(
                    selectedDays === option.days ? null : option.days
                  )}
                >
                  <span className="flex items-center gap-2">
                    <span>{option.icon}</span>
                    <span>{option.label}</span>
                  </span>
                  <span className="text-xs opacity-70">
                    {getReminderDate(option.days)}
                  </span>
                </Button>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          {contact.reminder_at && (
            <Button 
              variant="outline" 
              onClick={handleClearReminder}
              disabled={isSaving}
              className="w-full sm:w-auto"
            >
              <BellOff className="w-4 h-4 mr-2" />
              Clear Reminder
            </Button>
          )}
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1 sm:flex-none">
              Cancel
            </Button>
            <Button 
              onClick={handleSetReminder} 
              disabled={isSaving || selectedDays === null}
              className="flex-1 sm:flex-none bg-sacred hover:bg-sacred/90"
            >
              <Bell className="w-4 h-4 mr-2" />
              {isSaving ? 'Setting...' : 'Set Reminder'}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
