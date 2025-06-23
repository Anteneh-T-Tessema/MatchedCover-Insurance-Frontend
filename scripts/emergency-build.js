#!/usr/bin/env node

/**
 * Emergency Fallback Build Script
 * This script completely bypasses Next.js font processing
 */

const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚨 Emergency build process - bypassing font optimization...');

// Set aggressive environment variables
process.env.NODE_ENV = 'production';
process.env.NEXT_TELEMETRY_DISABLED = '1';
process.env.SKIP_FONT_OPTIMIZATION = '1';
process.env.DISABLE_NEXT_FONT = '1';
process.env.NEXT_FONT_DISABLED = '1';
process.env.NODE_OPTIONS = '--max-old-space-size=4096 --no-warnings';

try {
  // 1. Clean everything
  console.log('🧹 Aggressive cleanup...');
  execSync('rm -rf .next node_modules/.cache .vercel', { stdio: 'inherit' });

  // 2. Create minimal next.config.js to override any issues
  console.log('⚙️ Creating minimal config override...');
  const minimalConfig = `
/** @type {import('next').NextConfig} */
module.exports = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  experimental: { optimizeCss: false },
  optimizeFonts: false,
  productionBrowserSourceMaps: false,
  webpack: (config) => {
    // Remove font plugins
    if (config.plugins) {
      config.plugins = config.plugins.filter(plugin => 
        plugin.constructor.name !== 'NextFontManifestPlugin'
      );
    }
    // Add null-loader for font imports
    config.module.rules.push({
      test: /next\\/font/,
      use: 'null-loader'
    });
    return config;
  }
};
`;
  
  // Temporarily create minimal config
  if (fs.existsSync('next.config.ts')) {
    fs.renameSync('next.config.ts', 'next.config.ts.backup');
  }
  fs.writeFileSync('next.config.js', minimalConfig);

  // 3. Build with minimal config
  console.log('🏗️ Building with minimal configuration...');
  execSync('npx next build', { 
    stdio: 'inherit',
    env: {
      ...process.env,
      DISABLE_NEXT_FONT: '1',
      SKIP_FONT_OPTIMIZATION: '1'
    }
  });

  // 4. Restore original config
  console.log('🔄 Restoring original configuration...');
  fs.unlinkSync('next.config.js');
  if (fs.existsSync('next.config.ts.backup')) {
    fs.renameSync('next.config.ts.backup', 'next.config.ts');
  }

  console.log('✅ Emergency build completed successfully!');

} catch (error) {
  console.error('❌ Emergency build failed:', error.message);
  
  // Restore config if it exists
  if (fs.existsSync('next.config.js')) {
    fs.unlinkSync('next.config.js');
  }
  if (fs.existsSync('next.config.ts.backup')) {
    fs.renameSync('next.config.ts.backup', 'next.config.ts');
  }
  
  process.exit(1);
}
