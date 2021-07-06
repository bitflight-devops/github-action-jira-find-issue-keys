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
exports.Sprint = void 0;
class Sprint {
    constructor(client) {
        this.client = client;
    }
    createSprint(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/agile/1.0/sprint',
                method: 'POST',
                data: {
                    name: parameters === null || parameters === void 0 ? void 0 : parameters.name,
                    startDate: parameters === null || parameters === void 0 ? void 0 : parameters.startDate,
                    endDate: parameters === null || parameters === void 0 ? void 0 : parameters.endDate,
                    originBoardId: parameters === null || parameters === void 0 ? void 0 : parameters.originBoardId,
                    goal: parameters === null || parameters === void 0 ? void 0 : parameters.goal,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'agile.sprint.createSprint' });
        });
    }
    getSprint(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/agile/1.0/sprint/${parameters.sprintId}`,
                method: 'GET',
            };
            return this.client.sendRequest(config, callback, { methodName: 'agile.sprint.getSprint' });
        });
    }
    partiallyUpdateSprint(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/agile/1.0/sprint/${parameters.sprintId}`,
                method: 'POST',
                data: {
                    id: parameters.id,
                    self: parameters.self,
                    state: parameters.state,
                    name: parameters.name,
                    startDate: parameters.startDate,
                    endDate: parameters.endDate,
                    completeDate: parameters.completeDate,
                    originBoardId: parameters.originBoardId,
                    goal: parameters.goal,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'agile.sprint.partiallyUpdateSprint' });
        });
    }
    updateSprint(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/agile/1.0/sprint/${parameters.sprintId}`,
                method: 'PUT',
                data: {
                    id: parameters.id,
                    self: parameters.self,
                    state: parameters.state,
                    name: parameters.name,
                    startDate: parameters.startDate,
                    endDate: parameters.endDate,
                    completeDate: parameters.completeDate,
                    originBoardId: parameters.originBoardId,
                    goal: parameters.goal,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'agile.sprint.updateSprint' });
        });
    }
    deleteSprint(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/agile/1.0/sprint/${parameters.sprintId}`,
                method: 'DELETE',
            };
            return this.client.sendRequest(config, callback, { methodName: 'agile.sprint.deleteSprint' });
        });
    }
    getIssuesForSprint(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/agile/1.0/sprint/${parameters.sprintId}/issue`,
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
            return this.client.sendRequest(config, callback, { methodName: 'agile.sprint.getIssuesForSprint' });
        });
    }
    moveIssuesToSprintAndRank(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/agile/1.0/sprint/${parameters.sprintId}/issue`,
                method: 'POST',
                data: {
                    issues: parameters.issues,
                    rankBeforeIssue: parameters.rankBeforeIssue,
                    rankAfterIssue: parameters.rankAfterIssue,
                    rankCustomFieldId: parameters.rankCustomFieldId,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'agile.sprint.moveIssuesToSprintAndRank' });
        });
    }
    getPropertiesKeys(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/agile/1.0/sprint/${parameters.sprintId}/properties`,
                method: 'GET',
            };
            return this.client.sendRequest(config, callback, { methodName: 'agile.sprint.getPropertiesKeys' });
        });
    }
    getProperty(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/agile/1.0/sprint/${parameters.sprintId}/properties/${parameters.propertyKey}`,
                method: 'GET',
            };
            return this.client.sendRequest(config, callback, { methodName: 'agile.sprint.getProperty' });
        });
    }
    setProperty(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/agile/1.0/sprint/${parameters.sprintId}/properties/${parameters.propertyKey}`,
                method: 'PUT',
            };
            return this.client.sendRequest(config, callback, { methodName: 'agile.sprint.setProperty' });
        });
    }
    deleteProperty(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/agile/1.0/sprint/${parameters.sprintId}/properties/${parameters.propertyKey}`,
                method: 'DELETE',
            };
            return this.client.sendRequest(config, callback, { methodName: 'agile.sprint.deleteProperty' });
        });
    }
    swapSprint(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/agile/1.0/sprint/${parameters.sprintId}/swap`,
                method: 'POST',
                data: {
                    sprintToSwapWith: parameters.sprintToSwapWith,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'agile.sprint.swapSprint' });
        });
    }
}
exports.Sprint = Sprint;
//# sourceMappingURL=sprint.js.map