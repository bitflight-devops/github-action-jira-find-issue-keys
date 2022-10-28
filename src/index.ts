import * as core from '@actions/core';
import * as github from '@actions/github';
import { err, Result } from 'neverthrow';

import Action from './action';
import ActionError from './action-error';
import inputHelper from './input-helper';

async function exec(): Promise<Result<boolean, ActionError>> {
  let actionInstance: Action;
  try {
    actionInstance = new Action(github.context, inputHelper());
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
      (success) => core.info(`Action completed successfully [${success}]`),
      (error) => {
        error.logError();
        if (Action.failOnError) {
          core.setFailed('Failed to complete the action');
        }
      },
    );
  })
  .catch((error) => {
    core.setFailed(`index:exec: Failed to execute action: ${error}`);
  });
