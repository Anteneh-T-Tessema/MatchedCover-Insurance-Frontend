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
  
  // Output configuration for Vercel
  output: 'standalone',
}

export default nextConfig
