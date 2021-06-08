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
exports.AppProperties = void 0;
class AppProperties {
    constructor(client) {
        this.client = client;
    }
    getAddonProperties(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/atlassian-connect/1/addons/${parameters.addonKey}/properties`,
                method: 'GET',
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.appProperties.getAddonProperties' });
        });
    }
    getAddonProperty(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/atlassian-connect/1/addons/${parameters.addonKey}/properties/${parameters.propertyKey}`,
                method: 'GET',
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.appProperties.getAddonProperty' });
        });
    }
    putAddonProperty(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/atlassian-connect/1/addons/${parameters.addonKey}/properties/${parameters.propertyKey}`,
                method: 'PUT',
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.appProperties.putAddonProperty' });
        });
    }
    deleteAddonProperty(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/atlassian-connect/1/addons/${parameters.addonKey}/properties/${parameters.propertyKey}`,
                method: 'DELETE',
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.appProperties.deleteAddonProperty' });
        });
    }
}
exports.AppProperties = AppProperties;
//# sourceMappingURL=appProperties.js.map