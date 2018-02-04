const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const S3Plugin = require('webpack-s3-plugin');
const AssetHashPlugin = require('./assetHash.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = ({ production = false, browser = false } = {}) => {
  const compress = { warnings: false };
  const loaderOptionsPluginOptions = { minimize: true, debug: false };
  const plugins = [
    new webpack.WatchIgnorePlugin([/css\.d\.ts$/]),
    new webpack.EnvironmentPlugin(['NODE_ENV', 'GOOGLE_OAUTH_TOKEN']),
    new webpack.NamedModulesPlugin(),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
    new webpack.NoEmitOnErrorsPlugin(), // do not emit compiled assets that include errors
  ];
  if (!production) {
    plugins.push([new webpack.EnvironmentPlugin(['NODE_ENV'])]);
  }
  if (production && !browser) {
    plugins.push([
      new webpack.EnvironmentPlugin(['NODE_ENV', 'CONTENTFUL_KEY', 'CONTENTFUL_URL', 'CDN_URL']),
    ]);
  }
  if (production && browser) {
    plugins.push([
      new AssetHashPlugin(),
      new webpack.EnvironmentPlugin(['NODE_ENV', 'CONTENTFUL_KEY', 'CONTENTFUL_URL', 'CDN_URL']),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new ExtractTextPlugin({
        filename: 'styles/main.[hash].css',
        allChunks: true,
      }),
      new UglifyJSPlugin({
        exclude: /node_modules/,
        sourceMap: true,
        parallel: true,
        uglifyOptions: {
          ie8: false,
          ecma: 8,
          warnings: false,
          mangle: true,
        },
      }),
      new S3Plugin({
        exclude: /.*\.html$/,
        s3Options: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          region: 'us-east-1',
        },
        basePath: 'assets',
        s3UploadOptions: {
          Bucket: process.env.AWS_S3_BUCKET,
          CacheControl: 'max-age=86400',
        },
      }),
    ]);
  }
  return plugins;
};
