import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus, Mail } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export function InviteFriendsDialog() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState("");
  const [sending, setSending] = useState(false);

  const handleSendInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!recipientEmail.trim()) {
      toast.error("Please enter an email address");
      return;
    }

    if (!user?.email) {
      toast.error("You must be logged in to send invites");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(recipientEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setSending(true);

    try {
      // Fetch user profile for full name
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .single();

      const inviterName = profile?.full_name || user.email;

      const { error } = await supabase.functions.invoke("send-invite-email", {
        body: {
          inviterName,
          inviterEmail: user.email,
          recipientEmail: recipientEmail.trim(),
        },
      });

      if (error) throw error;

      toast.success(`Invitation sent to ${recipientEmail}!`);
      setRecipientEmail("");
      setOpen(false);
    } catch (error: any) {
      console.error("Error sending invite:", error);
      toast.error(error.message || "Failed to send invitation");
    } finally {
      setSending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <UserPlus className="h-4 w-4" />
          Invite Friends
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            Invite Friends to Sacred Greeks
          </DialogTitle>
          <DialogDescription>
            Share Sacred Greeks with your friends! They'll receive an email invitation to join the platform.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSendInvite} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="email">Friend's Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="friend@example.com"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              disabled={sending}
            />
          </div>
          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={sending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={sending}>
              {sending ? "Sending..." : "Send Invitation"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
