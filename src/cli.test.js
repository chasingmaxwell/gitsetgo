/**
 * Invokes a function and returns its result if the current process is running
 * in a git hook. Otherwise, returns undefined.
 */
const ifNotGitHook = fn => (!process.env.GIT_PARAMS ? fn() : undefined);

jest.mock('commander', () => {
  const program = {};
  program.version = jest.fn(() => program);
  program.usage = jest.fn(() => program);
  program.parse = jest.fn(() => program);
  program.args = ['aDeployment', 'anotherOne'];
  return program;
});
jest.mock('./gitsetgo');

const { version } = require('../package.json');
const program = require('commander');
const gitsetgo = require('./gitsetgo.js');
require('./cli.js');

describe('program', () => {
  it('initializes with commander', () => {
    expect.assertions(3);
    expect(program.version).toHaveBeenCalledWith(version);
    expect(program.usage).toHaveBeenCalledWith('<deploymentName ...>');
    expect(program.parse).toHaveBeenCalled();
  });

  it('it invokes gitsetgo', () => {
    expect.assertions(1);
    expect(gitsetgo).toHaveBeenCalledWith(program.args);
  });

  it('exits with code 1 when there is an error', async () => {
    // Only expect assertions when not in git hooks. This is necessary because process.exit cannot
    // be mocked reliably when running as a result of a husky git hook.
    ifNotGitHook(() => {
      expect.assertions(1);
    });
    const error = new Error('there is a problem');
    jest.resetModules();
    const gitsetgoNew = require('./gitsetgo.js'); // eslint-disable-line global-require
    gitsetgoNew.mockImplementation(async () => {
      throw error;
    });
    jest.spyOn(global.process, 'exit').mockImplementation(() => {});
    await require('./cli.js'); // eslint-disable-line global-require
    // Only make assertions when not in git hooks. See explanation above.
    ifNotGitHook(() => expect(global.process.exit).toHaveBeenCalledWith(1));
  });
});
