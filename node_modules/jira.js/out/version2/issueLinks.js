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
exports.IssueLinks = void 0;
class IssueLinks {
    constructor(client) {
        this.client = client;
    }
    linkIssues(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/2/issueLink',
                method: 'POST',
                data: {
                    type: parameters === null || parameters === void 0 ? void 0 : parameters.type,
                    inwardIssue: parameters === null || parameters === void 0 ? void 0 : parameters.inwardIssue,
                    outwardIssue: parameters === null || parameters === void 0 ? void 0 : parameters.outwardIssue,
                    comment: parameters === null || parameters === void 0 ? void 0 : parameters.comment,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.issueLinks.linkIssues' });
        });
    }
    getIssueLink(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/issueLink/${parameters.linkId}`,
                method: 'GET',
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.issueLinks.getIssueLink' });
        });
    }
    deleteIssueLink(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/issueLink/${parameters.linkId}`,
                method: 'DELETE',
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.issueLinks.deleteIssueLink' });
        });
    }
}
exports.IssueLinks = IssueLinks;
//# sourceMappingURL=issueLinks.js.map