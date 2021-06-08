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
exports.DynamicModules = void 0;
class DynamicModules {
    constructor(client) {
        this.client = client;
    }
    getModules(callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/atlassian-connect/1/app/module/dynamic',
                method: 'GET',
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.dynamicModules.getModules' });
        });
    }
    registerModules(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/atlassian-connect/1/app/module/dynamic',
                method: 'POST',
                data: {
                    modules: parameters === null || parameters === void 0 ? void 0 : parameters.modules,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.dynamicModules.registerModules' });
        });
    }
    removeModules(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/atlassian-connect/1/app/module/dynamic',
                method: 'DELETE',
                params: {
                    moduleKey: parameters === null || parameters === void 0 ? void 0 : parameters.moduleKey,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.dynamicModules.removeModules' });
        });
    }
}
exports.DynamicModules = DynamicModules;
//# sourceMappingURL=dynamicModules.js.map