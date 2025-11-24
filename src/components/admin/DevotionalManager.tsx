import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Devotional {
  id: string;
  date: string;
  title: string;
  scripture_ref: string;
  scripture_text: string;
  reflection: string;
  proof_focus: string;
  application: string;
  prayer: string;
}

export function DevotionalManager() {
  const [devotionals, setDevotionals] = useState<Devotional[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingDevotional, setEditingDevotional] = useState<Devotional | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    date: "",
    title: "",
    scripture_ref: "",
    scripture_text: "",
    reflection: "",
    proof_focus: "",
    application: "",
    prayer: "",
  });

  useEffect(() => {
    loadDevotionals();
  }, []);

  const loadDevotionals = async () => {
    try {
      const { data, error } = await supabase
        .from("daily_devotionals")
        .select("*")
        .order("date", { ascending: false })
        .limit(30);

      if (error) throw error;
      setDevotionals(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load devotionals",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingDevotional) {
        const { error } = await supabase
          .from("daily_devotionals")
          .update(formData)
          .eq("id", editingDevotional.id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Devotional updated successfully",
        });
      } else {
        const { error } = await supabase
          .from("daily_devotionals")
          .insert([formData]);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Devotional created successfully",
        });
      }

      setDialogOpen(false);
      setEditingDevotional(null);
      resetForm();
      loadDevotionals();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save devotional",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (devotional: Devotional) => {
    setEditingDevotional(devotional);
    setFormData({
      date: devotional.date,
      title: devotional.title,
      scripture_ref: devotional.scripture_ref,
      scripture_text: devotional.scripture_text,
      reflection: devotional.reflection,
      proof_focus: devotional.proof_focus,
      application: devotional.application,
      prayer: devotional.prayer,
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this devotional?")) return;

    try {
      const { error } = await supabase
        .from("daily_devotionals")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Devotional deleted successfully",
      });
      loadDevotionals();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete devotional",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      date: "",
      title: "",
      scripture_ref: "",
      scripture_text: "",
      reflection: "",
      proof_focus: "",
      application: "",
      prayer: "",
    });
  };

  const openNewDialog = () => {
    resetForm();
    setEditingDevotional(null);
    setDialogOpen(true);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Daily Devotionals</CardTitle>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openNewDialog}>
                <Plus className="w-4 h-4 mr-2" />
                Add Devotional
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh]">
              <DialogHeader>
                <DialogTitle>
                  {editingDevotional ? "Edit Devotional" : "Create New Devotional"}
                </DialogTitle>
              </DialogHeader>
              <ScrollArea className="max-h-[70vh] pr-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="proof_focus">P.R.O.O.F. Focus</Label>
                    <Input
                      id="proof_focus"
                      value={formData.proof_focus}
                      onChange={(e) => setFormData({ ...formData, proof_focus: e.target.value })}
                      placeholder="e.g., Purpose, Restoration, Obedience, Overflow, or Faith"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="scripture_ref">Scripture Reference</Label>
                    <Input
                      id="scripture_ref"
                      value={formData.scripture_ref}
                      onChange={(e) => setFormData({ ...formData, scripture_ref: e.target.value })}
                      placeholder="e.g., John 3:16"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="scripture_text">Scripture Text</Label>
                    <Textarea
                      id="scripture_text"
                      value={formData.scripture_text}
                      onChange={(e) => setFormData({ ...formData, scripture_text: e.target.value })}
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="reflection">Reflection</Label>
                    <Textarea
                      id="reflection"
                      value={formData.reflection}
                      onChange={(e) => setFormData({ ...formData, reflection: e.target.value })}
                      rows={4}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="application">Application</Label>
                    <Textarea
                      id="application"
                      value={formData.application}
                      onChange={(e) => setFormData({ ...formData, application: e.target.value })}
                      rows={4}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="prayer">Prayer</Label>
                    <Textarea
                      id="prayer"
                      value={formData.prayer}
                      onChange={(e) => setFormData({ ...formData, prayer: e.target.value })}
                      rows={3}
                      required
                    />
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button type="submit" className="flex-1">
                      {editingDevotional ? "Update" : "Create"} Devotional
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setDialogOpen(false);
                        setEditingDevotional(null);
                        resetForm();
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-center py-8 text-muted-foreground">Loading...</p>
        ) : devotionals.length === 0 ? (
          <p className="text-center py-8 text-muted-foreground">No devotionals yet</p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>P.R.O.O.F. Focus</TableHead>
                  <TableHead>Scripture</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {devotionals.map((devotional) => (
                  <TableRow key={devotional.id}>
                    <TableCell>
                      {new Date(devotional.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="font-medium">{devotional.title}</TableCell>
                    <TableCell>{devotional.proof_focus}</TableCell>
                    <TableCell className="text-sm">{devotional.scripture_ref}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(devotional)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(devotional.id)}
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
        )}
      </CardContent>
    </Card>
  );
}
