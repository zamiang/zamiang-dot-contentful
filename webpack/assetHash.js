const path = require("path");
const fs = require("fs");
const PATHS = require("./paths");

function AssetHashPlugin() { }
AssetHashPlugin.prototype.apply = (compiler) => {
  // Set the asset hash before pushing to s3
  compiler.plugin("done", (stats) => {
    const assetHash = stats.hash;
    const jsFileName = "server.js";
    const filePath = path.join(PATHS.compiled, jsFileName);
    const js = fs.readFileSync(filePath, "utf8");
    let output = js.replace("main.css", `main.${assetHash}.css`);
    output = output.replace("app.js", `app.${assetHash}.js`).replace("main.css", `main.${assetHash}.css`).replace("main.css", `main.${assetHash}.css`);
    fs.writeFileSync(filePath, output);
  });
};

module.exports = AssetHashPlugin;
