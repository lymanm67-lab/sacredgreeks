import { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Share2, User, Building, Mail, Phone } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ProfileData {
  full_name: string | null;
  email: string | null;
  greek_organization: string | null;
  chapter_name: string | null;
}

export function MyDigitalCard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('full_name, email, greek_organization, chapter_name')
        .eq('id', user?.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  // Generate vCard 3.0 format
  const generateVCard = (): string => {
    const name = profile?.full_name || 'Sacred Greeks Member';
    const email = profile?.email || user?.email || '';
    const org = profile?.greek_organization || '';
    const chapter = profile?.chapter_name || '';
    
    const orgLine = org ? (chapter ? `${org} - ${chapter}` : org) : 'Sacred Greeks Life';
    
    return [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${name}`,
      `N:${name.split(' ').reverse().join(';')};;;`,
      email ? `EMAIL:${email}` : '',
      `ORG:${orgLine}`,
      'NOTE:Connected via Sacred Greeks Life App',
      'URL:https://sacredgreekslife.com',
      'END:VCARD'
    ].filter(Boolean).join('\n');
  };

  const handleDownloadVCard = () => {
    const vcard = generateVCard();
    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${profile?.full_name || 'contact'}.vcf`;
    link.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: 'vCard Downloaded',
      description: 'Your contact card has been saved',
    });
  };

  const handleShare = async () => {
    const vcard = generateVCard();
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: profile?.full_name || 'My Contact',
          text: 'Here\'s my digital contact card from Sacred Greeks Life',
          url: 'https://sacredgreekslife.com',
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy vCard to clipboard
      navigator.clipboard.writeText(vcard);
      toast({
        title: 'Copied to Clipboard',
        description: 'vCard data copied - paste to share',
      });
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sacred"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const vcard = generateVCard();

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <User className="w-5 h-5 text-sacred" />
          My Digital Card
        </CardTitle>
        <CardDescription>
          Let others scan this QR to save your contact
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* QR Code */}
        <div className="flex justify-center">
          <div className="bg-white p-4 rounded-xl shadow-lg">
            <QRCode
              value={vcard}
              size={200}
              level="M"
              bgColor="#FFFFFF"
              fgColor="#000000"
            />
          </div>
        </div>

        {/* Contact Preview */}
        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium">{profile?.full_name || 'Add your name in profile'}</span>
          </div>
          {profile?.email && (
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{profile.email}</span>
            </div>
          )}
          {profile?.greek_organization && (
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {profile.greek_organization}
                {profile.chapter_name && ` - ${profile.chapter_name}`}
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={handleDownloadVCard}
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          <Button 
            className="flex-1 bg-sacred hover:bg-sacred/90"
            onClick={handleShare}
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>

        <p className="text-xs text-center text-muted-foreground">
          Update your info in{' '}
          <a href="/profile" className="text-sacred hover:underline">Profile Settings</a>
        </p>
      </CardContent>
    </Card>
  );
}
