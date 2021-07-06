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
exports.Dashboards = void 0;
class Dashboards {
    constructor(client) {
        this.client = client;
    }
    getAllDashboards(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/2/dashboard',
                method: 'GET',
                params: {
                    filter: parameters === null || parameters === void 0 ? void 0 : parameters.filter,
                    startAt: parameters === null || parameters === void 0 ? void 0 : parameters.startAt,
                    maxResults: parameters === null || parameters === void 0 ? void 0 : parameters.maxResults,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.dashboards.getAllDashboards' });
        });
    }
    createDashboard(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/2/dashboard',
                method: 'POST',
                data: {
                    name: parameters === null || parameters === void 0 ? void 0 : parameters.name,
                    description: parameters === null || parameters === void 0 ? void 0 : parameters.description,
                    sharePermissions: parameters === null || parameters === void 0 ? void 0 : parameters.sharePermissions,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.dashboards.createDashboard' });
        });
    }
    getDashboardsPaginated(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/2/dashboard/search',
                method: 'GET',
                params: {
                    dashboardName: parameters === null || parameters === void 0 ? void 0 : parameters.dashboardName,
                    accountId: parameters === null || parameters === void 0 ? void 0 : parameters.accountId,
                    owner: parameters === null || parameters === void 0 ? void 0 : parameters.owner,
                    groupname: parameters === null || parameters === void 0 ? void 0 : parameters.groupname,
                    projectId: parameters === null || parameters === void 0 ? void 0 : parameters.projectId,
                    orderBy: parameters === null || parameters === void 0 ? void 0 : parameters.orderBy,
                    startAt: parameters === null || parameters === void 0 ? void 0 : parameters.startAt,
                    maxResults: parameters === null || parameters === void 0 ? void 0 : parameters.maxResults,
                    expand: parameters === null || parameters === void 0 ? void 0 : parameters.expand,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.dashboards.getDashboardsPaginated' });
        });
    }
    getDashboardItemPropertyKeys(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/dashboard/${parameters.dashboardId}/items/${parameters.itemId}/properties`,
                method: 'GET',
            };
            return this.client.sendRequest(config, callback, {
                methodName: 'version2.dashboards.getDashboardItemPropertyKeys',
            });
        });
    }
    getDashboardItemProperty(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/dashboard/${parameters.dashboardId}/items/${parameters.itemId}/properties/${parameters.propertyKey}`,
                method: 'GET',
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.dashboards.getDashboardItemProperty' });
        });
    }
    setDashboardItemProperty(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/dashboard/${parameters.dashboardId}/items/${parameters.itemId}/properties/${parameters.propertyKey}`,
                method: 'PUT',
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.dashboards.setDashboardItemProperty' });
        });
    }
    deleteDashboardItemProperty(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/dashboard/${parameters.dashboardId}/items/${parameters.itemId}/properties/${parameters.propertyKey}`,
                method: 'DELETE',
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.dashboards.deleteDashboardItemProperty' });
        });
    }
    getDashboard(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/dashboard/${parameters.id}`,
                method: 'GET',
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.dashboards.getDashboard' });
        });
    }
    updateDashboard(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/dashboard/${parameters.id}`,
                method: 'PUT',
                data: {
                    name: parameters.name,
                    description: parameters.description,
                    sharePermissions: parameters.sharePermissions,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.dashboards.updateDashboard' });
        });
    }
    deleteDashboard(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/dashboard/${parameters.id}`,
                method: 'DELETE',
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.dashboards.deleteDashboard' });
        });
    }
    copyDashboard(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/2/dashboard/${parameters.id}/copy`,
                method: 'POST',
                data: {
                    name: parameters.name,
                    description: parameters.description,
                    sharePermissions: parameters.sharePermissions,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version2.dashboards.copyDashboard' });
        });
    }
}
exports.Dashboards = Dashboards;
//# sourceMappingURL=dashboards.js.map