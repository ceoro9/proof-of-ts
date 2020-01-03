const path = require('path');

module.exports = {
	entry: "./src/",

	output: {
    path: path.resolve(__dirname, '../dist'),
		publicPath: "/"
	},

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				include: [
		    	path.resolve(__dirname, "src")
				],
				loader: "ts-loader"
	  	}
		]
  },

  resolve: {
		modules: [
	    "node_modules",
	    path.resolve(__dirname, "src")
		],
		extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
  },

  performance: {
		hints: "warning"
  }
};

