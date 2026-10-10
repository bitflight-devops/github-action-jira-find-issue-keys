const assert = require('node:assert/strict');
const { test } = require('node:test');
const { setTimeout: delay } = require('node:timers/promises');
const { runAction, startHttpFixture, assertActionSucceeded } = require('./action-harness.cjs');

const pullRequestEvent = {
  pull_request: {
    number: 42,
    title: 'TITLE-42: Original title',
    body: 'Keep the original body.',
    head: { ref: 'feature/BRANCH-7' },
    base: { ref: 'main' },
  },
};

test('packaged extraction needs no credentials and respects each selected source', async () => {
  for (const [from, expected] of [
    ['string', 'TEXT-3'],
    ['branch', 'BRANCH-7'],
    ['pull_request', 'TITLE-42'],
  ]) {
    const result = await runAction({
      event: pullRequestEvent,
      inputs: { from, string: 'text 3 TEXT-3 OTHER-6', projects: 'TEXT,BRANCH,TITLE', fail_on_error: true },
    });
    assertActionSucceeded(result);
    assert.equal(result.outputs.issue, expected);
    assert.equal(result.outputs.issues, expected);
    assert.equal(result.outputs.projects_found, expected.split('-')[0]);
    assert.equal(result.outputs.projects_included, 'TEXT,BRANCH,TITLE');
  }
});

test('packaged project exclusions and empty outputs cannot accidentally pass', async () => {
  const result = await runAction({
    inputs: {
      from: 'string',
      string: 'TEXT-3 OTHER-6',
      projects: 'TEXT',
      projects_ignore: 'TEXT',
      fail_on_error: true,
    },
  });
  assertActionSucceeded(result);
  assert.equal(result.outputs.issue, '');
  assert.equal(result.outputs.issues, '');
  assert.equal(result.outputs.projects_found, '');
  assert.equal(result.outputs.projects_excluded, 'TEXT');
});

test('packaged PR commits paginate through the GitHub API and exclude merge messages', async () => {
  const fixture = await startHttpFixture(async ({ method, url, body, headers }) => {
    assert.equal(method, 'POST');
    assert.equal(url.pathname, '/graphql');
    assert.equal(headers.authorization, 'token fixture-token');
    assert.equal(body.variables.owner, 'fixture');
    assert.equal(body.variables.repo, 'integration');
    assert.equal(body.variables.prNumber, 42);
    assert.match(body.query, /pullRequest/);
    const firstPage = body.variables.after === null;
    if (!firstPage) assert.equal(body.variables.after, 'second-page');
    return {
      body: {
        data: {
          repository: {
            pullRequest: {
              commits: {
                totalCount: 3,
                nodes: firstPage
                  ? [{ commit: { message: 'COMMIT-11 implemented' } }, { commit: { message: 'Merge branch MERGE-99' } }]
                  : [{ commit: { message: 'COMMIT-12 tested COMMIT-11' } }],
                pageInfo: { hasNextPage: firstPage, endCursor: firstPage ? 'second-page' : null },
              },
            },
          },
        },
      },
    };
  });
  try {
    const result = await runAction({
      event: pullRequestEvent,
      inputs: { from: 'commits', token: 'fixture-token', github_api_url: fixture.baseUrl, fail_on_error: true },
    });
    assertActionSucceeded(result);
    assert.equal(result.outputs.issues, 'COMMIT-11,COMMIT-12');
    assert.equal(result.outputs.commit_issues, 'COMMIT-11,COMMIT-12');
    assert.equal(result.outputs.title_issues, '');
    assert.equal(fixture.requests.length, 2);
    fixture.assertSatisfied();
  } finally {
    await fixture.close();
  }
});

test('packaged push commits use the before/after comparison instead of an unrelated release', async () => {
  const fixture = await startHttpFixture(async ({ method, url }) => {
    assert.equal(method, 'GET');
    assert.equal(url.pathname, '/repos/fixture/integration/compare/before...after');
    assert.equal(url.searchParams.get('per_page'), '100');
    assert.equal(url.searchParams.get('page'), '1');
    return { body: { commits: [{ commit: { message: 'PUSH-19 from comparison' } }] } };
  });
  try {
    const result = await runAction({
      eventName: 'push',
      event: { ref: 'refs/heads/main', before: 'before', after: 'after', commits: [{ message: 'STALE-1' }] },
      inputs: { from: 'commits', token: 'fixture-token', github_api_url: fixture.baseUrl, fail_on_error: true },
    });
    assertActionSucceeded(result);
    assert.equal(result.outputs.issues, 'PUSH-19');
    assert.equal(fixture.requests.length, 1);
    fixture.assertSatisfied();
  } finally {
    await fixture.close();
  }
});

