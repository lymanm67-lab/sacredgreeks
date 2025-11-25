import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Heart, BookOpen, MessageSquare, Book } from 'lucide-react';
import { motion } from 'framer-motion';

const featuredActions = [
  {
    id: 'new-assessment',
    title: 'Start Assessment',
    description: 'Get biblical guidance for your decisions',
    icon: Heart,
    href: '/guide',
    gradient: 'from-rose-500 to-pink-600',
  },
  {
    id: 'daily-devotional',
    title: 'Daily Devotional',
    description: 'Begin your day with scripture and reflection',
    icon: BookOpen,
    href: '/devotional',
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    id: 'prayer-wall',
    title: 'Prayer Wall',
    description: 'Share and support community prayer requests',
    icon: MessageSquare,
    href: '/prayer-wall',
    gradient: 'from-purple-500 to-violet-600',
  },
  {
    id: 'bible-study',
    title: 'Bible Study',
    description: 'Explore Scripture with study plans',
    icon: Book,
    href: '/bible-study',
    gradient: 'from-emerald-500 to-teal-600',
  },
];

export const FeaturedActions = () => {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
          Get Started
        </h2>
        <p className="text-muted-foreground">Choose an action to begin your spiritual journey today</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {featuredActions.map((action, index) => (
          <motion.div
            key={action.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link to={action.href}>
              <Card className="group relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer h-full">
                <div className="p-6 space-y-4">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${action.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <action.icon className="w-7 h-7 text-white" />
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {action.description}
                    </p>
                  </div>
                  
                  {/* Hover indicator */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
