jest.mock('./cli');
const cli = require('./cli');
cli.mockReturnValue(42);

describe('index', () => {
  it('calls the cli and passes its exit code', async () => {
    expect.assertions(2);
    await require('./index');
    expect(process.exitCode).toBe(42);
    expect(cli).toHaveBeenCalled();
  });
});
