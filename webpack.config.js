const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PrettierPlugin = require('prettier-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const paths = {
  src: path.resolve(__dirname, './src'),
  build: path.resolve(__dirname, './dist'),
  public: path.resolve(__dirname, './public'),
};
module.exports = {
  entry: [
    './src/index.js', // Your entry point
  ],
  mode: 'development',
  entry: [
    './src/log.js',
    'webpack-hot-middleware/client',
    './src/index.js', // Your entry point
  ],
  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env'], ['@babel/preset-typescript']],
            },
          },
        ],
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ESLintPlugin({
      files: ['.', 'src'],
      formatter: 'table',
    }),
    new PrettierPlugin(),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '/',
  },
};
