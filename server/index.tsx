import * as express from "express";
import * as webpack from "webpack";
import expressConfig from "./init/express";
import renderMiddleware from "./render/middleware";

const app = express();

if (process.env.NODE_ENV !== 'production') {
  // enable webpack hot module replacement
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackConfig = require('../webpack/webpack.config');
  const devBrowserConfig = webpackConfig('browser');
  const compiler = webpack(devBrowserConfig);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: devBrowserConfig.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

expressConfig(app);

app.get('*', renderMiddleware);

app.listen(app.get('port'));
