#!/bin/bash
# Force Vercel Redeploy Script
# This script forces a fresh deployment by making a minor change and pushing

echo "🚀 Forcing Vercel redeploy with cache clearing..."

# Add a timestamp comment to package.json to trigger redeploy
TIMESTAMP=$(date "+%Y-%m-%d %H:%M:%S")
echo "" >> README.md
echo "<!-- Build trigger: $TIMESTAMP -->" >> README.md

# Commit and push the change
git add README.md
git commit -m "trigger: force redeploy $(date +%Y%m%d-%H%M%S)"
git push origin main

echo "✅ Pushed trigger commit. Vercel should now redeploy with fresh cache."
echo "🔍 Monitor your deployment at: https://vercel.com/dashboard"
echo ""
echo "If the build still fails, try these steps:"
echo "1. Go to your Vercel project settings"
echo "2. Clear deployment cache"
echo "3. Manually trigger a new deployment"
