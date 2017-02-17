const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const S3Plugin = require("webpack-s3-plugin");
const AssetHashPlugin = require("./assetHash.js");
const { CheckerPlugin } = require("awesome-typescript-loader")

module.exports = ({ production = false, browser = false } = {}) => {
  const bannerOptions = { raw: true, banner: "require('source-map-support').install();" };
  const compress = { warnings: false };
  const loaderOptionsPluginOptions = { minimize: true, debug: false };

  if (!production && !browser) {
    return [
      new CheckerPlugin(),
      new webpack.EnvironmentPlugin(["NODE_ENV"]),
      new webpack.BannerPlugin(bannerOptions)
    ];
  }
  if (!production && browser) {
    return [
      new CheckerPlugin(),
      new webpack.EnvironmentPlugin(["NODE_ENV"]),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ];
  }
  if (production && !browser) {
    return [
      new CheckerPlugin(),
      new webpack.EnvironmentPlugin(["NODE_ENV", "CONTENTFUL_KEY", "CONTENTFUL_URL", "CDN_URL"]),
    ];
  }
  if (production && browser) {
    return [
      new CheckerPlugin(),
      new AssetHashPlugin(),
      new webpack.EnvironmentPlugin(["NODE_ENV", "CONTENTFUL_KEY", "CONTENTFUL_URL", "CDN_URL"]),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new ExtractTextPlugin({
        filename: "styles/main.[hash].css",
        allChunks: true
      }),
      new webpack.optimize.UglifyJsPlugin({ compress }),
      new S3Plugin({
        exclude: /.*\.html$/,
        s3Options: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          region: "us-east-1"
        },
        basePath: "assets",
        s3UploadOptions: {
          Bucket: process.env.AWS_S3_BUCKET,
          CacheControl: "max-age=86400"
        }
      })
    ];
  }
  return [];
};
