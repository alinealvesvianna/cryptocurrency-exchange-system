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

