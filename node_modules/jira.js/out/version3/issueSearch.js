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
exports.IssueSearch = void 0;
class IssueSearch {
    constructor(client) {
        this.client = client;
    }
    getIssuePickerResource(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/3/issue/picker',
                method: 'GET',
                params: {
                    query: parameters === null || parameters === void 0 ? void 0 : parameters.query,
                    currentJQL: parameters === null || parameters === void 0 ? void 0 : parameters.currentJQL,
                    currentIssueKey: parameters === null || parameters === void 0 ? void 0 : parameters.currentIssueKey,
                    currentProjectId: parameters === null || parameters === void 0 ? void 0 : parameters.currentProjectId,
                    showSubTasks: parameters === null || parameters === void 0 ? void 0 : parameters.showSubTasks,
                    showSubTaskParent: parameters === null || parameters === void 0 ? void 0 : parameters.showSubTaskParent,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.issueSearch.getIssuePickerResource' });
        });
    }
    matchIssues(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/3/jql/match',
                method: 'POST',
                data: {
                    jqls: parameters === null || parameters === void 0 ? void 0 : parameters.jqls,
                    issueIds: parameters === null || parameters === void 0 ? void 0 : parameters.issueIds,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.issueSearch.matchIssues' });
        });
    }
    searchForIssuesUsingJql(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/3/search',
                method: 'GET',
                params: {
                    jql: parameters === null || parameters === void 0 ? void 0 : parameters.jql,
                    startAt: parameters === null || parameters === void 0 ? void 0 : parameters.startAt,
                    maxResults: parameters === null || parameters === void 0 ? void 0 : parameters.maxResults,
                    validateQuery: parameters === null || parameters === void 0 ? void 0 : parameters.validateQuery,
                    fields: parameters === null || parameters === void 0 ? void 0 : parameters.fields,
                    expand: parameters === null || parameters === void 0 ? void 0 : parameters.expand,
                    properties: parameters === null || parameters === void 0 ? void 0 : parameters.properties,
                    fieldsByKeys: parameters === null || parameters === void 0 ? void 0 : parameters.fieldsByKeys,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.issueSearch.searchForIssuesUsingJql' });
        });
    }
    searchForIssuesUsingJqlPost(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/3/search',
                method: 'POST',
                data: {
                    jql: parameters === null || parameters === void 0 ? void 0 : parameters.jql,
                    startAt: parameters === null || parameters === void 0 ? void 0 : parameters.startAt,
                    maxResults: parameters === null || parameters === void 0 ? void 0 : parameters.maxResults,
                    fields: parameters === null || parameters === void 0 ? void 0 : parameters.fields,
                    validateQuery: parameters === null || parameters === void 0 ? void 0 : parameters.validateQuery,
                    expand: parameters === null || parameters === void 0 ? void 0 : parameters.expand,
                    properties: parameters === null || parameters === void 0 ? void 0 : parameters.properties,
                    fieldsByKeys: parameters === null || parameters === void 0 ? void 0 : parameters.fieldsByKeys,
                },
            };
            return this.client.sendRequest(config, callback, {
                methodName: 'version3.issueSearch.searchForIssuesUsingJqlPost',
            });
        });
    }
}
exports.IssueSearch = IssueSearch;
//# sourceMappingURL=issueSearch.js.map