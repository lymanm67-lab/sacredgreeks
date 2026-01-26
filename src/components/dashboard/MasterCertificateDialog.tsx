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
import { Award, Printer, Trophy, Target, Building2, Shield, Flame } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface MasterCertificateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  completedPaths: string[];
}

export const MasterCertificateDialog = ({ 
  open, 
  onOpenChange,
  completedPaths 
}: MasterCertificateDialogProps) => {
  const { user } = useAuth();
  const [customName, setCustomName] = useState("");

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
  const completionDate = format(new Date(), "MMMM dd, yyyy");
  const certificateId = `SGM-${Date.now().toString(36).toUpperCase()}`;

  const handlePrint = () => {
    try {
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        toast.error("Please allow pop-ups to print your certificate");
        return;
      }

      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Sacred Greeks Master Certificate - ${displayName}</title>
            <style>
              @page { size: landscape; margin: 0; }
              * { margin: 0; padding: 0; box-sizing: border-box; }
              body {
                font-family: 'Georgia', serif;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                background: white;
              }
              .certificate {
                width: 297mm;
                height: 210mm;
                padding: 30px;
                position: relative;
                background: linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #fef3c7 100%);
              }
              .certificate::before {
                content: '';
                position: absolute;
                top: 20px;
                left: 20px;
                right: 20px;
                bottom: 20px;
                border: 4px solid #B8860B;
                border-radius: 8px;
              }
              .certificate::after {
                content: '';
                position: absolute;
                top: 30px;
                left: 30px;
                right: 30px;
                bottom: 30px;
                border: 2px solid #DAA520;
                border-radius: 4px;
              }
              .corner { 
                position: absolute; 
                width: 60px; 
                height: 60px; 
                background: linear-gradient(135deg, #B8860B, #DAA520);
                clip-path: polygon(0 0, 100% 0, 0 100%);
              }
              .corner.tl { top: 40px; left: 40px; }
              .corner.tr { top: 40px; right: 40px; transform: rotate(90deg); }
              .corner.bl { bottom: 40px; left: 40px; transform: rotate(-90deg); }
              .corner.br { bottom: 40px; right: 40px; transform: rotate(180deg); }
              .content {
                position: relative;
                z-index: 1;
                text-align: center;
                padding: 50px 60px;
              }
              .header {
                font-size: 14px;
                letter-spacing: 4px;
                color: #B8860B;
                margin-bottom: 10px;
              }
              h1 { 
                font-size: 52px; 
                color: #8B4513; 
                margin-bottom: 5px;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
              }
              .subtitle { font-size: 20px; color: #B8860B; margin-bottom: 25px; font-style: italic; }
              .presents { font-size: 16px; color: #666; margin-bottom: 15px; }
              .name {
                font-size: 48px;
                color: #8B4513;
                font-weight: bold;
                margin: 20px 0;
                border-bottom: 3px solid #B8860B;
                display: inline-block;
                padding-bottom: 10px;
                text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
              }
              .achievement {
                font-size: 18px;
                color: #666;
                margin: 15px 0;
                line-height: 1.6;
              }
              .paths-container {
                display: flex;
                justify-content: center;
                gap: 30px;
                margin: 25px 0;
                flex-wrap: wrap;
              }
              .path {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 8px;
              }
              .path-icon {
                width: 50px;
                height: 50px;
                background: linear-gradient(135deg, #B8860B, #DAA520);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 24px;
              }
              .path-name {
                font-size: 11px;
                color: #666;
                font-weight: 600;
              }
              .signature-section {
                display: flex;
                justify-content: space-around;
                margin-top: 40px;
                padding: 0 60px;
              }
              .signature {
                text-align: center;
              }
              .signature-line {
                border-top: 1px solid #666;
                width: 180px;
                margin: 0 auto 10px;
                padding-top: 30px;
              }
              .signature-name {
                font-size: 22px;
                font-style: italic;
                color: #8B4513;
                margin-bottom: 5px;
              }
              .signature-title {
                font-size: 11px;
                color: #666;
              }
              .seal {
                position: absolute;
                right: 80px;
                bottom: 80px;
                width: 100px;
                height: 100px;
                background: radial-gradient(circle, #B8860B 0%, #8B4513 100%);
                border-radius: 50%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                color: #fef3c7;
                box-shadow: 0 4px 15px rgba(0,0,0,0.3);
              }
              .seal-text {
                font-size: 9px;
                text-transform: uppercase;
                letter-spacing: 1px;
              }
              .seal-icon {
                font-size: 32px;
                margin: 5px 0;
              }
              .footer {
                position: absolute;
                bottom: 25px;
                left: 0;
                right: 0;
                text-align: center;
                font-size: 10px;
                color: #999;
              }
              @media print {
                body { background: white; }
                .no-print { display: none; }
              }
            </style>
          </head>
          <body>
            <div class="certificate">
              <div class="corner tl"></div>
              <div class="corner tr"></div>
              <div class="corner bl"></div>
              <div class="corner br"></div>
              
              <div class="content">
                <div class="header">SACRED GREEKS ACADEMY</div>
                <h1>Master Certificate</h1>
                <p class="subtitle">Certificate of Excellence</p>
                
                <p class="presents">This is to certify that</p>
                <div class="name">${displayName}</div>
                
                <p class="achievement">
                  has demonstrated exceptional dedication and mastery by completing<br>
                  all four learning paths of the Sacred Greeks curriculum
                </p>

                <div class="paths-container">
                  <div class="path">
                    <div class="path-icon">🎯</div>
                    <span class="path-name">P.R.O.O.F. Course</span>
                  </div>
                  <div class="path">
                    <div class="path-icon">🏛️</div>
                    <span class="path-name">Greek Life & Guild</span>
                  </div>
                  <div class="path">
                    <div class="path-icon">🛡️</div>
                    <span class="path-name">Myth Busters</span>
                  </div>
                  <div class="path">
                    <div class="path-icon">🔥</div>
                    <span class="path-name">Faith & Authority</span>
                  </div>
                </div>
              </div>
              
              <div class="signature-section">
                <div class="signature">
                  <div class="signature-line">
                    <div class="signature-name">Dr. Lyman</div>
                  </div>
                  <div class="signature-title">Author, Sacred Not Sinful</div>
                </div>
                <div class="signature">
                  <div class="signature-line">
                    <div class="signature-name">${completionDate}</div>
                  </div>
                  <div class="signature-title">Date of Completion</div>
                </div>
              </div>

              <div class="seal">
                <span class="seal-text">Sacred</span>
                <span class="seal-icon">🏆</span>
                <span class="seal-text">Greeks</span>
              </div>
              
              <div class="footer">
                SacredGreeks.com | Based on Sacred, Not Sinful by Dr. Lyman<br>
                Master Certificate ID: ${certificateId}
              </div>
            </div>
          </body>
        </html>
      `);

      printWindow.document.close();
      setTimeout(() => {
        printWindow.print();
        toast.success("Master Certificate ready! 🏆");
      }, 250);
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
            <Trophy className="w-5 h-5 text-amber-500" />
            Sacred Greeks Master Certificate
          </DialogTitle>
          <DialogDescription>
            Congratulations on completing all learning paths! Download your personalized master certificate.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Certificate Preview */}
          <div className="bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-900/20 dark:to-amber-800/10 border-2 border-amber-500/30 rounded-lg p-6 text-center">
            <Trophy className="w-14 h-14 text-amber-500 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-foreground mb-1">
              Master Certificate
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Sacred Greeks Academy
            </p>
            
            <div className="bg-background/50 rounded-lg px-4 py-3 mb-4">
              <p className="text-xs text-muted-foreground">This certifies that</p>
              <p className="text-lg font-bold text-amber-600 dark:text-amber-400">{displayName}</p>
              <p className="text-xs text-muted-foreground mt-1">has completed all four learning paths</p>
            </div>

            {/* Path Icons */}
            <div className="flex justify-center gap-3">
              <div className="flex flex-col items-center">
                <Target className="w-6 h-6 text-amber-500" />
                <span className="text-[10px] text-muted-foreground">PROOF</span>
              </div>
              <div className="flex flex-col items-center">
                <Building2 className="w-6 h-6 text-violet-500" />
                <span className="text-[10px] text-muted-foreground">Guild</span>
              </div>
              <div className="flex flex-col items-center">
                <Shield className="w-6 h-6 text-orange-500" />
                <span className="text-[10px] text-muted-foreground">Myths</span>
              </div>
              <div className="flex flex-col items-center">
                <Flame className="w-6 h-6 text-rose-500" />
                <span className="text-[10px] text-muted-foreground">Faith</span>
              </div>
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
            <p className="text-sm font-medium">Your master certificate includes:</p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>✓ Your name and completion date</li>
              <li>✓ All four learning path achievements</li>
              <li>✓ Digital signature from Dr. Lyman</li>
              <li>✓ Official Sacred Greeks seal</li>
              <li>✓ Unique master certificate ID</li>
            </ul>
          </div>

          {/* Print Button */}
          <Button
            onClick={handlePrint}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
          >
            <Printer className="w-4 h-4 mr-2" />
            Print Master Certificate
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Your certificate will open in a new window ready to print or save as PDF.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
