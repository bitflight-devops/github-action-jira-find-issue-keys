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
exports.FilterSharing = void 0;
class FilterSharing {
    constructor(client) {
        this.client = client;
    }
    getDefaultShareScope(callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/2/filter/defaultShareScope',
                method: 'GET',
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.filterSharing.getDefaultShareScope' });
        });
    }
    setDefaultShareScope(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/2/filter/defaultShareScope',
                method: 'PUT',
                data: {
                    scope: parameters === null || parameters === void 0 ? void 0 : parameters.scope,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.filterSharing.setDefaultShareScope' });
        });
    }
    getSharePermissions(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/filter/${parameters.id}/permission`,
                method: 'GET',
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.filterSharing.getSharePermissions' });
        });
    }
    addSharePermission(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/filter/${parameters.id}/permission`,
                method: 'POST',
                data: {
                    type: parameters.type,
                    projectId: parameters.projectId,
                    groupname: parameters.groupname,
                    projectRoleId: parameters.projectRoleId,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.filterSharing.addSharePermission' });
        });
    }
    getSharePermission(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/filter/${parameters.id}/permission/${parameters.permissionId}`,
                method: 'GET',
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.filterSharing.getSharePermission' });
        });
    }
    deleteSharePermission(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/filter/${parameters.id}/permission/${parameters.permissionId}`,
                method: 'DELETE',
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.filterSharing.deleteSharePermission' });
        });
    }
}
exports.FilterSharing = FilterSharing;
//# sourceMappingURL=filterSharing.js.map