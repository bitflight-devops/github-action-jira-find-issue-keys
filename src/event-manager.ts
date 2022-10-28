import * as core from '@actions/core';
import * as github from '@actions/github';
import { graphql } from '@octokit/graphql';
import {
  enterpriseServer32,
  enterpriseServer33,
  enterpriseServer34,
  enterpriseServer35,
} from '@octokit/plugin-enterprise-server';
import { ok, Result } from 'neverthrow';

import ActionError from './action-error';
import Jira from './Jira';
import { Arguments, ProjectFilter, ReferenceRange } from './types';
import {
  CommitHistoryConnection,
  Context,
  getOctokitOptions,
  GitHub,
  GithubOctokitType,
  GitObject,
  graphqlType,
  Maybe,
  Ref as Reference,
  Repository,
} from './types/complex-types';
import { assignReferences, issueIdRegEx } from './utils';

interface CommitHistory extends GitObject {
  history?: Maybe<CommitHistoryConnection>;
}
interface ReferenceCommits extends Reference {
  target?: Maybe<CommitHistory>;
}
interface RepositoryDateRange extends Repository {
  startPoint?: Maybe<ReferenceCommits>;
  endPoint?: Maybe<ReferenceCommits>;
}

interface DateRange {
  startDate: string;
  endDate: string;
}
const GetStartAndEndPoints = `
query getStartAndEndPoints($owner: String!, $repo: String!, $headRef: String!,$baseRef: String!) {
  repository(owner: $owner, name: $repo) {
    endPoint: ref(qualifiedName: $headRef) {
      ...internalBranchContent
    }
    startPoint: ref(qualifiedName: $baseRef) {
      ...internalBranchContent
    }
  }
}

fragment internalBranchContent on Ref {
  target {
    ... on Commit {
      history(first: 1) {
        edges {
          node {
            committedDate
          }
        }
      }
    }
  }
}
`;
const listCommitMessagesInPullRequest = `
query listCommitMessagesInPullRequest($owner: String!, $repo: String!, $prNumber: Int!, $after: String) {
  repository(owner: $owner, name: $repo) {
    pullRequest(number: $prNumber) {
      baseRef {
        name
      }
      headRef {
        name
      }
      commits(first: 100, after: $after) {
        nodes {
          commit {
            message
          }
        }
        pageInfo {
          startCursor
          hasNextPage
          endCursor
        }
      }
    }
  }
}
`;

export default class EventManager {
  context: Context;

  filter: ProjectFilter;

  jira: Jira;

  refRange!: ReferenceRange;

  includeMergeMessages: boolean;

  ignoreCommits: boolean;

  failOnError = false;

  listenForEvents: string[] = [];

  rawString: string;

  graphqlWithAuth: graphqlType;

  octokit: GithubOctokitType;

  constructor(context: Context, jira: Jira, argv: Arguments) {
    this.jira = jira;
    this.graphqlWithAuth = graphql.defaults({
      baseUrl: argv.githubApiBaseUrl,
      headers: {
        authorization: `token ${argv.token}`,
      },
    });
    if (argv.githubApiBaseUrl && argv.githubApiBaseUrl.length > 0) {
      core.notice(`Using custom GitHub API base URL ${argv.githubApiBaseUrl} and logging in to an Enterprise Server`);
      const OctokitEnt = GitHub.plugin(EventManager.enterpriseServerPlugin(argv.enterpriseServerVersion));
      this.octokit = new OctokitEnt(getOctokitOptions(argv.token));
    } else {
      this.octokit = github.getOctokit(argv.token);
    }

    this.context = context;
    this.failOnError = argv.failOnError;
    assignReferences(context, argv, this.octokit)
      .then((references) => {
        this.refRange = references;
        return this.refRange;
      })
      .catch((error) => core.error(error));
    this.ignoreCommits = argv.ignoreCommits;
    this.includeMergeMessages = argv.includeMergeMessages;
    this.rawString = argv.string;
    this.filter = {
      projectsIncluded: argv.projects.split(',').map((index: string) => index.trim().toUpperCase()),
      projectsExcluded: argv.projectsIgnore.split(',').map((index: string) => index.trim().toUpperCase()),
    };
  }

  static enterpriseServerPlugin(version: string): typeof enterpriseServer35 {
    switch (version) {
      case '35': {
        return enterpriseServer35;
      }
      case '34': {
        return enterpriseServer34;
      }
      case '33': {
        return enterpriseServer33;
      }
      case '32': {
        return enterpriseServer32;
      }
      default: {
        return enterpriseServer35;
      }
    }
  }

  isProjectOfIssueSelected(issueKey?: string): boolean {
    const project = issueKey ? issueKey.split('-')[0] : undefined;
    if (!project || project.length === 0) return false;
    if (this.filter.projectsExcluded && this.filter.projectsExcluded.includes(project.toUpperCase())) {
      core.debug(`${issueKey} is excluded because of a specific project filter exclusion`);
      return false;
    }
    if (this.filter.projectsIncluded?.length === 0) {
      core.debug(`${issueKey} is included because there is no specific project filter`);
      return true;
    }
    if (this.filter.projectsIncluded.includes(project.trim().toUpperCase())) {
      core.debug(`${issueKey} is included because there its part of the specific project filter`);
      return true;
    }
    core.debug(`${issueKey} is excluded because it doesn't belong to the included projects`);
    return false;
  }

