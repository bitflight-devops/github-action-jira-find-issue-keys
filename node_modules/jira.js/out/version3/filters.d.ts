import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
export declare class Filters {
    private client;
    constructor(client: Client);
    /**
     * @deprecated Returns all filters. Deprecated, use [ Search for filters](#api-rest-api-3-filter-search-get) that
     *   supports search and pagination.
     *
     *   This operation can be accessed anonymously.
     *
     *   **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None,
     *   however, only the following filters are returned:
     *
     *   - Filters owned by the user.
     *   - Filters shared with a group that the user is a member of.
     *   - Filters shared with a private project that the user has *Browse projects* [project
     *       permission](https://confluence.atlassian.com/x/yodKLg) for.
     *   - Filters shared with a public project.
     *   - Filters shared with the public.
     */
    getFilters<T = Models.Filter[]>(parameters: Parameters.GetFilters | undefined, callback: Callback<T>): Promise<void>;
    /**
     * @deprecated Returns all filters. Deprecated, use [ Search for filters](#api-rest-api-3-filter-search-get) that
     *   supports search and pagination.
     *
     *   This operation can be accessed anonymously.
     *
     *   **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None,
     *   however, only the following filters are returned:
     *
     *   - Filters owned by the user.
     *   - Filters shared with a group that the user is a member of.
     *   - Filters shared with a private project that the user has *Browse projects* [project
     *       permission](https://confluence.atlassian.com/x/yodKLg) for.
     *   - Filters shared with a public project.
     *   - Filters shared with the public.
     */
    getFilters<T = Models.Filter[]>(parameters?: Parameters.GetFilters, callback?: never): Promise<T>;
    /**
     * Creates a filter. The filter is shared according to the [default share scope](#api-rest-api-3-filter-post). The
     * filter is not selected as a favorite.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
     * Permission to access Jira.
     */
    createFilter<T = Models.Filter>(parameters: Parameters.CreateFilter | undefined, callback: Callback<T>): Promise<void>;
    /**
     * Creates a filter. The filter is shared according to the [default share scope](#api-rest-api-3-filter-post). The
     * filter is not selected as a favorite.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
     * Permission to access Jira.
     */
    createFilter<T = Models.Filter>(parameters?: Parameters.CreateFilter, callback?: never): Promise<T>;
    /**
     * Returns the visible favorite filters of the user.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** A
     * favorite filter is only visible to the user where the filter is:
     *
     * - Owned by the user.
     * - Shared with a group that the user is a member of.
     * - Shared with a private project that the user has *Browse projects* [project
     *   permission](https://confluence.atlassian.com/x/yodKLg) for.
     * - Shared with a public project.
     * - Shared with the public.
     *
     * For example, if the user favorites a public filter that is subsequently made private that filter is not returned by
     * this operation.
     */
    getFavouriteFilters<T = Models.Filter[]>(parameters: Parameters.GetFavouriteFilters | undefined, callback: Callback<T>): Promise<void>;
    /**
     * Returns the visible favorite filters of the user.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** A
     * favorite filter is only visible to the user where the filter is:
     *
     * - Owned by the user.
     * - Shared with a group that the user is a member of.
     * - Shared with a private project that the user has *Browse projects* [project
     *   permission](https://confluence.atlassian.com/x/yodKLg) for.
     * - Shared with a public project.
     * - Shared with the public.
     *
     * For example, if the user favorites a public filter that is subsequently made private that filter is not returned by
     * this operation.
     */
    getFavouriteFilters<T = Models.Filter[]>(parameters?: Parameters.GetFavouriteFilters, callback?: never): Promise<T>;
    /**
     * Returns the filters owned by the user. If `includeFavourites` is `true`, the user's visible favorite filters are
     * also returned.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
     * Permission to access Jira, however, a favorite filters is only visible to the user where the filter is:
     *
     * - Owned by the user.
     * - Shared with a group that the user is a member of.
     * - Shared with a private project that the user has *Browse projects* [project
     *   permission](https://confluence.atlassian.com/x/yodKLg) for.
     * - Shared with a public project.
     * - Shared with the public.
     *
     * For example, if the user favorites a public filter that is subsequently made private that filter is not returned by
     * this operation.
     */
    getMyFilters<T = Models.Filter[]>(parameters: Parameters.GetMyFilters | undefined, callback: Callback<T>): Promise<void>;
    /**
     * Returns the filters owned by the user. If `includeFavourites` is `true`, the user's visible favorite filters are
     * also returned.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
     * Permission to access Jira, however, a favorite filters is only visible to the user where the filter is:
     *
     * - Owned by the user.
     * - Shared with a group that the user is a member of.
     * - Shared with a private project that the user has *Browse projects* [project
     *   permission](https://confluence.atlassian.com/x/yodKLg) for.
     * - Shared with a public project.
     * - Shared with the public.
     *
     * For example, if the user favorites a public filter that is subsequently made private that filter is not returned by
     * this operation.
     */
    getMyFilters<T = Models.Filter[]>(parameters?: Parameters.GetMyFilters, callback?: never): Promise<T>;
    /**
     * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of
     * filters. Use this operation to get:
     *
     * - Specific filters, by defining `id` only.
     * - Filters that match all of the specified attributes. For example, all filters for a user with a particular word in
     *   their name. When multiple attributes are specified only filters matching all attributes are returned.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None,
     * however, only the following filters that match the query parameters are returned:
     *
     * - Filters owned by the user.
     * - Filters shared with a group that the user is a member of.
     * - Filters shared with a private project that the user has *Browse projects* [project
     *   permission](https://confluence.atlassian.com/x/yodKLg) for.
     * - Filters shared with a public project.
     * - Filters shared with the public.
     */
    getFiltersPaginated<T = Models.PageBeanFilterDetails>(parameters: Parameters.GetFiltersPaginated | undefined, callback: Callback<T>): Promise<void>;
    /**
     * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of
     * filters. Use this operation to get:
     *
     * - Specific filters, by defining `id` only.
     * - Filters that match all of the specified attributes. For example, all filters for a user with a particular word in
     *   their name. When multiple attributes are specified only filters matching all attributes are returned.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None,
     * however, only the following filters that match the query parameters are returned:
     *
     * - Filters owned by the user.
     * - Filters shared with a group that the user is a member of.
     * - Filters shared with a private project that the user has *Browse projects* [project
     *   permission](https://confluence.atlassian.com/x/yodKLg) for.
     * - Filters shared with a public project.
     * - Filters shared with the public.
     */
    getFiltersPaginated<T = Models.PageBeanFilterDetails>(parameters?: Parameters.GetFiltersPaginated, callback?: never): Promise<T>;
    /**
     * Returns a filter.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None,
     * however, the filter is only returned where it is:
     *
     * - Owned by the user.
     * - Shared with a group that the user is a member of.
     * - Shared with a private project that the user has *Browse projects* [project
     *   permission](https://confluence.atlassian.com/x/yodKLg) for.
     * - Shared with a public project.
     * - Shared with the public.
     */
    getFilter<T = Models.Filter>(parameters: Parameters.GetFilter, callback: Callback<T>): Promise<void>;
    /**
     * Returns a filter.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None,
     * however, the filter is only returned where it is:
     *
     * - Owned by the user.
     * - Shared with a group that the user is a member of.
     * - Shared with a private project that the user has *Browse projects* [project
     *   permission](https://confluence.atlassian.com/x/yodKLg) for.
     * - Shared with a public project.
     * - Shared with the public.
     */
    getFilter<T = Models.Filter>(parameters: Parameters.GetFilter, callback?: never): Promise<T>;
    /**
     * Updates a filter. Use this operation to update a filter's name, description, JQL, or sharing.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
     * Permission to access Jira, however the user must own the filter.
     */
    updateFilter<T = Models.Filter>(parameters: Parameters.UpdateFilter, callback: Callback<T>): Promise<void>;
    /**
     * Updates a filter. Use this operation to update a filter's name, description, JQL, or sharing.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
     * Permission to access Jira, however the user must own the filter.
     */
    updateFilter<T = Models.Filter>(parameters: Parameters.UpdateFilter, callback?: never): Promise<T>;
    /**
     * Delete a filter.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
     * Permission to access Jira, however filters can only be deleted by the creator of the filter or a user with
     * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
     */
    deleteFilter<T = void>(parameters: Parameters.DeleteFilter, callback: Callback<T>): Promise<void>;
    /**
     * Delete a filter.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
     * Permission to access Jira, however filters can only be deleted by the creator of the filter or a user with
     * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
     */
    deleteFilter<T = void>(parameters: Parameters.DeleteFilter, callback?: never): Promise<T>;
    /**
     * Returns the columns configured for a filter. The column configuration is used when the filter's results are viewed
     * in *List View* with the *Columns* set to *Filter*.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None,
     * however, column details are only returned for:
     *
     * - Filters owned by the user.
     * - Filters shared with a group that the user is a member of.
     * - Filters shared with a private project that the user has *Browse projects* [project
     *   permission](https://confluence.atlassian.com/x/yodKLg) for.
     * - Filters shared with a public project.
     * - Filters shared with the public.
     */
    getColumns<T = Models.ColumnItem[]>(parameters: Parameters.GetColumns, callback: Callback<T>): Promise<void>;
    /**
     * Returns the columns configured for a filter. The column configuration is used when the filter's results are viewed
     * in *List View* with the *Columns* set to *Filter*.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None,
     * however, column details are only returned for:
     *
     * - Filters owned by the user.
     * - Filters shared with a group that the user is a member of.
     * - Filters shared with a private project that the user has *Browse projects* [project
     *   permission](https://confluence.atlassian.com/x/yodKLg) for.
     * - Filters shared with a public project.
     * - Filters shared with the public.
     */
    getColumns<T = Models.ColumnItem[]>(parameters: Parameters.GetColumns, callback?: never): Promise<T>;
    /**
     * Sets the columns for a filter. Only navigable fields can be set as columns. Use [Get
     * fields](#api-rest-api-3-field-get) to get the list fields in Jira. A navigable field has `navigable` set to `true`.
     *
     * The parameters for this resource are expressed as HTML form data. For example, in curl:
     *
     * `curl -X PUT -d columns=summary -d columns=description https://your-domain.atlassian.net/rest/api/3/filter/10000/columns`
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
     * Permission to access Jira, however, columns are only set for:
     *
     * - Filters owned by the user.
     * - Filters shared with a group that the user is a member of.
     * - Filters shared with a private project that the user has *Browse projects* [project
     *   permission](https://confluence.atlassian.com/x/yodKLg) for.
     * - Filters shared with a public project.
     * - Filters shared with the public.
     */
    setColumns<T = unknown>(parameters: Parameters.SetColumns, callback: Callback<T>): Promise<void>;
    /**
     * Sets the columns for a filter. Only navigable fields can be set as columns. Use [Get
     * fields](#api-rest-api-3-field-get) to get the list fields in Jira. A navigable field has `navigable` set to `true`.
     *
     * The parameters for this resource are expressed as HTML form data. For example, in curl:
     *
     * `curl -X PUT -d columns=summary -d columns=description https://your-domain.atlassian.net/rest/api/3/filter/10000/columns`
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
     * Permission to access Jira, however, columns are only set for:
     *
     * - Filters owned by the user.
     * - Filters shared with a group that the user is a member of.
     * - Filters shared with a private project that the user has *Browse projects* [project
     *   permission](https://confluence.atlassian.com/x/yodKLg) for.
     * - Filters shared with a public project.
     * - Filters shared with the public.
     */
    setColumns<T = unknown>(parameters: Parameters.SetColumns, callback?: never): Promise<T>;
    /**
     * Reset the user's column configuration for the filter to the default.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
     * Permission to access Jira, however, columns are only reset for:
     *
     * - Filters owned by the user.
     * - Filters shared with a group that the user is a member of.
     * - Filters shared with a private project that the user has *Browse projects* [project
     *   permission](https://confluence.atlassian.com/x/yodKLg) for.
     * - Filters shared with a public project.
     * - Filters shared with the public.
     */
    resetColumns<T = void>(parameters: Parameters.ResetColumns, callback: Callback<T>): Promise<void>;
    /**
     * Reset the user's column configuration for the filter to the default.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
     * Permission to access Jira, however, columns are only reset for:
     *
     * - Filters owned by the user.
     * - Filters shared with a group that the user is a member of.
     * - Filters shared with a private project that the user has *Browse projects* [project
     *   permission](https://confluence.atlassian.com/x/yodKLg) for.
     * - Filters shared with a public project.
     * - Filters shared with the public.
     */
    resetColumns<T = void>(parameters: Parameters.ResetColumns, callback?: never): Promise<T>;
    /**
     * Add a filter as a favorite for the user.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
     * Permission to access Jira, however, the user can only favorite:
     *
     * - Filters owned by the user.
     * - Filters shared with a group that the user is a member of.
     * - Filters shared with a private project that the user has *Browse projects* [project
     *   permission](https://confluence.atlassian.com/x/yodKLg) for.
     * - Filters shared with a public project.
     * - Filters shared with the public.
     */
    setFavouriteForFilter<T = Models.Filter>(parameters: Parameters.SetFavouriteForFilter, callback: Callback<T>): Promise<void>;
    /**
     * Add a filter as a favorite for the user.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
     * Permission to access Jira, however, the user can only favorite:
     *
     * - Filters owned by the user.
     * - Filters shared with a group that the user is a member of.
     * - Filters shared with a private project that the user has *Browse projects* [project
     *   permission](https://confluence.atlassian.com/x/yodKLg) for.
     * - Filters shared with a public project.
     * - Filters shared with the public.
     */
    setFavouriteForFilter<T = Models.Filter>(parameters: Parameters.SetFavouriteForFilter, callback?: never): Promise<T>;
    /**
     * Removes a filter as a favorite for the user. Note that this operation only removes filters visible to the user from
     * the user's favorites list. For example, if the user favorites a public filter that is subsequently made private
     * (and is therefore no longer visible on their favorites list) they cannot remove it from their favorites list.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
     * Permission to access Jira.
     */
    deleteFavouriteForFilter<T = Models.Filter>(parameters: Parameters.DeleteFavouriteForFilter, callback: Callback<T>): Promise<void>;
    /**
     * Removes a filter as a favorite for the user. Note that this operation only removes filters visible to the user from
     * the user's favorites list. For example, if the user favorites a public filter that is subsequently made private
     * (and is therefore no longer visible on their favorites list) they cannot remove it from their favorites list.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
     * Permission to access Jira.
     */
    deleteFavouriteForFilter<T = Models.Filter>(parameters: Parameters.DeleteFavouriteForFilter, callback?: never): Promise<T>;
}
