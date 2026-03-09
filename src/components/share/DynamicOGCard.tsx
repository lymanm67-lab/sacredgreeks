import { useEffect } from 'react';

interface OGMetaProps {
  title: string;
  description: string;
  imageUrl?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
}

/**
 * Dynamically updates Open Graph meta tags for social sharing.
 * Use this component on any page that needs custom share previews.
 */
export function DynamicOGMeta({ title, description, imageUrl, url, type = 'website' }: OGMetaProps) {
  useEffect(() => {
    const fullTitle = `${title} | Sacred Greeks`;
    const shareUrl = url || window.location.href;
    const defaultImage = '/og-default.png';
    const image = imageUrl || defaultImage;

    // Update document title
    document.title = fullTitle;

    // Helper to set/create meta tag
    const setMeta = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    const setNameMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Open Graph tags
    setMeta('og:title', fullTitle);
    setMeta('og:description', description);
    setMeta('og:image', image);
    setMeta('og:url', shareUrl);
    setMeta('og:type', type);
    setMeta('og:site_name', 'Sacred Greeks');

    // Twitter Card tags
    setNameMeta('twitter:card', 'summary_large_image');
    setNameMeta('twitter:title', fullTitle);
    setNameMeta('twitter:description', description);
    setNameMeta('twitter:image', image);

    // Standard meta description
    setNameMeta('description', description);

    return () => {
      // Cleanup: restore default title
      document.title = 'Sacred Greeks | Faith & Greek Life';
    };
  }, [title, description, imageUrl, url, type]);

  return null;
}

/**
 * Generate a share URL with UTM params for tracking viral growth
 */
export function generateShareUrl(path: string, params?: {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  ref?: string;
}): string {
  const base = `${window.location.origin}${path}`;
  const searchParams = new URLSearchParams();
  
  if (params?.utm_source) searchParams.set('utm_source', params.utm_source);
  if (params?.utm_medium) searchParams.set('utm_medium', params.utm_medium);
  if (params?.utm_campaign) searchParams.set('utm_campaign', params.utm_campaign);
  if (params?.ref) searchParams.set('ref', params.ref);
  
  const query = searchParams.toString();
  return query ? `${base}?${query}` : base;
}
