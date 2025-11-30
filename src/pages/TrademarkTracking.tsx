import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Home, 
  Scale, 
  Clock, 
  AlertCircle, 
  FileText,
  Calendar,
  Bell,
  Edit2,
  Save,
  Shield
} from "lucide-react";
import { format, differenceInDays } from "date-fns";
import { useAdminCheck } from "@/components/AdminRoute";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

type TrademarkStatus = "filed" | "examination" | "published" | "registered" | "pending-response";

interface TrademarkApplication {
  id: string;
  name: string;
  serialNumber: string;
  filingDate: Date;
  status: TrademarkStatus;
  class: string;
  nextDeadline?: Date;
  deadlineType?: string;
  progress: number;
  notes?: string;
}

const initialTrademarks: TrademarkApplication[] = [
  {
    id: "1",
    name: "Sacred Greeks™",
    serialNumber: "97/XXXXXX",
    filingDate: new Date("2024-03-15"),
    status: "examination",
    class: "Class 41",
    nextDeadline: new Date("2025-03-15"),
    deadlineType: "Office Action Response",
    progress: 40,
    notes: "Primary brand mark - awaiting examiner review"
  },
  {
    id: "2",
    name: "Sacred Greeks Life™",
    serialNumber: "97/XXXXXX",
    filingDate: new Date("2024-04-01"),
    status: "filed",
    class: "Class 9",
    nextDeadline: new Date("2025-01-01"),
    deadlineType: "Initial Review",
    progress: 20,
    notes: "Software application mark"
  },
  {
    id: "3",
    name: "P.R.O.O.F. Framework™",
    serialNumber: "97/XXXXXX",
    filingDate: new Date("2024-05-10"),
    status: "examination",
    class: "Class 41",
    nextDeadline: new Date("2025-02-10"),
    deadlineType: "Specimen Submission",
    progress: 45,
    notes: "Educational methodology mark"
  },
  {
    id: "4",
    name: "Sacred, Not Sinful™",
    serialNumber: "97/XXXXXX",
    filingDate: new Date("2024-03-20"),
    status: "published",
    class: "Class 16",
    nextDeadline: new Date("2025-01-20"),
    deadlineType: "Opposition Period Ends",
    progress: 70,
    notes: "Book title and program name - in opposition period"
  },
  {
    id: "5",
    name: "5 Persona Types Architecture™",
    serialNumber: "97/XXXXXX",
    filingDate: new Date("2024-06-01"),
    status: "filed",
    class: "Class 41",
    nextDeadline: new Date("2025-03-01"),
    deadlineType: "Initial Review",
    progress: 15,
    notes: "Assessment methodology mark"
  },
  {
    id: "6",
    name: "Shattered Masks™",
    serialNumber: "97/XXXXXX",
    filingDate: new Date("2024-07-15"),
    status: "filed",
    class: "Class 41",
    nextDeadline: new Date("2025-04-15"),
    deadlineType: "Initial Review",
    progress: 10,
    notes: "Archetype assessment tool"
  }
];

const statusOptions: { value: TrademarkStatus; label: string }[] = [
  { value: "filed", label: "Filed - Awaiting Review" },
  { value: "examination", label: "Under Examination" },
  { value: "published", label: "Published for Opposition" },
  { value: "registered", label: "Registered" },
  { value: "pending-response", label: "Response Required" }
];

const getStatusColor = (status: TrademarkStatus) => {
  switch (status) {
    case "registered":
      return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200";
    case "published":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200";
    case "examination":
      return "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200";
    case "pending-response":
      return "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
  }
};

const getStatusLabel = (status: TrademarkStatus) => {
  return statusOptions.find(s => s.value === status)?.label || status;
};

const getProgressForStatus = (status: TrademarkStatus) => {
  switch (status) {
    case "filed": return 20;
    case "examination": return 45;
    case "published": return 70;
    case "registered": return 100;
    case "pending-response": return 50;
    default: return 0;
  }
};

