import * as core from '@actions/core';

import ActionError from '../src/action-error';

describe('Error handling', () => {
  beforeAll(() => {
    // Mock error/warning/info/debug
    jest.spyOn(core, 'error').mockImplementation(console.error);
    jest.spyOn(core, 'warning').mockImplementation(console.warn);
    jest.spyOn(core, 'info').mockImplementation(console.info);
    jest.spyOn(core, 'debug').mockImplementation(console.log);
    jest.spyOn(core, 'notice').mockImplementation(console.info);
  });

  it('sets defaults', () => {
    const errorMessage = 'This is an error message';
    const someObject = {
      first: 'hi',
      second: 'there',
      third: { a: 'b', c: 'd' },
    };
    const error = new ActionError(errorMessage, someObject);
    expect(error.message).toEqual(errorMessage);
    expect(error).toBeInstanceOf(Error);
    error.logError();
    expect(core.error).toHaveBeenCalledTimes(2);
  });
});
