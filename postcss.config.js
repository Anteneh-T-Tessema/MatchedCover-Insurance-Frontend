/** @type {import('postcss-load-config').Config} */
module.exports = {
  plugins: {
    'tailwindcss': {},
    'autoprefixer': {},
    ...(process.env.NODE_ENV === 'production' && {
      'cssnano': {
        preset: ['default', {
          discardComments: { removeAll: true },
          reduceIdents: false,
          zindex: false,
        }]
      }
    })
  },
}
