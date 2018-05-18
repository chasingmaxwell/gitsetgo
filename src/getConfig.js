const cosmiconfig = require('cosmiconfig');

const singleConfig = cosmiconfig('gitsetgo', { rcExtensions: true })
  .load()
  .then(({ config }) => config);

module.exports = async () => singleConfig;
