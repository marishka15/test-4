const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../webpack.config');

const compiler = webpack(config);
const server = new WebpackDevServer({
  port: 9000,
  host: 'localhost',
  open: false,
}, compiler);

(async () => {
  try {
    await server.start();
    if (process.send) {
      process.send('ok');
    }
  } catch (err) {
    process.exit(1);
  }
})();
