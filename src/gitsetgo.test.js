jest.mock('./getConfig');
jest.mock('fs-extra');
jest.mock('./deploy');
jest.mock('./log');

const log = require('./log');
const getConfig = require('./getConfig');
const deploy = require('./deploy');
const { mkdir, remove } = require('fs-extra');

const gitsetgo = require('./gitsetgo.js');

describe('program', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    getConfig.mockResolvedValue({
      deployments: [
        {
          name: 'deploymentOne',
        },
        {
          name: 'deploymentTwo',
        },
      ],
    });
  });

  it('makes and removes the staging directory', async () => {
    expect.assertions(2);
    await gitsetgo();
    expect(mkdir).toHaveBeenCalledWith('.gitsetgo');
    expect(remove).toHaveBeenCalledWith('.gitsetgo');
  });

  it('logs information about all deployments when there is more than one', async () => {
    expect.assertions(2);
    const deployments = ['deploymentOne', 'deploymentTwo'];
    await gitsetgo(deployments);
    expect(log).toHaveBeenCalledWith(
      'info',
      'all-deployments',
      'Starting deployments for "deploymentOne", "deploymentTwo"'
    );
    expect(log).toHaveBeenCalledWith(
      'info',
      'all-deployments',
      'Deployed all repositories for "deploymentOne", "deploymentTwo"'
    );
  });

  it('invokes deploy() for each deployment configuration', async () => {
    expect.assertions(2);
    const deployments = ['deploymentOne', 'deploymentTwo'];
    const {
      deployments: [deploymentOne, deploymentTwo],
    } = await getConfig();
    await gitsetgo(deployments);
    expect(deploy).toHaveBeenCalledWith(deploymentOne, '.gitsetgo');
    expect(deploy).toHaveBeenCalledWith(deploymentTwo, '.gitsetgo');
  });

  it('throws when no configuration can be found', async () => {
    expect.assertions(1);
    try {
      await gitsetgo(['non-existent']);
    } catch ({ message }) {
      expect(message).toBe('No configuration found for "non-existent"');
    }
  });
});
