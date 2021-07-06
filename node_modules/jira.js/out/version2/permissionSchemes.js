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
exports.PermissionSchemes = void 0;
class PermissionSchemes {
    constructor(client) {
        this.client = client;
    }
    getAllPermissionSchemes(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/2/permissionscheme',
                method: 'GET',
                params: {
                    expand: parameters === null || parameters === void 0 ? void 0 : parameters.expand,
                },
            };
            return this.client.sendRequest(config, callback, {
                methodName: 'version2.permissionSchemes.getAllPermissionSchemes',
            });
        });
    }
    createPermissionScheme(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/2/permissionscheme',
                method: 'POST',
                params: {
                    expand: parameters === null || parameters === void 0 ? void 0 : parameters.expand,
                },
                data: Object.assign(Object.assign({}, parameters), { expand: undefined }),
            };
            return this.client.sendRequest(config, callback, {
                methodName: 'version2.permissionSchemes.createPermissionScheme',
            });
        });
    }
    getPermissionScheme(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/permissionscheme/${parameters.schemeId}`,
                method: 'GET',
                params: {
                    expand: parameters.expand,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.permissionSchemes.getPermissionScheme' });
        });
    }
    updatePermissionScheme(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/permissionscheme/${parameters.schemeId}`,
                method: 'PUT',
                params: {
                    expand: parameters.expand,
                },
                data: Object.assign(Object.assign({}, parameters), { schemeId: undefined, expand: undefined }),
            };
            return this.client.sendRequest(config, callback, {
                methodName: 'version2.permissionSchemes.updatePermissionScheme',
            });
        });
    }
    deletePermissionScheme(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/permissionscheme/${parameters.schemeId}`,
                method: 'DELETE',
            };
            return this.client.sendRequest(config, callback, {
                methodName: 'version2.permissionSchemes.deletePermissionScheme',
            });
        });
    }
    getPermissionSchemeGrants(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/permissionscheme/${parameters.schemeId}/permission`,
                method: 'GET',
                params: {
                    expand: parameters.expand,
                },
            };
            return this.client.sendRequest(config, callback, {
                methodName: 'version2.permissionSchemes.getPermissionSchemeGrants',
            });
        });
    }
    createPermissionGrant(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/permissionscheme/${parameters.schemeId}/permission`,
                method: 'POST',
                params: {
                    expand: parameters.expand,
                },
                data: {
                    id: parameters.id,
                    self: parameters.self,
                    holder: parameters.holder,
                    permission: parameters.permission,
                },
            };
            return this.client.sendRequest(config, callback, {
                methodName: 'version2.permissionSchemes.createPermissionGrant',
            });
        });
    }
    getPermissionSchemeGrant(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/permissionscheme/${parameters.schemeId}/permission/${parameters.permissionId}`,
                method: 'GET',
                params: {
                    expand: parameters.expand,
                },
            };
            return this.client.sendRequest(config, callback, {
                methodName: 'version2.permissionSchemes.getPermissionSchemeGrant',
            });
        });
    }
    deletePermissionSchemeEntity(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/permissionscheme/${parameters.schemeId}/permission/${parameters.permissionId}`,
                method: 'DELETE',
            };
            return this.client.sendRequest(config, callback, {
                methodName: 'version2.permissionSchemes.deletePermissionSchemeEntity',
            });
        });
    }
}
exports.PermissionSchemes = PermissionSchemes;
//# sourceMappingURL=permissionSchemes.js.map