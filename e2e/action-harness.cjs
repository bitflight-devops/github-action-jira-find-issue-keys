const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const { once } = require('node:events');
const fs = require('node:fs/promises');
const http = require('node:http');
const os = require('node:os');
const path = require('node:path');
const yaml = require('js-yaml');

const repositoryRoot = path.resolve(__dirname, '..');

function parseOutputs(content) {
  const outputs = {};
  const lines = content.split(/\r?\n/);
  for (let i = 0; i < lines.length; i += 1) {
    if (!lines[i]) continue;
    const delimiterIndex = lines[i].indexOf('<<');
    if (delimiterIndex >= 0) {
      const name = lines[i].slice(0, delimiterIndex);
      const delimiter = lines[i].slice(delimiterIndex + 2);
      const value = [];
      i += 1;
      while (i < lines.length && lines[i] !== delimiter) value.push(lines[i++]);
      assert.equal(lines[i], delimiter, `Output ${name} is missing its delimiter`);
      outputs[name] = value.join('\n');
    } else {
      const separator = lines[i].indexOf('=');
      assert.ok(separator > 0, `Invalid GitHub output command: ${lines[i]}`);
      outputs[lines[i].slice(0, separator)] = lines[i].slice(separator + 1);
    }
  }
  return outputs;
}

async function runAction({
  inputs = {},
  event = {},
  eventName = 'pull_request',
  ref = 'refs/heads/main',
  onStdout,
} = {}) {
  const metadata = yaml.load(await fs.readFile(path.join(repositoryRoot, 'action.yml'), 'utf8'));
  assert.equal(metadata.runs.using, 'node24', 'The packaged action must use Node 24');
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'find-jira-keys-'));
  const eventPath = path.join(directory, 'event.json');
  const outputPath = path.join(directory, 'outputs');
  const summaryPath = path.join(directory, 'summary');
  await Promise.all([
    fs.writeFile(eventPath, JSON.stringify(event)),
    fs.writeFile(outputPath, ''),
    fs.writeFile(summaryPath, ''),
  ]);

  // Run independently of developer credentials, runner inputs, and login files.
  const env = { ...process.env };
  for (const key of Object.keys(env)) {
    if (
      /^(INPUT_|GITHUB_|JIRA_|E2E_)/.test(key) ||
      /^(HOME|NODE_OPTIONS|NODE_PATH|https?_proxy|all_proxy)$/i.test(key)
    ) {
      delete env[key];
    }
  }
  Object.assign(env, {
    GITHUB_ACTIONS: 'true',
    GITHUB_EVENT_NAME: eventName,
    GITHUB_EVENT_PATH: eventPath,
    GITHUB_REPOSITORY: 'fixture/integration',
    GITHUB_REF: ref,
    GITHUB_SHA: 'a'.repeat(40),
    GITHUB_WORKSPACE: directory,
    GITHUB_OUTPUT: outputPath,
    GITHUB_STEP_SUMMARY: summaryPath,
  });
  for (const [name, input] of Object.entries(metadata.inputs)) {
    env[`INPUT_${name.toUpperCase()}`] = String(input.default ?? '');
  }
  for (const [name, value] of Object.entries(inputs)) {
    assert.ok(metadata.inputs[name], `Unknown action input: ${name}`);
    env[`INPUT_${name.toUpperCase()}`] = String(value);
  }

  try {
    const child = spawn(process.execPath, [path.resolve(repositoryRoot, metadata.runs.main)], {
      cwd: directory,
      env,
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    let stdout = '';
    let stderr = '';
    child.stdout.on('data', (chunk) => {
      stdout += chunk;
      if (onStdout) onStdout(String(chunk));
    });
    child.stderr.on('data', (chunk) => {
      stderr += chunk;
    });
    let timedOut = false;
    const timeout = setTimeout(() => {
      timedOut = true;
      child.kill('SIGKILL');
    }, 30_000);
    let code;
    let signal;
    try {
      [code, signal] = await once(child, 'close');
    } finally {
      clearTimeout(timeout);
    }
    assert.equal(timedOut, false, `Packaged action timed out\n${stdout}\n${stderr}`);
    assert.equal(signal, null, `Packaged action was terminated by ${signal}`);
    return { code, stdout, stderr, outputs: parseOutputs(await fs.readFile(outputPath, 'utf8')) };
  } finally {
    await fs.rm(directory, { recursive: true, force: true });
  }
}

async function startHttpFixture(handler) {
  const requests = [];
  const errors = [];
  const server = http.createServer(async (request, response) => {
    try {
      let rawBody = '';
      for await (const chunk of request) rawBody += chunk;
      const received = {
        method: request.method,
        url: new URL(request.url, 'http://fixture'),
        headers: request.headers,
        body: rawBody ? JSON.parse(rawBody) : undefined,
        responded: false,
      };
      requests.push(received);
      const result = await handler(received);
      assert.ok(result, `Unexpected fixture request: ${request.method} ${request.url}`);
      response.writeHead(result.statusCode ?? 200, { 'content-type': 'application/json', ...result.headers });
      received.responded = true;
      response.end(JSON.stringify(result.body ?? {}));
    } catch (error) {
      errors.push(error);
      response.writeHead(404, { 'content-type': 'application/json' });
      response.end(JSON.stringify({ message: String(error) }));
    }
  });
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  return {
    baseUrl: `http://127.0.0.1:${server.address().port}`,
    requests,
    assertSatisfied() {
      assert.deepEqual(errors, [], 'The action made an unexpected or invalid fixture request');
    },
    async close() {
      const closed = new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
      server.closeAllConnections();
      await closed;
    },
  };
}

function assertActionSucceeded(result) {
  assert.equal(result.code, 0, `${result.stdout}\n${result.stderr}`);
  assert.doesNotMatch(result.stdout, /::error::/, 'A successful action must not report hidden errors');
  assert.match(result.stdout, /Action completed successfully/);
}

module.exports = { runAction, startHttpFixture, assertActionSucceeded };
