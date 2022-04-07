"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCurrentUser = void 0;
var GetCurrentUser;
(function (GetCurrentUser) {
    let Expand;
    (function (Expand) {
        /** Returns all groups, including nested groups, the user belongs to. */
        Expand["Groups"] = "groups";
        /** Returns the application roles the user is assigned to. */
        Expand["ApplicationRoles"] = "applicationRoles";
    })(Expand = GetCurrentUser.Expand || (GetCurrentUser.Expand = {}));
})(GetCurrentUser = exports.GetCurrentUser || (exports.GetCurrentUser = {}));
//# sourceMappingURL=getCurrentUser.js.map