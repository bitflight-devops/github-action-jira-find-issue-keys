"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Action = void 0;
const tslib_1 = require("tslib");
const core = tslib_1.__importStar(require("@actions/core"));
const EventManager_1 = tslib_1.__importDefault(require("./EventManager"));
const Jira_1 = tslib_1.__importDefault(require("./Jira"));
class Action {
    constructor(context, argv) {
        this.jira = new Jira_1.default({
            baseUrl: argv.config.baseUrl,
            token: argv.config.token,
            email: argv.config.email
        });
        this.config = argv.config;
        this.argv = argv;
        this.context = context;
        this.eventManager = new EventManager_1.default(context, this.jira, argv);
    }
    async execute() {
        try {
            await this.eventManager.getJiraKeysFromGitRange();
            return true;
        }
        catch (error) {
            core.error(error.data);
            throw error;
        }
    }
}
exports.Action = Action;
//# sourceMappingURL=action.js.map