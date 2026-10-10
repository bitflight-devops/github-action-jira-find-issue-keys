const assert = require('node:assert/strict');
const { setTimeout: delay } = require('node:timers/promises');
const { runAction, startHttpFixture, assertActionSucceeded } = require('../../e2e/action-harness.cjs');

async function main() {
  const baseUrl = (process.env.E2E_JIRA_BASE_URL || 'http://127.0.0.1:8080').replace(/\/$/, '');
  const username = process.env.E2E_JIRA_USERNAME || 'admin';
  const password = process.env.E2E_JIRA_PASSWORD || 'admin';
  const projectKey = process.env.E2E_JIRA_PROJECT || 'E2E';

  async function jira(method, resource, body) {
    const response = await fetch(`${baseUrl}/rest/api/2/${resource}`, {
      method,
      headers: {
        authorization: `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`,
        accept: 'application/json',
        ...(body ? { 'content-type': 'application/json' } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: AbortSignal.timeout(30_000),
    });
    const content = await response.text();
    assert.ok(response.ok, `Jira ${method} ${resource} failed (${response.status}): ${content.slice(0, 1500)}`);
    return content ? JSON.parse(content) : undefined;
  }

  // The shared Docker setup owns Jira and the E2E project. Each test owns its issue.
  const project = await jira('GET', `project/${projectKey}`);
  const issueType =
    project.issueTypes.find((type) => !type.subtask && type.name === 'Task') ||
    project.issueTypes.find((type) => !type.subtask);
  assert.ok(issueType, `Project ${projectKey} has no standard issue type`);
  const summary = `Packaged find-issue-keys integration ${Date.now()}`;
  let issueKey;
  let fixture;
  try {
    const created = await jira('POST', 'issue', {
      fields: {
        project: { key: projectKey },
        issuetype: { id: issueType.id },
        summary,
        description: 'Created by the disposable Jira integration test.',
      },
    });
    issueKey = created.key;
    assert.match(issueKey, new RegExp(`^${projectKey}-\\d+$`));
    const seeded = await jira('GET', `issue/${issueKey}?fields=summary,status,project`);
    assert.equal(seeded.fields.summary, summary);
    const status = seeded.fields.status.name;

    fixture = await startHttpFixture(async ({ method, url, body, headers }) => {
      assert.equal(method, 'PATCH');
      assert.equal(url.pathname, '/repos/fixture/integration/pulls/42');
      assert.equal(headers.authorization, 'token fixture-token');
      assert.ok(body.body.includes(`**[${issueKey}](${baseUrl}/browse/${issueKey})** [${status}] ${summary}`));
      assert.ok(body.body.startsWith('Preserve the existing pull request body.'));
      await delay(100);
      return { body: { number: 42, ...body } };
    });
    const event = {
      pull_request: {
        number: 42,
        title: `${issueKey}: verify jira enrichment`,
        body: 'Preserve the existing pull request body.',
        head: { ref: 'integration-test' },
        base: { ref: 'main' },
      },
    };
    const inputs = {
      from: 'pull_request',
      projects: projectKey,
      token: 'fixture-token',
      github_api_url: fixture.baseUrl,
      update_pull_request: true,
      fail_on_error: true,
      jira_base_url: baseUrl,
      jira_user_email: username,
      jira_api_token: password,
    };
    let prematureSuccess = false;
    const result = await runAction({
      event,
      inputs,
      onStdout(chunk) {
        if (chunk.includes('Action completed successfully')) {
          prematureSuccess = !fixture.requests.some((request) => request.responded);
        }
      },
    });
    assertActionSucceeded(result);
    assert.equal(result.outputs.issue, issueKey);
    assert.equal(result.outputs.issues, issueKey);
    assert.equal(result.outputs.projects_found, projectKey);
    assert.equal(fixture.requests.length, 1, 'The action must update the PR exactly once');
    assert.equal(fixture.requests[0].responded, true);
    assert.equal(prematureSuccess, false, 'The action reported success before GitHub accepted the update');
    fixture.assertSatisfied();

    // A real Jira 404 must fail the packaged action and must not update GitHub.
    await jira('DELETE', `issue/${issueKey}`);
    issueKey = undefined;
    const missing = await runAction({ event, inputs });
    assert.notEqual(missing.code, 0, 'A deleted Jira issue must make strict enrichment fail');
    assert.match(missing.stdout, /Failed to load issue data/);
    assert.doesNotMatch(missing.stdout, /Action completed successfully/);
    assert.equal(missing.outputs.issues, undefined);
    assert.equal(fixture.requests.length, 1, 'Failed Jira enrichment must not update the PR');
    fixture.assertSatisfied();
    console.log(`Real Jira E2E passed: ${created.key}, status=${status}; completed PR update and Jira 404 verified.`);
  } finally {
    if (fixture) await fixture.close();
    if (issueKey) await jira('DELETE', `issue/${issueKey}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
