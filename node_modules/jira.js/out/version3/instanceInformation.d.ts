import * as Models from './models';
import { Client } from '../clients';
import { Callback } from '../callback';
export declare class InstanceInformation {
    private client;
    constructor(client: Client);
    /**
     * Returns licensing information about the Jira instance.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None.
     */
    getLicense<T = Models.License>(callback: Callback<T>): Promise<void>;
    /**
     * Returns licensing information about the Jira instance.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None.
     */
    getLicense<T = Models.License>(callback?: never): Promise<T>;
}
