// Auto-generate sitemap from routes
// This runs at build time or can be triggered manually

export interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

// Define all routes with their SEO properties
export const siteRoutes: SitemapEntry[] = [
  // High priority - main pages
  { loc: '/', lastmod: new Date().toISOString().split('T')[0], changefreq: 'weekly', priority: 1.0 },
  { loc: '/auth', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.8 },
  { loc: '/dashboard', lastmod: new Date().toISOString().split('T')[0], changefreq: 'weekly', priority: 0.9 },
  { loc: '/guide', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.9 },
  { loc: '/user-guide', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.8 },
  
  // Daily content
  { loc: '/devotional', lastmod: new Date().toISOString().split('T')[0], changefreq: 'daily', priority: 0.9 },
  { loc: '/prayer-wall', lastmod: new Date().toISOString().split('T')[0], changefreq: 'daily', priority: 0.8 },
  { loc: '/forum', lastmod: new Date().toISOString().split('T')[0], changefreq: 'daily', priority: 0.8 },
  
  // Weekly updated content
  { loc: '/prayer-journal', lastmod: new Date().toISOString().split('T')[0], changefreq: 'weekly', priority: 0.8 },
  { loc: '/prayer-guide', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.8 },
  { loc: '/bible-study', lastmod: new Date().toISOString().split('T')[0], changefreq: 'weekly', priority: 0.8 },
  { loc: '/study', lastmod: new Date().toISOString().split('T')[0], changefreq: 'weekly', priority: 0.8 },
  { loc: '/resources', lastmod: new Date().toISOString().split('T')[0], changefreq: 'weekly', priority: 0.8 },
  { loc: '/articles', lastmod: new Date().toISOString().split('T')[0], changefreq: 'weekly', priority: 0.7 },
  { loc: '/video-library', lastmod: new Date().toISOString().split('T')[0], changefreq: 'weekly', priority: 0.7 },
  { loc: '/achievements', lastmod: new Date().toISOString().split('T')[0], changefreq: 'weekly', priority: 0.7 },
  { loc: '/progress', lastmod: new Date().toISOString().split('T')[0], changefreq: 'weekly', priority: 0.7 },
  { loc: '/journey', lastmod: new Date().toISOString().split('T')[0], changefreq: 'weekly', priority: 0.8 },
  { loc: '/service-tracker', lastmod: new Date().toISOString().split('T')[0], changefreq: 'weekly', priority: 0.7 },
  { loc: '/changelog', lastmod: new Date().toISOString().split('T')[0], changefreq: 'weekly', priority: 0.6 },
  { loc: '/podcast', lastmod: new Date().toISOString().split('T')[0], changefreq: 'weekly', priority: 0.7 },
  { loc: '/did-you-know', lastmod: new Date().toISOString().split('T')[0], changefreq: 'weekly', priority: 0.6 },
  
  // Community
  { loc: '/community', lastmod: new Date().toISOString().split('T')[0], changefreq: 'daily', priority: 0.7 },
  
  // Profile & settings
  { loc: '/profile', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.6 },
  { loc: '/bookmarks', lastmod: new Date().toISOString().split('T')[0], changefreq: 'weekly', priority: 0.6 },
  
  // Tools & guides
  { loc: '/symbol-guide', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.7 },
  { loc: '/myth-buster', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.7 },
  { loc: '/ask-dr-lyman', lastmod: new Date().toISOString().split('T')[0], changefreq: 'weekly', priority: 0.8 },
  { loc: '/content-hub', lastmod: new Date().toISOString().split('T')[0], changefreq: 'weekly', priority: 0.7 },
  { loc: '/shattered-masks', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.7 },
  
  // Subscription & signup
  { loc: '/subscription', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.7 },
  { loc: '/beta-signup', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.7 },
  { loc: '/install', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.7 },
  
  // Static pages
  { loc: '/about', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.7 },
  { loc: '/faq', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.7 },
  { loc: '/podcast-appearances', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.6 },
  { loc: '/qr-code', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.5 },
  
  // Legal
  { loc: '/privacy', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.5 },
  { loc: '/terms', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.5 },
  { loc: '/legal', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.4 },
];

const BASE_URL = 'https://sacredgreekslife.com';

export function generateSitemapXML(): string {
  const urls = siteRoutes.map(route => `  <url>
    <loc>${BASE_URL}${route.loc}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

// Function to get route metadata for SEO
export function getRouteMetadata(path: string): SitemapEntry | undefined {
  return siteRoutes.find(route => route.loc === path);
}

// Export count for tracking
export function getTotalRoutes(): number {
  return siteRoutes.length;
}
