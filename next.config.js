
const fs = require('fs');
const path = require('path');

/** @type {import('next').NextConfig} */
module.exports = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  experimental: { optimizeCss: false },
  optimizeFonts: false,
  productionBrowserSourceMaps: false,
  webpack: (config, { isServer }) => {
    // Remove font plugins
    if (config.plugins) {
      config.plugins = config.plugins.filter(plugin => 
        plugin.constructor.name !== 'NextFontManifestPlugin'
      );
    }
    
    // Add null-loader for font imports
    config.module.rules.push({
      test: /next\/font/,
      use: 'null-loader'
    });
    
    // Create font manifest plugin
    if (isServer) {
      config.plugins.push({
        apply(compiler) {
          compiler.hooks.afterEmit.tap('CreateFontManifest', () => {
            const manifestPath = path.join(process.cwd(), '.next', 'server', 'next-font-manifest.json');
            const manifestDir = path.dirname(manifestPath);
            
            if (!fs.existsSync(manifestDir)) {
              fs.mkdirSync(manifestDir, { recursive: true });
            }
            
            const manifest = {
              pages: {},
              app: {},
              appUsingSizeAdjust: false,
              pagesUsingSizeAdjust: false
            };
            
            fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
          });
        }
      });
    }
    
    return config;
  }
};
