import { Config } from '../../config';
export declare namespace AuthenticationService {
    function getAuthenticationToken(authentication: Config.Authentication | undefined, requestData?: {
        baseURL: string;
        url: string;
        method: string;
    }): Promise<string | undefined>;
}
