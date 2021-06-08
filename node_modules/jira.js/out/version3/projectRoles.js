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
exports.ProjectRoles = void 0;
class ProjectRoles {
    constructor(client) {
        this.client = client;
    }
    getProjectRoles(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/3/project/${parameters.projectIdOrKey}/role`,
                method: 'GET',
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.projectRoles.getProjectRoles' });
        });
    }
    getProjectRole(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/3/project/${parameters.projectIdOrKey}/role/${parameters.id}`,
                method: 'GET',
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.projectRoles.getProjectRole' });
        });
    }
    getProjectRoleDetails(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/3/project/${parameters.projectIdOrKey}/roledetails`,
                method: 'GET',
                params: {
                    currentMember: parameters.currentMember,
                    excludeConnectAddons: parameters.excludeConnectAddons,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.projectRoles.getProjectRoleDetails' });
        });
    }
    getAllProjectRoles(callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/3/role',
                method: 'GET',
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.projectRoles.getAllProjectRoles' });
        });
    }
    createProjectRole(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/3/role',
                method: 'POST',
                data: {
                    name: parameters === null || parameters === void 0 ? void 0 : parameters.name,
                    description: parameters === null || parameters === void 0 ? void 0 : parameters.description,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.projectRoles.createProjectRole' });
        });
    }
    getProjectRoleById(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/3/role/${parameters.id}`,
                method: 'GET',
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.projectRoles.getProjectRoleById' });
        });
    }
    partialUpdateProjectRole(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/3/role/${parameters.id}`,
                method: 'POST',
                data: {
                    name: parameters.name,
                    description: parameters.description,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.projectRoles.partialUpdateProjectRole' });
        });
    }
    fullyUpdateProjectRole(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/3/role/${parameters.id}`,
                method: 'PUT',
                data: {
                    name: parameters.name,
                    description: parameters.description,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.projectRoles.fullyUpdateProjectRole' });
        });
    }
    deleteProjectRole(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/3/role/${parameters.id}`,
                method: 'DELETE',
                params: {
                    swap: parameters.swap,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.projectRoles.deleteProjectRole' });
        });
    }
}
exports.ProjectRoles = ProjectRoles;
//# sourceMappingURL=projectRoles.js.map