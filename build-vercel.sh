#!/bin/bash

# Vercel build script for MatchedCover
echo "🚀 Starting Vercel build for MatchedCover..."

# Set memory limits
export NODE_OPTIONS="--max-old-space-size=4096"

# Disable Next.js telemetry
export NEXT_TELEMETRY_DISABLED=1

# Skip environment validation for faster builds
export SKIP_ENV_VALIDATION=1

# Install dependencies if needed (Vercel handles this automatically)
# npm ci --production=false

# Run the build
echo "📦 Building Next.js application..."
npm run build

echo "✅ Build completed successfully!"
