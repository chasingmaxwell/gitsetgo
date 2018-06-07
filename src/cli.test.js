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
    expect.assertions(1);
    const error = new Error('there is a problem');
    jest.resetModules();
    const gitsetgoNew = require('./gitsetgo.js'); // eslint-disable-line global-require
    gitsetgoNew.mockImplementation(async () => {
      throw error;
    });
    jest.spyOn(process, 'exit').mockImplementation(() => {});
    await require('./cli.js'); // eslint-disable-line global-require
    expect(process.exit).toHaveBeenCalledWith(1);
  });
});
