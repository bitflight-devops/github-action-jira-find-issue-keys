/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable security/detect-object-injection */
import * as core from '@actions/core'
import * as github from '@actions/github'
import { Context } from '@actions/github/lib/context'
import { graphql } from '@octokit/graphql'
import { CommitHistoryConnection, GitObject, Maybe, Ref, Repository } from '@octokit/graphql-schema'

import { Args, RefRange } from './@types'
import Jira from './Jira'
import { assignRefs, issueIdRegEx } from './utils'

export const token = core.getInput('token') || core.getInput('github-token') || process.env.GITHUB_TOKEN || 'NO_TOKEN'

const octokit = github.getOctokit(token)
interface CommitHistory extends GitObject {
  history?: Maybe<CommitHistoryConnection>
}
interface RefCommits extends Ref {
  target?: Maybe<CommitHistory>
}
interface RepositoryDateRange extends Repository {
  startPoint?: Maybe<RefCommits>
  endPoint?: Maybe<RefCommits>
}

interface DateRange {
  startDate: string
  endDate: string
}
const GetStartAndEndPoints = `
query getStartAndEndPoints($owner: String!, $repo: String!, $headRef: String!,$baseRef: String!) {
  repository(owner: $owner, name: $repo) {
    endPoint: ref(qualifiedName: $headRef) {
      ...internalBranchContent
    }
    startPoint: ref(qualifiedName: $baseRef) {
      ...internalBranchContent
    }
  }
}

fragment internalBranchContent on Ref {
  target {
    ... on Commit {
      history(first: 1) {
        edges {
          node {
            committedDate
          }
        }
      }
    }
  }
}
`
const listCommitMessagesInPullRequest = `
query listCommitMessagesInPullRequest($owner: String!, $repo: String!, $prNumber: Int!, $after: String) {
  repository(owner: $owner, name: $repo) {
    pullRequest(number: $prNumber) {
      baseRef {
        name
      }
      headRef {
        name
      }
      commits(first: 100, after: $after) {
        nodes {
          commit {
            message
          }
        }
        pageInfo {
          startCursor
          hasNextPage
          endCursor
        }
      }
    }
  }
}
`

