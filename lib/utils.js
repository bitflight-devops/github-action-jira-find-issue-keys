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
    var _a, _b, _c, _d, _e, _f, _g;
    let headRef, baseRef;
    if (_context.eventName.startsWith('pull_request') && _context.payload.pull_request) {
        headRef = headRef || ((_c = (_b = (_a = _context.payload) === null || _a === void 0 ? void 0 : _a.pull_request) === null || _b === void 0 ? void 0 : _b.head) === null || _c === void 0 ? void 0 : _c.ref) || null;
        baseRef = baseRef || ((_f = (_e = (_d = _context.payload) === null || _d === void 0 ? void 0 : _d.pull_request) === null || _e === void 0 ? void 0 : _e.base) === null || _f === void 0 ? void 0 : _f.ref) || null;
    }
    else if (_context.eventName === 'push') {
        if ((_g = _context.ref) === null || _g === void 0 ? void 0 : _g.startsWith('refs/tags')) {
            baseRef = baseRef || getPreviousReleaseRef(octokit, _context);
        }
        headRef = headRef || _context.ref || null;
    }
    headRef = _argv.headRef || headRef || _context.ref || null;
    baseRef = _argv.baseRef || baseRef || _context.ref || null;
    return { headRef, baseRef };
}
exports.assignRefs = assignRefs;
//# sourceMappingURL=utils.js.map