import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Disable ESLint during build to focus on TypeScript compilation
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Allow production builds to successfully complete even if there are type errors
    ignoreBuildErrors: false,
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['*']
    }
  },
  // Enable standalone output for Docker deployment
  output: 'standalone',
  // Optimize for production
  compress: true,
  poweredByHeader: false
};

export default nextConfig;
