import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { 
  Bookmark, 
  Trash2, 
  ChevronDown, 
  ChevronUp,
  Edit3,
  Check,
  X,
  Calendar
} from "lucide-react";
import { SavedResponse } from "@/hooks/use-saved-responses";
import { format } from "date-fns";

const ratingColors = {
  excellent: "bg-green-100 text-green-700 border-green-300",
  good: "bg-blue-100 text-blue-700 border-blue-300",
  "needs-work": "bg-amber-100 text-amber-700 border-amber-300",
  concerning: "bg-red-100 text-red-700 border-red-300"
};

const ratingLabels = {
  excellent: "Excellent",
  good: "Good",
  "needs-work": "Needs Work",
  concerning: "Concerning"
};

interface SavedResponsesListProps {
  responses: SavedResponse[];
  onDelete: (id: string) => Promise<boolean>;
  onUpdateNotes: (id: string, notes: string) => Promise<boolean>;
  loading: boolean;
}

export function SavedResponsesList({ 
  responses, 
  onDelete, 
  onUpdateNotes,
  loading 
}: SavedResponsesListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [editedNotes, setEditedNotes] = useState("");

  const handleStartEditNotes = (response: SavedResponse) => {
    setEditingNotesId(response.id);
    setEditedNotes(response.notes || "");
  };

  const handleSaveNotes = async (id: string) => {
    await onUpdateNotes(id, editedNotes);
    setEditingNotesId(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sacred"></div>
      </div>
    );
  }

  if (responses.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-8">
          <Bookmark className="w-12 h-12 text-muted-foreground/50 mb-4" />
          <p className="text-muted-foreground text-center">
            No saved responses yet. Get AI feedback on your responses and save them for reference.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {responses.map((response) => {
        const feedback = response.feedback_json;
        const isExpanded = expandedId === response.id;
        const isEditingNotes = editingNotesId === response.id;

        return (
          <Card key={response.id} className="border-border/50">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <CardTitle className="text-base">{response.scenario}</CardTitle>
                    {feedback?.overallRating && (
                      <Badge 
                        className={`${ratingColors[feedback.overallRating as keyof typeof ratingColors]} border text-xs`}
                      >
                        {ratingLabels[feedback.overallRating as keyof typeof ratingLabels]}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <Calendar className="w-3 h-3" />
                    {format(new Date(response.created_at), "MMM d, yyyy 'at' h:mm a")}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setExpandedId(isExpanded ? null : response.id)}
                  >
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete saved response?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently remove this saved response from your profile.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => onDelete(response.id)}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardHeader>
            
            {isExpanded && (
              <CardContent className="space-y-4">
                {/* Scores */}
                {feedback && (
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-muted/50 rounded-lg p-3 text-center">
                      <div className="text-xl font-bold text-sacred">{feedback.toneAnalysis?.score}/10</div>
                      <p className="text-xs text-muted-foreground">Tone</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3 text-center">
                      <div className="text-xl font-bold text-sacred">{feedback.approachAnalysis?.score}/10</div>
                      <p className="text-xs text-muted-foreground">Approach</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3 text-center">
                      <div className="text-xl font-bold text-sacred">{feedback.relationshipImpact?.score}/10</div>
                      <p className="text-xs text-muted-foreground">Relationship</p>
                    </div>
                  </div>
                )}

                {/* Original Response */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Your Original Response</h4>
                  <div className="bg-muted/30 rounded-lg p-3">
                    <p className="text-sm whitespace-pre-wrap">{response.original_response}</p>
                  </div>
                </div>

                {/* Improved Response */}
                {feedback?.improvedResponse && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">AI Suggested Response</h4>
                    <div className="bg-green-50 dark:bg-green-950/30 rounded-lg p-3 border border-green-200 dark:border-green-800">
                      <p className="text-sm whitespace-pre-wrap">{feedback.improvedResponse}</p>
                    </div>
                  </div>
                )}

                {/* Key Takeaway */}
                {feedback?.keyTakeaway && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Key Takeaway</h4>
                    <p className="text-sm text-muted-foreground">{feedback.keyTakeaway}</p>
                  </div>
                )}

                {/* Notes */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium">Personal Notes</h4>
                    {!isEditingNotes && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleStartEditNotes(response)}
                      >
                        <Edit3 className="w-4 h-4 mr-1" />
                        {response.notes ? "Edit" : "Add"}
                      </Button>
                    )}
                  </div>
                  {isEditingNotes ? (
                    <div className="space-y-2">
                      <Textarea
                        value={editedNotes}
                        onChange={(e) => setEditedNotes(e.target.value)}
                        placeholder="Add notes for yourself..."
                        rows={3}
                      />
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingNotesId(null)}
                        >
                          <X className="w-4 h-4 mr-1" />
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleSaveNotes(response.id)}
                        >
                          <Check className="w-4 h-4 mr-1" />
                          Save
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      {response.notes || "No notes added yet"}
                    </p>
                  )}
                </div>
              </CardContent>
            )}
          </Card>
        );
      })}
    </div>
  );
}
