import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
export declare class IssueResolutions {
    private client;
    constructor(client: Client);
    /**
     * Returns a list of all issue resolution values.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
     * Permission to access Jira.
     */
    getResolutions<T = Models.Resolution[]>(callback: Callback<T>): Promise<void>;
    /**
     * Returns a list of all issue resolution values.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
     * Permission to access Jira.
     */
    getResolutions<T = Models.Resolution[]>(callback?: never): Promise<T>;
    /**
     * Returns an issue resolution value.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
     * Permission to access Jira.
     */
    getResolution<T = Models.Resolution>(parameters: Parameters.GetResolution, callback: Callback<T>): Promise<void>;
    /**
     * Returns an issue resolution value.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
     * Permission to access Jira.
     */
    getResolution<T = Models.Resolution>(parameters: Parameters.GetResolution, callback?: never): Promise<T>;
}
