jest.mock('fs-extra');
jest.mock('./log');
jest.mock('child-process-promise');

const fs = require('fs-extra');
const log = require('./log');
const { spawn } = require('child-process-promise');
const deploy = require('./deploy');

describe('deploy', () => {
  let baseDir;
  let config;
  let deployDir;

  beforeAll(async () => {
    baseDir = '/some/dir';
    config = {
      name: 'someDeployment',
      repositories: [
        {
          name: 'repoOne',
          source: {
            remote: '1-someSourceRemote',
            branch: '1-someSourceBranch',
          },
          destination: {
            remote: '1-someDestinationRemote',
            branch: '1-someDestinationBranch',
          },
        },
        {
          name: 'repoTwo',
          source: {
            remote: '2-someSourceRemote',
            branch: '2-someSourceBranch',
          },
          destination: {
            remote: '2-someDestinationRemote',
            branch: '2-someDestinationBranch',
          },
        },
      ],
    };
    deployDir = `${baseDir}/${config.name}`;
    await deploy(config, baseDir);
  });

  it('makes the deployment directory', () => {
    expect.assertions(1);
    expect(fs.mkdirSync).toHaveBeenCalledWith(deployDir);
  });

  it('it clones and pushes the repository', () => {
    expect.assertions(config.repositories.length * 4);
    config.repositories.forEach(({ name, source, destination }) => {
      expect(log).toHaveBeenCalledWith(
        'info',
        config.name,
        `Cloning "${name}"...`
      );
      expect(spawn).toHaveBeenCalledWith(
        'git',
        ['clone', source.remote, name, '--depth', '1', '-b', source.branch],
        { cwd: deployDir }
      );
      expect(log).toHaveBeenCalledWith(
        'info',
        config.name,
        `Pushing "${name}"...`
      );
      expect(spawn).toHaveBeenCalledWith(
        'git',
        ['push', 'origin', `${source.branch}:${destination.branch}`, '-f'],
        { cwd: `${deployDir}/${name}` }
      );
    });
  });

  it('logs when each repository has been deployed', () => {
    expect.assertions(config.repositories.length);
    config.repositories.forEach(({ name }) => {
      expect(log).toHaveBeenCalledWith(
        'info',
        config.name,
        `Deployed "${name}"`
      );
    });
  });

  it('logs when all repositories in a deployment have been deployed', () => {
    expect.assertions(1);
    expect(log).toHaveBeenCalledWith(
      'info',
      config.name,
      'Deployed all repositories!'
    );
  });
});
