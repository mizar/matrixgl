const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './lib/index.js',
  mode: 'production',
  output: {
    filename: 'matrixgl.min.js',
    path: path.resolve('build'),
    libraryTarget: 'window',
  },
  plugins: [
    new webpack.DefinePlugin({'process.env': { NODE_ENV: JSON.stringify('production') }}),
  ]
};
