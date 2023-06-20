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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const helpers_1 = require("../helpers");
function checkAuth(req, res, next) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const authorization = req.headers.authorization;
        if ((_a = authorization === null || authorization === void 0 ? void 0 : authorization.startsWith('Bearer')) !== null && _a !== void 0 ? _a : false) {
            try {
                const getJWT = authorization === null || authorization === void 0 ? void 0 : authorization.split(' ')[1];
                const { id } = jsonwebtoken_1.default.verify(getJWT !== null && getJWT !== void 0 ? getJWT : '', (_b = process.env.JWT_SECRET) !== null && _b !== void 0 ? _b : '');
                const userLogged = yield User_1.UserModel.findById(id, {
                    userName: 1,
                    email: 1
                });
                if (userLogged !== null) {
                    req.userLogged = userLogged;
                    next();
                    return;
                }
            }
            catch (error) {
                console.error(`El error al momento de guardar la sesión del usuario es: ${error}`);
                (0, helpers_1.thrwoError)(res, 400, error);
                return;
            }
        }
        (0, helpers_1.thrwoError)(res, 401, 'token no válido');
    });
}
exports.checkAuth = checkAuth;
