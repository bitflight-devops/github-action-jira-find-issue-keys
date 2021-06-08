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
exports.IssueWatchers = void 0;
class IssueWatchers {
    constructor(client) {
        this.client = client;
    }
    getIssueWatchers(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/3/issue/${parameters.issueIdOrKey}/watchers`,
                method: 'GET',
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.issueWatchers.getIssueWatchers' });
        });
    }
    addWatcher(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/3/issue/${parameters.issueIdOrKey}/watchers`,
                method: 'POST',
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.issueWatchers.addWatcher' });
        });
    }
    removeWatcher(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/3/issue/${parameters.issueIdOrKey}/watchers`,
                method: 'DELETE',
                params: {
                    username: parameters.username,
                    accountId: parameters.accountId,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.issueWatchers.removeWatcher' });
        });
    }
}
exports.IssueWatchers = IssueWatchers;
//# sourceMappingURL=issueWatchers.js.map