import { Sun, Moon, Bell, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const dailyRoutine = [
  {
    time: "Morning",
    icon: Sun,
    title: "Start Your Day Right",
    description: "Open to today's devotional & verse tailored for Greek Christians",
    color: "text-amber-500"
  },
  {
    time: "Anytime",
    icon: Zap,
    title: "Quick Prayer Access",
    description: "One tap to journal, pray, or find guidance for chapter situations",
    color: "text-sacred"
  },
  {
    time: "Evening",
    icon: Moon,
    title: "Reflect & Track",
    description: "Log your growth, celebrate wins, prepare for tomorrow",
    color: "text-purple-500"
  },
  {
    time: "Always",
    icon: Bell,
    title: "Gentle Reminders",
    description: "Notifications keep you consistent without being intrusive",
    color: "text-rose-500"
  }
];

export function DailyValueSection() {
  return (
    <section id="daily-value" className="py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            Why Keep Sacred Greeks on Your{" "}
            <span className="gradient-text">Home Screen?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The only app that helps you honor your faith AND your letters—every single day.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {dailyRoutine.map((item, index) => (
            <Card 
              key={item.time} 
              className="group hover-lift border-border/50 bg-card/50 backdrop-blur-sm animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 text-center space-y-3">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted ${item.color} group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {item.time}
                </div>
                <h3 className="font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sacred/10 text-sacred text-sm font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sacred opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sacred"></span>
            </span>
            Used daily by Christians across NPHC, NPC, IFC & more
          </div>
        </div>
      </div>
    </section>
  );
}
