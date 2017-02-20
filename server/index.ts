import * as express from "express";
import * as webpack from "webpack";
import expressConfig from "./express";
import routesConfig from "./routes";
import renderMiddleware from "./render/middleware";

const app = express();

interface IMainOptions {
  env: string;
}

class TestConnector {
  public get testString() {
    return "it works from connector as well!";
  }
}

export function main(options: IMainOptions) {
  if (options.env === "development") {
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

  return new Promise((resolve, reject) => {
    let server = app.listen(app.get("port"), () => {
      resolve(server);
    }).on("error", (err: Error) => {
      reject(err);
    });
  });
}

if (require.main === module) {
  main({
    env: process.env.NODE_ENV,
  });
}
