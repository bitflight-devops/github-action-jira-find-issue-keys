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
exports.Users = void 0;
class Users {
    constructor(client) {
        this.client = client;
    }
    getUser(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/3/user',
                method: 'GET',
                params: {
                    accountId: parameters === null || parameters === void 0 ? void 0 : parameters.accountId,
                    username: parameters === null || parameters === void 0 ? void 0 : parameters.username,
                    key: parameters === null || parameters === void 0 ? void 0 : parameters.key,
                    expand: parameters === null || parameters === void 0 ? void 0 : parameters.expand,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.users.getUser' });
        });
    }
    createUser(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/3/user',
                method: 'POST',
                data: {
                    self: parameters === null || parameters === void 0 ? void 0 : parameters.self,
                    key: parameters === null || parameters === void 0 ? void 0 : parameters.key,
                    name: parameters === null || parameters === void 0 ? void 0 : parameters.name,
                    password: parameters === null || parameters === void 0 ? void 0 : parameters.password,
                    emailAddress: parameters === null || parameters === void 0 ? void 0 : parameters.emailAddress,
                    displayName: parameters === null || parameters === void 0 ? void 0 : parameters.displayName,
                    notification: parameters === null || parameters === void 0 ? void 0 : parameters.notification,
                    applicationKeys: parameters === null || parameters === void 0 ? void 0 : parameters.applicationKeys,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.users.createUser' });
        });
    }
    removeUser(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/3/user',
                method: 'DELETE',
                params: {
                    accountId: parameters.accountId,
                    username: parameters.username,
                    key: parameters.key,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.users.removeUser' });
        });
    }
    bulkGetUsers(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/3/user/bulk',
                method: 'GET',
                params: {
                    startAt: parameters.startAt,
                    maxResults: parameters.maxResults,
                    username: parameters.username,
                    key: parameters.key,
                    accountId: parameters.accountId,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.users.bulkGetUsers' });
        });
    }
    bulkGetUsersMigration(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/3/user/bulk/migration',
                method: 'GET',
                params: {
                    startAt: parameters === null || parameters === void 0 ? void 0 : parameters.startAt,
                    maxResults: parameters === null || parameters === void 0 ? void 0 : parameters.maxResults,
                    username: parameters === null || parameters === void 0 ? void 0 : parameters.username,
                    key: parameters === null || parameters === void 0 ? void 0 : parameters.key,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.users.bulkGetUsersMigration' });
        });
    }
    getUserDefaultColumns(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/3/user/columns',
                method: 'GET',
                params: {
                    accountId: parameters === null || parameters === void 0 ? void 0 : parameters.accountId,
                    username: parameters === null || parameters === void 0 ? void 0 : parameters.username,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.users.getUserDefaultColumns' });
        });
    }
    setUserColumns(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/3/user/columns',
                method: 'PUT',
                params: {
                    accountId: parameters === null || parameters === void 0 ? void 0 : parameters.accountId,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.users.setUserColumns' });
        });
    }
    resetUserColumns(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/3/user/columns',
                method: 'DELETE',
                params: {
                    accountId: parameters === null || parameters === void 0 ? void 0 : parameters.accountId,
                    username: parameters === null || parameters === void 0 ? void 0 : parameters.username,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.users.resetUserColumns' });
        });
    }
    getUserEmail(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/3/user/email',
                method: 'GET',
                params: {
                    accountId: parameters.accountId,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.users.getUserEmail' });
        });
    }
    getUserEmailBulk(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/3/user/email/bulk',
                method: 'GET',
                params: {
                    accountId: parameters.accountId,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.users.getUserEmailBulk' });
        });
    }
    getUserGroups(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/3/user/groups',
                method: 'GET',
                params: {
                    accountId: parameters.accountId,
                    username: parameters.username,
                    key: parameters.key,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.users.getUserGroups' });
        });
    }
    getAllUsersDefault(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/3/users',
                method: 'GET',
                params: {
                    startAt: parameters === null || parameters === void 0 ? void 0 : parameters.startAt,
                    maxResults: parameters === null || parameters === void 0 ? void 0 : parameters.maxResults,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.users.getAllUsersDefault' });
        });
    }
    getAllUsers(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/3/users/search',
                method: 'GET',
                params: {
                    startAt: parameters === null || parameters === void 0 ? void 0 : parameters.startAt,
                    maxResults: parameters === null || parameters === void 0 ? void 0 : parameters.maxResults,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.users.getAllUsers' });
        });
    }
}
exports.Users = Users;
//# sourceMappingURL=users.js.map