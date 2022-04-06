import * as core from '@actions/core';
import * as path from 'path';

import { Args, JiraAuthConfig } from './@types';
import * as fsHelper from './fs-helper';

export function getInputs(): Args {
  const obj = {} as unknown;
  const result = obj as Args;
  const jiraConfig = obj as JiraAuthConfig;

  jiraConfig.baseUrl = process.env.JIRA_BASE_URL || core.getInput('jira_base_url') || '';
  if (!jiraConfig.baseUrl || jiraConfig.baseUrl === '') {
    throw new Error('JIRA_BASE_URL env not defined, or supplied as action input jira_base_url');
  }
  jiraConfig.token = process.env.JIRA_API_TOKEN || core.getInput('jira_api_token') || '';
  if (!jiraConfig.token || jiraConfig.token === '') {
    throw new Error('JIRA_API_TOKEN env not defined, or supplied as action input jira_api_token');
  }
  jiraConfig.email = process.env.JIRA_USER_EMAIL || core.getInput('jira_user_email') || '';
  if (!jiraConfig.email || jiraConfig.email === '') {
    throw new Error('JIRA_USER_EMAIL env not defined, or supplied as action input jira_user_email');
  }

  result.config = jiraConfig;
  result.token = core.getInput('token') || process.env.GITHUB_TOKEN || '';
  result.string = core.getInput('string');
  result.baseRef = core.getInput('base_ref');
  result.headRef = core.getInput('head_ref');
  result.projects = core.getInput('projects');
  result.projectsIgnore = core.getInput('projects_ignore');
  result.includeMergeMessages = core.getBooleanInput('include_merge_messages');
  result.ignoreCommits = core.getBooleanInput('ignore_commits');
  result.failOnError = core.getInput('fail_on_error') === 'true';

  // GitHub workspace
  let githubWorkspacePath = process.env.GITHUB_WORKSPACE;
  if (!githubWorkspacePath) {
    throw new Error('GITHUB_WORKSPACE not defined');
  }
  githubWorkspacePath = path.resolve(githubWorkspacePath);
  core.debug(`GITHUB_WORKSPACE = '${githubWorkspacePath}'`);
  fsHelper.directoryExistsSync(githubWorkspacePath, true);

  return result;
}
