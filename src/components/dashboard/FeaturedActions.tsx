import { Link } from 'react-router-dom';
import { BookOpen, Library, MessageCircle, Sparkles, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { FeatureCardSkeleton } from '@/components/ui/CardSkeleton';

const featuredActions = [
  {
    id: 'daily-devotional',
    tourId: 'devotional',
    title: 'Daily Scripture & Devotions',
    description: 'Begin your day with scripture, reflection, and spiritual guidance',
    icon: BookOpen,
    href: '/devotional',
    gradient: 'from-blue-500 to-indigo-600',
    accentColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
  },
  {
    id: 'myth-buster',
    tourId: 'mythbuster',
    title: 'Mythbuster Library',
    description: 'Biblical responses to common accusations and misconceptions',
    icon: Library,
    href: '/myth-buster',
    gradient: 'from-purple-500 to-violet-600',
    accentColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
  },
  {
    id: 'bglo-objections',
    tourId: null,
    title: 'Handle Greek Life Objections',
    description: 'Biblical responses to family, church, and ministry concerns',
    icon: MessageCircle,
    href: '/guide',
    gradient: 'from-amber-500 to-orange-600',
    accentColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
  },
];

interface FeaturedActionsProps {
  isLoading?: boolean;
}

export const FeaturedActions = ({ isLoading = false }: FeaturedActionsProps) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">Get Started</h2>
            <p className="text-sm text-muted-foreground">Choose an action to begin your spiritual journey</p>
          </div>
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
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">Get Started</h2>
          <p className="text-sm text-muted-foreground">Choose an action to begin your spiritual journey</p>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        {featuredActions.map((action, index) => (
          <motion.div
            key={action.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link to={action.href} className="block h-full">
              <motion.div
                data-tour={action.tourId || undefined}
                className={`group relative overflow-hidden rounded-2xl border-2 ${action.borderColor} bg-card hover:border-primary/50 transition-all duration-300 cursor-pointer h-full`}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                {/* Glow effect - contained */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${action.gradient} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`} />
                </div>
                
                <div className="relative p-6 space-y-4">
                  {/* Icon with animation */}
                  <motion.div 
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${action.gradient} flex items-center justify-center shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <action.icon className="w-7 h-7 text-white" />
                  </motion.div>
                  
                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                      {action.title}
                      <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {action.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
