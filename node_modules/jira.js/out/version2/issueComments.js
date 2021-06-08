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
exports.IssueComments = void 0;
class IssueComments {
    constructor(client) {
        this.client = client;
    }
    getCommentsByIds(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/2/comment/list',
                method: 'POST',
                params: {
                    expand: parameters === null || parameters === void 0 ? void 0 : parameters.expand,
                },
                data: {
                    ids: parameters === null || parameters === void 0 ? void 0 : parameters.ids,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.issueComments.getCommentsByIds' });
        });
    }
    getComments(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/issue/${parameters.issueIdOrKey}/comment`,
                method: 'GET',
                params: {
                    startAt: parameters.startAt,
                    maxResults: parameters.maxResults,
                    orderBy: parameters.orderBy,
                    expand: parameters.expand,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.issueComments.getComments' });
        });
    }
    addComment(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/issue/${parameters.issueIdOrKey}/comment`,
                method: 'POST',
                params: {
                    expand: parameters.expand,
                },
                data: {
                    self: parameters.self,
                    id: parameters.id,
                    author: parameters.author,
                    body: parameters.body,
                    renderedBody: parameters.renderedBody,
                    updateAuthor: parameters.updateAuthor,
                    created: parameters.created,
                    updated: parameters.updated,
                    visibility: parameters.visibility,
                    jsdPublic: parameters.jsdPublic,
                    properties: parameters.properties,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.issueComments.addComment' });
        });
    }
    getComment(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/issue/${parameters.issueIdOrKey}/comment/${parameters.id}`,
                method: 'GET',
                params: {
                    expand: parameters.expand,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.issueComments.getComment' });
        });
    }
    updateComment(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/issue/${parameters.issueIdOrKey}/comment/${parameters.id}`,
                method: 'PUT',
                params: {
                    expand: parameters.expand,
                },
                data: parameters.body,
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.issueComments.updateComment' });
        });
    }
    deleteComment(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/issue/${parameters.issueIdOrKey}/comment/${parameters.id}`,
                method: 'DELETE',
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.issueComments.deleteComment' });
        });
    }
}
exports.IssueComments = IssueComments;
//# sourceMappingURL=issueComments.js.map