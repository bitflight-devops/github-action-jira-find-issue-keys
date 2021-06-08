"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationService = void 0;
const authentications_1 = require("./authentications");
var AuthenticationService;
(function (AuthenticationService) {
    function getAuthenticationToken(authentication, requestData) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!authentication) {
                return undefined;
            }
            if (authentication.basic) {
                return authentications_1.createBasicAuthenticationToken(authentication.basic);
            }
            if (authentication.oauth) {
                return authentications_1.createOAuthAuthenticationToken(authentication.oauth, requestData);
            }
            if (authentication.oauth2) {
                return authentications_1.createOAuth2AuthenticationToken(authentication.oauth2);
            }
            if (authentication.jwt) {
                return authentications_1.createJWTAuthentication(authentication.jwt, requestData);
            }
            return undefined;
        });
    }
    AuthenticationService.getAuthenticationToken = getAuthenticationToken;
})(AuthenticationService = exports.AuthenticationService || (exports.AuthenticationService = {}));
//# sourceMappingURL=authenticationService.js.map