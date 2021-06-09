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
        const params = {
            issueIdOrKey: issueId
        };
        if (query != null) {
            params.fields = query.fields || [];
            params.expand = query.expand || undefined;
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