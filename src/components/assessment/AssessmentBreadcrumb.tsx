import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AssessmentBreadcrumbProps {
  assessmentName: string;
  currentStep?: 'instructions' | 'questions' | 'results';
  currentQuestion?: number;
  totalQuestions?: number;
  colorScheme?: 'purple' | 'amber' | 'fuchsia' | 'blue' | 'green';
  className?: string;
}

const colorClasses = {
  purple: 'text-purple-400',
  amber: 'text-amber-400',
  fuchsia: 'text-fuchsia-400',
  blue: 'text-blue-400',
  green: 'text-green-400',
};

export function AssessmentBreadcrumb({
  assessmentName,
  currentStep = 'instructions',
  currentQuestion,
  totalQuestions,
  colorScheme = 'purple',
  className,
}: AssessmentBreadcrumbProps) {
  const getStepLabel = () => {
    switch (currentStep) {
      case 'instructions':
        return 'Instructions';
      case 'questions':
        return currentQuestion !== undefined && totalQuestions
          ? `Question ${currentQuestion} of ${totalQuestions}`
          : 'Questions';
      case 'results':
        return 'Results';
      default:
        return '';
    }
  };

  return (
    <nav className={cn("flex items-center gap-2 text-sm flex-wrap mb-4", className)}>
      <Link
        to="/dashboard"
        className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
      >
        <Home className="w-4 h-4" />
        <span>Dashboard</span>
      </Link>
      
      <ChevronRight className="w-4 h-4 text-muted-foreground" />
      
      <span className={cn("font-medium", colorClasses[colorScheme])}>
        {assessmentName}
      </span>
      
      <ChevronRight className="w-4 h-4 text-muted-foreground" />
      
      <span className="text-foreground font-medium">
        {getStepLabel()}
      </span>
    </nav>
  );
}
