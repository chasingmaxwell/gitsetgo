#!/usr/bin/env node

const cli = require('./cli');

(async () => {
  process.exitCode = await cli();
})();
