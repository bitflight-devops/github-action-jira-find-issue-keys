import { Version2Client } from 'jira.js';
import { IssueBean, IssueTransition, Transitions } from 'jira.js/out/version3/models/index';
import { JiraConfig } from './@types';
export default class Jira {
    baseUrl: string;
    token: string;
    email: string;
    client: Version2Client;
    constructor(conf: JiraConfig);
    getIssue(issueId: string, query?: {
        fields?: string[];
        expand?: string;
    }): Promise<IssueBean>;
    getIssueTransitions(issueId: string): Promise<Transitions>;
    transitionIssue(issueId: string, data: IssueTransition): Promise<object>;
}
