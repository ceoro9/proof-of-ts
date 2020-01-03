const baseWebpackConfig = require('./base.webpack.config');

module.exports = {
  ...baseWebpackConfig,
  mode: "production",

  output: {
    ...baseWebpackConfig.output,
    filename: "prod.bundle.js"
  }
}
