"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOAuthAuthenticationToken = void 0;
const oauth_1 = require("oauth");
function createOAuthAuthenticationToken(authenticationData, requestData) {
    const { baseURL, url, method, } = requestData;
    const oauthUrl = `${baseURL}/plugins/servlet/oauth/`;
    const oauth = new oauth_1.OAuth(`${oauthUrl}request-token`, `${oauthUrl}access-token`, authenticationData.consumerKey, authenticationData.consumerSecret, '1.0', null, 'RSA-SHA1');
    return oauth.authHeader(new URL(url, baseURL).toString(), authenticationData.accessToken, authenticationData.tokenSecret, method);
}
exports.createOAuthAuthenticationToken = createOAuthAuthenticationToken;
//# sourceMappingURL=createOAuthAuthenticationToken.js.map