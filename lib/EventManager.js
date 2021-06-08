"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.token = void 0;
const tslib_1 = require("tslib");
const core = tslib_1.__importStar(require("@actions/core"));
const github = tslib_1.__importStar(require("@actions/github"));
const graphql_1 = require("@octokit/graphql");
const utils_1 = require("./utils");
exports.token = core.getInput('token') || core.getInput('github-token') || process.env.GITHUB_TOKEN || 'NO_TOKEN';
const octokit = github.getOctokit(exports.token);
const GetStartAndEndPoints = `
query getStartAndEndPoints($owner: String!, $repo: String!, $headRef: String!,$baseRef: String!) {
  repository(owner: $owner, name: $repo) {
    endPoint: ref(qualifiedName: $headRef) {
      ...internalBranchContent
    }
    startPoint: ref(qualifiedName: $baseRef) {
      ...internalBranchContent
    }
  }
}

fragment internalBranchContent on Ref {
  target {
    ... on Commit {
      history(first: 1) {
        edges {
          node {
            committedDate
          }
        }
      }
    }
  }
}
`;
const listCommitMessagesInPullRequest = `
query listCommitMessagesInPullRequest($owner: String!, $repo: String!, $prNumber: Int!, $after: String) {
  repository(owner: $owner, name: $repo) {
    pullRequest(number: $prNumber) {
      baseRef {
        name
      }
      headRef {
        name
      }
      commits(first: 100, after: $after) {
        nodes {
          commit {
            message
          }
        }
        pageInfo {
          startCursor
          hasNextPage
          endCursor
        }
      }
    }
  }
}
`;
const graphqlWithAuth = graphql_1.graphql.defaults({
    headers: {
        authorization: `token ${exports.token}`
    }
});
class EventManager {
    constructor(context, jira, argv) {
        var _a, _b;
        this.failOnError = false;
        this.listenForEvents = [];
        this.jira = jira;
        this.context = context;
        this.failOnError = argv.failOnError;
        this.refRange = utils_1.assignRefs(context, argv, octokit);
        this.includeMergeMessages = argv.includeMergeMessages;
        this.filter = {
            projectsIncluded: (_a = argv.projects) === null || _a === void 0 ? void 0 : _a.split(',').map(i => i.trim().toUpperCase()),
            projectsExcluded: (_b = argv.projectsIgnore) === null || _b === void 0 ? void 0 : _b.split(',').map(i => i.trim().toUpperCase())
        };
    }
    isProjectOfIssueSelected(issueKey) {
        const project = issueKey.split('-')[0];
        if (!project || project.length == 0)
            return false;
        if (this.filter.projectsExcluded && this.filter.projectsExcluded.includes(project.toUpperCase())) {
            return false;
        }
        else if (!this.filter.projectsIncluded || this.filter.projectsIncluded == []) {
            return true;
        }
        else if (this.filter.projectsIncluded.includes(project.trim().toUpperCase())) {
            return true;
        }
        return false;
    }
    getIssueSetFromString(str, _set = undefined) {
        const set = _set !== null && _set !== void 0 ? _set : new Set();
        if (str) {
            const match = str.match(utils_1.issueIdRegEx);
            if (match) {
                for (const issueKey of match) {
                    if (this.isProjectOfIssueSelected(issueKey)) {
                        set.add(issueKey);
                    }
                }
            }
        }
        return set;
    }
    setToCommaDelimitedString(strSet) {
        if (strSet) {
            return Array.from(strSet).join(',');
        }
        return '';
    }
    async getStartAndEndDates(range) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        const { repository } = await graphqlWithAuth(GetStartAndEndPoints, {
            ...this.context.repo,
            ...range
        });
        const startDateList = (_c = (_b = (_a = repository === null || repository === void 0 ? void 0 : repository.startPoint) === null || _a === void 0 ? void 0 : _a.target) === null || _b === void 0 ? void 0 : _b.history) === null || _c === void 0 ? void 0 : _c.edges;
        const startDate = startDateList ? (_e = (_d = startDateList[0]) === null || _d === void 0 ? void 0 : _d.node) === null || _e === void 0 ? void 0 : _e.committedDate : '';
        const endDateList = (_h = (_g = (_f = repository === null || repository === void 0 ? void 0 : repository.endPoint) === null || _f === void 0 ? void 0 : _f.target) === null || _g === void 0 ? void 0 : _g.history) === null || _h === void 0 ? void 0 : _h.edges;
        const endDate = endDateList ? (_k = (_j = endDateList[0]) === null || _j === void 0 ? void 0 : _j.node) === null || _k === void 0 ? void 0 : _k.committedDate : '';
        return { startDate, endDate };
    }
    async getJiraKeysFromGitRange() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        core.info(`Head Ref: ${this.refRange.headRef}, Base Ref: ${this.refRange.baseRef}`);
        if (!(this.refRange.baseRef && this.refRange.headRef) && this.context.eventName != 'pull_request') {
            core.info('getJiraKeysFromGitRange: Base ref and head ref not found');
            return;
        }
        core.info(`getJiraKeysFromGitRange: Getting list of github commits between ${this.refRange.baseRef} and ${this.refRange.headRef}`);
        const { title } = this.context.payload;
        const titleSet = this.getIssueSetFromString(title);
        core.setOutput('title_issues', this.setToCommaDelimitedString(titleSet));
        const refSet = this.getIssueSetFromString(this.refRange.headRef);
        core.setOutput('ref_issues', this.setToCommaDelimitedString(refSet));
        const commitSet = new Set();
        let after = null;
        let hasNextPage = ((_b = (_a = this.context.payload) === null || _a === void 0 ? void 0 : _a.pull_request) === null || _b === void 0 ? void 0 : _b.number) ? true : false;
        while (hasNextPage) {
            const { repository } = await graphqlWithAuth(listCommitMessagesInPullRequest, {
                owner: this.context.repo.owner,
                repo: this.context.repo.repo,
                prNumber: (_d = (_c = this.context.payload) === null || _c === void 0 ? void 0 : _c.pull_request) === null || _d === void 0 ? void 0 : _d.number,
                after
            });
            console.log(JSON.stringify(repository));
            if (((_f = (_e = repository === null || repository === void 0 ? void 0 : repository.pullRequest) === null || _e === void 0 ? void 0 : _e.commits) === null || _f === void 0 ? void 0 : _f.totalCount) == 0) {
                hasNextPage = false;
            }
            else {
                hasNextPage = (_h = (_g = repository === null || repository === void 0 ? void 0 : repository.pullRequest) === null || _g === void 0 ? void 0 : _g.commits) === null || _h === void 0 ? void 0 : _h.pageInfo.hasNextPage;
                after = (_k = (_j = repository === null || repository === void 0 ? void 0 : repository.pullRequest) === null || _j === void 0 ? void 0 : _j.commits) === null || _k === void 0 ? void 0 : _k.pageInfo.endCursor;
                if ((_m = (_l = repository === null || repository === void 0 ? void 0 : repository.pullRequest) === null || _l === void 0 ? void 0 : _l.commits) === null || _m === void 0 ? void 0 : _m.nodes) {
                    for (const node of (_p = (_o = repository === null || repository === void 0 ? void 0 : repository.pullRequest) === null || _o === void 0 ? void 0 : _o.commits) === null || _p === void 0 ? void 0 : _p.nodes) {
                        if (node) {
                            let skipCommit = false;
                            if (node.commit.message.startsWith('Merge branch') || node.commit.message.startsWith('Merge pull')) {
                                core.debug('Commit message indicates that it is a merge');
                                if (!this.includeMergeMessages) {
                                    skipCommit = true;
                                }
                            }
                            if (skipCommit === false) {
                                this.getIssueSetFromString(node.commit.message, commitSet);
                            }
                        }
                    }
                }
            }
        }
        core.setOutput('commit_issues', this.setToCommaDelimitedString(commitSet));
        const combinedSet = new Set([...titleSet, ...refSet, ...commitSet]);
        core.setOutput('issues', this.setToCommaDelimitedString(combinedSet));
    }
}
exports.default = EventManager;
//# sourceMappingURL=EventManager.js.map