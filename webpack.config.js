const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = () => {
  const apiUrl = process.env.API_URL || 'http://localhost:3000';

  return ({
    mode: 'development',
    target: 'web',
    entry: ['babel-polyfill', './src/main.jsx'],
    output: {
      filename: 'bundle.[hash].js',
      path: path.resolve(__dirname, 'build'),
      publicPath: '/',
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.(gif|png|jpe?g|svg)$/i,
          use: 'file-loader',
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
            },
          ],
        },
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader',
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: './public/index.html',
        filename: './index.html',
      }),
      new webpack.DefinePlugin({
        API_URL: JSON.stringify(apiUrl),
      }),
    ],
  });
};
