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
exports.Epic = void 0;
class Epic {
    constructor(client) {
        this.client = client;
    }
    getIssuesWithoutEpic(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/agile/1.0/epic/none/issue',
                method: 'GET',
                params: {
                    startAt: parameters === null || parameters === void 0 ? void 0 : parameters.startAt,
                    maxResults: parameters === null || parameters === void 0 ? void 0 : parameters.maxResults,
                    jql: parameters === null || parameters === void 0 ? void 0 : parameters.jql,
                    validateQuery: parameters === null || parameters === void 0 ? void 0 : parameters.validateQuery,
                    fields: parameters === null || parameters === void 0 ? void 0 : parameters.fields,
                    expand: parameters === null || parameters === void 0 ? void 0 : parameters.expand,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'agile.epic.getIssuesWithoutEpic' });
        });
    }
    removeIssuesFromEpic(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/agile/1.0/epic/none/issue',
                method: 'POST',
                data: {
                    issues: parameters === null || parameters === void 0 ? void 0 : parameters.issues,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'agile.epic.removeIssuesFromEpic' });
        });
    }
    searchEpics(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/agile/1.0/epic/search',
                method: 'GET',
                params: {
                    maxResults: parameters === null || parameters === void 0 ? void 0 : parameters.maxResults,
                    excludeDone: parameters === null || parameters === void 0 ? void 0 : parameters.excludeDone,
                    query: parameters === null || parameters === void 0 ? void 0 : parameters.query,
                    projectKey: parameters === null || parameters === void 0 ? void 0 : parameters.projectKey,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'agile.epic.searchEpics' });
        });
    }
    getEpic(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/agile/1.0/epic/${parameters.epicIdOrKey}`,
                method: 'GET',
            };
            return this.client.sendRequest(config, callback, { methodName: 'agile.epic.getEpic' });
        });
    }
    partiallyUpdateEpic(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/agile/1.0/epic/${parameters.epicIdOrKey}`,
                method: 'POST',
                data: {
                    name: parameters.name,
                    summary: parameters.summary,
                    color: parameters.color,
                    done: parameters.done,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'agile.epic.partiallyUpdateEpic' });
        });
    }
    getIssuesForEpic(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/agile/1.0/epic/${parameters.epicIdOrKey}/issue`,
                method: 'GET',
                params: {
                    startAt: parameters.startAt,
                    maxResults: parameters.maxResults,
                    jql: parameters.jql,
                    validateQuery: parameters.validateQuery,
                    fields: parameters.fields,
                    expand: parameters.expand,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'agile.epic.getIssuesForEpic' });
        });
    }
    moveIssuesToEpic(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/agile/1.0/epic/${parameters.epicIdOrKey}/issue`,
                method: 'POST',
                data: {
                    issues: parameters.issues,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'agile.epic.moveIssuesToEpic' });
        });
    }
    rankEpics(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/agile/1.0/epic/${parameters.epicIdOrKey}/rank`,
                method: 'PUT',
                data: {
                    rankBeforeEpic: parameters.rankBeforeEpic,
                    rankAfterEpic: parameters.rankAfterEpic,
                    rankCustomFieldId: parameters.rankCustomFieldId,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'agile.epic.rankEpics' });
        });
    }
}
exports.Epic = Epic;
//# sourceMappingURL=epic.js.map