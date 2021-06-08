"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core = tslib_1.__importStar(require("@actions/core"));
const fs = tslib_1.__importStar(require("fs"));
const action_1 = require("./action");
const input_helper_1 = require("./input-helper");
const githubEventPath = process.env.GITHUB_EVENT_PATH;
const githubEvent = JSON.parse(fs.readFileSync(githubEventPath, 'utf8'));
async function exec() {
    await new action_1.Action(githubEvent, input_helper_1.getInputs()).execute();
}
exec().catch(error => {
    core.setFailed(error);
});
//# sourceMappingURL=index.js.map