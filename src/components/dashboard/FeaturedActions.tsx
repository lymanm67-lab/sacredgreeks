import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { BookOpen, Library, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { FeatureCardSkeleton } from '@/components/ui/CardSkeleton';

const featuredActions = [
  {
    id: 'daily-devotional',
    title: 'Daily Scripture & Devotions',
    description: 'Begin your day with scripture, reflection, and spiritual guidance',
    icon: BookOpen,
    href: '/devotional',
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    id: 'myth-buster',
    title: 'Mythbuster Library',
    description: 'Biblical responses to common accusations and misconceptions',
    icon: Library,
    href: '/myth-buster',
    gradient: 'from-purple-500 to-violet-600',
  },
  {
    id: 'bglo-objections',
    title: 'Handle Greek Life Objections',
    description: 'Navigate Greek life challenges using the PROOF framework',
    icon: MessageCircle,
    href: '/guide',
    gradient: 'from-amber-500 to-orange-600',
  },
];

const iconAnimationVariants = {
  initial: { scale: 1, rotate: 0 },
  hover: { 
    scale: 1.15, 
    rotate: [0, -10, 10, -5, 5, 0],
    transition: { 
      rotate: { duration: 0.5, ease: "easeInOut" as const },
      scale: { duration: 0.2 }
    }
  }
};

interface FeaturedActionsProps {
  isLoading?: boolean;
}

export const FeaturedActions = ({ isLoading = false }: FeaturedActionsProps) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            Get Started
          </h2>
          <p className="text-muted-foreground">Choose an action to begin your spiritual journey today</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <FeatureCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Get Started
        </h2>
        <p className="text-muted-foreground">Choose an action to begin your spiritual journey today</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        {featuredActions.map((action, index) => (
          <motion.div
            key={action.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link to={action.href} className="block">
              <Card className="group relative overflow-hidden border border-border bg-background hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer h-full">
                <div className="p-6 space-y-4">
                  {/* Icon */}
                  <motion.div 
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center`}
                    variants={iconAnimationVariants}
                    initial="initial"
                    whileHover="hover"
                  >
                    <action.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  
                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {action.description}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
