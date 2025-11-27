import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QrCode, Share2, Copy, Smartphone, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function ShareAppCard() {
  const { toast } = useToast();
  const appUrl = 'https://www.sacredgreekslife.com';
  const shareMessage = `Check out Sacred Greeks Life - daily devotionals, prayer tools, and community support for Greek life members! ${appUrl}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(appUrl);
    toast({
      title: 'Link Copied!',
      description: 'Share it with your chapter members',
    });
  };

  const handleSMSShare = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
      const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
      const smsUrl = isIOS 
        ? `sms:&body=${encodeURIComponent(shareMessage)}`
        : `sms:?body=${encodeURIComponent(shareMessage)}`;
      window.location.href = smsUrl;
    } else {
      navigator.clipboard.writeText(shareMessage);
      toast({
        title: 'Message Copied!',
        description: 'Paste it in your messaging app to share',
      });
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Sacred Greeks Life App',
          text: 'Check out the Sacred Greeks Life app - daily devotionals, prayer tools, and community support!',
          url: appUrl,
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <Card className="bg-gradient-to-br from-sacred/5 to-purple-500/5 border-sacred/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Share2 className="w-5 h-5 text-sacred" />
          Share Sacred Greeks Life
        </CardTitle>
        <CardDescription>
          Invite your chapter members to join the app
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button 
          onClick={handleSMSShare}
          className="w-full bg-sacred hover:bg-sacred/90"
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          Text a Friend
        </Button>
        <div className="grid grid-cols-2 gap-2">
          <Link to="/install" className="w-full">
            <Button variant="outline" className="w-full">
              <Smartphone className="w-4 h-4 mr-2" />
              Install
            </Button>
          </Link>
          <Link to="/qr-code" className="w-full">
            <Button variant="outline" className="w-full">
              <QrCode className="w-4 h-4 mr-2" />
              QR Code
            </Button>
          </Link>
        </div>
        <Button 
          variant="outline" 
          onClick={handleShare}
          className="w-full"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share Link
        </Button>
        <div className="flex items-center gap-2 bg-muted/50 p-3 rounded-lg">
          <code className="flex-1 text-xs font-mono truncate">{appUrl}</code>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopyLink}
            className="flex-shrink-0"
          >
            <Copy className="w-3 h-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
