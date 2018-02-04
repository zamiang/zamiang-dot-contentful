const PATHS = require('../paths');

module.exports = ({ production = false, browser = false } = {}) => {
  return {
    test: /\.tsx?$/,
    loader: 'ts-loader',
    exclude: PATHS.modules,
    options: {
      logInfoToStdOut: true,
    },
  };
};