test('packaged enrichment waits for a completed PR update and renders every Jira issue', async () => {
  const fixture = await startHttpFixture(async ({ method, url, body, headers }) => {
    if (method === 'GET' && url.pathname.startsWith('/rest/api/2/issue/')) {
      assert.equal(headers.authorization, `Basic ${Buffer.from('admin:admin').toString('base64')}`);
      const key = url.pathname.split('/').pop();
      assert.equal(url.searchParams.get('expand'), 'renderedFields');
      return {
        body: {
          key,
          fields: { summary: `Seeded ${key} ($& literal)`, status: { name: 'Open' }, project: { key: 'E2E' } },
        },
      };
    }
    assert.equal(method, 'PATCH');
    assert.equal(url.pathname, '/repos/fixture/integration/pulls/42');
    assert.match(body.body, /Keep the original body\./);
    assert.ok(!body.body.includes('Old Jira section'));
    assert.equal(body.body.split('JIRA-ISSUE-TEXT-START').length, 2);
    await delay(100);
    return { body: { number: 42, ...body } };
  });
  let prematureSuccess = false;
  try {
    const result = await runAction({
      event: {
        pull_request: {
          ...pullRequestEvent.pull_request,
          title: 'E2E-1 E2E-2: Integration',
          body: 'Keep the original body.\n\n[/]: / "JIRA-ISSUE-TEXT-START"\nOld Jira section\n[/]: / "JIRA-ISSUE-TEXT-END"',
        },
      },
      inputs: {
        from: 'pull_request',
        token: 'fixture-token',
        github_api_url: fixture.baseUrl,
        fail_on_error: true,
        update_pull_request: true,
        jira_base_url: fixture.baseUrl,
        jira_user_email: 'admin',
        jira_api_token: 'admin',
      },
      onStdout(chunk) {
        if (chunk.includes('Action completed successfully')) {
          prematureSuccess = !fixture.requests.some((request) => request.method === 'PATCH' && request.responded);
        }
      },
    });
    assertActionSucceeded(result);
    assert.equal(prematureSuccess, false, 'Success was reported before GitHub accepted the update');
    assert.equal(result.outputs.issues, 'E2E-1,E2E-2');
    const updates = fixture.requests.filter((request) => request.method === 'PATCH');
    assert.equal(updates.length, 1);
    assert.equal(fixture.requests.filter((request) => request.method === 'GET').length, 2);
    assert.ok(
      updates[0].body.body.includes(
        `*  **[E2E-1](${fixture.baseUrl}/browse/E2E-1)** [Open] Seeded E2E-1 ($& literal)\n*  **[E2E-2](${fixture.baseUrl}/browse/E2E-2)** [Open] Seeded E2E-2 ($& literal)`,
      ),
    );
    fixture.assertSatisfied();
  } finally {
    await fixture.close();
  }
});

test('packaged action fails when GitHub rejects an update after successful Jira enrichment', async () => {
  const fixture = await startHttpFixture(async ({ method, url }) => {
    if (method === 'GET' && url.pathname === '/rest/api/2/issue/TITLE-42') {
      return { body: { key: 'TITLE-42', fields: { summary: 'Loaded from Jira', status: { name: 'Open' } } } };
    }
    assert.equal(method, 'PATCH');
    assert.equal(url.pathname, '/repos/fixture/integration/pulls/42');
    return { statusCode: 404, body: { message: 'No permission to update the pull request' } };
  });
  try {
    const result = await runAction({
      event: pullRequestEvent,
      inputs: {
        from: 'pull_request',
        update_pull_request: true,
        fail_on_error: true,
        token: 'fixture-token',
        github_api_url: fixture.baseUrl,
        jira_base_url: fixture.baseUrl,
        jira_user_email: 'admin',
        jira_api_token: 'admin',
      },
    });
    assert.notEqual(result.code, 0);
    assert.match(result.stdout, /Failed to enrich Jira issues or update the pull request/);
    assert.doesNotMatch(result.stdout, /Action completed successfully/);
    assert.equal(result.outputs.issues, undefined);
    assert.equal(result.outputs.title, undefined);
    assert.equal(fixture.requests.length, 2);
    fixture.assertSatisfied();
  } finally {
    await fixture.close();
  }
});

test('packaged invalid configuration and API failures exit nonzero in strict mode', async () => {
  const fixture = await startHttpFixture(async () => ({
    statusCode: 404,
    body: { message: 'Fixture resource not found' },
  }));
  try {
    const cases = [
      { from: 'invalid' },
      { from: 'pull_request', update_pull_request: true },
      { from: 'commits', token: 'fixture-token', github_api_url: fixture.baseUrl },
      {
        from: 'pull_request',
        update_pull_request: true,
        token: 'fixture-token',
        github_api_url: fixture.baseUrl,
        jira_base_url: fixture.baseUrl,
        jira_user_email: 'admin',
        jira_api_token: 'admin',
      },
    ];
    for (const inputs of cases) {
      const result = await runAction({ event: pullRequestEvent, inputs: { ...inputs, fail_on_error: true } });
      assert.notEqual(result.code, 0, `Expected strict failure for ${JSON.stringify(inputs)}\n${result.stdout}`);
      assert.match(result.stdout, /::error::/);
      assert.doesNotMatch(result.stdout, /Action completed successfully/);
      assert.equal(result.outputs.issues, undefined);
    }
    fixture.assertSatisfied();
  } finally {
    await fixture.close();
  }
});
