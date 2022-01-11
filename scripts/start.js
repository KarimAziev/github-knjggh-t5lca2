const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const openBrowser = require('./open-browser');
const makeConfig = require('../webpack.config.js');
const { paths } = require('./paths');

const options = {
  // contentBase: paths.build,
  hot: true,
  port: 3000,
  host: 'localhost',
};
const config = makeConfig({ mode: 'development' });
console.log('config:', config);
const compiler = webpack(config);
const server = new webpackDevServer(options, compiler);

server.startCallback(() => {
  openBrowser('http://localhost:3000');
  console.log('dev server listening on port 3000');
});
