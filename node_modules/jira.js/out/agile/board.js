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
exports.Board = void 0;
class Board {
    constructor(client) {
        this.client = client;
    }
    getAllBoards(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/agile/1.0/board',
                method: 'GET',
                params: {
                    startAt: parameters === null || parameters === void 0 ? void 0 : parameters.startAt,
                    maxResults: parameters === null || parameters === void 0 ? void 0 : parameters.maxResults,
                    type: parameters === null || parameters === void 0 ? void 0 : parameters.type,
                    name: parameters === null || parameters === void 0 ? void 0 : parameters.name,
                    projectKeyOrId: parameters === null || parameters === void 0 ? void 0 : parameters.projectKeyOrId,
                    accountIdLocation: parameters === null || parameters === void 0 ? void 0 : parameters.accountIdLocation,
                    projectLocation: parameters === null || parameters === void 0 ? void 0 : parameters.projectLocation,
                    includePrivate: parameters === null || parameters === void 0 ? void 0 : parameters.includePrivate,
                    negateLocationFiltering: parameters === null || parameters === void 0 ? void 0 : parameters.negateLocationFiltering,
                    orderBy: parameters === null || parameters === void 0 ? void 0 : parameters.orderBy,
                    expand: parameters === null || parameters === void 0 ? void 0 : parameters.expand,
                    filterId: parameters === null || parameters === void 0 ? void 0 : parameters.filterId,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'agile.board.getAllBoards' });
        });
    }
    createBoard(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/agile/1.0/board',
                method: 'POST',
                data: {
                    name: parameters === null || parameters === void 0 ? void 0 : parameters.name,
                    type: parameters === null || parameters === void 0 ? void 0 : parameters.type,
                    filterId: parameters === null || parameters === void 0 ? void 0 : parameters.filterId,
                    location: parameters === null || parameters === void 0 ? void 0 : parameters.location,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'agile.board.createBoard' });
        });
    }
    getBoardByFilterId(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/agile/1.0/board/filter/${parameters.filterId}`,
                method: 'GET',
                params: {
                    startAt: parameters.startAt,
                    maxResults: parameters.maxResults,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'agile.board.getBoardByFilterId' });
        });
    }
    getBoard(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/agile/1.0/board/${parameters.boardId}`,
                method: 'GET',
            };
            return this.client.sendRequest(config, callback, { methodName: 'agile.board.getBoard' });
        });
    }
    deleteBoard(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/agile/1.0/board/${parameters.boardId}`,
                method: 'DELETE',
            };
            return this.client.sendRequest(config, callback, { methodName: 'agile.board.deleteBoard' });
        });
    }
    getIssuesForBacklog(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/agile/1.0/board/${parameters.boardId}/backlog`,
                method: 'GET',
                params: {
                    startAt: parameters.startAt,
                    maxResults: parameters.maxResults,
                    jql: parameters.jql,
                    validateQuery: parameters.validateQuery,
                    fields: parameters.fields,
                    expand: parameters.expand,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'agile.board.getIssuesForBacklog' });
        });
    }
    getConfiguration(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/agile/1.0/board/${parameters.boardId}/configuration`,
                method: 'GET',
            };
            return this.client.sendRequest(config, callback, { methodName: 'agile.board.getConfiguration' });
        });
    }
    getEpics(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/agile/1.0/board/${parameters.boardId}/epic`,
                method: 'GET',
                params: {
                    startAt: parameters.startAt,
                    maxResults: parameters.maxResults,
                    done: parameters.done,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'agile.board.getEpics' });
        });
    }
    getIssuesWithoutEpicForBoard(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/agile/1.0/board/${parameters.boardId}/epic/none/issue`,
                method: 'GET',
                params: {
                    startAt: parameters.startAt,
                    maxResults: parameters.maxResults,
                    jql: parameters.jql,
                    validateQuery: parameters.validateQuery,
                    fields: parameters.fields,
                    expand: parameters.expand,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'agile.board.getIssuesWithoutEpicForBoard' });
        });
    }
    getBoardIssuesForEpic(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/agile/1.0/board/${parameters.boardId}/epic/${parameters.epicId}/issue`,
                method: 'GET',
                params: {
                    startAt: parameters.startAt,
                    maxResults: parameters.maxResults,
                    jql: parameters.jql,
                    validateQuery: parameters.validateQuery,
                    fields: parameters.fields,
                    expand: parameters.expand,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'agile.board.getBoardIssuesForEpic' });
        });
    }
    getFeaturesForBoard(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/agile/1.0/board/${parameters.boardId}/features`,
                method: 'GET',
            };
            return this.client.sendRequest(config, callback, { methodName: 'agile.board.getFeaturesForBoard' });
        });
    }
    toggleFeatures(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/agile/1.0/board/${parameters.boardId}/features`,
                method: 'PUT',
                data: parameters.body,
            };
            return this.client.sendRequest(config, callback, { methodName: 'agile.board.toggleFeatures' });
        });
    }
    getIssuesForBoard(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/agile/1.0/board/${parameters.boardId}/issue`,
                method: 'GET',
                params: {
                    startAt: parameters.startAt,
                    maxResults: parameters.maxResults,
                    jql: parameters.jql,
                    validateQuery: parameters.validateQuery,
                    fields: parameters.fields,
                    expand: parameters.expand,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'agile.board.getIssuesForBoard' });
        });
    }
    moveIssuesToBoard(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/agile/1.0/board/${parameters.boardId}/issue`,
                method: 'POST',
                data: {
                    issues: parameters.issues,
                    rankBeforeIssue: parameters.rankBeforeIssue,
                    rankAfterIssue: parameters.rankAfterIssue,
                    rankCustomFieldId: parameters.rankCustomFieldId,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'agile.board.moveIssuesToBoard' });
        });
    }
    getProjects(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/agile/1.0/board/${parameters.boardId}/project`,
                method: 'GET',
                params: {
                    startAt: parameters.startAt,
                    maxResults: parameters.maxResults,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'agile.board.getProjects' });
        });
    }
    getProjectsFull(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/agile/1.0/board/${parameters.boardId}/project/full`,
                method: 'GET',
            };
            return this.client.sendRequest(config, callback, { methodName: 'agile.board.getProjectsFull' });
        });
    }
    getBoardPropertyKeys(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/agile/1.0/board/${parameters.boardId}/properties`,
                method: 'GET',
            };
            return this.client.sendRequest(config, callback, { methodName: 'agile.board.getBoardPropertyKeys' });
        });
    }
    getBoardProperty(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/agile/1.0/board/${parameters.boardId}/properties/${parameters.propertyKey}`,
                method: 'GET',
            };
            return this.client.sendRequest(config, callback, { methodName: 'agile.board.getBoardProperty' });
        });
    }
    setBoardProperty(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/agile/1.0/board/${parameters.boardId}/properties/${parameters.propertyKey}`,
                method: 'PUT',
            };
            return this.client.sendRequest(config, callback, { methodName: 'agile.board.setBoardProperty' });
        });
    }
    deleteBoardProperty(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/agile/1.0/board/${parameters.boardId}/properties/${parameters.propertyKey}`,
                method: 'DELETE',
            };
            return this.client.sendRequest(config, callback, { methodName: 'agile.board.deleteBoardProperty' });
        });
    }
    getAllQuickFilters(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/agile/1.0/board/${parameters.boardId}/quickfilter`,
                method: 'GET',
                params: {
                    startAt: parameters.startAt,
                    maxResults: parameters.maxResults,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'agile.board.getAllQuickFilters' });
        });
    }
    getQuickFilter(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/agile/1.0/board/${parameters.boardId}/quickfilter/${parameters.quickFilterId}`,
                method: 'GET',
            };
            return this.client.sendRequest(config, callback, { methodName: 'agile.board.getQuickFilter' });
        });
    }
    getReportsForBoard(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/agile/1.0/board/${parameters.boardId}/reports`,
                method: 'GET',
            };
            return this.client.sendRequest(config, callback, { methodName: 'agile.board.getReportsForBoard' });
        });
    }
    getAllSprints(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/agile/1.0/board/${parameters.boardId}/sprint`,
                method: 'GET',
                params: {
                    startAt: parameters.startAt,
                    maxResults: parameters.maxResults,
                    state: parameters.state,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'agile.board.getAllSprints' });
        });
    }
    getBoardIssuesForSprint(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/agile/1.0/board/${parameters.boardId}/sprint/${parameters.sprintId}/issue`,
                method: 'GET',
                params: {
                    startAt: parameters.startAt,
                    maxResults: parameters.maxResults,
                    jql: parameters.jql,
                    validateQuery: parameters.validateQuery,
                    fields: parameters.fields,
                    expand: parameters.expand,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'agile.board.getBoardIssuesForSprint' });
        });
    }
    getAllVersions(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/agile/1.0/board/${parameters.boardId}/version`,
                method: 'GET',
                params: {
                    startAt: parameters.startAt,
                    maxResults: parameters.maxResults,
                    released: parameters.released,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'agile.board.getAllVersions' });
        });
    }
}
exports.Board = Board;
//# sourceMappingURL=board.js.map