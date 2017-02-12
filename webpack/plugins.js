const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const S3Plugin = require('webpack-s3-plugin');
const AssetHashPlugin = require('./assetHash.js');

module.exports = ({ production = false, browser = false } = {}) => {
  const bannerOptions = { raw: true, banner: 'require("source-map-support").install();' };
  const compress = { warnings: false };
  const loaderOptionsPluginOptions = { minimize: true, debug: false };

  if (!production && !browser) {
    return [
      new webpack.EnvironmentPlugin(['NODE_ENV']),
      new webpack.BannerPlugin(bannerOptions)
    ];
  }
  if (!production && browser) {
    return [
      new webpack.EnvironmentPlugin(['NODE_ENV']),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ];
  }
  if (production && !browser) {
    return [
      new webpack.EnvironmentPlugin(['NODE_ENV', 'CONTENTFUL_KEY', 'CONTENTFUL_URL', 'CDN_URL']),
      new webpack.ContextReplacementPlugin(/moment[\\/]locale$/, /^\.\/(en)$/),
      new webpack.optimize.UglifyJsPlugin({ compress })
    ];
  }
  if (production && browser) {
    return [
      new AssetHashPlugin(),
      new webpack.LoaderOptionsPlugin(loaderOptionsPluginOptions),
      new webpack.EnvironmentPlugin(['NODE_ENV', 'CONTENTFUL_KEY', 'CONTENTFUL_URL', 'CDN_URL']),
      new webpack.ContextReplacementPlugin(/moment[\\/]locale$/, /^\.\/(en)$/),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.AggressiveMergingPlugin(),
      new ExtractTextPlugin({
        filename: 'styles/main.[hash].css',
        allChunks: true
      }),
      new webpack.optimize.UglifyJsPlugin({ compress }),
      new S3Plugin({
        exclude: /.*\.html$/,
        s3Options: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          region: 'us-east-1'
        },
        basePath: 'assets',
        s3UploadOptions: {
          Bucket: process.env.AWS_S3_BUCKET,
          CacheControl: 'max-age=86400'
        }
      })
    ];
  }
  return [];
};
