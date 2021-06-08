"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignRefs = exports.getPreviousReleaseRef = exports.issueIdRegEx = void 0;
exports.issueIdRegEx = /([a-zA-Z0-9]+-[0-9]+)/g;
async function getPreviousReleaseRef(octo, _context) {
    if (!_context.repo || !octo) {
        return null;
    }
    const releases = await octo.rest.repos.getLatestRelease({
        ..._context.repo
    });
    const { tag_name } = releases.data;
    return tag_name;
}
exports.getPreviousReleaseRef = getPreviousReleaseRef;
function assignRefs(_context, _argv, octokit) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    let headRef, baseRef;
    if (_context.eventName === 'pull_request' && _context.payload.pull_request) {
        headRef = (_a = headRef !== null && headRef !== void 0 ? headRef : _context.payload.pull_request.head.ref) !== null && _a !== void 0 ? _a : null;
        baseRef = (_c = baseRef !== null && baseRef !== void 0 ? baseRef : (_b = _context.payload) === null || _b === void 0 ? void 0 : _b.pull_request.base.ref) !== null && _c !== void 0 ? _c : null;
    }
    else if (_context.eventName === 'push') {
        if (_context.payload.ref.startsWith('refs/tags')) {
            baseRef = baseRef !== null && baseRef !== void 0 ? baseRef : getPreviousReleaseRef(octokit, _context);
        }
        headRef = (_d = headRef !== null && headRef !== void 0 ? headRef : _context.payload.ref) !== null && _d !== void 0 ? _d : null;
    }
    headRef = (_f = (_e = _argv.headRef) !== null && _e !== void 0 ? _e : headRef) !== null && _f !== void 0 ? _f : null;
    baseRef = (_h = (_g = _argv.baseRef) !== null && _g !== void 0 ? _g : baseRef) !== null && _h !== void 0 ? _h : null;
    return { headRef, baseRef };
}
exports.assignRefs = assignRefs;
//# sourceMappingURL=utils.js.map