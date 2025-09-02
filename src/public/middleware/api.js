const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../../../webpack.common');


const compiler = Webpack(webpackConfig);
const devServerOptions = { ...webpackConfig.devServer, open: false };
const server = new WebpackDevServer(devServerOptions, compiler);

// run the server which runs config of the webpack
const runServer = async () => {
  console.log('Starting server...');
  await server.start();

};


runServer();




