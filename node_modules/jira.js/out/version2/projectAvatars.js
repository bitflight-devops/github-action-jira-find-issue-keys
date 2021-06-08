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
exports.ProjectAvatars = void 0;
class ProjectAvatars {
    constructor(client) {
        this.client = client;
    }
    updateProjectAvatar(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/project/${parameters.projectIdOrKey}/avatar`,
                method: 'PUT',
                data: {
                    id: parameters.id,
                    owner: parameters.owner,
                    isSystemAvatar: parameters.isSystemAvatar,
                    isSelected: parameters.isSelected,
                    isDeletable: parameters.isDeletable,
                    fileName: parameters.fileName,
                    urls: parameters.urls,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.projectAvatars.updateProjectAvatar' });
        });
    }
    deleteProjectAvatar(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/project/${parameters.projectIdOrKey}/avatar/${parameters.id}`,
                method: 'DELETE',
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.projectAvatars.deleteProjectAvatar' });
        });
    }
    createProjectAvatar(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/project/${parameters.projectIdOrKey}/avatar2`,
                method: 'POST',
                params: {
                    x: parameters.x,
                    y: parameters.y,
                    size: parameters.size,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.projectAvatars.createProjectAvatar' });
        });
    }
    getAllProjectAvatars(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/project/${parameters.projectIdOrKey}/avatars`,
                method: 'GET',
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.projectAvatars.getAllProjectAvatars' });
        });
    }
}
exports.ProjectAvatars = ProjectAvatars;
//# sourceMappingURL=projectAvatars.js.map