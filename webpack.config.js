const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = (...args) => {
  const opts =
    args.filter((a) => !!a).find((arg) => typeof arg === 'object') || {};

  const isStorybook = opts.storybook;
  const mode = opts.mode || 'production';
  const isDev = mode === 'development';
  const isProd = mode === 'production';

  const babelLoaderPlugins = [];
  const babelLoaderOptions = {
    presets: [['@babel/preset-env'], ['@babel/preset-typescript']],
    plugins: babelLoaderPlugins,
  };

  const babelLoaderRule = {
    loader: 'babel-loader',
    options: babelLoaderOptions,
  };
  const tsLoaderOptions = isStorybook
    ? { transpileOnly: true }
    : { transpileOnly: false };

  const tsLoader = {
    loader: 'ts-loader',
    options: tsLoaderOptions,
  };

  const rules = [
    {
      test: /\.[tj]sx?$/,
      exclude: /node_modules/,
      use: [babelLoaderRule, tsLoader],
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
  ];
  const config = {
    mode,
    resolve: {
      extensions: ['.ts', '.js'],
    },
    entry: [
      path.resolve(__dirname, './src/log.js'),
      './src/styles.scss',
      './src/index.js', // Your entry point
    ],
    module: {
      rules,
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
    ],
    // output: {
    //   path: paths.build,
    //   libraryTarget: 'commonjs',
    //   filename: '[name].bundle.js',
    //   publicPath: '/',
    // },

    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'build'),
      clean: true,
      publicPath: '/',
    },
  };
  return config;
};
