var webpack = require('webpack');
var path =require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var WebpackMd5Hash = require('webpack-md5-hash');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var copy = require('quickly-copy-file');
var del = require('del');

var isDev = function () {
	return process.env.NODE_ENV.trim() === 'development';
}
var isProd = function () {
	return process.env.NODE_ENV.trim() === 'production';
}

copyAndDelFiles();
module.exports = {
    entry: {
    	//入口文件并添加了热加载
    	index:'./src/js/main.js',
    	//将下列资源打包到vendor.js下
	    vendor: [
	      'react',
	      'react-dom',
	      'react-router',
	      'react-redux',
	      'redux',
	      'redux-thunk',
	      'nprogress'
	    ]
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js',  //输出文件
        publicPath: isProd() ? './dist/' : '/dist/'
    },
    module: {
        loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loaders: ['react-hot-loader', 'babel-loader?presets[]=react,presets[]=es2015']
			},
            {
		      test: /\.css$/,
		      exclude: ['/node_modules/', path.resolve(__dirname, './src/css/')],
		      loaders: isDev?['style-loader','css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]']:ExtractTextPlugin.extract('css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]', 'style-loader', {
		        publicPath: '.'
		      })
    		}, 
			{
			    test: /\.css$/,
			    include: path.resolve(__dirname, './src/css/'),
			    loaders: ['style-loader','css-loader']
			 },
            //打包css文件

            //编译sass文件
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'} 
            //对图片进行打包
        ]
    },
    devServer:{
        proxy: {
            '/aj': {
                target: 'http://localhost:9090',
                 pathRewrite: {"^/aj" : ""}
            }
        }
    },
    plugins: getPlugins(),
    resolve: {
        //自动扩展文件后缀名
        extensions: ['.js', '.json', '.scss', '.ts']
    }
};

// 复制和删除文件
function copyAndDelFiles() {
  var copyFile = '';

  // 复制文件
  if (isDev()) {
    copyFile = 'src/html/index_dev.html';
  } 

  if (isProd()) {
    copyFile = 'src/html/index.html';
  }

  copy(copyFile, 'index.html', function(error) {
    if (error) {
      return console.error(error);
    }
  });

  if (isProd()) {
    del(['dist']);
  }
}

function getPlugins(){
	var plugins = [
	    new webpack.DefinePlugin({
	      __DEV__ : isDev(),
	      __PROD__: isProd(),
	      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV.trim())
	    }),
	    new webpack.optimize.CommonsChunkPlugin({name:'vendor', filename:isProd() ? 'vendor.[chunkhash:8].js' : 'vendor.js'}),
	];

	if(isDev){
	    plugins.push(
	      new OpenBrowserPlugin({ url: 'http://localhost:8080/' })
	    );		
	}

  if (isProd()) {
    plugins.push(
    new ExtractTextPlugin(isProd() ? '[name].[chunkhash:8].css' : '[name].css'),
      new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        output: {
          comments: false,
        },
        compress: {
          warnings: false
        }
      }),
      new HtmlWebpackPlugin({
        title: 'cobish - 写给未来的自己',
        filename: '../index.html',
        template: './src/html/index.html'
      }),
      new WebpackMd5Hash()
    );
  }

return plugins;

}