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
exports.Issue = void 0;
class Issue {
    constructor(client) {
        this.client = client;
    }
    rankIssues(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/agile/1.0/issue/rank',
                method: 'PUT',
                data: {
                    issues: parameters === null || parameters === void 0 ? void 0 : parameters.issues,
                    rankBeforeIssue: parameters === null || parameters === void 0 ? void 0 : parameters.rankBeforeIssue,
                    rankAfterIssue: parameters === null || parameters === void 0 ? void 0 : parameters.rankAfterIssue,
                    rankCustomFieldId: parameters === null || parameters === void 0 ? void 0 : parameters.rankCustomFieldId,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'agile.issue.rankIssues' });
        });
    }
    getIssue(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/agile/1.0/issue/${parameters.issueIdOrKey}`,
                method: 'GET',
                params: {
                    fields: parameters.fields,
                    expand: parameters.expand,
                    updateHistory: parameters.updateHistory,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'agile.issue.getIssue' });
        });
    }
    getIssueEstimationForBoard(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/agile/1.0/issue/${parameters.issueIdOrKey}/estimation`,
                method: 'GET',
                params: {
                    boardId: parameters.boardId,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'agile.issue.getIssueEstimationForBoard' });
        });
    }
    estimateIssueForBoard(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/agile/1.0/issue/${parameters.issueIdOrKey}/estimation`,
                method: 'PUT',
                params: {
                    boardId: parameters.boardId,
                },
                data: {
                    value: parameters.value,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'agile.issue.estimateIssueForBoard' });
        });
    }
}
exports.Issue = Issue;
//# sourceMappingURL=issue.js.map