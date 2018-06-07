jest.mock('cosmiconfig');
const cosmiconfig = require('cosmiconfig');

const config = { iAm: 'config' };
const load = jest.fn(async () => ({
  config,
}));
cosmiconfig.mockReturnValue({ load });

const getConfig = require('./getConfig');

describe('getConfig', () => {
  it('gets configuration from cosmiconfig', () => {
    expect.assertions(3);
    return getConfig().then(res => {
      expect(cosmiconfig).toHaveBeenCalledWith('gitsetgo', {
        rcExtensions: true,
      });
      expect(load).toHaveBeenCalled();
      expect(res).toEqual(config);
    });
  });
});
