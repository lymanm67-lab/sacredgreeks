import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Award, Download } from "lucide-react";
import { downloadCertificate } from "./CertificateGenerator";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface CertificateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  completionDate: string;
}

export const CertificateDialog = ({ open, onOpenChange, completionDate }: CertificateDialogProps) => {
  const { user } = useAuth();
  const [customName, setCustomName] = useState("");

  // Fetch user's full name from profile
  const { data: profile } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const displayName = customName || profile?.full_name || user?.email?.split("@")[0] || "Student";

  const handleDownload = () => {
    try {
      downloadCertificate(displayName, completionDate);
      toast.success("Certificate downloaded successfully! 🎉");
    } catch (error) {
      console.error("Error generating certificate:", error);
      toast.error("Failed to generate certificate");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-sacred" />
            Download Your Certificate
          </DialogTitle>
          <DialogDescription>
            Congratulations on completing all 5 sessions! Download your personalized certificate of completion.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Certificate Preview */}
          <div className="bg-gradient-to-br from-sacred/10 to-sacred/5 border-2 border-sacred/20 rounded-lg p-6 text-center">
            <Award className="w-12 h-12 text-sacred mx-auto mb-3" />
            <h3 className="text-lg font-bold text-foreground mb-1">
              Certificate of Completion
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              Sacred, Not Sinful Study Guide
            </p>
            <div className="bg-background/50 rounded px-3 py-2">
              <p className="text-xs text-muted-foreground">This certifies that</p>
              <p className="text-base font-bold text-sacred">{displayName}</p>
              <p className="text-xs text-muted-foreground mt-1">has completed all 5 sessions</p>
            </div>
          </div>

          {/* Name Input */}
          <div className="space-y-2">
            <Label htmlFor="certificate-name">Name on Certificate (optional)</Label>
            <Input
              id="certificate-name"
              placeholder={profile?.full_name || "Enter your full name"}
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Leave blank to use: {profile?.full_name || user?.email?.split("@")[0] || "your account name"}
            </p>
          </div>

          {/* Certificate Features */}
          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <p className="text-sm font-medium">Your certificate includes:</p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>✓ Your name and completion date</li>
              <li>✓ Digital signature from Dr. Lyman</li>
              <li>✓ 5 sessions completed (10+ study hours)</li>
              <li>✓ Unique certificate ID for authenticity</li>
              <li>✓ Professional PDF format</li>
            </ul>
          </div>

          {/* Download Button */}
          <Button
            onClick={handleDownload}
            className="w-full bg-sacred hover:bg-sacred/90 text-sacred-foreground"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Certificate (PDF)
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Your certificate will be downloaded as a PDF file that you can print or share.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
