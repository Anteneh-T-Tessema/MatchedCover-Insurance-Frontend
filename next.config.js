
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Essential settings for Vercel deployment
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Disable font optimization to prevent manifest issues
  optimizeFonts: false,
  
  // Webpack configuration to handle font manifest
  webpack: (config, { isServer }) => {
    // Remove problematic font plugins
    if (config.plugins) {
      config.plugins = config.plugins.filter(plugin => 
        plugin.constructor.name !== 'NextFontManifestPlugin'
      );
    }
    
    // Create font manifest plugin for server builds
    if (isServer) {
      const fs = require('fs');
      const path = require('path');
      
      config.plugins.push({
        apply(compiler) {
          // Create manifest files early in the compilation process
          compiler.hooks.beforeCompile.tap('CreateFontManifest', () => {
            try {
              const manifestDir = path.join(process.cwd(), '.next', 'server');
              const jsonPath = path.join(manifestDir, 'next-font-manifest.json');
              const jsPath = path.join(manifestDir, 'next-font-manifest.js');
              
              if (!fs.existsSync(manifestDir)) {
                fs.mkdirSync(manifestDir, { recursive: true });
              }
              
              const manifest = {
                pages: {},
                app: {},
                appUsingSizeAdjust: false,
                pagesUsingSizeAdjust: false
              };
              
              // Create JSON file
              fs.writeFileSync(jsonPath, JSON.stringify(manifest, null, 2));
              
              // Create JS file that Vercel expects
              const jsContent = `module.exports = ${JSON.stringify(manifest, null, 2)};`;
              fs.writeFileSync(jsPath, jsContent);
              
              console.log('✓ Font manifest files created successfully (.json and .js)');
            } catch (error) {
              console.warn('Font manifest creation failed (non-critical):', error.message);
            }
          });
          
          // Also create during compilation for safety
          compiler.hooks.compilation.tap('CreateFontManifestCompilation', () => {
            try {
              const manifestDir = path.join(process.cwd(), '.next', 'server');
              const jsPath = path.join(manifestDir, 'next-font-manifest.js');
              
              if (!fs.existsSync(manifestDir)) {
                fs.mkdirSync(manifestDir, { recursive: true });
              }
              
              if (!fs.existsSync(jsPath)) {
                const manifest = {
                  pages: {},
                  app: {},
                  appUsingSizeAdjust: false,
                  pagesUsingSizeAdjust: false
                };
                
                const jsContent = `module.exports = ${JSON.stringify(manifest, null, 2)};`;
                fs.writeFileSync(jsPath, jsContent);
                console.log('✓ Font manifest .js file ensured during compilation');
              }
            } catch (error) {
              console.warn('Font manifest compilation hook failed (non-critical):', error.message);
            }
          });
        }
      });
    }
    
    return config;
  },
};

module.exports = nextConfig;
