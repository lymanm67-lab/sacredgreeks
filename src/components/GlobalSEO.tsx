import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SEOHead } from './SEOHead';

/**
 * GlobalSEO component that automatically handles SEO for all pages
 * Uses the route registry to provide automatic meta tags and structured data
 */
export function GlobalSEO() {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // SEOHead now automatically uses route registry for page-specific SEO
  return <SEOHead />;
}

/**
 * Hook for pages to override default SEO
 */
export function usePageSEO(options: {
  title?: string;
  description?: string;
  keywords?: string;
  noindex?: boolean;
}) {
  useEffect(() => {
    if (options.title) {
      document.title = options.title.includes('Sacred Greeks') 
        ? options.title 
        : `${options.title} | Sacred Greeks Life`;
    }
    
    if (options.description) {
      const meta = document.querySelector('meta[name="description"]');
      if (meta) {
        meta.setAttribute('content', options.description);
      }
    }

    if (options.noindex) {
      const robots = document.querySelector('meta[name="robots"]');
      if (robots) {
        robots.setAttribute('content', 'noindex, nofollow');
      }
    }
  }, [options.title, options.description, options.keywords, options.noindex]);
}
