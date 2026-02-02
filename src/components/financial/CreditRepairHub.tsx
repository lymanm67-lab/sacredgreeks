import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ExternalLink, 
  FileText, 
  Shield, 
  Copy, 
  CheckCircle2,
  CreditCard,
  BookOpen,
  Users,
  AlertTriangle,
  Download
} from "lucide-react";
import { toast } from "sonner";
import { useExternalLinks } from "@/hooks/use-external-links";

const creditBureaus = [
  {
    name: "Equifax",
    website: "https://www.equifax.com",
    disputeUrl: "https://www.equifax.com/personal/credit-report-services/credit-dispute/",
    phone: "1-866-349-5191",
    address: "Equifax Information Services LLC\nP.O. Box 740256\nAtlanta, GA 30374"
  },
  {
    name: "Experian",
    website: "https://www.experian.com",
    disputeUrl: "https://www.experian.com/disputes/main.html",
    phone: "1-888-397-3742",
    address: "Experian\nP.O. Box 4500\nAllen, TX 75013"
  },
  {
    name: "TransUnion",
    website: "https://www.transunion.com",
    disputeUrl: "https://www.transunion.com/credit-disputes/dispute-your-credit",
    phone: "1-800-916-8800",
    address: "TransUnion LLC\nConsumer Dispute Center\nP.O. Box 2000\nChester, PA 19016"
  }
];

const freeReportSources = [
  {
    name: "AnnualCreditReport.com",
    url: "https://www.annualcreditreport.com",
    description: "Official federally authorized source - Get free reports from all 3 bureaus weekly",
    badge: "Official"
  },
  {
    name: "Credit Karma",
    url: "https://www.creditkarma.com",
    description: "Free credit scores and reports from TransUnion & Equifax",
    badge: "Free"
  },
  {
    name: "Experian Free",
    url: "https://www.experian.com/consumer-products/free-credit-report.html",
    description: "Free Experian credit report and FICO score",
    badge: "Free"
  }
];

const disputeReasons = [
  { value: "not-mine", label: "Account is not mine (identity theft/fraud)" },
  { value: "paid", label: "Account was paid but shows unpaid" },
  { value: "wrong-balance", label: "Incorrect balance amount" },
  { value: "wrong-status", label: "Wrong account status" },
  { value: "late-payment-error", label: "Late payment reported in error" },
  { value: "duplicate", label: "Duplicate account listing" },
  { value: "closed-showing-open", label: "Closed account showing as open" },
  { value: "wrong-date", label: "Incorrect date of last activity" },
  { value: "collection-error", label: "Collection account error" },
  { value: "other", label: "Other inaccuracy" }
];

