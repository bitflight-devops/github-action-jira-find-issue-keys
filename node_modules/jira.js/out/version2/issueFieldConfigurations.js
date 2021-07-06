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
exports.IssueFieldConfigurations = void 0;
class IssueFieldConfigurations {
    constructor(client) {
        this.client = client;
    }
    getAllFieldConfigurations(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/2/fieldconfiguration',
                method: 'GET',
                params: {
                    startAt: parameters === null || parameters === void 0 ? void 0 : parameters.startAt,
                    maxResults: parameters === null || parameters === void 0 ? void 0 : parameters.maxResults,
                    id: parameters === null || parameters === void 0 ? void 0 : parameters.id,
                    isDefault: parameters === null || parameters === void 0 ? void 0 : parameters.isDefault,
                    query: parameters === null || parameters === void 0 ? void 0 : parameters.query,
                },
            };
            return this.client.sendRequest(config, callback, {
                methodName: 'version2.issueFieldConfigurations.getAllFieldConfigurations',
            });
        });
    }
    getFieldConfigurationItems(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/fieldconfiguration/${parameters.id}/fields`,
                method: 'GET',
                params: {
                    startAt: parameters.startAt,
                    maxResults: parameters.maxResults,
                },
            };
            return this.client.sendRequest(config, callback, {
                methodName: 'version2.issueFieldConfigurations.getFieldConfigurationItems',
            });
        });
    }
    getAllFieldConfigurationSchemes(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/2/fieldconfigurationscheme',
                method: 'GET',
                params: {
                    startAt: parameters === null || parameters === void 0 ? void 0 : parameters.startAt,
                    maxResults: parameters === null || parameters === void 0 ? void 0 : parameters.maxResults,
                    id: parameters === null || parameters === void 0 ? void 0 : parameters.id,
                },
            };
            return this.client.sendRequest(config, callback, {
                methodName: 'version2.issueFieldConfigurations.getAllFieldConfigurationSchemes',
            });
        });
    }
    getFieldConfigurationSchemeMappings(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/2/fieldconfigurationscheme/mapping',
                method: 'GET',
                params: {
                    startAt: parameters === null || parameters === void 0 ? void 0 : parameters.startAt,
                    maxResults: parameters === null || parameters === void 0 ? void 0 : parameters.maxResults,
                    fieldConfigurationSchemeId: parameters === null || parameters === void 0 ? void 0 : parameters.fieldConfigurationSchemeId,
                },
            };
            return this.client.sendRequest(config, callback, {
                methodName: 'version2.issueFieldConfigurations.getFieldConfigurationSchemeMappings',
            });
        });
    }
    getFieldConfigurationSchemeProjectMapping(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/2/fieldconfigurationscheme/project',
                method: 'GET',
                params: {
                    startAt: parameters.startAt,
                    maxResults: parameters.maxResults,
                    projectId: parameters.projectId,
                },
            };
            return this.client.sendRequest(config, callback, {
                methodName: 'version2.issueFieldConfigurations.getFieldConfigurationSchemeProjectMapping',
            });
        });
    }
    assignFieldConfigurationSchemeToProject(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/2/fieldconfigurationscheme/project',
                method: 'PUT',
                data: {
                    fieldConfigurationSchemeId: parameters === null || parameters === void 0 ? void 0 : parameters.fieldConfigurationSchemeId,
                    projectId: parameters === null || parameters === void 0 ? void 0 : parameters.projectId,
                },
            };
            return this.client.sendRequest(config, callback, {
                methodName: 'version2.issueFieldConfigurations.assignFieldConfigurationSchemeToProject',
            });
        });
    }
}
exports.IssueFieldConfigurations = IssueFieldConfigurations;
//# sourceMappingURL=issueFieldConfigurations.js.map