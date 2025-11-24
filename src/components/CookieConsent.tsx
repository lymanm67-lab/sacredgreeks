import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, Cookie } from 'lucide-react';
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
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 animate-slide-up">
      <Card className="p-4 shadow-lg border-2">
        <div className="flex gap-3">
          <div className="flex-shrink-0">
            <Cookie className="w-5 h-5 text-sacred" />
          </div>
          <div className="flex-1 space-y-3">
            <div>
              <h3 className="font-semibold mb-1">Cookie Notice</h3>
              <p className="text-sm text-muted-foreground">
                We use essential cookies to provide our services. By continuing to use this site, you accept our use of cookies.{' '}
                <Link to="/privacy" className="text-sacred hover:underline">
                  Learn more
                </Link>
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={acceptCookies}
                className="bg-sacred hover:bg-sacred/90 flex-1"
                size="sm"
              >
                Accept
              </Button>
              <Button
                onClick={declineCookies}
                variant="outline"
                size="sm"
                className="flex-1"
              >
                Decline
              </Button>
            </div>
          </div>
          <button
            onClick={declineCookies}
            className="flex-shrink-0 text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </Card>
    </div>
  );
};
