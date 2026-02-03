import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Users,
  Search,
  Phone,
  Mail,
  MessageCircle,
  MoreVertical,
  Bell,
  BellOff,
  Edit,
  Trash2,
  Download,
  FileDown,
  Clock,
  Building,
  StickyNote,
} from 'lucide-react';
import { useSavedContacts, SavedContact } from '@/hooks/useSavedContacts';
import { ContactEditDialog } from './ContactEditDialog';
import { ReminderDialog } from './ReminderDialog';
import { format, isPast, isToday, isTomorrow } from 'date-fns';

export function SavedContactsList() {
  const { contacts, isLoading, deleteContact, exportContacts } = useSavedContacts();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [editingContact, setEditingContact] = useState<SavedContact | null>(null);
  const [reminderContact, setReminderContact] = useState<SavedContact | null>(null);

  const filteredContacts = contacts.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.organization?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSelect = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedIds.length === filteredContacts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredContacts.map(c => c.id));
    }
  };

  const handleQuickAction = (type: 'call' | 'email' | 'whatsapp', contact: SavedContact) => {
    switch (type) {
      case 'call':
        if (contact.phone) {
          window.open(`tel:${contact.phone}`, '_self');
        }
        break;
      case 'email':
        if (contact.email) {
          window.open(`mailto:${contact.email}`, '_blank');
        }
        break;
      case 'whatsapp':
        if (contact.phone) {
          const cleanPhone = contact.phone.replace(/\D/g, '');
          window.open(`https://wa.me/${cleanPhone}`, '_blank');
        }
        break;
    }
  };

  const downloadVCard = (contact: SavedContact) => {
    const vcard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${contact.name}`,
      contact.title ? `TITLE:${contact.title}` : '',
      contact.organization ? `ORG:${contact.organization}` : '',
      contact.email ? `EMAIL:${contact.email}` : '',
      contact.phone ? `TEL:${contact.phone}` : '',
      contact.website ? `URL:${contact.website}` : '',
      contact.notes ? `NOTE:${contact.notes}` : '',
      'END:VCARD'
    ].filter(Boolean).join('\n');

    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${contact.name}.vcf`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const getReminderBadge = (contact: SavedContact) => {
    if (!contact.reminder_at) return null;
    
    const reminderDate = new Date(contact.reminder_at);
    if (isPast(reminderDate) && !isToday(reminderDate)) {
      return <Badge variant="destructive" className="text-xs">Overdue</Badge>;
    }
    if (isToday(reminderDate)) {
      return <Badge className="bg-sacred text-xs">Today</Badge>;
    }
    if (isTomorrow(reminderDate)) {
      return <Badge variant="secondary" className="text-xs">Tomorrow</Badge>;
    }
    return (
      <Badge variant="outline" className="text-xs">
        {format(reminderDate, 'MMM d')}
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <div className="animate-pulse">Loading contacts...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-sacred" />
                Saved Contacts
              </CardTitle>
              <CardDescription>
                {contacts.length} contacts saved
              </CardDescription>
            </div>
            {contacts.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => exportContacts(selectedIds.length > 0 ? selectedIds : undefined)}
              >
                <FileDown className="w-4 h-4 mr-2" />
                Export {selectedIds.length > 0 ? `(${selectedIds.length})` : 'All'}
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {contacts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No saved contacts yet</p>
              <p className="text-sm">Scan a QR code or business card to get started</p>
            </div>
          ) : (
            <>
              {/* Search and Select All */}
              <div className="flex gap-2 items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search contacts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Button variant="outline" size="sm" onClick={selectAll}>
                  {selectedIds.length === filteredContacts.length ? 'Deselect' : 'Select All'}
                </Button>
              </div>

              {/* Contact List */}
              <div className="space-y-2">
                {filteredContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                  >
                    <Checkbox
                      checked={selectedIds.includes(contact.id)}
                      onCheckedChange={() => toggleSelect(contact.id)}
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-medium truncate">{contact.name}</p>
                        {getReminderBadge(contact)}
                        {contact.notes && (
                          <StickyNote className="w-3 h-3 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        {contact.organization && (
                          <span className="flex items-center gap-1 truncate">
                            <Building className="w-3 h-3" />
                            {contact.organization}
                          </span>
                        )}
                      </div>
                      {contact.notes && (
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                          {contact.notes}
                        </p>
                      )}
                    </div>

                    {/* Quick Actions */}
                    <div className="flex items-center gap-1">
                      {contact.phone && (
                        <>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleQuickAction('call', contact)}
                            title="Call"
                          >
                            <Phone className="w-4 h-4 text-sacred" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleQuickAction('whatsapp', contact)}
                            title="WhatsApp"
                          >
                            <MessageCircle className="w-4 h-4 text-sacred/80" />
                          </Button>
                        </>
                      )}
                      {contact.email && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleQuickAction('email', contact)}
                          title="Email"
                        >
                          <Mail className="w-4 h-4 text-primary" />
                        </Button>
                      )}

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setEditingContact(contact)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Notes
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setReminderContact(contact)}>
                            {contact.reminder_at ? (
                              <>
                                <Clock className="w-4 h-4 mr-2" />
                                Change Reminder
                              </>
                            ) : (
                              <>
                                <Bell className="w-4 h-4 mr-2" />
                                Set Reminder
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => downloadVCard(contact)}>
                            <Download className="w-4 h-4 mr-2" />
                            Download vCard
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => deleteContact(contact.id)}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {editingContact && (
        <ContactEditDialog
          contact={editingContact}
          open={!!editingContact}
          onOpenChange={(open) => !open && setEditingContact(null)}
        />
      )}

      {reminderContact && (
        <ReminderDialog
          contact={reminderContact}
          open={!!reminderContact}
          onOpenChange={(open) => !open && setReminderContact(null)}
        />
      )}
    </>
  );
}
