import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
export declare class IssueFields {
    private client;
    constructor(client: Client);
    /**
     * Returns system and custom issue fields according to the following rules:
     *
     * - Fields that cannot be added to the issue navigator are always returned.
     * - Fields that cannot be placed on an issue screen are always returned.
     * - Fields that depend on global Jira settings are only returned if the setting is enabled. That is, timetracking
     *   fields, subtasks, votes, and watches.
     * - For all other fields, this operation only returns the fields that the user has permission to view (that is, the
     *   field is used in at least one project that the user has *Browse Projects* [project
     *   permission](https://confluence.atlassian.com/x/yodKLg) for.)
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None.
     */
    getFields<T = Models.FieldDetails[]>(callback: Callback<T>): Promise<void>;
    /**
     * Returns system and custom issue fields according to the following rules:
     *
     * - Fields that cannot be added to the issue navigator are always returned.
     * - Fields that cannot be placed on an issue screen are always returned.
     * - Fields that depend on global Jira settings are only returned if the setting is enabled. That is, timetracking
     *   fields, subtasks, votes, and watches.
     * - For all other fields, this operation only returns the fields that the user has permission to view (that is, the
     *   field is used in at least one project that the user has *Browse Projects* [project
     *   permission](https://confluence.atlassian.com/x/yodKLg) for.)
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None.
     */
    getFields<T = Models.FieldDetails[]>(callback?: never): Promise<T>;
    /**
     * Creates a custom field.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
     * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
     */
    createCustomField<T = Models.FieldDetails>(parameters: Parameters.CreateCustomField | undefined, callback: Callback<T>): Promise<void>;
    /**
     * Creates a custom field.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
     * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
     */
    createCustomField<T = Models.FieldDetails>(parameters?: Parameters.CreateCustomField, callback?: never): Promise<T>;
    /**
     * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of fields
     * for Classic Jira projects. The list can include:
     *
     * - All fields.
     * - Specific fields, by defining `id`.
     * - Fields that contain a string in the field name or description, by defining `query`.
     * - Specific fields that contain a string in the field name or description, by defining `id` and `query`.
     *
     * Only custom fields can be queried, `type` must be set to `custom`.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
     * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
     */
    getFieldsPaginated<T = Models.PageBeanField>(parameters: Parameters.GetFieldsPaginated | undefined, callback: Callback<T>): Promise<void>;
    /**
     * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of fields
     * for Classic Jira projects. The list can include:
     *
     * - All fields.
     * - Specific fields, by defining `id`.
     * - Fields that contain a string in the field name or description, by defining `query`.
     * - Specific fields that contain a string in the field name or description, by defining `id` and `query`.
     *
     * Only custom fields can be queried, `type` must be set to `custom`.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
     * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
     */
    getFieldsPaginated<T = Models.PageBeanField>(parameters?: Parameters.GetFieldsPaginated, callback?: never): Promise<T>;
    /**
     * Updates a custom field.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
     * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
     */
    updateCustomField<T = void>(parameters: Parameters.UpdateCustomField, callback: Callback<T>): Promise<void>;
    /**
     * Updates a custom field.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
     * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
     */
    updateCustomField<T = void>(parameters: Parameters.UpdateCustomField, callback?: never): Promise<T>;
    /**
     * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of the
     * contexts a field is used in. Deprecated, use [ Get custom field contexts](#api-rest-api-2-field-fieldId-context-get).
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
     * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
     */
    getContextsForFieldDeprecated<T = Models.PageBeanContext>(parameters: Parameters.GetContextsForFieldDeprecated, callback: Callback<T>): Promise<void>;
    /**
     * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of the
     * contexts a field is used in. Deprecated, use [ Get custom field contexts](#api-rest-api-2-field-fieldId-context-get).
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
     * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
     */
    getContextsForFieldDeprecated<T = Models.PageBeanContext>(parameters: Parameters.GetContextsForFieldDeprecated, callback?: never): Promise<T>;
}
