import type { NextConfig } from 'next';
import { REDIRECTS } from './redirects.mjs';

// STATIC_EXPORT=1 builds plain files for cPanel hosting (scripts/build-cpanel.mjs): no Node server, so no image
// optimiser and no redirects here — those go into the generated .htaccess instead.
const STATIC = process.env.STATIC_EXPORT === '1';

const config: NextConfig = STATIC
  ? {
      output: 'export',
      poweredByHeader: false,
      // pre-sized WebP copies made by scripts/build-cpanel.mjs (widths must match IMG_WIDTHS in src/lib/image-loader.ts)
      images: { loader: 'custom', loaderFile: './src/lib/image-loader.ts', deviceSizes: [640, 960, 1440, 1920], imageSizes: [96, 200, 384] },
      experimental: { cpus: Number(process.env.BUILD_CPUS) || undefined },
    }
  : {
      poweredByHeader: false,
      // BUILD_CPUS limits build workers on low-memory machines; unset (as on Vercel) Next picks its default
      experimental: { cpus: Number(process.env.BUILD_CPUS) || undefined },
      images: {
        formats: ['image/avif', 'image/webp'],
        qualities: [60, 75, 82],
        deviceSizes: [480, 768, 1024, 1440, 1920, 2400],
      },
      async redirects() {
        return REDIRECTS;
      },
    };

export default config;
