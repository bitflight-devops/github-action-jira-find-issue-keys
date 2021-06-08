import { Context } from '@actions/github/lib/context'
import { GitHub } from '@actions/github/lib/utils'

import type { Args, RefRange } from './@types'

export const issueIdRegEx = /([a-zA-Z0-9]+-[0-9]+)/g
export async function getPreviousReleaseRef(
  octo: InstanceType<typeof GitHub>,
  _context: Context
): Promise<string | null> {
  if (!_context.repo || !octo) {
    return null
  }
  const releases = await octo.rest.repos.getLatestRelease({
    ..._context.repo
  })

  const { tag_name } = releases.data

  return tag_name
}
export function assignRefs(_context: Context, _argv: Args, octokit: InstanceType<typeof GitHub>): RefRange {
  let headRef, baseRef

  if (_context.eventName === 'pull_request' && _context.payload.pull_request) {
    headRef = headRef ?? _context.payload.pull_request.head.ref ?? null
    baseRef = baseRef ?? _context.payload?.pull_request.base.ref ?? null
  } else if (_context.eventName === 'push') {
    if (_context.payload.ref.startsWith('refs/tags')) {
      baseRef = baseRef ?? getPreviousReleaseRef(octokit, _context)
    }
    headRef = headRef ?? _context.payload.ref ?? null
  }
  headRef = _argv.headRef ?? headRef ?? _context.payload.ref ?? null
  baseRef = _argv.baseRef ?? baseRef ?? _context.payload.ref ?? null
  return { headRef, baseRef }
}
