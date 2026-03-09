import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Zap, PiggyBank, TrendingUp, CreditCard, Bot } from 'lucide-react';
import { useExternalLinks } from '@/hooks/use-external-links';

const PRISM_URL = 'https://www.prismbudget.com/?ref=sacredgreeks&utm_source=sacredgreeks&utm_medium=app';

type PromoVariant = 'budget' | 'debt' | 'wealth' | 'smsp';

interface PrismBudgetPromoProps {
  variant: PromoVariant;
}

const variantConfig: Record<PromoVariant, {
  icon: React.ElementType;
  headline: string;
  description: string;
  cta: string;
  iconColor: string;
  borderColor: string;
  bgGradient: string;
}> = {
  smsp: {
    icon: Zap,
    headline: 'Put Your Plan Into Action',
    description: 'PrismBudget uses the same zero-based budgeting approach with bank syncing, AI insights, and envelope budgeting to help every dollar find its job.',
    cta: 'Try PrismBudget Free',
    iconColor: 'text-teal-400',
    borderColor: 'border-teal-500/30',
    bgGradient: 'from-teal-500/10 to-emerald-500/5',
  },
  debt: {
    icon: CreditCard,
    headline: 'Track Your Debt Payoff Journey',
    description: 'Use PrismBudget\'s debt payoff planner to visualize your progress with Snowball, Avalanche, or custom strategies — users have paid off $2M+ in debt.',
    cta: 'Start Crushing Debt',
    iconColor: 'text-amber-400',
    borderColor: 'border-amber-500/30',
    bgGradient: 'from-amber-500/10 to-orange-500/5',
  },
  budget: {
    icon: PiggyBank,
    headline: 'Take Budgeting to the Next Level',
    description: 'Connect your bank accounts, track spending in real-time, and get smart reports on cash flow and net worth — all in one place.',
    cta: 'Get Started Free',
    iconColor: 'text-emerald-400',
    borderColor: 'border-emerald-500/30',
    bgGradient: 'from-emerald-500/10 to-green-500/5',
  },
  wealth: {
    icon: TrendingUp,
    headline: 'Build Generational Wealth',
    description: 'Track investments, monitor net worth growth, set financial goals, and get AI-powered tax guidance — everything you need for long-term wealth building.',
    cta: 'Start Building Wealth',
    iconColor: 'text-cyan-400',
    borderColor: 'border-cyan-500/30',
    bgGradient: 'from-cyan-500/10 to-blue-500/5',
  },
};

export function PrismBudgetPromo({ variant }: PrismBudgetPromoProps) {
  const { openExternalLink } = useExternalLinks();
  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <Card className={`${config.borderColor} bg-gradient-to-r ${config.bgGradient} overflow-hidden relative`}>
      <CardContent className="pt-6">
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <div className={`p-3 rounded-xl bg-background/60 backdrop-blur-sm border border-border/50 shrink-0`}>
            <Icon className={`w-6 h-6 ${config.iconColor}`} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h3 className="font-bold text-foreground">{config.headline}</h3>
              <Badge variant="outline" className="text-xs border-teal-500/40 text-teal-600 dark:text-teal-400">
                <Bot className="w-3 h-3 mr-1" />
                AI-Powered
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {config.description}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button
                size="sm"
                onClick={() => openExternalLink(PRISM_URL)}
                className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white"
              >
                {config.cta}
                <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
              </Button>
              <span className="text-xs text-muted-foreground">Free plan available • No credit card required</span>
            </div>
          </div>
        </div>
        {/* Subtle branding */}
        <div className="mt-4 pt-3 border-t border-border/30 flex items-center gap-2">
          <Zap className="w-3.5 h-3.5 text-teal-500" />
          <span className="text-xs text-muted-foreground">
            Powered by <button onClick={() => openExternalLink(PRISM_URL)} className="font-semibold text-teal-600 dark:text-teal-400 hover:underline">PrismBudget</button> — 10,000+ users • 4.9/5 rating
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
