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
exports.JiraSettings = void 0;
class JiraSettings {
    constructor(client) {
        this.client = client;
    }
    getApplicationProperty(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/3/application-properties',
                method: 'GET',
                params: {
                    key: parameters === null || parameters === void 0 ? void 0 : parameters.key,
                    permissionLevel: parameters === null || parameters === void 0 ? void 0 : parameters.permissionLevel,
                    keyFilter: parameters === null || parameters === void 0 ? void 0 : parameters.keyFilter,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.jiraSettings.getApplicationProperty' });
        });
    }
    getAdvancedSettings(callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/3/application-properties/advanced-settings',
                method: 'GET',
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.jiraSettings.getAdvancedSettings' });
        });
    }
    setApplicationProperty(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/3/application-properties/${parameters.id}`,
                method: 'PUT',
                data: parameters.body,
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.jiraSettings.setApplicationProperty' });
        });
    }
    getConfiguration(callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/3/configuration',
                method: 'GET',
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.jiraSettings.getConfiguration' });
        });
    }
}
exports.JiraSettings = JiraSettings;
//# sourceMappingURL=jiraSettings.js.map