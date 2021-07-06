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
exports.Builds = void 0;
class Builds {
    constructor(client) {
        this.client = client;
    }
    submitBuilds(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/builds/0.1/bulk',
                method: 'POST',
                data: {
                    properties: parameters === null || parameters === void 0 ? void 0 : parameters.properties,
                    builds: parameters === null || parameters === void 0 ? void 0 : parameters.builds,
                    providerMetadata: parameters === null || parameters === void 0 ? void 0 : parameters.providerMetadata,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'agile.builds.submitBuilds' });
        });
    }
    deleteBuildsByProperty(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/builds/0.1/bulkByProperties',
                method: 'DELETE',
                params: {
                    _updateSequenceNumber: (parameters === null || parameters === void 0 ? void 0 : parameters._updateSequenceNumber) || (parameters === null || parameters === void 0 ? void 0 : parameters.updateSequenceNumber),
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'agile.builds.deleteBuildsByProperty' });
        });
    }
    getBuildByKey(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/builds/0.1/pipelines/${parameters.pipelineId}/builds/${parameters.buildNumber}`,
                method: 'GET',
            };
            return this.client.sendRequest(config, callback, { methodName: 'agile.builds.getBuildByKey' });
        });
    }
    deleteBuildByKey(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/builds/0.1/pipelines/${parameters.pipelineId}/builds/${parameters.buildNumber}`,
                method: 'DELETE',
                params: {
                    _updateSequenceNumber: parameters._updateSequenceNumber || parameters.updateSequenceNumber,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'agile.builds.deleteBuildByKey' });
        });
    }
}
exports.Builds = Builds;
//# sourceMappingURL=builds.js.map