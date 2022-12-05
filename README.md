<!-- start title -->

# GitHub Action: Find Jira Issue Keys In GitHub Event

<!-- end title -->
<!-- start description -->

This action will find the issue keys in the GitHub event and return them as a comma separated list

<!-- end description -->

## Action Usage

<!-- start usage -->

```yaml
- uses: bitflight-devops/github-action-jira-find-issue-keys@v1.0.11
  with:
    # The github token used for authenticating to GitHub
    token: ''

    # Find from predefined place. Can be 'branch', 'pull_request', 'string', or
    # 'commits', default is 'commits'
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

    # The Git Head Ref to which commit messages will be collected up to. If the
    # base_ref is included, and the github event is a pull_request or push, The
    # head_ref from the event will be used.
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

    # The Jira cloud base url including protocol i.e. 'https://company.atlassian.net'
    # or use environment variable JIRA_BASE_URL
    jira_base_url: ''

    # The Jira cloud user email address or use environment variable JIRA_USER_EMAIL
    jira_user_email: ''

    # The Jira cloud user api token or use environment variable JIRA_API_TOKEN
    jira_api_token: ''

    # If there is an error during transition, the action will error out.
    # Default: false
    fail_on_error: ''
```

<!-- end usage -->

## GitHub Action Inputs

<!-- start inputs -->

| **Input**                              | **Description**                                                                                                                                                                           | **Default** | **Required** |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------------ |
| **`token`**                            | The github token used for authenticating to GitHub                                                                                                                                        |             | **false**    |
| **`from`**                             | Find from predefined place. Can be 'branch', 'pull_request', 'string', or 'commits', default is 'commits'                                                                                 | `commits`   | **false**    |
| **`string`**                           | A string to search for issues                                                                                                                                                             |             | **false**    |
| **`projects`**                         | A comma separated list of project names to include in the results by, i.e. DEVOPS,PROJECT1                                                                                                |             | **false**    |
| **`projects_ignore`**                  | A comma separated list of project names to exclude from the results by, i.e. INTERNAL,PROJECT2                                                                                            |             | **false**    |
| **`include_merge_messages`**           | When parsing commit messages, include merge and pull messages. This is disabled by default, to exclude tickets that may be included or fixed in other branches or pull requests.          | `false`     | **false**    |
| **`head_ref`**                         | The Git Head Ref to which commit messages will be collected up to. If the base_ref is included, and the github event is a pull_request or push, The head_ref from the event will be used. |             | **false**    |
| **`base_ref`**                         | The Git Base Ref to which commit messages will be collected up from.                                                                                                                      |             | **false**    |
| **`ignore_commits`**                   | Should the commit messages be ignored when looking for issues                                                                                                                             |             | **false**    |
| **`github_api_url`**                   | The URL of the GitHub API to use. This allows those with GitHub Enterprise to use the GitHub Enterprise API.                                                                              |             | **false**    |
| **`github_enterprise_server_version`** | The version of the GitHub Enterprise Server to use. This allows those with GitHub Enterprise to use the GitHub Enterprise API. Available versions to use: 3.2, 3.3, 3.4, 3.5              | `3.5`       | **false**    |
| **`jira_base_url`**                    | The Jira cloud base url including protocol i.e. 'https://company.atlassian.net' or use environment variable JIRA_BASE_URL                                                                 |             | **false**    |
| **`jira_user_email`**                  | The Jira cloud user email address or use environment variable JIRA_USER_EMAIL                                                                                                             |             | **false**    |
| **`jira_api_token`**                   | The Jira cloud user api token or use environment variable JIRA_API_TOKEN                                                                                                                  |             | **false**    |
| **`fail_on_error`**                    | If there is an error during transition, the action will error out.                                                                                                                        | `false`     | **false**    |

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
