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
exports.JiraExpressions = void 0;
class JiraExpressions {
    constructor(client) {
        this.client = client;
    }
    analyseExpression(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/3/expression/analyse',
                method: 'POST',
                params: {
                    check: parameters === null || parameters === void 0 ? void 0 : parameters.check,
                },
                data: {
                    expressions: parameters === null || parameters === void 0 ? void 0 : parameters.expressions,
                    contextVariables: parameters === null || parameters === void 0 ? void 0 : parameters.contextVariables,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.jiraExpressions.analyseExpression' });
        });
    }
    evaluateJiraExpression(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: '/rest/api/3/expression/eval',
                method: 'POST',
                params: {
                    expand: parameters === null || parameters === void 0 ? void 0 : parameters.expand,
                },
                data: {
                    expression: parameters === null || parameters === void 0 ? void 0 : parameters.expression,
                    context: parameters === null || parameters === void 0 ? void 0 : parameters.context,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.jiraExpressions.evaluateJiraExpression' });
        });
    }
}
exports.JiraExpressions = JiraExpressions;
//# sourceMappingURL=jiraExpressions.js.map