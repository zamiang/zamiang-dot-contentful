import * as express from "express";
import * as webpack from "webpack";
import expressConfig from "./init/express";
import routesConfig from "./init/routes";
import renderMiddleware from "./render/middleware";

const app = express();

if (process.env.NODE_ENV !== "production") {
  // enable webpack hot module replacement
  /* tslint:disable */
  const webpackDevMiddleware = require("webpack-dev-middleware");
  const webpackHotMiddleware = require("webpack-hot-middleware");
  const webpackConfig = require("../webpack/webpack.config");
  const devBrowserConfig = webpackConfig("browser");
  /* tslint:enable */
  const compiler = webpack(devBrowserConfig);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: devBrowserConfig.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

expressConfig(app);

routesConfig(app);

app.get("*", renderMiddleware);

app.listen(app.get("port"));
