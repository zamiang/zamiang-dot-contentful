const image = require('./image');
const typescript = require('./typescript');
//const javascript = require("./javascript");
const css = require('./css');

module.exports = ({ production = false, browser = false } = {}) => [
  typescript({ production, browser }),
  css({ production, browser }),
  image(),
];
