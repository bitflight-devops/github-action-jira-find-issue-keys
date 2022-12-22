import Action from '../src/action';
import inputHelper from '../src/input-helper';
import { Arguments } from '../src/types';
import { normaliseKey, strictIssueIdRegEx } from '../src/utils';
import * as ghac from '@broadshield/github-actions-core-typed-inputs';
import { createOctokit } from '@broadshield/github-actions-octokit-hydrated';
import _ from 'lodash';

const fakeheadRef = 'refs/heads/DVPS-331';
const baseUrl = process.env.JIRA_BASE_URL as string;
const [owner, repo] = _.split(process.env.GITHUB_REPOSITORY || '', '/');
const originalContext = { ...ghac.context };
const { env } = process;
describe('jira ticket transition', () => {
  beforeAll(() => {
    jest.setTimeout(50_000);
    // Mock error/warning/info/debug
    jest.spyOn(ghac.logger, 'error').mockImplementation(console.error);
    jest.spyOn(ghac.logger, 'warning').mockImplementation(console.warn);
    jest.spyOn(ghac.logger, 'info').mockImplementation(console.info);
    jest.spyOn(ghac.logger, 'debug').mockImplementation(console.log);
    jest.spyOn(ghac.logger, 'notice').mockImplementation(console.info);

    // Mock github context
    jest.spyOn(ghac.context, 'repo', 'get').mockImplementation(() => {
      return {
        owner,
        repo,
      };
    });

    ghac.context.ref = fakeheadRef;
    ghac.context.sha = '1234567890123456789012345678901234567890';
  });

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...env };

    // Reset inputs

    process.env['INPUT_STRING'] = 'DVPS-336 to look in to';
    process.env['INPUT_TOKEN'] = process.env['GITHUB_TOKEN'] ?? '';
    process.env['INPUT_INCLUDE_MERGE_MESSAGES'] = 'true';
    process.env['INPUT_PROJECTS'] = 'DVPS';
    process.env['INPUT_PRROJECTS_IGNORE'] = 'JAVA';
    process.env['INPUT_HEAD_REF'] = '';
    process.env['INPUT_BASE_REF'] = '';
    process.env['INPUT_IGNORE_COMMITS'] = 'false';
    process.env['INPUT_FAIL_ON_ERROR'] = 'false';
    process.env['INPUT_JIRA_API_TOKEN'] = process.env.JIRA_API_TOKEN ?? '';
    process.env['INPUT_JIRA_USER_EMAIL'] = process.env.JIRA_USER_EMAIL ?? '';
    process.env['INPUT_JIRA_BASE_URL'] = process.env.JIRA_BASE_URL ?? '';
    process.env['INPUT_GITHUB_ENTERPRISE_SERVER_VERSIION'] = '3.6';
  });
  afterEach(() => {
    process.env = env;
  });
  afterAll(() => {
    // Restore @actions/github context
    ghac.context.ref = originalContext.ref;
    ghac.context.sha = originalContext.sha;

    // Restore
    jest.restoreAllMocks();
  });

  it('matches two keys in regex', () => {
    const testString = `[unicOrn 10183],[UNICORN-10183|- deviceLimitSupportUrl - system line`;
    const match = strictIssueIdRegEx.exec(testString);
    expect(match).toBeTruthy();
    expect(match?.length).toEqual(2);
    for (const m of match ?? []) {
      expect(normaliseKey(m)).toMatch(/UNICORN-\d+/);
    }
  });

  it('sets defaults', () => {
    const settings: Arguments = inputHelper();
    expect(settings).toBeTruthy();
    expect(settings.config).toBeTruthy();
    expect(settings.config.baseUrl).toEqual(baseUrl);
  });

  it('GitHub Event: pull_request', async () => {
    expect.hasAssertions();
    ghac.context.payload = {
      pull_request: {
        head: { ref: fakeheadRef },
        base: { ref: 'refs/heads/dev' },
        number: 2770,
        title: 'DVPS-336 - the final update',
        body: '',
      },
    };
    ghac.context.eventName = 'pull_request';
    const settings: Arguments = inputHelper();
    const action = new Action(ghac.context, settings);
    const result = await action.execute();
    expect(result.isOk()).toBe(true);
  });
  it('GitHub Event: push', async () => {
    // expect.hasAssertions()
    ghac.context.eventName = 'push';
    const settings: Arguments = inputHelper();
    const action = new Action(ghac.context, settings);
    const result = await action.execute();
    expect(result.isOk()).toBe(true);
  });
  it('GitHub Event: repository_dispatch', async () => {
    // expect.hasAssertions()
    process.env['INPUT_HEAD_REF'] = 'refs/heads/UNICORN-8403';
    process.env['INPUT_BASE_REF'] = 'dev';
    ghac.context.eventName = 'repository_dispatch';
    const settings: Arguments = inputHelper();
    const action = new Action(ghac.context, settings);
    const result = await action.execute();
    expect(result.isOk()).toEqual(true);
  });
  it('Github Pull Request title and body update', async () => {
    expect.hasAssertions();
    process.env['INPUT_UPDATE_PULL_REQUEST'] = 'true';
    delete process.env['INPUT_STRING'];
    ghac.context.payload = {
      pull_request: {
        head: { ref: fakeheadRef },
        base: { ref: 'refs/heads/dev' },
        number: 2770,
        title: ' dvps 336 | tHIS IS The  TITLE ',
        body: 'Fix an issue with the new feature',
      },
    };

    ghac.context.eventName = 'pull_request';
    const settings: Arguments = inputHelper();
    settings.octokit = createOctokit(process.env['GITHUB_TOKEN']);
    const spy = jest.spyOn(settings.octokit.rest.pulls, 'update').mockImplementation(async (args) => {
      console.log(args);
      expect(args?.title).toEqual<string>('DVPS-336: This Is The Title');
      expect(args?.body).toEqual<string>(
        `Fix an issue with the new feature\n\n[/]: / "JIRA-ISSUE-TEXT-START"\n### Linked Jira Issues:\n\n*  **[DVPS-336](https://wearsafe.atlassian.net/browse/DVPS-336)** [Testing] GitHub Action - Test Jira Transitions\n\n[/]: / "JIRA-ISSUE-TEXT-END"`,
      );
      return {} as any;
    });
    const action = new Action(ghac.context, settings);
    const result = await action.execute();

    spy.mockRestore();
    expect(result.isOk()).toBe(true);
    result.match(
      (v: Set<string>) => {
        expect(v).toBeInstanceOf(Set<string>);
        expect(v.size).toBe(1);
        expect(v.has('DVPS-336')).toBe(true);
      },
      (e: Error) => expect(e).toBeUndefined(),
    );
  });
});
