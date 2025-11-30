import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
  noindex?: boolean;
}

const defaultMeta = {
  title: 'Sacred Greeks Life App - Daily Devotionals & Faith Guidance',
  description: 'Your daily companion for navigating faith and Greek life. Get devotionals, biblical guidance, prayer tools, and progress tracking grounded in the P.R.O.O.F. framework.',
  keywords: 'Sacred Greeks, Greek life, Christian fraternity, Christian sorority, BGLO, Divine Nine, faith and Greek life',
  image: 'https://sacredgreekslife.com/icon-512.png',
  baseUrl: 'https://sacredgreekslife.com'
};

export function SEOHead({ 
  title, 
  description, 
  keywords,
  image,
  type = 'website',
  noindex = false
}: SEOHeadProps) {
  const location = useLocation();
  
  const fullTitle = title 
    ? `${title} | Sacred Greeks Life` 
    : defaultMeta.title;
  
  const fullDescription = description || defaultMeta.description;
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

    // Update standard meta tags
    updateMeta('description', fullDescription);
    if (keywords) {
      updateMeta('keywords', `${keywords}, ${defaultMeta.keywords}`);
    }
    updateMeta('robots', noindex ? 'noindex, nofollow' : 'index, follow');

    // Update Open Graph tags
    updateMeta('og:title', fullTitle, true);
    updateMeta('og:description', fullDescription, true);
    updateMeta('og:image', fullImage, true);
    updateMeta('og:url', canonicalUrl, true);
    updateMeta('og:type', type, true);

    // Update Twitter tags
    updateMeta('twitter:title', fullTitle);
    updateMeta('twitter:description', fullDescription);
    updateMeta('twitter:image', fullImage);

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    // Cleanup function to reset to defaults when component unmounts
    return () => {
      document.title = defaultMeta.title;
    };
  }, [fullTitle, fullDescription, fullImage, canonicalUrl, keywords, type, noindex]);

  return null;
}

// Page-specific SEO configurations
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
