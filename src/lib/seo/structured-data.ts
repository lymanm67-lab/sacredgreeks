// Structured data generators for rich snippets (JSON-LD)

const BASE_URL = 'https://sacredgreekslife.com';
const ORG_NAME = 'Sacred Greeks Life';
const LOGO_URL = `${BASE_URL}/icon-512.png`;

export interface StructuredDataProps {
  type: 'WebApplication' | 'WebPage' | 'Article' | 'FAQPage' | 'AboutPage' | 'Organization' | 'BreadcrumbList';
  name?: string;
  description?: string;
  url?: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
  faqItems?: Array<{ question: string; answer: string }>;
  breadcrumbs?: Array<{ name: string; url: string }>;
}

// Organization schema (used site-wide)
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: ORG_NAME,
    url: BASE_URL,
    logo: LOGO_URL,
    description: 'Sacred Greeks Life helps Christians in Greek organizations navigate faith and fraternity/sorority life.',
    sameAs: [
      'https://www.facebook.com/sacredgreeks',
      'https://www.instagram.com/sacredgreeks',
      'https://twitter.com/sacredgreeks',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      url: `${BASE_URL}/ask-dr-lyman`,
    },
    founder: {
      '@type': 'Person',
      name: 'Dr. Lyman Montgomery',
      jobTitle: 'Founder',
    },
  };
}

// SoftwareApplication schema (for app store SEO)
export function generateSoftwareApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: ORG_NAME,
    url: BASE_URL,
    applicationCategory: 'LifestyleApplication',
    applicationSubCategory: 'ReligiousApp',
    operatingSystem: 'Web Browser (Chrome, Safari, Firefox, Edge)',
    browserRequirements: 'Requires JavaScript. Works on all modern browsers.',
    description: 'The #1 faith-based web app for Christians in Greek life. Daily devotionals, P.R.O.O.F. framework, prayer tools, Bible study, and community features. No download required - works instantly in your browser.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'Free forever with optional premium features',
      availability: 'https://schema.org/InStock',
    },
    featureList: [
      'Daily Devotionals for Greek Life',
      'P.R.O.O.F. Decision Framework',
      'Prayer Journal & Wall',
      'Community Prayer Support',
      'Bible Study Tools with AI',
      'Achievement & Progress Tracking',
      'D9 Business Directory',
      'Faith-Based Events Calendar',
      'Member Networking',
    ],
    screenshot: `${BASE_URL}/og-image.png`,
    image: `${BASE_URL}/og-image.png`,
    softwareVersion: '2.5.4',
    datePublished: '2024-01-01',
    downloadUrl: BASE_URL,
    installUrl: BASE_URL,
    permissions: 'No special permissions required',
    storageRequirements: 'Minimal - runs in browser',
    memoryRequirements: 'Minimal - runs in browser',
    author: {
      '@type': 'Organization',
      name: ORG_NAME,
    },
    creator: {
      '@type': 'Person',
      name: 'Dr. Lyman Montgomery',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '127',
      bestRating: '5',
      worstRating: '1',
    },
  };
}

// WebApplication schema (for the main app) - Alias for backward compatibility
export function generateWebApplicationSchema() {
  return generateSoftwareApplicationSchema();
}

// WebPage schema
export function generateWebPageSchema(props: StructuredDataProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: props.name || ORG_NAME,
    description: props.description,
    url: props.url || BASE_URL,
    isPartOf: {
      '@type': 'WebSite',
      name: ORG_NAME,
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: ORG_NAME,
      logo: {
        '@type': 'ImageObject',
        url: LOGO_URL,
      },
    },
  };
}

// Article schema (for devotionals, blog posts)
export function generateArticleSchema(props: StructuredDataProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: props.name,
    description: props.description,
    url: props.url,
    datePublished: props.datePublished || new Date().toISOString(),
    dateModified: props.dateModified || new Date().toISOString(),
    author: {
      '@type': 'Person',
      name: props.author || 'Dr. Lyman Montgomery',
    },
    publisher: {
      '@type': 'Organization',
      name: ORG_NAME,
      logo: {
        '@type': 'ImageObject',
        url: LOGO_URL,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': props.url,
    },
  };
}

// FAQ schema
export function generateFAQSchema(faqItems: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

// About page schema
export function generateAboutPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Sacred Greeks Life',
    description: 'Learn about Sacred Greeks Life and Dr. Lyman Montgomery. Our mission to help Christians navigate Greek life with faith.',
    url: `${BASE_URL}/about`,
    mainEntity: {
      '@type': 'Organization',
      name: ORG_NAME,
      founder: {
        '@type': 'Person',
        name: 'Dr. Lyman Montgomery',
        jobTitle: 'Author & Founder',
        description: 'Dr. Lyman Montgomery is the author of "Sacred, Not Sinful" and founder of Sacred Greeks Life.',
      },
    },
  };
}

// Breadcrumb schema
export function generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url.startsWith('http') ? crumb.url : `${BASE_URL}${crumb.url}`,
    })),
  };
}

// Main generator function
export function generateStructuredData(props: StructuredDataProps): object {
  switch (props.type) {
    case 'WebApplication':
      return generateWebApplicationSchema();
    case 'WebPage':
      return generateWebPageSchema(props);
    case 'Article':
      return generateArticleSchema(props);
    case 'FAQPage':
      return props.faqItems ? generateFAQSchema(props.faqItems) : generateWebPageSchema(props);
    case 'AboutPage':
      return generateAboutPageSchema();
    case 'Organization':
      return generateOrganizationSchema();
    case 'BreadcrumbList':
      return props.breadcrumbs ? generateBreadcrumbSchema(props.breadcrumbs) : {};
    default:
      return generateWebPageSchema(props);
  }
}
