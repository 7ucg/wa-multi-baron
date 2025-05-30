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
exports.Socket = void 0;
class Socket {
    constructor({ id, phoneNumber, socket, }) {
        this.id = id;
        this.phoneNumber = phoneNumber;
        this.socket = socket;
    }
    logout() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield ((_a = this.socket) === null || _a === void 0 ? void 0 : _a.logout());
            }
            catch (error) { }
            (_b = this.socket) === null || _b === void 0 ? void 0 : _b.end(undefined);
        });
    }
}
exports.Socket = Socket;
// const socket = new Socket({ id: "1" });
