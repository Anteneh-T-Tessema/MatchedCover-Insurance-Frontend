#!/usr/bin/env node

/**
 * Pre-build script to create font manifest files for Vercel deployment
 * This ensures the files exist before the build process starts
 */

const fs = require('fs');
const path = require('path');

function createFontManifest() {
  try {
    const manifestDir = path.join(process.cwd(), '.next', 'server');
    const jsonPath = path.join(manifestDir, 'next-font-manifest.json');
    const jsPath = path.join(manifestDir, 'next-font-manifest.js');
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(manifestDir)) {
      fs.mkdirSync(manifestDir, { recursive: true });
      console.log('✓ Created .next/server directory');
    }
    
    const manifest = {
      pages: {},
      app: {},
      appUsingSizeAdjust: false,
      pagesUsingSizeAdjust: false
    };
    
    // Create JSON file
    fs.writeFileSync(jsonPath, JSON.stringify(manifest, null, 2));
    console.log('✓ Created next-font-manifest.json');
    
    // Create JS file that Vercel expects
    const jsContent = `module.exports = ${JSON.stringify(manifest, null, 2)};`;
    fs.writeFileSync(jsPath, jsContent);
    console.log('✓ Created next-font-manifest.js');
    
    console.log('🎉 Font manifest files created successfully for Vercel deployment');
  } catch (error) {
    console.error('❌ Failed to create font manifest files:', error.message);
    // Don't exit with error code to prevent build failure
    console.log('⚠️  Continuing build process...');
  }
}

// Run the function
createFontManifest();
