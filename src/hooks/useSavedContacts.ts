import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface SavedContact {
  id: string;
  user_id: string;
  name: string;
  email?: string;
  phone?: string;
  organization?: string;
  title?: string;
  website?: string;
  notes?: string;
  source: string;
  reminder_at?: string;
  reminder_sent: boolean;
  created_at: string;
  updated_at: string;
}

export interface NewContact {
  name: string;
  email?: string;
  phone?: string;
  organization?: string;
  title?: string;
  website?: string;
  notes?: string;
  source?: string;
  reminder_at?: string;
}

export function useSavedContacts() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [contacts, setContacts] = useState<SavedContact[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchContacts = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('saved_contacts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setContacts(data || []);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [user]);

  const saveContact = async (contact: NewContact): Promise<SavedContact | null> => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('saved_contacts')
        .insert({
          user_id: user.id,
          ...contact,
          source: contact.source || 'manual'
        })
        .select()
        .single();

      if (error) throw error;

      setContacts(prev => [data, ...prev]);
      toast({
        title: 'Contact Saved!',
        description: `${contact.name} has been added to your contacts`,
      });
      return data;
    } catch (error) {
      console.error('Error saving contact:', error);
      toast({
        title: 'Error',
        description: 'Failed to save contact',
        variant: 'destructive',
      });
      return null;
    }
  };

  const updateContact = async (id: string, updates: Partial<NewContact>): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('saved_contacts')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      setContacts(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
      toast({
        title: 'Contact Updated',
        description: 'Changes saved successfully',
      });
      return true;
    } catch (error) {
      console.error('Error updating contact:', error);
      toast({
        title: 'Error',
        description: 'Failed to update contact',
        variant: 'destructive',
      });
      return false;
    }
  };

  const deleteContact = async (id: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('saved_contacts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setContacts(prev => prev.filter(c => c.id !== id));
      toast({
        title: 'Contact Deleted',
        description: 'Contact removed from your list',
      });
      return true;
    } catch (error) {
      console.error('Error deleting contact:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete contact',
        variant: 'destructive',
      });
      return false;
    }
  };

  const setReminder = async (id: string, reminderAt: Date | null): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('saved_contacts')
        .update({ 
          reminder_at: reminderAt?.toISOString() || null,
          reminder_sent: false 
        })
        .eq('id', id);

      if (error) throw error;

      setContacts(prev => prev.map(c => 
        c.id === id ? { ...c, reminder_at: reminderAt?.toISOString(), reminder_sent: false } : c
      ));
      
      toast({
        title: reminderAt ? 'Reminder Set' : 'Reminder Cleared',
        description: reminderAt 
          ? `You'll be reminded on ${reminderAt.toLocaleDateString()}` 
          : 'Follow-up reminder has been cleared',
      });
      return true;
    } catch (error) {
      console.error('Error setting reminder:', error);
      toast({
        title: 'Error',
        description: 'Failed to set reminder',
        variant: 'destructive',
      });
      return false;
    }
  };

  const exportContacts = (selectedIds?: string[]) => {
    const toExport = selectedIds 
      ? contacts.filter(c => selectedIds.includes(c.id))
      : contacts;

    if (toExport.length === 0) {
      toast({
        title: 'No Contacts',
        description: 'No contacts to export',
        variant: 'destructive',
      });
      return;
    }

    // Generate CSV
    const headers = ['Name', 'Email', 'Phone', 'Organization', 'Title', 'Notes', 'Added On'];
    const rows = toExport.map(c => [
      c.name,
      c.email || '',
      c.phone || '',
      c.organization || '',
      c.title || '',
      c.notes?.replace(/,/g, ';') || '',
      new Date(c.created_at).toLocaleDateString()
    ]);

    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sacred-connections-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);

    toast({
      title: 'Contacts Exported',
      description: `${toExport.length} contacts exported to CSV`,
    });
  };

  return {
    contacts,
    isLoading,
    saveContact,
    updateContact,
    deleteContact,
    setReminder,
    exportContacts,
    refetch: fetchContacts,
  };
}
