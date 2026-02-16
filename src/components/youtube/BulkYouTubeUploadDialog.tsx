import { useState, useEffect, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Youtube, Loader2, CheckCircle2, XCircle, LogIn, Unplug, Film } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface BulkVideo {
  id: string;
  title: string;
  video_url: string;
  template_type?: string;
  description?: string;
}

interface BulkYouTubeUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  videos: BulkVideo[];
}

type UploadStatus = 'pending' | 'uploading' | 'success' | 'error';

interface VideoUploadState {
  id: string;
  title: string;
  status: UploadStatus;
  error?: string;
  youtubeUrl?: string;
}

function cleanFilenameToTitle(title: string): string {
  return title
    .replace(/\.[^/.]+$/, '') // Remove file extension
    .replace(/[-_]+/g, ' ')  // Replace hyphens/underscores with spaces
    .replace(/\s+/g, ' ')    // Collapse multiple spaces
    .trim()
    .replace(/\b\w/g, l => l.toUpperCase()); // Title case
}

export function BulkYouTubeUploadDialog({
  open,
  onOpenChange,
  videos,
}: BulkYouTubeUploadDialogProps) {
  const { toast } = useToast();

  // Connection
  const [connected, setConnected] = useState(false);
  const [channelTitle, setChannelTitle] = useState('');
  const [checkingConnection, setCheckingConnection] = useState(true);

  // Settings
  const [privacyStatus, setPrivacyStatus] = useState('public');
  const [playlistId, setPlaylistId] = useState('');
  const [playlists, setPlaylists] = useState<{ id: string; title: string }[]>([]);

  // Upload state
  const [uploading, setUploading] = useState(false);
  const [uploadStates, setUploadStates] = useState<VideoUploadState[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const completedCount = uploadStates.filter(s => s.status === 'success').length;
  const errorCount = uploadStates.filter(s => s.status === 'error').length;
  const totalCount = uploadStates.length;
  const progressPercent = totalCount > 0 ? Math.round(((completedCount + errorCount) / totalCount) * 100) : 0;
  const allDone = uploading && (completedCount + errorCount) === totalCount;

  const getAuthHeader = useCallback(async () => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
  }), []);

  useEffect(() => {
    if (!open) return;
    setUploadStates(videos.map(v => ({
      id: v.id,
      title: cleanFilenameToTitle(v.title),
      status: 'pending' as UploadStatus,
    })));
    setUploading(false);
    setCurrentIndex(-1);
    checkConnection();
  }, [open, videos]);

  const checkConnection = async () => {
    setCheckingConnection(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/youtube-upload`, {
        method: 'POST',
        headers: await getAuthHeader(),
        body: JSON.stringify({ action: 'check_connection' }),
      });
      const data = await res.json();
      setConnected(data.connected);
      setChannelTitle(data.channelTitle || '');
      if (data.connected) loadPlaylists();
    } catch {
      setConnected(false);
    } finally {
      setCheckingConnection(false);
    }
  };

  const loadPlaylists = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/youtube-upload`, {
        method: 'POST',
        headers: await getAuthHeader(),
        body: JSON.stringify({ action: 'get_playlists' }),
      });
      const data = await res.json();
      setPlaylists(data.playlists || []);
    } catch { /* ignore */ }
  };

  const handleConnect = async () => {
    try {
      const redirectUri = `${window.location.origin}/youtube-callback`;
      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/youtube-upload`, {
        method: 'POST',
        headers: await getAuthHeader(),
        body: JSON.stringify({ action: 'get_auth_url', redirectUri }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      window.open(data.authUrl, '_blank', 'width=600,height=700');
    } catch (e) {
      toast({ title: 'Error', description: e instanceof Error ? e.message : 'Failed', variant: 'destructive' });
    }
  };

  const handleDisconnect = async () => {
    try {
      await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/youtube-upload`, {
        method: 'POST',
        headers: await getAuthHeader(),
        body: JSON.stringify({ action: 'disconnect' }),
      });
      setConnected(false);
      setChannelTitle('');
    } catch { /* ignore */ }
  };

  const handleBulkUpload = async () => {
    setUploading(true);

    for (let i = 0; i < videos.length; i++) {
      setCurrentIndex(i);
      setUploadStates(prev => prev.map((s, idx) =>
        idx === i ? { ...s, status: 'uploading' } : s
      ));

      try {
        const video = videos[i];
        const cleanTitle = cleanFilenameToTitle(video.title);

        const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/youtube-upload`, {
          method: 'POST',
          headers: await getAuthHeader(),
          body: JSON.stringify({
            action: 'upload',
            videoUrl: video.video_url,
            title: cleanTitle,
            description: video.description || `${cleanTitle} — Created with Sacred Greeks Studio Agent`,
            tags: ['Sacred Greeks', 'Greek Life', 'Faith', 'Christian', 'Ministry'],
            categoryId: '27',
            privacyStatus,
            playlistId: playlistId || null,
            videoRequestId: video.id,
          }),
        });

        const data = await res.json();
        if (data.error) throw new Error(data.error);

        setUploadStates(prev => prev.map((s, idx) =>
          idx === i ? { ...s, status: 'success', youtubeUrl: data.youtubeUrl } : s
        ));
      } catch (e) {
        setUploadStates(prev => prev.map((s, idx) =>
          idx === i ? { ...s, status: 'error', error: e instanceof Error ? e.message : 'Failed' } : s
        ));
      }

      // Small delay between uploads to avoid rate limiting
      if (i < videos.length - 1) {
        await new Promise(r => setTimeout(r, 1500));
      }
    }
  };

  // Listen for OAuth callback
  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (event.data?.type === 'youtube-oauth-success') {
        setConnected(true);
        setChannelTitle(event.data.channelTitle || 'Connected');
        loadPlaylists();
        toast({ title: `✅ Connected to ${event.data.channelTitle || 'YouTube'}` });
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  return (
    <Dialog open={open} onOpenChange={uploading ? undefined : onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Youtube className="w-5 h-5 text-red-600" />
            Bulk Upload to YouTube
            <Badge variant="secondary" className="text-xs ml-auto">{videos.length} video{videos.length !== 1 ? 's' : ''}</Badge>
          </DialogTitle>
        </DialogHeader>

        {checkingConnection ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : !connected ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-red-100 dark:bg-red-900/20 flex items-center justify-center mx-auto">
              <Youtube className="w-8 h-8 text-red-600" />
            </div>
            <div>
              <p className="font-medium text-foreground">Connect Your YouTube Channel</p>
              <p className="text-sm text-muted-foreground mt-1">
                Sign in with Google to upload videos directly.
              </p>
            </div>
            <Button onClick={handleConnect} className="gap-2 bg-red-600 hover:bg-red-700 text-white">
              <LogIn className="w-4 h-4" /> Connect YouTube
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Connected channel */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
              <div className="flex items-center gap-2">
                <Youtube className="w-4 h-4 text-red-600" />
                <span className="text-sm font-medium">{channelTitle}</span>
                <Badge variant="secondary" className="text-[10px]">Connected</Badge>
              </div>
              {!uploading && (
                <Button variant="ghost" size="sm" onClick={handleDisconnect} className="text-muted-foreground h-7">
                  <Unplug className="w-3 h-3" />
                </Button>
              )}
            </div>

            {/* Settings - only before upload starts */}
            {!uploading && (
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs">Privacy</Label>
                  <Select value={privacyStatus} onValueChange={setPrivacyStatus}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="private">Private</SelectItem>
                      <SelectItem value="unlisted">Unlisted</SelectItem>
                      <SelectItem value="public">Public</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {playlists.length > 0 && (
                  <div className="space-y-1.5">
                    <Label className="text-xs">Playlist</Label>
                    <Select value={playlistId} onValueChange={setPlaylistId}>
                      <SelectTrigger><SelectValue placeholder="None" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">None</SelectItem>
                        {playlists.map(p => (
                          <SelectItem key={p.id} value={p.id}>{p.title}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            )}

            {/* Progress bar during upload */}
            {uploading && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Uploading {completedCount + errorCount} of {totalCount}</span>
                  <span>{progressPercent}%</span>
                </div>
                <Progress value={progressPercent} className="h-2" />
              </div>
            )}

            {/* Video list */}
            <div className="space-y-2 max-h-[40vh] overflow-y-auto">
              <Label className="text-xs text-muted-foreground">Videos to upload</Label>
              {uploadStates.map((state, i) => (
                <div
                  key={state.id}
                  className={`flex items-center gap-3 p-2.5 rounded-lg border transition-colors ${
                    state.status === 'uploading' ? 'border-primary/40 bg-primary/5' :
                    state.status === 'success' ? 'border-green-500/30 bg-green-500/5' :
                    state.status === 'error' ? 'border-destructive/30 bg-destructive/5' :
                    'border-border/50'
                  }`}
                >
                  <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center shrink-0">
                    {state.status === 'uploading' ? (
                      <Loader2 className="w-4 h-4 animate-spin text-primary" />
                    ) : state.status === 'success' ? (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    ) : state.status === 'error' ? (
                      <XCircle className="w-4 h-4 text-destructive" />
                    ) : (
                      <Film className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{state.title}</p>
                    {state.status === 'error' && (
                      <p className="text-[10px] text-destructive truncate">{state.error}</p>
                    )}
                    {state.status === 'success' && state.youtubeUrl && (
                      <a
                        href={state.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] text-primary hover:underline"
                      >
                        View on YouTube →
                      </a>
                    )}
                  </div>
                  <Badge
                    variant={
                      state.status === 'success' ? 'default' :
                      state.status === 'error' ? 'destructive' :
                      state.status === 'uploading' ? 'secondary' : 'outline'
                    }
                    className="text-[10px] shrink-0"
                  >
                    {state.status === 'pending' ? `#${i + 1}` :
                     state.status === 'uploading' ? 'Uploading…' :
                     state.status === 'success' ? '✓' : '✗'}
                  </Badge>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            {!uploading ? (
              <Button
                onClick={handleBulkUpload}
                className="w-full gap-2 bg-red-600 hover:bg-red-700 text-white"
                disabled={videos.length === 0}
              >
                <Youtube className="w-4 h-4" />
                Upload {videos.length} Video{videos.length !== 1 ? 's' : ''} to YouTube
              </Button>
            ) : allDone ? (
              <div className="space-y-2">
                <div className="text-center text-sm">
                  <span className="text-green-600 font-medium">{completedCount} uploaded</span>
                  {errorCount > 0 && <span className="text-destructive ml-2">{errorCount} failed</span>}
                </div>
                <Button onClick={() => onOpenChange(false)} className="w-full">
                  Done
                </Button>
              </div>
            ) : null}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
