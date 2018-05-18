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
    Object.keys(config.repositories).map(async name => {
      const repository = config.repositories[name];

      log('info', config.name, `Cloning "${name}"...`);
      await spawn(
        'git',
        [
          'clone',
          repository.source.remote,
          name,
          '--depth',
          '1',
          '-b',
          repository.source.branch,
        ],
        { cwd: `${deployDir}` }
      );

      // @TODO: allow the destination repository to differ from the source.

      log('info', config.name, `Pushing "${name}"...`);
      await spawn(
        'git',
        [
          'push',
          'origin',
          `${repository.source.branch}:${repository.destination.branch}`,
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
