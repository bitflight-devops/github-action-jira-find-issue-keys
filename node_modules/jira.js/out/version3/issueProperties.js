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
exports.IssueProperties = void 0;
class IssueProperties {
    constructor(client) {
        this.client = client;
    }
    bulkSetIssuesProperties(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/3/issue/properties',
                method: 'POST',
                data: {
                    entitiesIds: parameters === null || parameters === void 0 ? void 0 : parameters.entitiesIds,
                    properties: parameters === null || parameters === void 0 ? void 0 : parameters.properties,
                },
            };
            return this.client.sendRequest(config, callback, {
                methodName: 'version3.issueProperties.bulkSetIssuesProperties',
            });
        });
    }
    bulkSetIssueProperty(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/3/issue/properties/${parameters.propertyKey}`,
                method: 'PUT',
                data: {
                    value: parameters.value,
                    expression: parameters.expression,
                    filter: parameters.filter,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.issueProperties.bulkSetIssueProperty' });
        });
    }
    bulkDeleteIssueProperty(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/3/issue/properties/${parameters.propertyKey}`,
                method: 'DELETE',
                data: {
                    entityIds: parameters.entityIds,
                    currentValue: parameters.currentValue,
                },
            };
            return this.client.sendRequest(config, callback, {
                methodName: 'version3.issueProperties.bulkDeleteIssueProperty',
            });
        });
    }
    getIssuePropertyKeys(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/3/issue/${parameters.issueIdOrKey}/properties`,
                method: 'GET',
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.issueProperties.getIssuePropertyKeys' });
        });
    }
    getIssueProperty(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/3/issue/${parameters.issueIdOrKey}/properties/${parameters.propertyKey}`,
                method: 'GET',
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.issueProperties.getIssueProperty' });
        });
    }
    setIssueProperty(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/3/issue/${parameters.issueIdOrKey}/properties/${parameters.propertyKey}`,
                method: 'PUT',
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.issueProperties.setIssueProperty' });
        });
    }
    deleteIssueProperty(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/3/issue/${parameters.issueIdOrKey}/properties/${parameters.propertyKey}`,
                method: 'DELETE',
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.issueProperties.deleteIssueProperty' });
        });
    }
}
exports.IssueProperties = IssueProperties;
//# sourceMappingURL=issueProperties.js.map