  getIssuesFromString(providedString: string, _set?: Set<string>): string[] {
    const set = _set ?? new Set<string>();
    if (providedString) {
      const match = providedString.match(issueIdRegEx);

      if (match) {
        for (const issueKey of match) {
          if (this.isProjectOfIssueSelected(issueKey)) {
            set.add(issueKey);
          }
        }
      }
    }
    return [...set];
  }

  static getProjectsFromIssuesSet(issues: Set<string>): Set<string> {
    const projects = new Set<string>();
    for (const issue of issues) {
      const project = issue.split('-')[0];
      if (project) {
        projects.add(project);
      }
    }
    return projects;
  }

  static setToCommaDelimitedString(stringSet: Set<string> | string[] | string | undefined | null): string {
    if (stringSet) {
      if (Array.isArray(stringSet)) {
        return stringSet.join(',');
      }
      if (stringSet.toString() === '[object Set]') {
        return [...stringSet].join(',');
      }
      if (typeof stringSet === 'string') {
        return stringSet;
      }
      return [...stringSet].join(',');
    }
    return '';
  }

  async getStartAndEndDates(range: ReferenceRange): Promise<DateRange> {
    const { repository } = await this.graphqlWithAuth<{ repository: RepositoryDateRange }>(GetStartAndEndPoints, {
      ...this.context.repo,
      ...range,
    });
    const startDateList = repository?.startPoint?.target?.history?.edges;
    const startDate = startDateList ? startDateList[0]?.node?.committedDate : '';
    const endDateList = repository?.endPoint?.target?.history?.edges;
    const endDate = endDateList ? endDateList[0]?.node?.committedDate : '';
    return { startDate, endDate };
  }

  async getJiraKeysFromGitRange(): Promise<Result<boolean, ActionError>> {
    const providedStringArray: string[] = this.getIssuesFromString(this.rawString);
    if (this.rawString) {
      core.debug(`Raw string provided is: ${this.rawString}`);
      core.setOutput('string_issues', EventManager.setToCommaDelimitedString(providedStringArray));
    }
    const titleArray: string[] = this.getIssuesFromString(this.context.payload?.pull_request?.title);
    if (this.context.eventName.startsWith('pull_request')) {
      core.debug(`Pull request title is: ${this.context.payload?.pull_request?.title}`);
      core.setOutput('title_issues', EventManager.setToCommaDelimitedString(titleArray));
    }
    const combinedArray: string[] = [];
    if (this.refRange && this.refRange.baseRef && this.refRange.headRef) {
      const refDetails = this.refRange
        ? `, Head Ref: ${this.refRange?.headRef}, Base Ref: ${this.refRange?.baseRef}`
        : '';
      core.info(`EventName: ${this.context.eventName}${refDetails}`);
      core.info(
        `getJiraKeysFromGitRange: Getting list of github commits between ${this.refRange?.baseRef} and ${this.refRange?.headRef}`,
      );
      const referenceArray: string[] = this.getIssuesFromString(this.refRange.headRef);
      core.setOutput('ref_issues', EventManager.setToCommaDelimitedString(referenceArray));
      combinedArray.push(...referenceArray);

      const commitSet = new Set<string>();
      let after: string | null = null;
      try {
        if (!this.ignoreCommits) {
          let hasNextPage = !!this.context.payload?.pull_request?.number;

          while (hasNextPage) {
            // eslint-disable-next-line no-await-in-loop
            const { repository } = await this.graphqlWithAuth<{ repository: Repository }>(
              listCommitMessagesInPullRequest,
              {
                owner: this.context.repo.owner,
                repo: this.context.repo.repo,
                prNumber: this.context.payload?.pull_request?.number,
                after,
              },
            );
            if ((repository?.pullRequest?.commits?.totalCount as number) === 0) {
              hasNextPage = false;
            } else {
              hasNextPage = repository?.pullRequest?.commits?.pageInfo.hasNextPage as boolean;
              after = repository?.pullRequest?.commits?.pageInfo.endCursor as string | null;
              if (repository?.pullRequest?.commits?.nodes) {
                // eslint-disable-next-line no-await-in-loop
                for (const commitNode of repository.pullRequest.commits.nodes) {
                  if (commitNode) {
                    let skipCommit = false;
                    if (
                      commitNode.commit.message.startsWith('Merge branch') ||
                      commitNode.commit.message.startsWith('Merge pull')
                    ) {
                      core.debug('Commit message indicates that it is a merge');
                      if (!this.includeMergeMessages) {
                        skipCommit = true;
                      }
                    }
                    if (skipCommit === false) {
                      this.getIssuesFromString(commitNode.commit.message, commitSet);
                    }
                  }
                }
              }
            }
          }

          core.setOutput('commit_issues', EventManager.setToCommaDelimitedString(commitSet));
          combinedArray.push(...commitSet);
        }
      } catch (error) {
        new ActionError(`getJiraKeysFromGitRange:`, error).logError();
      }
    }

    const combinedSet = new Set<string>([...providedStringArray, ...titleArray, ...combinedArray]);

    const projectsSet: Set<string> = EventManager.getProjectsFromIssuesSet(combinedSet);
    core.setOutput('issues', EventManager.setToCommaDelimitedString(combinedSet));
    core.setOutput('issue', combinedSet.size > 0 ? combinedSet.values().next().value : '');
    core.setOutput('projects_excluded', this.filter.projectsExcluded);
    core.setOutput('projects_included', this.filter.projectsIncluded);
    core.setOutput('projects_found', EventManager.setToCommaDelimitedString(projectsSet));
    return ok(true);
  }
}
