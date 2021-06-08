"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jira_js_1 = require("jira.js");
class Jira {
    constructor(conf) {
        this.baseUrl = conf.baseUrl;
        this.token = conf.token;
        this.email = conf.email;
        this.client = new jira_js_1.Version2Client({
            host: this.baseUrl,
            telemetry: false,
            authentication: {
                basic: {
                    email: this.email,
                    apiToken: this.token
                }
            }
        });
    }
    async getIssue(issueId, query) {
        var _a, _b;
        const params = {
            issueIdOrKey: issueId
        };
        if (query != null) {
            params.fields = (_a = query.fields) !== null && _a !== void 0 ? _a : [];
            params.expand = (_b = query.expand) !== null && _b !== void 0 ? _b : undefined;
        }
        return await this.client.issues.getIssue(params);
    }
    async getIssueTransitions(issueId) {
        const params = {
            issueIdOrKey: issueId
        };
        return await this.client.issues.getTransitions(params);
    }
    async transitionIssue(issueId, data) {
        const params = {
            issueIdOrKey: issueId,
            transition: data
        };
        return await this.client.issues.doTransition(params);
    }
}
exports.default = Jira;
//# sourceMappingURL=Jira.js.map