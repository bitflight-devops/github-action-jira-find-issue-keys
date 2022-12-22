import Jira from './Jira';
import ActionError, { isNodeError } from './action-error';
import { JiraIssueObject } from './jira-issue-object';
import { Arguments, ProjectFilter, ReferenceRange } from './types';
import {
  CommitHistoryConnection,
  Context,
  GitObject,
  graphqlType,
  Maybe,
  Ref as Reference,
  Repository,
} from './types/complex-types';
import { assignReferences, strictIssueIdRegEx, upperCaseFirst } from './utils';
import { core, logger, setOutput } from '@broadshield/github-actions-core-typed-inputs';
import {
  createOctokit,
  gql,
  OctokitInstance,
  createEnterpriseOctokit,
  EnterpriseServerVersions,
} from '@broadshield/github-actions-octokit-hydrated';
import { graphql } from '@octokit/graphql';
import includes from 'lodash/includes';
import isArray from 'lodash/isArray';
import isArrayLike from 'lodash/isArrayLike';
import isSet from 'lodash/isSet';
import isString from 'lodash/isString';
import join from 'lodash/join';
import map from 'lodash/map';
import replace from 'lodash/replace';
import split from 'lodash/split';
import startsWith from 'lodash/startsWith';
import toUpper from 'lodash/toUpper';
import trim from 'lodash/trim';
import uniq from 'lodash/uniq';
import { ok, Result } from 'neverthrow';

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
const GetStartAndEndPoints = gql`
  query getStartAndEndPoints($owner: String!, $repo: String!, $headRef: String!, $baseRef: String!) {
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
const listCommitMessagesInPullRequest = gql`
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

  jiraIssueKeysList: string[] = [];

  jiraIssueArray: JiraIssueObject[] = [];

  refRange!: ReferenceRange;

  includeMergeMessages: boolean;

  ignoreCommits: boolean;

  failOnError = false;

  listenForEvents: string[] = [];

  rawString: string;

  graphqlWithAuth: graphqlType;

  octokit: OctokitInstance;

  argv: Arguments;

  constructor(context: Context, jira: Jira, argv: Arguments) {
    JiraIssueObject.setJira(jira);
    this.jira = jira;
    this.argv = argv;
    this.graphqlWithAuth = graphql.defaults({
      baseUrl: argv.githubApiBaseUrl,
      headers: {
        authorization: `token ${argv.token}`,
      },
    });
    if (argv.octokit) {
      this.octokit = argv.octokit;
    } else if (argv.githubApiBaseUrl && argv.githubApiBaseUrl.length > 0) {
      logger.notice(`Using custom GitHub API base URL ${argv.githubApiBaseUrl} and logging in to an Enterprise Server`);
      this.octokit = createEnterpriseOctokit(
        argv.enterpriseServerVersion as keyof EnterpriseServerVersions,
        argv.token,
        {
          baseUrl: argv.githubApiBaseUrl,
        },
      );
    } else {
      this.octokit = createOctokit(argv.token);
    }

    this.context = context;
    this.failOnError = argv.failOnError;
    assignReferences(context, argv, this.octokit)
      .then((references) => {
        this.refRange = references;
        return this.refRange;
      })
      .catch((error) => logger.error(error));
    this.ignoreCommits = argv.ignoreCommits;
    this.includeMergeMessages = argv.includeMergeMessages;
    this.rawString = argv.string;
    this.filter = {
      projectsIncluded: map(split(argv.projects, ','), (index: string) => toUpper(trim(index))),
      projectsExcluded: map(split(argv.projectsIgnore, ','), (index: string) => toUpper(trim(index))),
    };
  }

  isProjectOfIssueSelected(issueKey?: string): boolean {
    const project = issueKey ? split(issueKey, '-')[0] : undefined;
    if (!project || project.length === 0) return false;
    if (this.filter.projectsExcluded && includes(this.filter.projectsExcluded, toUpper(project))) {
      logger.debug(`${issueKey} is excluded because of a specific project filter exclusion`);
      return false;
    }
    if (this.filter.projectsIncluded?.length === 0) {
      logger.debug(`${issueKey} is included because there is no specific project filter`);
      return true;
    }
    if (includes(this.filter.projectsIncluded, trim(toUpper(project)))) {
      logger.debug(`${issueKey} is included because its included in the specific project filter`);
      return true;
    }
    logger.debug(`${issueKey} is excluded because it doesn't belong to the included projects`);
    return false;
  }

  getIssuesFromString(providedString: string, _set?: Set<string>): string[] {
    const set = _set ?? new Set<string>();
    if (providedString) {
      const match = providedString.match(strictIssueIdRegEx);

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
      const project = split(issue, '-')[0];
      if (project) {
        projects.add(project);
      }
    }
    return projects;
  }

  static setToCommaDelimitedString(stringSet: Set<string> | string[] | string | undefined | null): string {
    if (stringSet) {
      if (isArray(stringSet)) {
        return join(stringSet, ',');
      }
      if (isSet(stringSet)) {
        return join([...stringSet], ',');
      }
      if (isString(stringSet)) {
        return stringSet;
      }
      return join([...stringSet], ',');
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

  async getJiraKeysFromGitRange(): Promise<Result<Set<string>, ActionError>> {
    const providedStringArray: string[] = this.getIssuesFromString(this.rawString);
    if (this.rawString) {
      logger.debug(`Raw string provided is: ${this.rawString}`);
      setOutput('string_issues', EventManager.setToCommaDelimitedString(providedStringArray));
    }
    const titleArray: string[] = this.getIssuesFromString(this.context.payload?.pull_request?.title);
    if (includes(this.context.eventName, 'pull_request')) {
      logger.debug(`Pull request title is: ${this.context.payload?.pull_request?.title}`);
      setOutput('title_issues', EventManager.setToCommaDelimitedString(titleArray));
    }
    const combinedArray: string[] = [];
    if (this.refRange && this.refRange.baseRef && this.refRange.headRef) {
      const refDetails = this.refRange
        ? `, Head Ref: ${this.refRange?.headRef}, Base Ref: ${this.refRange?.baseRef}`
        : '';
      logger.info(`EventName: ${this.context.eventName}${refDetails}`);
      logger.info(
        `getJiraKeysFromGitRange: Getting list of github commits between ${this.refRange?.baseRef} and ${this.refRange?.headRef}`,
      );
      const referenceArray: string[] = this.getIssuesFromString(this.refRange.headRef);
      setOutput('ref_issues', EventManager.setToCommaDelimitedString(referenceArray));
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
                    const m = commitNode.commit.message;
                    if (startsWith(m, 'Merge branch') || startsWith(m, 'Merge pull')) {
                      logger.debug('Commit message indicates that it is a merge');
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

          setOutput('commit_issues', EventManager.setToCommaDelimitedString(commitSet));
          combinedArray.push(...commitSet);
        }
      } catch (error) {
        new ActionError(`getJiraKeysFromGitRange:`, error).logError();
      }
    }

    const combinedSet = new Set<string>([...providedStringArray, ...titleArray, ...combinedArray]);
    this.jiraIssueKeysList = [...combinedSet];
    const projectsSet: Set<string> = EventManager.getProjectsFromIssuesSet(combinedSet);
    setOutput('issues', EventManager.setToCommaDelimitedString(combinedSet));
    setOutput('issue', combinedSet.size > 0 ? combinedSet.values().next().value : '');
    setOutput('projects_excluded', this.filter.projectsExcluded);
    setOutput('projects_included', this.filter.projectsIncluded);
    setOutput('projects_found', EventManager.setToCommaDelimitedString(projectsSet));
    if (this.context.payload.pull_request) {
      const issueListPromises = map(this.jiraIssueKeysList, async (issueKey) => JiraIssueObject.create(issueKey));
      this.jiraIssueArray = await Promise.all(issueListPromises);
      this.updatePullRequestBody();
    }
    return ok(combinedSet);
  }

  formattedIssueList(jiraIssuesListProvided?: JiraIssueObject[]): string[] {
    const jiraIssuesList = jiraIssuesListProvided ?? this.jiraIssueArray;
    if (jiraIssuesList && jiraIssuesList.length > 0) {
      return map(jiraIssuesList, (a) => {
        const ghFix = a?.ghNumber ? ` (Fix: # ${a.ghNumber})` : '';
        return `*  **[${a?.key}](${this.jira.baseUrl}/browse/${a?.key ?? 'unknown'})** [${
          a?.status ?? 'Jira Status Unknown'
        }] ${a?.summary ?? 'unknown'}${ghFix}`;
      });
    }
    return ['No Jira Issues Found'];
  }

  outputReleaseNotes(jiraIssuesListProvided?: JiraIssueObject[]): string {
    const jiraIssuesList = jiraIssuesListProvided ?? this.jiraIssueArray;
    const issues = this.formattedIssueList(jiraIssuesList);
    const issuesJoined = join(issues, '\n');
    setOutput('notes', `### Release Notes:\n\n${issuesJoined}`);
    setOutput('notes_raw', `${issuesJoined}`);
    core.summary.addHeading(`Release Notes`).addList(issues).write();
    return issuesJoined;
  }

  static updateStringByToken(startToken: string, endToken: string, fullText: string, insertText: string): string {
    const regex = new RegExp(
      `(?<start>\\[\\/]: \\/ "${startToken}"\\n)(?<text>(?:.|\\s)+)(?<end>\\n\\[\\/]: \\/ "${endToken}"(?:\\s)?)`,
      'gm',
    );

    if (regex.test(fullText)) {
      return replace(fullText, regex, `$1${insertText}$3`);
    }

    return `${trim(fullText)}\n\n[/]: / "${startToken}"\n${insertText}\n[/]: / "${endToken}"`;
  }

  static issueKeysFromList(jiraIssuesList: JiraIssueObject[]): string[] {
    if (isArrayLike(jiraIssuesList)) {
      return uniq(map(jiraIssuesList, 'key'));
    }
    return [];
  }

  async updatePullRequestBody(
    jiraIssuesListProvided?: JiraIssueObject[],
    startToken = 'JIRA-ISSUE-TEXT-START',
    endToken = 'JIRA-ISSUE-TEXT-END',
  ): Promise<any> {
    const jiraIssuesList = jiraIssuesListProvided ?? this.jiraIssueArray;
    if (!this.context.payload.pull_request) {
      logger.info(`Skipping pull request update, pull_request not found in current github context, or received event`);

      return;
    }
    const issues = this.formattedIssueList(jiraIssuesList);
    const text = `### Linked Jira Issues:\n\n${issues}\n`;

    const { number: pr_number, body, title } = this.context.payload.pull_request;

    logger.debug(`Updating PR number ${pr_number}`);
    logger.debug(`With text:\n ${text}`);

    let newTitle = trim(title);

    if (this.argv.update_pull_request) {
      logger.debug(`Current PR Title: ${title}`);

      const issueKeys = [...EventManager.issueKeysFromList(jiraIssuesList)];

      if (issueKeys.length > 0) {
        try {
          const re = /(?:(?:[ ,:[\]_|-]|^)*[A-Za-z]\w{2,8}[ _-]\d{3,5}(?:[ ,:[\]_|-]+|$))*(?<title>.*)$/;

          const { groups } = newTitle.match(re) || {};
          if (groups) {
            const titleString = upperCaseFirst(trim(groups.title));
            newTitle = `${join(issueKeys, ',')}: ${titleString}`.slice(0, 71);
            logger.debug(`Revised PR Title: ${newTitle}`);
            setOutput('title', `${titleString}`);
          }
        } catch (error) {
          if (isNodeError(error)) {
            logger.warning(error);
          }
        }
      } else {
        logger.debug(`No Jira Issues found, skipping PR title update`);
      }
      if (issues.length > 0) {
        const bodyUpdate = EventManager.updateStringByToken(startToken, endToken, body ?? '', text);

        return this.octokit.rest.pulls.update({
          ...this.context.repo,
          title: newTitle,
          body: bodyUpdate,
          pull_number: pr_number,
        });
      }
    }
  }
}
