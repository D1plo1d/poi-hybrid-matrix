var path = require('path');
var webpack = require('webpack');

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'web'),
  },
  context: path.resolve(__dirname, 'web'),
  entry: './index.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'web', 'dist')
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'stage-1']
        }
      }
    ]
  },
}
