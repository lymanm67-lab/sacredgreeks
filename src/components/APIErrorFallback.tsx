import { useState } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface APIErrorFallbackProps {
  error: Error;
  resetError: () => void;
  title?: string;
  description?: string;
}

export function APIErrorFallback({ 
  error, 
  resetError, 
  title = "Unable to Load Data",
  description = "We're having trouble connecting to our services. This might be temporary."
}: APIErrorFallbackProps) {
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = async () => {
    setIsRetrying(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Brief delay
      resetError();
    } finally {
      setIsRetrying(false);
    }
  };

  // Check for specific error types
  const is429Error = error.message.includes('429') || error.message.includes('rate limit');
  const is402Error = error.message.includes('402') || error.message.includes('payment');
  const isNetworkError = error.message.includes('network') || error.message.includes('fetch');

  let userFriendlyMessage = description;
  
  if (is429Error) {
    userFriendlyMessage = "We're experiencing high traffic. Please wait a moment and try again.";
  } else if (is402Error) {
    userFriendlyMessage = "This feature requires additional setup. Please contact support.";
  } else if (isNetworkError) {
    userFriendlyMessage = "Unable to connect. Please check your internet connection.";
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertCircle className="w-5 h-5 text-destructive" />
          </div>
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription className="mt-1">{userFriendlyMessage}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {process.env.NODE_ENV === 'development' && (
          <Alert variant="destructive">
            <AlertDescription className="text-xs font-mono">
              {error.message}
            </AlertDescription>
          </Alert>
        )}
        
        <div className="flex gap-3">
          <Button 
            onClick={handleRetry} 
            disabled={isRetrying}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isRetrying ? 'animate-spin' : ''}`} />
            {isRetrying ? 'Retrying...' : 'Try Again'}
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          If this persists, try refreshing the page or{' '}
          <a href="/contact" className="underline hover:text-foreground">
            contact support
          </a>.
        </p>
      </CardContent>
    </Card>
  );
}
