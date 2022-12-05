import Action from './action';
import ActionError from './action-error';
import inputHelper from './input-helper';
import { logger, setFailed, context } from '@broadshield/github-actions-core-typed-inputs';
import { err, Result } from 'neverthrow';

async function exec(): Promise<Result<boolean, ActionError>> {
  let actionInstance: Action;
  try {
    actionInstance = new Action(context, inputHelper());
  } catch (error) {
    if (error instanceof ActionError) {
      return err(error);
    }
    return err(new ActionError(`index:exec: Failed to construct actionInstance:`, error));
  }
  return actionInstance.execute();
}

exec()
  .then((actionResult) => {
    return actionResult.match(
      (success) => logger.info(`Action completed successfully [${success}]`),
      (error) => {
        error.logError();
        if (Action.failOnError) {
          setFailed('Failed to complete the action');
        }
      },
    );
  })
  .catch((error) => {
    setFailed(`index:exec: Failed to execute action: ${error}`);
  });
