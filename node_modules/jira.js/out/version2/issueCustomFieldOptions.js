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
exports.IssueCustomFieldOptions = void 0;
class IssueCustomFieldOptions {
    constructor(client) {
        this.client = client;
    }
    getOptionsForField(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/customField/${parameters.fieldId}/option`,
                method: 'GET',
                params: {
                    startAt: parameters.startAt,
                    maxResults: parameters.maxResults,
                },
            };
            return this.client.sendRequest(config, callback, {
                methodName: 'version2.issueCustomFieldOptions.getOptionsForField',
            });
        });
    }
    createCustomFieldOptions(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/customField/${parameters.fieldId}/option`,
                method: 'POST',
                data: {
                    options: parameters.options,
                },
            };
            return this.client.sendRequest(config, callback, {
                methodName: 'version2.issueCustomFieldOptions.createCustomFieldOptions',
            });
        });
    }
    updateCustomFieldOptions(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/customField/${parameters.fieldId}/option`,
                method: 'PUT',
                data: {
                    options: parameters.options,
                },
            };
            return this.client.sendRequest(config, callback, {
                methodName: 'version2.issueCustomFieldOptions.updateCustomFieldOptions',
            });
        });
    }
    getCustomFieldOption(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/customFieldOption/${parameters.id}`,
                method: 'GET',
            };
            return this.client.sendRequest(config, callback, {
                methodName: 'version2.issueCustomFieldOptions.getCustomFieldOption',
            });
        });
    }
    getOptionsForContext(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/field/${parameters.fieldId}/context/${parameters.contextId}/option`,
                method: 'GET',
                params: {
                    optionId: parameters.optionId,
                    onlyOptions: parameters.onlyOptions,
                    startAt: parameters.startAt,
                    maxResults: parameters.maxResults,
                },
            };
            return this.client.sendRequest(config, callback, {
                methodName: 'version2.issueCustomFieldOptions.getOptionsForContext',
            });
        });
    }
    createCustomFieldOption(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/field/${parameters.fieldId}/context/${parameters.contextId}/option`,
                method: 'POST',
                data: {
                    options: parameters.options,
                },
            };
            return this.client.sendRequest(config, callback, {
                methodName: 'version2.issueCustomFieldOptions.createCustomFieldOption',
            });
        });
    }
    updateCustomFieldOption(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/field/${parameters.fieldId}/context/${parameters.contextId}/option`,
                method: 'PUT',
                data: {
                    options: parameters.options,
                },
            };
            return this.client.sendRequest(config, callback, {
                methodName: 'version2.issueCustomFieldOptions.updateCustomFieldOption',
            });
        });
    }
    reorderCustomFieldOptions(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/field/${parameters.fieldId}/context/${parameters.contextId}/option/move`,
                method: 'PUT',
                data: {
                    customFieldOptionIds: parameters.customFieldOptionIds,
                    after: parameters.after,
                    position: parameters.position,
                },
            };
            return this.client.sendRequest(config, callback, {
                methodName: 'version2.issueCustomFieldOptions.reorderCustomFieldOptions',
            });
        });
    }
    deleteCustomFieldOption(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/field/${parameters.fieldId}/context/${parameters.contextId}/option/${parameters.optionId}`,
                method: 'DELETE',
            };
            return this.client.sendRequest(config, callback, {
                methodName: 'version2.issueCustomFieldOptions.deleteCustomFieldOption',
            });
        });
    }
}
exports.IssueCustomFieldOptions = IssueCustomFieldOptions;
//# sourceMappingURL=issueCustomFieldOptions.js.map