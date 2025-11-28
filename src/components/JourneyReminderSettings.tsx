import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Calendar, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

export const JourneyReminderSettings = () => {
  const [isSending, setIsSending] = useState(false);

  const sendTestReminder = async () => {
    setIsSending(true);
    try {
      const { error } = await supabase.functions.invoke("journey-reminder");
      
      if (error) throw error;
      
      toast.success("Journey reminder sent! Check your email inbox.");
    } catch (error: any) {
      console.error("Error sending journey reminder:", error);
      toast.error("Failed to send reminder: " + error.message);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Card className="border-sacred/20">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-sacred" />
          <CardTitle>Journey Reminders</CardTitle>
        </div>
        <CardDescription>
          Stay on track with your 30-day Sacred, Not Sinful journey
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-muted/50 rounded-lg p-4 space-y-3">
          <div className="flex items-start gap-3">
            <Bell className="w-5 h-5 text-sacred mt-0.5" />
            <div className="flex-1">
              <p className="font-medium text-sm">Daily Email Reminders</p>
              <p className="text-sm text-muted-foreground">
                Receive an email each morning with your daily reading and reflection.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Each reminder includes:
          </p>
          <ul className="text-sm text-muted-foreground space-y-1 ml-4">
            <li className="flex items-center gap-2">
              <CheckCircle className="h-3 w-3 text-sacred" />
              Your current day's reading and scripture
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-3 w-3 text-sacred" />
              Progress tracker (X/30 days completed)
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-3 w-3 text-sacred" />
              Direct link to continue your journey
            </li>
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
          Reminders are sent daily at 8:00 AM for users with incomplete journeys.
        </p>
      </CardContent>
    </Card>
  );
};
