const PATHS = require('../paths');

module.exports = ({ production = false, browser = false } = {}) => {
  return {
    test: /\.tsx?$/,
    exclude: PATHS.modules,
    use: [
      {
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          configFile: 'tsconfig.webpack.json',
          happyPackMode: true,
        },
      },
    ],
  };
};
