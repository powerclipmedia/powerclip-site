import type { Metadata } from 'next';
import { Bricolage_Grotesque, Inter } from 'next/font/google';
import './globals.css';
import './logo-fix.css';
import './new-site.css';
import './mobile-hero.css';
import './dashboard-tabs.css';
import { CookieConsent } from './components/cookie-consent';
import { homeDescription, homeKeywords, homeTitle, ogImage, siteUrl } from './seo';

const logoUrl = '/powerclip-mark-white.png?v=20260912';
const faviconUrl = '/favicon-32x32.png?v=20260912';
const appleTouchIconUrl = '/apple-touch-icon.png?v=20260912';

const headingFont = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-heading',
  display: 'swap',
});

const bodyFont = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: homeTitle, template: '%s | PowerClip' },
  description: homeDescription,
  applicationName: 'PowerClip',
  keywords: homeKeywords,
  alternates: { canonical: '/' },
  icons: {
    icon: [
      { url: faviconUrl, sizes: '32x32', type: 'image/png' },
      { url: logoUrl, sizes: '512x512', type: 'image/png' },
    ],
    apple: { url: appleTouchIconUrl, sizes: '180x180', type: 'image/png' },
  },
  openGraph: { type: 'website', url: siteUrl, siteName: 'PowerClip', title: homeTitle, description: homeDescription, images: [{ url: ogImage, width: 1200, height: 630, alt: 'PowerClip — Reach. Engineered.' }] },
  twitter: { card: 'summary_large_image', title: homeTitle, description: homeDescription, images: [ogImage] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'PowerClip',
    url: siteUrl,
    logo: `${siteUrl}${logoUrl}`,
    description: homeDescription,
    knowsAbout: ['Brand Growth', 'Distribution', 'Operations', 'website development', 'SEO and local search', 'reputation management', 'creator-led short-form distribution', 'paid distribution', 'CRM and workflow systems', 'reporting and dashboards'],
  };
  return <html lang="en" className={`${headingFont.variable} ${bodyFont.variable}`}><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} /><CookieConsent /></body></html>;
}
