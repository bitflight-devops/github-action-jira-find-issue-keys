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
exports.WorkflowTransitionRules = void 0;
class WorkflowTransitionRules {
    constructor(client) {
        this.client = client;
    }
    getWorkflowTransitionRuleConfigurations(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/3/workflow/rule/config',
                method: 'GET',
                params: {
                    startAt: parameters.startAt,
                    maxResults: parameters.maxResults,
                    types: parameters.types,
                    keys: parameters.keys,
                    expand: parameters.expand,
                },
            };
            return this.client.sendRequest(config, callback, {
                methodName: 'version3.workflowTransitionRules.getWorkflowTransitionRuleConfigurations',
            });
        });
    }
    updateWorkflowTransitionRuleConfigurations(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/3/workflow/rule/config',
                method: 'PUT',
                data: {
                    workflows: parameters === null || parameters === void 0 ? void 0 : parameters.workflows,
                },
            };
            return this.client.sendRequest(config, callback, {
                methodName: 'version3.workflowTransitionRules.updateWorkflowTransitionRuleConfigurations',
            });
        });
    }
    deleteWorkflowTransitionRuleConfigurations(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/3/workflow/rule/config/delete',
                method: 'PUT',
                data: {
                    workflows: parameters === null || parameters === void 0 ? void 0 : parameters.workflows,
                },
            };
            return this.client.sendRequest(config, callback, {
                methodName: 'version3.workflowTransitionRules.deleteWorkflowTransitionRuleConfigurations',
            });
        });
    }
}
exports.WorkflowTransitionRules = WorkflowTransitionRules;
//# sourceMappingURL=workflowTransitionRules.js.map