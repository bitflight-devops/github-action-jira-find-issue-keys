import ActionError from '../src/action-error';
import { logger } from '@broadshield/github-actions-core-typed-inputs';

describe('Error handling', () => {
  beforeAll(() => {
    // Mock error/warning/info/debug
    jest.spyOn(logger, 'error').mockImplementation(console.error);
    jest.spyOn(logger, 'warning').mockImplementation(console.warn);
    jest.spyOn(logger, 'info').mockImplementation(console.info);
    jest.spyOn(logger, 'debug').mockImplementation(console.log);
    jest.spyOn(logger, 'notice').mockImplementation(console.info);
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
    expect(logger.error).toHaveBeenCalledTimes(2);
  });
});
