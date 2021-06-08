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
exports.Filters = void 0;
class Filters {
    constructor(client) {
        this.client = client;
    }
    getFilters(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/2/filter',
                method: 'GET',
                params: {
                    expand: parameters === null || parameters === void 0 ? void 0 : parameters.expand,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.filters.getFilters' });
        });
    }
    createFilter(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/2/filter',
                method: 'POST',
                params: {
                    expand: parameters === null || parameters === void 0 ? void 0 : parameters.expand,
                },
                data: {
                    self: parameters === null || parameters === void 0 ? void 0 : parameters.self,
                    id: parameters === null || parameters === void 0 ? void 0 : parameters.id,
                    name: parameters === null || parameters === void 0 ? void 0 : parameters.name,
                    description: parameters === null || parameters === void 0 ? void 0 : parameters.description,
                    owner: parameters === null || parameters === void 0 ? void 0 : parameters.owner,
                    jql: parameters === null || parameters === void 0 ? void 0 : parameters.jql,
                    viewUrl: parameters === null || parameters === void 0 ? void 0 : parameters.viewUrl,
                    searchUrl: parameters === null || parameters === void 0 ? void 0 : parameters.searchUrl,
                    favourite: parameters === null || parameters === void 0 ? void 0 : parameters.favourite,
                    favouritedCount: parameters === null || parameters === void 0 ? void 0 : parameters.favouritedCount,
                    sharePermissions: parameters === null || parameters === void 0 ? void 0 : parameters.sharePermissions,
                    sharedUsers: parameters === null || parameters === void 0 ? void 0 : parameters.sharedUsers,
                    subscriptions: parameters === null || parameters === void 0 ? void 0 : parameters.subscriptions,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.filters.createFilter' });
        });
    }
    getFavouriteFilters(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/2/filter/favourite',
                method: 'GET',
                params: {
                    expand: parameters === null || parameters === void 0 ? void 0 : parameters.expand,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.filters.getFavouriteFilters' });
        });
    }
    getMyFilters(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/2/filter/my',
                method: 'GET',
                params: {
                    expand: parameters === null || parameters === void 0 ? void 0 : parameters.expand,
                    includeFavourites: parameters === null || parameters === void 0 ? void 0 : parameters.includeFavourites,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.filters.getMyFilters' });
        });
    }
    getFiltersPaginated(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/2/filter/search',
                method: 'GET',
                params: {
                    filterName: parameters === null || parameters === void 0 ? void 0 : parameters.filterName,
                    accountId: parameters === null || parameters === void 0 ? void 0 : parameters.accountId,
                    owner: parameters === null || parameters === void 0 ? void 0 : parameters.owner,
                    groupname: parameters === null || parameters === void 0 ? void 0 : parameters.groupname,
                    projectId: parameters === null || parameters === void 0 ? void 0 : parameters.projectId,
                    id: parameters === null || parameters === void 0 ? void 0 : parameters.id,
                    orderBy: parameters === null || parameters === void 0 ? void 0 : parameters.orderBy,
                    startAt: parameters === null || parameters === void 0 ? void 0 : parameters.startAt,
                    maxResults: parameters === null || parameters === void 0 ? void 0 : parameters.maxResults,
                    expand: parameters === null || parameters === void 0 ? void 0 : parameters.expand,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.filters.getFiltersPaginated' });
        });
    }
    getFilter(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/filter/${parameters.id}`,
                method: 'GET',
                params: {
                    expand: parameters.expand,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.filters.getFilter' });
        });
    }
    updateFilter(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/filter/${parameters.id}`,
                method: 'PUT',
                params: {
                    expand: parameters.expand,
                },
                data: {
                    name: parameters.name,
                    description: parameters.description,
                    jql: parameters.jql,
                    favourite: parameters.favourite,
                    sharePermissions: parameters.sharePermissions,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.filters.updateFilter' });
        });
    }
    deleteFilter(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/filter/${parameters.id}`,
                method: 'DELETE',
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.filters.deleteFilter' });
        });
    }
    getColumns(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/filter/${parameters.id}/columns`,
                method: 'GET',
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.filters.getColumns' });
        });
    }
    setColumns(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/filter/${parameters.id}/columns`,
                method: 'PUT',
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.filters.setColumns' });
        });
    }
    resetColumns(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/filter/${parameters.id}/columns`,
                method: 'DELETE',
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.filters.resetColumns' });
        });
    }
    setFavouriteForFilter(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/filter/${parameters.id}/favourite`,
                method: 'PUT',
                params: {
                    expand: parameters.expand,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.filters.setFavouriteForFilter' });
        });
    }
    deleteFavouriteForFilter(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/filter/${parameters.id}/favourite`,
                method: 'DELETE',
                params: {
                    expand: parameters.expand,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.filters.deleteFavouriteForFilter' });
        });
    }
}
exports.Filters = Filters;
//# sourceMappingURL=filters.js.map