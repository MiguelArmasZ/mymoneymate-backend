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
exports.logIn = void 0;
const User_1 = require("../../models/User");
const helpers_1 = require("../../helpers");
const data_1 = require("../../data");
function logIn(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password: passwordSent } = req.body;
        const userToLogIn = yield User_1.UserModel.findOne({ email }, { userName: 1, email: 1, confirm: 1, password: 1 });
        if (userToLogIn === null) {
            return (0, helpers_1.thrwoError)(res, 404, data_1.ERROR_MESSAGES.USER_DOES_NOT_EXIST);
        }
        if (!userToLogIn.confirm) {
            return (0, helpers_1.thrwoError)(res, 401, data_1.ERROR_MESSAGES.ACCOUNT_NOT_CONFIRMED);
        }
        if (!(yield (0, helpers_1.comparePasswords)(passwordSent, userToLogIn.password))) {
            return (0, helpers_1.thrwoError)(res, 401, data_1.ERROR_MESSAGES.PASSWORD_INCORRECT);
        }
        try {
            res.json({
                id: userToLogIn._id,
                userName: userToLogIn.userName,
                email: userToLogIn.email,
                jwt: (0, helpers_1.generateJWT)(userToLogIn._id)
            });
        }
        catch (error) {
            console.error(`El error a la hora de autenticar al usuario es: ${error}`);
            (0, helpers_1.thrwoError)(res, 400, error);
        }
    });
}
exports.logIn = logIn;
