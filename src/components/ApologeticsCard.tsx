import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileDown, BookOpen, Shield, Cross } from "lucide-react";
import { toast } from "sonner";

export function ApologeticsCard() {
  const generateApologeticsCardPDF = async () => {
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: [148, 105] // A6 size, perfect for cards
      });
      
      // Card 1: Front
      doc.setFillColor(139, 69, 19); // Brown
      doc.rect(0, 0, 148, 105, "F");
      
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.setTextColor(255, 255, 255);
      doc.text("APOLOGETICS QUICK REFERENCE", 74, 15, { align: "center" });
      
      doc.setFontSize(10);
      doc.text("Greek Organizations: A Biblical Defense", 74, 22, { align: "center" });
      
      doc.setDrawColor(255, 215, 0);
      doc.setLineWidth(0.5);
      doc.line(20, 26, 128, 26);
      
      // Scripture References
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.text("KEY SCRIPTURES:", 10, 34);
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7);
      const scriptures = [
        "Acts 2:42 — Koinonia (fellowship/fraternity)",
        "Mark 6:3 — Jesus the TEKTON (guild craftsman)",
        "Luke 5:10 — Peter & James as guild partners (koinonoi)",
        "Acts 23:6 — Paul's Pharisee fraternity membership",
        "1 Cor 16:22 — MARANATHA secret password",
        "Romans 16:16 — Holy Kiss ritual greeting",
        "Judges 12:5-6 — SHIBBOLETH precedent"
      ];
      
      let y = 40;
      scriptures.forEach(s => {
        doc.text("• " + s, 10, y);
        y += 5;
      });
      
      // Key Points
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.text("DEFENSE POINTS:", 80, 34);
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7);
      const points = [
        "Jesus trained 18 years in guild system",
        "Early church used secret signs (ichthys)",
        "Catechumen initiation: 1-3 years",
        "Pharisees, Essenes = Jewish fraternities",
        "Koinonia = commanded fellowship",
        "Guild oaths protected national security",
        "Solomon's builders had secret marks"
      ];
      
      y = 40;
      points.forEach(p => {
        doc.text("✓ " + p, 80, y);
        y += 5;
      });
      
      // Footer
      doc.setFontSize(6);
      doc.setFont("helvetica", "italic");
      doc.text("Source: Dr. Lyman A. Montgomery, Sacred Not Sinful | Sacred Greeks Ministry", 74, 98, { align: "center" });
      
      // Page 2: Back with citations
      doc.addPage([148, 105], "landscape");
      
      doc.setFillColor(245, 245, 220); // Beige
      doc.rect(0, 0, 148, 105, "F");
      
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text("SCHOLARLY CITATIONS", 74, 12, { align: "center" });
      
      doc.setDrawColor(139, 69, 19);
      doc.setLineWidth(0.3);
      doc.line(20, 15, 128, 15);
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(6);
      
      const citations = [
        "Montgomery, Dr. Lyman A. Sacred Not Sinful: A Biblical Response...",
        "Josephus, Jewish Antiquities 15.390-402 (Guild secrecy)",
        "Mishnah Kiddushin 4:14 (Apprentice obligations)",
        "Kloppenborg, J.S. \"Collegia and Thiasoi\" (1996)",
        "Harland, P.A. Associations, Synagogues, and Congregations (2003)",
        "Dead Sea Scrolls: Community Rule (1QS) — Essene initiation",
        "Hippolytus, Apostolic Tradition c. 215 AD (Catechumenate)",
        "Tertullian, Apology 7, 39 (Early church secrecy)",
        "Campbell, K.M. \"What Was Jesus' Occupation?\" JETS 48.3 (2005)",
        "Neusner, J. Rabbinic Traditions About the Pharisees (1971)",
        "Vermes, G. Complete Dead Sea Scrolls in English (2004)",
        "Ferguson, E. Backgrounds of Early Christianity, 3rd ed. (2003)"
      ];
      
      y = 22;
      citations.forEach((c, i) => {
        doc.text((i + 1) + ". " + c, 10, y);
        y += 5.5;
      });
      
      // Early Church Practices Box
      doc.setFillColor(139, 69, 19);
      doc.rect(10, 75, 128, 25, "F");
      
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.text("EARLY CHURCH SECRET PRACTICES:", 74, 82, { align: "center" });
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(6);
      doc.text("Ichthys fish symbol • Secret handshakes • MARANATHA password • Holy Kiss ritual", 74, 88, { align: "center" });
      doc.text("Catechumen initiation (disrobing, anointing, new name, white robes) • Disciplina Arcani", 74, 93, { align: "center" });
      
      doc.save("apologetics-quick-reference-card.pdf");
      toast.success("Apologetics card downloaded!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF");
    }
  };

  return (
    <Card className="border-sacred/30 bg-gradient-to-br from-sacred/5 to-background">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-sacred/10">
              <Shield className="w-5 h-5 text-sacred" />
            </div>
            <CardTitle className="text-lg text-sacred">Apologetics Quick Reference</CardTitle>
          </div>
          <Button
            variant="default"
            size="sm"
            onClick={generateApologeticsCardPDF}
            className="gap-2"
          >
            <FileDown className="w-4 h-4" />
            <span className="hidden sm:inline">Download Card</span>
            <span className="sm:hidden">PDF</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Printable pocket card with key Scripture references, defense points, and citations for defending Greek organization membership.
        </p>
        
        <div className="grid md:grid-cols-2 gap-4">
          {/* Key Scriptures */}
          <div className="p-3 rounded-lg bg-muted/50 border border-border">
            <h5 className="font-semibold text-foreground text-sm mb-2 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-sacred" />
              Key Scriptures
            </h5>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li>• <strong>Acts 2:42</strong> — Koinonia commanded</li>
              <li>• <strong>Mark 6:3</strong> — Jesus the tekton</li>
              <li>• <strong>Luke 5:10</strong> — Guild partners</li>
              <li>• <strong>Acts 23:6</strong> — Paul's Pharisee membership</li>
              <li>• <strong>1 Cor 16:22</strong> — MARANATHA password</li>
              <li>• <strong>Judges 12:5-6</strong> — SHIBBOLETH precedent</li>
            </ul>
          </div>
          
          {/* Defense Points */}
          <div className="p-3 rounded-lg bg-muted/50 border border-border">
            <h5 className="font-semibold text-foreground text-sm mb-2 flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-600" />
              Quick Defense Points
            </h5>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li>✓ Jesus trained 18 years in guild system</li>
              <li>✓ Early church used secret signs (ichthys)</li>
              <li>✓ Catechumen initiation lasted 1-3 years</li>
              <li>✓ Pharisees, Essenes = Jewish fraternities</li>
              <li>✓ Solomon's builders had guild marks</li>
              <li>✓ Disciplina Arcani: church secrecy doctrine</li>
            </ul>
          </div>
        </div>
        
        {/* Early Church Practices */}
        <div className="p-3 rounded-lg bg-gradient-to-r from-sacred/10 to-amber-500/10 border border-sacred/20">
          <h5 className="font-semibold text-foreground text-sm mb-2">Early Church Secret Practices</h5>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            <Badge variant="outline" className="text-xs justify-center">Ichthys Symbol</Badge>
            <Badge variant="outline" className="text-xs justify-center">Secret Handshakes</Badge>
            <Badge variant="outline" className="text-xs justify-center">MARANATHA</Badge>
            <Badge variant="outline" className="text-xs justify-center">Holy Kiss</Badge>
            <Badge variant="outline" className="text-xs justify-center">Catechumen Rites</Badge>
            <Badge variant="outline" className="text-xs justify-center">Disciplina Arcani</Badge>
          </div>
        </div>
        
        <p className="text-xs text-muted-foreground italic">
          Source: Dr. Lyman A. Montgomery, <em>Sacred Not Sinful: A Biblical Response to the Black Greek Letter Organizations Debate</em>
        </p>
      </CardContent>
    </Card>
  );
}
