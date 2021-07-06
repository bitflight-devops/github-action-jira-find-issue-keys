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
exports.ProjectVersions = void 0;
class ProjectVersions {
    constructor(client) {
        this.client = client;
    }
    getProjectVersionsPaginated(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/project/${parameters.projectIdOrKey}/version`,
                method: 'GET',
                params: {
                    startAt: parameters.startAt,
                    maxResults: parameters.maxResults,
                    orderBy: parameters.orderBy,
                    query: parameters.query,
                    status: parameters.status,
                    expand: parameters.expand,
                },
            };
            return this.client.sendRequest(config, callback, {
                methodName: 'version2.projectVersions.getProjectVersionsPaginated',
            });
        });
    }
    getProjectVersions(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/project/${parameters.projectIdOrKey}/versions`,
                method: 'GET',
                params: {
                    expand: parameters.expand,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.projectVersions.getProjectVersions' });
        });
    }
    createVersion(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/2/version',
                method: 'POST',
                data: {
                    expand: parameters === null || parameters === void 0 ? void 0 : parameters.expand,
                    self: parameters === null || parameters === void 0 ? void 0 : parameters.self,
                    id: parameters === null || parameters === void 0 ? void 0 : parameters.id,
                    description: parameters === null || parameters === void 0 ? void 0 : parameters.description,
                    name: parameters === null || parameters === void 0 ? void 0 : parameters.name,
                    archived: parameters === null || parameters === void 0 ? void 0 : parameters.archived,
                    released: parameters === null || parameters === void 0 ? void 0 : parameters.released,
                    startDate: parameters === null || parameters === void 0 ? void 0 : parameters.startDate,
                    releaseDate: parameters === null || parameters === void 0 ? void 0 : parameters.releaseDate,
                    overdue: parameters === null || parameters === void 0 ? void 0 : parameters.overdue,
                    userStartDate: parameters === null || parameters === void 0 ? void 0 : parameters.userStartDate,
                    userReleaseDate: parameters === null || parameters === void 0 ? void 0 : parameters.userReleaseDate,
                    project: parameters === null || parameters === void 0 ? void 0 : parameters.project,
                    projectId: parameters === null || parameters === void 0 ? void 0 : parameters.projectId,
                    moveUnfixedIssuesTo: parameters === null || parameters === void 0 ? void 0 : parameters.moveUnfixedIssuesTo,
                    operations: parameters === null || parameters === void 0 ? void 0 : parameters.operations,
                    issuesStatusForFixVersion: parameters === null || parameters === void 0 ? void 0 : parameters.issuesStatusForFixVersion,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.projectVersions.createVersion' });
        });
    }
    getVersion(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/version/${parameters.id}`,
                method: 'GET',
                params: {
                    expand: parameters.expand,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.projectVersions.getVersion' });
        });
    }
    updateVersion(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/version/${parameters.id}`,
                method: 'PUT',
                data: {
                    expand: parameters.expand,
                    description: parameters.description,
                    name: parameters.name,
                    archived: parameters.archived,
                    released: parameters.released,
                    startDate: parameters.startDate,
                    releaseDate: parameters.releaseDate,
                    project: parameters.project,
                    projectId: parameters.projectId,
                    moveUnfixedIssuesTo: parameters.moveUnfixedIssuesTo,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.projectVersions.updateVersion' });
        });
    }
    deleteVersion(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/version/${parameters.id}`,
                method: 'DELETE',
                params: {
                    moveFixIssuesTo: parameters.moveFixIssuesTo,
                    moveAffectedIssuesTo: parameters.moveAffectedIssuesTo,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.projectVersions.deleteVersion' });
        });
    }
    mergeVersions(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/version/${parameters.id}/mergeto/${parameters.moveIssuesTo}`,
                method: 'PUT',
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.projectVersions.mergeVersions' });
        });
    }
    moveVersion(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/version/${parameters.id}/move`,
                method: 'POST',
                data: {
                    after: parameters.after,
                    position: parameters.position,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.projectVersions.moveVersion' });
        });
    }
    getVersionRelatedIssues(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/version/${parameters.id}/relatedIssueCounts`,
                method: 'GET',
            };
            return this.client.sendRequest(config, callback, {
                methodName: 'version2.projectVersions.getVersionRelatedIssues',
            });
        });
    }
    deleteAndReplaceVersion(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/version/${parameters.id}/removeAndSwap`,
                method: 'POST',
                data: {
                    moveFixIssuesTo: parameters.moveFixIssuesTo,
                    moveAffectedIssuesTo: parameters.moveAffectedIssuesTo,
                    customFieldReplacementList: parameters.customFieldReplacementList,
                },
            };
            return this.client.sendRequest(config, callback, {
                methodName: 'version2.projectVersions.deleteAndReplaceVersion',
            });
        });
    }
    getVersionUnresolvedIssues(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/version/${parameters.id}/unresolvedIssueCount`,
                method: 'GET',
            };
            return this.client.sendRequest(config, callback, {
                methodName: 'version2.projectVersions.getVersionUnresolvedIssues',
            });
        });
    }
}
exports.ProjectVersions = ProjectVersions;
//# sourceMappingURL=projectVersions.js.map