"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
function generateToken() {
    const random = Math.random().toString(32).substring(2);
    const date = Date.now().toString(32);
    return random + date;
}
exports.generateToken = generateToken;
