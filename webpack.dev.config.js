const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

require('dotenv').config();

const ss = require('./src/ss_routes');
const conf = require('./private/webpack/dev');

module.exports = (env) => {
  fs.writeFileSync('config.env.js', `export default {NODE_ENV: '${env}'} `);

  return {
    entry: './src/index.js',
    devtool: 'source-map',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      libraryTarget: 'umd'
    },
    module: conf,
    watch: true,
    plugins: [
      new CleanWebpackPlugin('dist'),
      new StaticSiteGeneratorPlugin({
        entry: 'main',
        paths: ss.routes
      }),
      new webpack.optimize.AggressiveMergingPlugin({
        minSizeReduce: 1.5,
        moveToParents: true
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new BrowserSyncPlugin({
        host: 'localhost',
        port: process.env.PORT || 8080,
        server: {
          baseDir: ['dist']
        }
      }),
      new BundleAnalyzerPlugin()
    ]
  };
};
