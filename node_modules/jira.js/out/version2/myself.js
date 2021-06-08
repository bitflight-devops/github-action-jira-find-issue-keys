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
exports.Myself = void 0;
class Myself {
    constructor(client) {
        this.client = client;
    }
    getPreference(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/2/mypreferences',
                method: 'GET',
                params: {
                    key: parameters.key,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.myself.getPreference' });
        });
    }
    setPreference(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/2/mypreferences',
                method: 'PUT',
                params: {
                    key: parameters.key,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.myself.setPreference' });
        });
    }
    removePreference(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/2/mypreferences',
                method: 'DELETE',
                params: {
                    key: parameters.key,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.myself.removePreference' });
        });
    }
    getLocale(callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/2/mypreferences/locale',
                method: 'GET',
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.myself.getLocale' });
        });
    }
    setLocale(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/2/mypreferences/locale',
                method: 'PUT',
                data: {
                    locale: parameters === null || parameters === void 0 ? void 0 : parameters.locale,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.myself.setLocale' });
        });
    }
    deleteLocale(callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/2/mypreferences/locale',
                method: 'DELETE',
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.myself.deleteLocale' });
        });
    }
    getCurrentUser(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/2/myself',
                method: 'GET',
                params: {
                    expand: parameters === null || parameters === void 0 ? void 0 : parameters.expand,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.myself.getCurrentUser' });
        });
    }
}
exports.Myself = Myself;
//# sourceMappingURL=myself.js.map