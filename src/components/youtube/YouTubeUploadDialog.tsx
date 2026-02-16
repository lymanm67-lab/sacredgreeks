import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Youtube, Loader2, CheckCircle2, ExternalLink, Unplug, LogIn } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface YouTubeUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  videoUrl: string;
  defaultTitle?: string;
  defaultDescription?: string;
  videoRequestId?: string;
}

export function YouTubeUploadDialog({
  open,
  onOpenChange,
  videoUrl,
  defaultTitle = '',
  defaultDescription = '',
  videoRequestId,
}: YouTubeUploadDialogProps) {
  const { toast } = useToast();

  // Connection state
  const [connected, setConnected] = useState(false);
  const [channelTitle, setChannelTitle] = useState('');
  const [checkingConnection, setCheckingConnection] = useState(true);

  // Form state
  const [title, setTitle] = useState(defaultTitle);
  const [description, setDescription] = useState(defaultDescription);
  const [tags, setTags] = useState('');
  const [privacyStatus, setPrivacyStatus] = useState('private');
  const [categoryId, setCategoryId] = useState('22');
  const [playlistId, setPlaylistId] = useState('');
  const [scheduleEnabled, setScheduleEnabled] = useState(false);
  const [publishDate, setPublishDate] = useState('');
  const [publishTime, setPublishTime] = useState('12:00');

  // Data
  const [playlists, setPlaylists] = useState<{ id: string; title: string }[]>([]);
  const [categories, setCategories] = useState<{ id: string; title: string }[]>([]);

  // Upload state
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<{ youtubeVideoId: string; youtubeUrl: string } | null>(null);

  const getAuthHeader = async () => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
  });

  // Check connection on open
  useEffect(() => {
    if (!open) return;
    setTitle(defaultTitle);
    setDescription(defaultDescription);
    setUploadResult(null);
    checkConnection();
  }, [open, defaultTitle, defaultDescription]);

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
      if (data.connected) {
        loadPlaylistsAndCategories();
      }
    } catch {
      setConnected(false);
    } finally {
      setCheckingConnection(false);
    }
  };

  const loadPlaylistsAndCategories = async () => {
    try {
      const headers = await getAuthHeader();
      const [plRes, catRes] = await Promise.all([
        fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/youtube-upload`, {
          method: 'POST', headers, body: JSON.stringify({ action: 'get_playlists' }),
        }),
        fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/youtube-upload`, {
          method: 'POST', headers, body: JSON.stringify({ action: 'get_categories' }),
        }),
      ]);
      const plData = await plRes.json();
      const catData = await catRes.json();
      setPlaylists(plData.playlists || []);
      setCategories(catData.categories || []);
    } catch (e) {
      console.error('Failed to load playlists/categories:', e);
    }
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
      toast({ title: 'YouTube disconnected' });
    } catch {
      toast({ title: 'Failed to disconnect', variant: 'destructive' });
    }
  };

  const handleUpload = async () => {
    if (!title.trim()) {
      toast({ title: 'Title required', variant: 'destructive' });
      return;
    }
    setUploading(true);
    try {
      let publishAt: string | null = null;
      if (scheduleEnabled && publishDate && publishTime) {
        publishAt = new Date(`${publishDate}T${publishTime}:00`).toISOString();
      }

      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/youtube-upload`, {
        method: 'POST',
        headers: await getAuthHeader(),
        body: JSON.stringify({
          action: 'upload',
          videoUrl,
          title: title.trim(),
          description: description.trim(),
          tags: tags.split(',').map(t => t.trim()).filter(Boolean),
          categoryId,
          privacyStatus: scheduleEnabled ? 'private' : privacyStatus,
          publishAt,
          playlistId: playlistId || null,
          videoRequestId: videoRequestId || null,
        }),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setUploadResult(data);
      toast({ title: '🎉 Video uploaded to YouTube!' });
    } catch (e) {
      toast({ title: 'Upload failed', description: e instanceof Error ? e.message : 'Failed', variant: 'destructive' });
    } finally {
      setUploading(false);
    }
  };

  // Listen for OAuth callback
  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (event.data?.type === 'youtube-oauth-success') {
        setConnected(true);
        setChannelTitle(event.data.channelTitle || 'Connected');
        loadPlaylistsAndCategories();
        toast({ title: `✅ Connected to ${event.data.channelTitle || 'YouTube'}` });
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Youtube className="w-5 h-5 text-red-600" />
            Publish to YouTube
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
                Sign in with Google to upload videos directly to your channel.
              </p>
            </div>
            <Button onClick={handleConnect} className="gap-2 bg-red-600 hover:bg-red-700 text-white">
              <LogIn className="w-4 h-4" /> Connect YouTube
            </Button>
          </div>
        ) : uploadResult ? (
          <div className="text-center py-6 space-y-4">
            <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto" />
            <div>
              <p className="font-medium text-foreground">Video Uploaded!</p>
              <p className="text-sm text-muted-foreground mt-1">
                Your video has been published to YouTube.
              </p>
            </div>
            <div className="flex gap-2 justify-center">
              <Button asChild variant="outline" className="gap-2">
                <a href={uploadResult.youtubeUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" /> View on YouTube
                </a>
              </Button>
              <Button onClick={() => onOpenChange(false)}>Done</Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Connected channel badge */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
              <div className="flex items-center gap-2">
                <Youtube className="w-4 h-4 text-red-600" />
                <span className="text-sm font-medium">{channelTitle}</span>
                <Badge variant="secondary" className="text-[10px]">Connected</Badge>
              </div>
              <Button variant="ghost" size="sm" onClick={handleDisconnect} className="text-muted-foreground h-7">
                <Unplug className="w-3 h-3" />
              </Button>
            </div>

            {/* Title */}
            <div className="space-y-1.5">
              <Label>Title *</Label>
              <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Video title" maxLength={100} />
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <Label>Description</Label>
              <Textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Video description..." rows={3} maxLength={5000} />
            </div>

            {/* Tags */}
            <div className="space-y-1.5">
              <Label>Tags</Label>
              <Input value={tags} onChange={e => setTags(e.target.value)} placeholder="tag1, tag2, tag3" />
              <p className="text-[10px] text-muted-foreground">Comma-separated</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Privacy */}
              <div className="space-y-1.5">
                <Label>Privacy</Label>
                <Select value={privacyStatus} onValueChange={setPrivacyStatus} disabled={scheduleEnabled}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="private">Private</SelectItem>
                    <SelectItem value="unlisted">Unlisted</SelectItem>
                    <SelectItem value="public">Public</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Category */}
              <div className="space-y-1.5">
                <Label>Category</Label>
                <Select value={categoryId} onValueChange={setCategoryId}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {categories.length > 0 ? categories.map(c => (
                      <SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>
                    )) : (
                      <>
                        <SelectItem value="22">People & Blogs</SelectItem>
                        <SelectItem value="27">Education</SelectItem>
                        <SelectItem value="29">Nonprofits & Activism</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Playlist */}
            {playlists.length > 0 && (
              <div className="space-y-1.5">
                <Label>Add to Playlist</Label>
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

            {/* Schedule */}
            <div className="space-y-3 p-3 rounded-lg border border-border">
              <div className="flex items-center justify-between">
                <Label className="font-medium">Schedule Publishing</Label>
                <Switch checked={scheduleEnabled} onCheckedChange={setScheduleEnabled} />
              </div>
              {scheduleEnabled && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs">Date</Label>
                    <Input type="date" value={publishDate} onChange={e => setPublishDate(e.target.value)} min={new Date().toISOString().split('T')[0]} />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Time</Label>
                    <Input type="time" value={publishTime} onChange={e => setPublishTime(e.target.value)} />
                  </div>
                </div>
              )}
            </div>

            {/* Upload button */}
            <Button onClick={handleUpload} disabled={uploading || !title.trim()} className="w-full gap-2 bg-red-600 hover:bg-red-700 text-white">
              {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Youtube className="w-4 h-4" />}
              {uploading ? 'Uploading...' : scheduleEnabled ? 'Schedule Upload' : 'Upload to YouTube'}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
