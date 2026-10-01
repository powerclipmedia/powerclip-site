import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'PowerClip',
    short_name: 'PowerClip',
    description: 'Brand growth, distribution, and operations.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0b0a09',
    theme_color: '#0b0a09',
    icons: [{ src: '/powerclip-mark-white.png?v=20260912', sizes: '512x512', type: 'image/png' }],
  };
}
