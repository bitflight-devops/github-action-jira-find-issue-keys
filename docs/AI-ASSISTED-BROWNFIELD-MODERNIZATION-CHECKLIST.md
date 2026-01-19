# AI-Assisted Brownfield Modernization Checklist

A comprehensive guide for systematic, validated AI-assisted modernization of brownfield projects. This checklist incorporates advanced prompt engineering techniques including Chain-of-Verification (CoVe), self-correction loops, and validation harnesses to ensure accuracy and eliminate hallucinations.

## Table of Contents

- [Phase 1: Repository Analysis \& Baseline Establishment](#phase-1-repository-analysis--baseline-establishment)
- [Phase 2: Validation Harness Setup](#phase-2-validation-harness-setup)
- [Phase 3: Architecture Documentation with Verification](#phase-3-architecture-documentation-with-verification)
- [Phase 4: Modernization Planning with Validation](#phase-4-modernization-planning-with-validation)
- [Phase 5: CI/CD Pipeline Development with Validation](#phase-5-cicd-pipeline-development-with-validation)
- [Phase 6: Review Cycles \& Hallucination Detection](#phase-6-review-cycles--hallucination-detection)
- [Phase 7: Comprehensive Documentation Generation](#phase-7-comprehensive-documentation-generation)
- [Phase 8: Continuous Validation Loop](#phase-8-continuous-validation-loop)

---

## Phase 1: Repository Analysis & Baseline Establishment

### 1.1 Initial Codebase Inventory with Verification Loop

**Best Practice:** Use AST parsing to catalog all code entities, then verify completeness through cross-referencing.

**Example:**

```text
Step 1 (Analysis): Parse repository with tree-sitter/AST tools
- Generate inventory: 247 functions, 89 classes, 34 modules

Step 2 (Verification Questions):
- Are there any dynamic imports not captured by static AST?
- Do file counts match directory traversal results?
- Are generated/build files excluded from analysis?

Step 3 (Verification Execution):
- Run: find . -name "*.ts" | wc -l → Compare with AST file count
- Check import statements for dynamic require() or import() patterns
- Validate .gitignore exclusions applied

Step 4 (Corrected Output):
- Actual inventory: 247 functions, 89 classes, 34 modules,
  12 dynamic imports flagged for manual review
```

**Checklist:**

- [ ] Run AST parser on entire codebase
- [ ] Cross-reference file counts with directory traversal
- [ ] Identify dynamic imports/requires not captured by static analysis
- [ ] Verify build artifacts and generated files are excluded
- [ ] Document any discrepancies between static and runtime analysis

---

### 1.2 Dependency Graph Construction with CodeQL Validation

**Best Practice:** Build dependency graph, then validate against CodeQL queries for hidden dependencies.

**Example:**

```text
Step 1 (Initial Graph): Create dependency map using import analysis
Module A → Module B → Module C

Step 2 (CodeQL Verification):
codeql query run --database=./codeql-db \
  --query="import javascript
           from Import i
           select i.getEnclosingModule(), i.getImportedModule()"

Step 3 (Self-Correction):
- CodeQL reveals: Module A also has runtime dependency on Module D via dynamic import
- Updated graph: Module A → [Module B, Module D*] → Module C
- Flag D* as runtime dependency requiring integration testing
```

**Checklist:**

- [ ] Generate static import/export dependency graph
- [ ] Create CodeQL database for the repository
- [ ] Run CodeQL queries to identify hidden dependencies
- [ ] Flag dynamic imports for manual verification
- [ ] Document circular dependencies
- [ ] Mark runtime-only dependencies with integration test requirements

---

### 1.3 Security & Quality Baseline with Fact-Checking

**Best Practice:** Run CodeQL security queries, verify findings against false-positive database.

**Example:**

```text
Step 1 (Scan): codeql analyze --format=sarif-latest
- Result: 23 potential security vulnerabilities detected

Step 2 (Verification Loop):
- For each finding, check if proper sanitization exists
- Cross-reference with framework protection patterns
- Test: Attempt to exploit in isolated environment

Step 3 (Validated Output):
- 23 findings → 8 true positives, 15 false positives (framework-protected)
- Document: "8 security issues require remediation in auth.ts:45, users.ts:123..."
```

**Checklist:**

- [ ] Run CodeQL security scan with SARIF output
- [ ] Categorize findings by severity (critical, high, medium, low)
- [ ] Verify each finding against false-positive patterns
- [ ] Test true positives in isolated environment
- [ ] Create remediation backlog with prioritization
- [ ] Document security baseline for future comparison

---

### 1.4 Test Coverage Baseline Analysis

**Best Practice:** Establish current test coverage as ground truth for modernization validation.

**Example:**

```text
Step 1 (Measure): Run test suite with coverage
jest --coverage --coverageReporters=json-summary

Step 2 (Verification Questions):
- Are all test files being discovered?
- Is coverage accurately reflecting executed code paths?
- Are there untested critical paths (auth, payments, etc.)?

Step 3 (Analysis):
- Overall coverage: 67%
- Critical modules coverage: auth.ts (45%), payments.ts (23%)
- High coverage: utils.ts (92%), validators.ts (88%)

Step 4 (Baseline Document):
- Establish minimum coverage requirements for modernization
- Flag low-coverage critical modules for priority testing
```

**Checklist:**

- [ ] Run full test suite with coverage reporting
- [ ] Identify critical modules with low coverage
- [ ] Establish minimum coverage thresholds by module type
- [ ] Document untested edge cases
- [ ] Create coverage improvement backlog

---

## Phase 2: Validation Harness Setup

### 2.1 Type Checking Infrastructure with Self-Correction

**Best Practice:** Implement strict type checking, use failures as ground truth for AI corrections.

**Example:**

```text
Step 1 (Setup): Configure TypeScript with strict settings
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUncheckedIndexedAccess": true
  }
}

Step 2 (AI Adds Types): AI suggests type annotations
function processData(data) {  // Before
function processData(data: Array<Record<string, unknown>>): DataFrame {  // After

Step 3 (Validation Loop):
- Run: npx tsc --noEmit
- Error: "Type 'Record<string, unknown>' is not assignable to type 'UserRecord'"
- AI Self-Correction: Analyze actual data flow
- Corrected: function processData(data: UserRecord[]): DataFrame {

Step 4 (Verify): tsc passes → Accept change
```

**Checklist:**

- [ ] Enable strict TypeScript configuration
- [ ] Document all type errors as baseline
- [ ] Create type error resolution plan
- [ ] Verify AI-generated types against actual data flow
- [ ] Run type checker in CI pipeline as blocking gate

---

### 2.2 Linting Rules as Validation Gates

**Best Practice:** Configure linters as automatic hallucination detectors.

**Example:**

```text
Step 1 (Configure): .eslintrc.cjs with project-specific rules
module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/strict'],
  rules: {
    'no-shadow': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    'security/detect-object-injection': 'warn'
  }
};

Step 2 (AI Refactors Code):
// AI suggests:
function calculateTotal(items: Item[]) {
    let sum = 0;  // Shadows potential built-in
    for (const item of items) {
        sum += item.price;
    }
    return sum;
}

Step 3 (Linting Catches Error):
eslint src/calculator.ts
→ error: 'sum' shadows a variable from outer scope

Step 4 (AI Self-Correction):
function calculateTotal(items: Item[]): number {
    let total = 0;
    for (const item of items) {
        total += item.price;
    }
    return total;
}
```

**Checklist:**

- [ ] Configure ESLint with strict ruleset
- [ ] Enable security-focused plugins (eslint-plugin-security)
- [ ] Set up Prettier for consistent formatting
- [ ] Document all current lint errors as baseline
- [ ] Create lint error resolution plan
- [ ] Integrate linting as pre-commit hook

---

### 2.3 Test Harness as Ground Truth

**Best Practice:** Existing tests must pass; new code requires tests before acceptance.

**Example:**

```text
Step 1 (Baseline): Run existing test suite
jest --coverage
→ 156 passed, 12 failed, 67% coverage

Step 2 (AI Refactors Module):
// AI modernizes authentication.ts

Step 3 (Validation Gate):
jest tests/authentication.test.ts
→ 8 passed, 4 failed

Step 4 (Self-Correction Loop):
- AI analyzes failures: "Expected bcrypt, code uses argon2"
- AI checks git history: "Migration to argon2 in commit abc123"
- AI corrects refactoring to preserve argon2
- Rerun: 12 passed, 0 failed → Accept change

Step 5 (New Test Requirement):
- AI adds new feature: rate limiting
- Validation gate: "No tests found for rateLimiter.ts"
- AI generates tests before feature accepted
```

**Checklist:**

- [ ] Run full test suite to establish baseline
- [ ] Document all failing tests with root causes
- [ ] Require tests for all new code additions
- [ ] Set up test coverage thresholds as CI gates
- [ ] Implement mutation testing for test quality validation

---

### 2.4 Build Verification System

**Best Practice:** Ensure build process validates code integrity.

**Example:**

```text
Step 1 (Build Configuration):
// package.json scripts
{
  "scripts": {
    "prebuild": "rimraf lib && tsc --noEmit",
    "build": "esbuild src/index.ts --bundle --outdir=lib/ --platform=node",
    "postbuild": "node scripts/verify-build.js"
  }
}

Step 2 (Verification Script):
// scripts/verify-build.js
const fs = require('fs');
const path = require('path');

// Verify expected outputs exist
const requiredFiles = ['lib/index.js', 'lib/index.js.map'];
for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(__dirname, '..', file))) {
    console.error(`Missing required build output: ${file}`);
    process.exit(1);
  }
}

// Verify no source maps leak secrets
const sourceMap = fs.readFileSync('lib/index.js.map', 'utf8');
if (sourceMap.includes('API_KEY') || sourceMap.includes('SECRET')) {
  console.error('Source map contains sensitive information');
  process.exit(1);
}

console.log('Build verification passed');
```

**Checklist:**

- [ ] Set up pre-build type checking
- [ ] Create post-build verification script
- [ ] Verify build outputs exist and are valid
- [ ] Check for secrets leakage in build artifacts
- [ ] Validate bundle size stays within acceptable limits

---

## Phase 3: Architecture Documentation with Verification

### 3.1 System Architecture Mapping with Cross-Validation

**Best Practice:** Generate architecture diagrams, validate against actual runtime behavior.

**Example:**

```text
Step 1 (Static Analysis): AI analyzes imports and class relationships
Generated architecture:
[Entry Point] → [Action Logic] → [Jira Client] → [External API]

Step 2 (Verification Questions):
- Does runtime behavior match static structure?
- Are there circular dependencies?
- Do deployment boundaries align with logical boundaries?

Step 3 (Runtime Validation):
- Add logging to trace actual call paths
- Run integration tests with call graph profiling
- Result: Action Logic directly calls External API in 2 locations
  (bypasses Jira Client abstraction)

Step 4 (Corrected Architecture):
[Entry Point] → [Action Logic] ⇄ [Jira Client]
                    ↓ (2 legacy paths - marked for refactoring)
               [External API]
```

**Checklist:**

- [ ] Generate static architecture diagram from imports
- [ ] Validate architecture against runtime call traces
- [ ] Identify architectural violations (layer bypassing)
- [ ] Document intended vs actual architecture
- [ ] Create refactoring backlog for architectural fixes

---

### 3.2 Component Relationship Documentation with Fact-Checking

**Best Practice:** Document each component's purpose, validate against actual usage.

**Example:**

```text
Step 1 (AI Documentation):
"JiraClient: Handles Jira API communication"

Step 2 (Verification):
- Grep codebase: grep -r "JiraClient\|Jira\." --include="*.ts"
- Find actual usage: Also handles caching, retry logic, rate limiting

Step 3 (Self-Correction):
"JiraClient: Manages Jira API communication including:
- HTTP request handling with retry logic
- Response caching for repeated queries
- Rate limiting to respect API quotas
- Error transformation to actionable messages
Note: Caching logic should be extracted to CacheService (technical debt)"

Step 4 (Cross-Reference):
- Check for existing issues/TODOs about caching extraction
- Validate: Documentation now matches reality + identifies improvements
```

**Checklist:**

- [ ] Document each major component's purpose
- [ ] Verify documentation against actual code usage
- [ ] Identify hidden responsibilities (feature creep)
- [ ] Document technical debt discovered during analysis
- [ ] Cross-reference with existing issue tracker

---

### 3.3 Data Flow Documentation with Verification

**Best Practice:** Map data flow through the system, validate against actual execution.

**Example:**

```text
Step 1 (AI Data Flow Map):
GitHub Event → Parse → Extract Issue Keys → Validate → Output

Step 2 (Verification):
- Add data logging at each stage
- Run with sample inputs
- Compare logged data with documented flow

Step 3 (Discovered Discrepancies):
- Validation actually happens before extraction (order wrong)
- Additional transformation step not documented

Step 4 (Corrected Data Flow):
GitHub Event
  → Parse Event Payload
  → Validate Event Type
  → Extract Text Content
  → Apply Regex Patterns
  → Deduplicate Keys
  → Validate Against Jira
  → Format Output
```

**Checklist:**

- [ ] Document expected data flow
- [ ] Add instrumentation to verify actual flow
- [ ] Compare documented vs actual flow
- [ ] Update documentation with corrections
- [ ] Identify data transformation bottlenecks

---

## Phase 4: Modernization Planning with Validation

### 4.1 Task Breakdown with Dependency Validation

**Best Practice:** Generate task list, validate dependencies through build simulation.

**Example:**

```text
Step 1 (AI Task Generation):
Task 1: Upgrade Node.js 16 → 20
Task 2: Migrate Jest 29 → 30
Task 3: Add stricter TypeScript config
Task 4: Update dependencies

Step 2 (Dependency Verification):
- Question: Can we upgrade Node.js before updating dependencies?
- Simulate: Create test branch, attempt Node.js upgrade
- Result: 8 dependencies incompatible with Node.js 20

Step 3 (Corrected Task Order):
Task 1: Audit dependencies for Node.js 20 compatibility
Task 2: Update/replace incompatible dependencies
Task 3: Upgrade Node.js 16 → 20
Task 4: Add stricter TypeScript config (benefits from Node.js 20 types)
Task 5: Migrate Jest 29 → 30 (requires Node.js 20)

Step 4 (Validation):
- Each task includes rollback plan
- Each task has acceptance criteria with automated tests
```

**Checklist:**

- [ ] Generate initial task breakdown
- [ ] Identify inter-task dependencies
- [ ] Validate task order through simulation
- [ ] Create rollback plan for each task
- [ ] Define acceptance criteria with automated verification

---

### 4.2 Risk Assessment with Historical Validation

**Best Practice:** Identify high-risk changes, validate risk level against similar past changes.

**Example:**

```text
Step 1 (AI Risk Assessment):
"Refactoring event parsing system: Medium Risk"

Step 2 (Verification Questions):
- What was the impact of previous parsing changes?
- How many modules depend on current parsing implementation?
- What is test coverage for parsing module?

Step 3 (Historical Analysis):
- Git log: Last parsing change caused 2 production incidents
- Dependency scan: 12 modules import event parsing
- Coverage: 54% (below project average of 67%)

Step 4 (Corrected Risk Assessment):
"Refactoring event parsing system: HIGH RISK
- Previous parsing changes caused production incidents
- 12 dependent modules require regression testing
- Test coverage must increase to 90% before refactoring
- Requires feature flag for gradual rollout"
```

**Checklist:**

- [ ] Assess initial risk level for each change
- [ ] Review git history for similar past changes
- [ ] Count dependent modules for each change target
- [ ] Verify test coverage meets risk-appropriate threshold
- [ ] Create mitigation plan for high-risk changes

---

### 4.3 Incremental Migration Strategy

**Best Practice:** Plan migrations that can be paused or rolled back at any checkpoint.

**Example:**

```text
Step 1 (Migration Plan):
Phase 1: Create abstraction layer over legacy code
Phase 2: Implement new approach behind abstraction
Phase 3: Gradually shift traffic to new implementation
Phase 4: Remove legacy code

Step 2 (Checkpoint Verification):
Each phase must:
- Pass all existing tests
- Maintain backwards compatibility
- Be deployable independently
- Have rollback procedure documented

Step 3 (Validation):
- Phase 1 complete: Run full test suite ✓
- Phase 2 complete: Run A/B comparison tests ✓
- Phase 3 complete: Monitor production metrics ✓
- Phase 4 complete: Verify no legacy references remain ✓
```

**Checklist:**

- [ ] Break migration into independent phases
- [ ] Define checkpoint criteria for each phase
- [ ] Create rollback procedure for each phase
- [ ] Plan monitoring for each phase transition
- [ ] Document phase dependencies and ordering

---

## Phase 5: CI/CD Pipeline Development with Validation

### 5.1 Pipeline Design with Failure Simulation

**Best Practice:** Design pipeline stages, validate by simulating failure scenarios.

**Example:**

```yaml
# Step 1 (AI Pipeline Design):
name: CI Pipeline
on: [push, pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Lint
        run: yarn lint
      - name: Type Check
        run: yarn typecheck
      - name: Test
        run: yarn test
      - name: Build
        run: yarn build

# Step 2 (Verification Questions):
# - What happens if linting fails but tests pass?
# - Can we deploy if build succeeds but tests are skipped?
# - How do we handle flaky tests?

# Step 3 (Failure Simulation):
# - Introduce intentional lint error → Pipeline should stop
# - Skip test stage → Pipeline should fail
# - Test: 1 flaky test fails → Retried 3x before failing

# Step 4 (Corrected Pipeline):
name: CI Pipeline
on: [push, pull_request]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'yarn'
      - run: yarn install --frozen-lockfile
      - name: Lint
        run: yarn lint
      - name: Type Check
        run: yarn typecheck

  security:
    runs-on: ubuntu-latest
    needs: [lint]
    steps:
      - uses: actions/checkout@v4
      - name: CodeQL Analysis
        uses: github/codeql-action/analyze@v3

  test:
    runs-on: ubuntu-latest
    needs: [lint]
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'yarn'
      - run: yarn install --frozen-lockfile
      - name: Test with Coverage
        run: yarn test --coverage
      - name: Upload Coverage
        uses: codecov/codecov-action@v4

  build:
    runs-on: ubuntu-latest
    needs: [test, security]
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'yarn'
      - run: yarn install --frozen-lockfile
      - name: Build
        run: yarn build
      - name: Verify Build
        run: node scripts/verify-build.js
```

**Checklist:**

- [ ] Design pipeline with explicit job dependencies
- [ ] Simulate failure at each stage
- [ ] Verify pipeline blocks on failures appropriately
- [ ] Implement retry logic for transient failures
- [ ] Add manual approval gates for deployments

---

### 5.2 Docker Build Optimization with Validation

**Best Practice:** Create Docker images, validate build reproducibility and layer caching.

**Example:**

```dockerfile
# Step 1 (AI Dockerfile):
FROM node:20
COPY . /app
RUN npm install

# Step 2 (Verification):
# - Build twice: Compare image hashes
# - Result: Different hashes (non-reproducible)
# - Check: npm installs latest versions, not pinned

# Step 3 (Self-Correction):
FROM node:20-slim AS builder
WORKDIR /app

# Install dependencies first (better caching)
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy source and build
COPY tsconfig.json ./
COPY src/ ./src/
RUN yarn build

# Production image
FROM node:20-slim
WORKDIR /app

COPY --from=builder /app/lib ./lib
COPY --from=builder /app/node_modules ./node_modules
COPY package.json ./

USER node
CMD ["node", "lib/index.js"]

# Step 4 (Validation):
# - Build twice: Hashes match ✓
# - Test layer caching: Change source code, only final layers rebuild ✓
# - Verify: docker history shows optimized layers ✓
```

**Checklist:**

- [ ] Create multi-stage Dockerfile for optimization
- [ ] Verify build reproducibility (same inputs → same hash)
- [ ] Test layer caching efficiency
- [ ] Validate image runs with minimal permissions
- [ ] Check for secrets leakage in image layers

---

### 5.3 Environment Parity Validation

**Best Practice:** Ensure development, CI, and production environments behave identically.

**Example:**

```text
Step 1 (Environment Matrix):
Environment | Node | Yarn | OS
Development | 20.x | 3.x  | macOS/Windows/Linux
CI          | 20.x | 3.x  | Ubuntu
Production  | 20.x | 3.x  | Alpine Linux

Step 2 (Verification):
- Run test suite in each environment
- Compare execution time and results
- Identify environment-specific failures

Step 3 (Discrepancies Found):
- Path handling differs between Windows and Unix
- Alpine uses musl libc, causing native module issues

Step 4 (Corrected Approach):
- Use path.join() consistently instead of string concatenation
- Pin Node.js version in .nvmrc and CI config
- Add cross-platform test matrix in CI
```

**Checklist:**

- [ ] Document all environment configurations
- [ ] Create environment parity matrix
- [ ] Run tests across all environments
- [ ] Identify and fix environment-specific issues
- [ ] Implement environment validation in CI

---

## Phase 6: Review Cycles & Hallucination Detection

### 6.1 Code Review with Fact-Checking Protocol

**Best Practice:** AI-generated code must pass multi-stage verification before human review.

**Example:**

```text
Step 1 (AI Generates Code):
async function fetchUserData(userId: string): Promise<User> {
  const query = `SELECT * FROM users WHERE id = ${userId}`;
  return await db.execute(query);
}

Step 2 (Automated Verification Gates):
Gate 1 - Linting: ✓ Passes
Gate 2 - Type Checking: ✓ Passes
Gate 3 - Security Scan (CodeQL): ✗ FAILS
  → SQL injection vulnerability detected

Step 3 (AI Self-Correction):
async function fetchUserData(userId: string): Promise<User | null> {
  const query = 'SELECT * FROM users WHERE id = ?';
  const result = await db.execute(query, [userId]);
  return result.rows[0] ?? null;
}

Step 4 (Re-verification):
Gate 1 - Linting: ✓ Passes
Gate 2 - Type Checking: ✓ Passes
Gate 3 - Security Scan: ✓ Passes
Gate 4 - Unit Tests: ✓ New tests pass
→ Now ready for human review
```

**Checklist:**

- [ ] Run linting on all AI-generated code
- [ ] Run type checking on all AI-generated code
- [ ] Run security scan on all AI-generated code
- [ ] Require passing tests before human review
- [ ] Document all self-corrections in review notes

---

### 6.2 Documentation Accuracy Validation

**Best Practice:** Cross-reference documentation claims against actual code behavior.

**Example:**

```text
Step 1 (AI Documentation):
"The caching layer uses Redis with a 1-hour TTL for all queries."

Step 2 (Verification Protocol):
- Grep for Redis config: grep -r "REDIS\|redis" config/
- Check TTL settings: grep -r "ttl\|expire\|TTL" src/
- Find actual values: TTL varies by query type (5min to 24hrs)

Step 3 (Self-Correction):
"The caching layer uses Redis with variable TTL based on data type:
- Issue queries: 1 hour (3600s)
- Project metadata: 24 hours (86400s)
- User session: 5 minutes (300s)
Configuration: src/config/cache.ts:15-23"

Step 4 (Validation):
- Code reference check: File and line numbers correct ✓
- Value verification: TTL values match code ✓
```

**Checklist:**

- [ ] Verify all numeric claims against code
- [ ] Verify all file/line references exist
- [ ] Verify all feature claims are implemented
- [ ] Test all documented commands/examples
- [ ] Cross-reference with actual API behavior

---

### 6.3 Hallucination Detection Checklist

**Best Practice:** Apply systematic checks for common AI hallucination patterns.

**Example:**

```text
Hallucination Detection Protocol:

1. Dependency Claims:
   ✗ AI: "This project uses Express.js"
   ✓ Verify: grep -r "express" package.json
   → Not found → Hallucination detected

2. Version Claims:
   ✗ AI: "Upgraded to TypeScript 5.0"
   ✓ Verify: package.json shows typescript: "^4.9.4"
   → Hallucination detected

3. Feature Claims:
   ✗ AI: "Authentication supports OAuth2"
   ✓ Verify: grep -r "oauth" src/
   → No OAuth implementation found → Hallucination detected

4. Performance Claims:
   ✗ AI: "Optimized query reduces load time by 50%"
   ✓ Verify: Run benchmark tests before/after
   → Actual improvement: 12% → Hallucination detected

5. Test Coverage Claims:
   ✗ AI: "Added tests bring coverage to 85%"
   ✓ Verify: jest --coverage
   → Actual coverage: 72% → Hallucination detected

6. API Claims:
   ✗ AI: "The function accepts optional callback parameter"
   ✓ Verify: Check function signature in source
   → No callback parameter → Hallucination detected
```

**Validation Rule:** Any claim must be verifiable through:

- Code inspection
- Test execution
- Benchmark measurement
- Documentation cross-reference

**Checklist:**

- [ ] Verify all dependency claims against package.json
- [ ] Verify all version claims against lock files
- [ ] Verify all feature claims against codebase search
- [ ] Verify all performance claims against benchmarks
- [ ] Verify all coverage claims against test runs

---

### 6.4 Chain-of-Verification (CoVe) Protocol

**Best Practice:** Generate initial response, then generate verification questions, answer them, and produce final verified output.

**Example:**

```text
Step 1 (Initial Response):
"The EventManager class handles all GitHub webhook events and
dispatches them to appropriate handlers."

Step 2 (Generate Verification Questions):
Q1: Does EventManager actually exist in the codebase?
Q2: Does it handle ALL webhook events or only specific ones?
Q3: How does the dispatch mechanism work?
Q4: Are there events handled outside EventManager?

Step 3 (Answer Verification Questions):
A1: Yes, found in src/event-manager.ts
A2: Only handles push, pull_request, and issue events
A3: Uses switch statement with event type
A4: Yes, workflow_dispatch handled separately in action.ts

Step 4 (Verified Final Output):
"The EventManager class (src/event-manager.ts) handles specific
GitHub webhook events: push, pull_request, and issue events.
It dispatches events using a switch statement based on event type.
Note: workflow_dispatch events are handled separately in action.ts."
```

**Checklist:**

- [ ] Generate initial response
- [ ] Create 3-5 verification questions
- [ ] Answer each question with code evidence
- [ ] Revise response based on verified answers
- [ ] Include source references in final output

---

## Phase 7: Comprehensive Documentation Generation

### 7.1 Per-Directory README with Validation

**Best Practice:** Generate contextual README for each directory, validate against actual directory contents.

**Example:**

```text
Step 1 (AI Generates): src/README.md
"# Source Directory
Contains application source code.

## Files:
- index.ts: Entry point
- action.ts: Action logic"

Step 2 (Verification):
- List actual files: ls src/
  → index.ts, action.ts, event-manager.ts, Jira.ts, utils.ts,
    input-helper.ts, fs-helper.ts, action-error.ts, jira-issue-object.ts

Step 3 (Self-Correction):
"# Source Directory

Contains the TypeScript source code for the GitHub Action.

## Architecture Overview

```
src/
├── index.ts          # Entry point - initializes and runs action
├── action.ts         # Core action logic and orchestration
├── event-manager.ts  # GitHub event parsing and handling
├── Jira.ts           # Jira API client wrapper
├── input-helper.ts   # GitHub Action input parsing
├── fs-helper.ts      # File system utilities
├── utils.ts          # General utility functions
├── action-error.ts   # Custom error types
├── jira-issue-object.ts # Jira issue data structures
└── types/            # TypeScript type definitions
```

## Key Files

### index.ts
Entry point that initializes the action, handles top-level errors,
and sets outputs.

### action.ts
Main action logic including:
- Event processing
- Issue key extraction
- Jira API integration
- Output formatting

### event-manager.ts
Parses GitHub webhook events and extracts relevant text content
for issue key matching.

### Jira.ts
Wrapper around jira.js library providing:
- Authentication
- Issue queries
- Project validation

## Running Locally
```bash
yarn build && node lib/index.js
```

## Testing
```bash
yarn test
```"

Step 4 (Validation):
- File count matches: ✓
- Import statements verified: ✓
- Build command works: ✓
- Test command works: ✓
```

**Checklist:**

- [ ] List all files in directory
- [ ] Verify file descriptions match actual code
- [ ] Include architecture diagram/overview
- [ ] Document key entry points
- [ ] Verify all commands work
- [ ] Cross-reference imports and exports

---

### 7.2 File-Level Purpose Documentation

**Best Practice:** Document each file's purpose, validate against imports and usage.

**Example:**

```text
Step 1 (AI Documents): src/utils.ts
"Purpose: Utility functions"

Step 2 (Deep Verification):
- Analyze imports: What does this file import?
  → lodash, types
- Analyze exports: What do other files import from this?
  → Used in: action.ts, event-manager.ts, Jira.ts
- Check actual functions: extractIssueKeys, formatOutput, parseConfig

Step 3 (Comprehensive Documentation):
"# utils.ts

## Purpose
Provides utility functions used across the action for text processing,
data transformation, and configuration parsing.

## Key Functions

### extractIssueKeys(text: string, pattern: RegExp): string[]
Extracts Jira issue keys from text using provided regex pattern.
**Used by**: event-manager.ts for parsing event content
**Returns**: Array of unique, uppercase issue keys

### formatOutput(keys: string[], format: 'json' | 'csv'): string
Formats issue keys for GitHub Action output.
**Used by**: action.ts for setting action outputs
**Returns**: Formatted string based on specified format

### parseConfig(inputs: ActionInputs): Config
Parses and validates action inputs into typed configuration.
**Used by**: index.ts during initialization
**Throws**: ActionError if required inputs missing

## Dependencies
- lodash: For array operations (uniq, flatten)
- types: Internal type definitions

## Testing
Tests located in: __tests__/utils.test.ts
Run: `yarn test utils`
Coverage: 89%"

Step 4 (Validation):
- All function signatures verified against actual code: ✓
- Import statements confirmed: ✓
- Usage locations checked: ✓
- Test file exists and runs: ✓
```

**Checklist:**

- [ ] Document file purpose in one sentence
- [ ] List all exported functions/classes
- [ ] Document parameters and return types
- [ ] Identify all consumers of this file
- [ ] Link to corresponding test file
- [ ] Verify all documentation against actual code

---

### 7.3 Navigation-Optimized Documentation Structure

**Best Practice:** Ensure every directory has README visible when browsing GitHub.

**Example:**

```text
Step 1 (Directory Structure Audit):
project/
├── src/
│   ├── types/
│   │   └── (no README) ✗
│   └── README.md ✓
├── __tests__/
│   └── (no README) ✗
├── .github/
│   └── workflows/
│       └── (no README) ✗
└── docs/
    └── README.md ✓

Step 2 (AI Generates Missing READMEs):

For src/types/:
"# Type Definitions

This directory contains TypeScript type definitions used throughout
the action.

## Files

- index.ts: Main type exports (ActionInputs, ActionOutputs)
- complex-types.ts: Complex/nested type definitions

## Usage

Import types from the index:
```typescript
import { ActionInputs, JiraIssue } from './types';
```

## Adding New Types

1. Add type definition to appropriate file
2. Export from index.ts if needed externally
3. Update this README"

For __tests__/:
"# Test Suite

Jest tests for the GitHub Action.

## Running Tests

```bash
# Run all tests
yarn test

# Run with coverage
yarn test --coverage

# Run specific test file
yarn test event-manager
```

## Test Structure

- *.test.ts: Unit tests for corresponding source files
- fixtures/: Test data and mock responses

## Writing Tests

See existing tests for patterns. Each source file should have
corresponding test file."

Step 3 (Validation):
- Navigate GitHub UI: Every directory now shows README ✓
- Links work: All cross-references valid ✓
- Commands tested: All example commands execute successfully ✓
```

**Checklist:**

- [ ] Audit all directories for README presence
- [ ] Generate README for each directory without one
- [ ] Include file listing and purpose
- [ ] Add usage examples where appropriate
- [ ] Test all documented commands
- [ ] Verify navigation works in GitHub UI

---

### 7.4 API Documentation with Examples

**Best Practice:** Document all public APIs with working examples.

**Example:**

```text
Step 1 (Identify Public APIs):
- Action inputs (from action.yml)
- Action outputs (from action.yml)
- Exported functions (if used as library)

Step 2 (Document with Examples):
"## Action Inputs

| Input | Required | Default | Description |
|-------|----------|---------|-------------|
| `jira-base-url` | Yes | - | Your Jira instance URL |
| `jira-user-email` | Yes | - | Jira user email for API auth |
| `jira-api-token` | Yes | - | Jira API token |
| `from` | No | `commits` | Source to extract keys from |

### Example Usage

```yaml
- uses: bitflight-devops/github-action-jira-find-issue-keys@v1
  id: jira
  with:
    jira-base-url: 'https://your-org.atlassian.net'
    jira-user-email: ${{ secrets.JIRA_USER_EMAIL }}
    jira-api-token: ${{ secrets.JIRA_API_TOKEN }}
    from: 'pull_request'

- name: Use found keys
  run: echo "Found keys: ${{ steps.jira.outputs.issue-keys }}"
```"

Step 3 (Validation):
- Example syntax valid: ✓
- Input names match action.yml: ✓
- Secret references follow best practices: ✓
- Output names match action.yml: ✓
```

**Checklist:**

- [ ] Document all inputs with types and defaults
- [ ] Document all outputs with formats
- [ ] Provide working usage examples
- [ ] Verify examples against actual action.yml
- [ ] Test examples in real workflow

---

## Phase 8: Continuous Validation Loop

### 8.1 Pre-Commit Validation Harness

**Best Practice:** Implement automated validation before any code is committed.

**Example:**

```yaml
# .husky/pre-commit
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# Run lint-staged for affected files
npx lint-staged

# Type check entire project
yarn typecheck

# Run affected tests
yarn test --changedSince=HEAD~1
```

```javascript
// lint-staged.config.js
module.exports = {
  '*.{ts,tsx}': [
    'eslint --fix',
    'prettier --write',
  ],
  '*.{json,md,yml,yaml}': [
    'prettier --write',
  ],
};
```

**Validation Flow:**

1. Developer commits code
2. Pre-commit hook triggers all checks
3. Any failure blocks commit
4. Developer sees specific error
5. Developer fixes issue
6. Retry commit → Success only when all checks pass

**Checklist:**

- [ ] Set up husky for git hooks
- [ ] Configure lint-staged for incremental checks
- [ ] Add type checking to pre-commit
- [ ] Add relevant test execution to pre-commit
- [ ] Document how to bypass hooks if needed

---

### 8.2 Documentation Drift Detection

**Best Practice:** Automatically detect when code changes make documentation inaccurate.

**Example:**

```typescript
// scripts/detect-doc-drift.ts
import * as fs from 'fs';
import * as path from 'path';

interface DocumentedFunction {
  name: string;
  signature: string;
  file: string;
  line: number;
}

async function checkFunctionSignatures(): Promise<void> {
  const readmes = findAllReadmes();

  for (const readme of readmes) {
    const documented = extractFunctionDocs(readme);

    for (const func of documented) {
      const actual = await inspectSourceCode(func.name, func.file);

      if (actual && func.signature !== actual.signature) {
        console.error(`Drift detected in ${readme}:`);
        console.error(`  Function: ${func.name}`);
        console.error(`  Documented: ${func.signature}`);
        console.error(`  Actual: ${actual.signature}`);
        process.exitCode = 1;
      }
    }
  }
}

checkFunctionSignatures();
```

```yaml
# .github/workflows/doc-validation.yml
name: Documentation Validation

on:
  pull_request:
    paths:
      - 'src/**'
      - 'docs/**'
      - '*.md'

jobs:
  check-drift:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: yarn install
      - name: Check Documentation Drift
        run: npx ts-node scripts/detect-doc-drift.ts
```

**Checklist:**

- [ ] Create documentation drift detection script
- [ ] Add drift check to CI pipeline
- [ ] Set up alerts for documentation drift
- [ ] Create process for updating stale documentation
- [ ] Track documentation accuracy metrics

---

### 8.3 Continuous Integration Quality Gates

**Best Practice:** Enforce quality thresholds that block merging.

**Example:**

```yaml
# .github/workflows/quality-gates.yml
name: Quality Gates

on: [pull_request]

jobs:
  coverage-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: yarn install
      - run: yarn test --coverage --coverageReporters=json-summary
      - name: Check Coverage Threshold
        run: |
          COVERAGE=$(cat coverage/coverage-summary.json | jq '.total.lines.pct')
          if (( $(echo "$COVERAGE < 80" | bc -l) )); then
            echo "Coverage $COVERAGE% is below 80% threshold"
            exit 1
          fi

  security-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Initialize CodeQL
        uses: github/codeql-action/init@v3
        with:
          languages: javascript
      - name: Perform CodeQL Analysis
        uses: github/codeql-action/analyze@v3
        with:
          fail-on: error

  bundle-size:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: yarn install
      - run: yarn build
      - name: Check Bundle Size
        run: |
          SIZE=$(stat -f%z lib/index.js 2>/dev/null || stat -c%s lib/index.js)
          MAX_SIZE=1048576  # 1MB
          if [ $SIZE -gt $MAX_SIZE ]; then
            echo "Bundle size $SIZE exceeds $MAX_SIZE limit"
            exit 1
          fi
```

**Checklist:**

- [ ] Set minimum test coverage threshold
- [ ] Enable security scanning with failure on errors
- [ ] Set bundle size limits
- [ ] Add type checking as required check
- [ ] Add lint checking as required check
- [ ] Configure branch protection rules

---

### 8.4 Periodic Validation Audits

**Best Practice:** Schedule regular comprehensive validation beyond CI checks.

**Example:**

```yaml
# .github/workflows/weekly-audit.yml
name: Weekly Validation Audit

on:
  schedule:
    - cron: '0 0 * * 0'  # Every Sunday at midnight
  workflow_dispatch:

jobs:
  full-audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Dependency Audit
        run: yarn audit --groups dependencies
        continue-on-error: true

      - name: License Compliance Check
        run: npx license-checker --onlyAllow 'MIT;Apache-2.0;BSD-2-Clause;BSD-3-Clause;ISC'

      - name: Full Security Scan
        uses: github/codeql-action/analyze@v3
        with:
          category: weekly-audit

      - name: Documentation Freshness
        run: |
          # Check if docs modified more recently than source
          DOC_DATE=$(git log -1 --format=%ct docs/)
          SRC_DATE=$(git log -1 --format=%ct src/)
          if [ $SRC_DATE -gt $DOC_DATE ]; then
            echo "Warning: Source modified after documentation"
          fi

      - name: Create Audit Report
        run: |
          echo "# Weekly Audit Report" > audit-report.md
          echo "Generated: $(date)" >> audit-report.md
          # Add audit results...

      - name: Upload Report
        uses: actions/upload-artifact@v4
        with:
          name: audit-report
          path: audit-report.md
```

**Checklist:**

- [ ] Schedule weekly dependency audits
- [ ] Schedule weekly security scans
- [ ] Check documentation freshness
- [ ] Verify license compliance
- [ ] Generate and store audit reports
- [ ] Create alerts for critical findings

---

## Appendix A: Tool Reference

### Static Analysis Tools

| Tool | Purpose | Command |
|------|---------|---------|
| TypeScript | Type checking | `npx tsc --noEmit` |
| ESLint | Linting | `npx eslint src/` |
| CodeQL | Security scanning | `codeql analyze` |
| Prettier | Formatting | `npx prettier --check .` |

### Testing Tools

| Tool | Purpose | Command |
|------|---------|---------|
| Jest | Unit testing | `yarn test` |
| Jest Coverage | Coverage reporting | `yarn test --coverage` |

### Documentation Tools

| Tool | Purpose | Command |
|------|---------|---------|
| TypeDoc | API documentation | `npx typedoc` |
| Markdown Lint | Doc linting | `npx markdownlint "**/*.md"` |

---

## Appendix B: Validation Checklist Template

Use this template for each AI-generated artifact:

```markdown
## Validation Checklist for [Artifact Name]

### Pre-Generation
- [ ] Context gathered from codebase
- [ ] Verification questions defined
- [ ] Acceptance criteria established

### Post-Generation
- [ ] Linting passes
- [ ] Type checking passes
- [ ] Security scan passes
- [ ] Tests pass (existing + new)
- [ ] Documentation accurate
- [ ] No hallucinations detected

### Verification Evidence
- Lint output: [paste/link]
- Type check output: [paste/link]
- Test results: [paste/link]
- Security scan: [paste/link]

### Sign-off
- [ ] AI self-review complete
- [ ] Human review complete
```

---

## Appendix C: Common Hallucination Patterns

| Pattern | Detection | Prevention |
|---------|-----------|------------|
| Non-existent dependencies | `grep package.json` | Verify before claiming |
| Wrong version numbers | Check lock files | Always cite source |
| Fabricated functions | Search codebase | Verify function exists |
| Incorrect paths | `ls` / `find` | Validate paths exist |
| Wrong configurations | Read config files | Quote from actual config |
| Invented APIs | Check actual types | Verify against source |
| Performance claims | Run benchmarks | Measure, don't guess |
| Coverage claims | Run coverage report | Report actual numbers |

---

## Revision History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | Initial | Initial checklist creation |

---

*This checklist should be used iteratively throughout the modernization process. Each phase builds on previous validations to ensure accuracy and prevent technical debt accumulation.*
