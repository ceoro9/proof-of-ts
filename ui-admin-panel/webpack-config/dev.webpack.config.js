const baseWebpackConfig = require('./base.webpack.config');

module.exports = {
  ...baseWebpackConfig,
  mode: "development",

  output: {
    ...baseWebpackConfig.output,
    filename: "dev.bundle.js"
  }
}
