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
exports.UserProperties = void 0;
class UserProperties {
    constructor(client) {
        this.client = client;
    }
    getUserPropertyKeys(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/3/user/properties',
                method: 'GET',
                params: {
                    accountId: parameters === null || parameters === void 0 ? void 0 : parameters.accountId,
                    userKey: parameters === null || parameters === void 0 ? void 0 : parameters.userKey,
                    username: parameters === null || parameters === void 0 ? void 0 : parameters.username,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.userProperties.getUserPropertyKeys' });
        });
    }
    getUserProperty(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/3/user/properties/${parameters.propertyKey}`,
                method: 'GET',
                params: {
                    accountId: parameters.accountId,
                    userKey: parameters.userKey,
                    username: parameters.username,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.userProperties.getUserProperty' });
        });
    }
    setUserProperty(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/3/user/properties/${parameters.propertyKey}`,
                method: 'PUT',
                params: {
                    accountId: parameters.accountId,
                    userKey: parameters.userKey,
                    username: parameters.username,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.userProperties.setUserProperty' });
        });
    }
    deleteUserProperty(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/3/user/properties/${parameters.propertyKey}`,
                method: 'DELETE',
                params: {
                    accountId: parameters.accountId,
                    userKey: parameters.userKey,
                    username: parameters.username,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.userProperties.deleteUserProperty' });
        });
    }
}
exports.UserProperties = UserProperties;
//# sourceMappingURL=userProperties.js.map