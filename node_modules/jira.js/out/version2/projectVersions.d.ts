import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
export declare class ProjectVersions {
    private client;
    constructor(client: Client);
    /**
     * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of all
     * versions in a project. See the [Get project versions](#api-rest-api-2-project-projectIdOrKey-versions-get) resource
     * if you want to get a full list of versions without pagination.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Browse
     * Projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
     */
    getProjectVersionsPaginated<T = Models.PageBeanVersion>(parameters: Parameters.GetProjectVersionsPaginated, callback: Callback<T>): Promise<void>;
    /**
     * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of all
     * versions in a project. See the [Get project versions](#api-rest-api-2-project-projectIdOrKey-versions-get) resource
     * if you want to get a full list of versions without pagination.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Browse
     * Projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
     */
    getProjectVersionsPaginated<T = Models.PageBeanVersion>(parameters: Parameters.GetProjectVersionsPaginated, callback?: never): Promise<T>;
    /**
     * Returns all versions in a project. The response is not paginated. Use [Get project versions
     * paginated](#api-rest-api-2-project-projectIdOrKey-version-get) if you want to get the versions in a project with pagination.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Browse
     * Projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
     */
    getProjectVersions<T = Models.Version[]>(parameters: Parameters.GetProjectVersions, callback: Callback<T>): Promise<void>;
    /**
     * Returns all versions in a project. The response is not paginated. Use [Get project versions
     * paginated](#api-rest-api-2-project-projectIdOrKey-version-get) if you want to get the versions in a project with pagination.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Browse
     * Projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
     */
    getProjectVersions<T = Models.Version[]>(parameters: Parameters.GetProjectVersions, callback?: never): Promise<T>;
    /**
     * Creates a project version.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
     * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) or *Administer Projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project the version is added to.
     */
    createVersion<T = Models.Version>(parameters: Parameters.CreateVersion | undefined, callback: Callback<T>): Promise<void>;
    /**
     * Creates a project version.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
     * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) or *Administer Projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project the version is added to.
     */
    createVersion<T = Models.Version>(parameters?: Parameters.CreateVersion, callback?: never): Promise<T>;
    /**
     * Returns a project version.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Browse
     * projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the version.
     */
    getVersion<T = Models.Version>(parameters: Parameters.GetVersion, callback: Callback<T>): Promise<void>;
    /**
     * Returns a project version.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Browse
     * projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the version.
     */
    getVersion<T = Models.Version>(parameters: Parameters.GetVersion, callback?: never): Promise<T>;
    /**
     * Updates a project version.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
     * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) or *Administer Projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project that contains the version.
     */
    updateVersion<T = Models.Version>(parameters: Parameters.UpdateVersion, callback: Callback<T>): Promise<void>;
    /**
     * Updates a project version.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
     * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) or *Administer Projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project that contains the version.
     */
    updateVersion<T = Models.Version>(parameters: Parameters.UpdateVersion, callback?: never): Promise<T>;
    /**
     * Deletes a project version.
     *
     * @deprecated Deprecated, use [ Delete and replace version](#api-rest-api-2-version-id-removeAndSwap-post) that
     *   supports swapping version values in custom fields, in addition to the swapping for `fixVersion` and
     *   `affectedVersion` provided in this resource.
     *
     *   Alternative versions can be provided to update issues that use the deleted version in `fixVersion` or
     *   `affectedVersion`. If alternatives are not provided, occurrences of `fixVersion` and `affectedVersion` that
     *   contain the deleted version are cleared.
     *
     *   This operation can be accessed anonymously.
     *
     *   **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
     *   *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) or *Administer Projects*
     *   [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that contains the version.
     */
    deleteVersion<T = void>(parameters: Parameters.DeleteVersion, callback: Callback<T>): Promise<void>;
    /**
     * Deletes a project version.
     *
     * @deprecated Deprecated, use [ Delete and replace version](#api-rest-api-2-version-id-removeAndSwap-post) that
     *   supports swapping version values in custom fields, in addition to the swapping for `fixVersion` and
     *   `affectedVersion` provided in this resource.
     *
     *   Alternative versions can be provided to update issues that use the deleted version in `fixVersion` or
     *   `affectedVersion`. If alternatives are not provided, occurrences of `fixVersion` and `affectedVersion` that
     *   contain the deleted version are cleared.
     *
     *   This operation can be accessed anonymously.
     *
     *   **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
     *   *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) or *Administer Projects*
     *   [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that contains the version.
     */
    deleteVersion<T = void>(parameters: Parameters.DeleteVersion, callback?: never): Promise<T>;
    /**
     * Merges two project versions. The merge is completed by deleting the version specified in `id` and replacing any
     * occurrences of its ID in `fixVersion` with the version ID specified in `moveIssuesTo`.
     *
     * Consider using [ Delete and replace version](#api-rest-api-2-version-id-removeAndSwap-post) instead. This resource
     * supports swapping version values in `fixVersion`, `affectedVersion`, and custom fields.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
     * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) or *Administer Projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project that contains the version.
     */
    mergeVersions<T = void>(parameters: Parameters.MergeVersions, callback: Callback<T>): Promise<void>;
    /**
     * Merges two project versions. The merge is completed by deleting the version specified in `id` and replacing any
     * occurrences of its ID in `fixVersion` with the version ID specified in `moveIssuesTo`.
     *
     * Consider using [ Delete and replace version](#api-rest-api-2-version-id-removeAndSwap-post) instead. This resource
     * supports swapping version values in `fixVersion`, `affectedVersion`, and custom fields.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
     * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) or *Administer Projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project that contains the version.
     */
    mergeVersions<T = void>(parameters: Parameters.MergeVersions, callback?: never): Promise<T>;
    /**
     * Modifies the version's sequence within the project, which affects the display order of the versions in Jira.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Browse
     * projects* project permission for the project that contains the version.
     */
    moveVersion<T = Models.Version>(parameters: Parameters.MoveVersion, callback: Callback<T>): Promise<void>;
    /**
     * Modifies the version's sequence within the project, which affects the display order of the versions in Jira.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Browse
     * projects* project permission for the project that contains the version.
     */
    moveVersion<T = Models.Version>(parameters: Parameters.MoveVersion, callback?: never): Promise<T>;
    /**
     * Returns the following counts for a version:
     *
     * - Number of issues where the `fixVersion` is set to the version.
     * - Number of issues where the `affectedVersion` is set to the version.
     * - Number of issues where a version custom field is set to the version.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Browse
     * projects* project permission for the project that contains the version.
     */
    getVersionRelatedIssues<T = Models.VersionIssueCounts>(parameters: Parameters.GetVersionRelatedIssues, callback: Callback<T>): Promise<void>;
    /**
     * Returns the following counts for a version:
     *
     * - Number of issues where the `fixVersion` is set to the version.
     * - Number of issues where the `affectedVersion` is set to the version.
     * - Number of issues where a version custom field is set to the version.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Browse
     * projects* project permission for the project that contains the version.
     */
    getVersionRelatedIssues<T = Models.VersionIssueCounts>(parameters: Parameters.GetVersionRelatedIssues, callback?: never): Promise<T>;
    /**
     * Deletes a project version.
     *
     * Alternative versions can be provided to update issues that use the deleted version in `fixVersion`,
     * `affectedVersion`, or any version picker custom fields. If alternatives are not provided, occurrences of
     * `fixVersion`, `affectedVersion`, and any version picker custom field, that contain the deleted version, are
     * cleared. Any replacement version must be in the same project as the version being deleted and cannot be the version
     * being deleted.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
     * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) or *Administer Projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project that contains the version.
     */
    deleteAndReplaceVersion<T = void>(parameters: Parameters.DeleteAndReplaceVersion, callback: Callback<T>): Promise<void>;
    /**
     * Deletes a project version.
     *
     * Alternative versions can be provided to update issues that use the deleted version in `fixVersion`,
     * `affectedVersion`, or any version picker custom fields. If alternatives are not provided, occurrences of
     * `fixVersion`, `affectedVersion`, and any version picker custom field, that contain the deleted version, are
     * cleared. Any replacement version must be in the same project as the version being deleted and cannot be the version
     * being deleted.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
     * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) or *Administer Projects* [project
     * permission](https://confluence.atlassian.com/x/yodKLg) for the project that contains the version.
     */
    deleteAndReplaceVersion<T = void>(parameters: Parameters.DeleteAndReplaceVersion, callback?: never): Promise<T>;
    /**
     * Returns counts of the issues and unresolved issues for the project version.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Browse
     * projects* project permission for the project that contains the version.
     */
    getVersionUnresolvedIssues<T = Models.VersionUnresolvedIssuesCount>(parameters: Parameters.GetVersionUnresolvedIssues, callback: Callback<T>): Promise<void>;
    /**
     * Returns counts of the issues and unresolved issues for the project version.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Browse
     * projects* project permission for the project that contains the version.
     */
    getVersionUnresolvedIssues<T = Models.VersionUnresolvedIssuesCount>(parameters: Parameters.GetVersionUnresolvedIssues, callback?: never): Promise<T>;
}
