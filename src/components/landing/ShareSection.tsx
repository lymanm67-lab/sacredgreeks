import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, Copy, QrCode, Mail, Check, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Simple social media icons as inline SVGs
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export function ShareSection() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const appUrl = 'https://www.sacredgreekslife.com';
  const shareMessage = `A gift from Dr. Lyman Montgomery – the Sacred Greeks Life App helps you navigate the tension between Greek life and faith. Features daily devotionals, prayer tools, and Bible study resources to grow spiritually while honoring both your faith and fraternity/sorority. For Greek life members and supporters: ${appUrl}`;
  const shortShareText = `A gift from Dr. Lyman Montgomery – the Sacred Greeks Life App helps you navigate the tension between Greek life and faith. For Greek life members and supporters!`;

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
    const subject = encodeURIComponent('A Gift from Dr. Lyman Montgomery - Sacred Greeks Life App');
    const body = encodeURIComponent(shareMessage);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Sacred Greeks Life - A Gift from Dr. Lyman Montgomery',
          text: 'A gift from Dr. Lyman Montgomery – the Sacred Greeks Life App helps you navigate the tension between Greek life and faith. Daily devotionals, prayer tools & Bible study for Greek life members and supporters!',
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

  const handleFacebookShare = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(appUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const handleXShare = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shortShareText)}&url=${encodeURIComponent(appUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const handleLinkedInShare = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(appUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const handleWhatsAppShare = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(shareMessage)}`;
    window.open(url, '_blank');
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

        {/* Social Media Icon Buttons */}
        <TooltipProvider>
          <div className="flex justify-center gap-2 mb-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleFacebookShare}
                  className="btn-bounce hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]"
                >
                  <FacebookIcon className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Share on Facebook</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleXShare}
                  className="btn-bounce hover:bg-black hover:text-white hover:border-black"
                >
                  <XIcon className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Share on X</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleLinkedInShare}
                  className="btn-bounce hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2]"
                >
                  <LinkedInIcon className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Share on LinkedIn</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleWhatsAppShare}
                  className="btn-bounce hover:bg-[#25D366] hover:text-white hover:border-[#25D366]"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Share on WhatsApp</TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>

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
