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
const cli = require('./cli.js');

describe('program', () => {
  it('initializes with commander', () => {
    expect.assertions(3);
    expect(program.version).toHaveBeenCalledWith(version);
    expect(program.usage).toHaveBeenCalledWith('<deploymentName ...>');
    expect(program.parse).toHaveBeenCalled();
  });

  it('it invokes gitsetgo', async () => {
    expect.assertions(2);
    const code = await cli();
    expect(gitsetgo).toHaveBeenCalledWith(program.args);
    expect(code).toBe(0);
  });

  it('exits with code 1 when there is an error', async () => {
    expect.assertions(1);
    const error = new Error('there is a problem');
    gitsetgo.mockImplementation(async () => {
      throw error;
    });
    expect(await cli()).toBe(1);
  });
});
