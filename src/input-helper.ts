import * as core from '@actions/core';

import * as fsHelper from './fs-helper';
import { Arguments, JiraAuthConfig, JiraConfig } from './types';
import { undefinedOnEmpty } from './utils';

export default function inputHelper(): Arguments {
  const object = {} as unknown;
  const result = object as Arguments;
  const jiraConfigBase: JiraConfig = fsHelper.readJiraConfig();
  const jiraConfig: JiraConfig = {
    baseUrl: process.env.JIRA_BASE_URL || undefinedOnEmpty(core.getInput('jira_base_url')) || jiraConfigBase?.baseUrl,
    token: process.env.JIRA_API_TOKEN || undefinedOnEmpty(core.getInput('jira_api_token')) || jiraConfigBase?.token,
    email: process.env.JIRA_USER_EMAIL || undefinedOnEmpty(core.getInput('jira_user_email')) || jiraConfigBase?.email,
  };

  result.config = jiraConfig as JiraAuthConfig;
  result.githubApiBaseUrl = undefinedOnEmpty(core.getInput('github_api_url')) || process.env.GITHUB_API_URL;
  result.token =
    undefinedOnEmpty(core.getInput('token')) ||
    undefinedOnEmpty(core.getInput('github_token')) ||
    process.env.GITHUB_TOKEN ||
    'NO_TOKEN';
  result.enterpriseServerVersion = core.getInput('github_enterprise_server_version').split('.').join('');
  result.string = undefinedOnEmpty(core.getInput('string')) ?? '';
  result.baseRef = undefinedOnEmpty(core.getInput('base_ref'));
  result.headRef = undefinedOnEmpty(core.getInput('head_ref'));
  result.projects = undefinedOnEmpty(core.getInput('projects'));
  result.projectsIgnore = undefinedOnEmpty(core.getInput('projects_ignore'));
  result.includeMergeMessages = core.getBooleanInput('include_merge_messages');
  result.ignoreCommits = core.getBooleanInput('ignore_commits');
  result.failOnError = core.getBooleanInput('fail_on_error');

  return result;
}
