import ActionError from './action-error';
import type { Arguments, ReferenceRange } from './types';
import { Context, logger } from '@broadshield/github-actions-core-typed-inputs';
import { OctokitInstance } from '@broadshield/github-actions-octokit-hydrated';
import type {
  PullRequestEvent,
  PullRequestReviewCommentEvent,
  PullRequestReviewEvent,
  PushEvent,
  RepositoryDispatchEvent,
  WorkflowDispatchEvent,
} from '@octokit/webhooks-types';
import _ from 'lodash';

// eslint-disable-next-line no-useless-escape
export const strictIssueIdRegEx = /(?<=^|[a-z]-|[\s&P[^cnptu{}\-]])([A-Za-z]\w*[ \-]\d+)(?![^\W_])/;
export const issueIdRegEx = /([A-Z]\w+[ _-]\d+)/g;
export function upperCaseFirst(line: string): string {
  return _.replace(line, /\w\S*/g, (txt) => _.toUpper(txt.charAt(0)) + txt.slice(1));
}
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
    | WorkflowDispatchEvent
    | RepositoryDispatchEvent
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
    case 'workflow_dispatch': {
      recievedPayload = payload as WorkflowDispatchEvent;
      break;
    }
    case 'repository_dispatch': {
      recievedPayload = payload as RepositoryDispatchEvent;
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
