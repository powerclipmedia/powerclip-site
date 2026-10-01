import type { MetadataRoute } from 'next';
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://powerclip.app';
  return ['', '/grow', '/brands', '/operations', '/get-found', '/website-seo', '/ranking-reviews', '/brand-campaigns', '/paid-ads', '/automations', '/clippers', '/contact', '/start-campaign', '/privacy-policy'].map((path) => ({ url: `${base}${path}`, lastModified: new Date(), changeFrequency: path === '' ? 'weekly' : 'monthly', priority: path === '' ? 1 : 0.7 }));
}
