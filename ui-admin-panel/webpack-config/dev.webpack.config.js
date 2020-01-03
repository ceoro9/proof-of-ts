const path              = require('path');
const baseWebpackConfig = require('./base.webpack.config');

const projectRootPath   = path.resolve(__dirname, '../');
const srcFolderPath     = path.resolve(projectRootPath, 'src/');

module.exports = {
  ...baseWebpackConfig,
  mode: "development",
  devServer: {
    contentBase: path.join(srcFolderPath, 'dist'),
    compress: true,
    hot: true,
    port: process.env.UI_ADMIN_PANEL_DEV_SERVER_PORT || 9000
  },
  output: {
    ...baseWebpackConfig.output,
    filename: "dev.bundle.js"
  }
}
