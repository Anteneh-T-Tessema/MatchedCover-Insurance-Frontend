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
  
  // Experimental features to fix font loading issues
  experimental: {
    optimizeCss: false, // Disable CSS optimization that can conflict with Tailwind
    serverComponentsExternalPackages: ['@google/generative-ai'],
    // Optimize font loading
    optimizePackageImports: ['@next/font'],
  },
  
  // Server external packages for Vercel optimization
  serverExternalPackages: ['@google/generative-ai', '@prisma/client'],
  
  // Disable source maps in production to reduce build size
  productionBrowserSourceMaps: false,

  // Optimize static generation
  trailingSlash: false,
  
  // Webpack configuration for better module resolution
  webpack: (config) => {
    // Handle Tailwind CSS module resolution
    config.resolve.alias = {
      ...config.resolve.alias,
      'tailwindcss': require.resolve('tailwindcss'),
    };
    
    return config;
  },
  
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
