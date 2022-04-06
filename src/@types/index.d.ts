export interface JiraConfig {
  baseUrl: string;
  token: string;
  email: string;
  transitionId?: string;
  project?: string;
  issuetype?: string;
  summary?: string;
  description?: string;
  issue?: string;
}
export interface Args {
  token: string;
  string: string;
  headRef?: string;
  baseRef?: string;
  projects?: string;
  projectsIgnore?: string;
  includeMergeMessages: boolean;
  ignoreCommits: boolean;
  failOnError: boolean;
  config: JiraAuthConfig;
}

export interface JiraAuthConfig {
  baseUrl: string;
  token: string;
  email: string;
}

export interface RefRange {
  headRef: string;
  baseRef: string;
}
