const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const { cpSync, mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } = require('node:fs');
const { tmpdir } = require('node:os');
const path = require('node:path');
const { afterEach, test } = require('node:test');
const yaml = require('js-yaml');
const { nextPatchVersion, nextReleaseVersion } = require('./prepare-release.cjs');

const repository = path.resolve(__dirname, '../..');
const prepareScript = path.join(__dirname, 'prepare-release.cjs');
const workflow = yaml.load(readFileSync(path.join(repository, '.github/workflows/create_tag.yml'), 'utf8'));
const guard = workflow.jobs.tag.steps.find((step) => step.name === 'Reject a stale or mismatched test run').run;
const publish = workflow.jobs.tag.steps.find(
  (step) => step.name === 'Publish the release commit and exact tag atomically',
).run;
const temporary = [];

afterEach(() => {
  for (const directory of temporary.splice(0)) rmSync(directory, { recursive: true, force: true });
});

function run(command, args, cwd, environment = {}, expected = 0) {
  const result = spawnSync(command, args, {
    cwd,
    encoding: 'utf8',
    env: {
      ...process.env,
      CI: 'true',
      HUSKY: '0',
      GIT_CONFIG_GLOBAL: '/dev/null',
      GIT_CONFIG_NOSYSTEM: '1',
      YARN_ENABLE_NETWORK: '0',
      YARN_ENABLE_TELEMETRY: '0',
      ...environment,
    },
    timeout: 30_000,
  });
  assert.equal(result.error, undefined, result.error?.message);
  if (expected === 0) assert.equal(result.status, 0, `${command} failed:\n${result.stdout}\n${result.stderr}`);
  if (expected === 'failure') assert.notEqual(result.status, 0, 'Expected the operation to fail');
  return result;
}

function git(directory, ...args) {
  return run('git', args, directory).stdout.trim();
}

function fixture({ packageVersion = '1.1.11', existingTag } = {}) {
  const directory = mkdtempSync(path.join(tmpdir(), 'jira-release-test-'));
  temporary.push(directory);
  const working = path.join(directory, 'working');
  const origin = path.join(directory, 'origin.git');
  mkdirSync(path.join(working, '.yarn/releases'), { recursive: true });
  cpSync(path.join(repository, '.yarn/releases/yarn-3.3.0.cjs'), path.join(working, '.yarn/releases/yarn-3.3.0.cjs'));
  writeFileSync(
    path.join(working, '.yarnrc.yml'),
    'nodeLinker: node-modules\nyarnPath: .yarn/releases/yarn-3.3.0.cjs\nenableGlobalCache: false\n',
  );
  writeFileSync(path.join(working, '.gitignore'), 'node_modules\n.yarn/cache\n.yarn/install-state.gz\n');
  mkdirSync(path.join(working, 'src'));
  mkdirSync(path.join(working, 'lib'));
  writeFileSync(path.join(working, 'src/index.js'), '// tested action\n');
  writeFileSync(path.join(working, 'lib/index.js'), '// tested action\n');
  writeFileSync(path.join(working, 'action.yml'), 'runs: { using: node24, main: lib/index.js }\n');
  writeFileSync(path.join(working, 'README.md'), 'fixture/action@main\n');
  writeFileSync(path.join(working, '.ghadocs.json'), '{"versioning":{"prefix":"v"}}\n');
  writeFileSync(
    path.join(working, 'package.json'),
    `${JSON.stringify(
      {
        name: 'release-test-fixture',
        version: packageVersion,
        private: true,
        displayName: 'fixture/action',
        packageManager: 'yarn@3.3.0',
        scripts: { 'generate-docs': 'node docs.cjs' },
      },
      null,
      2,
    )}\n`,
  );
  writeFileSync(
    path.join(working, 'docs.cjs'),
    [
      "const fs = require('node:fs');",
      'if (process.env.FAIL_DOCS) process.exit(21);',
      "if (process.env.ALTER_ACTION) fs.writeFileSync('lib/index.js', '// unexpected change\\n');",
      "fs.writeFileSync('README.md', `fixture/action@v${process.env.npm_package_version}\\n`);",
    ].join('\n'),
  );
  // The disposable fixture has no dependencies; create its lockfile offline.
  run(process.execPath, ['.yarn/releases/yarn-3.3.0.cjs', 'install'], working, {
    YARN_ENABLE_IMMUTABLE_INSTALLS: 'false',
  });
  git(working, 'init', '-b', 'main');
  git(working, 'config', 'user.name', 'Release tests');
  git(working, 'config', 'user.email', 'release-tests@example.invalid');
  git(working, 'add', '.');
  git(working, 'commit', '-m', 'test: exact tested revision');
  const tested = git(working, 'rev-parse', 'HEAD');
  git(directory, 'init', '--bare', origin);
  git(working, 'remote', 'add', 'origin', origin);
  git(working, 'push', 'origin', 'HEAD:refs/heads/main');
  if (existingTag) {
    git(working, 'tag', existingTag);
    git(working, 'push', 'origin', `refs/tags/${existingTag}`);
  }
  const output = path.join(directory, 'github-output');
  writeFileSync(output, '');
  return { directory, working, origin, tested, output, environment: { TESTED_SHA: tested, GITHUB_OUTPUT: output } };
}

function prepare(item, environment = {}, expected = 0) {
  const result = run(
    process.execPath,
    [prepareScript],
    item.working,
    { ...item.environment, ...environment },
    expected,
  );
  if (expected !== 0) {
    assert.equal(readFileSync(item.output, 'utf8'), '', 'Failed preparation must not expose release outputs');
    return result;
  }
  const outputs = Object.fromEntries(
    readFileSync(item.output, 'utf8')
      .trim()
      .split('\n')
      .map((line) => line.split('=')),
  );
  item.environment.RELEASE_TAG = outputs.tag;
  item.environment.RELEASE_COMMIT = outputs.commit;
  return outputs;
}

