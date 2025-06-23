import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Essential settings for Vercel deployment
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Experimental features - completely disable optimizations
  experimental: {
    optimizeCss: false,
    optimizeServerReact: false,
    serverComponentsExternalPackages: [],
  },
  
  // Server external packages for Vercel optimization
  serverExternalPackages: [
    '@google/generative-ai',
    '@prisma/client',
    'tailwindcss',
    'postcss',
    'autoprefixer'
  ],
  
  // Disable all optimizations that could interfere
  productionBrowserSourceMaps: false,
  optimizeFonts: false,
  
  // Output configuration for Vercel
  output: 'standalone',
  trailingSlash: false,
  
  // Aggressive webpack configuration to prevent font processing
  webpack: (config, { dev }) => {
    // Completely disable Next.js font processing
    if (config.plugins) {
      config.plugins = config.plugins.filter((plugin: { constructor: { name: string } }) => {
        return plugin.constructor.name !== 'NextFontManifestPlugin';
      });
    }

    // Add rules to ignore font imports
    config.module.rules.push({
      test: /next\/font/,
      use: 'null-loader'
    });

    // Resolve fallbacks
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: false,
    };

    // Ignore specific modules that cause issues
    config.externals = config.externals || [];
    if (Array.isArray(config.externals)) {
      config.externals.push({
        'next/font/google': 'commonjs next/font/google',
        'next/font/local': 'commonjs next/font/local',
      });
    }

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

    return config;
  },
  
  // Environment variables to disable font processing
  env: {
    NEXT_TELEMETRY_DISABLED: '1',
    SKIP_FONT_OPTIMIZATION: '1',
    DISABLE_NEXT_FONT: '1',
    NEXT_FONT_DISABLED: '1',
  },
}

export default nextConfig
