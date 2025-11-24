import QRCode from 'react-qr-code';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Smartphone, ArrowRight } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Link } from 'react-router-dom';

export function MobileQRCode() {
  const appUrl = window.location.origin;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Smartphone className="h-4 w-4" />
          Open on Mobile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Scan to Open on Mobile</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4 py-4">
          <div className="bg-white p-4 rounded-lg">
            <QRCode
              value={appUrl}
              size={200}
              level="M"
            />
          </div>
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Scan this QR code with your phone's camera to open the app instantly
            </p>
            <p className="text-xs text-muted-foreground font-mono bg-muted px-2 py-1 rounded">
              {appUrl}
            </p>
          </div>
        </div>
        <DialogFooter className="sm:justify-center">
          <Link to="/install">
            <Button variant="outline" className="gap-2">
              View Full Instructions
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
