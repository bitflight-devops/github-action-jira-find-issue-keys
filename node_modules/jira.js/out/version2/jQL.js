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
exports.JQL = void 0;
class JQL {
    constructor(client) {
        this.client = client;
    }
    getAutoComplete(callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/2/jql/autocompletedata',
                method: 'GET',
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.jQL.getAutoComplete' });
        });
    }
    getAutoCompletePost(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/2/jql/autocompletedata',
                method: 'POST',
                data: {
                    projectIds: parameters === null || parameters === void 0 ? void 0 : parameters.projectIds,
                    includeCollapsedFields: parameters === null || parameters === void 0 ? void 0 : parameters.includeCollapsedFields,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.jQL.getAutoCompletePost' });
        });
    }
    getFieldAutoCompleteForQueryString(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/2/jql/autocompletedata/suggestions',
                method: 'GET',
                params: {
                    fieldName: parameters === null || parameters === void 0 ? void 0 : parameters.fieldName,
                    fieldValue: parameters === null || parameters === void 0 ? void 0 : parameters.fieldValue,
                    predicateName: parameters === null || parameters === void 0 ? void 0 : parameters.predicateName,
                    predicateValue: parameters === null || parameters === void 0 ? void 0 : parameters.predicateValue,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.jQL.getFieldAutoCompleteForQueryString' });
        });
    }
    parseJqlQueries(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/2/jql/parse',
                method: 'POST',
                params: {
                    validation: parameters === null || parameters === void 0 ? void 0 : parameters.validation,
                },
                data: {
                    queries: parameters === null || parameters === void 0 ? void 0 : parameters.queries,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.jQL.parseJqlQueries' });
        });
    }
    migrateQueries(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/2/jql/pdcleaner',
                method: 'POST',
                data: {
                    queryStrings: parameters === null || parameters === void 0 ? void 0 : parameters.queryStrings,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.jQL.migrateQueries' });
        });
    }
}
exports.JQL = JQL;
//# sourceMappingURL=jQL.js.map