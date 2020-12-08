const path = require('path');
const fetchTzData = require('./crawler')
const HtmlWebpackPlugin = require('html-webpack-plugin')

fetchTzData();

module.exports = {
  mode: 'production',
  entry: {
    index: './example/src/index.js',
    lib: './src/index.js',
  },
  output: {
    path: path.join(__dirname, './example/dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './example/src/index.html'),
      filename: './index.html'
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
}
