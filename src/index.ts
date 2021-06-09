import * as core from '@actions/core'
import * as github from '@actions/github'

import {Action} from './action'
import {getInputs} from './input-helper'

async function exec(): Promise<void> {
  await new Action(github.context, getInputs()).execute()
}

exec().catch(error => {
  core.setFailed(error)
})
