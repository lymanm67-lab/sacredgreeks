import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, Copy, QrCode, Mail, Check, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

export function ShareSection() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const appUrl = 'https://www.sacredgreekslife.com';
  const shareMessage = `Check out Sacred Greeks Life - daily devotionals, prayer tools, and community support for Greek life members! ${appUrl}`;

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

  const handleCopyLink = () => {
    navigator.clipboard.writeText(appUrl);
    setCopied(true);
    toast({
      title: 'Link Copied!',
      description: 'Share it with your chapter members',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent('Check out Sacred Greeks Life!');
    const body = encodeURIComponent(shareMessage);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Sacred Greeks Life',
          text: 'Daily devotionals, prayer tools, and community support for Greek life members!',
          url: appUrl,
        });
      } catch (error) {
        // User cancelled or error
        console.log('Share cancelled');
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-sacred/5 via-background to-purple-500/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Share With Your Chapter
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Help your brothers and sisters grow in faith. Share Sacred Greeks Life with your chapter members.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
          <Button 
            onClick={handleSMSShare}
            className="bg-sacred hover:bg-sacred/90 btn-bounce"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Text a Friend
          </Button>

          <Button 
            variant="outline" 
            onClick={handleCopyLink}
            className="btn-bounce"
          >
            {copied ? (
              <Check className="w-4 h-4 mr-2 text-green-500" />
            ) : (
              <Copy className="w-4 h-4 mr-2" />
            )}
            {copied ? 'Copied!' : 'Copy Link'}
          </Button>

          <Link to="/qr-code">
            <Button variant="outline" className="btn-bounce">
              <QrCode className="w-4 h-4 mr-2" />
              QR Code
            </Button>
          </Link>

          <Button 
            variant="outline" 
            onClick={handleEmailShare}
            className="btn-bounce"
          >
            <Mail className="w-4 h-4 mr-2" />
            Email
          </Button>

          {typeof navigator !== 'undefined' && 'share' in navigator && (
            <Button 
              variant="outline" 
              onClick={handleNativeShare}
              className="btn-bounce md:hidden"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          )}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{appUrl}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
