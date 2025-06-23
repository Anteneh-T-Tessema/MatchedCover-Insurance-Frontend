#!/bin/bash

# Vercel Deployment Health Check Script
# Run this locally before deploying to catch issues early

set -e

echo "🔍 Pre-deployment Health Check"
echo "================================"

# Check Node.js version
echo "✓ Node.js version: $(node --version)"

# Check if critical files exist
echo "📁 Checking critical files..."
files=(
    "next.config.ts"
    "tailwind.config.js" 
    "postcss.config.js"
    "vercel.json"
    "src/app/globals.css"
    "src/app/layout.tsx"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "  ✓ $file exists"
    else
        echo "  ❌ $file missing"
        exit 1
    fi
done

# Check for conflicting config files
echo "🔍 Checking for conflicting configurations..."
if [ -f "next.config.js" ]; then
    echo "  ❌ Conflicting next.config.js found - remove it!"
    exit 1
else
    echo "  ✓ No conflicting next.config.js"
fi

# Check package.json dependencies
echo "📦 Checking dependencies..."
required_deps=("tailwindcss" "postcss" "autoprefixer" "next")
for dep in "${required_deps[@]}"; do
    if npm list "$dep" > /dev/null 2>&1; then
        echo "  ✓ $dep installed"
    else
        echo "  ❌ $dep missing"
        exit 1
    fi
done

# Test build locally
echo "🏗️ Testing local build..."
rm -rf .next
npm run build > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "  ✓ Local build successful"
else
    echo "  ❌ Local build failed"
    exit 1
fi

echo ""
echo "🎉 All checks passed! Ready for Vercel deployment."
echo ""
echo "📋 Deployment checklist:"
echo "  1. Environment variables set in Vercel dashboard"
echo "  2. No conflicting configuration files"
echo "  3. All dependencies properly installed"
echo "  4. Local build test passed"
echo ""
echo "🚀 Deploy with: git push origin main"
