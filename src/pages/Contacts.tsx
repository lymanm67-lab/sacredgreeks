import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User, Scan, CreditCard, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MyDigitalCard } from '@/components/contacts/MyDigitalCard';
import { ContactScanner } from '@/components/contacts/ContactScanner';
import { BusinessCardScanner } from '@/components/contacts/BusinessCardScanner';
import { SacredConnectionsIntro } from '@/components/contacts/SacredConnectionsIntro';
import { useAuth } from '@/contexts/AuthContext';

export default function Contacts() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('my-card');
  const [showReciprocate, setShowReciprocate] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="container mx-auto max-w-2xl">
          <Link to="/dashboard">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <Card className="text-center py-12">
            <CardContent className="space-y-4">
              <LogIn className="w-12 h-12 mx-auto text-sacred" />
              <h2 className="text-xl font-semibold">Digital Contact Card</h2>
              <p className="text-muted-foreground">Sign in to create your digital card and connect with other members</p>
              <Link to="/auth">
                <Button className="bg-sacred hover:bg-sacred/90">Sign In</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const handleScanSuccess = () => {
    setShowReciprocate(true);
  };

  const handleShareBack = () => {
    setActiveTab('my-card');
    setShowReciprocate(false);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-2xl">
        <Link to="/dashboard">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2">Sacred Connections</h1>
          <p className="text-muted-foreground">
            Share your digital card or scan to connect
          </p>
        </div>

        <SacredConnectionsIntro />

        {showReciprocate && (
          <Card className="mb-6 border-sacred bg-sacred/5">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <p className="text-lg font-medium">Contact saved! 🎉</p>
                <p className="text-muted-foreground">Want to share your card back?</p>
                <div className="flex gap-3 justify-center">
                  <Button onClick={handleShareBack} className="bg-sacred hover:bg-sacred/90">
                    <User className="w-4 h-4 mr-2" />
                    Share My Card
                  </Button>
                  <Button variant="outline" onClick={() => setShowReciprocate(false)}>
                    Maybe Later
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="my-card" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">My Card</span>
            </TabsTrigger>
            <TabsTrigger value="scan-qr" className="flex items-center gap-2">
              <Scan className="w-4 h-4" />
              <span className="hidden sm:inline">Scan QR</span>
            </TabsTrigger>
            <TabsTrigger value="scan-card" className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              <span className="hidden sm:inline">Scan Card</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="my-card" className="mt-6">
            <MyDigitalCard />
          </TabsContent>

          <TabsContent value="scan-qr" className="mt-6">
            <ContactScanner onScanSuccess={handleScanSuccess} />
          </TabsContent>

          <TabsContent value="scan-card" className="mt-6">
            <BusinessCardScanner onScanSuccess={handleScanSuccess} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
