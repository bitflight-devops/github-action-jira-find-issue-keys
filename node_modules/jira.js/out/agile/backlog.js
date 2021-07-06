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
exports.Backlog = void 0;
class Backlog {
    constructor(client) {
        this.client = client;
    }
    moveIssuesToBacklog(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/agile/1.0/backlog/issue',
                method: 'POST',
                data: {
                    issues: parameters === null || parameters === void 0 ? void 0 : parameters.issues,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'agile.backlog.moveIssuesToBacklog' });
        });
    }
    moveIssuesToBacklogForBoard(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/agile/1.0/backlog/${parameters.boardId}/issue`,
                method: 'POST',
                data: {
                    issues: parameters.issues,
                    rankBeforeIssue: parameters.rankBeforeIssue,
                    rankAfterIssue: parameters.rankAfterIssue,
                    rankCustomFieldId: parameters.rankCustomFieldId,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'agile.backlog.moveIssuesToBacklogForBoard' });
        });
    }
}
exports.Backlog = Backlog;
//# sourceMappingURL=backlog.js.map