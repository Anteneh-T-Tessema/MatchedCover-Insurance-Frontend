/**
 * Next.js Internationalization Configuration
 * Enables automatic locale detection and routing
 */

import { locales, defaultLocale } from './config';

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales,
    defaultLocale,
    localeDetection: true,
  },
};

export default nextConfig;
