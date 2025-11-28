import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Video,
  ExternalLink,
  Check,
  X,
  Eye,
  RefreshCw,
  Loader2,
  Calendar,
  Tag,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { format } from "date-fns";

interface VideoSuggestion {
  id: string;
  user_id: string;
  video_url: string;
  title: string;
  description: string | null;
  category: string;
  suggested_tags: string[];
  reason: string | null;
  status: string;
  admin_notes: string | null;
  reviewed_by: string | null;
  reviewed_at: string | null;
  created_at: string;
}

const VideoSuggestionsManager = () => {
  const [suggestions, setSuggestions] = useState<VideoSuggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("pending");
  const [selectedSuggestion, setSelectedSuggestion] = useState<VideoSuggestion | null>(null);
  const [adminNotes, setAdminNotes] = useState("");
  const [updating, setUpdating] = useState(false);

  const loadSuggestions = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from("video_suggestions")
        .select("*")
        .order("created_at", { ascending: false });

      if (statusFilter !== "all") {
        query = query.eq("status", statusFilter);
      }

      const { data, error } = await query;
      if (error) throw error;
      setSuggestions((data as VideoSuggestion[]) || []);
    } catch (error) {
      console.error("Load error:", error);
      toast.error("Failed to load video suggestions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSuggestions();
  }, [statusFilter]);

  const handleStatusUpdate = async (
    suggestion: VideoSuggestion,
    newStatus: "approved" | "rejected"
  ) => {
    setUpdating(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase
        .from("video_suggestions")
        .update({
          status: newStatus,
          admin_notes: adminNotes || null,
          reviewed_by: user?.id,
          reviewed_at: new Date().toISOString(),
        })
        .eq("id", suggestion.id);

      if (error) throw error;

      // Send email notification (fire and forget)
      supabase.functions.invoke("notify-video-suggestion", {
        body: {
          suggestionId: suggestion.id,
          status: newStatus,
          adminNotes: adminNotes || undefined,
        },
      }).catch((err) => {
        console.error("Failed to send notification:", err);
      });

      toast.success(
        newStatus === "approved"
          ? "Video approved! Notification sent to user."
          : "Video suggestion rejected. Notification sent to user."
      );
      
      setSelectedSuggestion(null);
      setAdminNotes("");
      loadSuggestions();
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update suggestion");
    } finally {
      setUpdating(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="border-yellow-500 text-yellow-600">Pending</Badge>;
      case "approved":
        return <Badge variant="outline" className="border-green-500 text-green-600">Approved</Badge>;
      case "rejected":
        return <Badge variant="outline" className="border-red-500 text-red-600">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const openVideoUrl = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <CardTitle className="flex items-center gap-2">
            <Video className="h-5 w-5 text-sacred" />
            Video Suggestions
          </CardTitle>
          <div className="flex items-center gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" onClick={loadSuggestions}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : suggestions.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Video className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No video suggestions {statusFilter !== "all" ? `with status "${statusFilter}"` : ""}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {suggestions.map((suggestion) => (
                  <TableRow key={suggestion.id}>
                    <TableCell>
                      <div className="max-w-[200px]">
                        <p className="font-medium truncate">{suggestion.title}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {suggestion.video_url}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{suggestion.category}</Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(suggestion.status)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {format(new Date(suggestion.created_at), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openVideoUrl(suggestion.video_url)}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedSuggestion(suggestion);
                            setAdminNotes(suggestion.admin_notes || "");
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Review Dialog */}
        <Dialog
          open={!!selectedSuggestion}
          onOpenChange={(open) => {
            if (!open) {
              setSelectedSuggestion(null);
              setAdminNotes("");
            }
          }}
        >
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Review Video Suggestion</DialogTitle>
            </DialogHeader>

            {selectedSuggestion && (
              <div className="space-y-4 py-4">
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Title</Label>
                  <p className="font-medium">{selectedSuggestion.title}</p>
                </div>

                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Video URL</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      value={selectedSuggestion.video_url}
                      readOnly
                      className="text-sm"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openVideoUrl(selectedSuggestion.video_url)}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {selectedSuggestion.description && (
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-xs">Description</Label>
                    <p className="text-sm">{selectedSuggestion.description}</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-xs">Category</Label>
                    <Badge variant="secondary">{selectedSuggestion.category}</Badge>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-xs">Status</Label>
                    {getStatusBadge(selectedSuggestion.status)}
                  </div>
                </div>

                {selectedSuggestion.suggested_tags.length > 0 && (
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-xs flex items-center gap-1">
                      <Tag className="h-3 w-3" />
                      Suggested Tags
                    </Label>
                    <div className="flex flex-wrap gap-1">
                      {selectedSuggestion.suggested_tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {selectedSuggestion.reason && (
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-xs">Why they suggested it</Label>
                    <p className="text-sm bg-muted/50 p-2 rounded">{selectedSuggestion.reason}</p>
                  </div>
                )}

                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Submitted
                  </Label>
                  <p className="text-sm">
                    {format(new Date(selectedSuggestion.created_at), "PPP 'at' p")}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t">
                  <Label htmlFor="adminNotes">Admin Notes</Label>
                  <Textarea
                    id="adminNotes"
                    placeholder="Optional notes about this suggestion..."
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    className="min-h-[60px]"
                  />
                </div>

                {selectedSuggestion.status === "pending" && (
                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      className="flex-1 border-red-500 text-red-600 hover:bg-red-50"
                      onClick={() => handleStatusUpdate(selectedSuggestion, "rejected")}
                      disabled={updating}
                    >
                      {updating ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <X className="h-4 w-4 mr-1" />
                          Reject
                        </>
                      )}
                    </Button>
                    <Button
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      onClick={() => handleStatusUpdate(selectedSuggestion, "approved")}
                      disabled={updating}
                    >
                      {updating ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <Check className="h-4 w-4 mr-1" />
                          Approve
                        </>
                      )}
                    </Button>
                  </div>
                )}

                {selectedSuggestion.status !== "pending" && selectedSuggestion.reviewed_at && (
                  <div className="text-xs text-muted-foreground pt-2 border-t">
                    Reviewed on {format(new Date(selectedSuggestion.reviewed_at), "PPP")}
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default VideoSuggestionsManager;
