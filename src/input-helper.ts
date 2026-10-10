import * as fsHelper from './fs-helper';
import { Arguments, ArgumentsIndex, JiraAuthConfig, JiraConfig } from './types';
import { getBooleanInput, getStringInput, logger } from '@broadshield/github-actions-core-typed-inputs';

export default function inputHelper(): Arguments {
  const result: ArgumentsIndex = {};
  const updatePullRequest = getBooleanInput('update_pull_request', false);
  const jiraConfigBase: JiraConfig = updatePullRequest ? fsHelper.readJiraConfig() : {};
  const jiraConfig: JiraConfig = {
    baseUrl: getStringInput('jira_base_url', process.env.JIRA_BASE_URL || jiraConfigBase?.baseUrl),
    token: getStringInput('jira_api_token', process.env.JIRA_API_TOKEN || jiraConfigBase?.token),
    email: getStringInput('jira_user_email', process.env.JIRA_USER_EMAIL || jiraConfigBase?.email),
  };
  result.config = jiraConfig as JiraAuthConfig;
  result.githubApiBaseUrl = getStringInput('github_api_url');
  result.token = getStringInput('token', process.env.GITHUB_TOKEN || '');
  result.enterpriseServerVersion = getStringInput('github_enterprise_server_version', '3.5');
  result.string = getStringInput('string');
  result.from = getStringInput('from', 'commits');
  result.baseRef = getStringInput('base_ref');
  result.headRef = getStringInput('head_ref');
  result.projects = getStringInput('projects');
  result.projectsIgnore = getStringInput('projects_ignore');
  result.includeMergeMessages = getBooleanInput('include_merge_messages');
  result.ignoreCommits = getBooleanInput('ignore_commits');
  result.failOnError = getBooleanInput('fail_on_error');
  result.update_pull_request = updatePullRequest;
  logger.debug(`Issue source: ${result.from}`);
  return result as Arguments;
}
