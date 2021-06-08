"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadFileSync = exports.fileExistsSync = exports.existsSync = exports.directoryExistsSync = void 0;
const tslib_1 = require("tslib");
const fs = tslib_1.__importStar(require("fs"));
const fs_1 = require("fs");
function directoryExistsSync(path, required) {
    if (!path) {
        throw new Error("Arg 'path' must not be empty");
    }
    try {
        const stats = fs.statSync(path);
        if (stats.isDirectory()) {
            return true;
        }
        else if (!required) {
            return false;
        }
        throw new Error(`Directory '${path}' does not exist`);
    }
    catch (error) {
        if (error.code === 'ENOENT') {
            if (!required) {
                return false;
            }
            throw new Error(`Directory '${path}' does not exist`);
        }
        throw new Error(`Encountered an error when checking whether path '${path}' exists: ${error.message}`);
    }
}
exports.directoryExistsSync = directoryExistsSync;
function existsSync(path) {
    if (!path) {
        throw new Error("Arg 'path' must not be empty");
    }
    try {
        fs.statSync(path);
    }
    catch (error) {
        if (error.code === 'ENOENT') {
            return false;
        }
        throw new Error(`Encountered an error when checking whether path '${path}' exists: ${error.message}`);
    }
    return true;
}
exports.existsSync = existsSync;
function fileExistsSync(path) {
    if (!path) {
        throw new Error("Arg 'path' must not be empty");
    }
    try {
        const stats = fs.statSync(path);
        if (!stats.isDirectory()) {
            return true;
        }
        return false;
    }
    catch (error) {
        if (error.code === 'ENOENT') {
            return false;
        }
        throw new Error(`Encountered an error when checking whether path '${path}' exists: ${error.message}`);
    }
}
exports.fileExistsSync = fileExistsSync;
function loadFileSync(path) {
    if (!path) {
        throw new Error("Arg 'path' must not be empty");
    }
    try {
        if (fileExistsSync(path)) {
            return fs_1.readFileSync(path, 'utf8');
        }
    }
    catch (error) {
        throw new Error(`Encountered an error when reading file '${path}': ${error.message}`);
    }
    throw new Error(`Encountered an error when reading file '${path}': file not there`);
}
exports.loadFileSync = loadFileSync;
//# sourceMappingURL=fs-helper.js.map