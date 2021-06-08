import {Version2Client} from 'jira.js'
import {IssueBean, IssueTransition, Transitions} from 'jira.js/out/version3/models/index'
import {DoTransition, GetIssue, GetTransitions} from 'jira.js/out/version3/parameters/index'

import {JiraConfig} from './@types'

export default class Jira {
  baseUrl: string
  token: string
  email: string
  client: Version2Client

  constructor(conf: JiraConfig) {
    this.baseUrl = conf.baseUrl
    this.token = conf.token
    this.email = conf.email
    this.client = new Version2Client({
      host: this.baseUrl,
      telemetry: false,
      authentication: {
        basic: {
          email: this.email,
          apiToken: this.token
        }
      }
    })
  }

  async getIssue(
    issueId: string,
    query?: {
      fields?: string[]
      expand?: string
    }
  ): Promise<IssueBean> {
    const params: GetIssue = {
      issueIdOrKey: issueId
    }
    if (query != null) {
      params.fields = query.fields ?? []
      params.expand = query.expand ?? undefined
    }

    return await this.client.issues.getIssue(params)
  }

  async getIssueTransitions(issueId: string): Promise<Transitions> {
    const params: GetTransitions = {
      issueIdOrKey: issueId
    }
    return await this.client.issues.getTransitions(params)
  }

  async transitionIssue(issueId: string, data: IssueTransition): Promise<object> {
    const params: DoTransition = {
      issueIdOrKey: issueId,
      transition: data
    }
    return await this.client.issues.doTransition(params)
  }
}
