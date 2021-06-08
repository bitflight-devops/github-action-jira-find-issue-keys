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
exports.ScreenSchemes = void 0;
class ScreenSchemes {
    constructor(client) {
        this.client = client;
    }
    getScreenSchemes(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/2/screenscheme',
                method: 'GET',
                params: {
                    startAt: parameters === null || parameters === void 0 ? void 0 : parameters.startAt,
                    maxResults: parameters === null || parameters === void 0 ? void 0 : parameters.maxResults,
                    id: parameters === null || parameters === void 0 ? void 0 : parameters.id,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.screenSchemes.getScreenSchemes' });
        });
    }
    createScreenScheme(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/2/screenscheme',
                method: 'POST',
                data: {
                    name: parameters === null || parameters === void 0 ? void 0 : parameters.name,
                    description: parameters === null || parameters === void 0 ? void 0 : parameters.description,
                    screens: parameters === null || parameters === void 0 ? void 0 : parameters.screens,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.screenSchemes.createScreenScheme' });
        });
    }
    updateScreenScheme(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/screenscheme/${parameters.screenSchemeId}`,
                method: 'PUT',
                data: {
                    name: parameters.name,
                    description: parameters.description,
                    screens: parameters.screens,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.screenSchemes.updateScreenScheme' });
        });
    }
    deleteScreenScheme(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/screenscheme/${parameters.screenSchemeId}`,
                method: 'DELETE',
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.screenSchemes.deleteScreenScheme' });
        });
    }
}
exports.ScreenSchemes = ScreenSchemes;
//# sourceMappingURL=screenSchemes.js.map