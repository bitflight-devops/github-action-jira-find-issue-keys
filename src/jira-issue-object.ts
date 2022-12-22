import Jira from './Jira';
import { logger } from '@broadshield/github-actions-core-typed-inputs';
import _ from 'lodash';
import TurndownService from 'turndown';

export interface LoadIssueDataInterface {
  [key: string]: string | boolean | Jira | undefined;
  jira?: Jira;
  forceReload?: boolean;
}
export class JiraIssueObject {
  private static jira?: Jira = undefined;

  private static turndownService = new TurndownService();

  static setJira(jira: Jira): void {
    this.jira = jira;
  }

  static getJira(): Jira | undefined {
    return this.jira;
  }

  static async create(
    key: string,
    jira?: Jira,
    loadIssueData = true,
    throwErrorOnLoadFail = false,
  ): Promise<JiraIssueObject> {
    if (jira && jira instanceof Jira) {
      JiraIssueObject.setJira(jira);
    }
    const issue = new JiraIssueObject(key, throwErrorOnLoadFail);
    if (loadIssueData && JiraIssueObject.getJira()) {
      await issue.loadIssueData({ jira: JiraIssueObject.getJira() });
    }
    return issue;
  }

  throwErrorOnLoadFail: boolean;

  key: string;

  dataLoaded?: number;

  description?: string;

  projectKey?: string;

  projectName?: string;

  fixVersions?: string[];

  priority?: string;

  status?: string;

  summary?: string;

  dueDate?: string;

  ghNumber?: string;

  private constructor(key: string, throwErrorOnLoadFail: boolean) {
    this.key = key;
    this.throwErrorOnLoadFail = throwErrorOnLoadFail;
  }

  async loadIssueData(config?: LoadIssueDataInterface): Promise<JiraIssueObject> {
    let jira: Jira | undefined = JiraIssueObject.getJira();
    const forceReload = config?.forceReload ?? false;
    if (config?.jira && config.jira instanceof Jira && !!jira) {
      JiraIssueObject.setJira(config.jira);
      jira = config.jira;
    }
    if (!jira) {
      const errorMessage = 'JiraIssueObject:loadIssueData: No Jira instance provided';
      if (this.throwErrorOnLoadFail) {
        throw new Error(errorMessage);
      } else {
        logger.error(errorMessage);
        return this;
      }
    }
    if (this.dataLoaded && !forceReload) {
      return this;
    }
    const query = {
      fields: ['status', 'summary', 'fixVersions', 'priority', 'project', 'description', 'duedate', 'renderedFields'],
      expand: 'renderedFields',
    };
    try {
      const jiraIssue = await jira.getIssue(this.key, query);
      const descriptionHTML = jiraIssue?.renderedFields?.description;
      this.description = descriptionHTML
        ? JiraIssueObject.turndownService.turndown(descriptionHTML ?? '')
        : jiraIssue?.fields?.summary ?? '';
      this.projectKey = jiraIssue?.fields?.project?.key;
      this.projectName = jiraIssue?.fields?.project?.name;
      this.fixVersions = _.map(jiraIssue?.fields?.fixVersions, (f) => f.name);
      this.priority = jiraIssue?.fields.priority?.name;
      this.status = jiraIssue?.fields.status?.name;
      this.summary = jiraIssue?.fields?.summary;
      this.dueDate = jiraIssue?.fields?.duedate ?? undefined;
      this.dataLoaded = Date.now();
      logger.debug(`JiraIssueObject:loadIssueData: Loaded issue data for ${this.key}`);
      logger.debug(`JiraIssueObject:loadIssueData: description\n${JSON.stringify(this.description)}`);
      return this;
    } catch (error) {
      const msg = `JiraIssueObject:loadIssueData: Failed to load issue data for ${this.key}: ${error}`;
      if (this.throwErrorOnLoadFail) {
        throw new Error(msg);
      } else {
        logger.error(msg);
        return this;
      }
    }
  }
}
