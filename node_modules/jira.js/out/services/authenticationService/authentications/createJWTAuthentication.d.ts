import { Config } from '../../../config';
export declare function createJWTAuthentication(authenticationData: Config.Authentication.JWT, requestData: {
    method: string;
    url: string;
}): string;
