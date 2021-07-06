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
exports.IssueSecurityLevel = void 0;
class IssueSecurityLevel {
    constructor(client) {
        this.client = client;
    }
    getIssueSecurityLevelMembers(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/issuesecurityschemes/${parameters.issueSecuritySchemeId}/members`,
                method: 'GET',
                params: {
                    startAt: parameters.startAt,
                    maxResults: parameters.maxResults,
                    issueSecurityLevelId: parameters.issueSecurityLevelId,
                    expand: parameters.expand,
                },
            };
            return this.client.sendRequest(config, callback, {
                methodName: 'version2.issueSecurityLevel.getIssueSecurityLevelMembers',
            });
        });
    }
    getIssueSecurityLevel(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/securitylevel/${parameters.id}`,
                method: 'GET',
            };
            return this.client.sendRequest(config, callback, {
                methodName: 'version2.issueSecurityLevel.getIssueSecurityLevel',
            });
        });
    }
}
exports.IssueSecurityLevel = IssueSecurityLevel;
//# sourceMappingURL=issueSecurityLevel.js.map