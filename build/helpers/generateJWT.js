"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateJWT(id) {
    var _a;
    return jsonwebtoken_1.default.sign({ id }, (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : '', {
        expiresIn: '30d'
    });
}
exports.generateJWT = generateJWT;
