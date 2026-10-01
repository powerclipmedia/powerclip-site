import type { Metadata } from 'next';

export const siteUrl = 'https://powerclip.app';
export const ogImage = '/og-image.svg?v=20260912';
export const homeTitle = 'PowerClip - Brand Growth x Distribution x Operations';
export const homeDescription = 'PowerClip brings website design, SEO, content distribution, and CRM automation into one connected growth system, scoped for the work your business needs next.';
export const homeKeywords = [
  'clipping agency',
  'clipping campaign',
  'short form video distribution',
  'pay per view clipping',
  'verified views',
  'TikTok clipping service',
  'brand growth',
  'website design',
  'SEO',
  'local search',
  'reputation management',
  'CRM workflows',
  'CRM automation',
  'operations reporting',
];

const routeCopy = {
  '/grow': {
    title: 'Brand Growth — Websites, SEO & Reputation',
    description: 'Start with the right growth work for your business: website strategy, SEO, reputation, distribution, CRM, workflows, or reporting, scoped around your next move.',
  },
  '/get-found': {
    title: 'Get Found — Website Design & SEO',
    description: 'Build a web presence people can find and trust with website design, SEO, local search, reputation, and practical visibility work for your business today.',
  },
  '/website-seo': {
    title: 'Website + SEO — PowerClip Brand Growth',
    description: 'Build a clearer website and stronger search foundations with mobile-first development, technical SEO, local search, and a practical launch handoff.',
  },
  '/ranking-reviews': {
    title: 'Ranking + Reviews — PowerClip Brand Growth',
    description: 'Make your business easier to find and trust with local search, ranking improvements, and a practical review-management system scoped to your market.',
  },
  '/brands': {
    title: 'Distribution — Clipping Campaigns & Paid Reach',
    description: 'Put your content in motion with creator-led clipping campaigns and paid distribution across TikTok, Instagram Reels, YouTube Shorts, and X, with reporting.',
  },
  '/brand-campaigns': {
    title: 'Brand Campaigns — PowerClip Distribution',
    description: 'Turn source content into creator-led short-form distribution with a clear brief, platform-native output, and reporting around verified views.',
  },
  '/paid-ads': {
    title: 'Paid Ads — PowerClip Distribution',
    description: 'Use paid distribution for deliberate targeting, controlled pacing, and clear measurement, scoped separately from creator-led clipping campaigns.',
  },
  '/automations': {
    title: 'Automations — PowerClip Operations',
    description: 'Connect repeatable follow-ups, handoffs, and reporting workflows so growth work is easier to run and maintain.',
  },
  '/operations': {
    title: 'Operations — CRM, Workflows & Reporting',
    description: 'Make growth repeatable with practical CRM setup, workflow automation, dashboards, reporting, integrations, and systems implementation from PowerClip for teams.',
  },
  '/clippers': {
    title: 'For Clippers — Get Paid Per Verified View',
    description: 'Join PowerClip as an independent clipper, turn source content into native short-form posts, and earn per 1,000 verified views across supported platforms.',
  },
  '/start-campaign': {
    title: 'Start a Campaign — PowerClip Distribution',
    description: 'Start a PowerClip campaign with your content, goal, budget, and audience. We will review fit and shape a clear clipping brief around your next move with us.',
  },
  '/contact': {
    title: 'Contact PowerClip',
    description: 'Contact PowerClip about brand growth, distribution, operations, clipping campaigns, partnerships, or a practical question about your next move and scope.',
  },
  '/privacy-policy': {
    title: 'Privacy Policy',
    description: 'Read how PowerClip handles website form submissions, privacy choices, and the limited information needed to respond to your enquiry.',
  },
} as const;

export function routeMetadata(path: keyof typeof routeCopy): Metadata {
  const copy = routeCopy[path];
  const url = `${siteUrl}${path}`;
  return {
    title: copy.title,
    description: copy.description,
    keywords: homeKeywords,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      url,
      siteName: 'PowerClip',
      title: copy.title,
      description: copy.description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: 'PowerClip — Reach. Engineered.' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: copy.title,
      description: copy.description,
      images: [ogImage],
    },
  };
}
