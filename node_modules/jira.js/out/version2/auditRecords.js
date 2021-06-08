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
exports.AuditRecords = void 0;
class AuditRecords {
    constructor(client) {
        this.client = client;
    }
    getAuditRecords(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/2/auditing/record',
                method: 'GET',
                params: {
                    offset: parameters === null || parameters === void 0 ? void 0 : parameters.offset,
                    limit: parameters === null || parameters === void 0 ? void 0 : parameters.limit,
                    filter: parameters === null || parameters === void 0 ? void 0 : parameters.filter,
                    from: parameters === null || parameters === void 0 ? void 0 : parameters.from,
                    to: parameters === null || parameters === void 0 ? void 0 : parameters.to,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.auditRecords.getAuditRecords' });
        });
    }
}
exports.AuditRecords = AuditRecords;
//# sourceMappingURL=auditRecords.js.map