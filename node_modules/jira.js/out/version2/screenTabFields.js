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
exports.ScreenTabFields = void 0;
class ScreenTabFields {
    constructor(client) {
        this.client = client;
    }
    getAllScreenTabFields(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/screens/${parameters.screenId}/tabs/${parameters.tabId}/fields`,
                method: 'GET',
                params: {
                    projectKey: parameters.projectKey,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.screenTabFields.getAllScreenTabFields' });
        });
    }
    addScreenTabField(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/screens/${parameters.screenId}/tabs/${parameters.tabId}/fields`,
                method: 'POST',
                data: {
                    fieldId: parameters.fieldId,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.screenTabFields.addScreenTabField' });
        });
    }
    removeScreenTabField(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/screens/${parameters.screenId}/tabs/${parameters.tabId}/fields/${parameters.id}`,
                method: 'DELETE',
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.screenTabFields.removeScreenTabField' });
        });
    }
    moveScreenTabField(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/screens/${parameters.screenId}/tabs/${parameters.tabId}/fields/${parameters.id}/move`,
                method: 'POST',
                data: {
                    after: parameters.after,
                    position: parameters.position,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.screenTabFields.moveScreenTabField' });
        });
    }
}
exports.ScreenTabFields = ScreenTabFields;
//# sourceMappingURL=screenTabFields.js.map