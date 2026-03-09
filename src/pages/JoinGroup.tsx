import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, GraduationCap, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMinistryGroups } from "@/hooks/use-ministry-groups";
import { useAuth } from "@/contexts/AuthContext";

export default function JoinGroup() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { joinGroup } = useMinistryGroups();
  const [code, setCode] = useState(searchParams.get("code") || "");
  const [joined, setJoined] = useState(false);

  const handleJoin = () => {
    if (!code.trim()) return;
    joinGroup.mutate(code.trim(), {
      onSuccess: () => setJoined(true),
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="max-w-md w-full">
          <CardContent className="py-10 text-center">
            <GraduationCap className="w-10 h-10 text-sacred mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Join a Ministry Group</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Sign in or create an account to join your mentor's group.
            </p>
            <Button onClick={() => navigate("/signin")} className="w-full">
              Sign In to Continue
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (joined) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <Card className="max-w-md w-full">
            <CardContent className="py-10 text-center">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold mb-2">You're In!</h2>
              <p className="text-sm text-muted-foreground mb-6">
                You've successfully joined the ministry group. Head to your dashboard to see your group.
              </p>
              <div className="flex gap-3 justify-center">
                <Button onClick={() => navigate("/mentor-dashboard")}>
                  Go to Dashboard
                </Button>
                <Button variant="outline" onClick={() => navigate("/leadership-academy")}>
                  Browse Courses
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="max-w-md w-full">
        <CardContent className="py-8">
          <div className="text-center mb-6">
            <div className="p-3 rounded-xl bg-sacred/10 w-fit mx-auto mb-3">
              <Users className="w-8 h-8 text-sacred" />
            </div>
            <h2 className="text-xl font-bold">Join a Ministry Group</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Enter the invite code from your pastor or mentor.
            </p>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="join-code">Invite Code</Label>
              <Input
                id="join-code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter invite code..."
                maxLength={50}
                autoFocus
              />
            </div>
            <Button
              onClick={handleJoin}
              disabled={!code.trim() || joinGroup.isPending}
              className="w-full"
            >
              {joinGroup.isPending ? "Joining..." : "Join Group"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
