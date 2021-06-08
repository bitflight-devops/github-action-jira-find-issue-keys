import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
export declare class Project {
    private client;
    constructor(client: Client);
    getFeaturesForProject<T = Models.GetFeaturesForProject>(parameters: Parameters.GetFeaturesForProject, callback: Callback<T>): Promise<void>;
    getFeaturesForProject<T = Models.GetFeaturesForProject>(parameters: Parameters.GetFeaturesForProject, callback?: never): Promise<T>;
}
