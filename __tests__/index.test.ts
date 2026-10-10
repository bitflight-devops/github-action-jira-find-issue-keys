import Jira from '../src/Jira';
import Action from '../src/action';
import { Arguments } from '../src/types';
import { normaliseKey, strictIssueIdRegEx } from '../src/utils';
import * as ghac from '@broadshield/github-actions-core-typed-inputs';
import assign from 'lodash/assign';
import repeat from 'lodash/repeat';

jest.mock('@broadshield/github-actions-core-typed-inputs', () => ({
  ...jest.requireActual('@broadshield/github-actions-core-typed-inputs'),
  setOutput: jest.fn(),
}));

const originalContext = { ...ghac.context };
const jiraConfig = { baseUrl: 'https://jira.example', email: 'test', token: 'test' };
const issueSummary = 'Test issue';
const enrichmentTitle = 'DVPS-336: Title';

function args(overrides: Partial<Arguments> = {}): Arguments {
  return {
    from: 'string',
    token: 'test-token',
    string: 'DVPS-336 and OTHER-513 and DVPS-336',
    projects: '',
    projectsIgnore: '',
    includeMergeMessages: false,
    ignoreCommits: false,
    failOnError: true,
    update_pull_request: false,
    enterpriseServerVersion: '3.5',
    config: { baseUrl: '', token: '', email: '' },
    ...overrides,
  };
}

function action(overrides: Partial<Arguments> = {}): Action {
  return new Action(ghac.context, args(overrides));
}