function advanceMain(item) {
  const concurrent = path.join(item.directory, 'concurrent');
  git(item.directory, 'clone', '--branch', 'main', item.origin, concurrent);
  git(concurrent, 'config', 'user.name', 'Release tests');
  git(concurrent, 'config', 'user.email', 'release-tests@example.invalid');
  git(concurrent, 'commit', '--allow-empty', '-m', 'fix: concurrent main update');
  git(concurrent, 'push', 'origin', 'HEAD:refs/heads/main');
  return git(concurrent, 'rev-parse', 'HEAD');
}

function assertNoRemoteRelease(item, expectedMain = item.tested) {
  assert.equal(git(item.directory, '--git-dir', item.origin, 'rev-parse', 'refs/heads/main'), expectedMain);
  assert.equal(git(item.directory, '--git-dir', item.origin, 'tag', '--list', 'v1.1.12'), '');
}

test('release eligibility accepts only a successful same-repository main push and excludes release commits', () => {
  const eligible = new Function('github', 'startsWith', `return (${workflow.jobs.tag.if});`);
  const original = {
    conclusion: 'success',
    event: 'push',
    head_branch: 'main',
    head_repository: { full_name: 'fixture/action' },
    head_commit: { message: 'fix: verified change' },
  };
  const check = (change) =>
    eligible({ repository: 'fixture/action', event: { workflow_run: { ...original, ...change } } }, (value, prefix) =>
      value.startsWith(prefix),
    );
  assert.equal(check({}), true);
  for (const change of [
    { conclusion: 'failure' },
    { conclusion: 'cancelled' },
    { event: 'pull_request' },
    { event: 'workflow_dispatch' },
    { head_branch: 'develop' },
    { head_repository: { full_name: 'fork/action' } },
    { head_commit: { message: 'chore(release): version' } },
  ])
    assert.equal(check(change), false);
  for (const step of workflow.jobs.tag.steps.filter((step) => step.run)) {
    const syntax = spawnSync('bash', ['-n'], { input: step.run, encoding: 'utf8' });
    assert.equal(syntax.status, 0, `${step.name}: ${syntax.stderr}`);
  }
});

test('patch selection uses the highest stable package/tag version and rejects malformed package versions', () => {
  assert.equal(nextReleaseVersion('1.1.11', ['v1', 'v1.1', 'v1.1.9']), '1.1.12');
  assert.equal(nextReleaseVersion('1.1.6', ['v1.1.7', 'v1.10.0', 'v2.0.0-rc.1']), '1.10.1');
  for (const version of ['v1.0.0', '1.0', '1.0.0-beta', '01.0.0', '1.0.9007199254740991']) {
    assert.throws(() => nextPatchVersion(version));
  }
});

test('actual Yarn 3 preparation and atomic publication retain the tested action and use the exact tag', () => {
  const item = fixture({ packageVersion: '1.1.6', existingTag: 'v1.1.7' });
  run('bash', ['-euo', 'pipefail', '-c', guard], item.working, item.environment);
  const result = prepare(item);
  assert.equal(result.tag, 'v1.1.8');
  assert.equal(git(item.working, 'rev-parse', `${result.tag}^{commit}`), result.commit);
  assert.equal(git(item.working, 'rev-parse', 'HEAD^'), item.tested);
  assert.match(readFileSync(path.join(item.working, 'README.md'), 'utf8'), /fixture\/action@v1\.1\.8/);
  run('bash', ['-euo', 'pipefail', '-c', publish], item.working, item.environment);
  assert.equal(git(item.directory, '--git-dir', item.origin, 'rev-parse', 'refs/heads/main'), result.commit);
  assert.equal(git(item.directory, '--git-dir', item.origin, 'rev-parse', `${result.tag}^{commit}`), result.commit);
  assert.equal(
    git(item.working, 'diff', item.tested, result.commit, '--', 'src', 'lib', 'action.yml', 'yarn.lock'),
    '',
  );
});

test('a stale successful run cannot start a release', () => {
  const item = fixture();
  const current = advanceMain(item);
  run('bash', ['-euo', 'pipefail', '-c', guard], item.working, item.environment, 'failure');
  assertNoRemoteRelease(item, current);
});

test('main advancing after preparation prevents both branch and tag publication', () => {
  const item = fixture();
  prepare(item);
  const current = advanceMain(item);
  run('bash', ['-euo', 'pipefail', '-c', publish], item.working, item.environment, 'failure');
  assertNoRemoteRelease(item, current);
});

test('a conflicting remote tag rejects the entire atomic push without moving main', () => {
  const item = fixture();
  const result = prepare(item);
  git(item.directory, '--git-dir', item.origin, 'update-ref', `refs/tags/${result.tag}`, item.tested);
  run('bash', ['-euo', 'pipefail', '-c', publish], item.working, item.environment, 'failure');
  assert.equal(git(item.directory, '--git-dir', item.origin, 'rev-parse', 'refs/heads/main'), item.tested);
  assert.equal(git(item.directory, '--git-dir', item.origin, 'rev-parse', `refs/tags/${result.tag}`), item.tested);
});

for (const [name, environment] of [
  ['documentation generation fails', { FAIL_DOCS: '1' }],
  ['documentation generation changes the action', { ALTER_ACTION: '1' }],
  ['the tested revision is wrong', { TESTED_SHA: '0'.repeat(40) }],
]) {
  test(`preparation has no publication outputs when ${name}`, () => {
    const item = fixture();
    prepare(item, environment, 'failure');
    assertNoRemoteRelease(item);
  });
}
