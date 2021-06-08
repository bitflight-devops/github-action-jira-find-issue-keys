"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJWTAuthentication = void 0;
const jwt = require("atlassian-jwt");
function createJWTAuthentication(authenticationData, requestData) {
    const { method, url, } = requestData;
    const now = Math.floor(Date.now() / 1000);
    const expire = now + 180;
    const request = jwt.fromMethodAndUrl(method, url);
    const tokenData = {
        iss: authenticationData.issuer,
        qsh: jwt.createQueryStringHash(request),
        iat: now,
        exp: expire,
    };
    const token = jwt.encodeSymmetric(tokenData, authenticationData.secret);
    return `JWT ${token}`;
}
exports.createJWTAuthentication = createJWTAuthentication;
//# sourceMappingURL=createJWTAuthentication.js.map