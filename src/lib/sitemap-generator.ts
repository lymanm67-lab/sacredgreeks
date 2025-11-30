// Dynamic sitemap generator using route registry
// Automatically generates sitemap from registered routes

import { routeRegistry, getPublicRoutes, type RouteConfig } from './seo/route-registry';

export interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

const BASE_URL = 'https://sacredgreekslife.com';

// Convert route registry to sitemap entries
function routeToSitemapEntry(route: RouteConfig): SitemapEntry {
  return {
    loc: route.path,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: route.changefreq,
    priority: route.priority,
  };
}

// Get all sitemap entries (excludes noindex pages)
export function getSitemapEntries(): SitemapEntry[] {
  return getPublicRoutes().map(routeToSitemapEntry);
}

// Legacy export for backward compatibility
export const siteRoutes: SitemapEntry[] = getSitemapEntries();

// Generate XML sitemap
export function generateSitemapXML(): string {
  const entries = getSitemapEntries();
  
  const urls = entries.map(entry => `  <url>
    <loc>${BASE_URL}${entry.loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls}
</urlset>`;
}

// Generate sitemap index for large sites
export function generateSitemapIndex(sitemapUrls: string[]): string {
  const sitemaps = sitemapUrls.map(url => `  <sitemap>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps}
</sitemapindex>`;
}

// Function to get route metadata for SEO
export function getRouteMetadata(path: string): SitemapEntry | undefined {
  const entry = getSitemapEntries().find(entry => entry.loc === path);
  return entry;
}

// Export count for tracking
export function getTotalRoutes(): number {
  return routeRegistry.length;
}

// Get public route count
export function getPublicRouteCount(): number {
  return getPublicRoutes().length;
}

// Generate robots.txt content
export function generateRobotsTxt(): string {
  return `# Robots.txt for Sacred Greeks Life
User-agent: *
Allow: /
Disallow: /admin
Disallow: /profile
Disallow: /assessment-history
Disallow: /offline-settings
Disallow: /notification-preferences
Disallow: /analytics
Disallow: /beta-dashboard
Disallow: /beta-checklist
Disallow: /reset-password

# Sitemap
Sitemap: ${BASE_URL}/sitemap.xml

# Crawl-delay (optional, for politeness)
Crawl-delay: 1
`;
}

// Utility to check for missing routes
export function findMissingRoutes(appRoutes: string[]): string[] {
  const registeredPaths = new Set(routeRegistry.map(r => r.path));
  return appRoutes.filter(route => !registeredPaths.has(route) && !route.includes(':'));
}

// Console utility to print sitemap status
export function printSitemapStatus(): void {
  const total = getTotalRoutes();
  const publicCount = getPublicRouteCount();
  const noindexCount = total - publicCount;
  
  console.log(`📍 Sitemap Status:
  Total routes: ${total}
  Public (indexed): ${publicCount}
  Private (noindex): ${noindexCount}
  `);
}
