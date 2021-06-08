import * as core from '@actions/core'
import {Context} from '@actions/github/lib/context'
import * as fs from 'fs'

import {Action} from './action'
import {getInputs} from './input-helper'

const githubEventPath = process.env.GITHUB_EVENT_PATH as string

const githubEvent = JSON.parse(fs.readFileSync(githubEventPath, 'utf8')) as Context

async function exec(): Promise<void> {
  await new Action(githubEvent, getInputs()).execute()
}

exec().catch(error => {
  core.setFailed(error)
})
