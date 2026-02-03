import { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, CameraOff, Download, UserPlus, CheckCircle, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SaveContactDialog } from './SaveContactDialog';
import { useAuth } from '@/contexts/AuthContext';

interface ContactScannerProps {
  onScanSuccess?: () => void;
}

interface ParsedContact {
  name: string;
  email?: string;
  phone?: string;
  organization?: string;
  note?: string;
}

export function ContactScanner({ onScanSuccess }: ContactScannerProps) {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isScanning, setIsScanning] = useState(false);
  const [scannedContact, setScannedContact] = useState<ParsedContact | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, []);

  const parseVCard = (vcard: string): ParsedContact | null => {
    try {
      const lines = vcard.split(/\r?\n/);
      const contact: ParsedContact = { name: '' };

      for (const line of lines) {
        if (line.startsWith('FN:')) {
          contact.name = line.substring(3);
        } else if (line.startsWith('EMAIL')) {
          const emailMatch = line.match(/EMAIL[^:]*:(.*)/);
          if (emailMatch) contact.email = emailMatch[1];
        } else if (line.startsWith('TEL')) {
          const telMatch = line.match(/TEL[^:]*:(.*)/);
          if (telMatch) contact.phone = telMatch[1];
        } else if (line.startsWith('ORG:')) {
          contact.organization = line.substring(4);
        } else if (line.startsWith('NOTE:')) {
          contact.note = line.substring(5);
        }
      }

      return contact.name ? contact : null;
    } catch {
      return null;
    }
  };

  const startScanner = async () => {
    setError(null);
    
    try {
      const scanner = new Html5Qrcode('qr-reader');
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          handleScanResult(decodedText);
          stopScanner();
        },
        () => {
          // QR code not found - keep scanning
        }
      );

      setIsScanning(true);
    } catch (err) {
      console.error('Scanner error:', err);
      setError('Unable to access camera. Please check permissions.');
      setIsScanning(false);
    }
  };

  const stopScanner = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
        scannerRef.current.clear();
      } catch (err) {
        console.error('Error stopping scanner:', err);
      }
      scannerRef.current = null;
    }
    setIsScanning(false);
  };

  const handleScanResult = (result: string) => {
    // Check if it's a vCard
    if (result.includes('BEGIN:VCARD')) {
      const contact = parseVCard(result);
      if (contact) {
        setScannedContact(contact);
        toast({
          title: 'Contact Found!',
          description: `Scanned ${contact.name}'s contact card`,
        });
        onScanSuccess?.();
      } else {
        setError('Could not parse contact information');
      }
    } else {
      // Not a vCard - might be a URL or other data
      setError('QR code does not contain contact information');
    }
  };

  const saveContact = () => {
    if (!scannedContact) return;

    // Generate vCard and trigger download
    const vcard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${scannedContact.name}`,
      scannedContact.email ? `EMAIL:${scannedContact.email}` : '',
      scannedContact.phone ? `TEL:${scannedContact.phone}` : '',
      scannedContact.organization ? `ORG:${scannedContact.organization}` : '',
      scannedContact.note ? `NOTE:${scannedContact.note}` : '',
      'END:VCARD'
    ].filter(Boolean).join('\n');

    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${scannedContact.name}.vcf`;
    link.click();
    URL.revokeObjectURL(url);

    toast({
      title: 'Contact Saved!',
      description: `${scannedContact.name} has been added to your contacts`,
    });
  };

  const resetScanner = () => {
    setScannedContact(null);
    setError(null);
  };

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <Camera className="w-5 h-5 text-sacred" />
          Scan QR Code
        </CardTitle>
        <CardDescription>
          Scan someone's digital card to save their contact
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {scannedContact ? (
          <div className="space-y-4">
            <div className="bg-sacred/10 border border-sacred/20 rounded-lg p-4 text-center">
              <CheckCircle className="w-12 h-12 text-sacred mx-auto mb-3" />
              <h3 className="font-semibold text-lg">{scannedContact.name}</h3>
              {scannedContact.email && (
                <p className="text-sm text-muted-foreground">{scannedContact.email}</p>
              )}
              {scannedContact.phone && (
                <p className="text-sm text-muted-foreground">{scannedContact.phone}</p>
              )}
              {scannedContact.organization && (
                <p className="text-sm text-muted-foreground">{scannedContact.organization}</p>
              )}
            </div>

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
            <div 
              id="qr-reader" 
              ref={containerRef}
              className={`w-full aspect-square rounded-lg overflow-hidden bg-muted ${!isScanning ? 'hidden' : ''}`}
            />

            {!isScanning && (
              <div className="w-full aspect-square rounded-lg bg-muted flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/30">
                <Camera className="w-16 h-16 text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground text-center px-4">
                  Point your camera at a QR code to scan
                </p>
              </div>
            )}

            {error && (
              <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg text-center">
                {error}
              </div>
            )}

            <Button 
              onClick={isScanning ? stopScanner : startScanner}
              className={`w-full ${isScanning ? '' : 'bg-sacred hover:bg-sacred/90'}`}
              variant={isScanning ? 'outline' : 'default'}
            >
              {isScanning ? (
                <>
                  <CameraOff className="w-4 h-4 mr-2" />
                  Stop Scanning
                </>
              ) : (
                <>
                  <Camera className="w-4 h-4 mr-2" />
                  Start Scanner
                </>
              )}
            </Button>
          </>
        )}
      </CardContent>

      {scannedContact && (
        <SaveContactDialog
          open={showSaveDialog}
          onOpenChange={setShowSaveDialog}
          contact={{
            name: scannedContact.name,
            email: scannedContact.email,
            phone: scannedContact.phone,
            organization: scannedContact.organization,
          }}
          source="qr_scan"
          onSaved={() => {
            onScanSuccess?.();
            resetScanner();
          }}
        />
      )}
    </Card>
  );
}
