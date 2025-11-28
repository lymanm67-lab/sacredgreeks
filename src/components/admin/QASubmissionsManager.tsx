import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { MessageSquare, Check, Star, Eye, RefreshCw, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { formatDistanceToNow } from "date-fns";

interface QASubmission {
  id: string;
  question: string;
  category: string;
  status: string;
  answer: string | null;
  is_public: boolean;
  is_featured: boolean;
  email: string | null;
  created_at: string;
  user_id: string | null;
}

export const QASubmissionsManager = () => {
  const [submissions, setSubmissions] = useState<QASubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<QASubmission | null>(null);
  const [answer, setAnswer] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [saving, setSaving] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('qa_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load Q&A submissions",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const openAnswerDialog = (submission: QASubmission) => {
    setSelectedSubmission(submission);
    setAnswer(submission.answer || "");
    setIsPublic(submission.is_public);
    setIsFeatured(submission.is_featured);
  };

  const saveAnswer = async () => {
    if (!selectedSubmission) return;
    
    setSaving(true);
    try {
      const { error } = await supabase
        .from('qa_submissions')
        .update({
          answer,
          is_public: isPublic,
          is_featured: isFeatured,
          status: answer ? 'answered' : 'pending',
          answered_at: answer ? new Date().toISOString() : null,
        })
        .eq('id', selectedSubmission.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Answer saved successfully",
      });

      setSelectedSubmission(null);
      loadSubmissions();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save answer",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const filteredSubmissions = submissions.filter(sub => {
    const matchesStatus = statusFilter === "all" || sub.status === statusFilter;
    const matchesSearch = sub.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         sub.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="border-yellow-500 text-yellow-500">Pending</Badge>;
      case 'answered':
        return <Badge variant="outline" className="border-green-500 text-green-500">Answered</Badge>;
      case 'reviewed':
        return <Badge variant="outline" className="border-blue-500 text-blue-500">Reviewed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-sacred" />
            <CardTitle>Q&A Submissions</CardTitle>
          </div>
          <Button variant="outline" size="sm" onClick={loadSubmissions}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="answered">Answered</SelectItem>
              <SelectItem value="reviewed">Reviewed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <div className="text-center py-8 text-muted-foreground">Loading...</div>
        ) : filteredSubmissions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No submissions found
          </div>
        ) : (
          <div className="space-y-3">
            {filteredSubmissions.map((submission) => (
              <div
                key={submission.id}
                className="border rounded-lg p-4 space-y-3 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-1">
                    <p className="font-medium text-sm line-clamp-2">{submission.question}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Badge variant="secondary" className="text-xs">{submission.category}</Badge>
                      <span>•</span>
                      <span>{formatDistanceToNow(new Date(submission.created_at), { addSuffix: true })}</span>
                      {submission.email && (
                        <>
                          <span>•</span>
                          <span>{submission.email}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {submission.is_featured && (
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    )}
                    {submission.is_public && (
                      <Eye className="h-4 w-4 text-blue-500" />
                    )}
                    {getStatusBadge(submission.status)}
                  </div>
                </div>
                
                {submission.answer && (
                  <div className="bg-muted/50 rounded-md p-3 text-sm">
                    <p className="text-muted-foreground line-clamp-2">{submission.answer}</p>
                  </div>
                )}
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openAnswerDialog(submission)}
                >
                  {submission.answer ? "Edit Answer" : "Answer"}
                </Button>
              </div>
            ))}
          </div>
        )}

        <Dialog open={!!selectedSubmission} onOpenChange={() => setSelectedSubmission(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Answer Question</DialogTitle>
            </DialogHeader>
            
            {selectedSubmission && (
              <div className="space-y-4">
                <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{selectedSubmission.category}</Badge>
                    {selectedSubmission.email && (
                      <span className="text-xs text-muted-foreground">{selectedSubmission.email}</span>
                    )}
                  </div>
                  <p className="font-medium">{selectedSubmission.question}</p>
                </div>

                <div className="space-y-2">
                  <Label>Answer</Label>
                  <Textarea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Type your answer here..."
                    rows={6}
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is-public"
                      checked={isPublic}
                      onCheckedChange={setIsPublic}
                    />
                    <Label htmlFor="is-public" className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      Make Public
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is-featured"
                      checked={isFeatured}
                      onCheckedChange={setIsFeatured}
                    />
                    <Label htmlFor="is-featured" className="flex items-center gap-2">
                      <Star className="h-4 w-4" />
                      Feature Answer
                    </Label>
                  </div>
                </div>
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedSubmission(null)}>
                Cancel
              </Button>
              <Button onClick={saveAnswer} disabled={saving}>
                {saving ? "Saving..." : "Save Answer"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};
