const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const { appendFileSync, readFileSync, writeFileSync } = require('node:fs');

const git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim();
const metadataFiles = ['package.json', 'README.md', '.ghadocs.json'];

function stableVersionParts(version) {
  assert.match(version, /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/, 'A stable semantic version is required');
  const parts = version.split('.').map(Number);
  assert.ok(parts.every(Number.isSafeInteger), 'Version components must be safe integers');
  return parts;
}

function nextPatchVersion(version) {
  const parts = stableVersionParts(version);
  parts[2] += 1;
  assert.ok(Number.isSafeInteger(parts[2]), 'Patch version is too large');
  return parts.join('.');
}

function nextReleaseVersion(packageVersion, tags) {
  let latest = stableVersionParts(packageVersion);
  for (const tag of tags) {
    const match = /^v((?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*))$/.exec(tag);
    if (!match) continue;
    const candidate = stableVersionParts(match[1]);
    const differing = candidate.findIndex((part, index) => part !== latest[index]);
    if (differing !== -1 && candidate[differing] > latest[differing]) latest = candidate;
  }
  return nextPatchVersion(latest.join('.'));
}

function assertMetadataOnly(testedSha, releaseCommit) {
  const args = ['diff', '--name-only', testedSha];
  if (releaseCommit) args.push(releaseCommit);
  const changed = git(...args)
    .split('\n')
    .filter(Boolean);
  assert.ok(changed.includes('package.json'), 'The release must update the package version');
  assert.ok(
    changed.every((file) => metadataFiles.includes(file)),
    `Release changed tested files: ${changed.join(', ')}`,
  );
}

function prepareRelease() {
  const testedSha = process.env.TESTED_SHA;
  assert.match(testedSha, /^[a-f0-9]{40}$/, 'TESTED_SHA must be the revision that passed Jira E2E tests');
  assert.equal(git('rev-parse', 'HEAD'), testedSha, 'HEAD is not the tested revision');
  assert.equal(git('status', '--porcelain'), '', 'Release preparation requires a clean worktree');
  assert.ok(process.env.GITHUB_OUTPUT, 'GITHUB_OUTPUT is required before preparing a release');

  const original = JSON.parse(readFileSync('package.json', 'utf8'));
  const documentationConfig = JSON.parse(readFileSync('.ghadocs.json', 'utf8'));
  const version = nextReleaseVersion(original.version, git('tag', '--list').split('\n'));
  const tag = `v${version}`;
  assert.equal(git('tag', '--list', tag), '', `Release tag ${tag} already exists`);

  // Yarn 3 does not use Yarn Classic's version lifecycle. Updating JSON directly
  // also avoids this repository's legacy postversion script, which pushes tags.
  writeFileSync('package.json', `${JSON.stringify({ ...original, version }, null, 2)}\n`);
  execFileSync(process.execPath, ['.yarn/releases/yarn-3.3.0.cjs', 'generate-docs'], { stdio: 'inherit' });
  assert.deepEqual(JSON.parse(readFileSync('package.json', 'utf8')), { ...original, version });
  assert.deepEqual(JSON.parse(readFileSync('.ghadocs.json', 'utf8')), documentationConfig);
  assert.ok(
    readFileSync('README.md', 'utf8').includes(`${original.displayName}@${tag}`),
    'README must reference the exact release tag',
  );
  assertMetadataOnly(testedSha);

  git('add', '--', ...metadataFiles);
  git('commit', '-m', `chore(release): ⬆️ bump version to ${version}`);
  const commit = git('rev-parse', 'HEAD');
  assert.equal(
    git('rev-list', '--parents', '-n', '1', 'HEAD'),
    `${commit} ${testedSha}`,
    'The release must have only the tested revision as its parent',
  );
  assertMetadataOnly(testedSha, commit);
  assert.equal(git('status', '--porcelain'), '', 'Release preparation left uncommitted files');
  git('tag', tag, commit);
  assert.equal(git('rev-parse', `${tag}^{commit}`), commit);

  // Publication is a separate workflow step; preparation never contacts origin.
  appendFileSync(process.env.GITHUB_OUTPUT, `tag=${tag}\ncommit=${commit}\n`);
  console.log(`Prepared ${tag} at ${commit}; tested action content is unchanged.`);
}

module.exports = { nextPatchVersion, nextReleaseVersion, prepareRelease };
if (require.main === module) {
  try {
    prepareRelease();
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  }
}
