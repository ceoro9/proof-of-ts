const path              = require('path');
const webpack           = require('webpack');
const baseWebpackConfig = require('./base.webpack.config');

const projectRootPath   = path.resolve(__dirname, '../');
const srcFolderPath     = path.resolve(projectRootPath, 'src/');

module.exports = {
  ...baseWebpackConfig,
  mode: "development",
  devServer: {
    contentBase: path.join(srcFolderPath, 'dist'),
    port: process.env.UI_ADMIN_PANEL_DEV_SERVER_PORT || 9000,
    compress: true,
    hot: true,
    noInfo: false,
    quiet: false
  },
  output: {
    ...baseWebpackConfig.output,
    filename: "dev.bundle.js"
  },
  plugins: [
    ...baseWebpackConfig.plugins,
    new webpack.HotModuleReplacementPlugin(), // enable HMR globally
    new webpack.NamedModulesPlugin(),         // readable module names
  ]
}
