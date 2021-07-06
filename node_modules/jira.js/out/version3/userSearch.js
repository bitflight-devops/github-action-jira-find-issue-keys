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
exports.UserSearch = void 0;
class UserSearch {
    constructor(client) {
        this.client = client;
    }
    findBulkAssignableUsers(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/3/user/assignable/multiProjectSearch',
                method: 'GET',
                params: {
                    query: parameters.query,
                    username: parameters.username,
                    accountId: parameters.accountId,
                    projectKeys: parameters.projectKeys,
                    startAt: parameters.startAt,
                    maxResults: parameters.maxResults,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.userSearch.findBulkAssignableUsers' });
        });
    }
    findAssignableUsers(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/3/user/assignable/search',
                method: 'GET',
                params: {
                    query: parameters === null || parameters === void 0 ? void 0 : parameters.query,
                    sessionId: parameters === null || parameters === void 0 ? void 0 : parameters.sessionId,
                    username: parameters === null || parameters === void 0 ? void 0 : parameters.username,
                    accountId: parameters === null || parameters === void 0 ? void 0 : parameters.accountId,
                    project: parameters === null || parameters === void 0 ? void 0 : parameters.project,
                    issueKey: parameters === null || parameters === void 0 ? void 0 : parameters.issueKey,
                    startAt: parameters === null || parameters === void 0 ? void 0 : parameters.startAt,
                    maxResults: parameters === null || parameters === void 0 ? void 0 : parameters.maxResults,
                    actionDescriptorId: parameters === null || parameters === void 0 ? void 0 : parameters.actionDescriptorId,
                    recommend: parameters === null || parameters === void 0 ? void 0 : parameters.recommend,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.userSearch.findAssignableUsers' });
        });
    }
    findUsersWithAllPermissions(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/3/user/permission/search',
                method: 'GET',
                params: {
                    query: parameters.query,
                    username: parameters.username,
                    accountId: parameters.accountId,
                    permissions: parameters.permissions,
                    issueKey: parameters.issueKey,
                    projectKey: parameters.projectKey,
                    startAt: parameters.startAt,
                    maxResults: parameters.maxResults,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.userSearch.findUsersWithAllPermissions' });
        });
    }
    findUsersForPicker(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/3/user/picker',
                method: 'GET',
                params: {
                    query: parameters.query,
                    maxResults: parameters.maxResults,
                    showAvatar: parameters.showAvatar,
                    exclude: parameters.exclude,
                    excludeAccountIds: parameters.excludeAccountIds,
                    avatarSize: parameters.avatarSize,
                    excludeConnectUsers: parameters.excludeConnectUsers,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.userSearch.findUsersForPicker' });
        });
    }
    findUsers(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/3/user/search',
                method: 'GET',
                params: {
                    query: parameters === null || parameters === void 0 ? void 0 : parameters.query,
                    username: parameters === null || parameters === void 0 ? void 0 : parameters.username,
                    accountId: parameters === null || parameters === void 0 ? void 0 : parameters.accountId,
                    startAt: parameters === null || parameters === void 0 ? void 0 : parameters.startAt,
                    maxResults: parameters === null || parameters === void 0 ? void 0 : parameters.maxResults,
                    property: parameters === null || parameters === void 0 ? void 0 : parameters.property,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.userSearch.findUsers' });
        });
    }
    findUsersByQuery(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/3/user/search/query',
                method: 'GET',
                params: {
                    query: parameters.query,
                    startAt: parameters.startAt,
                    maxResults: parameters.maxResults,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.userSearch.findUsersByQuery' });
        });
    }
    findUserKeysByQuery(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/3/user/search/query/key',
                method: 'GET',
                params: {
                    query: parameters.query,
                    startAt: parameters.startAt,
                    maxResults: parameters.maxResults,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.userSearch.findUserKeysByQuery' });
        });
    }
    findUsersWithBrowsePermission(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/3/user/viewissue/search',
                method: 'GET',
                params: {
                    query: parameters === null || parameters === void 0 ? void 0 : parameters.query,
                    username: parameters === null || parameters === void 0 ? void 0 : parameters.username,
                    accountId: parameters === null || parameters === void 0 ? void 0 : parameters.accountId,
                    issueKey: parameters === null || parameters === void 0 ? void 0 : parameters.issueKey,
                    projectKey: parameters === null || parameters === void 0 ? void 0 : parameters.projectKey,
                    startAt: parameters === null || parameters === void 0 ? void 0 : parameters.startAt,
                    maxResults: parameters === null || parameters === void 0 ? void 0 : parameters.maxResults,
                },
            };
            return this.client.sendRequest(config, callback, {
                methodName: 'version3.userSearch.findUsersWithBrowsePermission',
            });
        });
    }
}
exports.UserSearch = UserSearch;
//# sourceMappingURL=userSearch.js.map