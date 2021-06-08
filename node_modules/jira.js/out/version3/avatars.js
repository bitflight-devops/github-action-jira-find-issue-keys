"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Avatars = void 0;
class Avatars {
    constructor(client) {
        this.client = client;
    }
    getAllSystemAvatars(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/3/avatar/${parameters.type}/system`,
                method: 'GET',
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.avatars.getAllSystemAvatars' });
        });
    }
    getAvatars(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/3/universal_avatar/type/${parameters.type}/owner/${parameters.entityId}`,
                method: 'GET',
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.avatars.getAvatars' });
        });
    }
    storeAvatar(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/3/universal_avatar/type/${parameters.type}/owner/${parameters.entityId}`,
                method: 'POST',
                params: {
                    x: parameters.x,
                    y: parameters.y,
                    size: parameters.size,
                },
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.avatars.storeAvatar' });
        });
    }
    deleteAvatar(parameters, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                url: `/rest/api/3/universal_avatar/type/${parameters.type}/owner/${parameters.owningObjectId}/avatar/${parameters.id}`,
                method: 'DELETE',
            };
            return this.client.sendRequest(config, callback, { methodName: 'version3.avatars.deleteAvatar' });
        });
    }
}
exports.Avatars = Avatars;
//# sourceMappingURL=avatars.js.map