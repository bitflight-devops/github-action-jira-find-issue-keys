import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
export declare class ProjectFeatures {
    private client;
    constructor(client: Client);
    /**
     * Returns the list of features for a project. The project must be a
     * [company-managed](https://support.atlassian.com/jira-service-management-cloud/docs/learn-the-differences-between-classic-and-next-gen-projects/)
     * project.
     */
    getFeaturesForProject<T = Models.ProjectFeatures>(parameters: Parameters.GetFeaturesForProject, callback: Callback<T>): Promise<void>;
    /**
     * Returns the list of features for a project. The project must be a
     * [company-managed](https://support.atlassian.com/jira-service-management-cloud/docs/learn-the-differences-between-classic-and-next-gen-projects/)
     * project.
     */
    getFeaturesForProject<T = Models.ProjectFeatures>(parameters: Parameters.GetFeaturesForProject, callback?: never): Promise<T>;
    /**
     * Changes the state of a feature to ENABLED or DISABLED for the project. The project must be a
     * [company-managed](https://support.atlassian.com/jira-service-management-cloud/docs/learn-the-differences-between-classic-and-next-gen-projects/)
     * project.
     */
    toggleFeatureForProject<T = Models.ProjectFeatures>(parameters: Parameters.ToggleFeatureForProject, callback: Callback<T>): Promise<void>;
    /**
     * Changes the state of a feature to ENABLED or DISABLED for the project. The project must be a
     * [company-managed](https://support.atlassian.com/jira-service-management-cloud/docs/learn-the-differences-between-classic-and-next-gen-projects/)
     * project.
     */
    toggleFeatureForProject<T = Models.ProjectFeatures>(parameters: Parameters.ToggleFeatureForProject, callback?: never): Promise<T>;
}
