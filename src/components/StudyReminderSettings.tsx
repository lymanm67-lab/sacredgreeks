import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Bell } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

export const StudyReminderSettings = () => {
  const [isSending, setIsSending] = useState(false);

  const sendTestReminder = async () => {
    setIsSending(true);
    try {
      const { error } = await supabase.functions.invoke("study-reminder");
      
      if (error) throw error;
      
      toast.success("Test reminder sent! Check your email inbox.");
    } catch (error: any) {
      console.error("Error sending test reminder:", error);
      toast.error("Failed to send test reminder: " + error.message);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Card className="border-sacred/20">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-sacred" />
          <CardTitle>Study Reminders</CardTitle>
        </div>
        <CardDescription>
          Stay on track with weekly email reminders
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-sacred mt-0.5" />
            <div className="flex-1">
              <p className="font-medium text-sm">Weekly Email Reminders</p>
              <p className="text-sm text-muted-foreground">
                Receive an email every Monday at 9:00 AM with your progress and a link to continue your study.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Reminders are automatically sent to all users with incomplete study sessions. Each email includes:
          </p>
          <ul className="text-sm text-muted-foreground space-y-1 ml-4">
            <li>• Your current progress (X/5 sessions completed)</li>
            <li>• Direct link to continue your study</li>
            <li>• Encouragement and Scripture</li>
          </ul>
        </div>

        <Button
          onClick={sendTestReminder}
          disabled={isSending}
          variant="outline"
          className="w-full"
        >
          {isSending ? "Sending..." : "Send Test Reminder Now"}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          Want to pause reminders? Contact support or complete all sessions.
        </p>
      </CardContent>
    </Card>
  );
};
