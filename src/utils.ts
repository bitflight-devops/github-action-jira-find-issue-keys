import ActionError from './action-error';
import type { Arguments, ReferenceRange } from './types';
import { Context, logger } from '@broadshield/github-actions-core-typed-inputs';
import { OctokitInstance } from '@broadshield/github-actions-octokit-hydrated';
import type {
  PullRequestEvent,
  PullRequestReviewCommentEvent,
  PullRequestReviewEvent,
  PushEvent,
} from '@octokit/webhooks-types';

export const issueIdRegEx = /([\dA-Za-z]+-\d+)/g;

export async function getPreviousReleaseReference(
  octo: OctokitInstance,
  githubContext: Context,
): Promise<string | undefined> {
  if (githubContext && octo) {
    const releases = await octo.rest.repos.getLatestRelease({
      ...githubContext.repo,
    });
    return releases?.data?.tag_name;
  }
  return undefined;
}
export async function assignReferences(
  githubContext: Context,
  providedArguments: Arguments,
  octokit: OctokitInstance,
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
    case 'pull_request_target': {
      recievedPayload = payload as PullRequestEvent;
      break;
    }
    case 'pull_request': {
      recievedPayload = payload as PullRequestEvent;
      break;
    }
    case 'pull_request_review': {
      recievedPayload = payload as PullRequestReviewEvent;
      break;
    }
    case 'pull_request_review_comment': {
      recievedPayload = payload as PullRequestReviewCommentEvent;
      break;
    }
    case 'push': {
      recievedPayload = payload as PushEvent;
      break;
    }
    default: {
      logger.warning(`Unhandled event type: ${eventName}`);
      recievedPayload = undefined;
      break;
    }
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

  return { headRef: headReference, baseRef: baseReference };
}
