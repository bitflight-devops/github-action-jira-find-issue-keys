import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
export declare class Labels {
    private client;
    constructor(client: Client);
    /** Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of labels. */
    getAllLabels<T = Models.PageBeanString>(parameters: Parameters.GetAllLabels | undefined, callback: Callback<T>): Promise<void>;
    /** Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of labels. */
    getAllLabels<T = Models.PageBeanString>(parameters?: Parameters.GetAllLabels, callback?: never): Promise<T>;
}
