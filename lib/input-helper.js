"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInputs = void 0;
const tslib_1 = require("tslib");
const core = tslib_1.__importStar(require("@actions/core"));
const path = tslib_1.__importStar(require("path"));
const fsHelper = tslib_1.__importStar(require("./fs-helper"));
function getInputs() {
    var _a, _b, _c, _d, _e, _f, _g;
    const obj = {};
    const result = obj;
    const jiraConfig = obj;
    jiraConfig.baseUrl = (_b = (_a = process.env.JIRA_BASE_URL) !== null && _a !== void 0 ? _a : core.getInput('jira_base_url')) !== null && _b !== void 0 ? _b : null;
    if (!jiraConfig.baseUrl) {
        throw new Error('JIRA_BASE_URL env not defined, or supplied as action input jira_base_url');
    }
    jiraConfig.token = (_d = (_c = process.env.JIRA_API_TOKEN) !== null && _c !== void 0 ? _c : core.getInput('jira_api_token')) !== null && _d !== void 0 ? _d : null;
    if (!jiraConfig.token) {
        throw new Error('JIRA_API_TOKEN env not defined, or supplied as action input jira_api_token');
    }
    jiraConfig.email = (_f = (_e = process.env.JIRA_USER_EMAIL) !== null && _e !== void 0 ? _e : core.getInput('jira_user_email')) !== null && _f !== void 0 ? _f : null;
    if (!jiraConfig.email) {
        throw new Error('JIRA_USER_EMAIL env not defined, or supplied as action input jira_user_email');
    }
    result.config = jiraConfig;
    result.token = (_g = core.getInput('token')) !== null && _g !== void 0 ? _g : process.env.GITHUB_TOKEN;
    result.string = core.getInput('string');
    result.baseRef = core.getInput('base_ref');
    result.headRef = core.getInput('head_ref');
    result.projects = core.getInput('projects');
    result.projectsIgnore = core.getInput('projects_ignore');
    result.includeMergeMessages = core.getBooleanInput('include_merge_messages');
    result.failOnError = core.getInput('fail_on_error') === 'true';
    let githubWorkspacePath = process.env.GITHUB_WORKSPACE;
    if (!githubWorkspacePath) {
        throw new Error('GITHUB_WORKSPACE not defined');
    }
    githubWorkspacePath = path.resolve(githubWorkspacePath);
    core.debug(`GITHUB_WORKSPACE = '${githubWorkspacePath}'`);
    fsHelper.directoryExistsSync(githubWorkspacePath, true);
    return result;
}
exports.getInputs = getInputs;
//# sourceMappingURL=input-helper.js.map