/* eslint-disable security/detect-object-injection */
import * as core from '@actions/core'
import * as github from '@actions/github'
import * as path from 'path'

import {Args} from '../src/@types'
import {Action} from '../src/action'
import * as fsHelper from '../src/fs-helper'
import * as inputHelper from '../src/input-helper'

const originalGitHubWorkspace = process.env.GITHUB_WORKSPACE
const gitHubWorkspace = path.resolve('/checkout-tests/workspace')

export const baseUrl = process.env.JIRA_BASE_URL as string
// Inputs for mock @actions/core
let inputs = {} as any
let [owner, repo] = (process.env.GITHUB_REPOSITORY ?? '').split('/')
// Shallow clone original @actions/github context
const originalContext = {...github.context}

describe('jira ticket transition', () => {
  beforeAll(() => {
    jest.setTimeout(50000)
    // Mock getInput
    jest.spyOn(core, 'getInput').mockImplementation((name: string) => {
      // eslint-disable-next-line security/detect-object-injection
      return inputs[name]
    })
    jest.spyOn(core, 'getBooleanInput').mockImplementation((name: string) => {
      const regMatTrue = /(true|True|TRUE)/
      const regMatFalse = /(false|False|FALSE)/
      if (regMatTrue.test(inputs[name] as string)) {
        return true
      } else if (regMatFalse.test(inputs[name] as string)) {
        return false
      }
      // eslint-disable-next-line security/detect-object-injection
      throw new Error(`
      TypeError: Input does not meet YAML 1.2 "Core Schema" specification: ${name}
      Support boolean input list: true | True | TRUE | false | False | FALSE
    `)
    })
    // Mock error/warning/info/debug
    jest.spyOn(core, 'error').mockImplementation(console.log)
    jest.spyOn(core, 'warning').mockImplementation(console.log)
    jest.spyOn(core, 'info').mockImplementation(console.log)
    jest.spyOn(core, 'debug').mockImplementation(console.log)

    // Mock github context
    jest.spyOn(github.context, 'repo', 'get').mockImplementation(() => {
      return {
        owner: owner,
        repo: repo
      }
    })

    github.context.ref = 'refs/heads/DVPS-331'
    github.context.sha = '1234567890123456789012345678901234567890'
    github.context.payload = {
      pull_request: {head: {ref: 'refs/heads/DVPS-331'}, base: {ref: 'refs/heads/dev'}, number: 2770, title: 'DVPS-336'}
    }

    // Mock ./fs-helper directoryExistsSync()
    jest.spyOn(fsHelper, 'directoryExistsSync').mockImplementation((fspath: string) => fspath === gitHubWorkspace)

    // GitHub workspace
    process.env.GITHUB_WORKSPACE = gitHubWorkspace
  })
  beforeEach(() => {
    // Reset inputs
    inputs = {}
    inputs.string = 'DVPS-336'
    inputs.token = process.env.GITHUB_TOKEN
    inputs.include_merge_messages = 'true'
    inputs.fail_on_error = 'false'
    inputs.ref = 'UNICORN-8403'
    inputs.head_ref = 'refs/heads/UNICORN-8403'
    inputs.base_ref = 'dev'
    inputs.jira_base_url = baseUrl
    core.info(JSON.stringify(inputs))
  })
  afterAll(() => {
    // Restore GitHub workspace
    process.env.GITHUB_WORKSPACE = undefined
    if (originalGitHubWorkspace) {
      process.env.GITHUB_WORKSPACE = originalGitHubWorkspace
    }

    // Restore @actions/github context
    github.context.ref = originalContext.ref
    github.context.sha = originalContext.sha

    // Restore
    jest.restoreAllMocks()
  })

  it('sets defaults', () => {
    const settings: Args = inputHelper.getInputs()
    expect(settings).toBeTruthy()
    expect(settings.config).toBeTruthy()
    expect(settings.config.baseUrl).toEqual(baseUrl)
  })

  it('GitHub Event: pull_request', async () => {
    // expect.hasAssertions()
    github.context.eventName = 'pull_request'
    const settings: Args = inputHelper.getInputs()
    const action = new Action(github.context, settings)
    const result = await action.execute()
    expect(result).toEqual(true)
  })
})
