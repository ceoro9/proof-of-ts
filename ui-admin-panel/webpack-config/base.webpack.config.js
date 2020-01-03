const path                       = require('path');
const HtmlWebpackPlugin          = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const projectRootPath            = path.resolve(__dirname, '../');
const nodeModulesFolderPath      = path.resolve(projectRootPath, 'node_modules/');
const srcFolderPath              = path.resolve(projectRootPath, 'src/');
const distFolderPath             = path.resolve(projectRootPath, 'dist/');

module.exports = {
  entry: srcFolderPath,
  
	output: {
    path: distFolderPath,
		publicPath: "/"
  },
  
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				include: [
		    	srcFolderPath
        ],
        exclude: [
          nodeModulesFolderPath
        ],
        use: [
          {
            loader: 'cache-loader'
          },
          {
            loader: 'thread-loader',
            options: {
              // there should be 1 cpu for the fork-ts-checker-webpack-plugin
              workers: require('os').cpus().length - 1,
              // set this to Infinity in watch mode - see https://github.com/webpack-contrib/thread-loader
              // poolTimeout: Infinity
            }
          },
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(projectRootPath, 'tsconfig.json'),
              // disable type-checking(it handles on separate process by fork plugin)
              transpileOnly: true,
              // parallise building process
              happyPackMode: true
            }
          }
        ]        
	  	}
		]
  },

  resolve: {
		modules: [
	    nodeModulesFolderPath,
	    srcFolderPath
		],
		extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
  },

  performance: {
    hints: "warning",
    maxEntrypointSize: 2000000, // 2MB
    maxAssetSize: 5000000, // 5MB
  },

  plugins: [
    // Generates html page with a resulting bundle
    new HtmlWebpackPlugin({
      template: path.resolve(srcFolderPath, "index.html")
    }),
    // Runs Typescript type-checker on a separate process 
    new ForkTsCheckerWebpackPlugin({
      useTypescriptIncrementalApi: true,
      checkSyntacticErrors: true,
    }),
  ]
};

