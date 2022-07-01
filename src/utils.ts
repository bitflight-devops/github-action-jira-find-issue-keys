import * as core from '@actions/core';
import { Octokit } from '@octokit/rest';
import type {
  PullRequestEvent,
  PullRequestReviewCommentEvent,
  PullRequestReviewEvent,
  PushEvent,
} from '@octokit/webhooks-definitions/schema';

import ActionError from './action-error';
import type { Arguments, ReferenceRange } from './types';
import type { Context, GithubOctokitType } from './types/complex-types';

export const issueIdRegEx = /([\dA-Za-z]+-\d+)/g;
export function undefinedOnEmpty(value?: string): string | undefined {
  if (!value || value.trim() === '') {
    return undefined;
  }
  return value;
}
export async function getPreviousReleaseReference(
  octo: GithubOctokitType,
  githubContext: Context,
): Promise<string | undefined> {
  if (githubContext && octo) {
    const releases = await (octo as Octokit).rest.repos.getLatestRelease({
      ...githubContext.repo,
    });
    return releases?.data?.tag_name;
  }
  return undefined;
}
export async function assignReferences(
  githubContext: Context,
  providedArguments: Arguments,
  octokit: GithubOctokitType,
): Promise<ReferenceRange> {
  let headReference: string | undefined;
  let baseReference: string | undefined;
  const { eventName, payload } = githubContext;
  if (!githubContext) {
    throw new ActionError('Context is required');
  }
  let recievedPayload:
    | PushEvent
    | PullRequestEvent
    | PullRequestReviewEvent
    | PullRequestReviewCommentEvent
    | undefined;
  switch (eventName) {
    case 'pull_request':
      recievedPayload = payload as PullRequestEvent;
      break;
    case 'pull_request_review':
      recievedPayload = payload as PullRequestReviewEvent;
      break;
    case 'pull_request_review_comment':
      recievedPayload = payload as PullRequestReviewCommentEvent;
      break;
    case 'push':
      recievedPayload = payload as PushEvent;
      break;
    default:
      core.warning(`Unhandled event type: ${eventName}`);
      recievedPayload = undefined;
      break;
  }
  if (recievedPayload) {
    if ('pull_request' in recievedPayload) {
      headReference = recievedPayload.pull_request.head.ref;
      baseReference = recievedPayload.pull_request.base.ref;
    } else if ('ref' in recievedPayload) {
      headReference = recievedPayload.ref;
      baseReference = await getPreviousReleaseReference(octokit, githubContext);
    }
  }
  headReference = providedArguments.headRef || headReference;
  baseReference = providedArguments.baseRef || baseReference || headReference;
  if (!headReference || !baseReference) {
    throw new ActionError('Head or base reference is missing, and it cannot be determined from the event');
  }
  return { headRef: headReference, baseRef: baseReference };
}
