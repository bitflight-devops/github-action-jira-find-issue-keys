import { Config } from '../../../config';
export declare function createOAuthAuthenticationToken(authenticationData: Config.Authentication.OAuth, requestData: {
    baseURL: string;
    url: string;
    method: string;
}): string;
