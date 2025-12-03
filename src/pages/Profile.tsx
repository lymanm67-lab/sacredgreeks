import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Home, User, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { NotificationSettings } from '@/components/NotificationSettings';
import { InviteFriendsDialog } from '@/components/InviteFriendsDialog';
import { SocialMediaConnect } from '@/components/SocialMediaConnect';
import { JourneyReminderSettings } from '@/components/JourneyReminderSettings';
import { StudyReminderSettings } from '@/components/StudyReminderSettings';
import { GreekOrganizationSelector } from '@/components/GreekOrganizationSelector';
import { AffiliationTypeSelector } from '@/components/AffiliationTypeSelector';
import { DemoModeToggle } from '@/components/DemoModeToggle';
import { SidebarCustomization } from '@/components/SidebarCustomization';
import { PersonalizationSettings } from '@/components/PersonalizationSettings';

const profileSchema = z.object({
  full_name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Invalid email address'),
});

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);
  
  // Greek organization state
  const [affiliationType, setAffiliationType] = useState('member');
  const [greekCouncil, setGreekCouncil] = useState('');
  const [greekOrganization, setGreekOrganization] = useState('');
  const [chapterName, setChapterName] = useState('');
  const [initiationYear, setInitiationYear] = useState<number | null>(null);
  const [memberStatus, setMemberStatus] = useState('active');
  const [savingGreek, setSavingGreek] = useState(false);

  useEffect(() => {
    loadProfile();
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('full_name, email, affiliation_type, greek_council, greek_organization, chapter_name, initiation_year, member_status')
        .eq('id', user.id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setFullName(data.full_name || '');
        setEmail(data.email || user.email || '');
        setAffiliationType(data.affiliation_type || 'member');
        setGreekCouncil(data.greek_council || '');
        setGreekOrganization(data.greek_organization || '');
        setChapterName(data.chapter_name || '');
        setInitiationYear(data.initiation_year || null);
        setMemberStatus(data.member_status || 'active');
      } else {
        setEmail(user.email || '');
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoadingProfile(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate input
      const validated = profileSchema.parse({ full_name: fullName, email });

      // Update profile
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: user!.id,
          full_name: validated.full_name,
          email: validated.email,
        });

      if (profileError) throw profileError;

      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully.',
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: 'Validation error',
          description: error.errors[0].message,
          variant: 'destructive',
        });
      } else {
        console.error('Error updating profile:', error);
        toast({
          title: 'Error',
          description: 'Failed to update profile. Please try again.',
          variant: 'destructive',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSaveGreekInfo = async () => {
    if (!user) return;
    setSavingGreek(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          affiliation_type: affiliationType,
          greek_council: affiliationType === 'member' ? (greekCouncil || null) : null,
          greek_organization: affiliationType === 'member' ? (greekOrganization || null) : null,
          chapter_name: affiliationType === 'member' ? (chapterName || null) : null,
          initiation_year: affiliationType === 'member' ? initiationYear : null,
          member_status: affiliationType === 'member' ? memberStatus : null,
        })
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: 'Greek affiliation updated',
        description: 'Your affiliation information has been saved.',
      });
    } catch (error) {
      console.error('Error saving Greek info:', error);
      toast({
        title: 'Error',
        description: 'Failed to save affiliation information.',
        variant: 'destructive',
      });
    } finally {
      setSavingGreek(false);
    }
  };

  if (loadingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-sacred border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <Link to="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <Home className="w-4 h-4" />
            <span className="text-sm font-medium">Dashboard</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-sacred/10 flex items-center justify-center">
              <User className="w-6 h-6 text-sacred" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Profile Settings</h1>
              <p className="text-muted-foreground">Manage your account information</p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    required
                    maxLength={100}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    disabled
                  />
                  <p className="text-xs text-muted-foreground">
                    Email cannot be changed. Contact support if you need to update it.
                  </p>
                </div>

                <Button type="submit" disabled={loading} className="bg-sacred hover:bg-sacred/90">
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-sacred" />
                Greek Life Connection
              </CardTitle>
              <CardDescription>
                Tell us about your connection to Greek life for personalized content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <AffiliationTypeSelector
                value={affiliationType}
                onChange={setAffiliationType}
                compact
              />
              
              {affiliationType === 'member' && (
                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-4">Organization Details</h4>
                  <GreekOrganizationSelector
                    selectedCouncil={greekCouncil}
                    selectedOrganization={greekOrganization}
                    chapterName={chapterName}
                    initiationYear={initiationYear}
                    memberStatus={memberStatus}
                    onCouncilChange={setGreekCouncil}
                    onOrganizationChange={setGreekOrganization}
                    onChapterChange={setChapterName}
                    onYearChange={setInitiationYear}
                    onStatusChange={setMemberStatus}
                    compact
                  />
                </div>
              )}
              
              <Button 
                onClick={handleSaveGreekInfo} 
                disabled={savingGreek}
                className="bg-sacred hover:bg-sacred/90"
              >
                {savingGreek ? 'Saving...' : 'Save Affiliation Info'}
              </Button>
            </CardContent>
          </Card>

          <PersonalizationSettings />

          <DemoModeToggle />

          <SidebarCustomization />

          <NotificationSettings />

          <JourneyReminderSettings />

          <StudyReminderSettings />

          <Card>
            <CardHeader>
              <CardTitle>Invite Friends</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Share Sacred Greeks with your friends and help them grow in their leadership and faith journey.
              </p>
              <InviteFriendsDialog />
            </CardContent>
          </Card>

          <SocialMediaConnect />

          <Card>
            <CardHeader>
              <CardTitle>Password Reset</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Need to reset your password? We'll send you an email with instructions.
              </p>
              <Link to="/reset-password">
                <Button variant="outline">Reset Password</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Profile;
