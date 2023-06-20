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
exports.checkToken = void 0;
const User_1 = require("../../models/User");
const helpers_1 = require("../../helpers");
const data_1 = require("../../data");
function checkToken(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { token } = req.params;
        const existingUser = yield User_1.UserModel.findOne({ token }, { email: 1 });
        if (existingUser === null) {
            return (0, helpers_1.thrwoError)(res, 404, data_1.ERROR_MESSAGES.TOKEN_NOT_VALID);
        }
        (0, helpers_1.thrwoSuccess)(res, 200, data_1.SUCCESS_MESSAGES.TOKEN_VALID);
    });
}
exports.checkToken = checkToken;
