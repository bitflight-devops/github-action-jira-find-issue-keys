import ActionError from './action-error';
import { JiraAuthConfig, JiraConfig } from './types';
import { Version2Client } from 'jira.js/out/version2';
import { Issue, IssueTransition, Transitions } from 'jira.js/out/version2/models/index';
import { DoTransition, GetIssue, GetTransitions } from 'jira.js/out/version2/parameters/index';
import { err, ok, Result } from 'neverthrow';

export default class Jira {
  baseUrl: string;

  client!: Version2Client;

  constructor(config: JiraAuthConfig) {
    this.baseUrl = config.baseUrl;
    Jira.ValidateConfig(config).match(
      () => {
        this.client = new Version2Client({
          host: config.baseUrl,
          telemetry: false,
          newErrorHandling: true,
          authentication: {
            basic: {
              email: config.email,
              apiToken: config.token,
            },
          },
        });
      },
      (error) => {
        throw error;
      },
    );
  }

  static ValidateConfig(config: JiraAuthConfig | JiraConfig): Result<boolean, ActionError> {
    if (!config.email || !config.token || !config.baseUrl) {
      let errorMessage = '';
      errorMessage += `JIRA_BASE_URL was ${config.baseUrl ? 'found' : 'missing'}, `;
      errorMessage += `JIRA_API_TOKEN was ${config.token ? 'found' : 'missing'}, `;
      errorMessage += `and JIRA_USER_EMAIL ${config.email ? 'found' : 'missing'}, `;
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
  ): Promise<Issue> {
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
