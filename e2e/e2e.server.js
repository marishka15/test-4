const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const config = require("../webpack.config");

const compiler = webpack(config);
const server = new WebpackDevServer(
  {
    port: 9000,
    host: "localhost",
    open: false,
  },
  compiler,
);

(async () => {
  await server.start();
  if (process.send) {
    process.send("ok");
  }
})();
