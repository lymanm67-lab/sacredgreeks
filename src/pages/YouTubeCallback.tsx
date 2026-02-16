import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

export default function YouTubeCallback() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [channelTitle, setChannelTitle] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error) {
      setStatus('error');
      setErrorMsg('Authorization was denied.');
      return;
    }

    if (!code) {
      setStatus('error');
      setErrorMsg('No authorization code received.');
      return;
    }

    const exchangeCode = async () => {
      try {
        const session = (await supabase.auth.getSession()).data.session;
        if (!session) throw new Error('Not logged in');

        const redirectUri = `${window.location.origin}/youtube-callback`;
        const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/youtube-upload`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ action: 'exchange_code', code, redirectUri }),
        });

        const data = await res.json();
        if (data.error) throw new Error(data.error);

        setChannelTitle(data.channelTitle || 'YouTube');
        setStatus('success');

        // Notify opener
        if (window.opener) {
          window.opener.postMessage({
            type: 'youtube-oauth-success',
            channelTitle: data.channelTitle,
          }, window.location.origin);
          setTimeout(() => window.close(), 2000);
        }
      } catch (e) {
        setStatus('error');
        setErrorMsg(e instanceof Error ? e.message : 'Failed to connect');
      }
    };

    exchangeCode();
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4 p-8">
        {status === 'loading' && (
          <>
            <Loader2 className="w-10 h-10 animate-spin text-red-600 mx-auto" />
            <p className="text-muted-foreground">Connecting your YouTube account...</p>
          </>
        )}
        {status === 'success' && (
          <>
            <CheckCircle2 className="w-10 h-10 text-green-500 mx-auto" />
            <p className="font-medium">Connected to {channelTitle}!</p>
            <p className="text-sm text-muted-foreground">This window will close automatically.</p>
          </>
        )}
        {status === 'error' && (
          <>
            <XCircle className="w-10 h-10 text-red-500 mx-auto" />
            <p className="font-medium text-destructive">Connection Failed</p>
            <p className="text-sm text-muted-foreground">{errorMsg}</p>
          </>
        )}
      </div>
    </div>
  );
}
