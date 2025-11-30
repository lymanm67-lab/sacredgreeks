import React from 'react';
import { AlertTriangle, RefreshCw, Home, Bug, WifiOff, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
  isOffline: boolean;
  retryCount: number;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { 
      hasError: false, 
      isOffline: !navigator.onLine,
      retryCount: 0 
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidMount() {
    window.addEventListener('online', this.handleOnline);
    window.addEventListener('offline', this.handleOffline);
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.handleOnline);
    window.removeEventListener('offline', this.handleOffline);
  }

  handleOnline = () => {
    this.setState({ isOffline: false });
    if (this.state.hasError && this.state.retryCount < 3) {
      this.handleRetry();
    }
  };

  handleOffline = () => {
    this.setState({ isOffline: true });
  };

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ errorInfo });
    
    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo);
    
    // Log to console in development
    if (!import.meta.env.PROD) {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
    
    // Store error in sessionStorage for debugging
    try {
      sessionStorage.setItem('lastError', JSON.stringify({
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString(),
        url: window.location.href
      }));
    } catch (e) {
      // Storage might be full or disabled
    }
  }

  handleRetry = () => {
    this.setState(prev => ({ 
      hasError: false, 
      error: undefined, 
      errorInfo: undefined,
      retryCount: prev.retryCount + 1 
    }));
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  handleReportBug = () => {
    const subject = encodeURIComponent('Bug Report: Application Error');
    const body = encodeURIComponent(
      `Error: ${this.state.error?.message || 'Unknown error'}\n` +
      `URL: ${window.location.href}\n` +
      `Time: ${new Date().toISOString()}\n` +
      `Browser: ${navigator.userAgent}\n\n` +
      `Please describe what you were doing when this error occurred:\n\n`
    );
    window.open(`mailto:support@sacredgreeks.com?subject=${subject}&body=${body}`);
  };

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const isNetworkError = this.state.error?.message?.includes('fetch') || 
                            this.state.error?.message?.includes('network') ||
                            this.state.isOffline;

      return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
          <Card className="max-w-lg w-full shadow-lg border-destructive/20">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                {isNetworkError ? (
                  <div className="p-2 rounded-full bg-amber-500/10">
                    <WifiOff className="w-6 h-6 text-amber-500" />
                  </div>
                ) : (
                  <div className="p-2 rounded-full bg-destructive/10">
                    <AlertTriangle className="w-6 h-6 text-destructive" />
                  </div>
                )}
                <CardTitle className="text-xl">
                  {isNetworkError ? 'Connection Issue' : 'Something went wrong'}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                {isNetworkError 
                  ? 'Unable to connect. Please check your internet connection and try again.'
                  : 'We\'re sorry, but something unexpected happened. You can try refreshing, or go back to the home page.'}
              </p>
              
              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-2">
                <Button 
                  onClick={this.handleRetry}
                  className="flex-1 gap-2"
                  disabled={this.state.retryCount >= 3}
                >
                  <RefreshCw className="w-4 h-4" />
                  {this.state.retryCount > 0 ? `Retry (${3 - this.state.retryCount} left)` : 'Try Again'}
                </Button>
                <Button 
                  variant="outline"
                  onClick={this.handleGoHome}
                  className="flex-1 gap-2"
                >
                  <Home className="w-4 h-4" />
                  Go Home
                </Button>
              </div>

              {/* Report bug button */}
              <Button 
                variant="ghost"
                size="sm"
                onClick={this.handleReportBug}
                className="w-full gap-2 text-muted-foreground hover:text-foreground"
              >
                <Bug className="w-4 h-4" />
                Report this issue
              </Button>

              {/* Error details (dev mode only) */}
              {!import.meta.env.PROD && this.state.error && (
                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="w-full gap-2 text-xs">
                      <ChevronDown className="w-3 h-3" />
                      Show technical details
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="mt-2 p-3 bg-destructive/5 rounded-lg border border-destructive/20 space-y-2">
                      <p className="font-mono text-sm text-destructive break-all">
                        {this.state.error.message}
                      </p>
                      {this.state.error.stack && (
                        <pre className="font-mono text-xs text-muted-foreground overflow-auto max-h-32 whitespace-pre-wrap">
                          {this.state.error.stack}
                        </pre>
                      )}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              )}

              {/* Retry count warning */}
              {this.state.retryCount >= 3 && (
                <p className="text-sm text-amber-600 dark:text-amber-400 bg-amber-500/10 p-3 rounded-lg">
                  Multiple retry attempts failed. Please try again later or contact support if the issue persists.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

// HOC for wrapping components with error boundary
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: React.ReactNode
) {
  return function WithErrorBoundary(props: P) {
    return (
      <ErrorBoundary fallback={fallback}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}