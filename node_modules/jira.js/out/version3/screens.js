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
exports.Screens = void 0;
class Screens {
    constructor(client) {
        this.client = client;
    }
    getScreensForField(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/3/field/${parameters.fieldId}/screens`,
                method: 'GET',
                params: {
                    startAt: parameters.startAt,
                    maxResults: parameters.maxResults,
                    expand: parameters.expand,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.screens.getScreensForField' });
        });
    }
    getScreens(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/3/screens',
                method: 'GET',
                params: {
                    startAt: parameters === null || parameters === void 0 ? void 0 : parameters.startAt,
                    maxResults: parameters === null || parameters === void 0 ? void 0 : parameters.maxResults,
                    id: parameters === null || parameters === void 0 ? void 0 : parameters.id,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.screens.getScreens' });
        });
    }
    createScreen(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/3/screens',
                method: 'POST',
                data: {
                    name: parameters === null || parameters === void 0 ? void 0 : parameters.name,
                    description: parameters === null || parameters === void 0 ? void 0 : parameters.description,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.screens.createScreen' });
        });
    }
    addFieldToDefaultScreen(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/3/screens/addToDefault/${parameters.fieldId}`,
                method: 'POST',
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.screens.addFieldToDefaultScreen' });
        });
    }
    updateScreen(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/3/screens/${parameters.screenId}`,
                method: 'PUT',
                data: {
                    name: parameters.name,
                    description: parameters.description,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.screens.updateScreen' });
        });
    }
    deleteScreen(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/3/screens/${parameters.screenId}`,
                method: 'DELETE',
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.screens.deleteScreen' });
        });
    }
    getAvailableScreenFields(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/3/screens/${parameters.screenId}/availableFields`,
                method: 'GET',
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.screens.getAvailableScreenFields' });
        });
    }
}
exports.Screens = Screens;
//# sourceMappingURL=screens.js.map