import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User, Scan, CreditCard, LogIn, Users, MessageSquare, CalendarDays, MapPin, Briefcase, Heart } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { MyDigitalCard } from '@/components/contacts/MyDigitalCard';
import { ContactScanner } from '@/components/contacts/ContactScanner';
import { BusinessCardScanner } from '@/components/contacts/BusinessCardScanner';
import { SacredConnectionsIntro } from '@/components/contacts/SacredConnectionsIntro';
import { SavedContactsList } from '@/components/contacts/SavedContactsList';
import { useAuth } from '@/contexts/AuthContext';
import { lazy, Suspense } from 'react';

// Lazy load the heavier sub-pages
const Forum = lazy(() => import('@/pages/Forum'));
const EventsCalendar = lazy(() => import('@/pages/EventsCalendar'));
const ChapterFinder = lazy(() => import('@/pages/ChapterFinder'));
const D9BusinessDirectory = lazy(() => import('@/pages/D9BusinessDirectory'));
const ParentsFamily = lazy(() => import('@/pages/ParentsFamily'));

const TABS = [
  { value: 'my-card', label: 'My Card', icon: User },
  { value: 'contacts', label: 'Contacts', icon: Users },
  { value: 'forum', label: 'Forum', icon: MessageSquare },
  { value: 'events', label: 'Events', icon: CalendarDays },
  { value: 'chapters', label: 'Chapters', icon: MapPin },
  { value: 'parents', label: 'Parents', icon: Heart },
  { value: 'scan-qr', label: 'Scan QR', icon: Scan },
  { value: 'scan-card', label: 'Scan Card', icon: CreditCard },
] as const;

export default function Contacts() {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'my-card';
  const [activeTab, setActiveTab] = useState(initialTab);
  const [showReciprocate, setShowReciprocate] = useState(false);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSearchParams({ tab }, { replace: true });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="container mx-auto max-w-4xl">
          <Link to="/dashboard">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <Card className="text-center py-12">
            <CardContent className="space-y-4">
              <LogIn className="w-12 h-12 mx-auto text-sacred" />
              <h2 className="text-xl font-semibold">Sacred Connections</h2>
              <p className="text-muted-foreground">Sign in to access community features, events, and your digital card</p>
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
    handleTabChange('my-card');
    setShowReciprocate(false);
  };

  // Full-width tabs (forum, events, chapters) vs contained tabs
  const isFullWidth = ['forum', 'events', 'chapters', 'directory', 'parents'].includes(activeTab);

  return (
    <div className="min-h-screen bg-background p-4">
      <div className={`container mx-auto ${isFullWidth ? 'max-w-5xl' : 'max-w-2xl'}`}>
        <Link to="/dashboard">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2">Sacred Connections</h1>
          <p className="text-muted-foreground">
            Your community hub — connect, discuss, and find your people
          </p>
        </div>

        {activeTab === 'my-card' && <SacredConnectionsIntro />}

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

        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="flex w-full overflow-x-auto gap-1 h-auto flex-wrap justify-start">
            {TABS.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} className="flex items-center gap-1.5 text-xs px-3 py-2">
                <tab.icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="my-card" className="mt-6">
            <MyDigitalCard />
          </TabsContent>

          <TabsContent value="contacts" className="mt-6">
            <SavedContactsList />
          </TabsContent>

          <TabsContent value="forum" className="mt-6">
            <Suspense fallback={<div className="text-center py-12 text-muted-foreground">Loading Forum...</div>}>
              <Forum />
            </Suspense>
          </TabsContent>

          <TabsContent value="events" className="mt-6">
            <Suspense fallback={<div className="text-center py-12 text-muted-foreground">Loading Events...</div>}>
              <EventsCalendar />
            </Suspense>
          </TabsContent>

          <TabsContent value="chapters" className="mt-6">
            <Suspense fallback={<div className="text-center py-12 text-muted-foreground">Loading Chapters...</div>}>
              <ChapterFinder />
            </Suspense>
          </TabsContent>

          <TabsContent value="directory" className="mt-6">
            <Suspense fallback={<div className="text-center py-12 text-muted-foreground">Loading Directory...</div>}>
              <D9BusinessDirectory />
            </Suspense>
          </TabsContent>

          <TabsContent value="parents" className="mt-6">
            <Suspense fallback={<div className="text-center py-12 text-muted-foreground">Loading...</div>}>
              <ParentsFamily />
            </Suspense>
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
