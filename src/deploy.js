// @flow

const fs = require('fs-extra');
const { spawn } = require('child-process-promise');
const log = require('./log');

declare type GitsetgoDeploymentConfig = {
  repositories: {
    [string]: {
      source: string,
      destination: string,
      remote: string,
    },
  },
};

module.exports = async (
  config: GitsetgoDeploymentConfig,
  baseDir: string
): void => {
  const deployDir = `${baseDir}/${config.name}`;

  fs.mkdirSync(deployDir);

  await Promise.all(
    config.repositories.map(async ({ name, source, destination }) => {
      log('info', config.name, `Cloning "${name}"...`);
      await spawn(
        'git',
        ['clone', source.remote, name, '--depth', '1', '-b', source.branch],
        { cwd: `${deployDir}` }
      );

      // @TODO: allow the destination repository to differ from the source.

      log('info', config.name, `Pushing "${name}"...`);
      await spawn(
        'git',
        [
          'push',
          'origin',
          `${source.branch}:${destination.branch}`,
          // @TODO: make force push optional.
          '-f',
        ],
        { cwd: `${deployDir}/${name}` }
      );

      log('info', config.name, `Deployed "${name}"`);
    })
  );

  log('info', config.name, 'Deployed all repositories!');
};
