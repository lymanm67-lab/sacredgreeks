import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Camera, Upload, Download, Loader2, CreditCard, CheckCircle, Edit, Save, Play } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { SaveContactDialog } from './SaveContactDialog';
import { useAuth } from '@/contexts/AuthContext';
import { useDemoMode } from '@/contexts/DemoModeContext';
import { DEMO_BUSINESS_CARD_CONTACT } from '@/data/demoContactsData';

interface BusinessCardScannerProps {
  onScanSuccess?: () => void;
}

interface ExtractedContact {
  name: string;
  title?: string;
  company?: string;
  email?: string;
  phone?: string;
  address?: string;
  website?: string;
}

export function BusinessCardScanner({ onScanSuccess }: BusinessCardScannerProps) {
  const { toast } = useToast();
  const { user } = useAuth();
  const { isDemoMode, demoSettings } = useDemoMode();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedContact, setExtractedContact] = useState<ExtractedContact | null>(null);
  const [editedContact, setEditedContact] = useState<ExtractedContact | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  const isPresentationMode = demoSettings.presentationMode;
  const showDemoMode = !user || isDemoMode || isPresentationMode;

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Process with AI
    await processBusinessCard(file);
  };

  const processBusinessCard = async (file: File) => {
    setIsProcessing(true);
    setExtractedContact(null);

    try {
      // Convert to base64
      const base64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsDataURL(file);
      });

      // Call edge function for AI extraction
      const { data, error } = await supabase.functions.invoke('parse-business-card', {
        body: { image: base64 }
      });

      if (error) throw error;

      if (data?.contact) {
        setExtractedContact(data.contact);
        setEditedContact(data.contact);
        toast({
          title: 'Card Scanned!',
          description: 'Contact information extracted successfully',
        });
        onScanSuccess?.();
      } else {
        throw new Error('Could not extract contact information');
      }
    } catch (error) {
      console.error('Error processing card:', error);
      toast({
        title: 'Scan Failed',
        description: 'Could not extract contact information. Try a clearer image.',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const saveContact = () => {
    const contact = editedContact || extractedContact;
    if (!contact) return;

    // Generate vCard
    const vcard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${contact.name}`,
      contact.title ? `TITLE:${contact.title}` : '',
      contact.company ? `ORG:${contact.company}` : '',
      contact.email ? `EMAIL:${contact.email}` : '',
      contact.phone ? `TEL:${contact.phone}` : '',
      contact.address ? `ADR:;;${contact.address};;;;` : '',
      contact.website ? `URL:${contact.website}` : '',
      'NOTE:Scanned via Sacred Greeks Life App',
      'END:VCARD'
    ].filter(Boolean).join('\n');

    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${contact.name}.vcf`;
    link.click();
    URL.revokeObjectURL(url);

    toast({
      title: 'Contact Saved!',
      description: `${contact.name} has been added to your contacts`,
    });
  };

  const resetScanner = () => {
    setExtractedContact(null);
    setEditedContact(null);
    setPreviewImage(null);
    setIsEditing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleEditChange = (field: keyof ExtractedContact, value: string) => {
    setEditedContact(prev => prev ? { ...prev, [field]: value } : null);
  };

  const handleDemoScan = () => {
    setExtractedContact(DEMO_BUSINESS_CARD_CONTACT);
    setEditedContact(DEMO_BUSINESS_CARD_CONTACT);
    setPreviewImage(null);
    toast({
      title: 'Demo Card Scanned!',
      description: 'Contact information extracted successfully',
    });
    onScanSuccess?.();
  };

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <CreditCard className="w-5 h-5 text-sacred" />
          Scan Business Card
          {showDemoMode && (
            <Badge variant="secondary" className="text-xs">Demo</Badge>
          )}
        </CardTitle>
        <CardDescription>
          Take a photo of a physical business card to extract contact info
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {extractedContact ? (
          <div className="space-y-4">
            {previewImage && (
              <div className="relative">
                <img
                  src={previewImage} 
                  alt="Business card" 
                  className="w-full rounded-lg opacity-50"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <CheckCircle className="w-16 h-16 text-green-500" />
                </div>
              </div>
            )}

            {isEditing ? (
              <div className="space-y-3 bg-muted/50 rounded-lg p-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name"
                    value={editedContact?.name || ''} 
                    onChange={(e) => handleEditChange('name', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input 
                    id="title"
                    value={editedContact?.title || ''} 
                    onChange={(e) => handleEditChange('title', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input 
                    id="company"
                    value={editedContact?.company || ''} 
                    onChange={(e) => handleEditChange('company', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email"
                    type="email"
                    value={editedContact?.email || ''} 
                    onChange={(e) => handleEditChange('email', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input 
                    id="phone"
                    value={editedContact?.phone || ''} 
                    onChange={(e) => handleEditChange('phone', e.target.value)}
                  />
                </div>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setIsEditing(false)}
                >
                  Done Editing
                </Button>
              </div>
            ) : (
              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{editedContact?.name}</h3>
                    {editedContact?.title && (
                      <p className="text-sm text-muted-foreground">{editedContact.title}</p>
                    )}
                    {editedContact?.company && (
                      <p className="text-sm text-muted-foreground">{editedContact.company}</p>
                    )}
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
                {editedContact?.email && (
                  <p className="text-sm">{editedContact.email}</p>
                )}
                {editedContact?.phone && (
                  <p className="text-sm">{editedContact.phone}</p>
                )}
              </div>
            )}

            <div className="flex gap-3">
              {user ? (
                <Button onClick={() => setShowSaveDialog(true)} className="flex-1 bg-sacred hover:bg-sacred/90">
                  <Save className="w-4 h-4 mr-2" />
                  Save to My Contacts
                </Button>
              ) : (
                <Button onClick={saveContact} className="flex-1 bg-sacred hover:bg-sacred/90">
                  <Download className="w-4 h-4 mr-2" />
                  Download vCard
                </Button>
              )}
              <Button variant="outline" onClick={resetScanner}>
                Scan Another
              </Button>
            </div>
          </div>
        ) : (
          <>
            {previewImage && isProcessing ? (
              <div className="relative">
                <img 
                  src={previewImage} 
                  alt="Processing..." 
                  className="w-full rounded-lg opacity-50"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <Loader2 className="w-12 h-12 text-sacred animate-spin mb-2" />
                  <p className="text-sm font-medium">Extracting contact info...</p>
                </div>
              </div>
            ) : (
              <div 
                className="w-full aspect-[1.75] rounded-lg bg-muted flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/30 cursor-pointer hover:bg-muted/80 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <CreditCard className="w-16 h-16 text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground text-center px-4">
                  Tap to take a photo or upload a business card
                </p>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={handleFileSelect}
            />

            {showDemoMode && (
              <Button 
                onClick={handleDemoScan}
                className="w-full bg-sacred hover:bg-sacred/90 mb-2"
              >
                <Play className="w-4 h-4 mr-2" />
                Try Demo Scan
              </Button>
            )}

            <div className="flex gap-3">
              <Button 
                onClick={() => fileInputRef.current?.click()}
                className={`flex-1 ${showDemoMode ? '' : 'bg-sacred hover:bg-sacred/90'}`}
                variant={showDemoMode ? 'outline' : 'default'}
                disabled={isProcessing}
              >
                <Camera className="w-4 h-4 mr-2" />
                Take Photo
              </Button>
              <Button 
                variant="outline"
                onClick={() => {
                  if (fileInputRef.current) {
                    fileInputRef.current.removeAttribute('capture');
                    fileInputRef.current.click();
                    fileInputRef.current.setAttribute('capture', 'environment');
                  }
                }}
                disabled={isProcessing}
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload
              </Button>
            </div>
          </>
        )}
      </CardContent>

      {editedContact && (
        <SaveContactDialog
          open={showSaveDialog}
          onOpenChange={setShowSaveDialog}
          contact={{
            name: editedContact.name,
            email: editedContact.email,
            phone: editedContact.phone,
            organization: editedContact.company,
            title: editedContact.title,
            website: editedContact.website,
          }}
          source="business_card"
          onSaved={() => {
            onScanSuccess?.();
            resetScanner();
          }}
        />
      )}
    </Card>
  );
}
