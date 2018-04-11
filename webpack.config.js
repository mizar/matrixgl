const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    'matrixgl': './lib/index.js',
    'matrixgl.es2015': './lib.es2015/index.js',
  },
  mode: 'production',
  output: {
    filename: '[name].min.js',
    path: path.resolve('build'),
    libraryTarget: 'window',
  },
  plugins: [
    new webpack.DefinePlugin({'process.env': { NODE_ENV: JSON.stringify('production') }}),
  ]
};
