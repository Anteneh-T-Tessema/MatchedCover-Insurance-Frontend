
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
      test: /next\/font/,
      use: 'null-loader'
    });
    return config;
  }
};
