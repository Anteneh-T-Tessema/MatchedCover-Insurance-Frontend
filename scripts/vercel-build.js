#!/usr/bin/env node

/**
 * Vercel Build Script - Permanent Solution
 * This script ensures reliable builds on Vercel by handling common issues
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Vercel build process...');

// Environment setup
process.env.NODE_ENV = 'production';
process.env.NEXT_TELEMETRY_DISABLED = '1';
process.env.SKIP_FONT_OPTIMIZATION = '1';
process.env.DISABLE_NEXT_FONT = '1';

try {
  // 1. Clean any existing build artifacts
  console.log('🧹 Cleaning build artifacts...');
  if (fs.existsSync('.next')) {
    execSync('rm -rf .next', { stdio: 'inherit' });
  }
  if (fs.existsSync('.vercel')) {
    execSync('rm -rf .vercel', { stdio: 'inherit' });
  }

  // 2. Verify package.json integrity
  console.log('📦 Verifying package.json...');
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  
  if (!packageJson.dependencies.tailwindcss) {
    throw new Error('Tailwind CSS not found in dependencies');
  }
  
  if (!packageJson.dependencies.postcss) {
    throw new Error('PostCSS not found in dependencies');
  }

  // 3. Install dependencies with optimizations
  console.log('📥 Installing dependencies...');
  execSync('npm install --legacy-peer-deps --no-audit --no-fund', { 
    stdio: 'inherit',
    env: {
      ...process.env,
      NPM_CONFIG_PROGRESS: 'false',
      NPM_CONFIG_LOGLEVEL: 'error'
    }
  });

  // 4. Verify critical files exist
  console.log('🔍 Verifying configuration files...');
  const criticalFiles = [
    'next.config.ts',
    'tailwind.config.js',
    'postcss.config.js',
    'src/app/globals.css'
  ];

  for (const file of criticalFiles) {
    if (!fs.existsSync(file)) {
      throw new Error(`Critical file missing: ${file}`);
    }
  }

  // 5. Build the application
  console.log('🏗️ Building Next.js application...');
  execSync('npx next build', { 
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_OPTIONS: '--max-old-space-size=4096 --no-warnings'
    }
  });

  console.log('✅ Build completed successfully!');

} catch (error) {
  console.error('❌ Build failed:', error.message);
  
  // Diagnostic information
  console.log('\n🔍 Diagnostic Information:');
  console.log('Node version:', process.version);
  console.log('NPM version:', execSync('npm --version', { encoding: 'utf8' }).trim());
  console.log('Current directory:', process.cwd());
  console.log('Environment variables:');
  Object.keys(process.env)
    .filter(key => key.startsWith('NEXT_') || key.startsWith('VERCEL_'))
    .forEach(key => console.log(`  ${key}=${process.env[key]}`));
  
  process.exit(1);
}
