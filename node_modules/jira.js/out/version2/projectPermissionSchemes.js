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
exports.ProjectPermissionSchemes = void 0;
class ProjectPermissionSchemes {
    constructor(client) {
        this.client = client;
    }
    getProjectIssueSecurityScheme(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/project/${parameters.projectKeyOrId}/issuesecuritylevelscheme`,
                method: 'GET',
            };
            return this.client.sendRequest(config, callback, {
                methodName: 'version2.projectPermissionSchemes.getProjectIssueSecurityScheme',
            });
        });
    }
    getAssignedPermissionScheme(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/project/${parameters.projectKeyOrId}/permissionscheme`,
                method: 'GET',
                params: {
                    expand: parameters.expand,
                },
            };
            return this.client.sendRequest(config, callback, {
                methodName: 'version2.projectPermissionSchemes.getAssignedPermissionScheme',
            });
        });
    }
    assignPermissionScheme(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/project/${parameters.projectKeyOrId}/permissionscheme`,
                method: 'PUT',
                params: {
                    expand: parameters.expand,
                },
                data: {
                    id: parameters.id,
                },
            };
            return this.client.sendRequest(config, callback, {
                methodName: 'version2.projectPermissionSchemes.assignPermissionScheme',
            });
        });
    }
    getSecurityLevelsForProject(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/project/${parameters.projectKeyOrId}/securitylevel`,
                method: 'GET',
            };
            return this.client.sendRequest(config, callback, {
                methodName: 'version2.projectPermissionSchemes.getSecurityLevelsForProject',
            });
        });
    }
}
exports.ProjectPermissionSchemes = ProjectPermissionSchemes;
//# sourceMappingURL=projectPermissionSchemes.js.map