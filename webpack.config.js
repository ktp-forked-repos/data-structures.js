var webpack = require('webpack');
var path = require('path');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var libraryName = 'ds';
var plugins = [],
  outputFile;

if (process.env.WEBPACK_ENV && process.env.WEBPACK_ENV.trim() === 'build') {
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  outputFile = libraryName + '.min.js';
} else {
  outputFile = libraryName + '.js';
}

var config = {
  entry: [__dirname + '/node_modules/regenerator-runtime/runtime', __dirname + '/src/index.js'],
  devtool: 'source-map',

  output: {
    globalObject: 'typeof self !== \'undefined\' ? self : this',
    path: __dirname + '/lib',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  resolve: {
    modules: [
      '/Users/abhishekprakash/Workspace/mine/data-structures-es6/node_modules'
    ]
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    modules: [__dirname, 'src'],
    extensions: ['.js']
  }
};

module.exports = config;
