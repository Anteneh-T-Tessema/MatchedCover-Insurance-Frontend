#!/bin/bash

# Vercel Build Optimization Script
# This script prepares the project for Vercel deployment

echo "🚀 Optimizing project for Vercel deployment..."

# Clean up any existing build artifacts
echo "🧹 Cleaning build artifacts..."
rm -rf .next
rm -rf out
rm -rf dist

# Optimize package.json for Vercel
echo "📦 Optimizing package.json..."
# Create a temporary package.json with only essential dependencies
node -e "
const pkg = require('./package.json');
const essentialDeps = {
  ...pkg.dependencies,
  // Remove any problematic dependencies if needed
};
const optimizedPkg = {
  ...pkg,
  dependencies: essentialDeps,
  scripts: {
    ...pkg.scripts,
    'vercel-build': 'npm run build'
  }
};
require('fs').writeFileSync('./package.json.vercel', JSON.stringify(optimizedPkg, null, 2));
"

# Create Vercel-specific environment
echo "🔧 Setting up Vercel environment..."
export NODE_ENV=production
export NEXT_TELEMETRY_DISABLED=1
export NODE_OPTIONS="--max-old-space-size=4096"

# Run the build
echo "🏗️ Running optimized build..."
npm run build

echo "✅ Vercel optimization complete!"
echo "📋 Next steps:"
echo "   1. Commit your changes"
echo "   2. Run: vercel --prod"
echo "   3. Monitor the deployment"
