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
import { assignReferences, normaliseKey, strictIssueIdRegEx, TitleCasePipe } from './utils';
import { core, logger, setOutput } from '@broadshield/github-actions-core-typed-inputs';
import {
  createOctokit,
  gql,
  OctokitInstance,
  createEnterpriseOctokit,
  EnterpriseServerVersions,
} from '@broadshield/github-actions-octokit-hydrated';
import { graphql } from '@octokit/graphql';
import compact from 'lodash/compact';
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
import { err, ok, Result } from 'neverthrow';

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

  jira?: Jira;

  jiraIssueKeysList: string[] = [];

  jiraIssueArray: JiraIssueObject[] = [];

  refRange!: ReferenceRange;

  includeMergeMessages: boolean;

  ignoreCommits: boolean;

  failOnError = false;

  listenForEvents: string[] = [];

  rawString: string;

  graphqlWithAuth: graphqlType;

  private octokitInstance?: OctokitInstance;

  argv: Arguments;

  constructor(context: Context, jira: Jira | undefined, argv: Arguments) {
    JiraIssueObject.setJira(jira);
    this.jira = jira;
    this.argv = argv;
    this.graphqlWithAuth = graphql.defaults({
      baseUrl: argv.githubApiBaseUrl,
      headers: argv.token ? { authorization: `token ${argv.token}` } : {},
    });
    this.octokitInstance = argv.octokit;

    this.context = context;
    this.failOnError = argv.failOnError;
    this.ignoreCommits = argv.ignoreCommits;
    this.includeMergeMessages = argv.includeMergeMessages;
    this.rawString = argv.string;
    this.filter = {
      projectsIncluded: map(compact(split(argv.projects, ',')), (index: string) => toUpper(trim(index))),
      projectsExcluded: map(compact(split(argv.projectsIgnore, ',')), (index: string) => toUpper(trim(index))),
    };
  }

  get octokit(): OctokitInstance {
    if (!this.octokitInstance) {
      if (!this.argv.token)
        throw new ActionError('A GitHub token is required to read commits or update a pull request');
      this.octokitInstance = this.argv.githubApiBaseUrl
        ? createEnterpriseOctokit(
            (this.argv.enterpriseServerVersion || '3.5') as keyof EnterpriseServerVersions,
            this.argv.token,
            { baseUrl: this.argv.githubApiBaseUrl },
          )
        : createOctokit(this.argv.token);
    }
    return this.octokitInstance;
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
          if (this.isProjectOfIssueSelected(normaliseKey(issueKey))) {
            set.add(normaliseKey(issueKey));
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
    const source = this.argv.from || 'commits';
    if (!includes(['all', 'string', 'branch', 'pull_request', 'commits'], source)) {
      return err(new ActionError(`Unsupported issue source: ${source}`));
    }
    const providedStringArray = source === 'string' || source === 'all' ? this.getIssuesFromString(this.rawString) : [];
    const titleArray =
      source === 'pull_request' || source === 'all'
        ? this.getIssuesFromString(this.context.payload?.pull_request?.title)
        : [];
    const headRef = this.argv.headRef || this.context.payload?.pull_request?.head?.ref || this.context.ref;
    const referenceArray =
      source === 'branch' || source === 'all' ? this.getIssuesFromString(replace(headRef || '', /\//g, ' ')) : [];
    const commitSet = new Set<string>();

    if ((source === 'commits' || source === 'all') && !this.ignoreCommits) {
      try {
        if (this.context.payload.pull_request) {
          if (!this.argv.token) throw new ActionError('A GitHub token is required to read pull request commits');
          let after: string | null = null;
          let hasNextPage = true;
          while (hasNextPage) {
            // eslint-disable-next-line no-await-in-loop
            const response: { repository: Repository } = await this.graphqlWithAuth<{ repository: Repository }>(
              listCommitMessagesInPullRequest,
              { ...this.context.repo, prNumber: this.context.payload.pull_request.number, after },
            );
            const commits: NonNullable<Repository['pullRequest']>['commits'] | undefined =
              response.repository?.pullRequest?.commits;
            if (!commits) throw new ActionError('GitHub did not return pull request commits');
            for (const node of commits.nodes || []) {
              if (node) this.addCommitIssues(node.commit.message, commitSet);
            }
            hasNextPage = commits.pageInfo.hasNextPage;
            const nextCursor = commits.pageInfo.endCursor || null;
            if (hasNextPage && (!nextCursor || nextCursor === after)) {
              throw new ActionError('GitHub returned a missing or repeated commit pagination cursor');
            }
            after = nextCursor;
          }
        } else {
          if (this.argv.baseRef || this.context.payload.before) {
            this.refRange = {
              baseRef: this.argv.baseRef || this.context.payload.before,
              headRef: this.argv.headRef || this.context.payload.after || this.context.ref,
            };
          } else if (this.context.payload.commits || this.context.payload.deleted) {
            this.refRange = {};
          } else {
            this.refRange = await assignReferences(this.context, this.argv, this.octokit);
          }
          const base = this.argv.baseRef || this.context.payload.before || this.refRange.baseRef;
          const head = this.argv.headRef || this.context.payload.after || this.refRange.headRef;
          if (this.context.payload.deleted || (head && /^0+$/.test(head))) {
            logger.info('The branch was deleted; there are no new commit messages to inspect');
          } else if (base && head && base !== head && !/^0+$/.test(base)) {
            let page = 1;
            let hasNextPage = true;
            while (hasNextPage) {
              // eslint-disable-next-line no-await-in-loop
              const { data } = await this.octokit.rest.repos.compareCommitsWithBasehead({
                ...this.context.repo,
                basehead: `${base}...${head}`,
                per_page: 100,
                page,
              });
              for (const commit of data.commits) this.addCommitIssues(commit.commit.message, commitSet);
              hasNextPage = data.commits.length === 100;
              page += 1;
            }
          } else {
            for (const commit of this.context.payload.commits || []) {
              this.addCommitIssues(commit.message, commitSet);
            }
          }
        }
      } catch (error) {
        return err(new ActionError('Failed to collect commit messages', error));
      }
    }

    const selected = {
      string: providedStringArray,
      branch: referenceArray,
      pull_request: titleArray,
      commits: [...commitSet],
      all: [...providedStringArray, ...titleArray, ...referenceArray, ...commitSet],
    };
    const combinedSet = new Set<string>(selected[source as keyof typeof selected]);
    this.jiraIssueKeysList = [...combinedSet];
    if (this.context.payload.pull_request && this.argv.update_pull_request) {
      try {
        this.jiraIssueArray = await Promise.all(
          map(this.jiraIssueKeysList, async (issueKey) => JiraIssueObject.create(issueKey, this.jira, true, true)),
        );
        await this.updatePullRequestBody();
      } catch (error) {
        return err(new ActionError('Failed to enrich Jira issues or update the pull request', error));
      }
    }
    setOutput('string_issues', EventManager.setToCommaDelimitedString(providedStringArray));
    setOutput('title_issues', EventManager.setToCommaDelimitedString(titleArray));
    setOutput('ref_issues', EventManager.setToCommaDelimitedString(referenceArray));
    setOutput('commit_issues', EventManager.setToCommaDelimitedString(commitSet));
    setOutput('issues', EventManager.setToCommaDelimitedString(combinedSet));
    setOutput('issue', combinedSet.size > 0 ? combinedSet.values().next().value : '');
    setOutput('projects_excluded', EventManager.setToCommaDelimitedString(this.filter.projectsExcluded));
    setOutput('projects_included', EventManager.setToCommaDelimitedString(this.filter.projectsIncluded));
    setOutput(
      'projects_found',
      EventManager.setToCommaDelimitedString(EventManager.getProjectsFromIssuesSet(combinedSet)),
    );
    return ok(combinedSet);
  }

  private addCommitIssues(message: string, issues: Set<string>): void {
    if (!this.includeMergeMessages && (startsWith(message, 'Merge branch') || startsWith(message, 'Merge pull'))) {
      return;
    }
    this.getIssuesFromString(message, issues);
  }

  formattedIssueList(jiraIssuesListProvided?: JiraIssueObject[]): string[] {
    const jiraIssuesList = jiraIssuesListProvided ?? this.jiraIssueArray;
    if (jiraIssuesList && jiraIssuesList.length > 0) {
      return map(jiraIssuesList, (a) => {
        const ghFix = a?.ghNumber ? ` (Fix: # ${a.ghNumber})` : '';
        return `*  **[${a?.key}](${this.jira?.baseUrl}/browse/${a?.key ?? 'unknown'})** [${
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
      return replace(fullText, regex, (_match, start, _text, end) => `${start}${insertText}${end}`);
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
    const text = `### Linked Jira Issues:\n\n${join(issues, '\n')}\n`;

    const { number: pr_number, body, title } = this.context.payload.pull_request;

    logger.debug(`Updating PR number ${pr_number}`);
    logger.debug(`With text:\n ${text}`);

    let newTitle = trim(title);
    let titleOutput: string | undefined;

    if (this.argv.update_pull_request) {
      logger.debug(`Current PR Title: ${title}`);

      const issueKeys = [...EventManager.issueKeysFromList(jiraIssuesList)];

      if (issueKeys.length > 0) {
        try {
          const re =
            /(?:^|[ [])*(?<=^|[a-z]-|[\s&P[\]^cnptu{}\-])([A-Za-z]\w*[ \-]\d+)(?![^\W_])[ ,:[\]|\-]*(?<title>.*)$/;

          const { groups } = newTitle.match(re) || {};
          if (groups) {
            const titleString = TitleCasePipe(replace(trim(groups.title), /\s+/g, ' '));
            newTitle = `${join(issueKeys, ',')}: ${titleString}`.slice(0, 71);
            logger.debug(`Revised PR Title: ${newTitle}`);
            titleOutput = titleString ?? '';
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

        const updated = await this.octokit.rest.pulls.update({
          ...this.context.repo,
          title: newTitle,
          body: bodyUpdate,
          pull_number: pr_number,
        });
        if (titleOutput !== undefined) setOutput('title', titleOutput);
        return updated;
      }
    }
  }
}
