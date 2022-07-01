import { GitHub } from '@actions/github/lib/utils';
import { graphql } from '@octokit/graphql';

export type { Context } from '@actions/github/lib/context';
export { getOctokitOptions, GitHub } from '@actions/github/lib/utils';
export type { CommitHistoryConnection, GitObject, Maybe, Ref, Repository } from '@octokit/graphql-schema';
export type GithubOctokitType = InstanceType<typeof GitHub>;
export type graphqlType = typeof graphql;
