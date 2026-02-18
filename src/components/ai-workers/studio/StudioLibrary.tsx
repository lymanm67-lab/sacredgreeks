import { useState, useMemo, useCallback } from 'react';
import { Film, Play, Plus, Youtube, CheckSquare, Square, SquareCheck, X, ListChecks, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { YouTubeUploadDialog } from '@/components/youtube/YouTubeUploadDialog';
import { BulkYouTubeUploadDialog } from '@/components/youtube/BulkYouTubeUploadDialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface StudioLibraryProps {
  videos: any[];
  onNewVideo: () => void;
  onVideosChanged?: () => void;
  onViewVideo?: (video: any) => void;
}

export function StudioLibrary({ videos, onNewVideo, onVideosChanged, onViewVideo }: StudioLibraryProps) {
  const { toast } = useToast();
  const [ytDialogOpen, setYtDialogOpen] = useState(false);
  const [ytVideo, setYtVideo] = useState<any>(null);

  // Bulk selection state
  const [bulkMode, setBulkMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkDialogOpen, setBulkDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<any>(null);
  // Only completed videos with a URL are eligible for YouTube upload
  const eligibleVideos = useMemo(
    () => videos.filter(v => v.status === 'completed' && v.video_url),
    [videos]
  );

  const handleYouTubeUpload = (video: any) => {
    setYtVideo(video);
    setYtDialogOpen(true);
  };

  const toggleBulkMode = () => {
    if (bulkMode) {
      setSelectedIds(new Set());
    }
    setBulkMode(!bulkMode);
  };

  const toggleSelection = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectAll = () => {
    setSelectedIds(new Set(eligibleVideos.map(v => v.id)));
  };

  const clearSelection = () => {
    setSelectedIds(new Set());
  };

  const handleBulkUpload = () => {
    if (selectedIds.size === 0) return;
    setBulkDialogOpen(true);
  };

  const selectedVideos = useMemo(
    () => videos.filter(v => selectedIds.has(v.id) && v.video_url),
    [videos, selectedIds]
  );

  const handleDeleteVideo = async () => {
    if (!deleteTarget) return;
    const { error } = await supabase.from('video_requests').delete().eq('id', deleteTarget.id);
    if (error) {
      toast({ title: 'Delete failed', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Video deleted' });
      onVideosChanged?.();
    }
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <h3 className="text-lg font-bold text-foreground">My Scripts</h3>
        <div className="flex items-center gap-2">
          {eligibleVideos.length > 0 && (
            <Button
              variant={bulkMode ? 'default' : 'outline'}
              size="sm"
              onClick={toggleBulkMode}
              className="gap-1.5 text-xs"
            >
              <ListChecks className="w-3.5 h-3.5" />
              {bulkMode ? 'Exit Bulk' : 'Bulk Upload'}
            </Button>
          )}
          <Button onClick={onNewVideo} className="gap-2 rounded-xl" size="sm">
            <Plus className="w-4 h-4" /> New Video
          </Button>
        </div>
      </div>

      {/* Bulk action bar */}
      {bulkMode && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/60 border border-border flex-wrap">
          <Badge variant="secondary" className="text-xs">
            {selectedIds.size} selected
          </Badge>
          <Button variant="ghost" size="sm" onClick={selectAll} className="text-xs h-7 gap-1">
            <SquareCheck className="w-3 h-3" /> Select All ({eligibleVideos.length})
          </Button>
          <Button variant="ghost" size="sm" onClick={clearSelection} className="text-xs h-7 gap-1" disabled={selectedIds.size === 0}>
            <X className="w-3 h-3" /> Clear
          </Button>
          <div className="flex-1" />
          <Button
            size="sm"
            onClick={handleBulkUpload}
            disabled={selectedIds.size === 0}
            className="gap-1.5 bg-red-600 hover:bg-red-700 text-white text-xs"
          >
            <Youtube className="w-3.5 h-3.5" /> Upload to YouTube
          </Button>
        </div>
      )}

      {videos.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
            <Film className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground mb-4">No scripts yet. Create your first one!</p>
          <Button onClick={onNewVideo} className="rounded-xl gap-2">
            <Plus className="w-4 h-4" /> Get Started
          </Button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-3">
          {videos.map(v => {
            const isEligible = v.status === 'completed' && v.video_url;
            const isSelected = selectedIds.has(v.id);

            return (
              <Card
                key={v.id}
                className={`overflow-hidden transition-all border-border/30 ${
                  bulkMode && isEligible ? 'cursor-pointer hover:shadow-md' : 'hover:shadow-md'
                } ${isSelected ? 'ring-2 ring-primary border-primary/30' : ''}`}
                onClick={bulkMode && isEligible ? () => toggleSelection(v.id) : undefined}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    {/* Checkbox in bulk mode */}
                    {bulkMode && (
                      <div className="pt-0.5 shrink-0" onClick={e => e.stopPropagation()}>
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => toggleSelection(v.id)}
                          disabled={!isEligible}
                          className="mt-0.5"
                        />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{v.title}</p>
                      <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                        <Badge variant="outline" className="text-[10px]">{v.template_type}</Badge>
                        <Badge variant="outline" className="text-[10px]">{v.provider || 'invideo'}</Badge>
                        {v.generation_mode === 'image_to_video' && (
                          <Badge className="bg-violet-500/10 text-violet-600 text-[10px] border-0">Image→Video</Badge>
                        )}
                        {v.generation_mode === 'video_upload' && (
                          <Badge className="bg-blue-500/10 text-blue-600 text-[10px] border-0">Uploaded</Badge>
                        )}
                        {v.is_custom_content && (
                          <Badge className="bg-primary/10 text-primary text-[10px] border-0">Custom</Badge>
                        )}
                        <Badge
                          variant={v.status === 'completed' ? 'default' : v.status === 'blocked' ? 'destructive' : 'secondary'}
                          className="text-[10px]"
                        >
                          {v.status}
                        </Badge>
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-1.5">
                        {new Date(v.created_at).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Actions - hidden in bulk mode */}
                    {!bulkMode && (
                      <div className="flex flex-col gap-1 shrink-0">
                        {v.status === 'completed' && (
                          <>
                            <Button size="sm" variant="outline" className="gap-1 rounded-lg" onClick={() => onViewVideo?.(v)}>
                              <Play className="w-3 h-3" /> View Script
                            </Button>
                            {v.video_url && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="gap-1 rounded-lg text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                                onClick={() => handleYouTubeUpload(v)}
                              >
                                <Youtube className="w-3 h-3" /> YouTube
                              </Button>
                            )}
                          </>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          className="gap-1 rounded-lg text-destructive hover:text-destructive"
                          onClick={() => setDeleteTarget(v)}
                        >
                          <Trash2 className="w-3 h-3" /> Delete
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {ytVideo && (
        <YouTubeUploadDialog
          open={ytDialogOpen}
          onOpenChange={setYtDialogOpen}
          videoUrl={ytVideo.video_url || ''}
          defaultTitle={ytVideo.title || ''}
          defaultDescription={ytVideo.description || ''}
          videoRequestId={ytVideo.id}
        />
      )}

      <BulkYouTubeUploadDialog
        open={bulkDialogOpen}
        onOpenChange={(open) => {
          setBulkDialogOpen(open);
          if (!open) {
            setSelectedIds(new Set());
            setBulkMode(false);
          }
        }}
        videos={selectedVideos}
      />
      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete video?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete "{deleteTarget?.title}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteVideo} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
