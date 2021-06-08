import { Context } from '@actions/github/lib/context';
import { GitHub } from '@actions/github/lib/utils';
import type { Args, RefRange } from './@types';
export declare const issueIdRegEx: RegExp;
export declare function getPreviousReleaseRef(octo: InstanceType<typeof GitHub>, _context: Context): Promise<string | null>;
export declare function assignRefs(_context: Context, _argv: Args, octokit: InstanceType<typeof GitHub>): RefRange;
