const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const openBrowser = require('./open-browser');
const config = require('../webpack.config.js');
const options = {
  contentBase: './dist',
  hot: true,
  host: 'localhost',
};

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.listen(3000, 'localhost', () => {
  openBrowser('http://localhost:3000');
  console.log('dev server listening on port 3000');
});