const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${token}`
  }
})

export interface ProjectFilter {
  projectsIncluded?: string[]
  projectsExcluded?: string[]
}

export default class EventManager {
  context: Context
  filter: ProjectFilter
  jira: Jira
  refRange: RefRange
  includeMergeMessages: boolean
  failOnError = false
  listenForEvents: string[] = []
  rawString: string

  constructor(context: Context, jira: Jira, argv: Args) {
    this.jira = jira
    this.context = context
    this.failOnError = argv.failOnError
    this.refRange = assignRefs(context, argv, octokit)
    this.includeMergeMessages = argv.includeMergeMessages
    this.rawString = argv.string
    this.filter = {
      projectsIncluded:
        argv.projects && argv.projects != '' ? argv.projects.split(',').map(i => i.trim().toUpperCase()) : undefined,
      projectsExcluded:
        argv.projectsIgnore && argv.projectsIgnore != ''
          ? argv.projectsIgnore.split(',').map(i => i.trim().toUpperCase())
          : undefined
    }
  }

  isProjectOfIssueSelected(issueKey: string): boolean {
    const project = issueKey.split('-')[0]
    if (!project || project.length == 0) return false
    if (this.filter.projectsExcluded && this.filter.projectsExcluded.includes(project.toUpperCase())) {
      core.debug(`${issueKey} is excluded because of a specific project filter exclusion`)
      return false
    } else if (!this.filter.projectsIncluded || this.filter.projectsIncluded == []) {
      core.debug(`${issueKey} is included because there is no specific project filter`)
      return true
    } else if (this.filter.projectsIncluded.includes(project.trim().toUpperCase())) {
      core.debug(`${issueKey} is included because there its part of the specific project filter`)
      return true
    }
    core.debug(`${issueKey} is excluded because it doesn't belong to the included projects`)
    return false
  }

  getIssueSetFromString(str: string, _set: Set<string> | undefined = undefined): Set<string> {
    const set = _set || new Set<string>()
    if (str) {
      const match = str.match(issueIdRegEx)

      if (match) {
        for (const issueKey of match) {
          if (this.isProjectOfIssueSelected(issueKey)) {
            set.add(issueKey)
          }
        }
      }
    }
    return set
  }

  setToCommaDelimitedString(strSet: Set<string> | undefined): string {
    if (strSet) {
      return Array.from(strSet).join(',')
    }
    return ''
  }

  async getStartAndEndDates(range: RefRange): Promise<DateRange> {
    const { repository } = await graphqlWithAuth<{ repository: RepositoryDateRange }>(GetStartAndEndPoints, {
      ...this.context.repo,
      ...range
    })
    const startDateList = repository?.startPoint?.target?.history?.edges
    const startDate = startDateList ? startDateList[0]?.node?.committedDate : ''
    const endDateList = repository?.endPoint?.target?.history?.edges
    const endDate = endDateList ? endDateList[0]?.node?.committedDate : ''
    return { startDate, endDate }
  }

  async getJiraKeysFromGitRange(): Promise<void> {
    core.info(
      `EventName: ${this.context.eventName} Head Ref: ${this.refRange.headRef}, Base Ref: ${this.refRange.baseRef}`
    )
    if (!(this.refRange.baseRef && this.refRange.headRef) && !this.context.eventName.startsWith('pull_request')) {
      core.info('getJiraKeysFromGitRange: Base ref and head ref not found')
      return
    }
    core.info(
      `getJiraKeysFromGitRange: Getting list of github commits between ${this.refRange.baseRef} and ${this.refRange.headRef}`
    )
    const stringSet = this.getIssueSetFromString(this.rawString)
    if (this.rawString) {
      core.debug(`Raw string provided is: ${this.rawString}`)
      core.setOutput('string_issues', this.setToCommaDelimitedString(stringSet))
    }
    const titleSet = this.getIssueSetFromString(this.context.payload?.pull_request?.title)
    if (this.context.eventName.startsWith('pull_request')) {
      core.debug(`Pull request title is: ${this.context.payload?.pull_request?.title}`)
      core.setOutput('title_issues', this.setToCommaDelimitedString(titleSet))
    }

    const refSet = this.getIssueSetFromString(this.refRange.headRef)
    core.setOutput('ref_issues', this.setToCommaDelimitedString(refSet))

    // const dateRange = await this.getStartAndEndDates(this.refRange)
    const commitSet = new Set<string>()
    let after: string | null = null
    let hasNextPage = this.context.payload?.pull_request?.number ? true : false
    while (hasNextPage) {
      const { repository } = await graphqlWithAuth<{ repository: Repository }>(listCommitMessagesInPullRequest, {
        owner: this.context.repo.owner,
        repo: this.context.repo.repo,
        prNumber: this.context.payload?.pull_request?.number,
        after
      })
      if ((repository?.pullRequest?.commits?.totalCount as number) == 0) {
        hasNextPage = false
      } else {
        hasNextPage = repository?.pullRequest?.commits?.pageInfo.hasNextPage as boolean
        after = repository?.pullRequest?.commits?.pageInfo.endCursor as string | null
        if (repository?.pullRequest?.commits?.nodes) {
          for (const node of repository?.pullRequest?.commits?.nodes) {
            if (node) {
              let skipCommit = false
              if (node.commit.message.startsWith('Merge branch') || node.commit.message.startsWith('Merge pull')) {
                core.debug('Commit message indicates that it is a merge')
                if (!this.includeMergeMessages) {
                  skipCommit = true
                }
              }
              if (skipCommit === false) {
                this.getIssueSetFromString(node.commit.message, commitSet)
              }
            }
          }
        }
      }
    }

    core.setOutput('commit_issues', this.setToCommaDelimitedString(commitSet))

    const combinedSet = new Set<string>([...stringSet, ...titleSet, ...refSet, ...commitSet])

    core.setOutput('issues', this.setToCommaDelimitedString(combinedSet))
  }
}
