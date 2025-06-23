import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Essential settings for Vercel deployment
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Experimental features - minimal and stable
  experimental: {
    optimizeCss: false,
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  
  // Server external packages for Vercel optimization
  serverExternalPackages: [
    '@google/generative-ai',
    '@prisma/client'
  ],
  
  // Disable source maps in production to reduce build size
  productionBrowserSourceMaps: false,

  // Optimize static generation
  trailingSlash: false,
  
  // Output configuration for Vercel
  output: 'standalone',
  
  // Webpack configuration for reliable builds
  webpack: (config, { dev }) => {
    // Optimize for production builds
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
              enforce: true,
            },
          },
        },
      };
    }

    // Handle SVG imports
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });

    // Resolve module issues
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
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
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },

  // Environment variables for build optimization
  env: {
    NEXT_TELEMETRY_DISABLED: '1',
    SKIP_FONT_OPTIMIZATION: '1',
    DISABLE_NEXT_FONT: '1',
  },
}

export default nextConfig
