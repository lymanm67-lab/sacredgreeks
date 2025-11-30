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

// WebApplication schema (for the main app)
export function generateWebApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: ORG_NAME,
    url: BASE_URL,
    applicationCategory: 'ReligiousApp',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript',
    description: 'Your daily companion for navigating faith and Greek life. Get devotionals, biblical guidance, prayer tools, and progress tracking.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'Free with premium features available',
    },
    featureList: [
      'Daily Devotionals',
      'Prayer Journal',
      'Community Prayer Wall',
      'Bible Study Tools',
      'Achievement System',
      'Progress Tracking',
    ],
    screenshot: `${BASE_URL}/icon-512.png`,
    softwareVersion: '1.4.0',
    author: {
      '@type': 'Organization',
      name: ORG_NAME,
    },
  };
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
