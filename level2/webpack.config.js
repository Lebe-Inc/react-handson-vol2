var webpack = require("webpack")
var path = require("path")
var ExtractTextPlugin = require('extract-text-webpack-plugin');
 
module.exports = {
  resolve: {
    extensions: ['.js', '.jsx']
  },
  entry: __dirname + "/src/javascripts/app.js",
  output: {
    path: __dirname + "/dist",
    filename: 'bundle.js',
    libraryTarget: "umd"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: "/node_modules/",
        query: {
          presets: ["es2015","react","stage-0"]
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }),
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!sass-loader' }),
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({ "global.GENTLY": false }),
    new ExtractTextPlugin("style.css")
  ]
};