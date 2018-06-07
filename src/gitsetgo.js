// @flow

const deploy = require('./deploy');
const log = require('./log');
const getConfig = require('./getConfig');
const { mkdir, remove } = require('fs-extra');

const STAGING_DIR = '.gitsetgo';

module.exports = async (deployments: String[] = []) => {
  try {
    await mkdir(STAGING_DIR);

    const config = await getConfig();

    if (deployments.length > 1) {
      log(
        'info',
        'all-deployments',
        `Starting deployments for "${deployments.join('", "')}"`
      );
    }

    await Promise.all(
      deployments.map(async name => {
        const deployConfig = config.deployments.find(
          deployment => deployment.name === name
        );

        if (!deployConfig) {
          throw new Error(`No configuration found for "${name}"`);
        }

        return deploy(deployConfig, STAGING_DIR);
      })
    );

    if (deployments.length > 1) {
      log(
        'info',
        'all-deployments',
        `Deployed all repositories for "${deployments.join('", "')}"`
      );
    }

    await remove(STAGING_DIR);
  } catch (e) {
    log('error', 'all-deployments', e);
    await remove(STAGING_DIR);
    throw e;
  }
};
