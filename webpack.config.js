'use strict';
let path = require('path');
module.exports = {
  mode: 'production',
  entry: "./src/scripts/main.js",
  output: {
    filename: "[name].bundle.js",
    path: __dirname + '/js'
  },
  watch: true,
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', {
                // debug: true, /* to show all start process with errors */
                corejs: 3,
                useBuiltIns: "usage"
            }]]
          }
        }
      }
    ]
  }
};