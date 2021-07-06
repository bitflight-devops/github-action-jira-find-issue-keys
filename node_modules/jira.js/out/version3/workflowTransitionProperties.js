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
exports.WorkflowTransitionProperties = void 0;
class WorkflowTransitionProperties {
    constructor(client) {
        this.client = client;
    }
    getWorkflowTransitionProperties(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/3/workflow/transitions/${parameters.transitionId}/properties`,
                method: 'GET',
                params: {
                    includeReservedKeys: parameters.includeReservedKeys,
                    key: parameters.key,
                    workflowName: parameters.workflowName,
                    workflowMode: parameters.workflowMode,
                },
            };
            return this.client.sendRequest(config, callback, {
                methodName: 'version3.workflowTransitionProperties.getWorkflowTransitionProperties',
            });
        });
    }
    createWorkflowTransitionProperty(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/3/workflow/transitions/${parameters.transitionId}/properties`,
                method: 'POST',
                params: {
                    key: parameters.key,
                    workflowName: parameters.workflowName,
                    workflowMode: parameters.workflowMode,
                },
                data: Object.assign(Object.assign({}, parameters), { transitionId: undefined, key: undefined, workflowName: undefined, workflowMode: undefined }),
            };
            return this.client.sendRequest(config, callback, {
                methodName: 'version3.workflowTransitionProperties.createWorkflowTransitionProperty',
            });
        });
    }
    updateWorkflowTransitionProperty(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/3/workflow/transitions/${parameters.transitionId}/properties`,
                method: 'PUT',
                params: {
                    key: parameters.key,
                    workflowName: parameters.workflowName,
                    workflowMode: parameters.workflowMode,
                },
                data: Object.assign(Object.assign({}, parameters), { transitionId: undefined, key: undefined, workflowName: undefined, workflowMode: undefined }),
            };
            return this.client.sendRequest(config, callback, {
                methodName: 'version3.workflowTransitionProperties.updateWorkflowTransitionProperty',
            });
        });
    }
    deleteWorkflowTransitionProperty(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/3/workflow/transitions/${parameters.transitionId}/properties`,
                method: 'DELETE',
                params: {
                    key: parameters.key,
                    workflowName: parameters.workflowName,
                    workflowMode: parameters.workflowMode,
                },
            };
            return this.client.sendRequest(config, callback, {
                methodName: 'version3.workflowTransitionProperties.deleteWorkflowTransitionProperty',
            });
        });
    }
}
exports.WorkflowTransitionProperties = WorkflowTransitionProperties;
//# sourceMappingURL=workflowTransitionProperties.js.map