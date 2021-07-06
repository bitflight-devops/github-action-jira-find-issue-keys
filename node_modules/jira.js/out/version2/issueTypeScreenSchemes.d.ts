import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
export declare class IssueTypeScreenSchemes {
    private client;
    constructor(client: Client);
    /**
     * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of issue
     * type screen schemes.
     *
     * Only issue type screen schemes used in classic projects are returned.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
     * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
     */
    getIssueTypeScreenSchemes<T = Models.PageBeanIssueTypeScreenScheme>(parameters: Parameters.GetIssueTypeScreenSchemes | undefined, callback: Callback<T>): Promise<void>;
    /**
     * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of issue
     * type screen schemes.
     *
     * Only issue type screen schemes used in classic projects are returned.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
     * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
     */
    getIssueTypeScreenSchemes<T = Models.PageBeanIssueTypeScreenScheme>(parameters?: Parameters.GetIssueTypeScreenSchemes, callback?: never): Promise<T>;
    /**
     * Creates an issue type screen scheme.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
     * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
     */
    createIssueTypeScreenScheme<T = Models.IssueTypeScreenSchemeId>(parameters: Parameters.CreateIssueTypeScreenScheme | undefined, callback: Callback<T>): Promise<void>;
    /**
     * Creates an issue type screen scheme.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
     * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
     */
    createIssueTypeScreenScheme<T = Models.IssueTypeScreenSchemeId>(parameters?: Parameters.CreateIssueTypeScreenScheme, callback?: never): Promise<T>;
    /**
     * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of issue
     * type screen scheme items.
     *
     * Only issue type screen schemes used in classic projects are returned.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
     * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
     */
    getIssueTypeScreenSchemeMappings<T = Models.PageBeanIssueTypeScreenSchemeItem>(parameters: Parameters.GetIssueTypeScreenSchemeMappings | undefined, callback: Callback<T>): Promise<void>;
    /**
     * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of issue
     * type screen scheme items.
     *
     * Only issue type screen schemes used in classic projects are returned.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
     * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
     */
    getIssueTypeScreenSchemeMappings<T = Models.PageBeanIssueTypeScreenSchemeItem>(parameters?: Parameters.GetIssueTypeScreenSchemeMappings, callback?: never): Promise<T>;
    /**
     * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of issue
     * type screen schemes and, for each issue type screen scheme, a list of the projects that use it.
     *
     * Only issue type screen schemes used in classic projects are returned.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
     * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
     */
    getIssueTypeScreenSchemeProjectAssociations<T = Models.PageBeanIssueTypeScreenSchemesProjects>(parameters: Parameters.GetIssueTypeScreenSchemeProjectAssociations, callback: Callback<T>): Promise<void>;
    /**
     * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of issue
     * type screen schemes and, for each issue type screen scheme, a list of the projects that use it.
     *
     * Only issue type screen schemes used in classic projects are returned.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
     * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
     */
    getIssueTypeScreenSchemeProjectAssociations<T = Models.PageBeanIssueTypeScreenSchemesProjects>(parameters: Parameters.GetIssueTypeScreenSchemeProjectAssociations, callback?: never): Promise<T>;
    /**
     * Assigns an issue type screen scheme to a project.
     *
     * Issue type screen schemes can only be assigned to classic projects.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
     * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
     */
    assignIssueTypeScreenSchemeToProject<T = void>(parameters: Parameters.AssignIssueTypeScreenSchemeToProject | undefined, callback: Callback<T>): Promise<void>;
    /**
     * Assigns an issue type screen scheme to a project.
     *
     * Issue type screen schemes can only be assigned to classic projects.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
     * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
     */
    assignIssueTypeScreenSchemeToProject<T = void>(parameters?: Parameters.AssignIssueTypeScreenSchemeToProject, callback?: never): Promise<T>;
    /**
     * Updates an issue type screen scheme.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
     * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
     */
    updateIssueTypeScreenScheme<T = void>(parameters: Parameters.UpdateIssueTypeScreenScheme, callback: Callback<T>): Promise<void>;
    /**
     * Updates an issue type screen scheme.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
     * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
     */
    updateIssueTypeScreenScheme<T = void>(parameters: Parameters.UpdateIssueTypeScreenScheme, callback?: never): Promise<T>;
    /**
     * Deletes an issue type screen scheme.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
     * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
     */
    deleteIssueTypeScreenScheme<T = void>(parameters: Parameters.DeleteIssueTypeScreenScheme, callback: Callback<T>): Promise<void>;
    /**
     * Deletes an issue type screen scheme.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
     * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
     */
    deleteIssueTypeScreenScheme<T = void>(parameters: Parameters.DeleteIssueTypeScreenScheme, callback?: never): Promise<T>;
    /**
     * Appends issue type to screen scheme mappings to an issue type screen scheme.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
     * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
     */
    appendMappingsForIssueTypeScreenScheme<T = void>(parameters: Parameters.AppendMappingsForIssueTypeScreenScheme, callback: Callback<T>): Promise<void>;
    /**
     * Appends issue type to screen scheme mappings to an issue type screen scheme.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
     * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
     */
    appendMappingsForIssueTypeScreenScheme<T = void>(parameters: Parameters.AppendMappingsForIssueTypeScreenScheme, callback?: never): Promise<T>;
    /**
     * Updates the default screen scheme of an issue type screen scheme. The default screen scheme is used for all
     * unmapped issue types.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
     * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
     */
    updateDefaultScreenScheme<T = void>(parameters: Parameters.UpdateDefaultScreenScheme, callback: Callback<T>): Promise<void>;
    /**
     * Updates the default screen scheme of an issue type screen scheme. The default screen scheme is used for all
     * unmapped issue types.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
     * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
     */
    updateDefaultScreenScheme<T = void>(parameters: Parameters.UpdateDefaultScreenScheme, callback?: never): Promise<T>;
    /**
     * Removes issue type to screen scheme mappings from an issue type screen scheme.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
     * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
     */
    removeMappingsFromIssueTypeScreenScheme<T = void>(parameters: Parameters.RemoveMappingsFromIssueTypeScreenScheme, callback: Callback<T>): Promise<void>;
    /**
     * Removes issue type to screen scheme mappings from an issue type screen scheme.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
     * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
     */
    removeMappingsFromIssueTypeScreenScheme<T = void>(parameters: Parameters.RemoveMappingsFromIssueTypeScreenScheme, callback?: never): Promise<T>;
}
