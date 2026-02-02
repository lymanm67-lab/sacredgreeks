import { Badge } from "@/components/ui/badge";
import { Trophy, Sparkles, Shield, Zap } from "lucide-react";

interface BlueOceanBadgeProps {
  variant?: "default" | "gold" | "purple" | "gradient";
  size?: "sm" | "default" | "lg";
  showIcon?: boolean;
}

export function BlueOceanBadge({ 
  variant = "default", 
  size = "default",
  showIcon = true 
}: BlueOceanBadgeProps) {
  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    default: "text-sm px-3 py-1",
    lg: "text-base px-4 py-1.5",
  };

  const variantClasses = {
    default: "bg-sacred/10 text-sacred border-sacred/30 hover:bg-sacred/20",
    gold: "bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30",
    purple: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30",
    gradient: "bg-gradient-to-r from-sacred/20 via-purple-500/20 to-blue-500/20 text-sacred border-sacred/30",
  };

  return (
    <Badge 
      className={`${sizeClasses[size]} ${variantClasses[variant]} font-semibold transition-colors`}
    >
      {showIcon && <Trophy className="w-3.5 h-3.5 mr-1.5" />}
      Only App: Faith + Greek Life
    </Badge>
  );
}

export function UniqueFeatureBadge({ 
  children,
  icon: Icon = Sparkles 
}: { 
  children: React.ReactNode;
  icon?: React.ElementType;
}) {
  return (
    <Badge 
      variant="outline" 
      className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/30 text-xs"
    >
      <Icon className="w-3 h-3 mr-1" />
      {children}
    </Badge>
  );
}

export function CompetitorGapBadge() {
  return (
    <Badge 
      variant="outline"
      className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30 text-xs"
    >
      <Zap className="w-3 h-3 mr-1" />
      Zero Competitors
    </Badge>
  );
}

export function FreeForeverBadge() {
  return (
    <Badge 
      variant="outline"
      className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-xs"
    >
      <Shield className="w-3 h-3 mr-1" />
      100% Free Forever
    </Badge>
  );
}