export function CreditRepairHub() {
  const { openExternalLink } = useExternalLinks();
  const [selectedBureau, setSelectedBureau] = useState<string>("");
  const [disputeReason, setDisputeReason] = useState<string>("");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [ssn, setSSN] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [generatedLetter, setGeneratedLetter] = useState("");

  const generateDisputeLetter = () => {
    if (!selectedBureau || !disputeReason || !accountName || !fullName) {
      toast.error("Please fill in all required fields");
      return;
    }

    const bureau = creditBureaus.find(b => b.name === selectedBureau);
    const reason = disputeReasons.find(r => r.value === disputeReason);
    const today = new Date().toLocaleDateString("en-US", { 
      year: "numeric", 
      month: "long", 
      day: "numeric" 
    });

    const letter = `${today}

${bureau?.address}

Re: Dispute of Inaccurate Information
Account Name: ${accountName}
${accountNumber ? `Account Number (last 4): ${accountNumber}` : ""}

Dear ${selectedBureau} Dispute Department,

I am writing to dispute inaccurate information on my credit report. I have reviewed my credit report and found the following error that requires investigation and correction:

Account/Creditor: ${accountName}
Reason for Dispute: ${reason?.label}
${additionalDetails ? `\nAdditional Details: ${additionalDetails}` : ""}

Under the Fair Credit Reporting Act (FCRA), Section 611, you are required to:
1. Conduct a reasonable investigation of this disputed item within 30 days
2. Remove or modify inaccurate, incomplete, or unverifiable information
3. Provide me with written results of your investigation

I am requesting that you investigate this matter and correct my credit report accordingly. If you find this information to be inaccurate or unverifiable, please delete it from my credit file immediately.

Please send me written confirmation of the results of your investigation and a copy of my updated credit report.

Thank you for your prompt attention to this matter.

Sincerely,

${fullName}
${address}
${ssn ? `SSN (last 4): XXX-XX-${ssn}` : ""}

Enclosures:
- Copy of government-issued ID
- Copy of Social Security card or W-2
- Proof of address (utility bill or bank statement)`;

    setGeneratedLetter(letter);
    toast.success("Dispute letter generated!");
  };

  const copyLetter = () => {
    navigator.clipboard.writeText(generatedLetter);
    toast.success("Letter copied to clipboard!");
  };

  const downloadLetter = () => {
    const blob = new Blob([generatedLetter], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `credit-dispute-${selectedBureau}-${new Date().toISOString().split("T")[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Letter downloaded!");
  };

  return (
    <div className="space-y-6">
      {/* Credit & Greek Life Connection */}
      <Card className="bg-gradient-to-r from-sacred/10 to-emerald-500/10 border-sacred/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-sacred" />
            Why Credit Matters for Greek Life
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 rounded-lg bg-background/50">
              <CreditCard className="w-6 h-6 text-emerald-500 mb-2" />
              <h4 className="font-semibold text-sm">Lower Interest Rates</h4>
              <p className="text-xs text-muted-foreground">Good credit means lower rates on chapter loans, car payments, and mortgages</p>
            </div>
            <div className="p-4 rounded-lg bg-background/50">
              <Shield className="w-6 h-6 text-sacred mb-2" />
              <h4 className="font-semibold text-sm">Better Insurance Rates</h4>
              <p className="text-xs text-muted-foreground">Organizations with good credit leadership get better rates on event insurance</p>
            </div>
            <div className="p-4 rounded-lg bg-background/50">
              <BookOpen className="w-6 h-6 text-amber-500 mb-2" />
              <h4 className="font-semibold text-sm">Biblical Stewardship</h4>
              <p className="text-xs text-muted-foreground">"A good name is more desirable than great riches" (Proverbs 22:1)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="reports" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="reports">Free Credit Reports</TabsTrigger>
          <TabsTrigger value="bureaus">Credit Bureaus</TabsTrigger>
          <TabsTrigger value="dispute">Dispute Generator</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-500" />
                Get Your Free Credit Reports
              </CardTitle>
              <CardDescription>
                Check your reports regularly - errors are common and fixable!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {freeReportSources.map((source) => (
                <div 
                  key={source.name}
                  className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{source.name}</h4>
                      <Badge variant={source.badge === "Official" ? "default" : "secondary"}>
                        {source.badge}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{source.description}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openExternalLink(source.url)}
                    className="shrink-0"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Visit
                  </Button>
                </div>
              ))}

              <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm">Important Tip</h4>
                    <p className="text-sm text-muted-foreground">
                      Pull reports from all 3 bureaus - they often contain different information. 
                      You're entitled to free weekly reports through December 2026.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bureaus" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Three Major Credit Bureaus</CardTitle>
              <CardDescription>
                Direct links to dispute portals and contact information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {creditBureaus.map((bureau) => (
                <Card key={bureau.name} className="border-l-4 border-l-sacred">
                  <CardContent className="pt-4">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="space-y-2">
                        <h4 className="font-bold text-lg">{bureau.name}</h4>
                        <p className="text-sm text-muted-foreground">Phone: {bureau.phone}</p>
                        <pre className="text-xs text-muted-foreground whitespace-pre-line bg-muted/50 p-2 rounded">
                          {bureau.address}
                        </pre>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openExternalLink(bureau.website)}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Website
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => openExternalLink(bureau.disputeUrl)}
                          className="bg-sacred hover:bg-sacred/90"
                        >
                          <Shield className="w-4 h-4 mr-2" />
                          File Dispute
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dispute" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-sacred" />
                Credit Dispute Letter Generator
              </CardTitle>
              <CardDescription>
                Create a professional dispute letter to correct errors on your credit report.
                Save $500-2,000 vs. credit repair companies!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <Label>Credit Bureau *</Label>
                    <Select value={selectedBureau} onValueChange={setSelectedBureau}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select bureau" />
                      </SelectTrigger>
                      <SelectContent>
                        {creditBureaus.map((bureau) => (
                          <SelectItem key={bureau.name} value={bureau.name}>
                            {bureau.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Reason for Dispute *</Label>
                    <Select value={disputeReason} onValueChange={setDisputeReason}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select reason" />
                      </SelectTrigger>
                      <SelectContent>
                        {disputeReasons.map((reason) => (
                          <SelectItem key={reason.value} value={reason.value}>
                            {reason.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Account/Creditor Name *</Label>
                    <Input 
                      placeholder="e.g., Capital One, Collection Agency"
                      value={accountName}
                      onChange={(e) => setAccountName(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label>Account Number (last 4 digits)</Label>
                    <Input 
                      placeholder="1234"
                      maxLength={4}
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Your Full Name *</Label>
                    <Input 
                      placeholder="Your legal name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label>Your Address</Label>
                    <Input 
                      placeholder="Street, City, State ZIP"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label>SSN (last 4 digits only)</Label>
                    <Input 
                      placeholder="6789"
                      maxLength={4}
                      value={ssn}
                      onChange={(e) => setSSN(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label>Additional Details</Label>
                    <Textarea 
                      placeholder="Explain the error in detail..."
                      value={additionalDetails}
                      onChange={(e) => setAdditionalDetails(e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              <Button onClick={generateDisputeLetter} className="w-full">
                Generate Dispute Letter
              </Button>

              {generatedLetter && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">Your Dispute Letter</h4>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={copyLetter}>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </Button>
                      <Button variant="outline" size="sm" onClick={downloadLetter}>
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                  <Textarea 
                    value={generatedLetter}
                    onChange={(e) => setGeneratedLetter(e.target.value)}
                    rows={20}
                    className="font-mono text-sm"
                  />
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-sm">Next Steps</h4>
                        <ul className="text-sm text-muted-foreground list-disc list-inside mt-1">
                          <li>Print and sign the letter</li>
                          <li>Attach copies of your ID and proof of address</li>
                          <li>Send via certified mail with return receipt</li>
                          <li>Keep copies of everything you send</li>
                          <li>Bureau has 30 days to investigate</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
