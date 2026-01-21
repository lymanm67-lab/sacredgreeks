import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowBanner(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50 animate-slide-up">
      <Card className="p-3 shadow-md border bg-background/95 backdrop-blur">
        <div className="flex gap-2 items-center">
            <div className="flex-1 space-y-2">
              <p className="text-xs text-muted-foreground">
                We use cookies to improve your experience.{' '}
                <Link to="/privacy" className="text-sacred hover:underline">
                  Learn more
                </Link>
              </p>
              <div className="flex gap-2">
                <Button
                  onClick={acceptCookies}
                  className="bg-sacred hover:bg-sacred/90"
                  size="sm"
                >
                  OK
                </Button>
              </div>
            </div>
          <button
            onClick={declineCookies}
            className="text-muted-foreground hover:text-foreground ml-2"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </Card>
    </div>
  );
};
