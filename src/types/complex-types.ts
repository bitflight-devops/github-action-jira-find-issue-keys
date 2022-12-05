import { graphql } from '@octokit/graphql';

export type { Context } from '@broadshield/github-actions-core-typed-inputs';
export type { CommitHistoryConnection, GitObject, Maybe, Ref, Repository } from '@octokit/graphql-schema';
export type graphqlType = typeof graphql;
