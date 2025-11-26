import { useEffect } from 'react';

interface CertificateMetaData {
  assessmentType: string;
  scenario: string;
  userName?: string;
}

export const useCertificateMeta = (data: CertificateMetaData | null) => {
  useEffect(() => {
    if (!data) return;

    const title = `${data.userName || 'I'} completed the Sacred Greeks Decision Guide! 🎓`;
    const description = `Assessment: ${data.assessmentType} - ${data.scenario}. Join me in this journey of faith and Greek life.`;
    
    // Update page title
    document.title = title;
    
    // Update or create meta tags
    const updateMetaTag = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    const updateNameTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Update Open Graph tags
    updateMetaTag('og:title', title);
    updateMetaTag('og:description', description);
    updateMetaTag('og:type', 'article');
    
    // Update Twitter tags
    updateNameTag('twitter:title', title);
    updateNameTag('twitter:description', description);
    updateNameTag('twitter:card', 'summary_large_image');

    // Cleanup on unmount - restore defaults
    return () => {
      document.title = 'Sacred Greeks Life App - Daily Devotionals & Faith Guidance';
      updateMetaTag('og:title', 'Sacred Greeks Life App - Daily Devotionals & Faith Guidance');
      updateMetaTag('og:description', 'Your daily companion for navigating faith and Greek life.');
      updateMetaTag('og:type', 'website');
    };
  }, [data]);
};