describe('issue extraction', () => {
  beforeEach(() => {
    jest.spyOn(ghac.context, 'repo', 'get').mockReturnValue({ owner: 'example', repo: 'example' });
    jest.clearAllMocks();
    ghac.context.eventName = 'push';
    ghac.context.ref = 'refs/heads/FEATURE-23';
    ghac.context.payload = {};
  });

  afterEach(() => {
    assign(ghac.context, originalContext);
    jest.restoreAllMocks();
  });

  it('normalizes issue keys', () => {
    const match = strictIssueIdRegEx.exec('[unicOrn 10183],[UNICORN-10183|- deviceLimitSupportUrl');
    expect(match).toBeTruthy();
    for (const key of match || []) expect(normaliseKey(key)).toMatch(/UNICORN-\d+/);
  });

  it('extracts and deduplicates strings without Jira credentials', async () => {
    const result = await action().execute();
    expect(result._unsafeUnwrap()).toEqual(new Set(['DVPS-336', 'OTHER-513']));
    expect(ghac.setOutput).toHaveBeenCalledWith('issues', 'DVPS-336,OTHER-513');
  });

  it('applies include and exclude project filters', async () => {
    const result = await action({ projects: 'DVPS,OTHER', projectsIgnore: 'OTHER' }).execute();
    expect(result._unsafeUnwrap()).toEqual(new Set(['DVPS-336']));
    expect(ghac.setOutput).toHaveBeenCalledWith('projects_included', 'DVPS,OTHER');
    expect(ghac.setOutput).toHaveBeenCalledWith('projects_excluded', 'OTHER');
  });

  it('returns empty outputs when no keys match', async () => {
    const result = await action({ projects: 'MISSING' }).execute();
    expect(result._unsafeUnwrap()).toEqual(new Set());
    expect(ghac.setOutput).toHaveBeenCalledWith('issue', '');
  });

  it('extracts from a branch without looking up releases', async () => {
    const result = await action({ from: 'branch', token: '' }).execute();
    expect(result._unsafeUnwrap()).toEqual(new Set(['FEATURE-23']));
  });

  it('uses an explicit branch reference', async () => {
    const result = await action({ from: 'branch', headRef: 'refs/heads/CUSTOM-51' }).execute();
    expect(result._unsafeUnwrap()).toEqual(new Set(['CUSTOM-51']));
  });

  it('extracts PR titles without Jira or commit requests', async () => {
    ghac.context.eventName = 'pull_request';
    ghac.context.payload = {
      pull_request: { number: 25, title: 'TITLE-42', head: { ref: 'HEAD-10' }, base: { ref: 'main' } },
    };
    const result = await action({ from: 'pull_request', token: '' }).execute();
    expect(result._unsafeUnwrap()).toEqual(new Set(['TITLE-42']));
    expect(ghac.setOutput).toHaveBeenCalledWith('string_issues', '');
    expect(ghac.setOutput).toHaveBeenCalledWith('ref_issues', '');
  });

  it('combines sources only when all is requested and honors ignore_commits', async () => {
    ghac.context.payload = {
      pull_request: { number: 25, title: 'TITLE-42 DVPS-336', head: { ref: 'feature/HEAD-10' } },
    };
    const result = await action({ from: 'all', ignoreCommits: true, token: '' }).execute();
    expect(result._unsafeUnwrap()).toEqual(new Set(['DVPS-336', 'OTHER-513', 'TITLE-42', 'HEAD-10']));
    expect(ghac.setOutput).toHaveBeenCalledWith('commit_issues', '');
  });

  it('defaults to commits and rejects unsupported sources', async () => {
    ghac.context.payload = { commits: [{ message: 'COMMIT-17' }] };
    const result = await action({ from: undefined }).execute();
    expect(result._unsafeUnwrap()).toEqual(new Set(['COMMIT-17']));
    const invalid = await action({ from: 'typo' }).execute();
    expect(invalid.isErr()).toBe(true);
  });

  it('reads every page of PR commits and excludes merge messages', async () => {
    ghac.context.payload = { pull_request: { number: 25, title: 'TITLE-42' } };
    const instance = action({ from: 'commits' });
    const query = jest
      .spyOn(instance.eventManager, 'graphqlWithAuth')
      .mockResolvedValueOnce({
        repository: {
          pullRequest: {
            commits: {
              nodes: [{ commit: { message: 'COMMIT-1' } }],
              pageInfo: { hasNextPage: true, endCursor: 'next' },
            },
          },
        },
      })
      .mockResolvedValueOnce({
        repository: {
          pullRequest: {
            commits: {
              nodes: [{ commit: { message: 'Merge branch MERGE-2' } }, { commit: { message: 'COMMIT-3' } }],
              pageInfo: { hasNextPage: false },
            },
          },
        },
      });
    const result = await instance.execute();
    expect(result._unsafeUnwrap()).toEqual(new Set(['COMMIT-1', 'COMMIT-3']));
    expect(query).toHaveBeenCalledTimes(2);
    expect(query.mock.calls[1][1]?.after).toBe('next');
  });

  it('reports GitHub failures instead of returning partial success', async () => {
    ghac.context.payload = { pull_request: { number: 25 } };
    const instance = action({ from: 'commits' });
    jest.spyOn(instance.eventManager, 'graphqlWithAuth').mockRejectedValue(new Error('API unavailable'));
    const result = await instance.execute();
    expect(result.isErr()).toBe(true);
  });

  it('fails on invalid GitHub pagination instead of hanging or omitting commits', async () => {
    ghac.context.payload = { pull_request: { number: 25 } };
    const instance = action({ from: 'commits' });
    jest.spyOn(instance.eventManager, 'graphqlWithAuth').mockResolvedValue({
      repository: { pullRequest: { commits: { nodes: [], pageInfo: { hasNextPage: true, endCursor: null } } } },
    });
    const result = await instance.execute();
    expect(result.isErr()).toBe(true);
    expect(ghac.setOutput).not.toHaveBeenCalledWith('issues', expect.anything());
  });

  it('reads pushed commits from the explicit comparison range', async () => {
    const instance = action({ from: 'commits', baseRef: 'before', headRef: 'after' });
    const compare = jest.spyOn(instance.eventManager.octokit.rest.repos, 'compareCommitsWithBasehead');
    compare.mockResolvedValue({ data: { commits: [{ commit: { message: 'PUSH-19' } }] } } as Awaited<
      ReturnType<typeof instance.eventManager.octokit.rest.repos.compareCommitsWithBasehead>
    >);
    const result = await instance.execute();
    expect(result._unsafeUnwrap()).toEqual(new Set(['PUSH-19']));
    expect(compare).toHaveBeenCalledWith(expect.objectContaining({ basehead: 'before...after', page: 1 }));
  });

  it('can include merge commits', async () => {
    ghac.context.payload = { commits: [{ message: 'Merge branch MERGE-2' }] };
    const result = await action({ from: 'commits', includeMergeMessages: true }).execute();
    expect(result._unsafeUnwrap()).toEqual(new Set(['MERGE-2']));
  });

  it('uses supplied commits when a push creates a branch and skips deleted branches', async () => {
    ghac.context.payload = { before: repeat('0', 40), after: 'new-head', commits: [{ message: 'NEW-8' }] };
    const created = await action({ from: 'commits', token: '' }).execute();
    expect(created._unsafeUnwrap()).toEqual(new Set(['NEW-8']));
    ghac.context.payload = { before: 'old-head', after: repeat('0', 40), deleted: true };
    const deleted = await action({ from: 'commits', token: '' }).execute();
    expect(deleted._unsafeUnwrap()).toEqual(new Set());
  });

  it('requires Jira credentials when enrichment is requested', () => {
    ghac.context.payload = { pull_request: { number: 25 } };
    expect(() => action({ update_pull_request: true })).toThrow('Failed to create Jira instance');
  });

  it('skips PR enrichment on non-PR events without requiring Jira credentials', async () => {
    const result = await action({ update_pull_request: true, token: '' }).execute();
    expect(result._unsafeUnwrap()).toEqual(new Set(['DVPS-336', 'OTHER-513']));
  });

  it('awaits PR enrichment and updates using Jira issue details', async () => {
    ghac.context.payload = { pull_request: { number: 25, title: 'DVPS-336 - the title', body: 'Original body' } };
    const instance = action({
      from: 'pull_request',
      update_pull_request: true,
      config: jiraConfig,
    });
    jest.spyOn(Jira.prototype, 'getIssue').mockResolvedValue({
      id: '10001',
      key: 'DVPS-336',
      fields: { summary: issueSummary, status: { name: 'Testing' }, project: { key: 'DVPS' } },
    } as unknown as Awaited<ReturnType<Jira['getIssue']>>);
    const update = jest.spyOn(instance.eventManager.octokit.rest.pulls, 'update');
    update.mockResolvedValue({} as Awaited<ReturnType<typeof instance.eventManager.octokit.rest.pulls.update>>);
    const result = await instance.execute();
    expect(result._unsafeUnwrap()).toEqual(new Set(['DVPS-336']));
    expect(update).toHaveBeenCalledWith(
      expect.objectContaining({
        pull_number: 25,
        body: expect.stringContaining('https://jira.example/browse/DVPS-336'),
      }),
    );
  });

  it('does not complete before GitHub accepts the update', async () => {
    ghac.context.payload = { pull_request: { number: 25, title: enrichmentTitle, body: 'Original body' } };
    const instance = action({ from: 'pull_request', update_pull_request: true, config: jiraConfig });
    jest.spyOn(Jira.prototype, 'getIssue').mockResolvedValue({
      key: 'DVPS-336',
      fields: { summary: issueSummary, status: { name: 'Open' }, project: { key: 'DVPS' } },
    } as unknown as Awaited<ReturnType<Jira['getIssue']>>);
    type UpdateResponse = Awaited<ReturnType<typeof instance.eventManager.octokit.rest.pulls.update>>;
    let acceptUpdate!: (value: UpdateResponse) => void;
    let enteredUpdate!: () => void;
    const entered = new Promise<void>((resolve) => {
      enteredUpdate = resolve;
    });
    const response = new Promise<UpdateResponse>((resolve) => {
      acceptUpdate = resolve;
    });
    jest.spyOn(instance.eventManager.octokit.rest.pulls, 'update').mockImplementation(async () => {
      enteredUpdate();
      return response;
    });
    let completed = false;
    const execution = instance.execute().then((result) => {
      completed = true;
      return result;
    });
    await entered;
    await Promise.resolve();
    expect(completed).toBe(false);
    expect(ghac.setOutput).not.toHaveBeenCalledWith('issues', expect.anything());
    acceptUpdate({} as UpdateResponse);
    const result = await execution;
    expect(result._unsafeUnwrap()).toEqual(new Set(['DVPS-336']));
  });

  it('propagates Jira lookup failures and never updates GitHub with missing details', async () => {
    ghac.context.payload = { pull_request: { number: 25, title: enrichmentTitle } };
    const instance = action({ from: 'pull_request', update_pull_request: true, config: jiraConfig });
    jest.spyOn(Jira.prototype, 'getIssue').mockRejectedValue(new Error('Issue not found'));
    const update = jest.spyOn(instance.eventManager.octokit.rest.pulls, 'update');
    const result = await instance.execute();
    expect(result.isErr()).toBe(true);
    expect(update).not.toHaveBeenCalled();
    expect(ghac.setOutput).not.toHaveBeenCalledWith('issues', expect.anything());
  });

  it('propagates a rejected GitHub PR update', async () => {
    ghac.context.payload = { pull_request: { number: 25, title: enrichmentTitle } };
    const instance = action({ from: 'pull_request', update_pull_request: true, config: jiraConfig });
    jest.spyOn(Jira.prototype, 'getIssue').mockResolvedValue({
      key: 'DVPS-336',
      fields: { summary: issueSummary, status: { name: 'Open' }, project: { key: 'DVPS' } },
    } as unknown as Awaited<ReturnType<Jira['getIssue']>>);
    jest.spyOn(instance.eventManager.octokit.rest.pulls, 'update').mockRejectedValue(new Error('Permission denied'));
    const result = await instance.execute();
    expect(result.isErr()).toBe(true);
    expect(ghac.setOutput).not.toHaveBeenCalledWith('issues', expect.anything());
  });
});
