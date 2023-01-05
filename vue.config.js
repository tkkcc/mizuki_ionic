module.exports = {
  productionSourceMap: process.env.NODE_ENV != 'production',
  publicPath: process.env.DOCS ? '/mizuki_ionic' : '/',
  outputDir: process.env.DOCS ? 'docs' : 'dist',
};
