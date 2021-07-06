import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
export declare class AppProperties {
    private client;
    constructor(client: Client);
    /**
     * Gets all the properties of an app.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Only a
     * Connect app whose key matches `addonKey` can make this request.
     */
    getAddonProperties<T = Models.PropertyKeys>(parameters: Parameters.GetAddonProperties, callback: Callback<T>): Promise<void>;
    /**
     * Gets all the properties of an app.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Only a
     * Connect app whose key matches `addonKey` can make this request.
     */
    getAddonProperties<T = Models.PropertyKeys>(parameters: Parameters.GetAddonProperties, callback?: never): Promise<T>;
    /**
     * Returns the key and value of an app's property.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Only a
     * Connect app whose key matches `addonKey` can make this request.
     */
    getAddonProperty<T = Models.EntityProperty>(parameters: Parameters.GetAddonProperty, callback: Callback<T>): Promise<void>;
    /**
     * Returns the key and value of an app's property.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Only a
     * Connect app whose key matches `addonKey` can make this request.
     */
    getAddonProperty<T = Models.EntityProperty>(parameters: Parameters.GetAddonProperty, callback?: never): Promise<T>;
    /**
     * Sets the value of an app's property. Use this resource to store custom data for your app.
     *
     * The value of the request body must be a [valid](http://tools.ietf.org/html/rfc4627), non-empty JSON blob. The
     * maximum length is 32768 characters.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Only a
     * Connect app whose key matches `addonKey` can make this request.
     */
    putAddonProperty<T = Models.OperationMessage>(parameters: Parameters.PutAddonProperty, callback: Callback<T>): Promise<void>;
    /**
     * Sets the value of an app's property. Use this resource to store custom data for your app.
     *
     * The value of the request body must be a [valid](http://tools.ietf.org/html/rfc4627), non-empty JSON blob. The
     * maximum length is 32768 characters.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Only a
     * Connect app whose key matches `addonKey` can make this request.
     */
    putAddonProperty<T = Models.OperationMessage>(parameters: Parameters.PutAddonProperty, callback?: never): Promise<T>;
    /**
     * Deletes an app's property.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Only a
     * Connect app whose key matches `addonKey` can make this request.
     */
    deleteAddonProperty<T = void>(parameters: Parameters.DeleteAddonProperty, callback: Callback<T>): Promise<void>;
    /**
     * Deletes an app's property.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Only a
     * Connect app whose key matches `addonKey` can make this request.
     */
    deleteAddonProperty<T = void>(parameters: Parameters.DeleteAddonProperty, callback?: never): Promise<T>;
}
