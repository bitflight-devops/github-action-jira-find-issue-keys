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
exports.Webhooks = void 0;
class Webhooks {
    constructor(client) {
        this.client = client;
    }
    getDynamicWebhooksForApp(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/3/webhook',
                method: 'GET',
                params: {
                    startAt: parameters === null || parameters === void 0 ? void 0 : parameters.startAt,
                    maxResults: parameters === null || parameters === void 0 ? void 0 : parameters.maxResults,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.webhooks.getDynamicWebhooksForApp' });
        });
    }
    registerDynamicWebhooks(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/3/webhook',
                method: 'POST',
                data: {
                    webhooks: parameters === null || parameters === void 0 ? void 0 : parameters.webhooks,
                    url: parameters === null || parameters === void 0 ? void 0 : parameters.url,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.webhooks.registerDynamicWebhooks' });
        });
    }
    deleteWebhookById(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/3/webhook',
                method: 'DELETE',
                data: {
                    webhookIds: parameters === null || parameters === void 0 ? void 0 : parameters.webhookIds,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.webhooks.deleteWebhookById' });
        });
    }
    getFailedWebhooks(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/3/webhook/failed',
                method: 'GET',
                params: {
                    maxResults: parameters === null || parameters === void 0 ? void 0 : parameters.maxResults,
                    after: parameters === null || parameters === void 0 ? void 0 : parameters.after,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.webhooks.getFailedWebhooks' });
        });
    }
    refreshWebhooks(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/3/webhook/refresh',
                method: 'PUT',
                data: {
                    webhookIds: parameters === null || parameters === void 0 ? void 0 : parameters.webhookIds,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.webhooks.refreshWebhooks' });
        });
    }
}
exports.Webhooks = Webhooks;
//# sourceMappingURL=webhooks.js.map