const TrademarkTracking = () => {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdminCheck();
  const { toast } = useToast();
  const [trademarks, setTrademarks] = useState<TrademarkApplication[]>(initialTrademarks);
  const [editingTrademark, setEditingTrademark] = useState<TrademarkApplication | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  // Loading state
  if (authLoading || adminLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-sacred border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Verifying access...</p>
        </div>
      </div>
    );
  }

  // Redirect if not logged in
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Access denied for non-admins
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4 max-w-md px-4">
          <div className="p-4 rounded-full bg-destructive/10 w-fit mx-auto">
            <Shield className="w-12 h-12 text-destructive" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Admin Access Required</h1>
          <p className="text-muted-foreground">
            Trademark tracking is restricted to administrators only. Please contact an administrator if you need access.
          </p>
          <Link to="/">
            <Button variant="outline" className="gap-2 mt-4">
              <Home className="w-4 h-4" />
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleEditTrademark = (tm: TrademarkApplication) => {
    setEditingTrademark({ ...tm });
    setEditDialogOpen(true);
  };

  const handleSaveChanges = () => {
    if (!editingTrademark) return;

    setTrademarks(prev => 
      prev.map(tm => 
        tm.id === editingTrademark.id 
          ? { ...editingTrademark, progress: getProgressForStatus(editingTrademark.status) }
          : tm
      )
    );
    
    setEditDialogOpen(false);
    setEditingTrademark(null);
    
    toast({
      title: "Trademark Updated",
      description: `${editingTrademark.name} has been updated successfully.`,
    });
  };

  const upcomingDeadlines = trademarks
    .filter(tm => tm.nextDeadline && differenceInDays(tm.nextDeadline, new Date()) > 0)
    .sort((a, b) => differenceInDays(a.nextDeadline!, b.nextDeadline!))
    .slice(0, 5);

  const totalProgress = Math.round(
    trademarks.reduce((sum, tm) => sum + tm.progress, 0) / trademarks.length
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-foreground hover:text-sacred transition-colors">
              <Home className="w-5 h-5" />
              <span className="font-semibold">Sacred Greeks Life™</span>
            </Link>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="gap-1">
                <Shield className="w-3 h-3" />
                Admin
              </Badge>
              <Link to="/ip-documentation">
                <Button variant="ghost" size="sm">IP Docs</Button>
              </Link>
              <Link to="/legal">
                <Button variant="ghost" size="sm">Legal Center</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-sacred/20 to-amber-500/20">
              <Scale className="w-8 h-8 text-sacred" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Trademark Tracking</h1>
              <p className="text-muted-foreground">Monitor registration status and manage deadlines</p>
            </div>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid sm:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-sacred">{trademarks.length}</p>
                <p className="text-sm text-muted-foreground">Total Applications</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-emerald-500">
                  {trademarks.filter(tm => tm.status === "registered").length}
                </p>
                <p className="text-sm text-muted-foreground">Registered</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-amber-500">
                  {trademarks.filter(tm => ["filed", "examination", "published"].includes(tm.status)).length}
                </p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-500">{totalProgress}%</p>
                <p className="text-sm text-muted-foreground">Avg Progress</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Deadlines */}
        <Card className="mb-8 border-amber-200 dark:border-amber-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-amber-500" />
              Upcoming Deadlines
            </CardTitle>
            <CardDescription>
              Important dates requiring attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            {upcomingDeadlines.length > 0 ? (
              <div className="space-y-3">
                {upcomingDeadlines.map((tm) => {
                  const daysUntil = differenceInDays(tm.nextDeadline!, new Date());
                  const isUrgent = daysUntil <= 30;
                  return (
                    <div 
                      key={tm.id}
                      className={`flex items-center justify-between p-3 rounded-lg border ${
                        isUrgent ? "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/30" : "border-border bg-muted/30"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {isUrgent ? (
                          <AlertCircle className="w-5 h-5 text-red-500" />
                        ) : (
                          <Clock className="w-5 h-5 text-muted-foreground" />
                        )}
                        <div>
                          <p className="font-medium">{tm.name}</p>
                          <p className="text-sm text-muted-foreground">{tm.deadlineType}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-medium ${isUrgent ? "text-red-600 dark:text-red-400" : ""}`}>
                          {format(tm.nextDeadline!, "MMM d, yyyy")}
                        </p>
                        <p className="text-sm text-muted-foreground">{daysUntil} days</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">No upcoming deadlines</p>
            )}
          </CardContent>
        </Card>

        {/* Trademark Applications List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Trademark Applications
            </CardTitle>
            <CardDescription>
              Click edit to update registration status and details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trademarks.map((tm) => (
                <div 
                  key={tm.id}
                  className="p-4 rounded-lg border border-border bg-muted/20 hover:bg-muted/40 transition-colors"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="font-bold text-lg">{tm.name}</h3>
                      <p className="text-sm text-muted-foreground">Serial: {tm.serialNumber} • {tm.class}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(tm.status)}>
                        {getStatusLabel(tm.status)}
                      </Badge>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="gap-1"
                        onClick={() => handleEditTrademark(tm)}
                      >
                        <Edit2 className="w-3 h-3" />
                        Edit
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Registration Progress</span>
                      <span className="font-medium">{tm.progress}%</span>
                    </div>
                    <Progress value={tm.progress} className="h-2" />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Filed:</span>
                      <span>{format(tm.filingDate, "MMM d, yyyy")}</span>
                    </div>
                    {tm.nextDeadline && (
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Next:</span>
                        <span>{format(tm.nextDeadline, "MMM d, yyyy")}</span>
                      </div>
                    )}
                  </div>

                  {tm.notes && (
                    <p className="text-sm text-muted-foreground mt-2 italic">{tm.notes}</p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Trademark</DialogTitle>
            </DialogHeader>
            {editingTrademark && (
              <div className="space-y-4">
                <div>
                  <Label>Trademark Name</Label>
                  <Input value={editingTrademark.name} disabled className="mt-1" />
                </div>
                
                <div>
                  <Label>Serial Number</Label>
                  <Input 
                    value={editingTrademark.serialNumber}
                    onChange={(e) => setEditingTrademark(prev => prev ? {...prev, serialNumber: e.target.value} : null)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label>Status</Label>
                  <Select 
                    value={editingTrademark.status}
                    onValueChange={(value: TrademarkStatus) => setEditingTrademark(prev => prev ? {...prev, status: value} : null)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Deadline Type</Label>
                  <Input 
                    value={editingTrademark.deadlineType || ""}
                    onChange={(e) => setEditingTrademark(prev => prev ? {...prev, deadlineType: e.target.value} : null)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label>Notes</Label>
                  <Textarea 
                    value={editingTrademark.notes || ""}
                    onChange={(e) => setEditingTrademark(prev => prev ? {...prev, notes: e.target.value} : null)}
                    className="mt-1"
                    rows={3}
                  />
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveChanges} className="gap-2">
                    <Save className="w-4 h-4" />
                    Save Changes
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Registration Process */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Registration Process Timeline</CardTitle>
            <CardDescription>
              Typical USPTO trademark registration stages
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
              <div className="space-y-6">
                {[
                  { stage: "Application Filed", duration: "Day 0", description: "Initial application submitted to USPTO" },
                  { stage: "Initial Review", duration: "3-4 months", description: "USPTO assigns examining attorney" },
                  { stage: "Examination", duration: "4-6 months", description: "Attorney reviews for conflicts and compliance" },
                  { stage: "Office Action (if any)", duration: "6 months to respond", description: "Address any issues raised by examiner" },
                  { stage: "Publication", duration: "30 days", description: "Published in Official Gazette for opposition" },
                  { stage: "Registration", duration: "2-3 months after publication", description: "Certificate of Registration issued" }
                ].map((step, index) => (
                  <div key={index} className="relative pl-10">
                    <div className="absolute left-2.5 w-3 h-3 rounded-full bg-sacred border-2 border-background" />
                    <div>
                      <p className="font-medium">{step.stage}</p>
                      <p className="text-sm text-muted-foreground">{step.duration}</p>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link to="/trademark-usage-guide">
            <Button variant="outline" className="gap-2">
              <FileText className="w-4 h-4" />
              Usage Guide
            </Button>
          </Link>
          <Link to="/ip-documentation">
            <Button variant="outline" className="gap-2">
              IP Documentation
            </Button>
          </Link>
          <Link to="/legal">
            <Button variant="outline" className="gap-2">
              Legal Center
            </Button>
          </Link>
          <Link to="/">
            <Button variant="outline" className="gap-2">
              <Home className="w-4 h-4" />
              Home
            </Button>
          </Link>
        </div>

        {/* Footer Notice */}
        <div className="text-center pt-6 border-t border-border mt-8">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Sacred Greeks™. All Rights Reserved.
          </p>
          <p className="text-xs text-muted-foreground/70 mt-2">
            Trademark tracking information is for internal administrative use only.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrademarkTracking;
