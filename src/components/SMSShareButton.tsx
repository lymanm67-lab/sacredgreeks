import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SMSShareButtonProps {
  variant?: 'default' | 'outline' | 'ghost' | 'secondary';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  showLabel?: boolean;
}

export function SMSShareButton({ 
  variant = 'outline', 
  size = 'default',
  className = '',
  showLabel = true 
}: SMSShareButtonProps) {
  const { toast } = useToast();
  const appUrl = 'https://www.sacredgreekslife.com';
  const message = `A gift from Dr. Lyman Montgomery – the Sacred Greeks Life App helps you navigate the tension between Greek life and faith. Features daily devotionals, prayer tools, and Bible study resources to grow spiritually while honoring both your faith and fraternity/sorority. For Greek life members and supporters: ${appUrl}`;

  const handleSMSShare = () => {
    // Check if on mobile device
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
      // Use sms: protocol - works on both iOS and Android
      // iOS uses &body=, Android uses ?body=
      const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
      const smsUrl = isIOS 
        ? `sms:&body=${encodeURIComponent(message)}`
        : `sms:?body=${encodeURIComponent(message)}`;
      
      window.location.href = smsUrl;
    } else {
      // On desktop, copy the message to clipboard
      navigator.clipboard.writeText(message);
      toast({
        title: 'Message Copied!',
        description: 'Paste it in your messaging app to share',
      });
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleSMSShare}
      className={className}
    >
      <MessageSquare className="w-4 h-4" />
      {showLabel && <span className="ml-2">Text a Friend</span>}
    </Button>
  );
}
