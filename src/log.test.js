jest.mock('chalk', () => ({
  greenBright: {
    bold: jest.fn(),
  },
  yellowBright: {
    bold: jest.fn(),
  },
  redBright: {
    bold: jest.fn(),
  },
  green: jest.fn(),
  cyan: jest.fn(),
  magenta: jest.fn(),
}));
jest.spyOn(console, 'info');
jest.spyOn(console, 'warn');
jest.spyOn(console, 'error');
const chalk = require('chalk');
const log = require('./log');

describe('log', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    chalk.greenBright.bold.mockReturnValue('gitsetgo:');
    chalk.yellowBright.bold.mockReturnValue('gitsetgo:');
    chalk.redBright.bold.mockReturnValue('gitsetgo:');
  });

  it('assigns a color to a given context', () => {
    expect.assertions(2);
    log('info', 'first', 'something happened');
    log('info', 'second', 'something else happened');
    log('info', 'first', 'something else happened again');
    expect(chalk.green).toHaveBeenCalledTimes(2);
    expect(chalk.cyan).toHaveBeenCalledTimes(1);
  });

  it('logs messages to console', () => {
    expect.assertions(3);
    const infoMessage = 'a thing happened';
    const warnMessage = 'a potentially bad thing happened';
    const errorMessage = 'a bad thing happened';
    log('info', 'context', infoMessage);
    log('warn', 'context', warnMessage);
    log('error', 'context', errorMessage);
    expect(console.info.mock.calls[0][2]).toBe(infoMessage);
    expect(console.warn.mock.calls[0][2]).toBe(warnMessage);
    expect(console.error.mock.calls[0][2]).toBe(errorMessage);
  });

  it('logs warn messages to console', () => {});

  it('logs error messages to console', () => {});
});
