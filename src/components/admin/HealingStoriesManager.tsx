import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Check, X, Star, Eye, Trash2, RefreshCw, Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";

interface HealingStory {
  id: string;
  name: string | null;
  organization: string | null;
  story_title: string;
  story_content: string;
  healing_type: string;
  email: string | null;
  consent_to_publish: boolean;
  approved: boolean;
  featured: boolean;
  created_at: string;
}

const ITEMS_PER_PAGE = 10;

export function HealingStoriesManager() {
  const [stories, setStories] = useState<HealingStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStory, setSelectedStory] = useState<HealingStory | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "approved" | "featured">("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();

  const healingTypes = [
    { value: "church_hurt", label: "Church Hurt" },
    { value: "ministry_fallout", label: "Ministry Fallout" },
    { value: "spiritual_trauma", label: "Spiritual Trauma" },
    { value: "faith_reconciliation", label: "Faith Reconciliation" },
    { value: "identity_journey", label: "Identity Journey" },
    { value: "community_healing", label: "Community Healing" },
    { value: "other", label: "Other" }
  ];

  const filteredStories = useMemo(() => {
    return stories.filter(story => {
      const matchesSearch = searchQuery === "" || 
        story.story_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.story_content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (story.name && story.name.toLowerCase().includes(searchQuery.toLowerCase()));

      let matchesStatus = true;
      if (statusFilter === "pending") matchesStatus = !story.approved;
      else if (statusFilter === "approved") matchesStatus = story.approved;
      else if (statusFilter === "featured") matchesStatus = story.featured;

      const matchesType = typeFilter === "all" || story.healing_type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [stories, searchQuery, statusFilter, typeFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredStories.length / ITEMS_PER_PAGE);
  const paginatedStories = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredStories.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredStories, currentPage]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, typeFilter]);

  const loadStories = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("healing_stories")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setStories(data || []);
      setSelectedIds(new Set());
    } catch (error) {
      console.error("Error loading stories:", error);
      toast({
        title: "Error",
        description: "Failed to load healing stories",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStories();
  }, []);

  const sendApprovalNotification = async (story: HealingStory, isFeatured: boolean = false) => {
    if (!story.email) return;
    
    try {
      await supabase.functions.invoke("notify-story-approved", {
        body: {
          storyTitle: story.story_title,
          authorName: story.name || undefined,
          authorEmail: story.email,
          isFeatured
        }
      });
    } catch (err) {
      console.error("Failed to send approval notification:", err);
    }
  };

  const updateStory = async (id: string, updates: Partial<HealingStory>, sendNotification: boolean = false) => {
    try {
      const { error } = await supabase
        .from("healing_stories")
        .update(updates)
        .eq("id", id);

      if (error) throw error;

      const updatedStory = stories.find(s => s.id === id);
      if (updatedStory && sendNotification && updates.approved === true) {
        sendApprovalNotification({ ...updatedStory, ...updates }, updates.featured || false);
      }

      setStories(stories.map(s => s.id === id ? { ...s, ...updates } : s));
      toast({
        title: "Success",
        description: "Story updated successfully",
      });
    } catch (error) {
      console.error("Error updating story:", error);
      toast({
        title: "Error",
        description: "Failed to update story",
        variant: "destructive",
      });
    }
  };

  const deleteStory = async (id: string) => {
    if (!confirm("Are you sure you want to delete this story?")) return;

    try {
      const { error } = await supabase
        .from("healing_stories")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setStories(stories.filter(s => s.id !== id));
      setSelectedIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
      toast({
        title: "Success",
        description: "Story deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting story:", error);
      toast({
        title: "Error",
        description: "Failed to delete story",
        variant: "destructive",
      });
    }
  };

  // Bulk actions
  const toggleSelectAll = () => {
    if (selectedIds.size === paginatedStories.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(paginatedStories.map(s => s.id)));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const bulkApprove = async () => {
    if (selectedIds.size === 0) return;
    
    const toApprove = stories.filter(s => selectedIds.has(s.id) && !s.approved);
    if (toApprove.length === 0) {
      toast({ title: "Info", description: "All selected stories are already approved" });
      return;
    }

    try {
      const { error } = await supabase
        .from("healing_stories")
        .update({ approved: true })
        .in("id", toApprove.map(s => s.id));

      if (error) throw error;

      // Send notifications
      toApprove.forEach(story => sendApprovalNotification({ ...story, approved: true }));

      setStories(stories.map(s => 
        selectedIds.has(s.id) ? { ...s, approved: true } : s
      ));
      setSelectedIds(new Set());
      toast({
        title: "Success",
        description: `${toApprove.length} stories approved`,
      });
    } catch (error) {
      console.error("Error bulk approving:", error);
      toast({
        title: "Error",
        description: "Failed to approve stories",
        variant: "destructive",
      });
    }
  };

  const bulkDelete = async () => {
    if (selectedIds.size === 0) return;
    if (!confirm(`Are you sure you want to delete ${selectedIds.size} stories?`)) return;

    try {
      const { error } = await supabase
        .from("healing_stories")
        .delete()
        .in("id", Array.from(selectedIds));

      if (error) throw error;

      setStories(stories.filter(s => !selectedIds.has(s.id)));
      setSelectedIds(new Set());
      toast({
        title: "Success",
        description: `${selectedIds.size} stories deleted`,
      });
    } catch (error) {
      console.error("Error bulk deleting:", error);
      toast({
        title: "Error",
        description: "Failed to delete stories",
        variant: "destructive",
      });
    }
  };

  const getHealingTypeLabel = (type: string) => {
    return healingTypes.find(t => t.value === type)?.label || type;
  };

  const viewStory = (story: HealingStory) => {
    setSelectedStory(story);
    setViewDialogOpen(true);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <CardTitle>Healing Stories</CardTitle>
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="outline">{stories.length} total</Badge>
            <Badge variant="outline" className="border-green-500 text-green-600">
              {stories.filter(s => s.approved).length} approved
            </Badge>
            <Badge variant="outline" className="border-amber-500 text-amber-600">
              {stories.filter(s => !s.approved).length} pending
            </Badge>
            <Button variant="outline" size="sm" onClick={loadStories}>
              <RefreshCw className="w-4 h-4 mr-1" />
              Refresh
            </Button>
          </div>
        </div>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mt-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by title, content, or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as typeof statusFilter)}>
            <SelectTrigger className="w-[140px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="featured">Featured</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Healing Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {healingTypes.map(type => (
                <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Bulk Actions */}
        {selectedIds.size > 0 && (
          <div className="flex items-center gap-3 mt-4 p-3 bg-muted rounded-lg">
            <span className="text-sm font-medium">{selectedIds.size} selected</span>
            <Button size="sm" onClick={bulkApprove} className="bg-green-600 hover:bg-green-700">
              <Check className="w-4 h-4 mr-1" />
              Approve Selected
            </Button>
            <Button size="sm" variant="destructive" onClick={bulkDelete}>
              <Trash2 className="w-4 h-4 mr-1" />
              Delete Selected
            </Button>
            <Button size="sm" variant="outline" onClick={() => setSelectedIds(new Set())}>
              Clear Selection
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-center py-8 text-muted-foreground">Loading...</p>
        ) : filteredStories.length === 0 ? (
          <p className="text-center py-8 text-muted-foreground">
            {stories.length === 0 ? "No healing stories submitted yet" : "No stories match your filters"}
          </p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">
                      <Checkbox
                        checked={selectedIds.size === paginatedStories.length && paginatedStories.length > 0}
                        onCheckedChange={toggleSelectAll}
                      />
                    </TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedStories.map((story) => (
                    <TableRow key={story.id} className={selectedIds.has(story.id) ? "bg-muted/50" : ""}>
                      <TableCell>
                        <Checkbox
                          checked={selectedIds.has(story.id)}
                          onCheckedChange={() => toggleSelect(story.id)}
                        />
                      </TableCell>
                      <TableCell className="text-sm">
                        {new Date(story.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="font-medium max-w-[200px] truncate">
                        {story.story_title}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="text-xs">
                          {getHealingTypeLabel(story.healing_type)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">
                        {story.name || <span className="text-muted-foreground italic">Anonymous</span>}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {story.approved ? (
                            <Badge className="bg-green-500">Approved</Badge>
                          ) : (
                            <Badge variant="outline">Pending</Badge>
                          )}
                          {story.featured && (
                            <Badge className="bg-amber-500">Featured</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => viewStory(story)}
                            title="View story"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          {!story.approved ? (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => updateStory(story.id, { approved: true }, true)}
                              title="Approve"
                              className="text-green-600 hover:text-green-700"
                            >
                              <Check className="w-4 h-4" />
                            </Button>
                          ) : (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => updateStory(story.id, { approved: false })}
                              title="Unapprove"
                              className="text-amber-600 hover:text-amber-700"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              const newFeatured = !story.featured;
                              updateStory(story.id, { featured: newFeatured, approved: newFeatured ? true : story.approved }, newFeatured && !story.approved);
                            }}
                            title={story.featured ? "Unfeature" : "Feature"}
                            className={story.featured ? "text-amber-500" : "text-muted-foreground"}
                          >
                            <Star className="w-4 h-4" fill={story.featured ? "currentColor" : "none"} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteStory(story.id)}
                            title="Delete"
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredStories.length)} of {filteredStories.length} stories
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Previous
                  </Button>
                  <span className="text-sm text-muted-foreground px-2">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>

      {/* View Story Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedStory && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedStory.story_title}</DialogTitle>
                <DialogDescription>
                  By {selectedStory.name || "Anonymous"} 
                  {selectedStory.organization && ` • ${selectedStory.organization}`}
                  {" • "}
                  {getHealingTypeLabel(selectedStory.healing_type)}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <p className="whitespace-pre-wrap">{selectedStory.story_content}</p>
                </div>
                <div className="flex items-center gap-2 pt-4 border-t">
                  <span className="text-sm text-muted-foreground">
                    Submitted: {new Date(selectedStory.created_at).toLocaleString()}
                  </span>
                  {selectedStory.email && (
                    <span className="text-sm text-muted-foreground">
                      • Email: {selectedStory.email}
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => {
                      const wasApproved = selectedStory.approved;
                      updateStory(selectedStory.id, { approved: !selectedStory.approved }, !wasApproved);
                      setSelectedStory({ ...selectedStory, approved: !selectedStory.approved });
                    }}
                    variant={selectedStory.approved ? "outline" : "default"}
                  >
                    {selectedStory.approved ? "Unapprove" : "Approve"}
                  </Button>
                  <Button
                    onClick={() => {
                      const newFeatured = !selectedStory.featured;
                      updateStory(selectedStory.id, { featured: newFeatured, approved: newFeatured ? true : selectedStory.approved }, newFeatured && !selectedStory.approved);
                      setSelectedStory({ ...selectedStory, featured: newFeatured, approved: newFeatured ? true : selectedStory.approved });
                    }}
                    variant="outline"
                  >
                    <Star className={`w-4 h-4 mr-2 ${selectedStory.featured ? "fill-amber-500 text-amber-500" : ""}`} />
                    {selectedStory.featured ? "Unfeature" : "Feature"}
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
}
