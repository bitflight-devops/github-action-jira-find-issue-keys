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
exports.IssueCustomFieldOptionsApps = void 0;
class IssueCustomFieldOptionsApps {
    constructor(client) {
        this.client = client;
    }
    getAllIssueFieldOptions(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/3/field/${parameters.fieldKey}/option`,
                method: 'GET',
                params: {
                    startAt: parameters.startAt,
                    maxResults: parameters.maxResults,
                },
            };
            return this.client.sendRequest(config, callback, {
                methodName: 'version3.issueCustomFieldOptionsapps.getAllIssueFieldOptions',
            });
        });
    }
    createIssueFieldOption(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/3/field/${parameters.fieldKey}/option`,
                method: 'POST',
                data: {
                    value: parameters.value,
                    properties: parameters.properties,
                    config: parameters.config,
                },
            };
            return this.client.sendRequest(config, callback, {
                methodName: 'version3.issueCustomFieldOptionsapps.createIssueFieldOption',
            });
        });
    }
    getSelectableIssueFieldOptions(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/3/field/${parameters.fieldKey}/option/suggestions/edit`,
                method: 'GET',
                params: {
                    startAt: parameters.startAt,
                    maxResults: parameters.maxResults,
                    projectId: parameters.projectId,
                },
            };
            return this.client.sendRequest(config, callback, {
                methodName: 'version3.issueCustomFieldOptionsapps.getSelectableIssueFieldOptions',
            });
        });
    }
    getVisibleIssueFieldOptions(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/3/field/${parameters.fieldKey}/option/suggestions/search`,
                method: 'GET',
                params: {
                    startAt: parameters.startAt,
                    maxResults: parameters.maxResults,
                    projectId: parameters.projectId,
                },
            };
            return this.client.sendRequest(config, callback, {
                methodName: 'version3.issueCustomFieldOptionsapps.getVisibleIssueFieldOptions',
            });
        });
    }
    getIssueFieldOption(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/3/field/${parameters.fieldKey}/option/${parameters.optionId}`,
                method: 'GET',
            };
            return this.client.sendRequest(config, callback, {
                methodName: 'version3.issueCustomFieldOptionsapps.getIssueFieldOption',
            });
        });
    }
    updateIssueFieldOption(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/3/field/${parameters.fieldKey}/option/${parameters.optionId}`,
                method: 'PUT',
                data: {
                    id: parameters.id,
                    value: parameters.value,
                    properties: parameters.properties,
                    config: parameters.config,
                },
            };
            return this.client.sendRequest(config, callback, {
                methodName: 'version3.issueCustomFieldOptionsapps.updateIssueFieldOption',
            });
        });
    }
    deleteIssueFieldOption(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/3/field/${parameters.fieldKey}/option/${parameters.optionId}`,
                method: 'DELETE',
            };
            return this.client.sendRequest(config, callback, {
                methodName: 'version3.issueCustomFieldOptionsapps.deleteIssueFieldOption',
            });
        });
    }
    replaceIssueFieldOption(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/3/field/${parameters.fieldKey}/option/${parameters.optionId}/issue`,
                method: 'DELETE',
                params: {
                    replaceWith: parameters.replaceWith,
                    jql: parameters.jql,
                },
            };
            return this.client.sendRequest(config, callback, {
                methodName: 'version3.issueCustomFieldOptionsapps.replaceIssueFieldOption',
            });
        });
    }
}
exports.IssueCustomFieldOptionsApps = IssueCustomFieldOptionsApps;
//# sourceMappingURL=issueCustomFieldOptionsApps.js.map