"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Version3Parameters = exports.Version3Models = exports.Version3Client = exports.Version2Parameters = exports.Version2Models = exports.Version2Client = exports.AgileParameters = exports.AgileModels = exports.AgileClient = void 0;
__exportStar(require("./baseClient"), exports);
__exportStar(require("./client"), exports);
var agile_1 = require("../agile");
Object.defineProperty(exports, "AgileClient", { enumerable: true, get: function () { return agile_1.AgileClient; } });
Object.defineProperty(exports, "AgileModels", { enumerable: true, get: function () { return agile_1.AgileModels; } });
Object.defineProperty(exports, "AgileParameters", { enumerable: true, get: function () { return agile_1.AgileParameters; } });
var version2_1 = require("../version2");
Object.defineProperty(exports, "Version2Client", { enumerable: true, get: function () { return version2_1.Version2Client; } });
Object.defineProperty(exports, "Version2Models", { enumerable: true, get: function () { return version2_1.Version2Models; } });
Object.defineProperty(exports, "Version2Parameters", { enumerable: true, get: function () { return version2_1.Version2Parameters; } });
var version3_1 = require("../version3");
Object.defineProperty(exports, "Version3Client", { enumerable: true, get: function () { return version3_1.Version3Client; } });
Object.defineProperty(exports, "Version3Models", { enumerable: true, get: function () { return version3_1.Version3Models; } });
Object.defineProperty(exports, "Version3Parameters", { enumerable: true, get: function () { return version3_1.Version3Parameters; } });
//# sourceMappingURL=index.js.map