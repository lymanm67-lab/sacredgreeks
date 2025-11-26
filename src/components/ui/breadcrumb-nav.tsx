import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  category?: 'daily-spiritual' | 'community' | 'personal-growth';
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
}

const categoryColors = {
  'daily-spiritual': 'text-blue-600',
  'community': 'text-purple-600',
  'personal-growth': 'text-rose-600',
};

export function BreadcrumbNav({ items }: BreadcrumbNavProps) {
  return (
    <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6 flex-wrap">
      <Link 
        to="/dashboard" 
        className="hover:text-foreground transition-colors flex items-center gap-1"
      >
        <Home className="w-4 h-4" />
        <span>Dashboard</span>
      </Link>
      
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const colorClass = item.category ? categoryColors[item.category] : '';
        
        return (
          <div key={index} className="flex items-center gap-2">
            <ChevronRight className="w-4 h-4" />
            {item.href && !isLast ? (
              <Link 
                to={item.href} 
                className={`hover:text-foreground transition-colors ${colorClass}`}
              >
                {item.label}
              </Link>
            ) : (
              <span className={`${isLast ? 'font-medium text-foreground' : ''} ${colorClass}`}>
                {item.label}
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
}
