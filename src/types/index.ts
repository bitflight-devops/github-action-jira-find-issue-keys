import { OctokitInstance } from '@broadshield/github-actions-octokit-hydrated';

export interface JiraConfig {
  [key: string]: string | undefined;
  baseUrl?: string;
  token?: string;
  email?: string;
  transitionId?: string;
  project?: string;
  issuetype?: string;
  summary?: string;
  description?: string;
  issue?: string;
}
export interface JiraAuthConfig {
  [index: string]: string | undefined;
  baseUrl: string;
  token: string;
  email: string;
  string?: string;
}
export interface ArgumentsIndex {
  [index: string]: string | boolean | JiraAuthConfig | undefined | OctokitInstance;
}
export interface Arguments extends ArgumentsIndex {
  token: string;
  string: string;
  headRef?: string;
  baseRef?: string;
  projects: string;
  projectsIgnore: string;
  includeMergeMessages: boolean;
  ignoreCommits: boolean;
  failOnError: boolean;
  config: JiraAuthConfig;
  githubApiBaseUrl?: string;
  enterpriseServerVersion: string;
  octokit?: OctokitInstance;
}

export interface ReferenceRange {
  headRef?: string;
  baseRef?: string;
}

export interface ProjectFilter {
  projectsIncluded: string[];
  projectsExcluded: string[];
}
