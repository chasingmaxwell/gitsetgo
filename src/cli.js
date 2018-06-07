#!/usr/bin/env node

// @flow

const program = require('commander');
const { version } = require('../package.json');
const gitsetgo = require('./gitsetgo');

program
  .version(version)
  .usage('<deploymentName ...>')
  .parse(process.argv);

(async () => {
  try {
    await gitsetgo(program.args);
  } catch (e) {
    process.exit(1);
  }
})();
