"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetIssue = void 0;
var GetIssue;
(function (GetIssue) {
    let Expand;
    (function (Expand) {
        /** Returns field values rendered in HTML format. */
        Expand["RenderedFields"] = "renderedFields";
        /** Returns the display name of each field. -`schema` Returns the schema describing a field type. */
        Expand["Names"] = "names";
        /** Returns all possible transitions for the issue. */
        Expand["Transitions"] = "transitions";
        /** Returns information about how each field can be edited. */
        Expand["EditMeta"] = "editmeta";
        /** Returns a list of recent updates to an issue, sorted by date, starting from the most recent. */
        Expand["Changelog"] = "changelog";
        /**
         * Returns a JSON array for each version of a field's value, with the highest number representing the most recent
         * version. Note: When included in the request, the `fields` parameter is ignored.
         */
        Expand["VersionedRepresentations"] = "versionedRepresentations";
    })(Expand = GetIssue.Expand || (GetIssue.Expand = {}));
})(GetIssue = exports.GetIssue || (exports.GetIssue = {}));
//# sourceMappingURL=getIssue.js.map