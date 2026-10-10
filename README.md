<!-- start title -->

# GitHub Action: Find Jira Issue Keys In GitHub Event

<!-- end title -->
<!-- start description -->

This action will find the issue keys in the GitHub event and return them as a comma separated list

<!-- end description -->

## Action Usage

<!-- start usage -->

```yaml
- uses: bitflight-devops/github-action-jira-find-issue-keys@v1.1.13
  with:
    # GitHub token for reading commit history or updating pull requests; string,
    # branch, and title extraction do not require it
    token: ''

    # Find from predefined place. Can be 'branch', 'pull_request' (title), 'string',
    # 'commits', or 'all'; default is 'commits'
    # Default: commits
    from: ''

    # A string to search for issues
    # Default:
    string: ''

    # A comma separated list of project names to include in the results by, i.e.
    # DEVOPS,PROJECT1
    # Default:
    projects: ''

    # A comma separated list of project names to exclude from the results by, i.e.
    # INTERNAL,PROJECT2
    projects_ignore: ''

    # When parsing commit messages, include merge and pull messages. This is disabled
    # by default, to exclude tickets that may be included or fixed in other branches
    # or pull requests.
    # Default: false
    include_merge_messages: ''

    # The Git Head Ref to which commit messages will be collected up to. Overrides the
    # head reference from the GitHub event when provided.
    head_ref: ''

    # The Git Base Ref to which commit messages will be collected up from.
    base_ref: ''

    # Should the commit messages be ignored when looking for issues
    # Default: false
    ignore_commits: ''

    # The URL of the GitHub API to use. This allows those with GitHub Enterprise to
    # use the GitHub Enterprise API.
    github_api_url: ''

    # The version of the GitHub Enterprise Server to use. This allows those with
    # GitHub Enterprise to use the GitHub Enterprise API. Available versions to use:
    # 3.2, 3.3, 3.4, 3.5
    # Default: 3.5
    github_enterprise_server_version: ''

    # Jira base URL including protocol, or environment variable JIRA_BASE_URL.
    # Required only when update_pull_request is enabled on a pull request event.
    jira_base_url: ''

    # Jira Cloud email or Data Center Basic-auth username, or environment variable
    # JIRA_USER_EMAIL. Required only for pull request enrichment.
    jira_user_email: ''

    # Jira Cloud API token or Data Center Basic-auth password, or environment variable
    # JIRA_API_TOKEN. Required only for pull request enrichment; this is not a
    # Bearer/PAT input.
    jira_api_token: ''

    # Fail the step if extraction, Jira enrichment, or the GitHub update fails; enable
    # this for CI validation
    # Default: false
    fail_on_error: ''

    # Fetch Jira issue details and update the pull request title/body with the keys
    # found. Disabled by default; extraction alone does not contact Jira.
    # Default: false
    update_pull_request: ''
```

<!-- end usage -->

## Extraction and Jira enrichment

The `from` input selects the source used for `issue` and `issues`. Keys are normalized to uppercase, deduplicated in encounter order, and filtered by `projects` and `projects_ignore`. Exclusions take precedence. Extraction recognizes issue-key syntax; it does not check whether an issue exists in Jira.

| `from`              | Source                                                       | Network access for extraction                     |
| ------------------- | ------------------------------------------------------------ | ------------------------------------------------- |
| `string`            | The `string` input                                           | None; no credentials required                     |
| `branch`            | `head_ref`, the PR head branch, or the event ref             | None; no credentials required                     |
| `pull_request`      | The PR title                                                 | None; no credentials required                     |
| `commits` (default) | All pages of PR commits, or a push's before/after comparison | GitHub token required for API requests            |
| `all`               | String, PR title, branch, and commits in that order          | GitHub for commits, unless `ignore_commits: true` |

For a new branch, where GitHub supplies an all-zero `before` SHA, the action uses the commits supplied in the push event. For a deleted branch it reports no new commits. Explicit `base_ref` and `head_ref` select a comparison range for non-PR events. Outputs for unselected sources are empty strings, as are `issue` and `issues` when no key matches.

Set `update_pull_request: true` to fetch matching issues from Jira and update the PR title and linked-issues section of its body. This requires a GitHub token with pull-request write access and the Jira credentials listed below. The action waits for both the Jira lookups and the completed GitHub update. Non-PR events skip enrichment. For CI, set `fail_on_error: true` so missing issues, denied requests, and API failures fail the step; the legacy default is `false`.

The Jira client uses REST API v2 with Basic authentication. Jira Cloud uses an email and API token. The disposable Data Center E2E environment uses its test username/password in the same inputs. Bearer/PAT authentication is not implemented by these inputs.

## Development and CI verification

Use Node.js 24 and the vendored Yarn release:

```sh
node .yarn/releases/yarn-3.3.0.cjs install --immutable
node .yarn/releases/yarn-3.3.0.cjs lint:source
node .yarn/releases/yarn-3.3.0.cjs test:ci --runInBand
node .yarn/releases/yarn-3.3.0.cjs build
node .yarn/releases/yarn-3.3.0.cjs test:packaged
node .yarn/releases/yarn-3.3.0.cjs test:release
```

CI also runs actionlint 1.7.12 and checks that rebuilding leaves the committed `lib/` bundle unchanged. The bundle targets Node 24 and retains source maps without embedded dependency source text. Commit the rebuilt bundle with source changes.

The source tests and packaged-action tests use deterministic GitHub/Jira HTTP fixtures and no hosted credentials. The packaged tests execute the `action.yml` entry point in a child process, pass GitHub event/input files, inspect its actual output file and exit code, and assert that PR updates finish before success is reported.

