// e2e/e2e.server.js
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../webpack.config.js'); // ← .js важно!

const compiler = webpack(config);
const devServerOptions = { ...config.devServer, open: false, hot: false };
const server = new WebpackDevServer(devServerOptions, compiler);

(async () => {
  await server.start();
  if (process.send) process.send('ok');
})();

// Завершение при получении сигнала
process.on('SIGTERM', async () => {
  await server.stop();
  process.exit(0);
});

process.on('SIGINT', async () => {
  await server.stop();
  process.exit(0);
});