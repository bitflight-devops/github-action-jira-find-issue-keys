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
exports.IssueLinkTypes = void 0;
class IssueLinkTypes {
    constructor(client) {
        this.client = client;
    }
    getIssueLinkTypes(callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/3/issueLinkType',
                method: 'GET',
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.issueLinkTypes.getIssueLinkTypes' });
        });
    }
    createIssueLinkType(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/3/issueLinkType',
                method: 'POST',
                data: {
                    id: parameters === null || parameters === void 0 ? void 0 : parameters.id,
                    name: parameters === null || parameters === void 0 ? void 0 : parameters.name,
                    inward: parameters === null || parameters === void 0 ? void 0 : parameters.inward,
                    outward: parameters === null || parameters === void 0 ? void 0 : parameters.outward,
                    self: parameters === null || parameters === void 0 ? void 0 : parameters.self,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.issueLinkTypes.createIssueLinkType' });
        });
    }
    getIssueLinkType(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/3/issueLinkType/${parameters.issueLinkTypeId}`,
                method: 'GET',
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.issueLinkTypes.getIssueLinkType' });
        });
    }
    updateIssueLinkType(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/3/issueLinkType/${parameters.issueLinkTypeId}`,
                method: 'PUT',
                data: {
                    id: parameters.id,
                    name: parameters.name,
                    inward: parameters.inward,
                    outward: parameters.outward,
                    self: parameters.self,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.issueLinkTypes.updateIssueLinkType' });
        });
    }
    deleteIssueLinkType(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/3/issueLinkType/${parameters.issueLinkTypeId}`,
                method: 'DELETE',
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.issueLinkTypes.deleteIssueLinkType' });
        });
    }
}
exports.IssueLinkTypes = IssueLinkTypes;
//# sourceMappingURL=issueLinkTypes.js.map