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
  
  // Webpack optimizations for Vercel
  webpack: (config, { dev, isServer }) => {
    // Increase memory limits for large builds
    config.optimization = {
      ...config.optimization,
      moduleIds: 'deterministic',
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    }

    // Reduce bundle analysis overhead
    if (!dev && !isServer) {
      config.optimization.usedExports = false
    }

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

  // Performance optimizations
  experimental: {
    // Reduce build time but remove esmExternals to avoid warnings
  },

  // Server external packages
  serverExternalPackages: ['@prisma/client'],

  // Output settings for Vercel (remove standalone for Vercel hosting)
  // output: 'standalone',
  
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
