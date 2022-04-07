"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUser = void 0;
var GetUser;
(function (GetUser) {
    let Expand;
    (function (Expand) {
        /** Includes all groups and nested groups to which the user belongs. */
        Expand["Groups"] = "groups";
        /** Includes details of all the applications to which the user has access. */
        Expand["ApplicationRoles"] = "applicationRoles";
    })(Expand = GetUser.Expand || (GetUser.Expand = {}));
})(GetUser = exports.GetUser || (exports.GetUser = {}));
//# sourceMappingURL=getUser.js.map