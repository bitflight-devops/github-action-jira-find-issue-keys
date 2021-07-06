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
exports.IssueWorklogs = void 0;
class IssueWorklogs {
    constructor(client) {
        this.client = client;
    }
    getIssueWorklog(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/issue/${parameters.issueIdOrKey}/worklog`,
                method: 'GET',
                params: {
                    startAt: parameters.startAt,
                    maxResults: parameters.maxResults,
                    startedAfter: parameters.startedAfter,
                    expand: parameters.expand,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.issueWorklogs.getIssueWorklog' });
        });
    }
    addWorklog(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/issue/${parameters.issueIdOrKey}/worklog`,
                method: 'POST',
                params: {
                    notifyUsers: parameters.notifyUsers,
                    adjustEstimate: parameters.adjustEstimate,
                    newEstimate: parameters.newEstimate,
                    reduceBy: parameters.reduceBy,
                    expand: parameters.expand,
                    overrideEditableFlag: parameters.overrideEditableFlag,
                },
                data: {
                    self: parameters.self,
                    author: parameters.author,
                    updateAuthor: parameters.updateAuthor,
                    comment: parameters.comment,
                    created: parameters.created,
                    updated: parameters.updated,
                    visibility: parameters.visibility,
                    started: parameters.started,
                    timeSpent: parameters.timeSpent,
                    timeSpentSeconds: parameters.timeSpentSeconds,
                    id: parameters.id,
                    issueId: parameters.issueId,
                    properties: parameters.properties,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.issueWorklogs.addWorklog' });
        });
    }
    getWorklog(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/issue/${parameters.issueIdOrKey}/worklog/${parameters.id}`,
                method: 'GET',
                params: {
                    expand: parameters.expand,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.issueWorklogs.getWorklog' });
        });
    }
    updateWorklog(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/issue/${parameters.issueIdOrKey}/worklog/${parameters.id}`,
                method: 'PUT',
                params: {
                    notifyUsers: parameters.notifyUsers,
                    adjustEstimate: parameters.adjustEstimate,
                    newEstimate: parameters.newEstimate,
                    expand: parameters.expand,
                    overrideEditableFlag: parameters.overrideEditableFlag,
                },
                data: {
                    comment: parameters.comment,
                    visibility: parameters.visibility,
                    started: parameters.started,
                    timeSpent: parameters.timeSpent,
                    timeSpentSeconds: parameters.timeSpentSeconds,
                    properties: parameters.properties,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.issueWorklogs.updateWorklog' });
        });
    }
    deleteWorklog(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/issue/${parameters.issueIdOrKey}/worklog/${parameters.id}`,
                method: 'DELETE',
                params: {
                    notifyUsers: parameters.notifyUsers,
                    adjustEstimate: parameters.adjustEstimate,
                    newEstimate: parameters.newEstimate,
                    increaseBy: parameters.increaseBy,
                    overrideEditableFlag: parameters.overrideEditableFlag,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.issueWorklogs.deleteWorklog' });
        });
    }
    getIdsOfWorklogsDeletedSince(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/2/worklog/deleted',
                method: 'GET',
                params: {
                    since: parameters === null || parameters === void 0 ? void 0 : parameters.since,
                },
            };
            return this.client.sendRequest(config, callback, {
                methodName: 'version2.issueWorklogs.getIdsOfWorklogsDeletedSince',
            });
        });
    }
    getWorklogsForIds(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/2/worklog/list',
                method: 'POST',
                params: {
                    expand: parameters === null || parameters === void 0 ? void 0 : parameters.expand,
                },
                data: {
                    ids: parameters === null || parameters === void 0 ? void 0 : parameters.ids,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.issueWorklogs.getWorklogsForIds' });
        });
    }
    getIdsOfWorklogsModifiedSince(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/2/worklog/updated',
                method: 'GET',
                params: {
                    since: parameters === null || parameters === void 0 ? void 0 : parameters.since,
                    expand: parameters === null || parameters === void 0 ? void 0 : parameters.expand,
                },
            };
            return this.client.sendRequest(config, callback, {
                methodName: 'version2.issueWorklogs.getIdsOfWorklogsModifiedSince',
            });
        });
    }
}
exports.IssueWorklogs = IssueWorklogs;
//# sourceMappingURL=issueWorklogs.js.map