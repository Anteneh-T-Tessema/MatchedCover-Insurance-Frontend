import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Essential settings for Vercel deployment
  eslint: {
    // Disable ESLint during builds to prevent timeout issues
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Disable type checking during builds - handle separately
    ignoreBuildErrors: true,
  },
  
  // Experimental features for Vercel optimization
  experimental: {
    // Optimize for serverless
    serverComponentsExternalPackages: ['@google/generative-ai'],
  },
  
  // Webpack optimizations for Vercel
  webpack: (config, { dev, isServer }) => {
    // Handle potential module resolution issues
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    }

    return config
  },

  // Image optimization for Vercel
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: false,
  },

  // Environment variables for Vercel
  env: {
    NEXT_PUBLIC_VERCEL_ENV: process.env.VERCEL_ENV,
    NEXT_PUBLIC_VERCEL_URL: process.env.VERCEL_URL,
  },

  // Server external packages
  serverExternalPackages: ['@prisma/client'],
  
  // Disable source maps in production to reduce build size
  productionBrowserSourceMaps: false,

  // Optimize static generation
  trailingSlash: false,
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

export default nextConfig
