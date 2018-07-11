/* @flow */

declare type LogLevel = 'info' | 'warn' | 'error';
declare type LevelColor = 'greenBright' | 'yellowBright' | 'redBright';
declare type ContextColor =
  | 'blueBright'
  | 'cyan'
  | 'cyanBright'
  | 'green'
  | 'magenta'
  | 'magentaBright'
  | 'yellow';

const chalk = require('chalk');

/**
 * Return a color to be used with the given color.
 *
 * Each context/color pair will be internally cached so the same color will be
 * used for a context across the process.
 *
 * @param {string} context The context for which to return a color.
 *
 * @return {string} The chalk color to pair with the given context.
 */
function getContextColor(context: string): ContextColor {
  getContextColor.colorMap = getContextColor.colorMap || new Map();
  getContextColor.colorGen =
    getContextColor.colorGen ||
    (function* colorGen() {
      let index = -1;
      const colors = [
        'green',
        'cyan',
        'magenta',
        'yellow',
        'blueBright',
        'magentaBright',
        'cyanBright',
      ];

      while (true) {
        yield colors[(index += 1) % colors.length];
      }
    })();

  return getContextColor.colorMap.has(context)
    ? getContextColor.colorMap.get(context)
    : getContextColor.colorMap
        .set(context, getContextColor.colorGen.next().value)
        .get(context);
}

const levelColorMap: Map<LogLevel, LevelColor> = new Map([
  ['info', 'greenBright'],
  ['warn', 'yellowBright'],
  ['error', 'redBright'],
]);

/**
 * Wrap the console with color, context, and class.
 *
 * @param {string} level The log level. Corresponds to console methods.
 * @param {string} context The context against which to log.
 * @param {any} args Any additional arguments to pass to the console method.
 */
module.exports = (
  level: LogLevel,
  context: string,
  ...args: Array<mixed>
): void => {
  // eslint-disable-next-line no-console
  console[level](
    // The chalk type definitions do not handle dynamic property references very
    // well. $FlowFixMe
    chalk[levelColorMap.get(level)].bold('gitsetgo:'),
    // See above. $FlowFixMe
    chalk[getContextColor(context)](`${context}:`),
    ...args
  );
};
