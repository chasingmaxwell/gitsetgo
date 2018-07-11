/* @flow */

const program = require('commander');
const { version } = require('../package.json');
const gitsetgo = require('./gitsetgo');

program
  .version(version)
  .usage('<deploymentName ...>')
  .parse(process.argv);

/**
 * Runs gitsetgo with input arguments returning the appropriate exit code.
 */
module.exports = async () => {
  try {
    await gitsetgo(program.args);
    return 0;
  } catch (e) {
    return 1;
  }
};