The **Jira Integration E2E** workflow adds a disposable Jira Data Center instance. After Jira and project `E2E` have been initialized, its test can also be run locally:

```sh
E2E_JIRA_BASE_URL=http://127.0.0.1:8080 \
  node .yarn/releases/yarn-3.3.0.cjs test:e2e:jira
```

`E2E_JIRA_USERNAME` and `E2E_JIRA_PASSWORD` default to `admin`; `E2E_JIRA_PROJECT` defaults to `E2E`. The test creates its own Jira issue, executes the packaged action against real Jira and a local GitHub HTTP fixture, checks the completed PR update's real summary/status/link, deletes the issue, and verifies that a subsequent Jira 404 fails the action without updating GitHub. It cleans up its issue on failure. This lane validates Data Center behavior; it does not emulate Jira Cloud Enterprise.

The release workflow starts after successful Jira E2E testing of a push to `main`. It checks that the tested revision is still current, repeats the strict build and test gates, and prepares only version and documentation changes. The next release increments the patch component after the highest stable package version or existing `vX.Y.Z` tag. It publishes the metadata commit and its exact tag in one atomic push, then creates the GitHub release. It uses `GITHUB_TOKEN`; repository rules that prevent the push cause the workflow to fail.

## GitHub Action Inputs

<!-- start inputs -->

| **Input**                              | **Description**                                                                                                                                                                  | **Default** | **Required** |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------------ |
| **`token`**                            | GitHub token for reading commit history or updating pull requests; string, branch, and title extraction do not require it                                                        |             | **false**    |
| **`from`**                             | Find from predefined place. Can be 'branch', 'pull_request' (title), 'string', 'commits', or 'all'; default is 'commits'                                                         | `commits`   | **false**    |
| **`string`**                           | A string to search for issues                                                                                                                                                    |             | **false**    |
| **`projects`**                         | A comma separated list of project names to include in the results by, i.e. DEVOPS,PROJECT1                                                                                       |             | **false**    |
| **`projects_ignore`**                  | A comma separated list of project names to exclude from the results by, i.e. INTERNAL,PROJECT2                                                                                   |             | **false**    |
| **`include_merge_messages`**           | When parsing commit messages, include merge and pull messages. This is disabled by default, to exclude tickets that may be included or fixed in other branches or pull requests. | `false`     | **false**    |
| **`head_ref`**                         | The Git Head Ref to which commit messages will be collected up to. Overrides the head reference from the GitHub event when provided.                                             |             | **false**    |
| **`base_ref`**                         | The Git Base Ref to which commit messages will be collected up from.                                                                                                             |             | **false**    |
| **`ignore_commits`**                   | Should the commit messages be ignored when looking for issues                                                                                                                    |             | **false**    |
| **`github_api_url`**                   | The URL of the GitHub API to use. This allows those with GitHub Enterprise to use the GitHub Enterprise API.                                                                     |             | **false**    |
| **`github_enterprise_server_version`** | The version of the GitHub Enterprise Server to use. This allows those with GitHub Enterprise to use the GitHub Enterprise API. Available versions to use: 3.2, 3.3, 3.4, 3.5     | `3.5`       | **false**    |
| **`jira_base_url`**                    | Jira base URL including protocol, or environment variable JIRA_BASE_URL. Required only when update_pull_request is enabled on a pull request event.                              |             | **false**    |
| **`jira_user_email`**                  | Jira Cloud email or Data Center Basic-auth username, or environment variable JIRA_USER_EMAIL. Required only for pull request enrichment.                                         |             | **false**    |
| **`jira_api_token`**                   | Jira Cloud API token or Data Center Basic-auth password, or environment variable JIRA_API_TOKEN. Required only for pull request enrichment; this is not a Bearer/PAT input.      |             | **false**    |
| **`fail_on_error`**                    | Fail the step if extraction, Jira enrichment, or the GitHub update fails; enable this for CI validation                                                                          | `false`     | **false**    |
| **`update_pull_request`**              | Fetch Jira issue details and update the pull request title/body with the keys found. Disabled by default; extraction alone does not contact Jira.                                |             | **false**    |

<!-- end inputs -->

## GitHub Action Outputs

<!-- start outputs -->

| \***\*Output\*\***  | \***\*Description\*\***                                                                    | \***\*Default\*\*** | \***\*Required\*\*** |
| ------------------- | ------------------------------------------------------------------------------------------ | ------------------- | -------------------- |
| `projects_included` | A comma separated list of projects from the 'projects' input provided                      | undefined           | undefined            |
| `projects_excluded` | A comma separated list of ignored projects from the 'projects_ignore' input provided       | undefined           | undefined            |
| `projects_found`    | A comma separated list of project names to include in the results by, i.e. DEVOPS,PROJECT1 | undefined           | undefined            |
| `issue`             | The first Jira issue key found in the event                                                | undefined           | undefined            |
| `issues`            | A comma separated list of all Jira Issues found                                            | undefined           | undefined            |
| `title_issues`      | A comma separated list of Jira Issues found in the pull_request title                      | undefined           | undefined            |
| `commit_issues`     | A comma separated list of Jira Issues found in the commits provided                        | undefined           | undefined            |
| `ref_issues`        | A comma separated list of Jira Issues found in the git ref                                 | undefined           | undefined            |
| `string_issues`     | A comma separated list of Jira Issues found in the input string                            | undefined           | undefined            |

<!-- end outputs -->
