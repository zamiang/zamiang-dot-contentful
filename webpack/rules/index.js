const image = require('./image');
const typescript = require('./typescript');
const graphql = require('./graphql');
const css = require('./css');

module.exports = ({ production = false, browser = false } = {}) => [
  graphql(),
  typescript({ production, browser }),
  css({ production, browser }),
  image(),
];
