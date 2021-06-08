import { Context } from '@actions/github/lib/context';
import { Args, JiraConfig } from './@types/';
import EventManager from './EventManager';
import Jira from './Jira';
export declare class Action {
    jira: Jira;
    config: JiraConfig;
    argv: Args;
    context: Context;
    eventManager: EventManager;
    constructor(context: Context, argv: Args);
    execute(): Promise<boolean>;
}
