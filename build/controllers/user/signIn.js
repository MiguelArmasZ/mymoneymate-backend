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
exports.signIn = void 0;
const User_1 = require("../../models/User");
const helpers_1 = require("../../helpers");
const data_1 = require("../../data");
function signIn(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password, userName } = req.body;
        const newUser = new User_1.UserModel({
            userName,
            email,
            password: yield (0, helpers_1.hashingPassword)(password)
        });
        const existingUser = yield User_1.UserModel.findOne({ email }, { email: 1 });
        if (existingUser != null) {
            return (0, helpers_1.thrwoError)(res, 400, data_1.ERROR_MESSAGES.USER_ALREADY_EXISTS);
        }
        try {
            (0, helpers_1.createDefaultCategories)(data_1.categoriesByDefaultData, newUser._id);
            newUser.token = '';
            yield newUser.save();
            void (0, helpers_1.signInEmail)({ email, token: newUser.token, userName });
            (0, helpers_1.thrwoSuccess)(res, 200, data_1.SUCCESS_MESSAGES.EMAIL_TO_CONFIRM_ACCOUNT);
        }
        catch (error) {
            console.error(`El error a la hora de registrar un usuario es: ${error}`);
            (0, helpers_1.thrwoError)(res, 400, error);
        }
    });
}
exports.signIn = signIn;
