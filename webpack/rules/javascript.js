const PATHS = require('../paths');

module.exports = ({ production = false, browser = false } = {}) => {
  return {
    test: /\.tsx?$/,
    loader: "awesome-typescript-loader",
    exclude: PATHS.modules
  };
};
