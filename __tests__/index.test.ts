import * as core from '@actions/core';
import * as github from '@actions/github';

import Action from '../src/action';
import ActionError from '../src/action-error';
import inputHelper from '../src/input-helper';
import { Arguments } from '../src/types';

const baseUrl = process.env.JIRA_BASE_URL as string;
interface InputsInterface {
  [key: string]: string;
}
// Inputs for mock @actions/core
let inputs = {} as InputsInterface;
const [owner, repo] = (process.env.GITHUB_REPOSITORY || '').split('/');
// Shallow clone original @actions/github context
const originalContext = { ...github.context };

describe('jira ticket transition', () => {
  beforeAll(() => {
    jest.setTimeout(50_000);
    // Mock getInput
    jest.spyOn(core, 'getInput').mockImplementation((name: string) => {
      return inputs[name];
    });
    jest.spyOn(core, 'getBooleanInput').mockImplementation((name: string) => {
      const regMatTrue = /(true|True|TRUE)/;
      const regMatFalse = /(false|False|FALSE)/;
      if (regMatTrue.test(inputs[name])) {
        return true;
      }
      if (regMatFalse.test(inputs[name])) {
        return false;
      }
      throw new ActionError(`
      TypeError: Input does not meet YAML 1.2 "Core Schema" specification: ${name}
      Support boolean input list: true | True | TRUE | false | False | FALSE
    `);
    });
    // Mock error/warning/info/debug
    jest.spyOn(core, 'error').mockImplementation(console.error);
    jest.spyOn(core, 'warning').mockImplementation(console.warn);
    jest.spyOn(core, 'info').mockImplementation(console.info);
    jest.spyOn(core, 'debug').mockImplementation(console.log);
    jest.spyOn(core, 'notice').mockImplementation(console.info);

    // Mock github context
    jest.spyOn(github.context, 'repo', 'get').mockImplementation(() => {
      return {
        owner,
        repo,
      };
    });

    github.context.ref = 'refs/heads/DVPS-331';
    github.context.sha = '1234567890123456789012345678901234567890';
  });

  beforeEach(() => {
    // Reset inputs
    inputs = {};
    inputs.string = 'DVPS-336 to look in to';
    inputs.token = process.env.GITHUB_TOKEN ?? '';
    inputs.include_merge_messages = 'true';
    inputs.projects = 'DVPS';
    inputs.projects_ignore = 'JAVA';
    inputs.head_ref = '';
    inputs.base_ref = '';
    inputs.ignore_commits = 'false';
    inputs.fail_on_error = 'false';
    inputs.jira_api_token = process.env.JIRA_API_TOKEN ?? '';
    inputs.jira_user_email = process.env.JIRA_USER_EMAIL ?? '';
    inputs.jira_base_url = process.env.JIRA_BASE_URL ?? '';
    inputs.github_enterprise_server_version = '3.5';
    core.info(JSON.stringify(inputs));
  });
  afterAll(() => {
    // Restore @actions/github context
    github.context.ref = originalContext.ref;
    github.context.sha = originalContext.sha;

    // Restore
    jest.restoreAllMocks();
  });

  it('sets defaults', () => {
    const settings: Arguments = inputHelper();
    expect(settings).toBeTruthy();
    expect(settings.config).toBeTruthy();
    expect(settings.config.baseUrl).toBe(baseUrl);
  });

  it('GitHub Event: pull_request', async () => {
    expect.hasAssertions();
    github.context.payload = {
      pull_request: {
        head: { ref: 'refs/heads/DVPS-331' },
        base: { ref: 'refs/heads/dev' },
        number: 2770,
        title: 'DVPS-336',
      },
    };
    github.context.eventName = 'pull_request';
    const settings: Arguments = inputHelper();
    const action = new Action(github.context, settings);
    const result = await action.execute();
    expect(result.isOk()).toBe(true);
  });
  it('GitHub Event: push', async () => {
    // expect.hasAssertions()
    github.context.eventName = 'push';
    const settings: Arguments = inputHelper();
    const action = new Action(github.context, settings);
    const result = await action.execute();
    expect(result.isOk()).toBe(true);
  });
  it('GitHub Event: repository_dispatch', async () => {
    // expect.hasAssertions()
    inputs.headRef = 'refs/heads/UNICORN-8403';
    inputs.baseRef = 'dev';
    github.context.eventName = 'repository_dispatch';
    const settings: Arguments = inputHelper();
    const action = new Action(github.context, settings);
    const result = await action.execute();
    expect(result.isOk()).toEqual(true);
  });
});
