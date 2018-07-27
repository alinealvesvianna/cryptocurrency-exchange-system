const path = require('path');

const pathName = path.resolve(__dirname, '..');
const fileName = './assets/[name]-[hash:5].[ext]';


const rules = {
  rules: [
    {
      test: /\.js/,
      use: 'babel-loader'
    },
    {
      test: /\.(jpg|png|svg|gif)$/,
      loader: 'file-loader?name=assets/images/[name].[hash:5].[ext]'
    },
    {
      test: /\.(eot|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
      include: pathName,
      use: {
        loader: 'file-loader',
        options: {name: fileName}
      }
    },
    {
      test: /\.(ico|otf|pdf)/,
      include: pathName,
      use: {
        loader: 'file-loader',
        options: {name: fileName}
      }
    }
  ]
};


module.exports = rules;

