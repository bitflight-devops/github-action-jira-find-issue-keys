import { Context } from '@actions/github/lib/context';
import { Args, RefRange } from './@types';
import Jira from './Jira';
export declare const token: string;
interface DateRange {
    startDate: string;
    endDate: string;
}
export interface ProjectFilter {
    projectsIncluded?: string[];
    projectsExcluded?: string[];
}
export default class EventManager {
    context: Context;
    filter: ProjectFilter;
    jira: Jira;
    refRange: RefRange;
    includeMergeMessages: boolean;
    failOnError: boolean;
    listenForEvents: string[];
    constructor(context: Context, jira: Jira, argv: Args);
    isProjectOfIssueSelected(issueKey: string): boolean;
    getIssueSetFromString(str: string, _set?: Set<string> | undefined): Set<string>;
    setToCommaDelimitedString(strSet: Set<string> | undefined): string;
    getStartAndEndDates(range: RefRange): Promise<DateRange>;
    getJiraKeysFromGitRange(): Promise<void>;
}
export {};
