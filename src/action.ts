import Jira from './Jira';
import ActionError from './action-error';
import EventManager from './event-manager';
import type { Arguments } from './types';
import type { Context } from './types/complex-types';
import { Result } from 'neverthrow';

export default class Action {
  static failOnError = true;

  eventManager: EventManager;

  constructor(context: Context, argv: Arguments) {
    Action.failOnError = argv.failOnError;
    let jira: Jira;
    try {
      jira = new Jira(argv.config);
    } catch (error) {
      throw new ActionError(`Action:constructor: Failed to create Jira instance:`, error);
    }
    try {
      this.eventManager = new EventManager(context, jira, argv);
    } catch (error) {
      throw new ActionError(`Action:constructor: Failed to create EventManager instance:`, error);
    }
  }

  async execute(): Promise<Result<Set<string>, ActionError>> {
    return this.eventManager.getJiraKeysFromGitRange();
  }
}
