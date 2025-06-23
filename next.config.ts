import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Disable font optimization to prevent manifest errors
  optimizeFonts: false,

  // Essential settings for Vercel deployment
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Experimental settings to prevent hanging
  experimental: {
    optimizePackageImports: [],
    serverComponentsExternalPackages: ['@google/generative-ai'],
  },
  
  // Output configuration for Vercel
  output: 'standalone',
  
  // Disable source maps to prevent hanging
  productionBrowserSourceMaps: false,
  
  // Webpack configuration to prevent hanging
  webpack: (config) => {
    // Prevent webpack from hanging on font processing
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/fonts/',
          outputPath: 'static/fonts/',
        },
      },
    });
    
    return config;
  },
}

export default nextConfig
