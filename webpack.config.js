const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = (...args) => {
  const opts =
    args.filter((a) => !!a).find((arg) => typeof arg === 'object') || {};

  const isStorybook = opts.storybook;
  const mode = opts.mode || 'development';

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
      use: ['style-loader', 'css-loader', 'sass-loader'],
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
      './src/index.ts',
    ],
    module: {
      rules,
      noParse: [
        require.resolve('prettier/standalone'),
        require.resolve('prettier/parser-typescript'),
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Development',
      }),
      new webpack.HotModuleReplacementPlugin(),
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'build'),
      clean: true,
      publicPath: '/',
    },
  };
  return config;
};
