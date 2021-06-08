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
exports.Permissions = void 0;
class Permissions {
    constructor(client) {
        this.client = client;
    }
    getMyPermissions(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/3/mypermissions',
                method: 'GET',
                params: {
                    projectKey: parameters === null || parameters === void 0 ? void 0 : parameters.projectKey,
                    projectId: parameters === null || parameters === void 0 ? void 0 : parameters.projectId,
                    issueKey: parameters === null || parameters === void 0 ? void 0 : parameters.issueKey,
                    issueId: parameters === null || parameters === void 0 ? void 0 : parameters.issueId,
                    permissions: parameters === null || parameters === void 0 ? void 0 : parameters.permissions,
                    projectUuid: parameters === null || parameters === void 0 ? void 0 : parameters.projectUuid,
                    projectConfigurationUuid: parameters === null || parameters === void 0 ? void 0 : parameters.projectConfigurationUuid,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.permissions.getMyPermissions' });
        });
    }
    getAllPermissions(callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/3/permissions',
                method: 'GET',
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.permissions.getAllPermissions' });
        });
    }
    getBulkPermissions(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/3/permissions/check',
                method: 'POST',
                data: {
                    projectPermissions: parameters === null || parameters === void 0 ? void 0 : parameters.projectPermissions,
                    globalPermissions: parameters === null || parameters === void 0 ? void 0 : parameters.globalPermissions,
                    accountId: parameters === null || parameters === void 0 ? void 0 : parameters.accountId,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.permissions.getBulkPermissions' });
        });
    }
    getPermittedProjects(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/3/permissions/project',
                method: 'POST',
                data: {
                    permissions: parameters === null || parameters === void 0 ? void 0 : parameters.permissions,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.permissions.getPermittedProjects' });
        });
    }
}
exports.Permissions = Permissions;
//# sourceMappingURL=permissions.js.map