import { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  gradient?: string;
  delay?: string;
}

export const QuickActionCard = ({ title, description, icon: Icon, href, gradient = "from-sacred to-warm-blue", delay = "0s" }: QuickActionCardProps) => {
  return (
    <Link to={href}>
      <Card 
        className="h-full group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-2 hover:border-sacred/50 animate-scale-in relative overflow-hidden"
        style={{ animationDelay: delay }}
      >
        {/* Gradient overlay on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
        
        <CardHeader className="relative z-10">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-xl mb-2 group-hover:text-sacred transition-colors">
            {title}
          </CardTitle>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
          <div className="flex items-center gap-2 mt-4 text-sacred opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-sm font-medium">Get Started</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
};