"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core = tslib_1.__importStar(require("@actions/core"));
const github = tslib_1.__importStar(require("@actions/github"));
const action_1 = require("./action");
const input_helper_1 = require("./input-helper");
async function exec() {
    await new action_1.Action(github.context, input_helper_1.getInputs()).execute();
}
exec().catch(error => {
    core.setFailed(error);
});
//# sourceMappingURL=index.js.map