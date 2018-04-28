#!/usr/bin/env node

// @flow

const program = require('commander');
const deploy = require('./deploy');
const log = require('./log');
const config = require('config');
const fs = require('fs-extra');

const STAGING_DIR = '.gitsetgo';

program
  .version('1.0.0')
  .usage('<deploymentName ...>')
  .parse(process.argv);


async function gitsetgo() {
  try {
    log('info', 'all-deployments', `Starting deployments for "${program.args.join('", "')}"`);
    const deployments = config.get('gitsetgo.deployments');
    await Promise.all(
      program.args.map(async (name) => {
        const deployConfig = deployments.find(deployment => deployment.name === name);

        if (!deployConfig) {
          throw new Error(`No configuration found for "${name}"`);
        }

        return deploy(deployConfig, STAGING_DIR);
      })
    );

    if (program.args.length > 1) {
      log('info', 'all-deployments', `Deployed all repositories for "${program.args.join('", "')}"`);
    }
  }
  catch (e) {
    log('error', 'all-deployments', e);
  }
}

fs.mkdirSync(STAGING_DIR);

gitsetgo()
  .then(() => fs.removeSync(STAGING_DIR))
  .catch((e) => {
    log('error', 'all-deployments', e);
    fs.removeSync(STAGING_DIR);
  });
