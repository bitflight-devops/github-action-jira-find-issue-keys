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
exports.TimeTracking = void 0;
class TimeTracking {
    constructor(client) {
        this.client = client;
    }
    getSelectedTimeTrackingImplementation(callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/2/configuration/timetracking',
                method: 'GET',
            };
            return this.client.sendRequest(config, callback, {
                methodName: 'version2.timeTracking.getSelectedTimeTrackingImplementation',
            });
        });
    }
    selectTimeTrackingImplementation(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/2/configuration/timetracking',
                method: 'PUT',
                data: {
                    key: parameters === null || parameters === void 0 ? void 0 : parameters.key,
                    name: parameters === null || parameters === void 0 ? void 0 : parameters.name,
                    url: parameters === null || parameters === void 0 ? void 0 : parameters.url,
                },
            };
            return this.client.sendRequest(config, callback, {
                methodName: 'version2.timeTracking.selectTimeTrackingImplementation',
            });
        });
    }
    getAvailableTimeTrackingImplementations(callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/2/configuration/timetracking/list',
                method: 'GET',
            };
            return this.client.sendRequest(config, callback, {
                methodName: 'version2.timeTracking.getAvailableTimeTrackingImplementations',
            });
        });
    }
    getSharedTimeTrackingConfiguration(callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/2/configuration/timetracking/options',
                method: 'GET',
            };
            return this.client.sendRequest(config, callback, {
                methodName: 'version2.timeTracking.getSharedTimeTrackingConfiguration',
            });
        });
    }
    setSharedTimeTrackingConfiguration(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/2/configuration/timetracking/options',
                method: 'PUT',
                data: {
                    workingHoursPerDay: parameters === null || parameters === void 0 ? void 0 : parameters.workingHoursPerDay,
                    workingDaysPerWeek: parameters === null || parameters === void 0 ? void 0 : parameters.workingDaysPerWeek,
                    timeFormat: parameters === null || parameters === void 0 ? void 0 : parameters.timeFormat,
                    defaultUnit: parameters === null || parameters === void 0 ? void 0 : parameters.defaultUnit,
                },
            };
            return this.client.sendRequest(config, callback, {
                methodName: 'version2.timeTracking.setSharedTimeTrackingConfiguration',
            });
        });
    }
}
exports.TimeTracking = TimeTracking;
//# sourceMappingURL=timeTracking.js.map