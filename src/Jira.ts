import { Version2Client } from 'jira.js';
import { IssueBean, IssueTransition, Transitions } from 'jira.js/out/version3/models/index';
import { DoTransition, GetIssue, GetTransitions } from 'jira.js/out/version3/parameters/index';
import { err, ok, Result } from 'neverthrow';

import ActionError from './action-error';
import { JiraAuthConfig, JiraConfig } from './types';

export default class Jira {
  client: Version2Client;

  constructor(config: JiraAuthConfig) {
    Jira.ValidateConfig(config).match(
      () => undefined,
      (error) => {
        throw error;
      },
    );

    this.client = new Version2Client({
      host: config.baseUrl,
      telemetry: false,
      authentication: {
        basic: {
          email: config.email,
          apiToken: config.token,
        },
      },
    });
  }

  static ValidateConfig(config: JiraAuthConfig | JiraConfig): Result<boolean, ActionError> {
    if (!config.email || !config.token || !config.baseUrl) {
      let errorMessage = '';
      errorMessage += `JIRA_BASE_URL was ${!config.baseUrl ? 'missing' : 'found'}, `;
      errorMessage += `JIRA_API_TOKEN was ${!config.token ? 'missing' : 'found'}, `;
      errorMessage += `and JIRA_USER_EMAIL ${!config.email ? 'missing' : 'found'}, `;
      errorMessage += `but all are required`;
      return err(new ActionError(errorMessage));
    }
    return ok(true);
  }

  async getIssue(
    issueId: string,
    query?: {
      fields?: string[];
      expand?: string;
    },
  ): Promise<IssueBean> {
    const parameters: GetIssue = {
      issueIdOrKey: issueId,
    };
    if (query !== undefined) {
      parameters.fields = query.fields || [];
      parameters.expand = query.expand || undefined;
    }
    return this.client.issues.getIssue(parameters);
  }

  async getIssueTransitions(issueId: string): Promise<Transitions> {
    const parameters: GetTransitions = {
      issueIdOrKey: issueId,
    };
    return this.client.issues.getTransitions(parameters);
  }

  async transitionIssue(issueId: string, data: IssueTransition): Promise<object> {
    const parameters: DoTransition = {
      issueIdOrKey: issueId,
      transition: data,
    };
    return this.client.issues.doTransition(parameters);
  }
}
