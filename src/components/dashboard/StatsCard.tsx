import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
  gradient?: string;
  delay?: string;
}

export const StatsCard = ({ title, value, subtitle, icon: Icon, gradient = "from-sacred to-warm-blue", delay = "0s" }: StatsCardProps) => {
  return (
    <Card 
      className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-scale-in border-2 h-full flex flex-col"
      style={{ animationDelay: delay }}
    >
      {/* Gradient background on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
      
      <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10 flex-shrink-0">
        <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
          {title}
        </CardTitle>
        <div className={`p-2 rounded-xl bg-gradient-to-br ${gradient} shadow-lg flex-shrink-0`}>
          <Icon className="h-4 w-4 text-white" />
        </div>
      </CardHeader>
      <CardContent className="relative z-10 flex-1 flex flex-col justify-center">
        <div className="text-3xl font-bold mb-1 bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
          {value}
        </div>
        <p className="text-xs text-muted-foreground">
          {subtitle}
        </p>
      </CardContent>
    </Card>
  );
};