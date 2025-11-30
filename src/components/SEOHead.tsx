import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getRouteConfig } from '@/lib/seo/route-registry';
import { generateStructuredData, generateOrganizationSchema, generateBreadcrumbSchema } from '@/lib/seo/structured-data';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
  noindex?: boolean;
  structuredDataType?: 'WebPage' | 'Article' | 'FAQPage' | 'AboutPage' | 'Organization' | 'WebApplication';
  faqItems?: Array<{ question: string; answer: string }>;
  breadcrumbs?: Array<{ name: string; url: string }>;
  datePublished?: string;
  dateModified?: string;
  author?: string;
}

const defaultMeta = {
  title: 'Sacred Greeks Life App - Daily Devotionals & Faith Guidance',
  description: 'Your daily companion for navigating faith and Greek life. Get devotionals, biblical guidance, prayer tools, and progress tracking grounded in the P.R.O.O.F. framework.',
  keywords: 'Sacred Greeks, Greek life, Christian fraternity, Christian sorority, BGLO, Divine Nine, faith and Greek life, daily devotional',
  image: 'https://sacredgreekslife.com/icon-512.png',
  baseUrl: 'https://sacredgreekslife.com'
};

export function SEOHead({ 
  title, 
  description, 
  keywords,
  image,
  type = 'website',
  noindex = false,
  structuredDataType,
  faqItems,
  breadcrumbs,
  datePublished,
  dateModified,
  author,
}: SEOHeadProps) {
  const location = useLocation();
  
  // Get route config for automatic SEO
  const routeConfig = getRouteConfig(location.pathname);
  
  // Use props > route config > defaults
  const pageTitle = title || routeConfig?.title;
  const pageDescription = description || routeConfig?.description || defaultMeta.description;
  const pageKeywords = keywords || routeConfig?.keywords;
  const pageNoindex = noindex || routeConfig?.noindex || false;
  const dataType = structuredDataType || routeConfig?.structuredDataType;
  
  const fullTitle = pageTitle 
    ? pageTitle.includes('Sacred Greeks') ? pageTitle : `${pageTitle} | Sacred Greeks Life`
    : defaultMeta.title;
  
  const fullImage = image || defaultMeta.image;
  const canonicalUrl = `${defaultMeta.baseUrl}${location.pathname}`;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Helper to update or create meta tag
    const updateMeta = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper to add/update JSON-LD structured data
    const updateStructuredData = (id: string, data: object) => {
      let script = document.querySelector(`script[data-schema="${id}"]`) as HTMLScriptElement;
      
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-schema', id);
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(data);
    };

    // Update standard meta tags
    updateMeta('description', pageDescription);
    if (pageKeywords) {
      updateMeta('keywords', `${pageKeywords}, ${defaultMeta.keywords}`);
    } else {
      updateMeta('keywords', defaultMeta.keywords);
    }
    updateMeta('robots', pageNoindex ? 'noindex, nofollow' : 'index, follow');
    updateMeta('author', 'Sacred Greeks Life');
    updateMeta('viewport', 'width=device-width, initial-scale=1, maximum-scale=5');

    // Update Open Graph tags
    updateMeta('og:title', fullTitle, true);
    updateMeta('og:description', pageDescription, true);
    updateMeta('og:image', fullImage, true);
    updateMeta('og:url', canonicalUrl, true);
    updateMeta('og:type', type, true);
    updateMeta('og:site_name', 'Sacred Greeks Life', true);
    updateMeta('og:locale', 'en_US', true);

    // Update Twitter tags
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', fullTitle);
    updateMeta('twitter:description', pageDescription);
    updateMeta('twitter:image', fullImage);
    updateMeta('twitter:site', '@sacredgreeks');

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    // Add Organization structured data (global)
    updateStructuredData('organization', generateOrganizationSchema());

    // Add page-specific structured data
    if (dataType) {
      const structuredData = generateStructuredData({
        type: dataType,
        name: pageTitle,
        description: pageDescription,
        url: canonicalUrl,
        faqItems,
        datePublished,
        dateModified,
        author,
      });
      updateStructuredData('page', structuredData);
    }

    // Add breadcrumb structured data
    if (breadcrumbs && breadcrumbs.length > 0) {
      updateStructuredData('breadcrumbs', generateBreadcrumbSchema(breadcrumbs));
    } else if (location.pathname !== '/') {
      // Auto-generate breadcrumbs
      const autoBreadcrumbs = [
        { name: 'Home', url: '/' },
        { name: pageTitle || 'Page', url: location.pathname }
      ];
      updateStructuredData('breadcrumbs', generateBreadcrumbSchema(autoBreadcrumbs));
    }

    // Cleanup function
    return () => {
      document.title = defaultMeta.title;
    };
  }, [fullTitle, pageDescription, fullImage, canonicalUrl, pageKeywords, type, pageNoindex, dataType, faqItems, breadcrumbs, datePublished, dateModified, author, location.pathname, pageTitle]);

  return null;
}

// Export page SEO configs for backward compatibility
export const pageSEO = {
  dashboard: {
    title: 'Dashboard',
    description: 'Your personal Sacred Greeks dashboard. Track spiritual growth, access devotionals, and manage your faith journey.',
  },
  devotional: {
    title: 'Daily Devotionals',
    description: 'Daily devotionals for Christians in Greek life. Scripture-based reflections to strengthen your faith.',
    keywords: 'daily devotional, Christian devotional, Greek life devotional',
  },
  prayerJournal: {
    title: 'Prayer Journal',
    description: 'Record and track your prayers. Organize by categories, mark answered prayers, and grow in your prayer life.',
    keywords: 'prayer journal, prayer tracker, Christian prayer app',
  },
  prayerWall: {
    title: 'Prayer Wall',
    description: 'Community prayer support for Christians in Greek life. Share requests, pray for others, and celebrate answered prayers.',
    keywords: 'prayer wall, prayer community, prayer requests',
  },
  bibleStudy: {
    title: 'Bible Study',
    description: 'AI-powered Bible study tools. Search scriptures, save verses, and deepen your understanding of God\'s Word.',
    keywords: 'Bible study, scripture search, Bible app',
  },
  forum: {
    title: 'Community Forum',
    description: 'Connect with other Christians in Greek life. Discuss faith, share experiences, and support one another.',
    keywords: 'Christian forum, Greek life community, faith discussion',
  },
  achievements: {
    title: 'Achievements',
    description: 'Track your spiritual growth milestones. Earn badges for devotional completion, prayers, and community engagement.',
    keywords: 'achievements, spiritual growth, faith milestones',
  },
  changelog: {
    title: 'Changelog',
    description: 'See what\'s new in Sacred Greeks Life. Latest updates, features, and improvements.',
    keywords: 'changelog, updates, new features',
  },
  resources: {
    title: 'Resources',
    description: 'Faith resources for Christians in Greek life. Articles, guides, and tools for spiritual growth.',
    keywords: 'Christian resources, Greek life resources, faith guides',
  },
  about: {
    title: 'About',
    description: 'Learn about Sacred Greeks Life and Dr. Lyman Montgomery. Our mission to help Christians navigate Greek life.',
    keywords: 'about Sacred Greeks, Dr. Lyman Montgomery',
  },
  faq: {
    title: 'FAQ',
    description: 'Frequently asked questions about Sacred Greeks Life. Get answers about features, Greek life, and faith.',
    keywords: 'FAQ, frequently asked questions, help',
  },
};
