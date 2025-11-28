import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Heart, BookOpen, Library, Book, MessageCircle, Sparkles, Users, HeartHandshake } from 'lucide-react';
import { motion } from 'framer-motion';
import { ExternalContentModal } from '@/components/ui/ExternalContentModal';
import { FeatureCardSkeleton } from '@/components/ui/CardSkeleton';

const featuredActions = [
  {
    id: 'new-assessment',
    title: 'Start Assessment',
    description: 'Discover your 5 Persona Types Architecture',
    icon: Heart,
    href: 'https://drlymanmontgomery.involve.me/fmmpa',
    gradient: 'from-rose-500 to-pink-600',
    isExternal: true,
    useModal: true,
  },
  {
    id: 'bglo-objections',
    title: 'Handle BGLO Objections',
    description: 'Navigate Greek life challenges using the PROOF framework',
    icon: MessageCircle,
    href: '/guide',
    gradient: 'from-purple-500 to-violet-600',
  },
  {
    id: 'family-church-healing',
    title: 'Family & Church Hurt Healing',
    description: 'Navigate damaged relationships, process trauma & rebuild trust',
    icon: HeartHandshake,
    href: '/family-ministry-fallout',
    gradient: 'from-teal-500 to-amber-500',
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
    id: 'prayer-guide',
    title: 'Prayer Guide',
    description: 'AI prayers, templates & tutorials',
    icon: Sparkles,
    href: '/prayer-guide',
    gradient: 'from-pink-500 to-rose-600',
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
          <h2 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Get Started
          </h2>
          <p className="text-muted-foreground">Choose an action to begin your spiritual journey today</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <FeatureCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
          Get Started
        </h2>
        <p className="text-muted-foreground">Choose an action to begin your spiritual journey today</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {featuredActions.map((action, index) => (
          <motion.div
            key={action.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {action.isExternal && action.useModal ? (
              <ExternalContentModal
                url={action.href}
                title={action.title}
                description={action.description}
                trigger={
                  <div className="cursor-pointer">
                    <Card className="group relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer h-[260px] flex flex-col feature-card">
                      <div className="p-6 space-y-4 flex-1 flex flex-col">
                        {/* Icon with animation */}
                        <motion.div 
                          className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${action.gradient} flex items-center justify-center shadow-lg flex-shrink-0`}
                          variants={iconAnimationVariants}
                          initial="initial"
                          whileHover="hover"
                        >
                          <action.icon className="w-7 h-7 text-white" />
                        </motion.div>
                        
                        {/* Content */}
                        <div className="space-y-2 flex-1 overflow-hidden">
                          <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                            {action.title}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                            {action.description}
                          </p>
                        </div>
                        
                        {/* Hover indicator */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </Card>
                  </div>
                }
              />
            ) : action.isExternal ? (
              <a 
                href={action.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block"
              >
                <Card className="group relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer h-[260px] flex flex-col feature-card">
                  <div className="p-6 space-y-4 flex-1 flex flex-col">
                    {/* Icon with animation */}
                    <motion.div 
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${action.gradient} flex items-center justify-center shadow-lg flex-shrink-0`}
                      variants={iconAnimationVariants}
                      initial="initial"
                      whileHover="hover"
                    >
                      <action.icon className="w-7 h-7 text-white" />
                    </motion.div>
                    
                    {/* Content */}
                    <div className="space-y-2 flex-1 overflow-hidden">
                      <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                        {action.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                        {action.description}
                      </p>
                    </div>
                    
                    {/* Hover indicator */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Card>
              </a>
            ) : (
              <Link to={action.href} className="block">
                <Card className="group relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer h-[260px] flex flex-col feature-card">
                  <div className="p-6 space-y-4 flex-1 flex flex-col">
                    {/* Icon with animation */}
                    <motion.div 
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${action.gradient} flex items-center justify-center shadow-lg flex-shrink-0`}
                      variants={iconAnimationVariants}
                      initial="initial"
                      whileHover="hover"
                    >
                      <action.icon className="w-7 h-7 text-white" />
                    </motion.div>
                    
                    {/* Content */}
                    <div className="space-y-2 flex-1 overflow-hidden">
                      <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                        {action.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                        {action.description}
                      </p>
                    </div>
                    
                    {/* Hover indicator */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Card>
              </Link>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
