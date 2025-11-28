import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { MessageSquare, Check, Star, Eye, RefreshCw, Search, Mail, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { formatDistanceToNow } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const [notifyUser, setNotifyUser] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogTab, setDialogTab] = useState<"edit" | "preview">("edit");
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
    setNotifyUser(!!submission.email);
    setDialogTab("edit");
  };

  const saveAnswer = async (sendNotification: boolean = false) => {
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

      // Send email notification if requested and user has email
      if (answer && sendNotification && notifyUser && selectedSubmission.email) {
        try {
          const { error: notifyError } = await supabase.functions.invoke('send-qa-answer-notification', {
            body: {
              email: selectedSubmission.email,
              question: selectedSubmission.question,
              answer: answer,
              category: selectedSubmission.category,
            },
          });

          if (notifyError) {
            console.error('Failed to send notification:', notifyError);
            toast({
              title: "Answer Saved",
              description: "Answer saved but email notification failed to send",
            });
          } else {
            toast({
              title: "Success",
              description: "Answer saved and notification sent to user",
            });
          }
        } catch (notifyErr) {
          console.error('Error sending notification:', notifyErr);
          toast({
            title: "Answer Saved",
            description: "Answer saved but email notification failed",
          });
        }
      } else {
        toast({
          title: "Success",
          description: sendNotification && !selectedSubmission.email 
            ? "Answer saved (no email to notify)" 
            : "Answer saved successfully",
        });
      }

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

  const renderEmailPreview = () => {
    if (!selectedSubmission || !answer) return null;
    
    return (
      <div className="border rounded-lg overflow-hidden bg-background">
        <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2d5a87] p-6 text-center">
          <h3 className="text-[#d4af37] text-lg font-semibold mb-1">Your Question Has Been Answered!</h3>
          <p className="text-white/90 text-sm">Ask Dr. Lyman - Sacred Greeks</p>
        </div>
        
        <div className="p-6 space-y-4 bg-muted/30">
          <div className="bg-background rounded-lg p-4 border-l-4 border-[#d4af37]">
            <p className="text-sm font-semibold text-[#1e3a5f] mb-1">Your Question:</p>
            <p className="text-muted-foreground italic text-sm">"{selectedSubmission.question}"</p>
            <Badge className="mt-2 bg-[#e8f4f8] text-[#1e3a5f] text-xs">{selectedSubmission.category}</Badge>
          </div>
          
          <div className="bg-background rounded-lg p-4 border-l-4 border-[#2d5a87]">
            <p className="text-sm font-semibold text-[#1e3a5f] mb-1">Dr. Lyman's Answer:</p>
            <p className="text-foreground text-sm whitespace-pre-wrap">{answer}</p>
          </div>
          
          <div className="text-center pt-2">
            <Button className="bg-gradient-to-r from-[#d4af37] to-[#c9a227] text-[#1e3a5f] font-semibold">
              View Full Answer
            </Button>
          </div>
          
          <p className="text-center text-muted-foreground text-xs pt-4 border-t">
            Thank you for engaging with Sacred Greeks. Your questions help us all grow in faith together.
          </p>
        </div>
      </div>
    );
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
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Answer Question</DialogTitle>
            </DialogHeader>
            
            {selectedSubmission && (
              <Tabs value={dialogTab} onValueChange={(v) => setDialogTab(v as "edit" | "preview")}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="edit">Edit Answer</TabsTrigger>
                  <TabsTrigger value="preview" disabled={!answer}>
                    <Mail className="h-4 w-4 mr-2" />
                    Email Preview
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="edit" className="space-y-4 mt-4">
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

                  <div className="flex flex-col gap-4">
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
                    
                    {selectedSubmission.email && (
                      <div className="flex items-center space-x-2 pt-2 border-t">
                        <Switch
                          id="notify-user"
                          checked={notifyUser}
                          onCheckedChange={setNotifyUser}
                        />
                        <Label htmlFor="notify-user" className="flex items-center gap-2">
                          <Send className="h-4 w-4" />
                          Send email notification to user
                        </Label>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="preview" className="mt-4">
                  {renderEmailPreview()}
                </TabsContent>
              </Tabs>
            )}

            <DialogFooter className="flex-col sm:flex-row gap-2">
              <Button variant="outline" onClick={() => setSelectedSubmission(null)}>
                Cancel
              </Button>
              <Button onClick={() => saveAnswer(false)} disabled={saving} variant="secondary">
                {saving ? "Saving..." : "Save Only"}
              </Button>
              {selectedSubmission?.email && (
                <Button onClick={() => saveAnswer(true)} disabled={saving || !answer}>
                  <Send className="h-4 w-4 mr-2" />
                  {saving ? "Saving..." : "Save & Notify"}
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};
