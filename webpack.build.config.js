const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');

const ss = require('./src/ss_routes');
const conf = require('./private/webpack/prod');


const imageFileNames = [];

module.exports = (env) => {
  const outputPath = 'dist';
  fs.writeFileSync('config.env.js', `export default {NODE_ENV: '${env}'} `);

  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, outputPath),
      filename: 'bundle.js',
      libraryTarget: 'umd'
    },
    devtool: 'source-map',
    module: conf,
    plugins: [
      new CleanWebpackPlugin('./dist'),
      new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        comments: false, // remove comments
        compress: {
          warnings: false, // Suppress uglification warnings
          pure_getters: true,
          conditionals: true,
          sequences: true,
          dead_code: true,
          booleans: true,
          unused: true,
          if_return: true,
          join_vars: true,
          drop_console: true
        },
        mangle: true,
        sourceMap: true, /* fix issue on uglify */
        output: {comments: false}
      }),
      new StaticSiteGeneratorPlugin({
        entry: 'main',
        paths: ss.routes
      }),
      new webpack.optimize.AggressiveMergingPlugin({
        minSizeReduce: 1.5,
        moveToParents: true
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      // Get all assets files names, and create an array with file names with and without hash
      function () {
        this.plugin('done', (statsData) => {
          const stats = statsData.toJson();
          if (!stats.errors.length) {
            const files = stats.assets;

            files.forEach((file) => {
              if ((file.name.indexOf('.png') >= 0) ||
                (file.name.indexOf('.jpg') >= 0) ||
                (file.name.indexOf('.jpeg') >= 0) ||
                (file.name.indexOf('.gif') >= 0) ||
                (file.name.indexOf('.svg') >= 0)
              ) {
                const fileName = file.name;

                const fileNameWithoutHash = fileName.replace(
                  /([.].{5}(?=\.jpg|\.jpeg|\.gif|\.png|\.svg))/i,
                  ''
                );
                imageFileNames.push({fileNameWithoutHash, fileName});
              }
            });
          }
        });
      },
      function () {
        this.plugin('done', (statsData) => {
          const stats = statsData.toJson();
          if (!stats.errors.length) {
            const files = stats.assets;

            files.forEach((file) => {
              // find and replace bundle and assets file for its name with hash
              if (file.name.indexOf('index.html') >= 0) {
                const pathFile = file.name.replace(/index.html/i, '');
                let contents = fs.readFileSync(path.join(__dirname, `./dist/${pathFile}/`, 'index.html'), 'utf8');

                contents = contents.replace(
                  /<script\s+src=(["'])(.+?)bundle\.js\1/i,
                  `<script src=$1$2bundle.${stats.hash}.js$1`
                );

                imageFileNames.forEach((image) => {
                  const re = new RegExp(image.fileNameWithoutHash, 'gim');

                  contents = contents.replace(
                    re,
                    `${image.fileName}`
                  );
                });

                fs.writeFileSync(
                  path.join(__dirname, `./dist/${pathFile}/`, 'index.html'),
                  contents
                );
              }
            });

            // find and replace assets file for its name with hash
            files.forEach((file) => {
              if (file.name.indexOf(`bundle.${stats.hash}.js`) >= 0) {
                let contentBundle = fs.readFileSync(path.join(__dirname, './dist/', `bundle.${stats.hash}.js`), 'utf8');

                imageFileNames.forEach((image) => {
                  const reBundle = new RegExp(image.fileNameWithoutHash, 'gim');

                  contentBundle = contentBundle.replace(
                    reBundle,
                    `${image.fileName}`
                  );
                });

                fs.writeFileSync(
                  path.join(__dirname, './dist/', `bundle.${stats.hash}.js`),
                  contentBundle
                );
              }
            });
          }
        });
      }
    ]
  };
};
